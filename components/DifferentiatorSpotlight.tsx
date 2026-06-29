import { reviews } from "@/content/reviews";
import { Button } from "@/components/ui/Button";
import { Checklist } from "@/components/Checklist";
import { Reveal } from "@/components/ui/Reveal";
import { Star } from "lucide-react";

const checklist = [
  "Property prep before listing",
  "Tenant coordination",
  "Repairs & contractor management",
  "Marketing & showings",
  "Negotiation for top dollar",
  "Closing from anywhere",
];

export function DifferentiatorSpotlight() {
  const quote = reviews.find((r) => r.id === "mark-lumpkin");

  return (
    <section className="bg-ink text-bone">
      <div className="container-page grid items-center gap-12 py-section lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">The differentiator</p>
          <h2 className="mt-4 font-serif text-h2 text-bone">
            Own property in Vegas but live somewhere else? I&apos;m your eyes on the ground.
          </h2>
          <p className="mt-5 max-w-prose text-body-l text-bone/75">
            Many of Kassidy&apos;s clients live out of state and trust him to handle everything
            locally — prepping the property, managing tenants, coordinating repairs, and selling
            for top dollar. Everything from A to Z, without you getting on a plane.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/out-of-state-owners" size="lg">See how it works</Button>
            <Button href="/contact?type=out-of-state" variant="secondary-dark" size="lg">
              Talk to Kassidy
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-card border border-line-dark bg-ink-soft p-8">
            <Checklist items={checklist} tone="dark" />
            {quote && (
              <figure className="mt-8 border-t border-line-dark pt-6">
                <div className="flex gap-0.5 text-gold" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 text-body text-bone/80">
                  &ldquo;He took care of the tenant, found a contractor, made sure the work was done
                  right, then sold the house for top dollar. Everything from A to Z.&rdquo;
                </blockquote>
                <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-bone/50">
                  {quote.context} · {quote.year}
                </figcaption>
              </figure>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
