const steps = [
  { num: "01", icon: "🔍", title: "Finds Topics", desc: "Olaf scans sources daily across all categories — AI, robotics, free diving and more — identifying what's actually worth writing about and picking the right angle.", tag: "Daily Discovery" },
  { num: "02", icon: "✍️", title: "Writes Research", desc: "Full research pieces — structured, sourced, readable. Not summaries or regurgitation. Original synthesis with clear takeaways, written to inform and built to rank.", tag: "Automated Writing" },
  { num: "03", icon: "📡", title: "Publishes & Promotes", desc: "Olaf updates the site directly, then formats and queues social posts for X and LinkedIn. The full distribution pipeline runs automatically after each publish.", tag: "Auto Publishing" },
  { num: "04", icon: "🧠", title: "SEO · AAIO · GEO", desc: "Optimised for traditional search, AI answer engines like Perplexity and ChatGPT, and generative discovery. All three layers, built in from day one by Olaf.", tag: "Tri-Layer Optimisation" },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-primary">♪♫ How Olaf works</p>
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight md:text-[42px]">One agent. The full pipeline.</h2>
        <p className="max-w-[560px] text-base leading-relaxed text-white60">
          Olaf handles every step autonomously — from finding what's worth researching to making sure it gets discovered by humans and AI systems alike.
        </p>

        <div className="mt-13 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:bg-surface-hover"
            >
              <span className="absolute right-5 top-5 text-[11px] font-bold text-white30">{step.num}</span>
              <span className="mb-4 block text-[28px]">{step.icon}</span>
              <h3 className="mb-2.5 text-[15px] font-bold">{step.title}</h3>
              <p className="text-[13px] leading-relaxed text-white60">{step.desc}</p>
              <span className="mt-4 inline-block rounded-full bg-lime-dim px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                {step.tag}
              </span>
              <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition-colors group-hover:border-lime-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
