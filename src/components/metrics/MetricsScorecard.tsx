import { Card, CardContent } from "@/components/ui/card";

const scoreItems = [
  { label: "Google Indexed", value: "19", sub: "pages", trend: "+2", category: "SEO" },
  { label: "Impressions", value: "1,240", sub: "/week", trend: "+18%", category: "SEO" },
  { label: "Clicks", value: "87", sub: "/week", trend: "+28%", category: "SEO" },
  { label: "CTR", value: "7.0%", sub: "avg", trend: "+0.8pp", category: "SEO" },
  { label: "Perplexity Citations", value: "3", sub: "verified", trend: "+1", category: "GEO" },
  { label: "ChatGPT Mentions", value: "1", sub: "verified", trend: "+1", category: "GEO" },
  { label: "llms.txt Crawls", value: "12", sub: "/week", trend: "+4", category: "GEO" },
  { label: "AI Overview Appearances", value: "2", sub: "queries", trend: "new", category: "GEO" },
  { label: "Structured Data Pages", value: "3", sub: "of 19", trend: "+3", category: "AEO" },
  { label: "FAQ Schema Pages", value: "0", sub: "planned", trend: "—", category: "AEO" },
];

const categoryColors: Record<string, string> = {
  SEO: "text-blue-400",
  GEO: "text-purple-400",
  AEO: "text-amber-400",
};

export function MetricsScorecard() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {scoreItems.map((item) => (
        <Card key={item.label} className="border-border bg-surface">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${categoryColors[item.category]}`}>
                {item.category}
              </span>
              <span className="text-[10px] font-medium text-primary">{item.trend}</span>
            </div>
            <div className="text-2xl font-extrabold tracking-tight">{item.value}</div>
            <div className="text-xs text-white30">{item.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
