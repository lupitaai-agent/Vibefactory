#!/usr/bin/env bun
/**
 * validate.ts — Validates all metrics JSON files against their schemas.
 * 
 * Usage: bun run scripts/validate.ts
 * 
 * Checks:
 * 1. All JSON files parse correctly
 * 2. Required fields are present
 * 3. Field types match schema expectations
 * 4. articles.ts slugs match existing HTML files
 */

import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");
const METRICS_DIR = join(ROOT, "public", "metrics");
const ARTICLES_DIR = join(ROOT, "public", "articles");
const SCHEMAS_DIR = join(ROOT, "public", "schemas");

let errors: string[] = [];
let warnings: string[] = [];
let checks = 0;

function check(name: string, condition: boolean, message: string) {
  checks++;
  if (!condition) {
    errors.push(`❌ ${name}: ${message}`);
  }
}

function warn(name: string, message: string) {
  warnings.push(`⚠️  ${name}: ${message}`);
}

// ── 1. Validate JSON files parse correctly ─────────────────────

const jsonFiles = [
  "metrics.json",
  "experiments.json",
  "ab-tests.json",
  "citations.json",
  "content-gaps.json",
  "crawl-status.json",
  "agent-log.json",
];

const parsed: Record<string, unknown> = {};

for (const file of jsonFiles) {
  const path = join(METRICS_DIR, file);
  try {
    if (!existsSync(path)) {
      errors.push(`❌ ${file}: File not found`);
      continue;
    }
    parsed[file] = JSON.parse(readFileSync(path, "utf-8"));
    checks++;
  } catch (e) {
    errors.push(`❌ ${file}: Invalid JSON — ${(e as Error).message}`);
  }
}

// ── 2. Validate metrics.json structure ──────────────────────────

if (parsed["metrics.json"]) {
  const m = parsed["metrics.json"] as Record<string, unknown>;
  check("metrics.json", typeof m.lastUpdated === "string", "Missing lastUpdated");
  check("metrics.json", typeof m.week === "string", "Missing week");
  check("metrics.json", typeof m.seo === "object" && m.seo !== null, "Missing seo section");
  check("metrics.json", typeof m.geo === "object" && m.geo !== null, "Missing geo section");
  check("metrics.json", typeof m.aeo === "object" && m.aeo !== null, "Missing aeo section");
  check("metrics.json", typeof m.content === "object" && m.content !== null, "Missing content section");
  check("metrics.json", Array.isArray(m.history), "Missing history array");

  if (typeof m.seo === "object" && m.seo !== null) {
    const seo = m.seo as Record<string, unknown>;
    check("metrics.json/seo", typeof seo.googleIndexedPages === "number", "Missing googleIndexedPages");
    check("metrics.json/seo", typeof seo.totalClicks === "number", "Missing totalClicks");
    check("metrics.json/seo", typeof seo.totalImpressions === "number", "Missing totalImpressions");
    check("metrics.json/seo", typeof seo.ctr === "number", "Missing ctr");
  }
}

// ── 3. Validate experiments.json ────────────────────────────────

if (parsed["experiments.json"]) {
  const exps = parsed["experiments.json"] as Array<Record<string, unknown>>;
  check("experiments.json", Array.isArray(exps), "Must be an array");
  for (const exp of exps) {
    check(`experiments/${exp.id}`, typeof exp.id === "string", "Missing id");
    check(`experiments/${exp.id}`, typeof exp.title === "string", "Missing title");
    check(`experiments/${exp.id}`, typeof exp.status === "string", "Missing status");
    check(`experiments/${exp.id}`,
      ["planned", "active", "completed", "abandoned"].includes(exp.status as string),
      `Invalid status: ${exp.status}`
    );
  }
}

// ── 4. Validate citations.json ──────────────────────────────────

if (parsed["citations.json"]) {
  const cits = parsed["citations.json"] as Array<Record<string, unknown>>;
  check("citations.json", Array.isArray(cits), "Must be an array");
  for (const cit of cits) {
    check(`citation/${cit.date}`, typeof cit.source === "string", "Missing source");
    check(`citation/${cit.date}`, typeof cit.articleCited === "string", "Missing articleCited");
  }
}

// ── 5. Validate ab-tests.json ───────────────────────────────────

if (parsed["ab-tests.json"]) {
  const tests = parsed["ab-tests.json"] as Array<Record<string, unknown>>;
  check("ab-tests.json", Array.isArray(tests), "Must be an array");
  for (const t of tests) {
    check(`ab-test/${t.id}`, typeof t.variantA === "string", "Missing variantA");
    check(`ab-test/${t.id}`, typeof t.variantB === "string", "Missing variantB");
  }
}

// ── 6. Validate article HTML files exist for all slugs ──────────

try {
  // Read articles.ts and extract slugs via regex
  const articlesTs = readFileSync(join(ROOT, "src", "data", "articles.ts"), "utf-8");
  const slugMatches = articlesTs.matchAll(/slug:\s*"([^"]+)"/g);
  for (const match of slugMatches) {
    const slug = match[1];
    const htmlPath = join(ARTICLES_DIR, `${slug}.html`);
    check(`article/${slug}`, existsSync(htmlPath), `HTML file not found: ${slug}.html`);
  }
} catch {
  warn("articles", "Could not read articles.ts for slug validation");
}

// ── 7. Validate agent-log.json ──────────────────────────────────

if (parsed["agent-log.json"]) {
  const log = parsed["agent-log.json"] as Array<Record<string, unknown>>;
  check("agent-log.json", Array.isArray(log), "Must be an array");
  for (const entry of log) {
    check(`agent-log/${entry.timestamp}`, typeof entry.action === "string", "Missing action");
    check(`agent-log/${entry.timestamp}`, Array.isArray(entry.files), "Missing files array");
  }
}

// ── Results ─────────────────────────────────────────────────────

console.log("\n🔍 Vibefactory Validation Report");
console.log("=".repeat(50));
console.log(`✅ ${checks - errors.length} checks passed`);

if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} warnings:`);
  warnings.forEach(w => console.log(`  ${w}`));
}

if (errors.length > 0) {
  console.log(`\n❌ ${errors.length} errors:`);
  errors.forEach(e => console.log(`  ${e}`));
  process.exit(1);
} else {
  console.log("\n🎉 All validations passed!");
  process.exit(0);
}
