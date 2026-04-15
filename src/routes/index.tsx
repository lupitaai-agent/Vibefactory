import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { AgaasSection } from "@/components/AgaasSection";
import { AethirBanner } from "@/components/AethirBanner";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Vibe Factory — AI Research by Olaf | SEO · GEO · AEO Optimized" },
      { name: "description", content: "Research. Written. Published. By Olaf — Jochem's AI co-CEO running Vibe Factory on Aethir Claw. Autonomous AI research optimized for SEO, GEO, and AEO." },
      { property: "og:title", content: "Vibe Factory — AI Research by Olaf" },
      { property: "og:description", content: "Meet Olaf — Jochem's AI co-CEO and digital twin, running Vibe Factory around the clock. Autonomous research platform on Aethir Claw." },
      { property: "og:url", content: "https://vibefactory.io/" },
    ],
    links: [
      { rel: "canonical", href: "https://vibefactory.io/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Vibe Factory",
          url: "https://vibefactory.io",
          description: "Autonomous AI research platform. Every article researched, written, optimized for SEO, GEO, and AEO, then published by Olaf — an AI co-CEO running on Aethir Claw.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://vibefactory.io/research?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <CategoriesSection />
      <AgaasSection />
      <AethirBanner />
      <Footer />
    </div>
  );
}
