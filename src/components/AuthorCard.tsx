import type { Author } from "@/lib/types";
import { Avatar } from "./ui/Avatar";
import { toFa } from "@/lib/utils";
import Link from "next/link";

export function AuthorCard({ author }: { author: Author }) {
  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group card flex items-center gap-4 p-4 transition hover:shadow-card"
    >
      <Avatar name={author.name} color={author.accent} size="lg" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="line-clamp-1 text-body font-bold group-hover:text-primary">
          {author.name}
        </h3>
        <p className="text-body-sm text-muted">
          {toFa(author.booksCount)} کتاب
        </p>
      </div>
    </Link>
  );
}
