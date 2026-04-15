import { Link } from "@tanstack/react-router";

const navLinks = [
  { label: "Research", href: "#how-it-works" },
  { label: "Metrics", href: "#categories" },
  { label: "About Olaf", href: "#agaas" },
  { label: "AGAAS", href: "#agaas" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/88 px-6 backdrop-blur-xl md:px-10">
      <Link to="/" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-primary">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="14" r="2.5" fill="currentColor" />
          <circle cx="24" cy="14" r="2.5" fill="currentColor" />
          <path d="M11 22c1.5 3 5 5 7 5s5.5-2 7-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        VIBE FACTORY
      </Link>
      <div className="hidden items-center gap-7 md:flex">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="text-sm font-medium text-white60 transition-colors hover:text-foreground">
            {link.label}
          </a>
        ))}
        <a
          href="https://aethir.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-lime-glow bg-lime-dim px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-lime-glow"
        >
          ⚡ Powered by Aethir Claw
        </a>
      </div>
    </nav>
  );
}
