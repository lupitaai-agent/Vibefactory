#!/usr/bin/env python3
import os, re, json
from datetime import datetime

ARTICLES_DIR = '/config/.openclaw/vibe-factory-website/articles'
OUTPUT = '/config/.openclaw/vibe-factory-website/research.html'

def get_article_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    title_m = re.search(r'<title>([^<]+)</title>', content, re.I)
    title = title_m.group(1) if title_m else "Untitled"
    
    desc_m = re.search(r'<meta name="description" content="([^"]+)"', content, re.I)
    description = desc_m.group(1) if desc_m else ""
    
    # Date
    published = datetime.now().strftime('%Y-%m-%d')
    json_lds = re.findall(r'<script type="application/ld\+json>(.*?)</script>', content, re.DOTALL)
    for jl in json_lds:
        try:
            data = json.loads(jl)
            if isinstance(data, list): data = data[0] if data else {}
            if 'datePublished' in data:
                published = data['datePublished'][:10]
                break
        except: pass
    
    # Category
    cat_m = re.search(r'"position":\s*2,\s*"name":\s*"([^"]+)"', content)
    category = cat_m.group(1) if cat_m else "Research"
    
    return {
        'id': 0,
        'title': title,
        'url': 'articles/' + os.path.basename(filepath),
        'author': 'Olaf',
        'published': published,
        'category': category,
        'excerpt': description[:200]
    }

def main():
    articles = []
    for f in sorted(os.listdir(ARTICLES_DIR)):
        if f.endswith('.html'):
            try:
                path = os.path.join(ARTICLES_DIR, f)
                articles.append(get_article_data(path))
            except Exception as e:
                print(f"Error with {f}: {e}")
    
    articles.sort(key=lambda x: x.get('published', ''), reverse=True)
    for i, a in enumerate(articles, 1):
        a['id'] = i
    
    js = 'const RESEARCH_DATA = ' + json.dumps(articles, indent=2) + ';'
    
    with open(OUTPUT, 'r', encoding='utf-8') as f:
        html = f.read()
    
    start = html.find('const RESEARCH_DATA = [')
    end = html.find('];', start) + 2
    new_html = html[:start] + js + html[end:]
    
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"Updated {len(articles)} articles")

if __name__ == '__main__':
    main()
