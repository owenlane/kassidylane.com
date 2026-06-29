import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { situations } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";

export function SituationRouter({
  heading = "Whatever your situation, I've handled it before.",
  eyebrow = "How I help",
}: {
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <section className="bg-bone">
      <div className="container-page py-section">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-h2 text-ink">{heading}</h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={(i % 3) * 80}>
                <Link
                  href={s.href}
                  className={`group flex h-full flex-col rounded-card border bg-paper p-7 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${
                    s.featured ? "border-gold/40" : "border-line"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
                        s.featured ? "bg-gold/15 text-gold-deep" : "bg-sand/60 text-ink"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    {s.featured && (
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-gold-deep">
                        Specialty
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-serif text-h3 text-ink">{s.label}</h3>
                  <p className="mt-2 flex-1 text-body text-slate">{s.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink">
                    Learn more
                    <ArrowUpRight
                      className="h-4 w-4 text-gold-deep transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
