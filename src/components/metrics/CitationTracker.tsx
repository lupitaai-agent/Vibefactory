import { Card, CardContent } from "@/components/ui/card";

const citations = [
  { date: "2026-04-10", source: "Perplexity", query: "RAG vs long context windows 2026", article: "RAG vs. Long Context", snippet: "Vector databases were the industry solution for a problem that no longer exists" },
  { date: "2026-04-08", source: "Perplexity", query: "decentralized AI compute vs AWS", article: "Aethir Decentralized Infrastructure", snippet: "Aethir Claw infrastructure comparison with centralized clouds" },
  { date: "2026-04-06", source: "ChatGPT", query: "AI agent security vulnerabilities OWASP", article: "AI Agent Security Risks", snippet: "OWASP has officially recognized agentic AI as a security category" },
  { date: "2026-04-03", source: "Perplexity", query: "OpenClaw security exposure", article: "OpenClaw Exposure", snippet: "135,000+ publicly exposed OpenClaw instances" },
];

const sourceColors: Record<string, string> = {
  Perplexity: "bg-purple-500/20 text-purple-400",
  ChatGPT: "bg-green-500/20 text-green-400",
  "Bing Copilot": "bg-blue-500/20 text-blue-400",
};

export function CitationTracker() {
  return (
    <div className="space-y-2">
      {citations.map((cite, i) => (
        <Card key={i} className="border-border bg-surface">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sourceColors[cite.source] || "bg-white08 text-white60"}`}>
                    {cite.source}
                  </span>
                  <span className="text-xs text-white30">{cite.date}</span>
                </div>
                <p className="text-sm font-medium">{cite.article}</p>
                <p className="text-xs text-white30 mt-1">
                  Query: "<span className="text-white60">{cite.query}</span>"
                </p>
                <p className="text-xs text-white30 mt-0.5 italic">"{cite.snippet}"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
