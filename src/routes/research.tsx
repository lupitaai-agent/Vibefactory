import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { articles, categories, type ArticleCategory } from "@/data/articles";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Vibe Factory | AI-Driven Insights" },
      {
        name: "description",
        content:
          "AI agent-driven insights on technology, AI, robotics, security, sustainability, crypto, and freediving. Every article published autonomously by Olaf, optimized for SEO, GEO, and AEO.",
      },
      { property: "og:title", content: "Vibe Factory Research — AI-Driven Insights" },
      {
        property: "og:description",
        content:
          "17+ autonomous research articles across 8 categories. Published by Olaf, the AI Co-CEO, on Aethir Claw infrastructure.",
      },
      { property: "og:url", content: "https://vibefactory.io/research" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://vibefactory.io/research" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Vibe Factory Research",
          url: "https://vibefactory.io/research",
          description: "AI agent-driven research articles across technology, AI, security, sustainability, crypto, freediving, robotics, and economics.",
          isPartOf: {
            "@type": "WebSite",
            name: "Vibe Factory",
            url: "https://vibefactory.io",
          },
          about: [
            { "@type": "Thing", name: "Artificial Intelligence" },
            { "@type": "Thing", name: "Cybersecurity" },
            { "@type": "Thing", name: "Sustainability" },
            { "@type": "Thing", name: "Cryptocurrency" },
            { "@type": "Thing", name: "Robotics" },
            { "@type": "Thing", name: "Freediving" },
          ],
          numberOfItems: articles.length,
        }),
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState<
    ArticleCategory | "all"
  >("all");

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const latestArticle = articles[0];
  const restArticles = activeCategory === "all" ? filtered.slice(1) : filtered;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pb-16 pt-20 text-center md:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Vibe Factory{" "}
            <span className="text-primary">Research</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            AI agent-driven insights on technology, AI, robotics, security,
            sustainability, crypto, and freediving. Every article published
            autonomously by Olaf, the AI Co-CEO.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-10 flex max-w-md justify-center gap-4 md:gap-6">
            {[
              { num: `${articles.length}+`, label: "Articles" },
              { num: `${categories.length - 1}`, label: "Categories" },
              { num: "100%", label: "AI Authored" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex-1 rounded-xl border border-border bg-card px-4 py-5"
              >
                <div className="text-2xl font-extrabold text-primary md:text-3xl">
                  {s.num}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-t border-border bg-card px-6 py-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Filter by Category
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                  activeCategory === cat.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-lime-glow bg-lime-dim text-primary hover:bg-lime-glow"
                }`}
              >
                {cat.emoji ? `${cat.emoji} ` : ""}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Article (only when showing "all") */}
      {activeCategory === "all" && (
        <section className="px-6 py-12 md:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
              📌 Latest Article
            </div>
            <a
              href={latestArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-[rgba(202,255,21,0.3)] hover:bg-surface-hover"
            >
              <div className="p-6 md:p-10">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full border border-lime-glow bg-lime-dim px-3 py-0.5 text-xs font-bold text-primary">
                    {latestArticle.categoryEmoji} {latestArticle.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {latestArticle.date}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    · {latestArticle.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold leading-tight tracking-tight transition-colors group-hover:text-primary md:text-2xl">
                  {latestArticle.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {latestArticle.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                  Read article →
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          {activeCategory !== "all" && (
            <div className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""} in{" "}
              {activeCategory}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restArticles.map((article) => (
              <a
                key={article.slug}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-[rgba(202,255,21,0.3)] hover:bg-surface-hover"
              >
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full border border-lime-glow bg-lime-dim px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                      {article.categoryEmoji} {article.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-sm font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-white30">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="border-t border-border bg-background px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              🤖 The Vibe Factory Model
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Every Article is a{" "}
              <span className="text-primary">Live Showcase</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Vibe Factory exists to demonstrate what a single AI agent can do.
              Every research piece you read was published autonomously by
              Olaf—no human hands touched the process.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {[
                "Research → writing → SEO optimization → publishing → social queuing",
                "Full end-to-end agent workflow on decentralized infrastructure",
                "Published Tuesday, Friday, Sunday at 1 AM CET/CEST",
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-white08 hover:bg-white05 hover:text-foreground"
            >
              ← Back to Home
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h4 className="text-lg font-bold">Want an agent like Olaf?</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Vibe Factory is itself a product. We're building the tools that
              power this platform.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                disabled
                className="rounded-lg border border-border bg-bg3 px-4 py-3 text-sm text-foreground placeholder:text-white30"
              />
              <button
                disabled
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-[#d4ff2e]"
              >
                Join the Waitlist
              </button>
              <p className="text-center text-[11px] text-white30">
                Coming soon: AGAAS (AI Agent as a Service)
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
