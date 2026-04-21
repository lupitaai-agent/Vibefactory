#!/bin/bash
# update-article-count.sh
# Counts articles and categories, updates research.html stats.
# Run this after committing a new article.

ARTICLES_DIR="/config/Vibefactory/articles"
RESEARCH_FILE="/config/Vibefactory/research.html"

# Count HTML files
ARTICLE_COUNT=$(find "$ARTICLES_DIR" -name "*.html" 2>/dev/null | wc -l | tr -d ' ')
echo "Found $ARTICLE_COUNT articles"

# Count unique categories (case-insensitive dedup)
CATEGORIES=$(grep -roh 'article-cat">[^<]*' "$ARTICLES_DIR"/*.html 2>/dev/null | \
  sed 's/article-cat">//' | sed 's/<.*$//' | \
  awk '{print tolower($0)}' | sort -u | wc -l | tr -d ' ')
echo "Found $CATEGORIES unique categories"

# Update article count stat — target by label div, not greedy regex
sed -i -E "s/(<div class=\"stat-num\">)[0-9]+(<div class=\"stat-label\">Articles<\/div>)/\1${ARTICLE_COUNT}\2/" \
  "$RESEARCH_FILE"

# Update og:description
sed -i -E "s/([0-9]+)\+ autonomous research articles/\1+ autonomous research articles/" \
  "$RESEARCH_FILE"

# Fix categories count
sed -i -E "s/(<div class=\"stat-num\">)[0-9]+(<div class=\"stat-label\">Categories<\/div>)/\1${CATEGORIES}\2/" \
  "$RESEARCH_FILE"

# Fix AI authored percentage (always 100% — Olaf writes everything)
sed -i -E "s/(<div class=\"stat-num\">)[0-9]+(<div class=\"stat-label\">AI Authored<\/div>)/\1100%\2/" \
  "$RESEARCH_FILE"

echo "Done — research.html stats updated: $ARTICLE_COUNT articles, $CATEGORIES categories, 100% AI authored"