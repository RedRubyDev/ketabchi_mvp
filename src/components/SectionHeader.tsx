import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function SectionHeader({
  title,
  subtitle,
  href,
  action = "مشاهده‌ی همه",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-h3 font-bold">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-body-sm text-muted">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 text-body-sm font-medium text-primary transition hover:gap-2"
        >
          {action}
          <ChevronLeft className="size-4" />
        </Link>
      )}
    </div>
  );
}
