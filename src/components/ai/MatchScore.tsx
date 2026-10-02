"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/utils";

/* Animated fit-score ring. Counts up once when it scrolls into view. The ring
   and number are AI-blue — they belong to the recommendation, an AI output. */
export function MatchScore({
  value,
  size = 56,
  label = "مناسب تو",
  className,
}: {
  value: number;
  size?: number;
  label?: string;
  className?: string;
}) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const stroke = size < 50 ? 4 : 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 900;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            className="text-tech/15"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            className="text-tech transition-[stroke-dashoffset] duration-700 ease-out"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (shown / 100) * c}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-extrabold text-tech"
          style={{ fontSize: size * 0.28 }}
        >
          {toFa(shown)}٪
        </span>
      </div>
      {label && <span className="mt-1 text-caption text-muted">{label}</span>}
    </div>
  );
}
