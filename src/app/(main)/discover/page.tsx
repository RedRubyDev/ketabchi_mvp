"use client";

import { useMemo, useState } from "react";
import { books, categories } from "@/lib/data";
import { BookGrid } from "@/components/BookGrid";
import { Chip } from "@/components/ui/Badge";
import { toFa } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

type Sort = "popular" | "rating" | "newest";

const sorts: { key: Sort; label: string }[] = [
  { key: "popular", label: "محبوب‌ترین" },
  { key: "rating", label: "بالاترین امتیاز" },
  { key: "newest", label: "جدیدترین" },
];

export default function DiscoverPage() {
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("popular");

  const list = useMemo(() => {
    const catName = categories.find((c) => c.id === cat)?.name;
    let out = catName
      ? books.filter(
          (b) => b.genre === catName || b.genres.includes(catName),
        )
      : [...books];
    if (sort === "rating") out = out.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest")
      out = out.sort((a, b) => Number(b.publishYear) - Number(a.publishYear));
    else out = out.sort((a, b) => b.ratingsCount - a.ratingsCount);
    return out;
  }, [cat, sort]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 font-bold">کشف کتاب‌ها</h1>
        <p className="mt-1 text-body-sm text-muted">
          {toFa(list.length)} کتاب در {cat ? "این دسته" : "کتابخانه"}
        </p>
      </div>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        <Chip active={cat === null} onClick={() => setCat(null)}>
          همه
        </Chip>
        {categories.map((c) => (
          <Chip
            key={c.id}
            active={cat === c.id}
            onClick={() => setCat(c.id)}
          >
            {c.emoji} {c.name}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 border-y border-border py-3">
        <SlidersHorizontal className="size-4 shrink-0 text-muted" />
        <span className="shrink-0 text-body-sm text-muted">مرتب‌سازی:</span>
        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {sorts.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-body-sm font-medium transition ${
                sort === s.key
                  ? "bg-primary-soft text-primary"
                  : "text-muted hover:bg-background"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <BookGrid books={list} />
    </div>
  );
}
