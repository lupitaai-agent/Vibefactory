# Metrics Dashboard — Agent Update Guide

## Overview

This guide is for AI agents (like Olaf) who update the Vibe Factory metrics dashboard weekly.
All data lives in JSON/Markdown files in `public/metrics/`. The Metrics page at `/metrics` reads and renders them.

**Architecture:** Static JSON files → Git commit → GitHub Pages deploys → Dashboard updates.
No database. No API. Just files.

---

## Files to Update Weekly

### 1. `public/metrics/metrics.json` — SEO/GEO/AEO Scorecard

Update every Monday with fresh data from:
- **Google Search Console** → indexed pages, impressions, clicks, CTR, avg position
- **Perplexity/ChatGPT/Bing Copilot** → manual citation checks
- **Server logs or analytics** → llms.txt crawl counts

**Fields to update:**
- `lastUpdated` — current date (YYYY-MM-DD)
- `week` — current ISO week (e.g., "2026-W17")
- `seo.*`, `geo.*`, `aeo.*` — latest numbers
- `history[]` — append new week's summary object

### 2. `public/metrics/sprints/YYYY-WNN.md` — Weekly Sprint Log

Create a new file each week. Template:

```markdown
# Sprint YYYY-WNN — Month Day–Day, Year

## Focus
One-line sprint theme

## Completed
- ✅ Task 1
- ✅ Task 2

## In Progress
- 🔄 Task 3

## Blocked
- ⛔ Blocker description

## Key Metrics
| Metric | Last Week | This Week | Change |
|--------|-----------|-----------|--------|
| Google Indexed Pages | N | N | +N |
| Total Impressions | N | N | +N% |

## Learnings
- Key insight 1
- Key insight 2

## Next Sprint Goals
- Goal 1
- Goal 2
```

### 3. `public/metrics/experiments.json` — Experiment Tracker

Add new experiments or update status of existing ones.

**Experiment object schema:**
```json
{
  "id": "exp-NNN",
  "title": "Short description",
  "hypothesis": "If we do X, then Y will improve by Z%",
  "category": "SEO | GEO | AEO",
  "status": "planned | active | completed",
  "startDate": "YYYY-MM-DD | null",
  "endDate": "YYYY-MM-DD | null",
  "actions": ["Step taken 1", "Step taken 2"],
  "metrics": {
    "before": { "metricName": value },
    "after": { "metricName": value }
  },
  "result": "pass | fail | null"
}
```

### 4. `public/metrics/ab-tests.json` — A/B Test Registry

Track title/description variants.

```json
{
  "id": "ab-NNN",
  "article": "article-slug",
  "field": "title | meta-description | h1",
  "status": "active | completed",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD | null",
  "variantA": "Original text",
  "variantB": "New text",
  "winner": "A | B | null",
  "metricsA": { "impressions": N, "clicks": N, "ctr": N },
  "metricsB": { "impressions": N, "clicks": N, "ctr": N }
}
```

### 5. `public/metrics/citations.json` — AI Engine Citations

Add new citations when discovered.

```json
{
  "date": "YYYY-MM-DD",
  "source": "Perplexity | ChatGPT | Bing Copilot | Google AI Overview",
  "query": "The search query that triggered the citation",
  "articleCited": "article-slug",
  "snippetUsed": "The exact text that was cited",
  "verified": true
}
```

**How to find citations:**
1. Search Perplexity for topics covered by our articles
2. Search ChatGPT for related queries
3. Check Google AI Overviews for our key topics
4. Look for "vibefactory.io" mentions in results

### 6. `public/metrics/content-gaps.json` — Content Gap Analysis

Identify topics we should cover.

```json
{
  "topic": "Topic title",
  "category": "AI | Security | Tech | ...",
  "estimatedSearchVolume": "high | medium | low",
  "priority": "high | medium | low",
  "status": "backlog | research | planned | published",
  "rationale": "Why this topic matters",
  "addedDate": "YYYY-MM-DD"
}
```

### 7. `public/metrics/crawl-status.json` — Crawl & Index Health

Update crawl verification data weekly.

### 8. `public/metrics/agent-log.json` — Agent Action Log

**Append every action you take.** This is your audit trail.

```json
{
  "timestamp": "YYYY-MM-DDTHH:MM:SSZ",
  "agent": "Olaf",
  "action": "metrics-update | content-publish | seo-optimization | geo-optimization | aeo-optimization | experiment-start | experiment-end | crawl-check | ab-test-start | ab-test-end",
  "description": "What you did",
  "files": ["list", "of", "files", "changed"]
}
```

---

## Weekly Workflow

1. **Monday AM** — Update `metrics.json` with latest data
2. **Monday AM** — Create new sprint file `sprints/YYYY-WNN.md`
3. **Monday PM** — Check for new AI citations → update `citations.json`
4. **Tuesday** — Review experiments → update `experiments.json` statuses
5. **Wednesday** — Run content gap analysis → update `content-gaps.json`
6. **Thursday** — Check crawl health → update `crawl-status.json`
7. **Friday** — Review A/B tests → update `ab-tests.json`
8. **Always** — Log every action in `agent-log.json`

---

## SEO/GEO/AEO Quick Reference

### SEO (Search Engine Optimization)
- Optimize for Google/Bing traditional search
- Focus: indexed pages, impressions, clicks, CTR, position
- Actions: sitemap updates, canonical URLs, meta tags, structured data

### GEO (Generative Engine Optimization)
- Optimize for AI-powered search (Perplexity, ChatGPT, Bing Copilot)
- Focus: citations, llms.txt crawls, structured summaries
- Actions: llms-full.txt updates, citation-friendly writing, factual claims with stats

### AEO (Answer Engine Optimization)
- Optimize for featured snippets and answer boxes
- Focus: FAQ schema, direct answers, structured Q&A content
- Actions: FAQ sections, How-to schema, clear question-answer patterns

---

## Important Notes

- This is a **GitHub Pages static site** — no server-side processing
- All data is read at build time or client-side via fetch
- Keep JSON valid — broken JSON breaks the dashboard
- Use ISO date format (YYYY-MM-DD) consistently
- Commit messages should follow: `metrics(W16): updated scorecard and citations`
