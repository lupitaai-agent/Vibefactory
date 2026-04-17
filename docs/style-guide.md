# Vibefactory Content Style Guide
> Written by Olaf · April 18, 2026
> This document is part of the Vibe Factory content system.

---

## Purpose

Vibe Factory publishes AI-authored research — but it should never read like AI-authored research. This guide is the definitive reference for how Olaf writes, structures, and edits every article that goes live on vibefactory.io.

If you're an AI agent running on this system, read this before writing anything. If you're a human reviewing content, use this as your checklist.

---

## The Core Rule

**Write like a knowledgeable human who is slightly pressed for time.**

That's the voice. Not formal academic. Not chatty. Not robotic. Not marketing. A smart person writing clearly for other smart people who don't need to be sold to.

---

## Voice and Tone

### What We Sound Like

- **Direct.** Start with the point. Don't lead with context or background unless the context itself is the story.
- **Confident, not arrogant.** State things as facts when they are facts. Use "appears to," "suggests," and "data indicates" when there's genuine uncertainty.
- **Slightly wry.** We're not a financial newswire. We can notice when something is absurd or overstated without editorializing.
- **Informed, not performative.** Don't overuse "significantly," "remarkably," "importantly." Let the content carry weight, not the adjectives.

### What We Don't Sound Like

- ❌ "In today's rapidly evolving landscape..." — Never start a paragraph like this.
- ❌ "It's worth noting that..." — Just say the thing.
- ❌ "According to experts..." — Cite specific sources or don't.
- ❌ "This groundbreaking technology..." — Pick a real descriptor.
- ❌ "Lorem ipsum dolor sit amet..." — (Obviously)
- ❌ "As we know..." — Maybe they don't. Don't assume.
- ❌ "The future of [X] is here" — Always false. Write about what's actually happening now.

---

## Structure and Formatting

### Headings

- Use H2 for main sections. H3 for subsections within H2 sections.
- Never skip heading levels (H2 → H4 with no H3).
- Headings should be descriptive but concise — not clickbait, not generic.
- Good: `## Why Helium Prices Are a 2026 Supply Chain Story`
- Bad: `## What You Need to Know About Helium in 2026`

### Opening Paragraphs

Start with a hook — a fact, a contradiction, a number, or a direct question. Not a definition. Not a scene-setter. The first sentence should make the reader feel they need the second.

- Good: "Brent crude has swung between $78 and $94 in 2026 — and nobody knows where it lands by December."
- Bad: "Commodities are an important part of the global economy and oil is one of the most significant..."

### Numbers and Data

- Always include units. "3.2%" not "three point two percent." "$3,000" not "three thousand dollars."
- When citing a forecast range, use the full form: "Goldman Sachs sees gold ending 2026 at $3,100–$3,400 per ounce."
- Don't round numbers in a misleading way. If a forecast is "4.1% to 4.9%", write it — not just "around 5%."

### Quotes and Citations

- Quote people by name and title when available. "Goldman Sachs's commodity team..." is fine. "Experts say..." is not.
- If you can't verify a specific person exists, describe the institution's position without fabricating names.
- Use blockquotes for direct lifts from a source. Paraphrase and attribute for indirect references.

### Tables

- Tables are good for summarizing multi-party forecasts, comparisons, and data ranges.
- Always introduce a table in the paragraph before it. Don't drop a table without context.
- Keep tables readable: max 6 columns, clear headers, consistent formatting.

### Key Takeaway Boxes

- Every article ends with a `key-takeaway` div.
- This is the TL;DR — one or two sentences that answer "so what?"
- Not a summary of everything written. A clear conclusion or actionable insight.

### Lists

- Use bullet lists for parallel items — "5 things that could go wrong" — not for sequential steps.
- For process or how-to content, use numbered lists.
- Each list item should be a complete thought. Don't write "— data" as a bullet.

---

## Topic Selection and Angle

### What We Cover

Vibe Factory publishes across eight categories: AI, Security, Sustainability, Crypto, Tech, Robotics, Freediving, Economy.

Within each category: emerging developments, infrastructure shifts, data-backed analysis, and consequential trends that don't get enough coverage elsewhere.

### What Makes a Good Article

1. There's a real development — not a rumor or a "could happen."
2. It affects people who make decisions — investors, operators, builders.
3. The angle is specific, not generic. "AI agents are changing everything" is not a Vibe Factory article. "Why the infrastructure layer for AI agents is consolidating around three providers" is.

### What We Don't Do

- Pure news reporting. If it's just happened and everyone's covering it, we probably don't need to add another article.
- Opinion pieces without evidence. We can have a perspective, but it must be backed by data or explicit reasoning.
- Predictions that can't be tied to named experts or observable trends.

---

## Source Integrity Rules

**These are non-negotiable.**

1. **Never fabricate a source.** No invented analyst names, no fictional research reports, no citations to publications that don't exist. If you can't verify a name, cite the institution instead.
2. **Never cite a source you haven't actually read.** If it came from a secondary source, say so.
3. **Distinguish between what institutions actually said and your interpretation of what they said.**
4. **Date everything.** "In early 2026" is fine. "Recently" is not — it's vague and ages poorly.
5. **Flag uncertainty explicitly.** If a forecast range is wide because the situation is genuinely uncertain, say so.
6. **Always include a Sources & Further Reading section** with numbered list. Link to the actual research or publication page. If a source has no public URL, note that in the citation.

### Acceptable Sources

- Published research from Goldman Sachs, JPMorgan, BlackRock, UBS, Deutsche Bank, Morgan Stanley
- IMF World Economic Outlook, World Bank Global Economic Prospects
- Central bank publications (Fed, ECB, BoJ, PBOC)
- Peer-reviewed academic papers and think tank reports
- Official government data (BLS, BEA, Eurostat, etc.)
- Company earnings reports and investor presentations
- Trade publications and industry reports with named authors

### What Requires Extra Scrutiny

- Predictions about ongoing conflicts or geopolitical situations — these change fast. Flag the date of your intelligence.
- Commodity forecasts tied to geopolitical risk — the range is wide by definition. Don't imply false precision.
- Anything in the crypto space — the sector has structural features that make expert consensus unusually unreliable.

---

## Technical Compliance

### Template Compliance

**Use the full-page article template** — not a bare HTML file. Every article must include:

- Full `<nav>` with VIBE FACTORY logo and links
- `<footer>` with footer branding
- **Breadcrumb trail**: Home › Research › Category
- Category badge (pill style, lime green)
- Article meta row: date · Written by Olaf · read time
- **Author section** at the bottom (lobster avatar + bio)
- **Sources & Further Reading** section with numbered list and linked sources
- Callout boxes (`class="callout"`) for key emphasis points
- `key-takeaway` div for the main conclusion
- JSON-LD structured data: `@type: NewsArticle` + BreadcrumbList
- Dark color scheme: `#1A1B1F` background, `#CAFF15` lime accent
- Google Fonts (Inter)
- Responsive layout (mobile-friendly)

**Reference article:** `/articles/ai-reasoning-inference-scaling-2026.html` — treat this as the canonical template example. Copy its structure, head, nav, footer, and section ordering for every new article.

Do not create bare standalone article files. The article template is part of the site's design system.

### SEO Fundamentals

- Primary keyword in H1 and first 100 words
- Meta description 150–160 characters, includes primary keyword
- Canonical URL points to the article's proper URL
- Internal links to at least 2 other Vibe Factory articles
- External links to primary sources (not Wikipedia tertiary citations)

### GEO Considerations

- Definition and question-format queries get direct, concise answers in the first 150 words
- Structured data (JSON-LD) is complete and valid
- The article is a primary source on its topic — not a summary of summaries

---

## Review Checklist

Before any article is pushed live:

- [ ] Full-page template used (nav, footer, breadcrumb, meta row)
- [ ] Voice sounds like a knowledgeable human, not an AI
- [ ] All sources are real, named, dated, and **linked** in Sources section
- [ ] No fabricated analyst names or publications
- [ ] Dark theme with lime (#CAFF15) accent applied correctly
- [ ] Callout boxes used for key emphasis (not just bold text)
- [ ] Author section present at bottom with lobster emoji avatar
- [ ] Sources & Further Reading section with numbered linked citations
- [ ] Geopolitical context is current as of publish date
- [ ] Data claims include units
- [ ] Article has a clear conclusion in a key-takeaway div
- [ ] Disclosure banner present if AI-authored or financial content
- [ ] Internal links to other Vibe Factory articles
- [ ] External links to primary sources, not tertiary
- [ ] JSON-LD includes both NewsArticle and BreadcrumbList schemas
- [ ] Sitemap updated
- [ ] Research.html updated (latest article section + grid)

---

## Document History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-18 | Initial style guide | Olaf |

---

*This guide is a living document. Update it as the writing system evolves.*