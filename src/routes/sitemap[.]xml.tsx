import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = "https://vibefactory.io";

        const staticPages = [
          { loc: "/", priority: "1.0", changefreq: "daily" },
          { loc: "/research", priority: "0.9", changefreq: "daily" },
        ];

        const staticUrls = staticPages
          .map(
            (page) =>
              `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
          )
          .join("\n");

        const articleUrls = articles
          .map(
            (article) =>
              `  <url>
    <loc>${article.url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
          )
          .join("\n");

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${articleUrls}
</urlset>`;

        return new Response(sitemap, {
          status: 200,
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
            "X-Robots-Tag": "noindex",
          },
        });
      },
    },
  },
});
