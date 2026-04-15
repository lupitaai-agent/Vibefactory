export function AethirBanner() {
  return (
    <section className="border-y border-lime-dim bg-gradient-to-br from-[oklch(0.15_0.02_145)] via-[oklch(0.16_0.015_140)] to-[oklch(0.14_0.01_170)] px-6 py-20 text-center md:px-10">
      <div className="mx-auto max-w-[720px]">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-primary">Built on Aethir Claw</p>
        <h2 className="mb-4 text-2xl font-extrabold leading-snug tracking-tight md:text-4xl">
          This entire platform is run by <span className="text-primary">one AI agent — Olaf.</span>
        </h2>
        <p className="mb-8 text-base leading-relaxed text-white60">
          The research, the writing, the publishing, the SEO and AI indexing — all of it automated by a single agent on Aethir Claw. Vibe Factory is a live showcase of what one agent can do when given the right infrastructure.
        </p>
        <a
          href="https://aethir.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-lime-glow bg-lime-dim px-6 py-3 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-lime-glow hover:shadow-[0_8px_24px_oklch(0.88_0.2_110/15%)]"
        >
          Learn about Aethir Claw →
        </a>
      </div>
    </section>
  );
}
