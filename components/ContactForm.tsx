"use client";

import { useState } from "react";
import { Phone, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";
import { Field, inputClass } from "@/components/ui/Field";
import { ButtonSubmit } from "@/components/ui/Button";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inquiryTypes = [
  "Selling",
  "Buying",
  "Out-of-State Owner",
  "Investing",
  "Probate or Difficult Deal",
  "En Español",
  "Other",
];

const typeMap: Record<string, string> = {
  selling: "Selling",
  buying: "Buying",
  "out-of-state": "Out-of-State Owner",
  investing: "Investing",
  probate: "Probate or Difficult Deal",
  difficult: "Probate or Difficult Deal",
  espanol: "En Español",
};

export function ContactForm({ defaultType, spanish = false }: { defaultType?: string; spanish?: boolean }) {
  const initialType = (defaultType && typeMap[defaultType]) || "Selling";
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = spanish
    ? {
        name: "Nombre",
        email: "Correo electrónico",
        phone: "Teléfono",
        type: "Tipo de consulta",
        message: "Mensaje",
        submit: "Enviar mensaje",
        sending: "Enviando…",
        successTitle: "¡Gracias!",
        successBody: "Kassidy se pondrá en contacto contigo pronto. ¿Prefieres hablar ahora?",
        err: "Algo salió mal. Inténtalo de nuevo o llama al",
        req: "Este campo es obligatorio.",
        emailErr: "Ingresa un correo válido.",
      }
    : {
        name: "Name",
        email: "Email",
        phone: "Phone",
        type: "Inquiry type",
        message: "Message",
        submit: "Send message",
        sending: "Sending…",
        successTitle: "Thanks — message sent.",
        successBody: "Kassidy will get back to you shortly. Prefer to talk now?",
        err: "Something went wrong. Please try again or call",
        req: "This field is required.",
        emailErr: "Enter a valid email.",
      };

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e: Record<string, string> = {};
    if (!String(data.get("name") || "").trim()) e.name = t.req;
    const email = String(data.get("email") || "").trim();
    if (!email) e.email = t.req;
    else if (!emailRe.test(email)) e.email = t.emailErr;
    if (!String(data.get("message") || "").trim()) e.message = t.req;
    setErrors(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const payload = Object.fromEntries(data.entries());
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: spanish ? "contact-es" : "contact" }),
      });
      if (!res.ok) throw new Error();
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
        <h2 className="mt-4 font-serif text-h3 text-ink">{t.successTitle}</h2>
        <p className="mx-auto mt-2 max-w-md text-body text-slate">{t.successBody}</p>
        <a href={site.phoneHref} className="mt-5 inline-flex items-center gap-2 font-medium text-ink">
          <Phone className="h-4 w-4 text-gold" aria-hidden /> {site.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-card border border-line bg-paper p-6 shadow-soft sm:p-8">
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.name} htmlFor="name" required error={errors.name}>
            <input id="name" name="name" type="text" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} />
          </Field>
          <Field label={t.phone} htmlFor="phone">
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} />
          </Field>
        </div>
        <Field label={t.email} htmlFor="email" required error={errors.email}>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} />
        </Field>
        <Field label={t.type} htmlFor="type">
          <select id="type" name="type" className={inputClass} defaultValue={initialType}>
            {inquiryTypes.map((it) => (
              <option key={it}>{it}</option>
            ))}
          </select>
        </Field>
        <Field label={t.message} htmlFor="message" required error={errors.message}>
          <textarea id="message" name="message" rows={4} className={`${inputClass} min-h-[120px] py-3`} aria-invalid={!!errors.message} />
        </Field>

        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        {status === "error" && (
          <p className="text-sm text-error" role="alert">
            {t.err} {site.phoneDisplay}.
          </p>
        )}

        <ButtonSubmit type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? t.sending : t.submit}
        </ButtonSubmit>
      </div>
    </form>
  );
}
