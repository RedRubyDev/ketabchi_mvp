"use client";

import { useEffect, useState } from "react";
import { AiBadge } from "./AiBadge";
import { toFa, cn } from "@/lib/utils";
import type { TasteProfile } from "@/lib/ai/types";

/* «نقشه‌ی سلیقه‌ی من» (brief §7). The dimensions animate in from zero on mount,
   and the AI narrative is given room as real editorial content, not a caption. */
export function TasteMap({
  profile,
  className,
}: {
  profile: TasteProfile;
  className?: string;
}) {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (r) return setGrown(true);
    const t = setTimeout(() => setGrown(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={cn("rounded-xl bg-surface p-5 shadow-soft sm:p-6", className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-h3 font-extrabold">نقشه‌ی سلیقه‌ی تو</h3>
        <AiBadge tone="soft">ساخته‌ی کتابچی</AiBadge>
      </div>

      <p className="mt-1 text-body-sm text-muted">{profile.headline}</p>

      <ul className="mt-5 flex flex-col gap-3.5">
        {profile.dimensions.map((d, i) => (
          <li key={d.key} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-body-sm font-bold">
              <span className="me-1.5" aria-hidden>
                {d.emoji}
              </span>
              {d.label}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-tech-soft">
              <div
                className="h-full rounded-full bg-tech transition-[width] duration-700 ease-out"
                style={{
                  width: grown ? `${d.value}%` : "0%",
                  transitionDelay: `${i * 90}ms`,
                }}
              />
            </div>
            <span className="w-9 shrink-0 text-start text-caption font-bold text-tech">
              {toFa(d.value)}٪
            </span>
          </li>
        ))}
      </ul>

      <blockquote className="mt-5 rounded-lg bg-tech-soft/50 p-4 text-body leading-8 text-ink">
        {profile.narrative}
      </blockquote>

      <p className="mt-3 text-caption text-muted">
        بر پایه‌ی {toFa(profile.basedOn)} نشانه از کتاب‌ها و امتیازهای تو
      </p>
    </div>
  );
}
