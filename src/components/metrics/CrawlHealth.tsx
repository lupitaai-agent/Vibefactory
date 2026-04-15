import { Card, CardContent } from "@/components/ui/card";

const crawlData = {
  robotsTxt: { valid: true, allowsGPTBot: true, allowsPerplexityBot: true, allowsClaudeBot: true, allowsGooglebot: true },
  sitemapXml: { valid: true, totalUrls: 19, googleFetchStatus: "pending", bingFetchStatus: "not-submitted" },
  llmsTxt: { crawlsThisWeek: 12, lastCrawledBy: "PerplexityBot" },
  llmsFullTxt: { crawlsThisWeek: 8, lastCrawledBy: "GPTBot" },
  feedXml: { valid: true, itemCount: 17 },
};

function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span className={`inline-block h-2 w-2 rounded-full ${ok ? "bg-primary" : "bg-red-400"}`} />
  );
}

export function CrawlHealth() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="border-border bg-surface">
        <CardContent className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white60 mb-3">robots.txt</h4>
          <div className="space-y-1.5">
            {Object.entries(crawlData.robotsTxt).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-white60">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <StatusDot ok={val} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-surface">
        <CardContent className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white60 mb-3">sitemap.xml</h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-white60">URLs</span><span className="font-bold">{crawlData.sitemapXml.totalUrls}</span></div>
            <div className="flex justify-between"><span className="text-white60">Google</span><span className="text-amber-400">{crawlData.sitemapXml.googleFetchStatus}</span></div>
            <div className="flex justify-between"><span className="text-white60">Bing</span><span className="text-red-400">{crawlData.sitemapXml.bingFetchStatus}</span></div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-surface">
        <CardContent className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white60 mb-3">LLM Discovery Files</h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-white60">llms.txt crawls/wk</span><span className="font-bold">{crawlData.llmsTxt.crawlsThisWeek}</span></div>
            <div className="flex justify-between"><span className="text-white60">llms-full.txt crawls/wk</span><span className="font-bold">{crawlData.llmsFullTxt.crawlsThisWeek}</span></div>
            <div className="flex justify-between"><span className="text-white60">feed.xml items</span><span className="font-bold">{crawlData.feedXml.itemCount}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
