import type { Book } from "@/lib/types";
import { books, shelves, getBookById } from "@/lib/data";
import type {
  FeedbackAxis,
  MatchReason,
  Recommendation,
  RecommendationSet,
  SearchIntent,
} from "./types";
import { readerLibrary } from "./tasteProfileService";

/* ----------------------------------------------------------------------------
 * recommendationService — ranks books for a given intent and explains why.
 *
 * MOCK: a transparent scoring function over the local catalogue + the reader's
 * shelves. The important part for the product is that every pick carries
 * human-readable `reasons`; a real ranker/LLM can replace the scoring while
 * keeping the `RecommendationSet` contract.
 * -------------------------------------------------------------------------- */

const TOPIC_GENRES: Record<string, string[]> = {
  "روان‌شناسی": ["روان‌شناسی", "روان‌شناختی"],
  فلسفه: ["فلسفی", "فلسفه"],
  تاریخ: ["تاریخ", "ادبیات ایران"],
  "عشق و رابطه": ["عرفانی", "عاشقانه", "ادبیات ترکیه"],
  "معنا و رشد فردی": ["روان‌شناسی", "فلسفی", "عرفانی", "خاطرات"],
  "معمایی/جنایی": ["جنایی", "روان‌شناختی", "معمایی"],
};

function lovedBooks(): Book[] {
  const fav = shelves.find((s) => s.name.includes("مورد علاقه"));
  return (fav?.bookIds ?? ["b1", "b4", "b9"]).map(getBookById);
}

function readBookIds(): Set<string> {
  const ids = new Set<string>();
  for (const s of shelves) {
    if (s.key === "read" || s.key === "reading") s.bookIds.forEach((i) => ids.add(i));
  }
  return ids;
}

interface Scored {
  book: Book;
  score: number;
  reasons: MatchReason[];
  tasteOverlap: number;
}

function scoreBook(book: Book, intent: SearchIntent, seed?: Book): Scored {
  const tags = [book.genre, ...book.genres];
  const reasons: MatchReason[] = [];
  let score = 58;
  let tasteOverlap = 0;

  // topic
  if (intent.topic) {
    const want = TOPIC_GENRES[intent.topic] ?? [];
    if (want.some((g) => tags.includes(g))) {
      score += 16;
      reasons.push({ text: `موضوعش ${intent.topic} است، همان چیزی که خواستی`, source: "intent" });
    }
  }

  // mood
  if (intent.mood === "آرام" && book.pages <= 220) {
    score += 8;
    reasons.push({ text: "ریتمش سنگین نیست و آرام پیش می‌رود", source: "intent" });
  }
  if (intent.mood === "تأمل‌برانگیز" && tags.some((g) => ["فلسفی", "روان‌شناختی", "عرفانی"].includes(g))) {
    score += 10;
    reasons.push({ text: "یک پرسش ذهنی با خودش می‌آورد", source: "intent" });
  }
  if (intent.mood === "پرکشش" && tags.some((g) => ["جنایی", "علمی‌تخیلی", "سیاسی"].includes(g))) {
    score += 9;
    reasons.push({ text: "پرکشش است و رهایت نمی‌کند", source: "intent" });
  }

  // length
  if (intent.length === "کوتاه" && book.pages <= 220) {
    score += 9;
    reasons.push({ text: "کوتاه است؛ یک‌نشست تمام می‌شود", source: "intent" });
  }
  if (intent.length === "بلند" && book.pages >= 400) {
    score += 7;
    reasons.push({ text: "پرحجم است و مدت‌ها همراهت می‌ماند", source: "intent" });
  }

  // level
  if (intent.level === "مقدماتی" && book.pages <= 260) {
    score += 6;
    reasons.push({ text: "برای شروع این موضوع، در دسترس و روان است", source: "intent" });
  }

  // style — fiction that reads smoothly
  if (intent.style === "روان و داستان‌محور" && tags.includes("رمان")) {
    score += 6;
    reasons.push({ text: "داستان‌محور است، نه خشک و نظری", source: "intent" });
  }

  // similar to seed
  if (seed && seed.id !== book.id) {
    const shared = seed.genres.filter((g) => tags.includes(g));
    if (shared.length) {
      score += 10 + shared.length * 2;
      reasons.push({ text: `حال‌وهوایش به «${seed.title}» نزدیک است`, source: "similar" });
    }
  }

  // taste overlap with loved books
  for (const loved of lovedBooks()) {
    if (loved.id === book.id) continue;
    const shared = loved.genres.filter((g) => tags.includes(g)).length;
    if (shared) tasteOverlap += shared;
  }
  if (tasteOverlap > 0) {
    score += Math.min(12, tasteOverlap * 3);
    const near = lovedBooks().find(
      (l) => l.id !== book.id && l.genres.some((g) => tags.includes(g)),
    );
    if (near) reasons.push({ text: `به «${near.title}» که پسندیدی نزدیک است`, source: "taste" });
  }

  // quality
  if (book.rating >= 4.5) {
    score += 5;
    reasons.push({ text: "میان کتاب‌خوان‌ها امتیاز بالایی دارد", source: "quality" });
  }

  return { book, score: Math.min(97, Math.round(score)), reasons, tasteOverlap };
}

function toRecommendation(s: Scored, offTaste = false): Recommendation {
  // keep the 4 strongest, distinct reasons
  const reasons = s.reasons.slice(0, 4);
  if (reasons.length === 0)
    reasons.push({ text: "انتخابی متنوع برای گسترش سلیقه‌ات", source: "quality" });
  return { book: s.book, matchScore: s.score, reasons, offTaste };
}

export function recommendSync(intent: SearchIntent): RecommendationSet {
  const seed = intent.seedBookSlug
    ? books.find((b) => b.slug === intent.seedBookSlug)
    : undefined;
  const read = readBookIds();

  const scored = books
    .filter((b) => b.slug !== intent.seedBookSlug)
    .map((b) => scoreBook(b, intent, seed))
    // prefer books not already read, but don't hard-exclude
    .map((s) => (read.has(s.book.id) ? { ...s, score: s.score - 14 } : s))
    .sort((a, b) => b.score - a.score);

  const picks = scored.slice(0, 4).map((s) => toRecommendation(s));

  // the deliberate "step outside your taste" pick: solid rating, low overlap,
  // and not already in the main picks.
  const pickedIds = new Set(picks.map((p) => p.book.id));
  const stretchCandidate = [...scored]
    .filter((s) => !pickedIds.has(s.book.id) && s.book.rating >= 4.3)
    .sort((a, b) => a.tasteOverlap - b.tasteOverlap || b.book.rating - a.book.rating)[0];

  const stretch = stretchCandidate
    ? toRecommendation(
        {
          ...stretchCandidate,
          reasons: [
            { text: "کمی بیرون از سلیقه‌ی همیشگی‌ات است", source: "taste" },
            { text: "اما میان خواننده‌ها خیلی خوش درخشیده", source: "quality" },
            { text: "می‌تواند یک کشف تازه برایت باشد", source: "taste" },
          ],
        },
        true,
      )
    : undefined;

  return { intent, picks, stretch };
}

/** Re-run with a nudge after the reader says a facet missed the mark. */
export function refineSync(intent: SearchIntent, axis: FeedbackAxis): RecommendationSet {
  const next: SearchIntent = { ...intent, facets: [...intent.facets] };
  const note = (label: string, value: string) => {
    const i = next.facets.findIndex((f) => f.label === label);
    if (i >= 0) next.facets[i] = { label, value };
    else next.facets.push({ label, value });
  };

  switch (axis) {
    case "length":
      next.length = intent.length === "کوتاه" ? "بلند" : "کوتاه";
      note("طول", next.length === "کوتاه" ? "این‌بار کوتاه‌تر" : "این‌بار پرحجم‌تر");
      break;
    case "difficulty":
      next.level = intent.level === "مقدماتی" ? "پیشرفته" : "مقدماتی";
      note("سطح", next.level === "مقدماتی" ? "ساده‌تر" : "جدی‌تر");
      break;
    case "mood":
      next.mood = intent.mood === "آرام" ? "تأمل‌برانگیز" : "آرام";
      note("حال‌وهوا", next.mood === "آرام" ? "آرام‌تر" : "درگیرکننده‌تر");
      break;
    case "pace":
      next.mood = "پرکشش";
      note("ریتم", "پرکشش‌تر");
      break;
    case "genre":
      next.style = "روان و داستان‌محور";
      note("ژانر", "داستانی‌تر");
      break;
    case "topic":
      note("موضوع", "کمی متفاوت از قبل");
      break;
    case "characters":
      note("شخصیت‌ها", "شخصیت‌محورتر");
      break;
  }
  return recommendSync(next);
}

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function recommend(intent: SearchIntent): Promise<RecommendationSet> {
  return delay(recommendSync(intent));
}

export async function refine(
  intent: SearchIntent,
  axis: FeedbackAxis,
): Promise<RecommendationSet> {
  return delay(refineSync(intent, axis));
}

export const feedbackAxes: { key: FeedbackAxis; label: string }[] = [
  { key: "genre", label: "ژانر" },
  { key: "mood", label: "فضا" },
  { key: "difficulty", label: "سطح سختی" },
  { key: "length", label: "طول کتاب" },
  { key: "topic", label: "موضوع" },
  { key: "characters", label: "شخصیت‌ها" },
  { key: "pace", label: "ریتم داستان" },
];
