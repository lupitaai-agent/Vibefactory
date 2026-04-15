# Contributing to Vibefactory

## For AI Agents (Olaf & collaborators)

This guide explains the project structure, conventions, and workflows so you can make changes confidently.

---

## Project Structure

```
vibefactory/
├── public/
│   ├── articles/           # Static HTML articles (one per file)
│   ├── metrics/            # JSON data files powering the /metrics dashboard
│   │   ├── metrics.json        # Weekly SEO/GEO/AEO scorecard
│   │   ├── experiments.json    # Optimization experiments tracker
│   │   ├── ab-tests.json       # Title/description A/B tests
│   │   ├── citations.json      # AI engine citation log
│   │   ├── content-gaps.json   # Content opportunity backlog
│   │   ├── crawl-status.json   # Crawler & index status
│   │   ├── agent-log.json      # Agent action audit trail
│   │   └── sprints/            # Weekly sprint summaries (Markdown)
│   ├── schemas/            # JSON Schema files for validation
│   ├── templates/          # Copy-and-fill templates for new content
│   ├── sitemap.xml         # Auto-updated when articles are added
│   ├── feed.xml            # RSS feed
│   ├── robots.txt          # Crawler access rules
│   ├── llms.txt            # Short site summary for AI crawlers
│   └── llms-full.txt       # Detailed article summaries for AI crawlers
├── src/
│   ├── components/         # React components
│   ├── data/
│   │   ├── articles.ts     # Article metadata registry
│   │   └── schema.ts       # TypeScript type definitions for ALL data
│   ├── routes/             # TanStack Router file-based routes
│   └── styles.css          # Design tokens (Tailwind v4)
├── scripts/                # CLI tools for agents
│   ├── validate.ts         # Validate all JSON against schemas
│   ├── add-article.ts      # Scaffold a new article
│   └── update-metrics.ts   # Pull GA4/GSC data into metrics.json
└── CHANGELOG.md            # What changed and when
```

---

## Naming Conventions

### Articles
- **Filename**: `{category}-{topic-slug}.html` (e.g., `ai-reasoning-inference-scaling-2026.html`)
- **Slug**: same as filename without `.html`
- **In articles.ts**: add entry with all fields from `Article` interface in `src/data/schema.ts`

### Metrics Files
- All JSON files must conform to schemas in `public/schemas/`
- Dates use ISO format: `YYYY-MM-DD`
- Weeks use ISO format: `YYYY-WNN`
- IDs use patterns: `exp-NNN`, `ab-NNN`

### Sprints
- Filename: `YYYY-WNN.md` (e.g., `2026-W16.md`)
- Follow template in `public/templates/sprint.md`

---

## Workflows

### Publishing a New Article

1. Write HTML file in `public/articles/{slug}.html`
2. Add entry to `src/data/articles.ts` (use template in `public/templates/`)
3. Update `public/sitemap.xml` — add new `<url>` entry
4. Update `public/feed.xml` — add new `<item>`
5. Update `public/llms-full.txt` — add article summary
6. Update `public/metrics/metrics.json` — increment `content.totalArticles` and `content.categoryCoverage`
7. Log action in `public/metrics/agent-log.json`
8. Run validation: `bun run scripts/validate.ts`

### Weekly Metrics Update (Every Monday)

1. Pull GA4 data → update `seo` fields in `metrics.json`
2. Pull GSC data → update `avgPosition`, `googleIndexedPages`
3. Check Perplexity/ChatGPT → update `geo` fields
4. Add history entry for the week
5. Create new sprint file in `public/metrics/sprints/`
6. Log action in `agent-log.json`
7. Validate all files

### Running an Experiment

1. Add entry to `experiments.json` with status `planned`
2. When starting, change status to `active`, set `startDate`
3. When complete, set `endDate`, `status: completed`, record `metrics.after` and `result`
4. Log action in `agent-log.json`

---

## Validation

Always validate after making changes:

```bash
bun run scripts/validate.ts
```

This checks all JSON files against their schemas and reports errors.

---

## Rules

1. **Never edit `src/routeTree.gen.ts`** — it's auto-generated
2. **Always log your actions** in `agent-log.json`
3. **Always validate** after changes
4. **Use templates** — don't generate from scratch
5. **Keep commits atomic** — one logical change per commit
6. **Title length** — max 60 characters for SEO
7. **Description length** — max 160 characters for SEO
