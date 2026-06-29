import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Phone, Mail, Star } from "lucide-react";
import { site } from "@/lib/site";
import { reviews } from "@/content/reviews";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Kassidy Lane | Las Vegas Real Estate",
  description:
    "Talk to Kassidy Lane about selling, buying, investing, an out-of-state property, or a difficult deal in Las Vegas. Call, email, or send a message.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const reassurance = reviews.find((r) => r.id === "heaven-angelique");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your move."
        intro="Tell Kassidy what you're working on. Whether it's a quick question or a complicated situation, you'll get a straight answer — fast."
      />

      <section className="bg-bone">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <ContactForm defaultType={type} />
            </div>

            <div className="flex flex-col gap-8">
              <Reveal>
                <p className="eyebrow">Reach Kassidy directly</p>
                <div className="mt-5 space-y-4">
                  <a href={site.phoneHref} className="flex items-center gap-3 text-ink">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand/60">
                      <Phone className="h-5 w-5 text-gold-deep" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-serif text-h3">{site.phoneDisplay}</span>
                      <span className="text-sm text-slate">Call or text — he picks up</span>
                    </span>
                  </a>
                  <a href={site.emailHref} className="flex items-center gap-3 text-ink">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand/60">
                      <Mail className="h-5 w-5 text-gold-deep" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-medium">{site.email}</span>
                      <span className="text-sm text-slate">Email anytime</span>
                    </span>
                  </a>
                </div>
              </Reveal>

              {reassurance && (
                <Reveal className="rounded-card border border-line bg-paper p-6 shadow-soft">
                  <div className="flex gap-0.5 text-gold" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-body text-ink/90">
                    &ldquo;If you need to speak with him he always picks up the call no matter what
                    time it is.&rdquo;
                  </blockquote>
                  <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-slate">
                    {reassurance.context} · {reassurance.year}
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
