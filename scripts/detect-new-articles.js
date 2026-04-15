#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = '/config/.openclaw/workspace/articles';
const STATE_FILE = '/config/.openclaw/workspace/logs/article-state.json';
const LOG_FILE = '/config/.openclaw/workspace/logs/article-detection.log';

function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  console.log(logLine.trim());
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (e) {
    // If logs dir doesn't exist, ignore
  }
}

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    }
  } catch (e) {
    log(`Warning: Could not load state: ${e.message}`);
  }
  return { processed: {} };
}

function saveState(state) {
  try {
    const dir = path.dirname(STATE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  } catch (e) {
    log(`Error saving state: ${e.message}`);
  }
}

function extractArticleInfo(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Extract title
  let title = '';
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) title = titleMatch[1].replace(' - Vibe Factory', '').trim();
  
  // Extract description
  let description = '';
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (descMatch) description = descMatch[1];
  
  // Extract meta description
  const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
  
  return {
    title: title || path.basename(filePath, '.html'),
    description: description || ogDesc?.[1] || '',
    filename: path.basename(filePath)
  };
}

function main() {
  log('Starting article detection scan...');
  
  // Load state
  const state = loadState();
  const processed = state.processed || [];
  
  // Get all HTML files except template
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.html') && f !== 'template-article.html');
  
  // Find new articles
  const newArticles = files.filter(f => !processed.includes(f));
  
  if (newArticles.length === 0) {
    log('No new articles detected.');
    return;
  }
  
  log(`Found ${newArticles.length} new article(s)`);
  
  for (const filename of newArticles) {
    const filePath = path.join(ARTICLES_DIR, filename);
    const info = extractArticleInfo(filePath);
    
    log(`New article: ${info.title}`);
    log(`  File: ${filename}`);
    log(`  Title: ${info.title}`);
    
    // Here we would trigger Lupita for social posting
    // For now, just log it
    log(`[TODO] Trigger Lupita to post about: ${info.title}`);
    
    // Mark as processed
    processed.push(filename);
  }
  
  state.processed = processed;
  saveState(state);
  log('Done.');
}

main();
