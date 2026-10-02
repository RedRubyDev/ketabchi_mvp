"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/Rating";
import { useToast } from "@/components/ui/Toast";
import { reviews, getBookById } from "@/lib/data";
import { Check, X } from "lucide-react";

export function ReviewQueue() {
  const { toast } = useToast();
  const [queue, setQueue] = useState(reviews.slice(0, 4));

  const act = (id: string, approved: boolean) => {
    setQueue((q) => q.filter((r) => r.id !== id));
    toast(approved ? "نقد تأیید و منتشر شد." : "نقد رد شد.", approved ? "success" : "info");
  };

  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-body font-bold">نقدهای در انتظار بررسی</h3>
        <span className="rounded-full bg-secondary-soft px-2.5 py-0.5 text-caption font-bold text-secondary-hover">
          {queue.length} مورد
        </span>
      </div>

      {queue.length === 0 ? (
        <p className="py-8 text-center text-body-sm text-muted">
          صف بررسی خالی است. آفرین! 🎉
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {queue.map((r) => {
            const book = getBookById(r.bookId);
            return (
              <div key={r.id} className="flex items-start gap-3 py-4 first:pt-0">
                <Avatar name={r.user.name} color={r.user.avatar} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-body-sm font-bold">{r.user.name}</span>
                    <span className="text-caption text-muted">
                      درباره‌ی «{book.title}»
                    </span>
                    <RatingStars value={r.rating} size={12} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-body-sm text-muted">
                    {r.text}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => act(r.id, true)}
                    className="flex size-8 items-center justify-center rounded-md bg-success-soft text-success transition hover:bg-success hover:text-white"
                    aria-label="تأیید"
                  >
                    <Check className="size-4" />
                  </button>
                  <button
                    onClick={() => act(r.id, false)}
                    className="flex size-8 items-center justify-center rounded-md bg-danger-soft text-danger transition hover:bg-danger hover:text-white"
                    aria-label="رد"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
