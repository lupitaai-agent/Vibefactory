#!/usr/bin/env bun
/**
 * update-metrics.ts — Instructions and scaffolding for pulling GA4/GSC data.
 *
 * This script is designed to be run by the agent (Olaf) during weekly updates.
 * Since GA4/GSC APIs require OAuth credentials that aren't available in this
 * environment, this script documents the exact steps and provides the structure
 * for manual or GitHub Action-based updates.
 *
 * Usage: bun run scripts/update-metrics.ts
 *
 * For automated runs via GitHub Actions, see the workflow template below.
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");
const METRICS_PATH = join(ROOT, "public", "metrics", "metrics.json");

console.log("📊 Vibefactory Metrics Update Guide");
console.log("=".repeat(50));
console.log("");
console.log("This script helps structure the weekly metrics update.");
console.log("");

// Load current metrics
const metrics = JSON.parse(readFileSync(METRICS_PATH, "utf-8"));
console.log(`Current week: ${metrics.week}`);
console.log(`Last updated: ${metrics.lastUpdated}`);
console.log("");

// Calculate next week
const [year, weekNum] = metrics.week.split("-W").map(Number);
const nextWeek = `${year}-W${String(weekNum + 1).padStart(2, "0")}`;
const today = new Date().toISOString().split("T")[0];

console.log("📋 DATA TO COLLECT:");
console.log("─".repeat(40));
console.log("");
console.log("1. Google Search Console (https://search.google.com/search-console)");
console.log("   → Performance tab → Last 7 days");
console.log(`   - Total impressions: ${metrics.seo.totalImpressions} → ???`);
console.log(`   - Total clicks: ${metrics.seo.totalClicks} → ???`);
console.log(`   - Average position: ${metrics.seo.avgPosition} → ???`);
console.log(`   - CTR: ${metrics.seo.ctr}% → ???`);
console.log("   → Pages tab → Coverage");
console.log(`   - Indexed pages: ${metrics.seo.googleIndexedPages} → ???`);
console.log("");
console.log("2. GA4 (https://analytics.google.com) — Property G-40DY8J7QQH");
console.log("   → Reports → Engagement → Pages");
console.log("   - Pageviews by article");
console.log("   - Avg engagement time");
console.log("");
console.log("3. AI Citation Checks (manual)");
console.log("   → Search Perplexity for: vibefactory, Aethir Claw, agent security");
console.log(`   - Perplexity citations: ${metrics.geo.perplexityCitations} → ???`);
console.log("   → Search ChatGPT for same queries");
console.log(`   - ChatGPT mentions: ${metrics.geo.chatgptMentions} → ???`);
console.log("");
console.log("4. Crawl logs");
console.log(`   - llms.txt crawls: ${metrics.geo.llmsTxtCrawls} → ???`);
console.log(`   - llms-full.txt crawls: ${metrics.geo.llmsFullTxtCrawls} → ???`);
console.log("");

// Show the update template
console.log("📝 UPDATE TEMPLATE:");
console.log("─".repeat(40));
console.log(`
After collecting data, update public/metrics/metrics.json:

{
  "lastUpdated": "${today}",
  "week": "${nextWeek}",
  "seo": {
    "googleIndexedPages": <GSC_INDEXED>,
    "avgPosition": <GSC_AVG_POS>,
    "totalImpressions": <GSC_IMPRESSIONS>,
    "totalClicks": <GSC_CLICKS>,
    "ctr": <GSC_CTR>,
    "sitemapUrls": <COUNT_FROM_SITEMAP>,
    "robotsTxtValid": true
  },
  ...
}

And add a history entry:
{
  "week": "${nextWeek}",
  "googleIndexedPages": <GSC_INDEXED>,
  "totalImpressions": <GSC_IMPRESSIONS>,
  "totalClicks": <GSC_CLICKS>,
  "perplexityCitations": <PERPLEXITY_COUNT>,
  "chatgptMentions": <CHATGPT_COUNT>,
  "totalArticles": <TOTAL>
}
`);

console.log("Then run: bun run scripts/validate.ts");
