"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { BookCover } from "@/components/BookCover";
import { useToast } from "@/components/ui/Toast";
import { categories, authors, books } from "@/lib/data";
import { cn, toFa } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [genres, setGenres] = useState<string[]>([]);
  const [follows, setFollows] = useState<string[]>([]);
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (
    set: React.Dispatch<React.SetStateAction<string[]>>,
    id: string,
  ) =>
    set((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const next = () => {
    if (step < STEPS - 1) setStep((s) => s + 1);
    else {
      toast("عالی! کتابچی برای شما آماده است.");
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
        <Logo href="/" />
        <button
          onClick={() => router.push("/")}
          className="text-body-sm text-muted hover:text-ink"
        >
          رد کردن
        </button>
      </header>

      <div className="h-1 w-full bg-border">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS) * 100}%` }}
        />
      </div>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10">
        <span className="text-body-sm font-medium text-primary">
          گام {toFa(step + 1)} از {toFa(STEPS)}
        </span>

        {step === 0 && (
          <Step
            title="به چه موضوعاتی علاقه دارید؟"
            desc="حداقل سه موضوع را انتخاب کنید تا پیشنهادهای بهتری دریافت کنید."
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((c) => {
                const on = genres.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(setGenres, c.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2.5 text-body-sm font-medium transition",
                      on
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-surface hover:border-primary",
                    )}
                  >
                    <span>{c.emoji}</span>
                    {c.name}
                    {on && <Check className="size-4" />}
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {step === 1 && (
          <Step
            title="چند نویسنده را دنبال کنید"
            desc="فعالیت و کتاب‌های تازه‌ی آن‌ها را در خانه ببینید."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {authors.slice(0, 6).map((a) => {
                const on = follows.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggle(setFollows, a.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 text-right transition",
                      on ? "border-primary bg-primary-soft" : "border-border bg-surface",
                    )}
                  >
                    <Avatar name={a.name} color={a.accent} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-body-sm font-bold">{a.name}</p>
                      <p className="text-caption text-muted">
                        {toFa(a.booksCount)} کتاب
                      </p>
                    </div>
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full border",
                        on ? "border-primary bg-primary text-white" : "border-border",
                      )}
                    >
                      {on && <Check className="size-4" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step
            title="کدام کتاب‌ها را خوانده‌اید؟"
            desc="چند کتاب را انتخاب کنید تا قفسه‌تان را بسازیم."
          >
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
              {books.map((b) => {
                const on = picked.includes(b.id);
                return (
                  <button
                    key={b.id}
                    onClick={() => toggle(setPicked, b.id)}
                    className="group relative"
                  >
                    <div
                      className={cn(
                        "overflow-hidden rounded-md ring-2 transition",
                        on ? "ring-primary" : "ring-transparent",
                      )}
                    >
                      <BookCover book={b} rounded="rounded-md" />
                    </div>
                    {on && (
                      <span className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="size-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-10">
          <Button
            variant="text"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            بازگشت
          </Button>
          <Button size="lg" onClick={next}>
            {step === STEPS - 1 ? "شروع کنید" : "ادامه"}
          </Button>
        </div>
      </main>
    </div>
  );
}

function Step({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 flex flex-col gap-6 animate-fade-in">
      <div>
        <h1 className="text-h1 font-bold">{title}</h1>
        <p className="mt-2 text-body text-muted">{desc}</p>
      </div>
      {children}
    </div>
  );
}
