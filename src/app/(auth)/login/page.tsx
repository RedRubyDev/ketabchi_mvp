"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast("خوش آمدید! با موفقیت وارد شدید.");
      router.push("/");
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h1 font-bold">ورود به کتابچی</h1>
        <p className="mt-2 text-body-sm text-muted">
          برای ادامه وارد حساب کاربری خود شوید.
        </p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <Input
          label="ایمیل یا شماره موبایل"
          type="text"
          placeholder="example@mail.com"
          icon={<Mail className="size-5" />}
          required
          dir="ltr"
        />
        <Input
          label="رمز عبور"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="size-5" />}
          required
        />
        <div className="flex items-center justify-between text-body-sm">
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" className="size-4 accent-primary" />
            مرا به خاطر بسپار
          </label>
          <Link href="#" className="font-medium text-primary hover:underline">
            رمز را فراموش کرده‌اید؟
          </Link>
        </div>
        <Button type="submit" fullWidth size="lg" loading={loading}>
          ورود
        </Button>
      </form>

      <div className="flex items-center gap-3 text-caption text-muted">
        <span className="h-px flex-1 bg-border" />
        یا
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button variant="outline" fullWidth size="lg">
        ورود با گوگل
      </Button>

      <p className="text-center text-body-sm text-muted">
        حساب کاربری ندارید؟{" "}
        <Link href="/register" className="font-bold text-primary hover:underline">
          ثبت‌نام کنید
        </Link>
      </p>
    </div>
  );
}
