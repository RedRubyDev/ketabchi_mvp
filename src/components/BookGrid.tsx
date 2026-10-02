import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";
import { cn } from "@/lib/utils";

export function BookGrid({
  books,
  className,
}: {
  books: Book[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </div>
  );
}

/** Horizontal scrolling rail used for home sections on mobile/desktop. */
export function BookRail({ books }: { books: Book[] }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto px-4 pb-2">
      {books.map((b) => (
        <div key={b.id} className="w-32 shrink-0 sm:w-40">
          <BookCard book={b} />
        </div>
      ))}
    </div>
  );
}
