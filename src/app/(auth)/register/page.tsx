"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast("حساب شما ساخته شد! بیایید سلیقه‌تان را بشناسیم.");
      router.push("/onboarding");
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-h1 font-bold">ساخت حساب کاربری</h1>
        <p className="mt-2 text-body-sm text-muted">
          به جامعه‌ی کتاب‌خوان‌های کتابچی بپیوندید.
        </p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <Input
          label="نام و نام خانوادگی"
          type="text"
          placeholder="نام شما"
          icon={<User className="size-5" />}
          required
        />
        <Input
          label="ایمیل"
          type="email"
          placeholder="example@mail.com"
          icon={<Mail className="size-5" />}
          required
          dir="ltr"
        />
        <Input
          label="رمز عبور"
          type="password"
          placeholder="حداقل ۸ کاراکتر"
          icon={<Lock className="size-5" />}
          hint="رمز عبور باید حداقل ۸ کاراکتر باشد."
          required
        />
        <label className="flex items-start gap-2 text-body-sm text-muted">
          <input type="checkbox" required className="mt-1 size-4 accent-primary" />
          <span>
            با{" "}
            <Link href="#" className="font-medium text-primary hover:underline">
              قوانین و مقررات
            </Link>{" "}
            کتابچی موافقم.
          </span>
        </label>
        <Button type="submit" fullWidth size="lg" loading={loading}>
          ثبت‌نام
        </Button>
      </form>

      <p className="text-center text-body-sm text-muted">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          وارد شوید
        </Link>
      </p>
    </div>
  );
}
