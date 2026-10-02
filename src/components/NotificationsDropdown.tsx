"use client";

import { useEffect, useRef } from "react";
import { Heart, UserPlus, TrendingUp, MessageCircle, type LucideIcon } from "lucide-react";
import type { NotificationKind } from "@/lib/types";
import { notifications } from "@/lib/data";
import { Avatar } from "./ui/Avatar";
import { toFa } from "@/lib/utils";
import Link from "next/link";

const kindIcon: Record<NotificationKind, { icon: LucideIcon; className: string }> = {
  like: { icon: Heart, className: "bg-danger-soft text-danger" },
  follow: { icon: UserPlus, className: "bg-primary-soft text-primary" },
  trending: { icon: TrendingUp, className: "bg-secondary-soft text-secondary-hover" },
  comment: { icon: MessageCircle, className: "bg-success-soft text-success" },
};

export function NotificationsDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-2 w-80 origin-top animate-scale-in overflow-hidden rounded-xl border border-border bg-surface shadow-pop"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-body-sm font-bold">اعلان‌ها</span>
        {unreadCount > 0 && (
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-caption font-bold text-primary">
            {toFa(unreadCount)} جدید
          </span>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((n) => {
          const { icon: Icon, className } = kindIcon[n.kind];
          return (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-4 py-3 transition hover:bg-background ${
                n.unread ? "bg-primary-softer" : ""
              }`}
            >
              <div className="relative shrink-0">
                {n.user ? (
                  <Avatar name={n.user.name} color={n.user.avatar} size="md" />
                ) : (
                  <span className={`flex size-10 items-center justify-center rounded-full ${className}`}>
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
                <p className="text-body-sm leading-6">{n.text}</p>
                <span className="text-caption text-muted">{n.time}</span>
              </div>
              {n.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
            </div>
          );
        })}
      </div>

      <Link
        href="/notifications"
        onClick={onClose}
        className="block border-t border-border px-4 py-3 text-center text-body-sm font-bold text-primary transition hover:bg-background"
      >
        مشاهده‌ی همه‌ی اعلان‌ها
      </Link>
    </div>
  );
}
