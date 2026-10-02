"use client";

import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

export interface TabItem {
  key: string;
  label: ReactNode;
}

/** Underline-style tabs (used on profile, search results). */
export function Tabs({
  items,
  active,
  onChange,
  className,
}: {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 border-b border-border",
        className,
      )}
    >
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          className={cn(
            "relative -mb-px whitespace-nowrap border-b-2 pb-3 pt-1 text-body-sm font-bold transition-colors",
            active === it.key
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-ink",
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

/** Uncontrolled convenience wrapper. */
export function useTabs(initial: string) {
  const [active, setActive] = useState(initial);
  return { active, setActive };
}
