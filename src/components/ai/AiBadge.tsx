import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

/* The single, consistent AI marker. Blue is reserved for AI across the whole
   product, so this badge is how the reader learns "blue = کتابچی’s AI". */
export function AiBadge({
  children = "هوش کتابچی",
  className,
  tone = "solid",
}: {
  children?: ReactNode;
  className?: string;
  tone?: "solid" | "soft" | "ghost";
}) {
  const tones = {
    solid: "bg-tech text-white",
    soft: "bg-tech-soft text-tech",
    ghost: "border border-tech/30 text-tech",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-bold",
        tones,
        className,
      )}
    >
      <Sparkles className="size-3.5" strokeWidth={2.4} />
      {children}
    </span>
  );
}

/** A tiny inline AI dot for places too small for the full badge. */
export function AiDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-5 items-center justify-center rounded-full bg-tech text-white",
        className,
      )}
      aria-hidden
    >
      <Sparkles className="size-3" strokeWidth={2.6} />
    </span>
  );
}
