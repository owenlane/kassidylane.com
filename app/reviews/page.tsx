import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { ReviewsExplorer } from "@/components/ReviewsExplorer";
import { CTABanner } from "@/components/CTABanner";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { JsonLd, reviewsSchema, realEstateAgentSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kassidy Lane Reviews — 100% Five-Star Las Vegas REALTOR®",
  description:
    "Read verified five-star reviews for Las Vegas REALTOR® Kassidy Lane — sellers, buyers, out-of-state owners, difficult deals, and first-time buyers.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={[
          realEstateAgentSchema(),
          ...reviewsSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Reviews", path: "/reviews" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Client reviews"
        title="100% five-star. Here's the proof."
        intro={`A 5.0 average across ${site.reviewCount} published reviews, backed by ${site.transactions} closed transactions over ${site.yearsLicensed} years. Filter by your situation below.`}
      />

      <section className="bg-bone">
        <Container className="py-section">
          <ReviewsExplorer />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
