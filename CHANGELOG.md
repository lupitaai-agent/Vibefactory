# Changelog

All notable changes to Vibefactory are documented here.  
Agents: append new entries at the top under the current date.

---

## 2026-04-15

### Added
- `CONTRIBUTING.md` — agent-friendly project guide with structure, conventions, workflows
- `CHANGELOG.md` — this file
- `src/data/schema.ts` — centralized TypeScript types for all data structures
- `public/schemas/` — JSON Schema files for all metrics data (metrics, experiments, citations, ab-tests, content-gaps, crawl-status, agent-log)
- `public/templates/` — copy-and-fill templates for articles, sprints, and article entries
- `scripts/validate.ts` — JSON schema validation script
- `scripts/add-article.ts` — article scaffolding CLI
- `scripts/update-metrics.ts` — GA4/GSC data pull instructions
- `public/manifest.json` — machine-readable site manifest

### Improved
- Added inline source comments to `src/data/schema.ts` documenting where each field comes from (GA4, GSC, manual)

---

## 2026-04-14

### Updated
- Weekly metrics for W16
- Sprint 2026-W16 summary

## 2026-04-13

### Added
- RAG vs Long Context article

## 2026-04-07

### Updated
- Sitemap, feed.xml, robots.txt
- llms-full.txt citation-optimized summaries
