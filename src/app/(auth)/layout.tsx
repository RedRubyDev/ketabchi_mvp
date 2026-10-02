import { Logo } from "@/components/ui/Logo";
import { BookOpen, Users, Star } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo href="/" />
          </div>
          {children}
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary to-primary-hover lg:flex lg:w-1/2">
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Logo href="/" theme="dark" />
          <div className="flex flex-col gap-6">
            <h2 className="text-display font-extrabold leading-tight">
              جامعه‌ی کتاب‌خوان‌های ایرانی
            </h2>
            <p className="max-w-md text-body-lg leading-8 opacity-90">
              کتاب‌هایتان را دنبال کنید، نقد بنویسید و با هزاران کتاب‌خوان دیگر
              هم‌سلیقه آشنا شوید.
            </p>
            <div className="mt-4 flex gap-8">
              <Stat icon={BookOpen} value="۱۲٬۰۰۰+" label="کتاب" />
              <Stat icon={Users} value="۸٬۵۰۰+" label="عضو" />
              <Stat icon={Star} value="۴۵٬۰۰۰+" label="نقد" />
            </div>
          </div>
          <p className="text-body-sm opacity-70">
            «کتاب‌ها، آینه‌ای‌اند که هر بار چهره‌ای تازه در آن‌ها می‌بینیم.»
          </p>
        </div>
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 size-80 rounded-full bg-secondary/20" />
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof BookOpen;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Icon className="size-6 opacity-80" />
      <span className="text-h3 font-extrabold">{value}</span>
      <span className="text-caption opacity-80">{label}</span>
    </div>
  );
}
