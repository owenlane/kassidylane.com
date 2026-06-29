import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { ServiceSection } from "@/components/ServiceSection";
import { CTABanner } from "@/components/CTABanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { howIHelpSections } from "@/content/services";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Buy, Sell & Invest in Las Vegas | Kassidy Lane",
  description:
    "However you need to move in Las Vegas — selling, buying, investing, or a difficult deal — Kassidy Lane has done it before. See how he helps.",
  alternates: { canonical: "/how-i-help" },
};

export default function HowIHelpPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How I Help", path: "/how-i-help" },
        ])}
      />
      <PageHero
        eyebrow="How I help"
        title="However you need to move, I've done it before."
        intro="Selling, buying, investing, or working through something complicated — each path below is built on real Las Vegas transactions and an unbroken five-star record."
      />

      {howIHelpSections.map((section, i) => (
        <ServiceSection key={section.id} data={section} flip={i % 2 === 1} />
      ))}

      {/* Out-of-State callout */}
      <section className="border-t border-line bg-ink text-bone">
        <Container className="py-section-sm">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Out-of-state owners</p>
              <h2 className="mt-3 font-serif text-h2 text-bone">
                Own here but live elsewhere? That's a specialty.
              </h2>
              <p className="mt-4 max-w-prose text-body-l text-bone/75">
                Prep, tenants, repairs, marketing, negotiation, and a remote closing — handled A to Z
                so you never need to get on a plane.
              </p>
            </div>
            <Button href="/out-of-state-owners" size="lg" className="flex-none">
              See how it works
            </Button>
          </Reveal>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
