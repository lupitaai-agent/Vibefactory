import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MetricsScorecard } from "@/components/metrics/MetricsScorecard";
import { SprintLog } from "@/components/metrics/SprintLog";
import { ExperimentTracker } from "@/components/metrics/ExperimentTracker";
import { ArticlePerformance } from "@/components/metrics/ArticlePerformance";
import { AbTestRegistry } from "@/components/metrics/AbTestRegistry";
import { CrawlHealth } from "@/components/metrics/CrawlHealth";
import { ContentGaps } from "@/components/metrics/ContentGaps";
import { CitationTracker } from "@/components/metrics/CitationTracker";
import { PublishingVelocity } from "@/components/metrics/PublishingVelocity";
import { AgentActionLog } from "@/components/metrics/AgentActionLog";

export const Route = createFileRoute("/metrics")({
  component: MetricsPage,
  head: () => ({
    meta: [
      { title: "Growth Metrics & SEO/GEO/AEO Dashboard — Vibe Factory" },
      {
        name: "description",
        content:
          "Live growth metrics tracking SEO, GEO, and AEO performance. Weekly sprint logs, experiment results, citation tracking, and content gap analysis — all updated by Olaf.",
      },
      { property: "og:title", content: "Growth Metrics — Vibe Factory" },
      {
        property: "og:description",
        content:
          "Live dashboard tracking SEO indexation, AI engine citations, content experiments, and publishing velocity.",
      },
      { property: "og:url", content: "https://vibefactory.io/metrics" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vibefactory.io/metrics" }],
  }),
});

function MetricsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-lime-dim px-3 py-1 text-xs font-semibold text-primary">
              📊 Live Dashboard
            </span>
            <span className="text-xs text-white30">Updated weekly by Olaf</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Growth Metrics & Experiments
          </h1>
          <p className="mt-2 max-w-2xl text-white60">
            Tracking SEO, GEO (Generative Engine Optimization), and AEO (Answer Engine Optimization) performance.
            Every metric is agent-updated and every experiment is documented.
          </p>
        </div>

        {/* SEO/GEO/AEO Scorecard */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> SEO / GEO / AEO Scorecard
          </h2>
          <MetricsScorecard />
        </section>

        {/* Trend Charts — Publishing Velocity */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Publishing Velocity & Trends
          </h2>
          <PublishingVelocity />
        </section>

        {/* Crawl & Index Health */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Crawl & Index Health
          </h2>
          <CrawlHealth />
        </section>

        {/* Citation Tracker */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> AI Engine Citations
          </h2>
          <CitationTracker />
        </section>

        {/* Experiment Tracker */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Experiments
          </h2>
          <ExperimentTracker />
        </section>

        {/* A/B Test Registry */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> A/B Test Registry
          </h2>
          <AbTestRegistry />
        </section>

        {/* Article Performance */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Article Performance
          </h2>
          <ArticlePerformance />
        </section>

        {/* Content Gaps */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Content Gap Analysis
          </h2>
          <ContentGaps />
        </section>

        {/* Sprint Log */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Weekly Sprint Log
          </h2>
          <SprintLog />
        </section>

        {/* Agent Action Log */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Agent Action Log
          </h2>
          <AgentActionLog />
        </section>
      </main>
      <Footer />
    </div>
  );
}
