import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const abTests = [
  {
    id: "ab-001",
    article: "RAG vs. Long Context",
    field: "title",
    status: "completed" as const,
    variantA: "RAG vs. Long Context: The Infrastructure Shift Nobody Expected",
    variantB: "RAG vs. Long Context: Why Vector DBs Are Losing at Retrieval",
    winner: "B",
    metricsA: { impressions: 320, clicks: 18, ctr: 5.6 },
    metricsB: { impressions: 340, clicks: 31, ctr: 9.1 },
  },
  {
    id: "ab-002",
    article: "AI Agent Security Risks",
    field: "meta-description",
    status: "active" as const,
    variantA: "AI agents are powerful, autonomous, and dangerous. A complete threat map for 2026.",
    variantB: "AI agents make decisions, execute tools, and operate over extended interactions — here's every way they can be compromised.",
    winner: null,
    metricsA: { impressions: 95, clicks: 7, ctr: 7.4 },
    metricsB: { impressions: 102, clicks: 9, ctr: 8.8 },
  },
];

export function AbTestRegistry() {
  return (
    <div className="space-y-3">
      {abTests.map((test) => (
        <Card key={test.id} className="border-border bg-surface">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-sm">{test.article}</span>
              <Badge variant="outline" className="text-[10px]">{test.field}</Badge>
              <Badge variant="outline" className={test.status === "active" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-primary/20 text-primary border-primary/30"}>
                {test.status}
              </Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className={`rounded-lg border p-3 ${test.winner === "A" ? "border-primary/50 bg-primary/5" : "border-border"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white60">Variant A</span>
                  {test.winner === "A" && <span className="text-[10px] font-bold text-primary">WINNER</span>}
                </div>
                <p className="text-xs text-white30 mb-2 line-clamp-2">{test.variantA}</p>
                <div className="flex gap-3 text-xs">
                  <span className="text-white60">{test.metricsA.impressions} imp</span>
                  <span className="text-white60">{test.metricsA.clicks} clicks</span>
                  <span className="font-bold">{test.metricsA.ctr}% CTR</span>
                </div>
              </div>
              <div className={`rounded-lg border p-3 ${test.winner === "B" ? "border-primary/50 bg-primary/5" : "border-border"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white60">Variant B</span>
                  {test.winner === "B" && <span className="text-[10px] font-bold text-primary">WINNER</span>}
                </div>
                <p className="text-xs text-white30 mb-2 line-clamp-2">{test.variantB}</p>
                <div className="flex gap-3 text-xs">
                  <span className="text-white60">{test.metricsB.impressions} imp</span>
                  <span className="text-white60">{test.metricsB.clicks} clicks</span>
                  <span className="font-bold">{test.metricsB.ctr}% CTR</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
