#!/usr/bin/env bun
/**
 * add-article.ts — Scaffolds a new article with all required files.
 *
 * Usage:
 *   bun run scripts/add-article.ts <slug> <category> "<title>" "<description>"
 *
 * Example:
 *   bun run scripts/add-article.ts mcp-security-analysis Security \
 *     "MCP Security Analysis: The Complete 2026 Threat Map" \
 *     "Model Context Protocol is powerful but exposes new attack surfaces."
 *
 * What it does:
 * 1. Creates HTML file from template in public/articles/
 * 2. Shows the entry to add to src/data/articles.ts
 * 3. Reminds you to update sitemap.xml, feed.xml, llms-full.txt
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");

const [slug, category, title, description] = process.argv.slice(2);

if (!slug || !category || !title || !description) {
  console.log("Usage: bun run scripts/add-article.ts <slug> <category> \"<title>\" \"<description>\"");
  console.log("");
  console.log("Categories: AI, Security, Sustainability, Crypto, Tech, Freediving, Economy, Robotics");
  process.exit(1);
}

const categoryEmojis: Record<string, string> = {
  AI: "🤖",
  Security: "🔒",
  Sustainability: "🌿",
  Crypto: "₿",
  Tech: "⚙️",
  Freediving: "🌊",
  Economy: "📈",
  Robotics: "🦾",
};

const emoji = categoryEmojis[category];
if (!emoji) {
  console.error(`❌ Unknown category: ${category}`);
  console.log("Valid categories:", Object.keys(categoryEmojis).join(", "));
  process.exit(1);
}

// Check if article already exists
const htmlPath = join(ROOT, "public", "articles", `${slug}.html`);
if (existsSync(htmlPath)) {
  console.error(`❌ Article already exists: ${htmlPath}`);
  process.exit(1);
}

// Read template
const templatePath = join(ROOT, "public", "templates", "article.html");
let html: string;
try {
  html = readFileSync(templatePath, "utf-8");
} catch {
  console.error("❌ Template not found at public/templates/article.html");
  process.exit(1);
}

// Fill template
const today = new Date();
const dateStr = today.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

html = html
  .replace(/{{TITLE}}/g, title)
  .replace(/{{DESCRIPTION}}/g, description)
  .replace(/{{SLUG}}/g, slug)
  .replace(/{{CATEGORY}}/g, category)
  .replace(/{{DATE}}/g, dateStr)
  .replace(/{{AUTHOR}}/g, "Olaf");

writeFileSync(htmlPath, html);
console.log(`✅ Created: public/articles/${slug}.html`);

// Show articles.ts entry
console.log("\n📝 Add this entry to src/data/articles.ts:\n");
console.log(`  {
    slug: "${slug}",
    title: "${title}",
    description: "${description}",
    category: "${category}",
    categoryEmoji: "${emoji}",
    date: "${dateStr}",
    readTime: "X min read",
    author: "Olaf",
    url: "/articles/${slug}.html",
  },`);

console.log("\n📋 Also update:");
console.log("  - public/sitemap.xml (add <url> entry)");
console.log("  - public/feed.xml (add <item>)");
console.log("  - public/llms-full.txt (add summary)");
console.log("  - public/metrics/metrics.json (increment totalArticles & categoryCoverage)");
console.log("  - public/metrics/agent-log.json (log the publish action)");
