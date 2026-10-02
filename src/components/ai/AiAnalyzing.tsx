"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Constellation } from "./Constellation";
import { cn } from "@/lib/utils";
import type { SearchIntent } from "@/lib/ai/types";

const DEFAULT_STEPS = [
  "حرفت را می‌خوانم و منظورت را می‌فهمم",
  "سلیقه‌ی کتاب‌خوانی‌ات را مرور می‌کنم",
  "کتاب‌ها را با خواسته‌ات می‌سنجم",
  "بهترین‌ها را برایت می‌چینم",
];

/* The AI analysis moment (brief §4). No robots or brains — a calm field of
   connected light (Constellation) over the night console, with the reader's
   request restated and the steps lighting up one by one. It drives its own
   timeline and calls onComplete; the parent runs the real async work in
   parallel, so results are ready by the time the animation lands. */
export function AiAnalyzing({
  query,
  intent,
  onComplete,
  stepMs = 850,
  className,
}: {
  query: string;
  intent?: SearchIntent;
  onComplete?: () => void;
  stepMs?: number;
  className?: string;
}) {
  const steps = DEFAULT_STEPS;
  const [active, setActive] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const each = reduce ? 220 : stepMs;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= steps.length; i++) {
      timers.push(setTimeout(() => setActive(i), each * i));
    }
    timers.push(
      setTimeout(() => {
        if (!done.current) {
          done.current = true;
          onComplete?.();
        }
      }, each * (steps.length + 0.6)),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "ai-console relative overflow-hidden rounded-xl p-6 text-white shadow-console sm:p-8",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="کتابچی در حال بررسی خواسته‌ی توست"
    >
      <Constellation active className="pointer-events-none absolute inset-0 size-full opacity-80" />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-caption font-bold text-tech-soft">کتابچی دارد فکر می‌کند…</span>
          <p className="text-body-lg font-bold leading-8 text-balance text-white/95">
            «{query}»
          </p>
          {intent && intent.facets.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-2">
              {intent.facets.map((f, i) => (
                <li
                  key={i}
                  className="animate-step-in rounded-full bg-white/10 px-3 py-1 text-caption text-white/85 ring-1 ring-white/15"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <span className="text-white/55">{f.label}: </span>
                  {f.value}
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="flex flex-col gap-3">
          {steps.map((step, i) => {
            const state = i < active ? "done" : i === active ? "doing" : "idle";
            return (
              <li
                key={i}
                className={cn(
                  "flex items-center gap-3 text-body-sm transition-colors duration-300",
                  state === "idle" && "text-white/35",
                  state === "doing" && "text-white",
                  state === "done" && "text-white/70",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full ring-1 transition",
                    state === "done" && "bg-tech ring-tech",
                    state === "doing" && "bg-white/10 ring-tech animate-glow-pulse",
                    state === "idle" && "ring-white/20",
                  )}
                >
                  {state === "done" ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : state === "doing" ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-white/30" />
                  )}
                </span>
                {step}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
