import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource-variable/fraunces";
import "./globals.css";

import { site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { JsonLd, realEstateAgentSchema, reviewsSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.name} — Las Vegas Real Estate Agent | Bilingual, Master Negotiator`,
    template: `%s | ${site.name}`,
  },
  description:
    "Kassidy Lane is a bilingual Las Vegas REALTOR® and master negotiator. Out-of-state owners, difficult deals, probate, and first-time buyers — no deal too difficult.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "Las Vegas real estate agent",
    "bilingual realtor Las Vegas",
    "sell house out of state Las Vegas",
    "probate real estate Las Vegas",
    "Simply Vegas agent",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.baseUrl,
    siteName: site.name,
    title: `${site.name} — Las Vegas Real Estate`,
    description:
      "Bilingual master negotiator. Out-of-state owners, difficult deals, and first-time buyers — handled.",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Las Vegas Real Estate`,
    description: "Bilingual master negotiator in the Las Vegas Valley.",
    images: ["/og-placeholder.svg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[realEstateAgentSchema(), ...reviewsSchema(6)]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="pb-[64px] lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
