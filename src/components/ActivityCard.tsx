"use client";

import type { Activity, ShelfKey } from "@/lib/types";
import { Avatar } from "./ui/Avatar";
import { BookCover } from "./BookCover";
import { RatingStars } from "./ui/Rating";
import { toFa } from "@/lib/utils";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const shelfLabels: Record<ShelfKey, string> = {
  want: "می‌خواهم بخوانم",
  reading: "در حال خواندن",
  read: "خوانده‌ام",
};

function phrase(a: Activity) {
  switch (a.kind) {
    case "rated":
      return `به «${a.book.title}» امتیاز ${toFa(a.rating ?? 0)} داد.`;
    case "shelved":
      return `«${a.book.title}» را به قفسه‌ی «${shelfLabels[a.shelf ?? "want"]}» اضافه کرد.`;
    case "reviewed":
      return `درباره‌ی «${a.book.title}» نقد نوشت.`;
    case "finished":
      return `خواندن «${a.book.title}» را تمام کرد.`;
  }
}

export function ActivityCard({ activity }: { activity: Activity }) {
  const [liked, setLiked] = useState(false);
  const likes = activity.likes + (liked ? 1 : 0);

  return (
    <article className="card flex gap-4 p-4">
      <Link
        href={`/users/${activity.user.username}`}
        className="shrink-0"
        aria-label={activity.user.name}
      >
        <Avatar name={activity.user.name} color={activity.user.avatar} size="md" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-body-sm leading-relaxed">
          <Link
            href={`/users/${activity.user.username}`}
            className="font-bold hover:text-primary"
          >
            {activity.user.name}
          </Link>{" "}
          <span className="text-ink/80">{phrase(activity)}</span>
        </p>

        {activity.kind === "rated" && (
          <RatingStars value={activity.rating ?? 0} size={15} />
        )}
        {activity.kind === "reviewed" && activity.text && (
          <p className="rounded-md bg-background px-3 py-2 text-body-sm text-muted">
            {activity.text}
          </p>
        )}

        <div className="mt-1 flex items-center gap-4 text-caption text-muted">
          <span>{activity.time}</span>
          <button
            onClick={() => setLiked((l) => !l)}
            className={`flex items-center gap-1 transition ${liked ? "text-danger" : "hover:text-ink"}`}
          >
            <Heart className="size-4" fill={liked ? "currentColor" : "none"} />
            {toFa(likes)} پسند
          </button>
          <span className="flex items-center gap-1">
            <MessageCircle className="size-4" />
            {toFa(activity.comments)} دیدگاه
          </span>
        </div>
      </div>

      <Link href={`/books/${activity.book.slug}`} className="w-12 shrink-0">
        <BookCover book={activity.book} rounded="rounded-md" />
      </Link>
    </article>
  );
}
