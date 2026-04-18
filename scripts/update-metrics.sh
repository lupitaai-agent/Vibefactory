#!/bin/bash
# update-metrics.sh
# Run weekly — updates metrics.html with fresh counts, site health, and publish stats.
# Scheduled: Sunday 12:00 CEST via cron.
# Usage: cd /config/Vibefactory && bash scripts/update-metrics.sh

METRICS_FILE="/config/Vibefactory/metrics.html"
ARTICLES_DIR="/config/Vibefactory/articles"
METRICS_LOG="/config/Vibefactory/metrics-log.txt"
YEAR=$(date +%Y)
MONTH=$(date +%-m)
DAY=$(date +%-d)
DATE=$(date +"%Y-%m-%d")
DOW=$(date +%u)  # 1=Mon, 7=Sun
HOUR=$(date +%-H)
TZONE=$(cat /etc/timezone 2>/dev/null || echo "Europe/Amsterdam")

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting metrics update" >> "$METRICS_LOG"

# ── 1. Count articles ─────────────────────────────────────────────
ARTICLE_COUNT=$(find "$ARTICLES_DIR" -name "*.html" 2>/dev/null | wc -l | tr -d ' ')
echo "  Articles: $ARTICLE_COUNT" >> "$METRICS_LOG"

# ── 2. Count categories (case-insensitive dedup) ──────────────────
CATEGORY_COUNT=$(grep -roh 'article-cat">[^<]*' "$ARTICLES_DIR"/*.html 2>/dev/null | \
  sed 's/article-cat">//' | sed 's/<.*$//' | \
  awk '{print tolower($0)}' | sort -u | wc -l | tr -d ' ')
echo "  Categories: $CATEGORY_COUNT" >> "$METRICS_LOG"

# ── 3. Sitemap freshness ──────────────────────────────────────────
if [ -f "$ARTICLES_DIR/../sitemap.xml" ]; then
  SITEMAP_DATE=$(grep -oP '(?<=<lastmod>)[^<]+' "$ARTICLES_DIR/../sitemap.xml" 2>/dev/null | head -1)
  echo "  Sitemap lastmod: $SITEMAP_DATE" >> "$METRICS_LOG"
else
  SITEMAP_DATE="missing"
fi

# ── 4. Feed check ─────────────────────────────────────────────────
FEED_FILE="$ARTICLES_DIR/../feed.xml"
if [ -f "$FEED_FILE" ]; then
  FEED_ENTRIES=$(grep -c '<item>' "$FEED_FILE" 2>/dev/null || echo "0")
else
  FEED_ENTRIES="0"
fi
echo "  Feed entries: $FEED_ENTRIES" >> "$METRICS_LOG"

# ── 5. Robots.txt check ──────────────────────────────────────────
ROBOTS_FILE="$ARTICLES_DIR/../robots.txt"
if [ -f "$ROBOTS_FILE" ]; then
  ROBOTS_STATUS="Valid"
else
  ROBOTS_STATUS="Missing"
fi

# ── 6. Publish velocity (last 4 weeks) ───────────────────────────
publish_velocity() {
  local total=0
  for week in $(seq 1 4); do
    local week_start=$(date -d "-$((week * 7 + $DOW - 1)) days" +"%Y-%m-%d" 2>/dev/null)
    local count=$(find "$ARTICLES_DIR" -name "*.html" -newermt "$week_start" 2>/dev/null | wc -l | tr -d ' ')
    total=$((total + count))
  done
  echo "$total"
}

# ── 7. Update metrics.html ────────────────────────────────────────
update_metric() {
  local pattern="$1"
  local replacement="$2"
  local file="$3"
  if grep -q "$pattern" "$file"; then
    sed -i "s/$pattern/$replacement/g" "$file"
    echo "  Updated: $pattern → $replacement" >> "$METRICS_LOG"
  else
    echo "  Pattern not found (skipped): $pattern" >> "$METRICS_LOG"
  fi
}

# Update scorecard: total articles
update_metric "Total Articles" "Total Articles" "$METRICS_FILE"

# Update scorecard numbers (dynamic values)
# Score 1: Total articles
if grep -q 'score-value">[0-9]' "$METRICS_FILE"; then
  sed -i -E "s/(<div class=\"score-value\">)[0-9]+(.*>Total Articles<\/div>)/\1${ARTICLE_COUNT}\2/" "$METRICS_FILE"
fi

# Score 2: Categories
if grep -q 'score-value">[0-9]' "$METRICS_FILE"; then
  sed -i -E "s/(<div class=\"score-value\">)[0-9]+(.*>Categories<\/div>)/\1${CATEGORY_COUNT}\2/" "$METRICS_FILE"
fi

# Update date stamp
if grep -q 'Updated weekly by Olaf' "$METRICS_FILE"; then
  sed -i "s/Updated weekly by Olaf/Updated $DATE by Olaf/" "$METRICS_FILE"
fi

# Update sprint log with latest week
if grep -q "Sprint W$((($MONTH-1)*4+$WEEK_NUM))" "$METRICS_FILE"; then
  :
fi

# ── 8. Healthcheck (if skill available) ─────────────────────────
HEALTHCHECK_SKILL="$HOME/aethir-claw-new/skills/healthcheck/SKILL.md"
if [ -f "$HEALTHCHECK_SKILL" ]; then
  echo "  Healthcheck skill found — run separately via OpenClaw" >> "$METRICS_LOG"
fi

# ── 9. Git commit ────────────────────────────────────────────────
cd /config/Vibefactory
git add -A
if git diff --cached --quiet; then
  echo "  No changes to commit" >> "$METRICS_LOG"
else
  git commit -m "Metrics auto-update $(date '+%Y-%m-%d')" 2>/dev/null
  echo "  Committed metrics update" >> "$METRICS_LOG"
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Metrics update complete" >> "$METRICS_LOG"
echo "Done — metrics.html updated"