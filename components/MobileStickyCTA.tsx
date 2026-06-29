import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function MobileStickyCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={site.phoneHref}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-btn border border-white/25 text-sm font-medium text-bone"
        >
          <Phone className="h-4 w-4 text-gold" aria-hidden /> Call
        </a>
        <Link
          href="/home-value"
          className="inline-flex min-h-[48px] items-center justify-center rounded-btn bg-gold text-sm font-medium text-ink"
        >
          Home value
        </Link>
      </div>
    </div>
  );
}
