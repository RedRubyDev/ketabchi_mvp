import Link from "next/link";
import { Sparkles, MessagesSquare, ArrowLeft } from "lucide-react";
import {
  popularBooks,
  continueReading,
  activities,
  currentUser,
  authors,
} from "@/lib/data";
import { buildTasteProfileSync } from "@/lib/ai";
import { BookRail } from "@/components/BookGrid";
import { BookCardHorizontal } from "@/components/BookCard";
import { ActivityCard } from "@/components/ActivityCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Avatar } from "@/components/ui/Avatar";
import { AiDiscovery } from "@/components/ai/AiDiscovery";
import { TasteMap } from "@/components/ai/TasteMap";
import { Constellation } from "@/components/ai/Constellation";
import { AiBadge } from "@/components/ai/AiBadge";
import { toFa } from "@/lib/utils";

/* The home page tells one story: کتابچی is an AI reading companion. The order
   is deliberate (brief §18) — the AI invitation and the discovery journey come
   first, then the reader's own taste, then a way to talk to a book, and only
   then the quieter community rails. */
export default function HomePage() {
  const taste = buildTasteProfileSync();
  const talkAuthors = authors.slice(0, 5);

  return (
    <div className="flex flex-col gap-12">
      {/* 1 — conversational AI hero (the first thing a visitor sees) */}
      <section className="ai-console relative overflow-hidden rounded-xl px-6 py-10 text-white shadow-console sm:px-10 sm:py-14">
        <Constellation className="pointer-events-none absolute inset-0 size-full opacity-70" />
        <div className="relative mx-auto max-w-2xl text-center">
          <AiBadge className="mx-auto">هوش کتابچی</AiBadge>
          <p className="mt-5 text-body-sm text-white/70">سلام {currentUser.name} 👋</p>
          <h1 className="mt-1.5 text-balance text-h1 font-extrabold leading-tight sm:text-display">
            امروز دلت می‌خواد چه چیزی بخونی؟
          </h1>
          <p className="mx-auto mt-3 max-w-md text-balance text-body leading-8 text-white/80">
            با زبون خودت بگو دنبال چه حسی هستی؛ کتابچی می‌فهمد و برایت می‌گردد.
          </p>
        </div>
      </section>

      {/* 2 — the discovery journey: search → analyze → why → feedback */}
      <section className="-mt-6">
        <AiDiscovery />
      </section>
      {/* 3 — the reader's own taste map */}
      <section>
        <TasteMap profile={taste} />
      </section>

      {/* 4 — continue reading (personal, grounding) */}
      {continueReading.length > 0 && (
        <section>
          <SectionHeader title="ادامه‌ی مطالعه" href="/shelves/s-reading" />
          <div className="flex flex-col gap-3">
            {continueReading.map((b) => (
              <BookCardHorizontal key={b.id} book={b} showProgress />
            ))}
          </div>
        </section>
      )}

      {/* 5 — Book Talk: a way to "talk" to a book */}
      <section className="ai-console relative overflow-hidden rounded-xl p-6 text-white shadow-console sm:p-8">
        <Constellation className="pointer-events-none absolute inset-0 size-full opacity-50" />
        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-caption font-bold text-white ring-1 ring-white/15">
              <MessagesSquare className="size-3.5" />
              گفت‌وگوی شبیه‌سازی‌شده
            </span>
            <h2 className="mt-3 text-h2 font-extrabold">با کتاب حرف بزن</h2>
            <p className="mt-2 text-body leading-8 text-white/80">
              سؤال‌هایت درباره‌ی یک اثر را بپرس و با شبیه‌سازی هوش کتابچی از زاویه‌ی
              نگاه نویسنده پاسخ بگیر.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2 -space-x-reverse">
                {talkAuthors.map((a) => (
                  <Avatar key={a.id} name={a.name} color={a.accent} size="sm" ring />
                ))}
              </div>
              <span className="text-caption text-white/70">
                {toFa(authors.length)} نویسنده آماده‌ی گفت‌وگو
              </span>
            </div>
          </div>
          <Link
            href="/book-talk"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-white px-6 font-bold text-tech transition hover:bg-white/90"
          >
            شروع گفت‌وگو
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </section>

      {/* 6 — quieter community rails */}
      <section>
        <SectionHeader
          title="محبوب این هفته"
          subtitle="پرخواننده‌ترین کتاب‌های جامعه"
          href="/discover"
        />
        <BookRail books={popularBooks} />
      </section>

      <section>
        <SectionHeader title="فعالیت دوستان" href="/activity" />
        <div className="grid gap-4 sm:grid-cols-2">
          {activities.slice(0, 4).map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
