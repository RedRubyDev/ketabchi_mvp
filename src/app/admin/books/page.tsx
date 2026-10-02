import { AdminHeader, Table } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { books } from "@/lib/data";
import { faRating, toFa } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminBooks() {
  return (
    <>
      <AdminHeader
        title="کتاب‌ها"
        subtitle={`${toFa(books.length)} کتاب`}
        action={
          <Button size="sm">
            <Plus className="size-4" />
            افزودن کتاب
          </Button>
        }
      />

      <Table head={["عنوان", "نویسنده", "دسته", "امتیاز", "سال", ""]}>
        {books.map((b) => (
          <tr key={b.id} className="transition hover:bg-background/60">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-7 shrink-0 items-center justify-center rounded text-[8px] font-bold text-white"
                  style={{ backgroundColor: b.cover }}
                >
                  {b.coverText?.slice(0, 2) ?? ""}
                </span>
                <span className="font-bold">{b.title}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-muted">{b.authorName}</td>
            <td className="px-4 py-3">
              <Badge variant="neutral">{b.genre}</Badge>
            </td>
            <td className="px-4 py-3 font-bold">{faRating(b.rating)}</td>
            <td className="px-4 py-3 text-muted">{toFa(b.publishYear)}</td>
            <td className="px-4 py-3">
              <div className="flex justify-end gap-1">
                <button className="rounded p-1.5 text-muted transition hover:bg-primary-soft hover:text-primary">
                  <Pencil className="size-4" />
                </button>
                <button className="rounded p-1.5 text-muted transition hover:bg-danger-soft hover:text-danger">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
