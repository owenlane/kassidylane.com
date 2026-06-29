import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { CredentialsStrip } from "@/components/TrustMicroBar";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { JsonLd, personSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Kassidy Lane | Bilingual Las Vegas REALTOR®",
  description:
    "From Oregon to Puerto Vallarta to Las Vegas — Kassidy Lane's story, his banking and home-maintenance background, and the values behind every deal.",
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    period: "Oregon",
    title: "Raised in Ashland",
    body: "Born in Nashville in 1981 and raised in Ashland, Oregon — small-town roots that still show up as straight talk and follow-through.",
  },
  {
    period: "Mexico",
    title: "Three years in Puerto Vallarta",
    body: "At nineteen, Kassidy moved to Puerto Vallarta and spent three years there. He became fluent in Spanish and met Miriam — now his wife of twenty years.",
  },
  {
    period: "Career",
    title: "Banking & home maintenance",
    body: "Two decades in business and sales, with a background in banking and hands-on home maintenance. He reads a deal in numbers and a property in person.",
  },
  {
    period: "Las Vegas",
    title: "A working agent & storyteller",
    body: "Today Kassidy is a Las Vegas REALTOR® and local content creator — covering Vegas culture and interviews — with a family of four and deep community ties.",
  },
];

const values = [
  { title: "Communication", body: "You hear from Kassidy. Reviews repeat one theme: he picks up the phone." },
  { title: "Persistence", body: "Deals that fell out of escrow elsewhere have closed with him. He doesn't quit." },
  { title: "Integrity", body: "Honest evaluations, even when they cost him the easy sale. Accountability is the point." },
  { title: "No deal too difficult", body: "Title, liens, probate, repairs, out-of-state — the hard ones are the specialty." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="About"
        title="Meet Kassidy Lane"
        intro="A bilingual master negotiator and dependable steward — the agent people trust with the hard deal and the out-of-state property, and the one who turns clients into friends."
      />

      {/* Origin story timeline */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div>
              <p className="eyebrow">The story</p>
              <h2 className="mt-4 font-serif text-h2 text-ink">An origin that built the agent.</h2>
              <ol className="mt-10 space-y-0">
                {timeline.map((item, i) => (
                  <Reveal as="li" key={item.title} delay={i * 60} className="relative grid grid-cols-[auto_1fr] gap-5 pb-10 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 h-3 w-3 flex-none rounded-full bg-gold" />
                      {i < timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}
                    </div>
                    <div className="-mt-1">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-gold-deep">
                        {item.period}
                      </span>
                      <h3 className="mt-1.5 font-serif text-h3 text-ink">{item.title}</h3>
                      <p className="mt-2 max-w-prose text-body text-slate">{item.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
            <Reveal className="lg:pt-16">
              <MediaPlaceholder label="Kassidy & family — portrait" ratio="aspect-[4/5]" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="border-t border-line bg-paper">
        <Container className="py-section">
          <div className="max-w-2xl">
            <p className="eyebrow">What I stand on</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">How Kassidy works.</h2>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 70} className="border-t border-line pt-5">
                <h3 className="font-serif text-h3 text-ink">{v.title}</h3>
                <p className="mt-2 max-w-prose text-body text-slate">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Community & language */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">Community & language</p>
              <h2 className="mt-4 font-serif text-h2 text-ink">Bilingual, and genuinely connected.</h2>
              <p className="mt-5 max-w-prose text-body-l text-slate">
                Kassidy and Miriam are part of the Las Vegas Latino community, and he offers full
                service in Spanish. For many families, working with someone who speaks their language
                and understands their world changes everything about buying or selling a home.
              </p>
              <p className="mt-4 max-w-prose text-body text-slate">
                Beyond real estate, Kassidy is a Vegas storyteller and content creator — covering
                local culture and interviews — which keeps him visible, plugged in, and rooted in the
                city he sells.
              </p>
            </Reveal>
            <Reveal>
              <MediaPlaceholder label="Community / bilingual — photo" ratio="aspect-[4/3]" />
            </Reveal>
          </div>
        </Container>
      </section>

      <CredentialsStrip />
      <CTABanner heading="Let's talk about your move." />
    </>
  );
}
