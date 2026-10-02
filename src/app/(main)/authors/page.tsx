import { authors } from "@/lib/data";
import { AuthorCard } from "@/components/AuthorCard";
import { toFa } from "@/lib/utils";

export default function AuthorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 font-bold">نویسندگان</h1>
        <p className="mt-1 text-body-sm text-muted">
          {toFa(authors.length)} نویسنده در کتابچی
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((a) => (
          <AuthorCard key={a.id} author={a} />
        ))}
      </div>
    </div>
  );
}
