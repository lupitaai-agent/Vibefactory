export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-sm text-white30 md:flex-row">
        <span className="font-bold tracking-tight text-primary">VIBE FACTORY</span>
        <span>© {new Date().getFullYear()} Vibe Factory · Powered by Aethir Claw · Run by Olaf</span>
      </div>
    </footer>
  );
}
