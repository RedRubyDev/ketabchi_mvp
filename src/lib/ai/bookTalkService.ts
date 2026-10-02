import { authors, books, booksByAuthor } from "@/lib/data";
import type { BookTalkReply } from "./types";

/* ----------------------------------------------------------------------------
 * bookTalkService — a *simulated* conversation with an author.
 *
 * IMPORTANT: this is clearly labelled in the UI as an AI simulation. Replies
 * are grounded in the author's themes and works, never presented as the real
 * author speaking. MOCK: composed from an author knowledge base + the question
 * intent. A real version would ground an LLM on the author's texts and return
 * the same `BookTalkReply` shape (with `basis` + `confidence`).
 * -------------------------------------------------------------------------- */

interface AuthorVoice {
  themes: string;
  signature: string; // a line in the author's spirit
  lens: string; // how they tend to look at a question
}

const VOICES: Record<string, AuthorVoice> = {
  "elif-shafak": {
    themes: "عشق، هویت و معنویت",
    signature: "عشق آبی است که از درون آدم را دگرگون می‌کند، نه چیزی که از بیرون به او اضافه شود.",
    lens: "از دریچه‌ی دگرگونی درونی و پیوند میان آدم‌ها",
  },
  "abbas-maroufi": {
    themes: "فروپاشی خانواده و مرز نبوغ و جنون",
    signature: "آدم‌ها را حسادت و سکوت بیشتر از فاصله از هم دور می‌کند.",
    lens: "از نگاهِ تلخ و چندصدایی به خانواده و تاریخ",
  },
  "sadegh-hedayat": {
    themes: "تنهایی، وهم و تاریکی ذهن",
    signature: "در زندگی زخم‌هایی هست که مثل خوره روح را در انزوا می‌خورد.",
    lens: "از دل تنهایی و مرز میان واقعیت و توهم",
  },
  "gabriel-garcia-marquez": {
    themes: "رئالیسم جادویی و تنهایی نسل‌ها",
    signature: "خاطره، تنها جایی است که گذشته هنوز زنده می‌ماند.",
    lens: "از زاویه‌ای که در آن مرز واقعیت و افسانه محو می‌شود",
  },
  "george-orwell": {
    themes: "قدرت، حقیقت و آزادی",
    signature: "آزادی یعنی حق گفتن اینکه دو به‌علاوه‌ی دو می‌شود چهار.",
    lens: "از نگاهِ انتقادی به قدرت و دستکاری حقیقت",
  },
  "albert-camus": {
    themes: "پوچی و معنا",
    signature: "باید سیزیف را انسانی خوشبخت تصور کرد.",
    lens: "از دریچه‌ی پذیرش پوچی و ساختن معنا با وجودِ آن",
  },
  "saint-exupery": {
    themes: "سادگی، دوستی و دیدن با دل",
    signature: "آنچه اصل است با چشم دیده نمی‌شود.",
    lens: "با سادگی و مهربانیِ نگاهِ کودکانه",
  },
  dostoevsky: {
    themes: "وجدان، گناه و رستگاری",
    signature: "رنج، تنها ریشه‌ی آگاهی است.",
    lens: "از ژرفای وجدان و کشمکش اخلاقی شخصیت‌ها",
  },
  "viktor-frankl": {
    themes: "معنا در سخت‌ترین شرایط",
    signature: "وقتی نمی‌توانیم شرایط را عوض کنیم، به تغییر خودمان فراخوانده می‌شویم.",
    lens: "از نگاهِ معنادرمانی و یافتن چرایی برای تحمل هر چگونه‌ای",
  },
  "paulo-coelho": {
    themes: "سرنوشت، رؤیا و افسانه‌ی شخصی",
    signature: "وقتی چیزی را از ته دل بخواهی، همه‌ی هستی دست‌به‌دست هم می‌دهند تا به آن برسی.",
    lens: "از مسیرِ گوش‌سپردن به دل و دنبال‌کردن رؤیاها",
  },
};

type Bucket = "character" | "meaning" | "writing" | "recommend" | "generic";

function classify(q: string): Bucket {
  if (/شخصیت|تصمیم|چرا .*کرد|پایان|سرنوشت/.test(q)) return "character";
  if (/معنا|چرا نوشت|پیام|درباره‌ی چی|موضوع|هدف/.test(q)) return "meaning";
  if (/نوشتن|سبک|زبان|چطور می‌نویس|نویسندگی/.test(q)) return "writing";
  if (/پیشنهاد|چی بخونم|کتاب دیگه|شبیه/.test(q)) return "recommend";
  return "generic";
}

function delay<T>(value: T, ms = 650): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function replySync(authorSlug: string, question: string): BookTalkReply {
  const author = authors.find((a) => a.slug === authorSlug);
  const voice = VOICES[authorSlug];
  const own = booksByAuthor(author?.id ?? "");
  const related = (own.length ? own : books.slice(0, 3)).slice(0, 3).map((b) => b.id);
  const bucket = classify(question);

  if (!author || !voice) {
    return {
      text: "درباره‌ی این نویسنده هنوز اطلاعات کافی ندارم، اما خوشحال می‌شوم درباره‌ی کتاب‌هایش با هم حرف بزنیم.",
      basis: "اطلاعات عمومی",
      confidence: 40,
      relatedBookIds: related,
    };
  }

  const title = own[0]?.title;
  const base = `اگر از زاویه‌ی نگاه ${author.name} ${voice.lens} به پرسشت نگاه کنیم،`;

  const text: Record<Bucket, string> = {
    character: `${base} انتخاب‌های شخصیت‌ها کمتر از روی منطق و بیشتر از دلِ ${voice.themes} شکل می‌گیرند. ${voice.signature} به همین خاطر تصمیم‌هایی که عجیب به‌نظر می‌رسند، در دنیای ${title ?? "این اثر"} کاملاً باورپذیرند.`,
    meaning: `${base} جانِ کار درباره‌ی ${voice.themes} است. ${voice.signature} ${title ? `«${title}»` : "این کتاب"} هم تلاشی است برای همین پرسش، نه رسیدن به یک پاسخ قطعی.`,
    writing: `${base} فرم و زبان در خدمت ${voice.themes} است؛ لحن برای این انتخاب می‌شود که همان حس را در خواننده زنده کند. ${voice.signature}`,
    recommend: `اگر این فضا را دوست داری، ${title ? `بعد از «${title}»` : "در ادامه"} سراغ کتاب‌هایی برو که ${voice.themes} را از زاویه‌ای تازه می‌کاوند؛ چند مورد را این پایین برایت گذاشته‌ام.`,
    generic: `${base} ${voice.signature} خوشحال می‌شوم بیشتر درباره‌ی ${voice.themes} در آثارش حرف بزنیم.`,
  };

  // confidence: higher when we actually have the author's own books to ground on
  const confidence = Math.min(92, (own.length ? 70 : 50) + question.length % 15);

  return {
    text: text[bucket],
    basis: `بر پایه‌ی درون‌مایه‌های آثار ${author.name}${title ? ` از جمله «${title}»` : ""}`,
    confidence,
    relatedBookIds: related,
  };
}

export async function reply(authorSlug: string, question: string): Promise<BookTalkReply> {
  return delay(replySync(authorSlug, question));
}

/** Suggested opening questions shown as chips when a talk starts. */
export const starterQuestions = [
  "این کتاب برای چه کسی نوشته شده؟",
  "چرا این‌طور تمام می‌شود؟",
  "اگر این را دوست داشتم، بعدش چی بخوانم؟",
  "دغدغه‌ی اصلی‌ات در نوشتن چه بود؟",
];
