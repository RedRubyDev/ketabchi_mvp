import { BookOpen, Users, Star, Clock } from "lucide-react";
import { AdminHeader, StatCard, BarChart } from "@/components/admin/AdminUI";
import { ReviewQueue } from "@/components/admin/ReviewQueue";
import { books, users, reviews } from "@/lib/data";
import { toFa } from "@/lib/utils";

const chartData = [
  { label: "اردیبهشت", value: 320 },
  { label: "خرداد", value: 480 },
  { label: "تیر", value: 410 },
  { label: "مرداد", value: 650 },
  { label: "شهریور", value: 720 },
  { label: "مهر", value: 910 },
];

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader
        title="داشبورد"
        subtitle="نمای کلی فعالیت‌های کتابچی"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="کتاب‌ها"
          value={toFa("۱۲٬۴۸۰")}
          delta="+۳.۲٪"
          tone="primary"
        />
        <StatCard
          icon={Users}
          label="کاربران"
          value={toFa("۸٬۵۳۰")}
          delta="+۵.۸٪"
          tone="secondary"
        />
        <StatCard
          icon={Star}
          label="نقدها"
          value={toFa("۴۵٬۲۱۰")}
          delta="+۱۲٪"
          tone="success"
        />
        <StatCard
          icon={Clock}
          label="در انتظار بررسی"
          value={toFa(reviews.slice(0, 4).length)}
          tone="danger"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BarChart data={chartData} />
        <ReviewQueue />
      </div>

      <p className="mt-4 text-caption text-muted">
        داده‌های نمایشی · {toFa(books.length)} کتاب و {toFa(users.length)} کاربر در
        پایگاه داده‌ی آزمایشی
      </p>
    </>
  );
}
