export function EyebrowLabel({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h2";
}) {
  return <Tag className={`eyebrow ${className}`}>{children}</Tag>;
}
