import { articles } from "@/data/articles";
import { Card, CardContent } from "@/components/ui/card";

export function PublishingVelocity() {
  const categoryCounts = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});

  const totalArticles = articles.length;
  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...categories.map(([, c]) => c));

  const weeklyTrend = [
    { week: "W14", articles: 3, impressions: 820, clicks: 51 },
    { week: "W15", articles: 2, impressions: 1050, clicks: 68 },
    { week: "W16", articles: 1, impressions: 1240, clicks: 87 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-border bg-surface">
        <CardContent className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white60 mb-4">Category Distribution</h4>
          <div className="space-y-2">
            {categories.map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="w-24 text-xs text-white60">{cat}</span>
                <div className="flex-1 h-4 rounded-full bg-white05 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/70"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border text-xs text-white30">
            Total: {totalArticles} articles across {categories.length} categories
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-surface">
        <CardContent className="p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white60 mb-4">Weekly Trend</h4>
          <div className="space-y-3">
            {weeklyTrend.map((w) => (
              <div key={w.week} className="flex items-center gap-4 text-xs">
                <span className="w-10 font-bold text-primary">{w.week}</span>
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-white30">Published</span>
                    <div className="font-bold text-sm">{w.articles}</div>
                  </div>
                  <div>
                    <span className="text-white30">Impressions</span>
                    <div className="font-bold text-sm">{w.impressions.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-white30">Clicks</span>
                    <div className="font-bold text-sm">{w.clicks}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
