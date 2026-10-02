"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Logo } from "./ui/Logo";
import { Avatar } from "./ui/Avatar";
import { SearchOverlay } from "./SearchOverlay";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { currentUser, notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "خانه" },
  { href: "/discover", label: "کتاب‌ها" },
  { href: "/authors", label: "نویسندگان" },
  { href: "/book-talk", label: "گفت‌وگو با کتاب" },
  { href: "/activity", label: "فعالیت‌ها" },
];

export function Navbar() {
  const pathname = usePathname();
  const [search, setSearch] = useState(false);
  const [notif, setNotif] = useState(false);
  const unread = notifications.some((n) => n.unread);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 hidden border-b border-border bg-surface/90 backdrop-blur md:block">
        <div className="container-app flex h-16 items-center gap-6">
          <Logo href="/" />

          <nav className="flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-3 py-2 text-body-sm font-medium transition",
                  isActive(l.href)
                    ? "bg-primary-soft text-primary"
                    : "text-ink hover:bg-background"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setSearch(true)}
            className="group ms-auto flex h-10 w-64 items-center gap-3 rounded-md bg-background px-4 text-body-sm text-muted transition hover:ring-1 hover:ring-border"
          >
            <Search className="size-5" />
            جستجوی کتاب یا نویسنده...
          </button>

          <div className="relative">
            <button
              onClick={() => setNotif((v) => !v)}
              className="relative flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-background"
              aria-label="اعلان‌ها"
            >
              <Bell className="size-5" />
              {unread && (
                <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger ring-2 ring-surface" />
              )}
            </button>
            <NotificationsDropdown open={notif} onClose={() => setNotif(false)} />
          </div>

          <Link href="/profile" aria-label="پروفایل">
            <Avatar name={currentUser.name} color={currentUser.avatar} size="md" />
          </Link>
        </div>
      </header>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
