import Link from "next/link";
import type { Book } from "@/lib/types";
import { BookCover } from "./BookCover";
import { RatingStars } from "./ui/Rating";
import { faRating } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`} className="group flex flex-col gap-3">
      <div className="transition-transform duration-200 group-hover:-translate-y-1">
        <BookCover book={book} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-1 text-body font-bold group-hover:text-primary">
          {book.title}
        </h3>
        <p className="line-clamp-1 text-body-sm text-muted">{book.authorName}</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="text-body-sm font-bold text-ink">
            {faRating(book.rating)}
          </span>
          <RatingStars value={book.rating} size={14} />
        </div>
      </div>
    </Link>
  );
}

export function BookCardCompact({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="group flex items-center gap-3 rounded-md p-2 transition hover:bg-background"
    >
      <div className="w-14 shrink-0">
        <BookCover book={book} rounded="rounded-md" />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="line-clamp-1 text-body-sm font-bold group-hover:text-primary">
          {book.title}
        </h3>
        <p className="line-clamp-1 text-caption text-muted">{book.authorName}</p>
        <div className="flex items-center gap-1.5">
          <span className="text-caption font-bold">{faRating(book.rating)}</span>
          <RatingStars value={book.rating} size={12} />
        </div>
      </div>
    </Link>
  );
}

export function BookCardHorizontal({
  book,
  showProgress = false,
  className,
}: {
  book: Book;
  showProgress?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className={cn(
        "group card flex items-center gap-4 p-4 transition hover:shadow-card",
        className,
      )}
    >
      <div className="w-16 shrink-0">
        <BookCover book={book} rounded="rounded-md" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="line-clamp-1 text-body font-bold group-hover:text-primary">
          {book.title}
        </h3>
        <p className="line-clamp-1 text-body-sm text-muted">{book.authorName}</p>
        {showProgress && book.progress != null ? (
          <div className="mt-1 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${book.progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-body-sm font-bold">
              {faRating(book.rating)}
            </span>
            <RatingStars value={book.rating} size={13} />
          </div>
        )}
      </div>
    </Link>
  );
}
