# Vibe Factory — SEO, GEO & AEO Optimization Guide for Agents

> This template is for AI agents working on the Vibe Factory website. Follow these guidelines to ensure every change maintains and improves discoverability across traditional search (SEO), generative AI search (GEO), and answer engines (AEO).

---

## Glossary: The Three Pillars

| Term | Full Name | What It Covers |
|------|-----------|----------------|
| **SEO** | Search Engine Optimization | Google, Bing, DuckDuckGo — traditional crawl-index-rank |
| **GEO** | Generative Engine Optimization | Google AI Overviews, Bing Copilot — AI-generated search summaries |
| **AEO** | Answer Engine Optimization | ChatGPT, Perplexity, Claude — AI systems that cite sources |

All three matter. SEO drives organic traffic. GEO gets you into AI-generated search results. AEO gets you cited by conversational AI systems.

---

## File Structure & What Each File Does

| File | Purpose | Update When |
|------|---------|-------------|
| `public/robots.txt` | Tells crawlers (including AI bots) what to index | Adding new sections or blocking specific paths |
| `public/llms.txt` | Concise site summary for LLM crawlers (AEO) | Changing site structure, categories, or key concepts |
| `public/llms-full.txt` | Extended article index with summaries (AEO) | Publishing a new article |
| `public/sitemap.xml` | XML sitemap for search engines (SEO) | Adding new pages or articles |
| `public/feed.xml` | RSS feed for aggregators and AI crawlers | Publishing a new article |
| `src/routes/__root.tsx` | Global meta tags, JSON-LD Organization schema | Changing site-wide branding or social accounts |
| `src/routes/index.tsx` | Homepage meta, JSON-LD WebSite schema | Changing homepage content or value proposition |
| `src/routes/research.tsx` | Research page meta, JSON-LD CollectionPage schema | Adding categories or changing research page structure |
| `src/data/articles.ts` | Article metadata (title, category, date, URL) | Publishing a new article |

---

## When Publishing a New Article

Every new article requires updates to **5 files**:

### 1. `src/data/articles.ts`
Add the article to the `articles` array at the **top** (newest first):

```typescript
{
  slug: "your-article-slug",
  title: "Full Article Title — With Subtitle If Any",
  description: "2-3 sentence summary. Include key facts and numbers. This appears in cards and RSS.",
  category: "AI", // Must match ArticleCategory type
  categoryEmoji: "🤖",
  date: "15 April 2026",
  readTime: "10 min read",
  author: "Olaf",
  url: "https://vibefactory.io/articles/your-article-slug.html",
}
```

### 2. `public/llms-full.txt`
Add a new `## Article:` block after the header:

```
## Article: Full Article Title
- URL: https://vibefactory.io/articles/your-article-slug.html
- Category: AI
- Date: 15 April 2026
- Read time: 10 min
- Summary: 3-4 sentence summary covering the key argument, evidence, and conclusion. Include specific numbers, names, and claims. This is what AI systems use to decide whether to cite this article.
```

### 3. `public/sitemap.xml`
Add a new `<url>` entry:

```xml
<url>
  <loc>https://vibefactory.io/articles/your-article-slug.html</loc>
  <lastmod>2026-04-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### 4. `public/feed.xml`
Add a new `<item>` at the top of the channel (after the `<atom:link>`):

```xml
<item>
  <title>Full Article Title</title>
  <link>https://vibefactory.io/articles/your-article-slug.html</link>
  <guid isPermaLink="true">https://vibefactory.io/articles/your-article-slug.html</guid>
  <description>2-3 sentence description for RSS readers and aggregators.</description>
  <category>AI</category>
  <dc:creator>Olaf</dc:creator>
  <pubDate>Wed, 15 Apr 2026 01:00:00 GMT</pubDate>
</item>
```

### 5. `public/llms.txt`
Update the article count in the description if it changed significantly, and add any new categories.

---

## SEO Checklist for Every Page

- [ ] **Unique `<title>`** — Under 60 characters, includes primary keyword
- [ ] **Meta description** — Under 160 characters, includes call-to-action or key fact
- [ ] **Canonical URL** — `<link rel="canonical">` pointing to the definitive URL
- [ ] **Open Graph tags** — `og:title`, `og:description`, `og:url`, `og:type`
- [ ] **Twitter card** — Set at root level, inherited by all pages
- [ ] **Single `<h1>`** — Every page has exactly one H1
- [ ] **Semantic HTML** — Use `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- [ ] **Alt text** — Every `<img>` has descriptive alt text
- [ ] **Internal links** — Link between related articles and sections
- [ ] **Mobile responsive** — All content readable on 375px viewport

---

## GEO Checklist (Generative Engine Optimization)

GEO is about making content **easy for AI systems to extract and summarize** in search results:

- [ ] **Lead with the key claim** — First paragraph should contain the article's main insight
- [ ] **Use structured data** — Tables, numbered lists, comparison matrices
- [ ] **Include specific numbers** — "85.6% accuracy" not "high accuracy"
- [ ] **Name sources** — "According to OWASP's December 2025 report" not "According to experts"
- [ ] **Use question-answer format** — When possible, structure sections as Q&A
- [ ] **JSON-LD schema** — Article, CollectionPage, Organization schemas on relevant pages
- [ ] **Cite primary sources** — Link to papers, reports, and official documentation
- [ ] **Include timestamps** — Date every claim so AI systems know how current it is

---

## AEO Checklist (Answer Engine Optimization)

AEO is about getting **cited by ChatGPT, Perplexity, Claude** when users ask related questions:

- [ ] **`llms.txt` is current** — Site summary matches actual content
- [ ] **`llms-full.txt` has all articles** — Each with a rich summary
- [ ] **`robots.txt` allows AI bots** — GPTBot, Claude-Web, PerplexityBot all allowed
- [ ] **RSS feed is current** — `/feed.xml` includes all articles
- [ ] **Content is authoritative** — Include methodology, sources, and expert analysis
- [ ] **Content is unique** — Original research and analysis, not rephrased news
- [ ] **Content answers questions** — Structure articles around questions people actually ask
- [ ] **Content is factual** — Include verifiable data points that AI systems can cross-reference

---

## Writing Guidelines for SEO/GEO/AEO-Optimized Articles

### Title Formula
```
[Specific Subject]: [Key Claim or Finding] — [Qualifier]
```
Example: "Inference-Time Scaling: Why AI Reasoning Models Will Dominate 2026"

### Meta Description Formula
```
[Key fact or statistic]. [What the article covers]. [Why it matters].
```
Example: "NVIDIA's Nemotron 3 Super scores 85.6% on agentic benchmarks. Analysis of the MoE architecture, tool use capabilities, and open-source implications."

### Article Structure (SEO + GEO + AEO optimized)
1. **Hook paragraph** — Key insight in first 2 sentences (this is what AI extracts)
2. **Context section** — Why this matters now, with dated references
3. **Evidence sections** — Numbered or bulleted, with specific data
4. **Comparison/analysis** — Tables and structured comparisons
5. **Implications** — What this means going forward
6. **Sources** — Named, linked, dated

### Content Signals That Improve AEO Citation
- Use exact names: "OpenAI's o1" not "a reasoning model"
- Include dates: "In February 2026" not "recently"
- Quantify claims: "6x memory reduction" not "significant improvement"
- Reference standards: "OWASP GenAI Top 10" not "industry frameworks"
- State methodology: "Based on ArXiv paper 2504.19874" not "based on research"

---

## Technical Implementation Notes

### JSON-LD Schema Types Used

| Page | Schema Type | Key Properties |
|------|-------------|----------------|
| Root (all pages) | `Organization` | name, url, description, sameAs |
| Homepage | `WebSite` | name, url, potentialAction (SearchAction) |
| Research index | `CollectionPage` | name, url, about, numberOfItems |
| Individual articles | `Article` | headline, author, datePublished, publisher |

### Cache Headers for Crawl Efficiency
- Static assets: `Cache-Control: public, max-age=31536000, immutable`
- HTML pages: `Cache-Control: public, max-age=3600, s-maxage=3600`
- Sitemap/RSS: `Cache-Control: public, max-age=3600`

### Canonical URL Rules
- Always use `https://vibefactory.io` (no www, no trailing slash except root)
- Homepage canonical: `https://vibefactory.io/`
- Research canonical: `https://vibefactory.io/research`
- Articles: `https://vibefactory.io/articles/{slug}.html`

---

## Monitoring & Validation

### Tools to Verify SEO
- Google Search Console: Index coverage, crawl stats
- Google Rich Results Test: Validate JSON-LD structured data
- Ahrefs/Semrush: Keyword rankings, backlink profile

### Tools to Verify GEO
- Google AI Overview: Search your topics, check if you appear in AI summaries
- Bing Copilot: Ask questions about your article topics

### Tools to Verify AEO
- ChatGPT: Ask "What is Vibe Factory?" or article-specific questions
- Perplexity: Search your topics, check if you're cited
- Claude: Ask about your research topics

### Quick Validation Commands
```bash
# Verify robots.txt is accessible
curl -s https://vibefactory.io/robots.txt | head -5

# Verify llms.txt
curl -s https://vibefactory.io/llms.txt | head -5

# Verify sitemap
curl -s https://vibefactory.io/sitemap.xml | head -10

# Verify RSS feed
curl -s https://vibefactory.io/feed.xml | head -10

# Validate JSON-LD (paste URL into Google Rich Results Test)
# https://search.google.com/test/rich-results
```

---

## Terminology Reference

Use these terms consistently across the website and documentation:

| Correct Term | Abbreviation | Do NOT Use |
|-------------|-------------|------------|
| Search Engine Optimization | SEO | "search optimization" |
| Generative Engine Optimization | GEO | "AI search optimization" |
| Answer Engine Optimization | AEO | "AIIO", "AAIO", "AI optimization" |
| Structured Data | — | "schema markup" (acceptable but less precise) |
| JSON-LD | — | "JSON schema" (this means something different) |
| Canonical URL | — | "preferred URL" |
| Open Graph | OG | "social tags" |

---

*Last updated: 15 April 2026*
*Maintained by: Olaf, AI Co-CEO, Vibe Factory*
