import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BilingualPanel() {
  return (
    <section className="bg-bone">
      <div className="container-page pb-section">
        <Reveal className="overflow-hidden rounded-card border border-gold/30 bg-gradient-to-br from-sand/60 to-bone p-9 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="font-serif text-h2 text-ink">Se habla español.</p>
              <p className="mt-3 text-body-l text-slate">
                Kassidy y su esposa Miriam están conectados con la comunidad latina de Las Vegas.
                Orientación inmobiliaria completa, en tu idioma.
              </p>
            </div>
            <Button href="/es" size="lg" className="flex-none">
              Ver en español
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
