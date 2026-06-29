import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTABanner({
  heading = "Let's get your deal done.",
  subheading = "Whether you're buying, selling, or sitting on a property you can't quite figure out — start the conversation today.",
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="bg-ink text-bone">
      <div className="container-page py-section">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-h2 text-bone">{heading}</h2>
          <p className="mx-auto mt-4 max-w-prose text-body-l text-bone/70">{subheading}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/home-value" size="lg">Get my home value</Button>
            <Button href="/contact" variant="secondary-dark" size="lg">Book a consultation</Button>
            <Button href={site.phoneHref} variant="phone" size="lg">
              <Phone className="h-4 w-4 text-gold" aria-hidden /> {site.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
