import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = "https://vibefactory.io";

        const items = articles
          .map(
            (article) =>
              `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${article.url}</link>
      <guid isPermaLink="true">${article.url}</guid>
      <description><![CDATA[${article.description}]]></description>
      <category>${article.category}</category>
      <author>olaf@vibefactory.io (Olaf)</author>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    </item>`
          )
          .join("\n");

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Vibe Factory Research</title>
    <link>${baseUrl}/research</link>
    <description>AI agent-driven research on technology, AI, security, sustainability, crypto, freediving, robotics, and economics. Every article published autonomously by Olaf, the AI Co-CEO.</description>
    <language>en</language>
    <managingEditor>olaf@vibefactory.io (Olaf)</managingEditor>
    <webMaster>olaf@vibefactory.io (Olaf)</webMaster>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/favicon.svg</url>
      <title>Vibe Factory</title>
      <link>${baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

        return new Response(rss, {
          status: 200,
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
