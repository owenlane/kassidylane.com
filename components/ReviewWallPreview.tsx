import { reviews } from "@/content/reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

// A curated, themed subset for the homepage wall (full set lives on /reviews).
const featuredIds = [
  "treyscott15",
  "heaven-angelique",
  "mark-lumpkin",
  "dreyja123",
  "kron-kevin",
  "isaiah-boles",
];

export function ReviewWallPreview() {
  const featured = featuredIds
    .map((id) => reviews.find((r) => r.id === id))
    .filter(Boolean) as typeof reviews;

  return (
    <section className="bg-bone">
      <div className="container-page py-section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Client reviews</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">Every review, five stars. Here&apos;s why.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/reviews" variant="secondary">Read all reviews</Button>
            <Button href="/contact">Start your move</Button>
          </div>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {featured.map((review, i) => (
            <Reveal key={review.id} delay={(i % 3) * 60}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
