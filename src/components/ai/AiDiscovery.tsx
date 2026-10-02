"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, RotateCcw, AlertCircle } from "lucide-react";
import {
  parseIntent,
  recommend,
  refine,
  moodSeeds,
  examplePrompts,
} from "@/lib/ai";
import type { FeedbackAxis, RecommendationSet, SearchIntent } from "@/lib/ai/types";
import { AiAnalyzing } from "./AiAnalyzing";
import { RecommendationCard } from "./RecommendationCard";
import { FeedbackLoop } from "./FeedbackLoop";
import { AiBadge } from "./AiBadge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Phase = "idle" | "analyzing" | "results" | "error";

/* AiDiscovery — the heart of the home experience (brief §3–6). A small state
   machine: idle → analyzing → results → (feedback → refine → analyzing …).
   The real async work (parse + rank) runs while the analysis animation plays;
   results are revealed only once BOTH the data and the animation are ready, so
   the "thinking" never feels faked and never cuts off early. */
export function AiDiscovery({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [intent, setIntent] = useState<SearchIntent | undefined>();
  const [result, setResult] = useState<RecommendationSet | undefined>();
  const [animationDone, setAnimationDone] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [placeholder, setPlaceholder] = useState(examplePrompts[0]);
  const resultsRef = useRef<HTMLDivElement>(null);

  // rotate the placeholder prompt while the reader hasn't asked yet
  useEffect(() => {
    if (phase !== "idle") return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % examplePrompts.length;
      setPlaceholder(examplePrompts[i]);
    }, 3200);
    return () => clearInterval(id);
  }, [phase]);

  // reveal results only when the animation AND the data have both landed
  useEffect(() => {
    if (phase === "analyzing" && animationDone && dataReady) setPhase("results");
  }, [phase, animationDone, dataReady]);

  useEffect(() => {
    if (phase === "results")
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [phase]);

  const start = useCallback(async (q: string) => {
    const text = q.trim();
    if (!text) return;
    setQuery(text);
    setSubmitted(text);
    setPhase("analyzing");
    setAnimationDone(false);
    setDataReady(false);
    setResult(undefined);
    setIntent(undefined);
    try {
      const parsed = await parseIntent(text);
      setIntent(parsed);
      const set = await recommend(parsed);
      setResult(set);
      setDataReady(true);
    } catch {
      setPhase("error");
    }
  }, []);

  const doRefine = useCallback(
    async (axis: FeedbackAxis) => {
      if (!intent) return;
      setPhase("analyzing");
      setAnimationDone(false);
      setDataReady(false);
      try {
        const set = await refine(intent, axis);
        setIntent(set.intent);
        setResult(set);
        setDataReady(true);
      } catch {
        setPhase("error");
      }
    },
    [intent],
  );

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* the natural-language request field — blue = کتابچی's AI */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          start(query);
        }}
        className="rounded-xl border border-tech/25 bg-surface p-2 shadow-soft transition focus-within:border-tech focus-within:ring-2 focus-within:ring-tech/15"
      >
        <div className="flex items-end gap-2">
          <Sparkles className="mb-3 ms-2 size-5 shrink-0 text-tech" aria-hidden />
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                start(query);
              }
            }}
            rows={1}
            placeholder={placeholder}
            aria-label="به کتابچی بگو دنبال چه کتابی هستی"
            className="min-h-11 flex-1 resize-none bg-transparent py-3 text-body leading-7 text-ink outline-none placeholder:text-muted"
          />
          <Button
            type="submit"
            size="md"
            className="mb-0.5 shrink-0 gap-2 bg-tech hover:bg-tech-hover"
          >
            کتابچی، برام پیدا کن
            <Sparkles className="size-4" />
          </Button>
        </div>
      </form>
      {/* one-tap mood seeds, only while idle */}
      {phase === "idle" && (
        <div className="flex flex-wrap gap-2">
          {moodSeeds.map((seed) => (
            <button
              key={seed}
              type="button"
              onClick={() => start(seed)}
              className="rounded-full border border-border bg-surface px-3.5 py-2 text-body-sm text-ink transition hover:border-tech/40 hover:bg-tech-soft/40"
            >
              {seed}
            </button>
          ))}
        </div>
      )}

      {phase === "analyzing" && (
        <AiAnalyzing
          query={submitted}
          intent={intent}
          onComplete={() => setAnimationDone(true)}
        />
      )}

      {phase === "error" && (
        <div className="flex flex-col items-start gap-3 rounded-xl bg-danger-soft p-5">
          <p className="flex items-center gap-2 font-bold text-danger">
            <AlertCircle className="size-5" />
            یک جای کار لنگید
          </p>
          <p className="text-body-sm text-ink">
            نتوانستم پیشنهادها را آماده کنم. یک‌بار دیگر امتحان می‌کنی؟
          </p>
          <Button variant="outline" size="sm" onClick={() => start(submitted)}>
            <RotateCcw className="size-4" /> دوباره
          </Button>
        </div>
      )}

      {phase === "results" && result && (
        <div ref={resultsRef} className="flex animate-reveal-up flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-h2 font-extrabold text-balance">
              فکر کنم این‌ها به تو می‌خورن.
            </h2>
            <AiBadge tone="soft">چیدمان کتابچی</AiBadge>
          </div>

          {result.picks.length === 0 ? (
            <div className="rounded-xl bg-surface p-6 text-center shadow-soft">
              <p className="font-bold">چیزی که دقیق بخورد پیدا نکردم.</p>
              <p className="mt-1 text-body-sm text-muted">
                خواسته‌ات را کمی بازتر بگو تا دوباره بگردم.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {result.picks.map((rec, i) => (
                <RecommendationCard
                  key={rec.book.id}
                  rec={rec}
                  defaultOpenWhy={i === 0}
                />
              ))}
            </div>
          )}

          {result.stretch && (
            <div className="flex flex-col gap-3">
              <h3 className="text-h3 font-extrabold">یک‌کم از سلیقه‌ات فاصله بگیر</h3>
              <RecommendationCard rec={result.stretch} />
            </div>
          )}

          <FeedbackLoop onRefine={doRefine} />
        </div>
      )}
    </div>
  );
}
