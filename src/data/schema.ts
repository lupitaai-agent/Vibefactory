/**
 * =============================================================
 * VIBEFACTORY DATA SCHEMAS
 * =============================================================
 * Central type definitions for all data structures used across
 * the site. Agents: import from here to validate your output.
 *
 * DATA SOURCES:
 * - Article metadata: manually curated in src/data/articles.ts
 * - metrics.json: GA4 Data API + Google Search Console API
 * - citations.json: manual Perplexity/ChatGPT/Bing checks
 * - experiments.json: manually tracked optimization experiments
 * - ab-tests.json: Search Console CTR data for title/desc variants
 * - content-gaps.json: keyword research + competitive analysis
 * - crawl-status.json: Google/Bing index status + AI bot crawl logs
 * - agent-log.json: auto-appended by agent on every action
 * - sprints/*.md: weekly summaries (Markdown, follows template)
 * =============================================================
 */

// ── Articles ──────────────────────────────────────────────────

export type ArticleCategory =
  | "AI"
  | "Security"
  | "Sustainability"
  | "Crypto"
  | "Tech"
  | "Freediving"
  | "Economy"
  | "Robotics";

export interface Article {
  /** URL-safe identifier, must match HTML filename (without .html) */
  slug: string;
  /** SEO title, max 60 chars recommended */
  title: string;
  /** Meta description, max 160 chars recommended */
  description: string;
  category: ArticleCategory;
  /** Emoji representing the category */
  categoryEmoji: string;
  /** Human-readable date, e.g. "7 April 2026" */
  date: string;
  /** e.g. "12 min read" */
  readTime: string;
  /** Author name, typically "Olaf" */
  author: string;
  /** Relative URL path to the article HTML file */
  url: string;
}

// ── Metrics (metrics.json) ────────────────────────────────────
// Source: GA4 Data API (impressions, clicks) + GSC API (index, position)

export interface SeoMetrics {
  /** Source: GSC URL Inspection API — count of indexed URLs */
  googleIndexedPages: number;
  /** Source: GSC Performance API — average position */
  avgPosition: number;
  /** Source: GSC Performance API */
  totalImpressions: number;
  /** Source: GSC Performance API */
  totalClicks: number;
  /** Source: derived (totalClicks / totalImpressions * 100) */
  ctr: number;
  /** Source: parsed from sitemap.xml */
  sitemapUrls: number;
  /** Source: manual check */
  robotsTxtValid: boolean;
}

export interface GeoMetrics {
  /** Source: manual — search Perplexity for brand mentions */
  perplexityCitations: number;
  /** Source: manual — search ChatGPT for brand mentions */
  chatgptMentions: number;
  /** Source: manual — search Bing Copilot */
  bingCopilotMentions: number;
  /** Source: server logs — requests to /llms.txt */
  llmsTxtCrawls: number;
  /** Source: server logs — requests to /llms-full.txt */
  llmsFullTxtCrawls: number;
  /** Source: manual — Google SERPs check */
  aiOverviewAppearances: number;
}

export interface AeoMetrics {
  feedXmlValid: boolean;
  structuredDataPages: number;
  faqSchemaPages: number;
  articleSchemaPages: number;
  avgAnswerBoxEligibility: "none" | "low" | "medium" | "high";
}

export interface ContentMetrics {
  totalArticles: number;
  categoryCoverage: Record<ArticleCategory, number>;
  avgReadTime: string;
  publishingCadence: string;
}

export interface WeeklyHistoryEntry {
  week: string;
  googleIndexedPages: number;
  totalImpressions: number;
  totalClicks: number;
  perplexityCitations: number;
  chatgptMentions: number;
  totalArticles: number;
}

export interface MetricsData {
  lastUpdated: string;
  week: string;
  seo: SeoMetrics;
  geo: GeoMetrics;
  aeo: AeoMetrics;
  content: ContentMetrics;
  history: WeeklyHistoryEntry[];
}

// ── Experiments (experiments.json) ────────────────────────────

export interface Experiment {
  id: string;
  title: string;
  hypothesis: string;
  category: "SEO" | "GEO" | "AEO" | "Content" | "Technical";
  status: "planned" | "active" | "completed" | "abandoned";
  startDate: string | null;
  endDate: string | null;
  actions: string[];
  metrics: {
    before: Record<string, number | null>;
    after: Record<string, number | null>;
  };
  result: "pass" | "fail" | "inconclusive" | null;
}

// ── A/B Tests (ab-tests.json) ─────────────────────────────────

export interface AbTestMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface AbTest {
  id: string;
  article: string;
  field: "title" | "meta-description" | "h1" | "og-title";
  status: "active" | "completed" | "abandoned";
  startDate: string;
  endDate: string | null;
  variantA: string;
  variantB: string;
  winner: "A" | "B" | null;
  metricsA: AbTestMetrics;
  metricsB: AbTestMetrics;
}

// ── Citations (citations.json) ────────────────────────────────

export interface Citation {
  date: string;
  source: "Perplexity" | "ChatGPT" | "Bing Copilot" | "Google AI Overview";
  query: string;
  articleCited: string;
  snippetUsed: string;
  verified: boolean;
}

// ── Content Gaps (content-gaps.json) ──────────────────────────

export interface ContentGap {
  topic: string;
  category: ArticleCategory;
  estimatedSearchVolume: "low" | "medium" | "high";
  priority: "low" | "medium" | "high";
  status: "backlog" | "planned" | "research" | "writing" | "published";
  rationale: string;
  addedDate: string;
}

// ── Crawl Status (crawl-status.json) ──────────────────────────

export interface CrawlStatus {
  lastChecked: string;
  robotsTxt: {
    valid: boolean;
    allowsGPTBot: boolean;
    allowsPerplexityBot: boolean;
    allowsClaudeBot: boolean;
    allowsGooglebot: boolean;
    allowsBingbot: boolean;
    lastModified: string;
  };
  sitemapXml: {
    valid: boolean;
    totalUrls: number;
    lastSubmitted: string;
    googleFetchStatus: "ok" | "pending" | "error" | "not-submitted";
    bingFetchStatus: "ok" | "pending" | "error" | "not-submitted";
  };
  llmsTxt: {
    exists: boolean;
    sizeBytes: number;
    crawlsThisWeek: number;
    lastCrawledBy: string;
  };
  llmsFullTxt: {
    exists: boolean;
    sizeBytes: number;
    crawlsThisWeek: number;
    lastCrawledBy: string;
  };
  feedXml: {
    valid: boolean;
    itemCount: number;
    lastBuildDate: string;
  };
  pages: Array<{
    url: string;
    googleIndexed: boolean;
    bingIndexed: boolean;
    lastCrawled: string;
  }>;
}

// ── Agent Log (agent-log.json) ────────────────────────────────

export type AgentAction =
  | "metrics-update"
  | "content-publish"
  | "seo-optimization"
  | "geo-optimization"
  | "aeo-optimization"
  | "experiment-start"
  | "experiment-end"
  | "ab-test-start"
  | "ab-test-end"
  | "crawl-check"
  | "citation-check"
  | "content-gap-add"
  | "sprint-create"
  | "validation-run";

export interface AgentLogEntry {
  timestamp: string;
  agent: string;
  action: AgentAction;
  description: string;
  files: string[];
}
