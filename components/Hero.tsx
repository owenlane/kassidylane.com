import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { TrustMicroBar } from "@/components/TrustMicroBar";

function HeroBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-soft via-ink to-ink" />
      {/* Desert-modern ambient layer (placeholder for real footage/portrait) */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 80% 10%, rgba(196,154,72,0.22), transparent 60%), radial-gradient(50% 60% at 10% 90%, rgba(196,154,72,0.10), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 120px)",
        }}
      />
    </>
  );
}

export function HomeHero() {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink pb-16 pt-32 text-bone">
      <HeroBackdrop />
      <div className="container-page relative">
        <div className="max-w-3xl">
          <p className="eyebrow">Las Vegas real estate · {site.brokerage}</p>
          <h1 className="mt-5 font-serif text-display-xl text-bone">
            Las Vegas real estate,
            <br />
            <span className="text-gold">handled.</span>
          </h1>
          <p className="mt-6 max-w-xl text-body-l text-bone/75">
            A bilingual master negotiator with nine years in the Valley. Out-of-state owners,
            difficult deals, and first-time buyers — no deal too difficult.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/home-value" size="lg">Get my home value</Button>
            <Button href="/contact" variant="secondary-dark" size="lg">Talk to Kassidy</Button>
            <Button href={site.phoneHref} variant="phone" size="lg" className="sm:hidden">
              <Phone className="h-4 w-4 text-gold" aria-hidden /> Call now
            </Button>
          </div>
          <div className="mt-10">
            <TrustMicroBar tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-bone lg:pt-40">
      <HeroBackdrop />
      <div className="container-page relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-h1 text-bone">{title}</h1>
        {intro && <p className="mt-6 max-w-prose text-body-l text-bone/75">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
