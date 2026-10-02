"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { feedbackAxes } from "@/lib/ai";
import type { FeedbackAxis } from "@/lib/ai/types";
import { cn } from "@/lib/utils";

type Sentiment = "close" | "ok" | "off";

const SENTIMENTS: { key: Sentiment; emoji: string; label: string }[] = [
  { key: "close", emoji: "❤️", label: "خیلی نزدیک بود" },
  { key: "ok", emoji: "🙂", label: "بد نبود" },
  { key: "off", emoji: "🤔", label: "نه، چیزی دیگه می‌خوام" },
];

/* The feedback loop (brief §6). The reader can react in one tap, and «دقیق‌ترش
   کن» opens the axes so they can tell the AI *what* to change. Picking a 🤔
   opens the axes automatically — that is exactly when the reader wants them. */
export function FeedbackLoop({
  onRefine,
  className,
}: {
  onRefine: (axis: FeedbackAxis) => void;
  className?: string;
}) {
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  const [open, setOpen] = useState(false);

  const react = (s: Sentiment) => {
    setSentiment(s);
    if (s === "off") setOpen(true);
  };

  return (
    <div className={cn("rounded-xl bg-surface p-4 shadow-soft sm:p-5", className)}>
      <p className="text-body-sm font-bold text-ink">این پیشنهادها چه‌طور بودن؟</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {SENTIMENTS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => react(s.key)}
            aria-pressed={sentiment === s.key}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-body-sm transition",
              sentiment === s.key
                ? "border-tech bg-tech-soft font-bold text-tech"
                : "border-border text-ink hover:border-tech/40 hover:bg-tech-soft/40",
            )}
          >
            <span aria-hidden>{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>

      {sentiment && sentiment !== "off" && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-body-sm font-bold text-tech transition hover:gap-2.5"
        >
          <Sparkles className="size-4" strokeWidth={2.4} />
          دقیق‌ترش کن
        </button>
      )}

      {open && (
        <div className="mt-4 animate-reveal-up border-t border-border pt-4">
          <p className="text-body-sm text-muted">کدام را عوض کنم؟</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {feedbackAxes.map((axis) => (
              <button
                key={axis.key}
                type="button"
                onClick={() => onRefine(axis.key)}
                className="rounded-full bg-tech-soft px-3.5 py-2 text-body-sm font-bold text-tech transition hover:bg-tech hover:text-white"
              >
                {axis.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
