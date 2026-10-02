import type { Shelf, Book } from "@/lib/types";
import { toFa } from "@/lib/utils";
import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  Check,
  GraduationCap,
  Heart,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react";
import { BookCover } from "./BookCover";

const icons: Record<string, LucideIcon> = {
  bookmark: Bookmark,
  "book-open": BookOpen,
  check: Check,
  "graduation-cap": GraduationCap,
  heart: Heart,
};

export function ShelfCard({
  shelf,
  previews,
}: {
  shelf: Shelf;
  previews: Book[];
}) {
  const Icon = icons[shelf.icon] ?? Bookmark;
  return (
    <Link
      href={`/shelves/${shelf.id}`}
      className="group card flex items-center gap-4 p-4 transition hover:shadow-card"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
        <Icon className="size-6" strokeWidth={1.8} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="line-clamp-1 text-body font-bold group-hover:text-primary">
          {shelf.name}
        </h3>
        <p className="text-body-sm text-muted">
          {toFa(shelf.bookIds.length)} کتاب
        </p>
      </div>
      <div className="hidden items-center -space-x-2 space-x-reverse sm:flex">
        {previews.slice(0, 3).map((b) => (
          <div key={b.id} className="w-8">
            <BookCover book={b} rounded="rounded-[4px]" />
          </div>
        ))}
      </div>
      <ChevronLeft className="size-5 shrink-0 text-muted" />
    </Link>
  );
}
