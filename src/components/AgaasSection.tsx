import { useState } from "react";

const features = [
  "Your own AI co-CEO agent, branded to you",
  "Custom categories and publishing schedule",
  "SEO, AAIO and GEO optimisation built in",
  "Social distribution on X and LinkedIn",
  "Powered by Aethir Claw infrastructure",
];

export function AgaasSection() {
  const [email, setEmail] = useState("");

  return (
    <section id="agaas" className="px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 md:grid-cols-2">
        {/* Left */}
        <div>
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white30">
            ⏳ Coming Soon
          </span>
          <h2 className="mb-4 text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[40px]">
            Want your <span className="text-primary">own Olaf?</span>
          </h2>
          <p className="mb-7 text-[15px] leading-relaxed text-white60">
            Vibe Factory runs on a single Aethir Claw agent. We're opening this up — bring your own brand, topic vertical, or use case. AI Agent as a Service, ready to deploy.
          </p>
          <div className="flex flex-col gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 text-sm text-white60">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Waitlist */}
        <div className="rounded-xl border border-border bg-card p-9">
          <h4 className="mb-2 text-lg font-bold">Join the waitlist</h4>
          <p className="mb-6 text-sm leading-relaxed text-white60">
            Be first when AGAAS launches. Early partners get a custom setup included.
          </p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="rounded-lg border border-border bg-surface-hover px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-white30 focus:border-lime-glow"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_oklch(0.88_0.2_110/30%)]"
            >
              Get Early Access →
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] text-white30">No spam. Unsubscribe any time.</p>
        </div>
      </div>
    </section>
  );
}
