import { shelves, getBookById } from "@/lib/data";
import { ShelfCard } from "@/components/ShelfCard";
import { toFa } from "@/lib/utils";

export default function ShelvesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h2 font-bold">قفسه‌های من</h1>
        <p className="mt-1 text-body-sm text-muted">
          {toFa(shelves.length)} قفسه
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {shelves.map((shelf) => (
          <ShelfCard
            key={shelf.id}
            shelf={shelf}
            previews={shelf.bookIds.map(getBookById)}
          />
        ))}
      </div>
    </div>
  );
}
