import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const gaps = [
  { topic: "MCP (Model Context Protocol) security analysis", category: "Security", priority: "high", status: "planned", volume: "high" },
  { topic: "Agentic RAG vs traditional RAG architectures", category: "AI", priority: "high", status: "planned", volume: "medium" },
  { topic: "AI agent cost comparison: self-hosted vs cloud vs decentralized", category: "Tech", priority: "medium", status: "research", volume: "medium" },
  { topic: "Freediving breath-hold training for beginners", category: "Freediving", priority: "medium", status: "planned", volume: "high" },
  { topic: "Crypto staking yields for AI compute networks 2026", category: "Crypto", priority: "low", status: "backlog", volume: "medium" },
];

const priorityStyles: Record<string, string> = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-white08 text-white60 border-white08",
};

export function ContentGaps() {
  return (
    <div className="space-y-2">
      {gaps.map((gap, i) => (
        <Card key={i} className="border-border bg-surface">
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <div className="flex-1">
              <h4 className="text-sm font-medium">{gap.topic}</h4>
              <span className="text-xs text-white30">{gap.category} · Search volume: {gap.volume}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={priorityStyles[gap.priority]}>{gap.priority}</Badge>
              <Badge variant="outline" className="text-[10px]">{gap.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
