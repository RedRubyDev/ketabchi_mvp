import { AdminHeader } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import { categories, books } from "@/lib/data";
import { toFa } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminCategories() {
  const countFor = (name: string) =>
    books.filter((b) => b.genre === name || b.genres.includes(name)).length;

  return (
    <>
      <AdminHeader
        title="دسته‌بندی‌ها"
        subtitle={`${toFa(categories.length)} دسته`}
        action={
          <Button size="sm">
            <Plus className="size-4" />
            افزودن دسته
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="card flex items-center gap-4 p-4 transition hover:shadow-card"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-2xl">
              {c.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold">{c.name}</h3>
              <p className="text-caption text-muted">
                {toFa(countFor(c.name))} کتاب
              </p>
            </div>
            <div className="flex gap-1">
              <button className="rounded p-1.5 text-muted transition hover:bg-primary-soft hover:text-primary">
                <Pencil className="size-4" />
              </button>
              <button className="rounded p-1.5 text-muted transition hover:bg-danger-soft hover:text-danger">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
