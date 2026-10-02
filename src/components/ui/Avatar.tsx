import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizes: Record<AvatarSize, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-caption",
  md: "size-10 text-body-sm",
  lg: "size-14 text-body",
  xl: "size-24 text-h2",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1);
  return (parts[0][0] ?? "") + (parts[1][0] ?? "");
}

export function Avatar({
  name,
  color = "#285943",
  size = "md",
  className,
  ring = false,
}: {
  name: string;
  color?: string;
  size?: AvatarSize;
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white",
        sizes[size],
        ring && "ring-2 ring-surface",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      }}
      aria-label={name}
    >
      {initials(name)}
    </span>
  );
}
