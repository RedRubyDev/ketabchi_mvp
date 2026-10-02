import Link from "next/link";
import { BookX, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <span className="flex size-24 items-center justify-center rounded-full bg-primary-soft text-primary">
        <BookX className="size-12" strokeWidth={1.5} />
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-display font-extrabold text-primary">۴۰۴</h1>
        <h2 className="text-h2 font-bold">این صفحه پیدا نشد</h2>
        <p className="max-w-md text-body text-muted">
          شاید کتابی که دنبالش بودید به قفسه‌ی دیگری منتقل شده است. بیایید به
          خانه برگردیم.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-body-sm font-bold text-white transition hover:bg-primary-hover"
        >
          <Home className="size-4" />
          بازگشت به خانه
        </Link>
        <Link
          href="/discover"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface px-5 text-body-sm font-bold transition hover:bg-background"
        >
          <Search className="size-4" />
          کشف کتاب‌ها
        </Link>
      </div>
    </div>
  );
}
