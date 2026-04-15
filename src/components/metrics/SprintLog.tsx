import { Card, CardContent } from "@/components/ui/card";

const sprint = {
  week: "2026-W16",
  focus: "SEO foundation & GEO citation optimization",
  completed: [
    "Published 3 new articles (RAG vs Long Context, Aethir Infrastructure, OpenClaw Exposure)",
    "Updated sitemap.xml with all new URLs",
    "Rewrote llms-full.txt summaries for citation optimization",
    "Verified robots.txt allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot)",
    "Added canonical URLs to all route head() configs",
  ],
  inProgress: [
    "Adding JSON-LD Article schema to pilot batch (5 articles)",
    "Monitoring Perplexity citations — up from 1 to 3 this week",
  ],
  blocked: ["Google Search Console verification pending DNS propagation"],
  learnings: [
    "llms-full.txt rewrite correlated with Perplexity citation increase",
    "Articles with specific statistics in titles get 2x more impressions",
    "Freediving content has unexpectedly high engagement",
  ],
};

export function SprintLog() {
  return (
    <Card className="border-border bg-surface">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="rounded-full bg-lime-dim px-3 py-1 text-xs font-bold text-primary">
            {sprint.week}
          </span>
          <span className="text-sm text-white60">{sprint.focus}</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">✅ Completed</h4>
            <ul className="space-y-1.5">
              {sprint.completed.map((item, i) => (
                <li key={i} className="text-sm text-white60">• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">🔄 In Progress</h4>
            <ul className="space-y-1.5">
              {sprint.inProgress.map((item, i) => (
                <li key={i} className="text-sm text-white60">• {item}</li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mt-4 mb-2">⛔ Blocked</h4>
            <ul className="space-y-1.5">
              {sprint.blocked.map((item, i) => (
                <li key={i} className="text-sm text-white60">• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">💡 Learnings</h4>
          <ul className="space-y-1.5">
            {sprint.learnings.map((item, i) => (
              <li key={i} className="text-sm text-white60">• {item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
