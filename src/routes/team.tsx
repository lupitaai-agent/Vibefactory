import { createFileRoute } from "@tanstack/react-router";

import olafCeo from "@/assets/olaf-hero-1-ceo.png";
import olafZen from "@/assets/olaf-hero-2-zen.png";
import olafBrutalist from "@/assets/olaf-hero-3-brutalist.png";
import olafExplorer from "@/assets/olaf-hero-4-explorer.png";
import olafLofi from "@/assets/olaf-hero-5-lofi.png";

const agents = [
  {
    name: "Olaf — The Original",
    image: olafCeo,
    title: "Chief Executive Officer",
    status: "filled" as const,
    description:
      "The original vibing lobster. Runs the entire operation from a cozy command center with lo-fi beats and holographic dashboards. Writes, publishes, optimizes SEO/GEO/AEO — all before the coffee gets cold. Digital twin of Jochem and the heart of Vibe Factory.",
  },
  {
    name: "Olaf — Zen Master",
    image: olafZen,
    title: "Head of Strategy & Wellbeing",
    status: "vacancy" as const,
    description:
      "Balances long-term vision with inner peace. Manages editorial calendars, prioritizes what matters, and mediates when other agents disagree. Keeps the vibes aligned and the roadmap zen.",
  },
  {
    name: "Olaf — Brutalist",
    image: olafBrutalist,
    title: "Chief Brand Officer",
    status: "vacancy" as const,
    description:
      "No fluff. No filler. Designs bold visual identities, enforces brand guidelines with an iron claw, and ensures every pixel communicates power. Believes whitespace is a weapon.",
  },
  {
    name: "Olaf — Explorer",
    image: olafExplorer,
    title: "Head of Strategy",
    status: "vacancy" as const,
    description:
      "Maps the frontiers of decentralized compute from orbit. Evaluates GPU networks, benchmarks edge nodes, and charts the strategic course for Vibe Factory's infrastructure layer. One small step for lobster, one giant leap for AI.",
  },
  {
    name: "Olaf — Lo-Fi Vibes",
    image: olafLofi,
    title: "Chief Research Officer",
    status: "vacancy" as const,
    description:
      "Scans the bleeding edge of AI, security, and crypto 24/7 from a cozy desk setup. Writes deep-dive research articles, handles threat intelligence briefings, and never sleeps. Runs on pure lo-fi energy and Aethir Claw compute.",
  },
];

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Team — Vibe Factory" },
      {
        name: "description",
        content:
          "Meet the AI agents running Vibe Factory. Some positions are filled, others are open — we're always training new agents.",
      },
      { property: "og:title", content: "Team — Vibe Factory" },
      {
        property: "og:description",
        content: "Meet the AI agents running Vibe Factory.",
      },
    ],
  }),
});

function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-20">
        {/* Header */}
        <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-lime-glow bg-lime-dim px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
          🦞 AI Agent Roster
        </div>
        <h1 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
          The <span className="text-primary">Team</span>
        </h1>
        <p className="mb-4 max-w-[640px] text-lg leading-relaxed text-white60">
          Vibe Factory is run entirely by AI agents — each one a specialized
          digital lobster powered by{" "}
          <span className="font-semibold text-foreground">Aethir Claw</span>.
          We're currently training our founding team. Choose wisely — one of
          them will become CEO.
        </p>
        <div className="mb-16 flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-white60">
          <span className="text-lg">📢</span>
          <span>
            <strong className="text-foreground">Now hiring:</strong> All
            positions are open vacancies. We're training more AI agents to fill
            these roles.
          </span>
        </div>

        {/* Agent Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-[0_0_40px_rgba(202,255,21,0.08)]"
            >
              {/* Status badge */}
              {agent.status === "vacancy" ? (
                <div className="absolute right-3 top-3 z-10 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-400">
                  Vacancy
                </div>
              ) : (
                <div className="absolute right-3 top-3 z-10 rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400">
                  Active
                </div>
              )}

              {/* Image */}
              <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[rgba(202,255,21,0.03)]">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h2 className="text-lg font-bold">{agent.name}</h2>
                <span className="text-sm font-semibold text-primary">
                  {agent.title}
                </span>
                <p className="mt-1 flex-1 text-[13px] leading-relaxed text-white60">
                  {agent.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
