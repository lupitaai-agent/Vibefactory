import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiments = [
  {
    id: "exp-001",
    title: "Add JSON-LD ArticleSchema to all research articles",
    hypothesis: "Adding structured data will improve search appearance and increase CTR by 15%",
    category: "SEO",
    status: "active" as const,
    startDate: "2026-04-07",
    result: null,
  },
  {
    id: "exp-002",
    title: "Expand llms-full.txt with citation-optimized summaries",
    hypothesis: "More detailed summaries will increase AI engine citation rate by 25%",
    category: "GEO",
    status: "completed" as const,
    startDate: "2026-03-24",
    result: "pass" as const,
  },
  {
    id: "exp-003",
    title: "Add FAQ sections to high-traffic articles",
    hypothesis: "FAQ sections with schema will capture answer box positions",
    category: "AEO",
    status: "planned" as const,
    startDate: null,
    result: null,
  },
];

const statusStyles = {
  active: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-primary/20 text-primary border-primary/30",
  planned: "bg-white08 text-white60 border-white08",
};

const categoryColors: Record<string, string> = {
  SEO: "text-blue-400",
  GEO: "text-purple-400",
  AEO: "text-amber-400",
};

export function ExperimentTracker() {
  return (
    <div className="space-y-3">
      {experiments.map((exp) => (
        <Card key={exp.id} className="border-border bg-surface">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${categoryColors[exp.category]}`}>
                    {exp.category}
                  </span>
                  <Badge variant="outline" className={statusStyles[exp.status]}>
                    {exp.status}
                  </Badge>
                  {exp.result === "pass" && (
                    <span className="text-xs font-bold text-primary">✓ PASS</span>
                  )}
                  {exp.result === "fail" && (
                    <span className="text-xs font-bold text-red-400">✗ FAIL</span>
                  )}
                </div>
                <h4 className="font-semibold text-sm">{exp.title}</h4>
                <p className="text-xs text-white30 mt-1">{exp.hypothesis}</p>
              </div>
              {exp.startDate && (
                <span className="text-xs text-white30 whitespace-nowrap">{exp.startDate}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
