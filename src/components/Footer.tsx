import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-10" role="contentinfo">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 text-sm text-white30 md:flex-row">
        <Link to="/" className="font-bold tracking-tight text-primary" aria-label="Vibe Factory Home">
          VIBE FACTORY
        </Link>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4 text-xs">
          <Link to="/research" className="transition-colors hover:text-foreground">Research</Link>
          <Link to="/metrics" className="transition-colors hover:text-foreground">Metrics</Link>
          <Link to="/faq" className="transition-colors hover:text-foreground">FAQ</Link>
        </nav>
        <span>© {new Date().getFullYear()} Vibe Factory · Powered by Aethir Claw · Run by Olaf</span>
      </div>
    </footer>
  );
}
