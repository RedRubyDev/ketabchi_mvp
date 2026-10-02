"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { currentUser } from "@/lib/data";
import { User, Bell, Lock, LogOut } from "lucide-react";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-primary" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-0.5" : "right-0.5"
        }`}
      />
    </button>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof User;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card p-6">
      <h2 className="mb-5 flex items-center gap-2 text-h3 font-bold">
        <Icon className="size-5 text-primary" />
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [prefs, setPrefs] = useState({
    likes: true,
    follows: true,
    comments: false,
    newsletter: true,
  });
  const [privateProfile, setPrivateProfile] = useState(false);

  const save = () => toast("تغییرات با موفقیت ذخیره شد.");

  const toggles: { key: keyof typeof prefs; label: string }[] = [
    { key: "likes", label: "پسندیدن نقدها" },
    { key: "follows", label: "دنبال‌کننده‌های جدید" },
    { key: "comments", label: "پاسخ به نقدها" },
    { key: "newsletter", label: "خبرنامه‌ی هفتگی کتابچی" },
  ];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-h2 font-bold">تنظیمات</h1>

      <Card icon={User} title="اطلاعات پروفایل">
        <div className="flex items-center gap-4">
          <Avatar name={name} color={currentUser.avatar} size="lg" />
          <Button variant="outline" size="sm">
            تغییر تصویر
          </Button>
        </div>
        <Input
          label="نام نمایشی"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="نام کاربری"
          value={username}
          dir="ltr"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-body-sm font-medium">درباره‌ی من</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-md border border-border bg-background p-3 text-body-sm leading-7 focus:border-primary focus:outline-none"
          />
        </div>
      </Card>

      <Card icon={Bell} title="اعلان‌ها">
        {toggles.map((t) => (
          <div key={t.key} className="flex items-center justify-between">
            <span className="text-body-sm">{t.label}</span>
            <Toggle
              checked={prefs[t.key]}
              onChange={(v) => setPrefs((p) => ({ ...p, [t.key]: v }))}
            />
          </div>
        ))}
      </Card>

      <Card icon={Lock} title="حریم خصوصی">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-body-sm">پروفایل خصوصی</span>
            <p className="text-caption text-muted">
              تنها دنبال‌کنندگان می‌توانند فعالیت‌های شما را ببینند.
            </p>
          </div>
          <Toggle checked={privateProfile} onChange={setPrivateProfile} />
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="text" className="text-danger">
          <LogOut className="size-4" />
          خروج از حساب
        </Button>
        <Button onClick={save}>ذخیره‌ی تغییرات</Button>
      </div>
    </div>
  );
}
