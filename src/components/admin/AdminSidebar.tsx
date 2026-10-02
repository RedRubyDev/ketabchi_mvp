"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Star,
  PenTool,
  Tags,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export const adminNav: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/books", label: "کتاب‌ها", icon: BookOpen },
  { href: "/admin/users", label: "کاربران", icon: Users },
  { href: "/admin/reviews", label: "نقدها", icon: Star },
  { href: "/admin/authors", label: "نویسندگان", icon: PenTool },
  { href: "/admin/categories", label: "دسته‌بندی‌ها", icon: Tags },
];

export const isAdminActive = (pathname: string, href: string) =>
  href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => isAdminActive(pathname, href);

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col bg-ink text-white/80 lg:flex">
      <div className="p-6">
        <Logo href="/admin" theme="dark" />
        <p className="mt-1 pr-10 text-caption text-white/50">پنل مدیریت</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {adminNav.map((n) => {
          const active = isActive(n.href);
          const Icon = n.icon;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-body-sm font-medium transition",
                active
                  ? "bg-primary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-5" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-body-sm text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-5" />
          بازگشت به سایت
        </Link>
      </div>
    </aside>
  );
}
