"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BookCover } from "@/components/BookCover";
import { RatingStars } from "@/components/ui/Rating";
import { MatchScore } from "./MatchScore";
import { WhyThisBook } from "./WhyThisBook";
import { AiBadge } from "./AiBadge";
import { faRating, cn } from "@/lib/utils";
import type { Recommendation } from "@/lib/ai/types";

/* A single recommended book. The fit-score and «چرا این کتاب؟» sit side by side
   with the cover so the *reason* is as prominent as the pick itself — the core
   promise of the product (brief §5). The off-taste "stretch" pick gets a gold
   تذهیب frame instead of the usual card chrome. */
export function RecommendationCard({
  rec,
  defaultOpenWhy = false,
  className,
}: {
  rec: Recommendation;
  defaultOpenWhy?: boolean;
  className?: string;
}) {
  const { book, matchScore, reasons, offTaste } = rec;
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-surface p-4 shadow-soft transition sm:p-5",
        offTaste && "hairline-gold bg-secondary-soft/30",
        className,
      )}
    >
      <div className="flex gap-4">
        <Link
          href={`/books/${book.slug}`}
          className="w-20 shrink-0 transition-transform hover:-translate-y-0.5 sm:w-24"
        >
          <BookCover book={book} />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {offTaste && (
            <AiBadge tone="soft" className="self-start bg-secondary-soft text-brown">
              یک قدم بیرون از سلیقه‌ات
            </AiBadge>
          )}
          <Link href={`/books/${book.slug}`}>
            <h3 className="line-clamp-2 text-body-lg font-extrabold leading-snug hover:text-primary">
              {book.title}
            </h3>
          </Link>
          <p className="line-clamp-1 text-body-sm text-muted">{book.authorName}</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="text-body-sm font-bold text-ink">{faRating(book.rating)}</span>
            <RatingStars value={book.rating} size={14} />
          </div>
          <p className="mt-1 line-clamp-2 text-body-sm leading-6 text-muted">
            {book.description ?? ""}
          </p>
        </div>

        <div className="shrink-0 self-start">
          <MatchScore value={matchScore} size={56} />
        </div>
      </div>

      <WhyThisBook reasons={reasons} defaultOpen={defaultOpenWhy} />

      <Link
        href={`/books/${book.slug}`}
        className="inline-flex items-center gap-1.5 self-start text-body-sm font-bold text-primary transition hover:gap-2.5"
      >
        بیشتر درباره‌ی این کتاب
        <ArrowLeft className="size-4" />
      </Link>
    </article>
  );
}
