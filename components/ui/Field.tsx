"use client";

import type { ReactNode } from "react";

export const inputClass =
  "w-full min-h-[48px] rounded-input border border-line bg-paper px-4 text-ink placeholder:text-slate/60 transition-colors focus:border-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-gold aria-[invalid=true]:border-error";

export function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
