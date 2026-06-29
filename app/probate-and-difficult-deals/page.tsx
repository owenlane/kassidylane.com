import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABanner } from "@/components/CTABanner";
import { ReviewCard } from "@/components/ReviewCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/content/reviews";
import { difficultDealFaqs } from "@/content/faqs";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { FileText, Scale, Hammer, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Probate, Title & Difficult Home Sales in Las Vegas | Kassidy Lane",
  description:
    "Title issues, liens, probate, major repairs, or a deal that fell through? Kassidy Lane has closed the hard ones. Calm, capable guidance in Las Vegas.",
  alternates: { canonical: "/probate-and-difficult-deals" },
};

const situations = [
  { icon: Scale, title: "Title issues & liens", body: "Clouded title, outstanding liens, and the paperwork that scares other agents off." },
  { icon: FileText, title: "Probate sales", body: "Selling a property through probate, handled with patience and discretion." },
  { icon: Hammer, title: "Major repairs", body: "Homes that need real work — coordinated, or positioned correctly for their condition." },
  { icon: RefreshCw, title: "Fell-out-of-escrow", body: "Deals that collapsed elsewhere, restarted and carried across the line." },
];

const steps = [
  { title: "Tell me", body: "Share the situation — no judgment, no pressure. Kassidy has likely seen it before." },
  { title: "Assess", body: "He maps what's involved and who else needs to be at the table." },
  { title: "Coordinate", body: "Kassidy works the moving parts and keeps the right professionals aligned." },
  { title: "Close", body: "Persistent follow-through until the property is sold and you can move on." },
];

export default function ProbatePage() {
  const proof = reviews.filter((r) => r.segments.includes("difficult")).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(difficultDealFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Probate & Difficult Deals", path: "/probate-and-difficult-deals" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Probate & difficult deals"
        title="Title issues. Liens. Probate. Major repairs. I've closed them all."
        intro="If your sale is complicated, you're in the right place. These are often stressful moments — Kassidy brings calm, competence, and the persistence to get difficult deals done."
      />

      {/* Situations handled */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="max-w-xl">
            <p className="eyebrow">Situations handled</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">The deals others pass on.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {situations.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={(i % 2) * 70}>
                  <div className="flex h-full gap-4 rounded-card border border-line bg-paper p-7 shadow-soft">
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-sand/60 text-ink">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-h3 text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-body text-slate">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why it works + proof */}
      <section className="border-t border-line bg-paper">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">Why it works</p>
              <h2 className="mt-4 font-serif text-h2 text-ink">Persistence is the difference.</h2>
              <p className="mt-5 max-w-prose text-body-l text-slate">
                Difficult deals don't close on charm — they close on follow-through. Kassidy stays
                upfront with everyone involved, keeps the process moving when it stalls, and brings in
                the right professionals when a situation calls for them.
              </p>
              <p className="mt-4 max-w-prose text-body text-slate">
                Kassidy is a real estate agent, not an attorney or tax advisor — for legal or financial
                specifics he'll point you to the right professional, then keep your sale on track.
              </p>
            </Reveal>
            <div className="grid gap-5">
              {proof.map((review, i) => (
                <Reveal key={review.id} delay={i * 70}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="max-w-xl">
            <p className="eyebrow">The process</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">Discreet, step by step.</h2>
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
            <h2 className="mt-4 font-serif text-h2 text-ink">Common concerns.</h2>
          </div>
          <div className="mt-10 max-w-3xl">
            <FAQAccordion faqs={difficultDealFaqs} />
          </div>
        </Container>
      </section>

      <CTABanner heading="Tell me about your situation." subheading="The hard ones are the specialty. Reach out and Kassidy will walk you through what's possible." />
    </>
  );
}
