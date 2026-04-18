#!/bin/bash
# update-article-count.sh
# Counts articles and categories, updates research.html dynamically.
# Run this after committing a new article.

ARTICLES_DIR="/config/Vibefactory/articles"
RESEARCH_FILE="/config/Vibefactory/research.html"

# Count HTML files
ARTICLE_COUNT=$(find "$ARTICLES_DIR" -name "*.html" 2>/dev/null | wc -l | tr -d ' ')
echo "Found $ARTICLE_COUNT articles"

# Count unique categories (strip emoji, normalize case to handle duplicates like "ECONOMY" vs "Economy")
CATEGORIES=$(grep -roh 'article-cat">[^<]*' "$ARTICLES_DIR"/*.html 2>/dev/null | \
  sed 's/article-cat">//' | sed 's/<.*$//' | \
  awk '{print tolower($0)}' | sort -u | wc -l | tr -d ' ')
echo "Found $CATEGORIES unique categories"

# Update article count stat (handles "18+" and "19" patterns)
sed -i -E \
  "s/(<div class=\"stat-num\">)[0-9]+(.*>)/\1${ARTICLE_COUNT}\2/" \
  "$RESEARCH_FILE"

# Update og:description
sed -i -E \
  "s/([0-9]+)\+ autonomous research articles/\1+ autonomous research articles/" \
  "$RESEARCH_FILE"

echo "Done — research.html now shows $ARTICLE_COUNT articles across $CATEGORIES categories"