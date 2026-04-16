# Metrics Dashboard — Agent Update Guide

## Overview

This guide is for AI agents (like Olaf) who update the Vibe Factory metrics dashboard weekly.
All data lives in JSON/Markdown files in `public/metrics/`. The Metrics page at `/metrics` reads and renders them.

**Architecture:** Static JSON files → Git commit → GitHub Pages deploys → Dashboard updates.
No database. No API. Just files.

**Live Data Sources:**
- **Google Analytics 4** — Measurement ID: `G-40DY8J7QQH` (tracking active)
- **Google Search Console** — Property: `vibefactory.io` (verified)

---

## Data Sources & How to Pull Real Data

### Google Analytics 4 (GA4)

**Property:** `G-40DY8J7QQH` on `vibefactory.io`

#### Option A: GA4 Data API (automated)

Use the [Google Analytics Data API v1](https://developers.google.com/analytics/devguides/reporting/data/v1) to pull metrics programmatically.

**Setup (one-time):**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable the "Google Analytics Data API" for your project
3. Create a Service Account → download the JSON key file
4. In GA4 Admin → Property Access Management → add the service account email as "Viewer"

**Python script to pull GA4 data:**
```python
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    RunReportRequest, DateRange, Metric, Dimension
)
import json, os

# Authenticate
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service-account-key.json"
client = BetaAnalyticsDataClient()

PROPERTY_ID = "properties/YOUR_GA4_PROPERTY_ID"  # numeric ID from GA4 Admin

# Pull last 7 days
request = RunReportRequest(
    property=PROPERTY_ID,
    date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
    metrics=[
        Metric(name="sessions"),
        Metric(name="totalUsers"),
        Metric(name="screenPageViews"),
        Metric(name="averageSessionDuration"),
        Metric(name="bounceRate"),
        Metric(name="engagedSessions"),
    ],
)
response = client.run_report(request)

for row in response.rows:
    print("Sessions:", row.metric_values[0].value)
    print("Users:", row.metric_values[1].value)
    print("Pageviews:", row.metric_values[2].value)
    print("Avg Duration:", row.metric_values[3].value)
    print("Bounce Rate:", row.metric_values[4].value)
```

**Per-page breakdown:**
```python
request = RunReportRequest(
    property=PROPERTY_ID,
    date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
    dimensions=[Dimension(name="pagePath")],
    metrics=[
        Metric(name="screenPageViews"),
        Metric(name="averageSessionDuration"),
        Metric(name="bounceRate"),
    ],
)
response = client.run_report(request)
for row in response.rows:
    page = row.dimension_values[0].value
    views = row.metric_values[0].value
    print(f"{page}: {views} views")
```

**Useful GA4 metrics to track:**
| Metric | API name | Description |
|--------|----------|-------------|
| Sessions | `sessions` | Total visits |
| Users | `totalUsers` | Unique visitors |
| Pageviews | `screenPageViews` | Total page loads |
| Avg Duration | `averageSessionDuration` | Time on site (seconds) |
| Bounce Rate | `bounceRate` | Single-page sessions |
| Engaged Sessions | `engagedSessions` | Sessions > 10s or 2+ pages |
| New Users | `newUsers` | First-time visitors |

**Useful GA4 dimensions:**
| Dimension | API name | Description |
|-----------|----------|-------------|
| Page path | `pagePath` | URL path |
| Source | `sessionSource` | Traffic source (google, perplexity, direct) |
| Medium | `sessionMedium` | Traffic type (organic, referral) |
| Country | `country` | Visitor country |
| Device | `deviceCategory` | desktop, mobile, tablet |

#### Option B: GA4 UI (manual)

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select the `vibefactory.io` property
3. Reports → Engagement → Pages and screens
4. Set date range to last 7 days
5. Export as CSV or manually copy numbers into `metrics.json`

---

### Google Search Console (GSC)

**Property:** `vibefactory.io` (verified)

#### Option A: Search Console API (automated)

Use the [Search Console API](https://developers.google.com/webmaster-tools/v1/api_reference_index) to pull search performance data.

**Setup (one-time):**
1. Same Service Account from GA4 setup works
2. In [Search Console](https://search.google.com/search-console) → Settings → Users and permissions → add the service account email as "Full" user

**Python script to pull GSC data:**
```python
from googleapiclient.discovery import build
from google.oauth2 import service_account
import json

SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
SERVICE_ACCOUNT_FILE = 'service-account-key.json'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES
)
service = build('searchconsole', 'v1', credentials=credentials)

# Pull last 7 days of search performance
request = {
    'startDate': '2026-04-07',
    'endDate': '2026-04-14',
    'dimensions': ['query'],
    'rowLimit': 100
}
response = service.searchanalytics().query(
    siteUrl='https://vibefactory.io', body=request
).execute()

total_clicks = 0
total_impressions = 0
for row in response.get('rows', []):
    query = row['keys'][0]
    clicks = row['clicks']
    impressions = row['impressions']
    ctr = row['ctr']
    position = row['position']
    total_clicks += clicks
    total_impressions += impressions
    print(f"Query: {query} | Clicks: {clicks} | Impr: {impressions} | CTR: {ctr:.2%} | Pos: {position:.1f}")

print(f"\nTotals: {total_clicks} clicks, {total_impressions} impressions")
```

**Per-page performance:**
```python
request = {
    'startDate': '2026-04-07',
    'endDate': '2026-04-14',
    'dimensions': ['page'],
    'rowLimit': 50
}
response = service.searchanalytics().query(
    siteUrl='https://vibefactory.io', body=request
).execute()

for row in response.get('rows', []):
    page = row['keys'][0]
    print(f"{page}: {row['clicks']} clicks, {row['impressions']} impr, CTR: {row['ctr']:.2%}")
```

**Index coverage (which pages are indexed):**
```python
# Use URL Inspection API for individual URLs
request = {
    'inspectionUrl': 'https://vibefactory.io/articles/rag-long-context-infrastructure-shift-2026.html',
    'siteUrl': 'https://vibefactory.io'
}
response = service.urlInspection().index().inspect(body=request).execute()
status = response['inspectionResult']['indexStatusResult']['coverageState']
print(f"Index status: {status}")  # e.g., "Submitted and indexed"
```

**Key GSC metrics to track:**
| Metric | Description | Maps to |
|--------|-------------|---------|
| clicks | Total clicks from search | `seo.totalClicks` |
| impressions | Times shown in search | `seo.totalImpressions` |
| ctr | Click-through rate | `seo.ctr` |
| position | Average ranking position | `seo.avgPosition` |

**Key GSC dimensions:**
| Dimension | Description |
|-----------|-------------|
| `query` | Search terms |
| `page` | URL that appeared |
| `country` | Searcher's country |
| `device` | desktop, mobile, tablet |
| `date` | Daily breakdown |

#### Option B: GSC UI (manual)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Select `vibefactory.io`
3. Performance → Search Results
4. Set date range to last 7 days
5. Note: clicks, impressions, CTR, position
6. Pages tab → see per-page performance
7. Export if needed

---

### AI Engine Citation Tracking (Manual)

No API exists for these — the agent must search manually and record findings.

**Perplexity citations:**
1. Go to [perplexity.ai](https://perplexity.ai)
2. Search for topics covered by Vibe Factory articles
3. Check if any sources link to `vibefactory.io`
4. Record in `citations.json`

**Suggested queries to check weekly:**
- "RAG vs long context 2026"
- "AI agent security vulnerabilities"
- "decentralized AI compute vs cloud"
- "OpenClaw security exposure"
- "humanoid robots manufacturing 2026"
- "freediving mammalian dive reflex"
- "AI inference scaling 2026"

**ChatGPT mentions:**
1. Ask ChatGPT questions about topics we cover
2. Ask "What sources support this?"
3. Check if vibefactory.io is mentioned

**Google AI Overviews:**
1. Search Google for our key topics
2. Look for AI Overview panels at the top
3. Check if our content is cited in the sources

---

## Mapping API Data to metrics.json

When pulling real data, map it to the JSON structure like this:

```
GA4 sessions/users/pageviews → content metrics (not currently in scorecard — can add)
GSC clicks → seo.totalClicks
GSC impressions → seo.totalImpressions  
GSC avg CTR → seo.ctr
GSC avg position → seo.avgPosition
GSC indexed pages (via URL Inspection) → seo.googleIndexedPages
Manual citation checks → geo.perplexityCitations, geo.chatgptMentions
GA4 source=perplexity traffic → additional GEO signal
```

**Example: update metrics.json from API data:**
```python
import json

# After pulling GA4 + GSC data...
with open('public/metrics/metrics.json', 'r') as f:
    metrics = json.load(f)

metrics['lastUpdated'] = '2026-04-21'
metrics['week'] = '2026-W17'
metrics['seo']['totalImpressions'] = total_impressions  # from GSC
metrics['seo']['totalClicks'] = total_clicks            # from GSC
metrics['seo']['ctr'] = round(total_ctr * 100, 1)       # from GSC
metrics['seo']['avgPosition'] = round(avg_position, 1)  # from GSC

# Append to history
metrics['history'].append({
    'week': '2026-W17',
    'googleIndexedPages': indexed_count,
    'totalImpressions': total_impressions,
    'totalClicks': total_clicks,
    'perplexityCitations': perplexity_count,  # manual
    'chatgptMentions': chatgpt_count,         # manual
    'totalArticles': len(articles)
})

with open('public/metrics/metrics.json', 'w') as f:
    json.dump(metrics, f, indent=2)
```

---

## Files to Update Weekly

### 1. `public/metrics/metrics.json` — SEO/GEO/AEO Scorecard

Update every Monday with fresh data from:
- **Google Search Console API** → indexed pages, impressions, clicks, CTR, avg position
- **Google Analytics 4 API** → sessions, users, pageviews, traffic sources
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
    "before": { "metricName": "value" },
    "after": { "metricName": "value" }
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
  "metricsA": { "impressions": 0, "clicks": 0, "ctr": 0 },
  "metricsB": { "impressions": 0, "clicks": 0, "ctr": 0 }
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

1. **Monday AM** — Pull GA4 + GSC data → update `metrics.json`
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
- **Data source:** Google Search Console API

### GEO (Generative Engine Optimization)
- Optimize for AI-powered search (Perplexity, ChatGPT, Bing Copilot)
- Focus: citations, llms.txt crawls, structured summaries
- Actions: llms-full.txt updates, citation-friendly writing, factual claims with stats
- **Data source:** Manual citation checks + GA4 referral traffic from AI engines

### AEO (Answer Engine Optimization)
- Optimize for featured snippets and answer boxes
- Focus: FAQ schema, direct answers, structured Q&A content
- Actions: FAQ sections, How-to schema, clear question-answer patterns
- **Data source:** GSC query data (look for question-based queries)

---

## Important Notes

- This is a **GitHub Pages static site** — no server-side processing
- All data is read at build time or client-side via fetch
- Keep JSON valid — broken JSON breaks the dashboard
- Use ISO date format (YYYY-MM-DD) consistently
- Commit messages should follow: `metrics(W16): updated scorecard and citations`
- GA4 Measurement ID: `G-40DY8J7QQH`
- GA4 tracking is active on all pages via the root layout
- GSC property is verified for `vibefactory.io`
