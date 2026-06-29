import type { Metadata } from "next";
import { ValuationForm } from "@/components/ValuationForm";
import { CredentialsStrip } from "@/components/TrustMicroBar";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { reviews } from "@/content/reviews";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What's My Las Vegas Home Worth? | Free Valuation",
  description:
    "Get a real valuation from a Las Vegas agent who sells over ask — not an automated guess. Tell Kassidy about your home and he'll personally review it.",
  alternates: { canonical: "/home-value" },
};

const reasons = [
  { title: "Accuracy over algorithms", body: "Automated estimates miss condition, upgrades, and street-by-street nuance. Kassidy doesn't." },
  { title: "Strategy, not just a number", body: "A real valuation comes with a plan to position your home for the strongest offers." },
  { title: "Top-dollar positioning", body: "His sellers describe homes sold over ask, with multiple offers — that starts with pricing it right." },
];

export default function HomeValuePage() {
  const sellerProof = reviews
    .filter((r) => r.segments.includes("seller"))
    .filter((r) => /over ask|top dollar|highest price|multiple offers|one week/i.test(r.text))
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Home Value", path: "/home-value" },
        ])}
      />

      {/* Hero with form */}
      <section className="relative overflow-hidden bg-ink pb-section pt-36 text-bone lg:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-soft via-ink to-ink" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 85% 5%, rgba(196,154,72,0.20), transparent 60%)",
          }}
        />
        <Container className="relative">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:pt-6">
              <p className="eyebrow">Home valuation</p>
              <h1 className="mt-5 font-serif text-h1 text-bone">
                What&apos;s your Las Vegas home really worth?
              </h1>
              <p className="mt-6 max-w-prose text-body-l text-bone/75">
                Skip the automated guess. Tell Kassidy about your property and he&apos;ll personally
                review it — then reach out with a real valuation and a plan to get top dollar.
              </p>
              <div className="mt-8 hidden lg:block">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-bone/50">
                  Prefer to talk?
                </p>
                <a href={site.phoneHref} className="mt-2 inline-flex items-center gap-2 font-serif text-h3 text-bone">
                  <Phone className="h-5 w-5 text-gold" aria-hidden /> {site.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="lg:pt-0">
              <ValuationForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Why a real valuation */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="max-w-2xl">
            <p className="eyebrow">Why it matters</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">
              A real agent valuation beats an automated estimate.
            </h2>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 70} className="border-t border-line pt-5">
                <h3 className="font-serif text-h3 text-ink">{r.title}</h3>
                <p className="mt-2 text-body text-slate">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Seller proof */}
      {sellerProof.length > 0 && (
        <section className="border-t border-line bg-paper">
          <Container className="py-section">
            <div className="max-w-xl">
              <p className="eyebrow">Seller results</p>
              <h2 className="mt-4 font-serif text-h2 text-ink">Priced right. Sold for more.</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {sellerProof.map((review, i) => (
                <Reveal key={review.id} delay={i * 70}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
            <div className="mt-10">
              <Button href={site.phoneHref} variant="secondary">
                <Phone className="h-4 w-4 text-gold-deep" aria-hidden /> Prefer to talk? Call now
              </Button>
            </div>
          </Container>
        </section>
      )}

      <CredentialsStrip />
    </>
  );
}
