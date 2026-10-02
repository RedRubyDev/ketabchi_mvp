import { AdminHeader, Table } from "@/components/admin/AdminUI";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { users } from "@/lib/data";
import { toFa } from "@/lib/utils";
import { Ban, Pencil } from "lucide-react";

export default function AdminUsers() {
  return (
    <>
      <AdminHeader title="کاربران" subtitle={`${toFa(users.length)} کاربر`} />

      <Table head={["کاربر", "نام کاربری", "کتاب خوانده", "نقد", "دنبال‌کننده", ""]}>
        {users.map((u) => (
          <tr key={u.id} className="transition hover:bg-background/60">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar name={u.name} color={u.avatar} size="sm" />
                <span className="font-bold">{u.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-muted" dir="ltr">
              @{u.username}
            </td>
            <td className="px-4 py-3">{toFa(u.stats.read)}</td>
            <td className="px-4 py-3">{toFa(u.stats.reviews)}</td>
            <td className="px-4 py-3">{toFa(u.followers)}</td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-2">
                <Badge variant="success">فعال</Badge>
                <button className="rounded p-1.5 text-muted transition hover:bg-primary-soft hover:text-primary">
                  <Pencil className="size-4" />
                </button>
                <button className="rounded p-1.5 text-muted transition hover:bg-danger-soft hover:text-danger">
                  <Ban className="size-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
