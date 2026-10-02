"use client";

import { useState } from "react";
import { ArrowRight, MessagesSquare } from "lucide-react";
import type { Author } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { AiBadge } from "./AiBadge";
import { BookTalkChat } from "./BookTalkChat";
import { toFa } from "@/lib/utils";

/* The /book-talk screen: pick an author, then open the simulated conversation.
   Keeping selection here (client) lets the chat stay a focused component. */
export function BookTalkView({ authors }: { authors: Author[] }) {
  const [selected, setSelected] = useState<Author | null>(null);

  if (selected) {
    return (
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-1.5 self-start text-body-sm font-bold text-muted transition hover:text-ink"
        >
          <ArrowRight className="size-4" />
          انتخاب نویسنده‌ی دیگر
        </button>
        <BookTalkChat author={selected} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-tech text-white">
            <MessagesSquare className="size-5" />
          </span>
          <h1 className="text-h2 font-extrabold">گفت‌وگو با کتاب</h1>
        </div>
        <p className="max-w-xl text-body leading-8 text-muted">
          یک نویسنده را انتخاب کن و درباره‌ی دنیای آثارش بپرس. پاسخ‌ها
          <span className="font-bold text-tech"> شبیه‌سازی هوش کتابچی </span>
          هستند، نه گفته‌ی واقعی نویسنده.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setSelected(a)}
            className="group flex items-start gap-3 rounded-xl bg-surface p-4 text-start shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <Avatar name={a.name} color={a.accent} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate font-bold group-hover:text-tech">{a.name}</h3>
                <AiBadge tone="ghost" className="shrink-0">
                  شبیه‌سازی
                </AiBadge>
              </div>
              <p className="mt-1 line-clamp-2 text-body-sm leading-6 text-muted">
                {a.bio}
              </p>
              <p className="mt-1.5 text-caption text-muted">
                {toFa(a.booksCount)} کتاب
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
