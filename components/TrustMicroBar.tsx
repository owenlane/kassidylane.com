import { Star } from "lucide-react";
import { site } from "@/lib/site";

export function TrustMicroBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const text = tone === "dark" ? "text-bone/80" : "text-slate";
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm ${text}`}>
      <span className="flex items-center gap-0.5 text-gold" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </span>
      <span className="sr-only">Five-star rated.</span>
      <Dot />
      <span>100% five-star</span>
      <Dot />
      <span>{site.transactions} transactions</span>
      <Dot />
      <span>{site.yearsLicensed} years in Las Vegas</span>
      <Dot />
      <span>Se habla español</span>
    </div>
  );
}

function Dot() {
  return <span className="text-gold/60" aria-hidden>·</span>;
}

export function CredentialsStrip() {
  const items = [
    "REALTOR®, National Association of REALTORS®",
    site.brokerage,
    site.license,
    "Equal Housing Opportunity",
  ];
  return (
    <div className="border-y border-line-dark bg-ink py-7 text-bone">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
        {items.map((it) => (
          <span key={it} className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-bone/55">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
