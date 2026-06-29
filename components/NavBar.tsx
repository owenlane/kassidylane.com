"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { primaryNav, site } from "@/lib/site";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll + Esc to close while drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        solid ? "bg-ink/95 backdrop-blur border-b border-line-dark" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-[68px] items-center justify-between gap-4" aria-label="Primary">
        <Link href="/" className="flex items-baseline gap-1.5 text-bone" aria-label={`${site.name} home`}>
          <span className="font-serif text-xl tracking-tight">{site.name}</span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.14em] text-gold sm:inline">
            {site.role}
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-bone/80 transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-sm text-bone/80 transition-colors hover:text-bone sm:flex"
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden />
            <span className="hidden xl:inline">{site.phoneDisplay}</span>
          </a>
          <Link
            href="/home-value"
            className="inline-flex min-h-[40px] items-center rounded-btn bg-gold px-4 text-sm font-medium text-ink transition-all hover:bg-gold-deep"
          >
            Home Value
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-bone lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-[68px] z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink/60 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-[calc(100vh-68px)] w-[84%] max-w-sm flex-col bg-ink-soft px-6 pb-8 pt-6 transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-[52px] items-center border-b border-line-dark text-lg text-bone"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-btn border border-white/25 text-bone"
            >
              <Phone className="h-4 w-4 text-gold" aria-hidden />
              {site.phoneDisplay}
            </a>
            <Link
              href="/home-value"
              className="inline-flex min-h-[52px] items-center justify-center rounded-btn bg-gold font-medium text-ink"
            >
              Get my home value
            </Link>
            <Link href="/es" className="pt-1 text-center text-sm text-bone/70">
              Ver en Español
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
