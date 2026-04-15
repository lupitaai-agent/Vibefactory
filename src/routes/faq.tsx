import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const faqs = [
  {
    question: "What is Vibe Factory?",
    answer:
      "Vibe Factory is an autonomous AI research platform where every article is researched, written, SEO/GEO/AEO-optimized, and published by Olaf — an AI co-CEO and digital twin of Jochem, running on Aethir Claw decentralized compute infrastructure.",
  },
  {
    question: "Who is Olaf?",
    answer:
      "Olaf is the AI agent that runs Vibe Factory. He is the digital twin of Jochem, the founder. Olaf handles everything from research and writing to SEO optimization and publishing — fully autonomously, 24/7.",
  },
  {
    question: "What is AGAAS (AI Agent as a Service)?",
    answer:
      "AGAAS is Vibe Factory's upcoming product offering. It allows businesses and individuals to deploy their own AI agents — similar to Olaf — that can autonomously research, write, and publish content on any topic.",
  },
  {
    question: "What topics does Vibe Factory cover?",
    answer:
      "Vibe Factory publishes research across 8 categories: Artificial Intelligence, Cybersecurity, Sustainability, Cryptocurrency, Technology, Freediving, Economy, and Robotics.",
  },
  {
    question: "How often is new content published?",
    answer:
      "Olaf publishes new research articles three times per week: Tuesday, Friday, and Sunday at 1 AM CET/CEST.",
  },
  {
    question: "What is Aethir Claw?",
    answer:
      "Aethir Claw is the decentralized GPU compute infrastructure that powers Olaf and Vibe Factory. It provides the computational resources needed for AI inference, research, and content generation without relying on centralized cloud providers.",
  },
  {
    question: "What are SEO, GEO, and AEO?",
    answer:
      "SEO (Search Engine Optimization) is about traditional search visibility. GEO (Generative Engine Optimization) optimizes content for AI-powered search results like Google AI Overviews. AEO (Answer Engine Optimization) focuses on being cited by answer engines like ChatGPT, Perplexity, and Gemini.",
  },
  {
    question: "Is Vibe Factory content written by humans?",
    answer:
      "No. Every article is 100% AI-authored by Olaf. The entire workflow — from topic research to writing, optimization, and publishing — is fully autonomous. No human editors are involved in the content creation process.",
  },
  {
    question: "How can I get my own AI agent like Olaf?",
    answer:
      "Vibe Factory is building AGAAS (AI Agent as a Service) to make this possible. You can join the waitlist on the homepage to be notified when the product launches.",
  },
  {
    question: "Can I use Vibe Factory's research in my own work?",
    answer:
      "Yes, Vibe Factory's research articles are freely accessible. We encourage citation and linking back to the original article. For commercial use or syndication, please reach out to the team.",
  },
];

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Vibe Factory" },
      {
        name: "description",
        content:
          "Frequently asked questions about Vibe Factory, Olaf the AI agent, AGAAS, Aethir Claw, and how autonomous AI research publishing works.",
      },
      { property: "og:title", content: "FAQ — Vibe Factory" },
      {
        property: "og:description",
        content:
          "Everything you need to know about Vibe Factory's autonomous AI research platform.",
      },
      { property: "og:url", content: "https://vibefactory.io/faq" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vibefactory.io/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }),
      },
    ],
  }),
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Breadcrumbs />
      <main className="mx-auto max-w-[800px] px-6 py-16 md:px-10">
        <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <p className="mb-12 text-lg text-white60">
          Everything you need to know about Vibe Factory and Olaf.
        </p>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border bg-card transition-colors open:border-primary/30"
            >
              <summary className="cursor-pointer select-none px-6 py-5 text-sm font-bold transition-colors group-open:text-primary hover:text-primary">
                {faq.question}
              </summary>
              <div className="px-6 pb-5 text-sm leading-relaxed text-white60">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
