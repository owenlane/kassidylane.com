"use client";

import { useState } from "react";
import { Phone, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";
import { Field, inputClass } from "@/components/ui/Field";
import { ButtonSubmit } from "@/components/ui/Button";

type Errors = Record<string, string>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /[0-9]{7,}/;

export function ValuationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [name, setName] = useState("");

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const e: Errors = {};
    if (!String(data.get("address") || "").trim()) e.address = "Enter the property address.";
    if (!String(data.get("name") || "").trim()) e.name = "Enter your name.";
    const email = String(data.get("email") || "").trim();
    if (!email) e.email = "Enter your email.";
    else if (!emailRe.test(email)) e.email = "Enter a valid email.";
    const phone = String(data.get("phone") || "").replace(/\D/g, "");
    if (!phone) e.phone = "Enter your phone number.";
    else if (!phoneRe.test(phone)) e.phone = "Enter a valid phone number.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    setName(String(data.name || ""));
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "home-value" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-line bg-paper p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" aria-hidden />
        <h2 className="mt-4 font-serif text-h3 text-ink">Thanks{name ? `, ${name.split(" ")[0]}` : ""}.</h2>
        <p className="mx-auto mt-2 max-w-md text-body text-slate">
          Kassidy will personally review your property and reach out with a real valuation.
          Prefer to talk now?
        </p>
        <a href={site.phoneHref} className="mt-5 inline-flex items-center gap-2 font-medium text-ink">
          <Phone className="h-4 w-4 text-gold" aria-hidden /> {site.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-card border border-line bg-paper p-6 shadow-soft sm:p-8">
      <div className="space-y-5">
        <Field label="Property address" htmlFor="address" required error={errors.address}>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            className={inputClass}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            placeholder="123 Example St, Las Vegas, NV"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name" required error={errors.name}>
            <input id="name" name="name" type="text" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} />
          </Field>
          <Field label="Phone" htmlFor="phone" required error={errors.phone}>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone} />
          </Field>
        </div>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} />
        </Field>
        <Field label="Timeline to sell" htmlFor="timeline">
          <select id="timeline" name="timeline" className={inputClass} defaultValue="Just curious">
            <option>ASAP</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>Just curious</option>
          </select>
        </Field>
        <Field label="Anything Kassidy should know?" htmlFor="notes">
          <textarea id="notes" name="notes" rows={3} className={`${inputClass} min-h-[96px] py-3`} />
        </Field>

        {/* Honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        {status === "error" && (
          <p className="text-sm text-error" role="alert">
            Something went wrong sending your request. Please try again, or call {site.phoneDisplay}.
          </p>
        )}

        <ButtonSubmit type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Get my home value"}
        </ButtonSubmit>
        <p className="text-center text-xs text-slate">
          No spam. Your information goes straight to Kassidy.
        </p>
      </div>
    </form>
  );
}
