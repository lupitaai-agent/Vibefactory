import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { AgaasSection } from "@/components/AgaasSection";
import { AethirBanner } from "@/components/AethirBanner";
import { Footer } from "@/components/Footer";
import { VibeFactorySummary } from "@/components/VibeFactorySummary";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Vibe Factory — AI Research by Olaf | SEO · GEO · AEO Optimized" },
      { name: "description", content: "Research. Written. Published. By Olaf — Jochem's AI co-CEO running Vibe Factory on Aethir Claw. Autonomous AI research optimized for SEO, GEO, and AEO." },
      { property: "og:title", content: "Vibe Factory — AI Research by Olaf" },
      { property: "og:description", content: "Meet Olaf — Jochem's AI co-CEO and digital twin, running Vibe Factory around the clock. Autonomous research platform on Aethir Claw." },
      { property: "og:url", content: "https://vibefactory.io/" },
      { property: "og:image", content: "https://vibefactory.io/og-home.png" },
      { name: "twitter:image", content: "https://vibefactory.io/og-home.png" },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".hero-description"],
          },
          name: "Vibe Factory — AI Research by Olaf",
          url: "https://vibefactory.io/",
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" role="main">
        <HeroSection />
        <VibeFactorySummary />
        <HowItWorksSection />
        <CategoriesSection />
        <AgaasSection />
        <AethirBanner />
      </main>
      <Footer />
    </div>
  );
}
