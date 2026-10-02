import { notFound } from "next/navigation";
import { getAuthor, booksByAuthor } from "@/lib/data";
import { BookGrid } from "@/components/BookGrid";
import { FollowButton } from "@/components/FollowButton";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeader } from "@/components/SectionHeader";
import { toFa } from "@/lib/utils";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const books = booksByAuthor(author.id);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-center gap-4 rounded-xl bg-surface p-8 text-center shadow-card sm:flex-row sm:items-start sm:gap-6 sm:text-right">
        <Avatar name={author.name} color={author.accent} size="xl" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <h1 className="text-h1 font-bold">{author.name}</h1>
            <p className="text-body-sm text-muted">
              {toFa(author.booksCount)} کتاب در کتابچی
            </p>
          </div>
          <p className="max-w-2xl text-body leading-8 text-ink/90">
            {author.bio}
          </p>
          <div className="mx-auto sm:mx-0">
            <FollowButton name={author.name} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title={`کتاب‌های ${author.name}`} />
        <BookGrid books={books} />
      </section>
    </div>
  );
}
