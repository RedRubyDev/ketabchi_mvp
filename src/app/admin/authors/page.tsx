import { AdminHeader, Table } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { authors } from "@/lib/data";
import { toFa } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminAuthors() {
  return (
    <>
      <AdminHeader
        title="نویسندگان"
        subtitle={`${toFa(authors.length)} نویسنده`}
        action={
          <Button size="sm">
            <Plus className="size-4" />
            افزودن نویسنده
          </Button>
        }
      />

      <Table head={["نویسنده", "تعداد کتاب", "معرفی", ""]}>
        {authors.map((a) => (
          <tr key={a.id} className="transition hover:bg-background/60">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar name={a.name} color={a.accent} size="sm" />
                <span className="font-bold">{a.name}</span>
              </div>
            </td>
            <td className="px-4 py-3">{toFa(a.booksCount)}</td>
            <td className="max-w-md px-4 py-3 text-muted">
              <span className="line-clamp-1">{a.bio}</span>
            </td>
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
