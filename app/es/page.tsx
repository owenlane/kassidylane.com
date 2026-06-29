import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone, Plane, FileText, DollarSign, Home } from "lucide-react";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CredentialsStrip } from "@/components/TrustMicroBar";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Agente de Bienes Raíces en Las Vegas que Habla Español | Kassidy Lane",
  description:
    "Kassidy Lane es un agente de bienes raíces bilingüe en Las Vegas. Negociador experto, especialista en dueños fuera del estado y casos difíciles.",
  alternates: {
    canonical: "/es",
    languages: { "en-US": "/", "es-US": "/es" },
  },
};

const situaciones = [
  { icon: Home, label: "Vender", blurb: "Estrategia de precio y negociación firme para obtener el mejor valor." },
  { icon: Plane, label: "Dueños fuera del estado", blurb: "Tus ojos en el terreno: preparación, inquilinos, reparaciones y cierre a distancia." },
  { icon: DollarSign, label: "Inversión / Oferta en efectivo", blurb: "Propiedades de inversión y escenarios de oferta en efectivo." },
  { icon: FileText, label: "Casos difíciles", blurb: "Títulos, gravámenes, sucesiones y reparaciones — los he resuelto antes." },
];

export default function EspanolPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "En Español", path: "/es" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-bone lg:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-soft via-ink to-ink" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(60% 80% at 80% 10%, rgba(196,154,72,0.22), transparent 60%)" }}
        />
        <Container className="relative">
          <p className="eyebrow">Bienes raíces en Las Vegas · {site.brokerage}</p>
          <h1 className="mt-5 max-w-3xl font-serif text-h1 text-bone">
            Bienes raíces en Las Vegas, <span className="text-gold">resueltos.</span>
          </h1>
          <p className="mt-6 max-w-xl text-body-l text-bone/75">
            Un negociador experto y bilingüe con nueve años en el Valle. Dueños fuera del estado,
            casos difíciles y compradores por primera vez — ningún trato es demasiado difícil.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact?type=espanol" size="lg">Hablar con Kassidy</Button>
            <Button href={site.phoneHref} variant="phone" size="lg">
              <Phone className="h-4 w-4 text-gold" aria-hidden /> {site.phoneDisplay}
            </Button>
          </div>
        </Container>
      </section>

      {/* Situaciones */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="max-w-2xl">
            <p className="eyebrow">Cómo ayudo</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">
              Sea cual sea tu situación, ya la he manejado.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {situaciones.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={(i % 2) * 70}>
                  <Link
                    href="/contact?type=espanol"
                    className="group flex h-full items-start gap-4 rounded-card border border-line bg-paper p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-sand/60 text-ink">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <h3 className="flex items-center gap-1 font-serif text-h3 text-ink">
                        {s.label}
                        <ArrowUpRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      </h3>
                      <p className="mt-1.5 text-body text-slate">{s.blurb}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Confianza / comunidad */}
      <section className="border-t border-line bg-paper">
        <Container className="py-section">
          <div className="max-w-3xl">
            <p className="eyebrow">Servicio bilingüe</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">
              Kassidy y Miriam, conectados con la comunidad latina.
            </h2>
            <p className="mt-5 text-body-l text-slate">
              Kassidy vivió tres años en Puerto Vallarta y habla español con fluidez. Junto a su
              esposa Miriam, ofrece servicio completo en tu idioma — con {site.transactions}{" "}
              transacciones cerradas y un historial de reseñas de cinco estrellas.
            </p>
          </div>
        </Container>
      </section>

      {/* Contacto */}
      <section className="bg-bone">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <p className="eyebrow">Contacto</p>
              <h2 className="mt-4 font-serif text-h2 text-ink">Hablemos de tu próximo paso.</h2>
              <p className="mt-4 max-w-prose text-body text-slate">
                Cuéntale a Kassidy en qué estás trabajando. Recibirás una respuesta clara y rápida.
              </p>
              <div className="mt-8">
                <ContactForm spanish defaultType="espanol" />
              </div>
            </div>
            <div>
              <p className="eyebrow">Directo</p>
              <a href={site.phoneHref} className="mt-5 flex items-center gap-3 text-ink">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand/60">
                  <Phone className="h-5 w-5 text-gold-deep" aria-hidden />
                </span>
                <span>
                  <span className="block font-serif text-h3">{site.phoneDisplay}</span>
                  <span className="text-sm text-slate">Llama o envía un mensaje</span>
                </span>
              </a>
              <p className="mt-8 text-sm text-slate">
                <Link href="/" className="link-underline">View this site in English</Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CredentialsStrip />
    </>
  );
}
