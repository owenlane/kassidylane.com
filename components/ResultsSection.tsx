import { ResultCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

// Phrases below are drawn directly from real client reviews — not invented figures.
const results = [
  {
    result: "Sold WAY over ask",
    context: "Prompt and strategic in the listing, and knew the market better than anyone.",
    attribution: "Seller · Summerlin North · 2022",
  },
  {
    result: "In contract within one week",
    context: "An open house with at least five offers, closed at the best and highest price.",
    attribution: "Seller · Enterprise · 2021",
  },
  {
    result: "Top dollar, from out of state",
    context: "Went above and beyond to sell remotely — and got top dollar doing it.",
    attribution: "Seller · Spring Valley · 2019",
  },
];

export function ResultsSection() {
  return (
    <section className="bg-bone">
      <div className="container-page py-section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">The record</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">A negotiator who gets you more.</h2>
          </div>
          <Button href="/reviews" variant="secondary">Read more wins</Button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {results.map((r, i) => (
            <Reveal key={r.result} delay={i * 80}>
              <ResultCard {...r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
