import { Star } from "lucide-react";
import type { Review } from "@/content/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="break-inside-avoid rounded-card border border-line bg-paper p-6 shadow-soft">
      <div className="flex items-center gap-0.5 text-gold" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-4 text-body text-ink/90">{review.text}</blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <p className="font-medium text-ink">{review.name}</p>
        <p className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-slate">
          {review.context} · {review.year}
        </p>
      </figcaption>
    </figure>
  );
}

export function ResultCard({
  result,
  context,
  attribution,
}: {
  result: string;
  context: string;
  attribution: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-card border border-line-dark bg-ink-soft p-7 text-bone">
      <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight text-bone">
        &ldquo;{result}&rdquo;
      </p>
      <p className="mt-4 flex-1 text-body text-bone/70">{context}</p>
      <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-gold">{attribution}</p>
    </div>
  );
}
