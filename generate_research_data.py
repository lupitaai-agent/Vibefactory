import os
import re
import json
from datetime import datetime

ARTICLES_DIR = '/config/.openclaw/vibe-factory-website/articles'
OUTPUT_FILE = '/config/.openclaw/vibe-factory-website/research.html'

def extract_meta(content, pattern):
    match = re.search(pattern, content, re.IGNORECASE)
    if match:
        return match.group(1)
    return None

def extract_json_ld(content):
    # Find all JSON-LD script tags
    json_ld_pattern = r'<script type="application/ld\+json">([\s\S]*?)</script>'
    matches = re.findall(json_ld_pattern, content, re.IGNORECASE)
    data_list = []
    for match in matches:
        try:
            data = json.loads(match.strip())
            data_list.append(data)
        except json.JSONDecodeError:
            pass
    return data_list

def get_article_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Title
    title_match = extract_meta(content, r'<title>([^<]+)</title>')
    title = title_match.strip() if title_match else 'Untitled'

    # Description
    desc_match = extract_meta(content, r'<meta name="description" content="([^"]*)"')
    description = desc_match.strip() if desc_match else ''

    # Published date from JSON-LD
    published = None
    json_ld_list = extract_json_ld(content)
    for data in json_ld_list:
        if isinstance(data, dict) and 'datePublished' in data:
            published = data['datePublished']
            break
        # Some JSON-LD might be a list
        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict) and 'datePublished' in item:
                    published = item['datePublished']
                    break
            if published:
                break

    # If not found, try meta article:published_time
    if not published:
        published_match = extract_meta(content, r'<meta property="article:published_time" content="([^"]*)"')
        if published_match:
            published = published_match

    # Author from JSON-LD
    author = 'Olaf, Vibe Factory'  # default
    for data in json_ld_list:
        if isinstance(data, dict) and 'author' in data:
            author_data = data['author']
            if isinstance(author_data, dict) and 'name' in author_data:
                author = author_data['name']
                break
            elif isinstance(author_data, str):
                author = author_data
                break

    # Category: try to get from breadcrumb or filename? We'll set a default for now.
    # We can look for a meta tag or infer from the URL structure in breadcrumb.
    category = 'Research'  # default
    # Look for breadcrumb item with position 3 (maybe category)
    breadcrumb_pattern = r'"itemListElement":\s*\[\s*\{[^}]*"name":\s*"([^"]*)"[^}]*\}\s*,\s*\{[^}]*"name":\s*"([^"]*)"[^}]*\}\s*,\s*\{[^}]*"name":\s*"([^"]*)"[^}]*\}'
    breadcrumb_match = re.search(breadcrumb_pattern, content, re.IGNORECASE)
    if breadcrumb_match:
        # The third item might be the category
        category = breadcrumb_match.group(3)
    else:
        # Try to get from filename: remove numbers and hyphens, capitalize
        filename = os.path.basename(filepath)
        # Remove .html and leading numbers if any
        name_only = re.sub(r'^\d+-', '', filename)
        name_only = name_only.replace('.html', '')
        # Split by hyphen and capitalize each part
        parts = name_only.split('-')
        if len(parts) > 1:
            # Skip the first part if it's a year? We'll just take the first meaningful part.
            # For simplicity, we'll take the first part and capitalize.
            category = parts[0].capitalize()
        else:
            category = name_only.capitalize()

    # Content snippet: use description or first 200 chars of body
    content_snippet = description
    if not content_snippet:
        # Try to get the first paragraph from the article body
        # Look for <div class="article-body"> or similar, but we don't know the structure.
        # Instead, take the first 200 chars of text after stripping tags.
        text_content = re.sub(r'<[^>]+>', ' ', content)
        text_content = re.sub(r'\s+', ' ', text_content).strip()
        content_snippet = text_content[:200] + ('...' if len(text_content) > 200 else '')

    return {
        'title': title,
        'author': author,
        'published': published,  # ISO string or None
        'category': category,
        'content': content_snippet
    }

def main():
    articles = []
    for filename in os.listdir(ARTICLES_DIR):
        if filename.endswith('.html'):
            filepath = os.path.join(ARTICLES_DIR, filename)
            article_data = get_article_data(filepath)
            # Only add if we have a title and published date (to avoid incomplete data)
            if article_data['title'] and article_data['published']:
                articles.append(article_data)

    # Sort by published date descending (newest first)
    articles.sort(key=lambda x: x['published'] if x['published'] else '', reverse=True)

    # Generate the JavaScript array as a JSON string
    js_array = 'const RESEARCH_DATA = ' + json.dumps(articles, indent=2) + ';'

    # Read the current research.html
    with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
        research_content = f.read()

    # Replace the RESEARCH_DATA array by finding the block and replacing it
    pattern = r'const RESEARCH_DATA\s*=\s*\[[\s\S]*?\];'
    match = re.search(pattern, research_content)
    if match:
        start, end = match.span()
        new_research_content = research_content[:start] + js_array + research_content[end:]
    else:
        # If pattern not found, we append at the end of the file? Or error.
        # For safety, we'll just append before the closing </body> or at the end.
        # But we know the file has a script tag for RESEARCH_DATA, so we expect it to be there.
        # Let's just print an error and exit.
        print("Error: Could not find RESEARCH_DATA pattern in research.html")
        return

    # Write back
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(new_research_content)

    print(f'Updated {OUTPUT_FILE} with {len(articles)} articles.')

if __name__ == '__main__':
    main()