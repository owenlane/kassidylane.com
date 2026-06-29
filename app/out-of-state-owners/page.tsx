import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Checklist } from "@/components/Checklist";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABanner } from "@/components/CTABanner";
import { ReviewCard } from "@/components/ReviewCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/content/reviews";
import { outOfStateFaqs } from "@/content/faqs";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sell Your Las Vegas Property From Out of State | Kassidy Lane",
  description:
    "Own property in Las Vegas but live elsewhere? Kassidy Lane handles prep, tenants, repairs, and a remote closing — and sells for top dollar.",
  alternates: { canonical: "/out-of-state-owners" },
};

const system = [
  "Property prep before listing",
  "Tenant coordination and communication",
  "Repairs and contractor management",
  "Professional marketing and showings",
  "Skilled negotiation for top dollar",
  "A closing you handle from anywhere",
];

const steps = [
  { title: "Call", body: "A quick conversation about your property, your goals, and your timeline." },
  { title: "Plan", body: "Kassidy assesses the property and builds a clear plan — prep, tenants, repairs." },
  { title: "Prep & list", body: "He coordinates everything locally, then markets the home to the right buyers." },
  { title: "Close remotely", body: "Negotiate, accept, and close — all without you getting on a plane." },
];

export default function OutOfStatePage() {
  const proof = reviews.filter((r) => r.segments.includes("out-of-state")).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(outOfStateFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Out-of-State Owners", path: "/out-of-state-owners" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Out-of-state owners"
        title="Your property in Vegas. Your peace of mind, anywhere."
        intro="Selling or managing a Las Vegas property from another state is stressful — tenants, repairs, prep, and trusting someone you've never met. That's exactly the situation Kassidy handles best."
      />

      {/* The problem */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">The problem</p>
              <h2 className="mt-4 font-serif text-h2 text-ink">Distance makes everything harder.</h2>
              <p className="mt-5 max-w-prose text-body-l text-slate">
                When you don't live nearby, the small things become big ones: who checks on the
                property, who manages the tenant, who lets in the contractor, who makes sure the work
                is done right? Most agents list a home. Far fewer will steward one.
              </p>
            </Reveal>
            <Reveal>
              <p className="eyebrow">The system</p>
              <h2 className="mt-4 font-serif text-h2 text-ink">A to Z, handled locally.</h2>
              <Checklist items={system} className="mt-6" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Proof */}
      {proof.length > 0 && (
        <section className="border-t border-line bg-paper">
          <Container className="py-section">
            <div className="max-w-xl">
              <p className="eyebrow">The proof</p>
              <h2 className="mt-4 font-serif text-h2 text-ink">Owners who sold from afar.</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {proof.map((review, i) => (
                <Reveal key={review.id} delay={i * 70}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Process */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="max-w-xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">Four steps, from anywhere.</h2>
          </div>
          <div className="mt-12">
            <ProcessSteps steps={steps} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-paper">
        <Container className="py-section">
          <div className="max-w-xl">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">What owners ask first.</h2>
          </div>
          <div className="mt-10 max-w-3xl">
            <FAQAccordion faqs={outOfStateFaqs} />
          </div>
        </Container>
      </section>

      <CTABanner heading="Start from anywhere." subheading="Tell Kassidy about your property and where you are — he'll take it from there." />
    </>
  );
}
