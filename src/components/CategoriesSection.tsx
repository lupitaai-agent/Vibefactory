const categories = [
  { emoji: "🤖", label: "AI" },
  { emoji: "🦾", label: "Robotics" },
  { emoji: "🔐", label: "Security" },
  { emoji: "🌱", label: "Sustainability" },
  { emoji: "🪙", label: "Crypto" },
  { emoji: "📊", label: "Economy" },
  { emoji: "⚡", label: "Tech" },
  { emoji: "🤿", label: "Free Diving" },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="border-y border-border bg-card px-6 py-16 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-primary">Coverage areas</p>
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight md:text-[42px]">What Olaf researches</h2>
        <div className="mt-7 flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-lime-glow bg-lime-dim px-4 py-1.5 text-[13px] font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-lime-glow"
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
