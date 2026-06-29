import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary-dark" | "phone";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-all duration-200 ease-out focus-visible:outline-2 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "min-h-[48px] px-6 text-body",
  lg: "min-h-[56px] px-8 text-body-l",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink shadow-soft hover:bg-gold-deep hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "border border-ink/20 text-ink hover:bg-ink hover:text-bone",
  "secondary-dark":
    "border border-white/25 text-bone hover:bg-bone hover:text-ink",
  phone:
    "border border-white/25 text-bone hover:bg-bone hover:text-ink",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={cls} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonSubmit({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
