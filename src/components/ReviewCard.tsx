"use client";

import type { Review } from "@/lib/types";
import { Avatar } from "./ui/Avatar";
import { RatingStars } from "./ui/Rating";
import { toFa } from "@/lib/utils";
import { ThumbsUp, MoreHorizontal, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function ReviewCard({ review }: { review: Review }) {
  const [revealed, setRevealed] = useState(false);
  const [liked, setLiked] = useState(false);
  const likes = review.likes + (liked ? 1 : 0);

  return (
    <article className="card flex flex-col gap-4 p-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={review.user.name} color={review.user.avatar} size="md" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-body-sm font-bold">{review.user.name}</span>
            </div>
            <RatingStars value={review.rating} size={13} />
          </div>
        </div>
        <span className="text-caption text-muted">{review.date}</span>
      </header>

      {review.spoiler && !revealed ? (
        <div className="flex flex-col items-center gap-3 rounded-md bg-secondary-soft px-4 py-5 text-center">
          <p className="flex items-center gap-2 text-body-sm font-medium text-secondary-hover">
            <AlertTriangle className="size-4" />
            این نقد بخش‌هایی از داستان را لو می‌دهد.
          </p>
          <button
            onClick={() => setRevealed(true)}
            className="rounded-sm border border-secondary/40 bg-surface px-4 py-1.5 text-body-sm font-bold text-secondary-hover transition hover:bg-secondary/10"
          >
            نمایش متن
          </button>
        </div>
      ) : (
        <p className="text-body-sm leading-loose text-ink/90">{review.text}</p>
      )}

      <footer className="flex items-center justify-between">
        <span className="text-caption text-muted">
          {toFa(likes)} نفر این نقد را پسندیدند
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLiked((l) => !l)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-sm font-medium transition ${
              liked
                ? "bg-primary-soft text-primary"
                : "text-muted hover:bg-background"
            }`}
          >
            <ThumbsUp className="size-4" />
            مفید بود
          </button>
          <button
            className="rounded-full p-2 text-muted transition hover:bg-background"
            aria-label="بیشتر"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </footer>
    </article>
  );
}
