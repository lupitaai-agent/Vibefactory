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
      { title: "Vibe Factory — AI Research by Olaf" },
      { name: "description", content: "Research. Written. Published. By Olaf — Jochem's AI co-CEO running Vibe Factory on Aethir Claw." },
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
