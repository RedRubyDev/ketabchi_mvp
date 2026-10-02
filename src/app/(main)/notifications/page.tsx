import Link from "next/link";
import {
  Heart,
  UserPlus,
  TrendingUp,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import type { NotificationKind } from "@/lib/types";
import { notifications } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";

const kindIcon: Record<NotificationKind, { icon: LucideIcon; className: string }> = {
  like: { icon: Heart, className: "bg-danger-soft text-danger" },
  follow: { icon: UserPlus, className: "bg-primary-soft text-primary" },
  trending: { icon: TrendingUp, className: "bg-secondary-soft text-secondary-hover" },
  comment: { icon: MessageCircle, className: "bg-success-soft text-success" },
};

export default function NotificationsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-h2 font-bold">اعلان‌ها</h1>

      <div className="card divide-y divide-border overflow-hidden">
        {notifications.map((n) => {
          const { icon: Icon, className } = kindIcon[n.kind];
          return (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-4 transition hover:bg-background ${
                n.unread ? "bg-primary-softer" : ""
              }`}
            >
              <div className="relative shrink-0">
                {n.user ? (
                  <Avatar name={n.user.name} color={n.user.avatar} size="md" />
                ) : (
                  <span
                    className={`flex size-11 items-center justify-center rounded-full ${className}`}
                  >
                    <Icon className="size-5" />
                  </span>
                )}
                {n.user && (
                  <span
                    className={`absolute -bottom-1 -left-1 flex size-5 items-center justify-center rounded-full ring-2 ring-surface ${className}`}
                  >
                    <Icon className="size-3" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-body-sm leading-7">{n.text}</p>
                <span className="text-caption text-muted">{n.time}</span>
              </div>
              {n.unread && (
                <span className="mt-2 size-2.5 shrink-0 rounded-full bg-primary" />
              )}
            </div>
          );
        })}
      </div>

      <Link
        href="/"
        className="text-center text-body-sm font-medium text-primary hover:underline"
      >
        بازگشت به خانه
      </Link>
    </div>
  );
}
