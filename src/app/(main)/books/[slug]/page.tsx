import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getBook,
  getAuthorById,
  reviewsForBook,
  relatedBooks,
} from "@/lib/data";
import { BookCover } from "@/components/BookCover";
import { BookActions } from "@/components/BookActions";
import { RatingStars } from "@/components/ui/Rating";
import { RatingDistribution } from "@/components/ui/RatingDistribution";
import { ReviewCard } from "@/components/ReviewCard";
import { BookRail } from "@/components/BookGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { faRating, toFa } from "@/lib/utils";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const author = getAuthorById(book.authorId);
  const reviews = reviewsForBook(book.id);
  const related = relatedBooks(book);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="mx-auto w-44 sm:w-52 lg:mx-0 lg:w-full">
          <BookCover book={book} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {book.genres.map((g) => (
              <Badge key={g} variant="neutral">
                {g}
              </Badge>
            ))}
          </div>

          <h1 className="text-h1 font-bold">{book.title}</h1>

          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 text-body text-muted transition hover:text-primary"
            >
              <Avatar name={author.name} color={author.accent} size="sm" />
              {author.name}
            </Link>
          )}

          <div className="flex items-center gap-3">
            <span className="text-h3 font-bold">{faRating(book.rating)}</span>
            <RatingStars value={book.rating} size={20} />
            <span className="text-body-sm text-muted">
              ({toFa(book.ratingsCount)} امتیاز · {toFa(book.reviewsCount)} نقد)
            </span>
          </div>

          <p className="max-w-2xl text-body leading-8 text-ink/90">
            {book.description}
          </p>

          <dl className="grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-body-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-muted">ناشر</dt>
              <dd className="font-medium">{book.publisher}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted">سال انتشار</dt>
              <dd className="font-medium">{toFa(book.publishYear)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted">تعداد صفحات</dt>
              <dd className="font-medium">{toFa(book.pages)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted">شابک</dt>
              <dd className="font-medium" dir="ltr">
                {book.isbn}
              </dd>
            </div>
          </dl>

          <div className="mt-2 max-w-sm">
            <BookActions book={book} />
          </div>
        </div>
      </div>

      <section className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[320px_1fr]">
        <div>
          <h2 className="mb-4 text-h3 font-bold">امتیازها و نقدها</h2>
          <RatingDistribution rating={book.rating} breakdown={book.breakdown} />
        </div>

        <div className="flex flex-col gap-5">
          {reviews.length > 0 ? (
            reviews.map((r) => <ReviewCard key={r.id} review={r} />)
          ) : (
            <p className="rounded-lg border border-dashed border-border p-8 text-center text-body-sm text-muted">
              هنوز نقدی برای این کتاب ثبت نشده است. اولین نفر باشید!
            </p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border pt-8">
          <SectionHeader title="کتاب‌های مشابه" />
          <BookRail books={related} />
        </section>
      )}
    </div>
  );
}
