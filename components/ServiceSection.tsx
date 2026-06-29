import type { ServiceSectionData } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Checklist } from "@/components/Checklist";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceSection({
  data,
  flip = false,
}: {
  data: ServiceSectionData;
  flip?: boolean;
}) {
  return (
    <section id={data.id} className="scroll-mt-24 border-t border-line">
      <div className="container-page grid items-center gap-10 py-section-sm lg:grid-cols-2 lg:gap-16">
        <Reveal className={flip ? "lg:order-2" : ""}>
          <p className="eyebrow">{data.eyebrow}</p>
          <h2 className="mt-4 font-serif text-h2 text-ink">{data.heading}</h2>
          <p className="mt-5 max-w-prose text-body-l text-slate">{data.body}</p>
          <Checklist items={data.checklist} className="mt-7" />
          <div className="mt-8">
            <Button href={data.cta.href}>{data.cta.label}</Button>
          </div>
        </Reveal>
        <Reveal className={flip ? "lg:order-1" : ""}>
          <MediaPlaceholder label={`${data.eyebrow} — photo`} ratio="aspect-[4/3]" />
        </Reveal>
      </div>
    </section>
  );
}
