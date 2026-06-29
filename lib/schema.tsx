import { site } from "@/lib/site";
import { reviews } from "@/content/reviews";
import type { FAQ } from "@/content/faqs";

export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.baseUrl}/#agent`,
    name: site.name,
    jobTitle: "Real Estate Agent",
    telephone: site.phoneDisplay,
    email: site.email,
    url: site.baseUrl,
    areaServed: site.areas.map((a) => ({ "@type": "Place", name: `${a}, Las Vegas, NV` })),
    knowsLanguage: site.languages,
    memberOf: { "@type": "Organization", name: "National Association of REALTORS\u00AE" },
    worksFor: { "@type": "Organization", name: site.brokerage },
    identifier: { "@type": "PropertyValue", name: "Nevada Real Estate License", value: site.licenseNumber },
    address: { "@type": "PostalAddress", addressLocality: "Las Vegas", addressRegion: "NV", addressCountry: "US" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.toFixed(1),
      reviewCount: site.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function reviewsSchema(limit?: number) {
  const list = typeof limit === "number" ? reviews.slice(0, limit) : reviews;
  return list.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "RealEstateAgent", name: site.name },
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
    reviewBody: r.text,
  }));
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Real Estate Agent",
    worksFor: { "@type": "Organization", name: site.brokerage },
    knowsLanguage: site.languages,
    birthPlace: "Nashville, Tennessee",
    url: `${site.baseUrl}/about`,
    telephone: site.phoneDisplay,
    email: site.email,
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.baseUrl}${it.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
