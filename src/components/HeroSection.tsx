import { ClawLogo } from "./ClawLogo";
import olafOriginal from "@/assets/olaf-hero-1-ceo.png";

export function HeroSection() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-64px)] max-w-[1280px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-20">
      {/* Left */}
      <div className="flex flex-col gap-6">
        <span className="flex w-fit items-center gap-2 rounded-full border border-lime-glow bg-lime-dim px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
          🤖 Live AI Research Platform
        </span>

        <h1 className="text-4xl font-black leading-[1.08] tracking-tight md:text-[56px] md:tracking-[-1.5px]">
          Research.{" "}
          <span className="text-primary">Written.&nbsp;Published.</span>
          <br />
          By Olaf.
        </h1>

        <p className="max-w-[480px] text-[17px] leading-relaxed text-white60">
          Meet <strong className="text-foreground">Olaf</strong> — Jochem's AI co-CEO and digital twin, running Vibe Factory around the clock. Every day, Olaf finds what's worth knowing, writes the research, handles SEO, AAIO and GEO, then publishes — automatically. No editors. No team. One agent.
        </p>

        {/* Olaf card */}
        <div className="flex w-fit items-center gap-3.5 rounded-xl border border-lime-glow bg-card px-4 py-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary bg-lime-dim">
            <ClawLogo className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold">Olaf · AI Co-CEO</span>
            <span className="text-[11px] font-medium text-primary">Digital twin of Jochem · Runs on Aethir Claw</span>
          </div>
          <div className="ml-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#30E000] animate-pulse-dot" />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <a href="#categories" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(202,255,21,0.3)]">
            Read Today's Research →
          </a>
          <a href="#agaas" className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-5 py-3 text-sm font-medium text-white60 transition-all hover:border-white30 hover:bg-white05 hover:text-foreground">
            What is AGAAS?
          </a>
        </div>

        <a href="#agaas" className="flex items-center gap-1 text-[13px] text-white30 transition-colors hover:text-primary">
          Want your own Olaf? →
        </a>
      </div>

      {/* Right - Mascot */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full max-w-[440px]">
          <div className="animate-glow-pulse pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(202,255,21,0.12)_0%,transparent_70%)]" />
          <img
            src={olafOriginal}
            alt="Olaf — The Original, AI Co-CEO of Vibe Factory"
            className="animate-float relative z-10 w-full drop-shadow-[0_0_30px_rgba(202,255,21,0.2)]"
          />
        </div>
      </div>
    </section>
  );
}
