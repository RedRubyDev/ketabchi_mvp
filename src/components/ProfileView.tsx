"use client";

import type { User, Shelf, Book, Review, Activity } from "@/lib/types";
import { Avatar } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { FollowButton } from "./FollowButton";
import { Tabs, useTabs } from "./ui/Tabs";
import { ShelfCard } from "./ShelfCard";
import { ActivityCard } from "./ActivityCard";
import { ReviewCard } from "./ReviewCard";
import { EmptyState } from "./ui/EmptyState";
import { toFa } from "@/lib/utils";
import { Settings, BookOpen, Library, Star, Activity as ActIcon } from "lucide-react";
import Link from "next/link";

type ShelfWithPreviews = { shelf: Shelf; previews: Book[] };

export function ProfileView({
  user,
  isOwn,
  shelves,
  activities,
  reviews,
}: {
  user: User;
  isOwn: boolean;
  shelves: ShelfWithPreviews[];
  activities: Activity[];
  reviews: Review[];
}) {
  const { active, setActive } = useTabs("shelves");

  const stats = [
    { label: "خوانده", value: user.stats.read },
    { label: "در حال خواندن", value: user.stats.reading },
    { label: "می‌خواهد بخواند", value: user.stats.want },
    { label: "نقد", value: user.stats.reviews },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-5 rounded-xl bg-surface p-6 shadow-card sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-right">
          <Avatar name={user.name} color={user.avatar} size="xl" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <h1 className="text-h2 font-bold">{user.name}</h1>
              <span className="text-body-sm text-muted" dir="ltr">
                @{user.username}
              </span>
            </div>
            {user.bio && (
              <p className="max-w-xl text-body-sm leading-7 text-ink/90">
                {user.bio}
              </p>
            )}
            <span className="text-caption text-muted">
              {toFa(user.followers)} دنبال‌کننده · {toFa(user.following)} دنبال‌شونده
            </span>
          </div>
          <div className="w-full sm:w-auto">
            {isOwn ? (
              <Link href="/settings">
                <Button variant="outline" fullWidth>
                  <Settings className="size-4" />
                  ویرایش پروفایل
                </Button>
              </Link>
            ) : (
              <FollowButton name={user.name} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-border pt-5 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 text-center">
              <span className="text-h3 font-extrabold text-primary">
                {toFa(s.value)}
              </span>
              <span className="text-caption text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Tabs
        active={active}
        onChange={setActive}
        items={[
          { key: "shelves", label: <TabLabel icon={Library} text="قفسه‌ها" /> },
          { key: "activity", label: <TabLabel icon={ActIcon} text="فعالیت" /> },
          { key: "reviews", label: <TabLabel icon={Star} text="نقدها" /> },
        ]}
      />

      {active === "shelves" &&
        (shelves.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {shelves.map(({ shelf, previews }) => (
              <ShelfCard key={shelf.id} shelf={shelf} previews={previews} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Library}
            title="هنوز قفسه‌ای وجود ندارد"
            description="کتاب‌ها را به قفسه‌ها اضافه کنید تا کتابخانه‌تان شکل بگیرد."
          />
        ))}

      {active === "activity" &&
        (activities.length > 0 ? (
          <div className="flex max-w-2xl flex-col gap-4">
            {activities.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </div>
        ) : (
          <EmptyState icon={ActIcon} title="فعالیتی ثبت نشده است" />
        ))}

      {active === "reviews" &&
        (reviews.length > 0 ? (
          <div className="flex max-w-2xl flex-col gap-5">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title="هنوز نقدی نوشته نشده است"
            description="اولین نقد خود را درباره‌ی کتابی که خوانده‌اید بنویسید."
          />
        ))}
    </div>
  );
}

function TabLabel({ icon: Icon, text }: { icon: typeof Library; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <Icon className="size-4" />
      {text}
    </span>
  );
}
