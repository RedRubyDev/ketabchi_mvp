"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Users,
  MessagesSquare,
  User,
  Bell,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./ui/Logo";
import { SearchOverlay } from "./SearchOverlay";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

const tabs: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/discover", label: "کشف", icon: Compass },
  { href: "/activity", label: "جامعه", icon: Users },
  { href: "/book-talk", label: "گفت‌وگو", icon: MessagesSquare },
  { href: "/profile", label: "پروفایل", icon: User },
];

export function MobileHeader() {
  const [search, setSearch] = useState(false);
  const unread = notifications.some((n) => n.unread);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-surface/90 px-4 backdrop-blur md:hidden">
        <Logo href="/" size="sm" />
        <button
          onClick={() => setSearch(true)}
          className="ms-auto flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-background"
          aria-label="جستجو"
        >
          <Search className="size-5" />
        </button>
        <Link
          href="/notifications"
          className="relative flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-background"
          aria-label="اعلان‌ها"
        >
          <Bell className="size-5" />
          {unread && (
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger ring-2 ring-surface" />
          )}
        </Link>
      </header>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

export function MobileNavbar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-surface md:hidden">
      <div className="flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((t) => {
          const active = isActive(t.href);
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-caption transition",
                active ? "text-primary" : "text-muted"
              )}
            >
              <Icon className="size-6" strokeWidth={active ? 2.4 : 1.8} />
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
