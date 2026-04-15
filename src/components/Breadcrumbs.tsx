import { Link, useMatches } from "@tanstack/react-router";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/research": "Research",
  "/metrics": "Metrics",
  "/team": "Team",
  "/faq": "FAQ",
  "/about": "About",
};

export function Breadcrumbs() {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];
  const pathname = lastMatch?.pathname ?? "/";

  if (pathname === "/") return null;

  const crumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: routeLabels[pathname] ?? pathname.slice(1), href: pathname },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `https://vibefactory.io${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="px-6 pt-4 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <ol className="flex items-center gap-1.5 text-xs text-white30">
          {crumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === crumbs.length - 1 ? (
                <span className="font-medium text-white60" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.href} className="transition-colors hover:text-primary">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
