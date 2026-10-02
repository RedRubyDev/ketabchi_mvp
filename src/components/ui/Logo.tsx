import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export function Logo({
  href = "/",
  size = "md",
  theme = "light",
  showText = true,
  className,
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  showText?: boolean;
  className?: string;
}) {
  const box = { sm: "size-8", md: "size-9", lg: "size-11" }[size];
  const icon = { sm: "size-4", md: "size-5", lg: "size-6" }[size];
  const text = {
    sm: "text-body font-extrabold",
    md: "text-h3 font-extrabold",
    lg: "text-h2 font-extrabold",
  }[size];

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-md bg-primary text-white shadow-soft",
          box,
        )}
      >
        <BookOpen className={icon} strokeWidth={2.2} />
      </span>
      {showText && (
        <span className={cn(text, theme === "dark" ? "text-white" : "text-ink")}>
          کتابچی
        </span>
      )}
    </Link>
  );
}
