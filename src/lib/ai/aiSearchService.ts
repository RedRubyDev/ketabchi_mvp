import { books } from "@/lib/data";
import type { SearchIntent } from "./types";

/* ----------------------------------------------------------------------------
 * aiSearchService — turns a free-text Persian request into a structured intent.
 *
 * MOCK: keyword/﻿phrase matching over a small Persian lexicon. A real
 * implementation would call an LLM to extract the same `SearchIntent` shape.
 * -------------------------------------------------------------------------- */

type Rule = { any: string[]; set: Partial<SearchIntent>; facet?: [string, string] };

const RULES: Rule[] = [
  // mood / حال‌وهوا
  { any: ["آروم", "آرام", "سبک", "ملایم", "بی‌سر و صدا"], set: { mood: "آرام" }, facet: ["حال‌وهوا", "آرام و بی‌تنش"] },
  { any: ["درگیر", "فکر", "ذهن", "تأمل", "عمیق"], set: { mood: "تأمل‌برانگیز" }, facet: ["حال‌وهوا", "ذهن را درگیر می‌کند"] },
  { any: ["هیجان", "پرکشش", "نفس‌گیر", "تعلیق"], set: { mood: "پرکشش" }, facet: ["حال‌وهوا", "پرکشش و پرتعلیق"] },
  { any: ["امیدوار", "حال خوب", "انرژی"], set: { mood: "امیدبخش" }, facet: ["حال‌وهوا", "امیدبخش"] },

  // topic / موضوع
  { any: ["روان‌شناسی", "روانشناسی", "روان شناسی"], set: { topic: "روان‌شناسی" }, facet: ["موضوع", "روان‌شناسی"] },
  { any: ["فلسفه", "فلسفی"], set: { topic: "فلسفه" }, facet: ["موضوع", "فلسفه"] },
  { any: ["تاریخ", "تاریخی"], set: { topic: "تاریخ" }, facet: ["موضوع", "تاریخ"] },
  { any: ["عشق", "عاشقانه", "رابطه"], set: { topic: "عشق و رابطه" }, facet: ["موضوع", "عشق و رابطه"] },
  { any: ["معنا", "زندگی", "خودشناسی", "رشد"], set: { topic: "معنا و رشد فردی" }, facet: ["موضوع", "معنا و رشد فردی"] },
  { any: ["جنایی", "معما", "قتل", "کارآگاه"], set: { topic: "معمایی/جنایی" }, facet: ["موضوع", "معمایی و جنایی"] },

  // level / سطح
  { any: ["مقدماتی", "تازه", "شروع", "اولین", "مبتدی", "ساده"], set: { level: "مقدماتی" }, facet: ["سطح", "مقدماتی / برای شروع"] },
  { any: ["پیشرفته", "حرفه‌ای", "تخصصی", "عمیق‌تر"], set: { level: "پیشرفته" }, facet: ["سطح", "پیشرفته"] },

  // style / سبک
  { any: ["خشک", "آکادمیک", "کتاب درسی"], set: { style: "روان و داستان‌محور" }, facet: ["سبک", "روان، نه خشک"] },
  { any: ["داستان", "روایت", "قصه"], set: { style: "روان و داستان‌محور" }, facet: ["سبک", "روان و داستان‌محور"] },
  { any: ["شعر", "شاعرانه"], set: { style: "شاعرانه" }, facet: ["سبک", "شاعرانه"] },

  // length / طول
  { any: ["کوتاه", "کم‌حجم", "یه‌نفس", "یک‌نفس", "آخر هفته", "سریع"], set: { length: "کوتاه" }, facet: ["طول", "کوتاه / یک‌نشست"] },
  { any: ["بلند", "قطور", "حجیم", "طولانی"], set: { length: "بلند" }, facet: ["طول", "بلند و پرحجم"] },
];

/** Detect a "شبیه <کتاب>" seed reference against the known catalogue. */
function findSeed(query: string): string | undefined {
  const q = query.replace(/‌/g, " ");
  const seed = books.find((b) => q.includes(b.title) || q.includes(b.title.replace(/‌/g, " ")));
  return seed?.slug;
}

export function parseIntentSync(query: string): SearchIntent {
  const q = query.trim();
  const intent: SearchIntent = { query: q, facets: [] };
  const seen = new Set<string>();

  for (const rule of RULES) {
    if (rule.any.some((kw) => q.includes(kw))) {
      Object.assign(intent, rule.set);
      if (rule.facet && !seen.has(rule.facet[0])) {
        intent.facets.push({ label: rule.facet[0], value: rule.facet[1] });
        seen.add(rule.facet[0]);
      }
    }
  }

  const seed = findSeed(q);
  if (seed) {
    intent.seedBookSlug = seed;
    const title = books.find((b) => b.slug === seed)?.title ?? "";
    if (!seen.has("شبیه به")) {
      intent.facets.unshift({ label: "شبیه به", value: title });
    }
  }

  // Always give the reader something back, even for a vague request.
  if (intent.facets.length === 0) {
    intent.facets.push({ label: "برداشت", value: "یک پیشنهاد متنوع بر اساس سلیقه‌ات" });
  }
  return intent;
}

function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function parseIntent(query: string): Promise<SearchIntent> {
  return delay(parseIntentSync(query));
}

/** Example prompts used as placeholder rotation + quick seeds on the home hero. */
export const examplePrompts = [
  "یه کتاب می‌خوام که ذهنم رو درگیر کنه ولی خیلی سنگین نباشه…",
  "یه چیزی شبیه کیمیاگر ولی متفاوت می‌خوام",
  "برای این روزای شلوغ یه کتاب آروم می‌خوام",
  "یه کتاب روان‌شناسی که خیلی خشک نباشه",
  "یه کتاب کوتاه برای آخر هفته",
];

/** One-tap mood seeds shown under the search field. */
export const moodSeeds = [
  "یه کتاب آروم برای شب",
  "ذهنم رو درگیر کنه",
  "کوتاه و یه‌نفس",
  "شبیه ملت عشق ولی کمتر عاشقانه",
];
