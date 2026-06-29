import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-bone">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Identity */}
          <div className="lg:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl">{site.name}</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-gold">
                {site.role}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/70">
              Bilingual real estate in the Las Vegas Valley. Master negotiator, difficult-deal
              specialist, and dependable steward for owners near and far.
            </p>
            <p className="mt-4 font-mono text-xs text-bone/50">
              {site.brokerage} &middot; {site.license}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-bone/70 transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get started */}
          <div>
            <p className="eyebrow mb-4">Get started</p>
            <ul className="space-y-2.5 text-sm text-bone/70">
              <li>
                <Link href="/home-value" className="transition-colors hover:text-bone">
                  Get my home value
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-bone">
                  Book a consultation
                </Link>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-bone">
                  <Phone className="h-3.5 w-3.5 text-gold" aria-hidden /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="inline-flex items-center gap-2 transition-colors hover:text-bone">
                  <Mail className="h-3.5 w-3.5 text-gold" aria-hidden /> Email Kassidy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="eyebrow mb-4">Connect</p>
            <ul className="space-y-2.5 text-sm text-bone/70">
              <li>
                <Link href="/es" className="transition-colors hover:text-bone">
                  En Español
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="transition-colors hover:text-bone">
                  Read client reviews
                </Link>
              </li>
              {/* Social links render when handles are confirmed (lib/site.ts) */}
              {site.social.youtube && (
                <li>
                  <a href={site.social.youtube} className="transition-colors hover:text-bone">
                    YouTube
                  </a>
                </li>
              )}
              {site.social.instagram && (
                <li>
                  <a href={site.social.instagram} className="transition-colors hover:text-bone">
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <hr className="hairline-dark my-10" />

        {/* Compliance row */}
        <div className="flex flex-col gap-6 text-xs text-bone/50 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <EqualHousingMark /> Equal Housing Opportunity
            </span>
            <span>{site.role}, member of the National Association of REALTORS&reg;</span>
            <span>{site.brokerage}</span>
            <span>{site.license}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-bone">
              Privacy
            </Link>
            <Link href="/accessibility" className="hover:text-bone">
              Accessibility
            </Link>
            <span>&copy; {year} {site.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function EqualHousingMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-bone/60">
      <path d="M3 11L12 4l9 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9h14v-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9.5" y="13" width="5" height="6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
