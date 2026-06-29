import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function Checklist({
  items,
  tone = "light",
  className = "",
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const text = tone === "dark" ? "text-bone/85" : "text-ink";
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 70} className={`flex items-start gap-3 ${text}`}>
          <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold/15 text-gold-deep">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          </span>
          <span className="text-body">{item}</span>
        </Reveal>
      ))}
    </ul>
  );
}
