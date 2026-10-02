import { cn } from "@/lib/utils";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-surface/60 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon className="size-8" strokeWidth={1.5} />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-h3">{title}</h3>
        {description && (
          <p className="max-w-sm text-body-sm text-muted">{description}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-1 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-body-sm font-bold text-white transition hover:bg-primary-hover"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

