type EmptyRailsProps = {
  rows?: number;
  compact?: boolean;
  tone?: "light" | "dark";
};

export function EmptyRails({ rows = 3, compact = false, tone = "light" }: EmptyRailsProps) {
  return (
    <div className={compact ? "space-y-2" : "space-y-3"} aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full ${tone === "dark" ? "bg-[rgba(234,234,242,0.18)]" : "bg-[rgba(13,13,15,0.08)]"}`}
          style={{ width: `${92 - index * 14}%` }}
        />
      ))}
    </div>
  );
}
