import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn, toFa } from "@/lib/utils";

export function AdminHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-h2 font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-body-sm text-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  tone = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone?: "primary" | "secondary" | "success" | "danger";
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary-hover",
    success: "bg-success-soft text-success",
    danger: "bg-danger-soft text-danger",
  };
  return (
    <div className="card flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className={cn("flex size-11 items-center justify-center rounded-lg", tones[tone])}>
          <Icon className="size-5" />
        </span>
        {delta && (
          <span className="text-caption font-bold text-success">{delta}</span>
        )}
      </div>
      <div>
        <p className="text-h2 font-extrabold">{value}</p>
        <p className="text-body-sm text-muted">{label}</p>
      </div>
    </div>
  );
}

export function BarChart({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="card p-4 sm:p-6">
      <h3 className="mb-6 text-body font-bold">عضویت‌های جدید در ۶ ماه اخیر</h3>
      <div className="flex h-48 items-end justify-between gap-1.5 sm:gap-3">
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                style={{ height: `${(d.value / max) * 100}%` }}
                title={toFa(d.value)}
              />
            </div>
            <span className="text-caption text-muted">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Table({
  head,
  children,
}: {
  head: string[];
  children: ReactNode;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-body-sm">
          <thead>
            <tr className="border-b border-border bg-background/60 text-caption text-muted">
              {head.map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
