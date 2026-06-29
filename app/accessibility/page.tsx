import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Kassidy Lane is committed to making this website accessible to everyone, with WCAG 2.1 AA as the guiding standard.",
  alternates: { canonical: "/accessibility" },
  robots: { index: false, follow: true },
};

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Accessibility", path: "/accessibility" }])} />
      <PageHero eyebrow="Legal" title="Accessibility statement" />
      <section className="bg-bone">
        <Container className="py-section">
          <div className="max-w-prose space-y-6 text-body text-slate [&_h2]:font-serif [&_h2]:text-h3 [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-2">
            <p className="text-body-l">
              Kassidy Lane is committed to ensuring this website is accessible to people of all
              abilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
            </p>
            <h2>What we do</h2>
            <p>
              The site is built with semantic structure, keyboard-operable navigation and forms,
              visible focus indicators, color contrast that targets AA, and support for reduced-motion
              preferences.
            </p>
            <h2>Ongoing effort</h2>
            <p>
              Accessibility is an ongoing commitment. If any content or feature presents a barrier,
              we want to fix it.
            </p>
            <h2>Contact us</h2>
            <p>
              If you encounter an accessibility issue, please contact Kassidy at{" "}
              <a className="text-ink underline" href={site.emailHref}>{site.email}</a> or{" "}
              <a className="text-ink underline" href={site.phoneHref}>{site.phoneDisplay}</a>, and
              we&apos;ll work to provide the information you need.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
