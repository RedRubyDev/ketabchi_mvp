import { activities } from "@/lib/data";
import { ActivityCard } from "@/components/ActivityCard";

export default function ActivityPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-h2 font-bold">فعالیت‌ها</h1>
        <p className="mt-1 text-body-sm text-muted">
          آخرین فعالیت‌های دوستان و جامعه‌ی کتاب‌خوان‌ها
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {activities.map((a) => (
          <ActivityCard key={a.id} activity={a} />
        ))}
      </div>
    </div>
  );
}
