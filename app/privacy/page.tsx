import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Kassidy Lane collects, uses, and protects the information you submit through this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <section className="bg-bone">
        <Container className="py-section">
          <div className="prose-kl max-w-prose space-y-6 text-body text-slate [&_h2]:font-serif [&_h2]:text-h3 [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-2">
            <p className="text-body-l">
              This policy explains what information this website collects and how it is used. It is a
              general statement and not legal advice. Final policy language should be confirmed with
              an attorney before launch.
            </p>
            <h2>Information you provide</h2>
            <p>
              When you submit the home valuation or contact form, you may provide your name, email,
              phone number, property address, and any details you choose to include. This information
              is used solely to respond to your inquiry and provide real estate services.
            </p>
            <h2>How it is used</h2>
            <p>
              Submissions are delivered to Kassidy Lane by email and may be stored to help manage and
              follow up on your request. Your information is not sold. It is shared only as needed to
              provide the services you request.
            </p>
            <h2>Data retention</h2>
            <p>
              Inquiry details are kept only as long as needed to assist you and to meet recordkeeping
              obligations, then removed.
            </p>
            <h2>Your choices</h2>
            <p>
              You may request that your information be updated or deleted at any time by contacting
              Kassidy at <a className="text-ink underline" href={site.emailHref}>{site.email}</a> or{" "}
              <a className="text-ink underline" href={site.phoneHref}>{site.phoneDisplay}</a>.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about this policy can be directed to {site.name}, {site.brokerage},{" "}
              {site.license}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
