"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Info, Loader2, BookOpen } from "lucide-react";
import { reply, starterQuestions } from "@/lib/ai";
import { getBookById } from "@/lib/data";
import type { BookTalkReply } from "@/lib/ai/types";
import type { Author } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { BookCardCompact } from "@/components/BookCard";
import { toFa, cn } from "@/lib/utils";

interface Msg {
  id: number;
  role: "user" | "ai";
  text: string;
  reply?: BookTalkReply;
}

/* BookTalkChat — a *simulated* conversation grounded in an author's themes
   (brief §11). It is labelled as a simulation up front and never claims to be
   the real author; every AI turn shows its مبنا (basis), اطمینان (confidence)
   and کتاب‌های مرتبط so the reader always knows what they're reading. */
export function BookTalkChat({ author }: { author: Author }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = async (q: string) => {
    const text = q.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text }]);
    setInput("");
    setThinking(true);
    try {
      const r = await reply(author.slug, text);
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "ai", text: r.text, reply: r },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="flex h-[72vh] max-h-[760px] min-h-[460px] flex-col overflow-hidden rounded-xl bg-surface shadow-soft">
      {/* persistent simulation disclosure — never hidden */}
      <div className="flex items-start gap-2 border-b border-border bg-tech-soft px-3 py-2.5 text-tech sm:px-4">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p className="text-caption font-bold leading-5">
          گفت‌وگوی شبیه‌سازی‌شده با هوش مصنوعی — این {author.name} واقعی نیست؛
          پاسخ‌ها بر پایه‌ی درون‌مایه‌ی آثار او ساخته می‌شوند.
        </p>
      </div>

      {/* header */}
      <div className="flex items-center gap-3 border-b border-border px-3 py-3 sm:px-4">
        <Avatar name={author.name} color={author.accent} size="md" />
        <div className="min-w-0">
          <p className="truncate font-bold">{author.name}</p>
          <p className="text-caption text-muted">شبیه‌سازی گفت‌وگو · هوش کتابچی</p>
        </div>
      </div>

      {/* conversation */}
      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-5 sm:px-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-start gap-3">
            <p className="text-body leading-8 text-ink">
              سلام 👋 می‌توانی هر چه درباره‌ی دنیای {author.name} در ذهن داری
              بپرسی. از کجا شروع کنیم؟
            </p>
            <div className="flex flex-wrap gap-2">
              {starterQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border border-border px-3.5 py-2 text-start text-body-sm text-ink transition hover:border-tech/40 hover:bg-tech-soft/50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-start">
              <p className="max-w-[85%] rounded-2xl rounded-se-sm bg-primary px-4 py-2.5 text-body-sm leading-7 text-white">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={m.id} className="flex flex-col gap-2">
              <div className="flex max-w-[92%] gap-2.5">
                <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-tech text-white">
                  <Sparkles className="size-3.5" strokeWidth={2.4} />
                </span>
                <div className="rounded-2xl rounded-ss-sm bg-background px-4 py-3 text-body-sm leading-7 text-ink">
                  {m.text}
                </div>
              </div>
              {m.reply && <AiReplyMeta reply={m.reply} />}
            </div>
          ),
        )}

        {thinking && (
          <div className="flex items-center gap-2.5 text-muted">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-tech text-white">
              <Loader2 className="size-3.5 animate-spin" />
            </span>
            <span className="text-body-sm">در حال نوشتن پاسخ…</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t border-border p-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder={`از ${author.name} بپرس…`}
          aria-label="پیام خود را بنویس"
          className="min-h-11 flex-1 resize-none rounded-md border border-border bg-background px-3.5 py-3 text-body-sm leading-7 text-ink outline-none focus:border-tech focus:ring-2 focus:ring-tech/20"
        />
        <button
          type="submit"
          disabled={!input.trim() || thinking}
          aria-label="ارسال"
          className="flex size-11 shrink-0 items-center justify-center rounded-md bg-tech text-white transition hover:bg-tech-hover disabled:opacity-40"
        >
          <Send className="size-5 -scale-x-100" />
        </button>
      </form>
    </div>
  );
}

/* The transparency footer under each AI turn: what it's grounded in, how sure
   it is, and where to keep reading. */
function AiReplyMeta({ reply }: { reply: BookTalkReply }) {
  const related = reply.relatedBookIds.map(getBookById).filter(Boolean);
  return (
    <div className="ms-9 flex max-w-[92%] flex-col gap-3 rounded-lg bg-tech-soft/50 p-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-muted">
          <span className="font-bold text-tech">مبنای پاسخ: </span>
          {reply.basis}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-caption text-muted">اطمینان</span>
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-tech/15">
            <div
              className="h-full rounded-full bg-tech"
              style={{ width: `${reply.confidence}%` }}
            />
          </div>
          <span className="text-caption font-bold text-tech">
            {toFa(reply.confidence)}٪
          </span>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-caption font-bold text-ink">
            <BookOpen className="size-3.5 text-tech" />
            کتاب‌های مرتبط برای ادامه
          </p>
          <div className="grid gap-1 sm:grid-cols-2">
            {related.map((b) => (
              <BookCardCompact key={b.id} book={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
