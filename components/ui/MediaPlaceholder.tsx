export function MediaPlaceholder({
  label = "Photography to be supplied",
  className = "",
  ratio = "aspect-[4/5]",
  monogram = true,
}: {
  label?: string;
  className?: string;
  ratio?: string;
  monogram?: boolean;
}) {
  return (
    <div
      className={`relative ${ratio} overflow-hidden rounded-card border border-line-dark bg-ink-soft ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ink-soft via-ink to-ink-soft" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
        }}
      />
      {monogram && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(3rem,12vw,6rem)] font-light text-gold/30 select-none">
          KL
        </span>
      )}
      <span className="absolute bottom-4 left-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-bone/40">
        {label}
      </span>
    </div>
  );
}
