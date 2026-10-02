import { AdminHeader, Table } from "@/components/admin/AdminUI";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/Rating";
import { reviews, getBookById } from "@/lib/data";
import { toFa } from "@/lib/utils";

export default function AdminReviews() {
  return (
    <>
      <AdminHeader title="نقدها" subtitle={`${toFa(reviews.length)} نقد ثبت‌شده`} />

      <Table head={["نویسنده‌ی نقد", "کتاب", "امتیاز", "تاریخ", "وضعیت"]}>
        {reviews.map((r, i) => {
          const book = getBookById(r.bookId);
          const pending = i < 2;
          return (
            <tr key={r.id} className="transition hover:bg-background/60">
              <td className="px-4 py-3 font-bold">{r.user.name}</td>
              <td className="px-4 py-3 text-muted">{book.title}</td>
              <td className="px-4 py-3">
                <RatingStars value={r.rating} size={13} />
              </td>
              <td className="px-4 py-3 text-muted">{r.date}</td>
              <td className="px-4 py-3">
                {pending ? (
                  <Badge variant="secondary">در انتظار</Badge>
                ) : (
                  <Badge variant="success">منتشرشده</Badge>
                )}
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
