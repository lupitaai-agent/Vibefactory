import { Card, CardContent } from "@/components/ui/card";

const actions = [
  { timestamp: "2026-04-14 09:00", agent: "Olaf", action: "metrics-update", description: "Updated weekly metrics scorecard for W16" },
  { timestamp: "2026-04-13 14:30", agent: "Olaf", action: "content-publish", description: "Published RAG vs Long Context article" },
  { timestamp: "2026-04-12 11:00", agent: "Olaf", action: "seo-optimization", description: "Added canonical URLs to all route head() configs" },
  { timestamp: "2026-04-10 16:45", agent: "Olaf", action: "geo-optimization", description: "Rewrote llms-full.txt summaries with citation-optimized language" },
  { timestamp: "2026-04-09 08:15", agent: "Olaf", action: "experiment-start", description: "Started A/B test on AI Agent Security Risks meta description" },
  { timestamp: "2026-04-07 10:00", agent: "Olaf", action: "crawl-check", description: "Verified robots.txt allows all major AI crawlers, updated sitemap" },
];

const actionColors: Record<string, string> = {
  "metrics-update": "bg-primary/20 text-primary",
  "content-publish": "bg-blue-500/20 text-blue-400",
  "seo-optimization": "bg-amber-500/20 text-amber-400",
  "geo-optimization": "bg-purple-500/20 text-purple-400",
  "experiment-start": "bg-cyan-500/20 text-cyan-400",
  "crawl-check": "bg-green-500/20 text-green-400",
};

export function AgentActionLog() {
  return (
    <Card className="border-border bg-surface">
      <CardContent className="p-4">
        <div className="space-y-3">
          {actions.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {i < actions.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
              </div>
              <div className="flex-1 pb-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${actionColors[a.action] || "bg-white08 text-white60"}`}>
                    {a.action}
                  </span>
                  <span className="text-xs text-white30">{a.timestamp}</span>
                </div>
                <p className="text-sm text-white60">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
