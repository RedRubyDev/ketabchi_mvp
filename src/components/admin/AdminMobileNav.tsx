"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { adminNav, isAdminActive } from "./AdminSidebar";

/* Mobile/tablet admin navigation (hidden on lg+, where AdminSidebar takes
   over). A sticky top bar with a hamburger opens a right-anchored drawer
   (RTL) that reuses the same nav items as the desktop sidebar, so the admin
   area is fully reachable below 1024px. */
export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 bg-ink px-4 text-white lg:hidden">
        <Logo href="/admin" theme="dark" size="sm" />
        <span className="text-caption text-white/50">پنل مدیریت</span>
        <button
          onClick={() => setOpen(true)}
          className="ms-auto flex size-10 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="باز کردن منو"
          aria-expanded={open}
        >
          <Menu className="size-6" />
        </button>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      />

      {/* Drawer (slides in from the right for RTL) */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-72 max-w-[82%] flex-col bg-ink text-white/80 shadow-pop transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <Logo href="/admin" theme="dark" />
            <p className="mt-1 pr-10 text-caption text-white/50">پنل مدیریت</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex size-10 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="بستن منو"
          >
            <X className="size-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {adminNav.map((n) => {
            const active = isAdminActive(pathname, n.href);
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
    </>
  );
}
