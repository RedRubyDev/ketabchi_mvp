import { notFound } from "next/navigation";
import { shelves, getBookById } from "@/lib/data";
import { BookGrid } from "@/components/BookGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { toFa } from "@/lib/utils";
import {
  Bookmark,
  BookOpen,
  Check,
  GraduationCap,
  Heart,
  BookPlus,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  bookmark: Bookmark,
  "book-open": BookOpen,
  check: Check,
  "graduation-cap": GraduationCap,
  heart: Heart,
};

export default async function ShelfPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shelf = shelves.find((s) => s.id === id);
  if (!shelf) notFound();

  const books = shelf.bookIds.map(getBookById);
  const Icon = icons[shelf.icon] ?? Bookmark;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="size-7" strokeWidth={1.8} />
        </span>
        <div>
          <h1 className="text-h2 font-bold">{shelf.name}</h1>
          <p className="mt-0.5 text-body-sm text-muted">
            {toFa(books.length)} کتاب
          </p>
        </div>
      </div>

      {books.length > 0 ? (
        <BookGrid books={books} />
      ) : (
        <EmptyState
          icon={BookPlus}
          title="این قفسه خالی است"
          description="کتاب‌هایی که دوست دارید را به این قفسه اضافه کنید."
          actionLabel="کشف کتاب‌ها"
          actionHref="/discover"
        />
      )}
    </div>
  );
}
