import { Link } from "@tanstack/react-router";
import { ClawLogo } from "./ClawLogo";

const navLinks = [
  { label: "Research", href: "/research" },
  { label: "Metrics", href: "/metrics" },
  { label: "About Olaf", href: "#agaas" },
  { label: "AGAAS", href: "#agaas" },
];

export function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-[rgba(26,27,31,0.88)] px-6 backdrop-blur-xl md:px-10"
      aria-label="Main navigation"
    >
      <Link to="/" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-primary" aria-label="Vibe Factory Home">
        <ClawLogo className="h-9 w-9" />
        VIBE FACTORY
      </Link>
      <div className="hidden items-center gap-7 md:flex">
        {navLinks.map((link) =>
          link.href.startsWith("/") ? (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-white60 transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm font-medium text-foreground" }}
            >
              {link.label}
            </Link>
          ) : (
            <a key={link.label} href={link.href} className="text-sm font-medium text-white60 transition-colors hover:text-foreground">
              {link.label}
            </a>
          )
        )}
        <a
          href="https://claw.aethir.com"
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
