import { searchBooks, searchAuthors } from "@/lib/data";
import { BookGrid } from "@/components/BookGrid";
import { AuthorCard } from "@/components/AuthorCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { toFa } from "@/lib/utils";
import { SearchX } from "lucide-react";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const bookResults = searchBooks(q);
  const authorResults = searchAuthors(q);
  const total = bookResults.length + authorResults.length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-h2 font-bold">نتایج جستجو</h1>
        <p className="mt-1 text-body-sm text-muted">
          {toFa(total)} نتیجه برای «{q}»
        </p>
      </div>

      {total === 0 ? (
        <EmptyState
          icon={SearchX}
          title="نتیجه‌ای پیدا نشد"
          description="عبارت دیگری را امتحان کنید یا املای نام کتاب و نویسنده را بررسی کنید."
        />
      ) : (
        <div className="flex flex-col gap-10">
          {authorResults.length > 0 && (
            <section>
              <SectionHeader title="نویسندگان" />
              <div className="grid gap-3 sm:grid-cols-2">
                {authorResults.map((a) => (
                  <AuthorCard key={a.id} author={a} />
                ))}
              </div>
            </section>
          )}
          {bookResults.length > 0 && (
            <section>
              <SectionHeader title="کتاب‌ها" />
              <BookGrid books={bookResults} />
            </section>
          )}
        </div>
      )}
    </div>
  );
}
