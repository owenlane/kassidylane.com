import { Reveal } from "@/components/ui/Reveal";

export type Step = { title: string; body: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 80} className="relative">
          <div className="font-mono text-sm text-gold-deep">
            {String(i + 1).padStart(2, "0")}
          </div>
          <hr className="hairline my-4" />
          <h3 className="font-serif text-h3 text-ink">{step.title}</h3>
          <p className="mt-2 text-body text-slate">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
