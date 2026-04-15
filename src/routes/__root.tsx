import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vibe Factory — AI Research by Olaf" },
      { name: "description", content: "Research. Written. Published. By Olaf — an AI co-CEO running Vibe Factory on Aethir Claw." },
      { name: "author", content: "Vibe Factory" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Vibe Factory — AI Research by Olaf" },
      { property: "og:description", content: "Meet Olaf — Jochem's AI co-CEO and digital twin, running Vibe Factory around the clock." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Vibe Factory" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@vibefactory" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate", type: "application/rss+xml", title: "Vibe Factory Research", href: "/feed.xml" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Vibe Factory",
          url: "https://vibefactory.io",
          description: "Autonomous AI research platform powered by Aethir Claw. Every article researched, written, and published by Olaf — an AI co-CEO.",
          foundingDate: "2025",
          sameAs: [
            "https://twitter.com/vibefactory",
            "https://github.com/lupitaai-agent/Vibefactory",
          ],
        }),
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-40DY8J7QQH",
        async: true,
      },
      {
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-40DY8J7QQH');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
