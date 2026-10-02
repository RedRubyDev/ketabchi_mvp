"use client";

import { cn, toFa } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  total,
  onChange,
  className,
}: {
  page: number;
  total: number;
  onChange?: (p: number) => void;
  className?: string;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="صفحه‌بندی"
    >
      <button
        onClick={() => onChange?.(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex size-10 items-center justify-center rounded-md border border-border bg-surface text-muted transition hover:border-primary/40 disabled:opacity-40"
        aria-label="قبلی"
      >
        <ChevronRight className="size-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange?.(p)}
          className={cn(
            "flex size-10 items-center justify-center rounded-md border text-body-sm font-medium transition",
            p === page
              ? "border-primary bg-primary text-white"
              : "border-border bg-surface text-ink hover:border-primary/40",
          )}
        >
          {toFa(p)}
        </button>
      ))}
      <button
        onClick={() => onChange?.(Math.min(total, page + 1))}
        disabled={page === total}
        className="flex size-10 items-center justify-center rounded-md border border-border bg-surface text-muted transition hover:border-primary/40 disabled:opacity-40"
        aria-label="بعدی"
      >
        <ChevronLeft className="size-4" />
      </button>
    </nav>
  );
}
