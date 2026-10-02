"use client";

import { useMemo, useState } from "react";
import { Search, X, Clock, ArrowLeft } from "lucide-react";
import { searchBooks, searchAuthors, recentSearches } from "@/lib/data";
import { BookCardCompact } from "./BookCard";
import { AuthorCard } from "./AuthorCard";
import { useRouter } from "next/navigation";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const bookResults = useMemo(() => searchBooks(query), [query]);
  const authorResults = useMemo(() => searchAuthors(query), [query]);

  if (!open) return null;

  const submit = (q: string) => {
    onClose();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="fixed inset-0 z-[95]">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative mx-auto mt-0 flex h-full w-full flex-col bg-surface sm:mt-20 sm:h-auto sm:max-h-[70vh] sm:max-w-2xl sm:animate-scale-in sm:rounded-xl sm:shadow-pop">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <button
            onClick={onClose}
            className="rounded-full p-1 text-muted transition hover:bg-background sm:hidden"
            aria-label="بازگشت"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute inset-y-0 right-3 my-auto size-5 text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && query && submit(query)}
              placeholder="نام کتاب، نویسنده یا ISBN را جستجو کنید..."
              className="h-11 w-full rounded-md bg-background pr-11 pl-4 text-body-sm focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="hidden rounded-full p-1 text-muted transition hover:bg-background sm:block"
            aria-label="بستن"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {query.length === 0 ? (
            <div className="flex flex-col gap-1">
              <span className="px-1 pb-2 text-caption font-medium text-muted">
                جستجوهای اخیر
              </span>
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-right transition hover:bg-background"
                >
                  <span className="flex items-center gap-3 text-body-sm">
                    <Clock className="size-4 text-muted" />
                    {s}
                  </span>
                  <X className="size-4 text-muted" />
                </button>
              ))}
            </div>
          ) : bookResults.length === 0 && authorResults.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-body font-bold">کتابی پیدا نکردیم.</p>
              <p className="mt-1 text-body-sm text-muted">
                نام کتاب یا نویسنده را بررسی کنید.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {bookResults.length > 0 && (
                <section>
                  <span className="px-1 text-caption font-bold text-muted">
                    کتاب‌ها
                  </span>
                  <div className="mt-2 flex flex-col gap-1">
                    {bookResults.map((b) => (
                      <div key={b.id} onClick={onClose}>
                        <BookCardCompact book={b} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {authorResults.length > 0 && (
                <section>
                  <span className="px-1 text-caption font-bold text-muted">
                    نویسندگان
                  </span>
                  <div className="mt-2 flex flex-col gap-2">
                    {authorResults.map((a) => (
                      <div key={a.id} onClick={onClose}>
                        <AuthorCard author={a} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
