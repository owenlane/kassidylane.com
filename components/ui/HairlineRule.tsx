export function HairlineRule({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return <hr className={`${dark ? "hairline-dark" : "hairline"} ${className}`} />;
}
