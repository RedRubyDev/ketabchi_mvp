"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MatchReason } from "@/lib/ai/types";

const SOURCE_LABEL: Record<MatchReason["source"], string> = {
  intent: "خواسته‌ی تو",
  taste: "سلیقه‌ات",
  similar: "شباهت",
  quality: "نظر جامعه",
};

/* The explainability block. Reasons are first-class content, not a tooltip:
   every recommendation can say *why* in the reader's own terms. */
export function WhyThisBook({
  reasons,
  defaultOpen = false,
  className,
}: {
  reasons: MatchReason[];
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("rounded-md bg-tech-soft/60", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-body-sm font-bold text-tech transition hover:bg-tech-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-tech/40"
      >
        <Sparkles className="size-4" strokeWidth={2.4} />
        چرا این کتاب؟
        <ChevronDown
          className={cn("ms-auto size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul className="flex flex-col gap-2 px-3 pb-3 pt-1">
          {reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-body-sm text-ink">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-tech" />
              <span className="leading-6">
                {reason.text}
                <span className="ms-1.5 align-middle text-caption text-muted">
                  · {SOURCE_LABEL[reason.source]}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
