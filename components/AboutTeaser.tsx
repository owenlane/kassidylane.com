import { Button } from "@/components/ui/Button";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="border-t border-line bg-bone">
      <div className="container-page grid items-center gap-10 py-section lg:grid-cols-2 lg:gap-16">
        <Reveal className="lg:order-2">
          <MediaPlaceholder label="Kassidy — environmental portrait" ratio="aspect-[4/5]" />
        </Reveal>
        <Reveal className="lg:order-1">
          <p className="eyebrow">The person behind the deals</p>
          <h2 className="mt-4 font-serif text-h2 text-ink">
            From Puerto Vallarta to the Las Vegas Valley.
          </h2>
          <p className="mt-5 max-w-prose text-body-l text-slate">
            Raised in Oregon, Kassidy moved to Mexico at nineteen and spent three years there,
            becoming fluent in Spanish and meeting his wife, Miriam — they&apos;ve been married
            twenty years. A background in banking and home maintenance means he reads a deal in
            numbers and a property in person. Today he&apos;s a working Las Vegas agent and local
            storyteller who turns clients into friends.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">Meet Kassidy</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
