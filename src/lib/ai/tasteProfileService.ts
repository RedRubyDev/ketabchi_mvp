import type { Book } from "@/lib/types";
import { books, currentUser, shelves } from "@/lib/data";
import type { TasteDimension, TasteProfile } from "./types";

/* ----------------------------------------------------------------------------
 * tasteProfileService — builds the reader's "نقشه‌ی سلیقه".
 *
 * MOCK: the profile is computed deterministically from the books on the
 * reader's "خوانده‌ام" + "مورد علاقه" shelves (real signal, not invented).
 * Swap `buildTasteProfile` for a backend call with the same return shape.
 * -------------------------------------------------------------------------- */

const DIMENSIONS: { key: string; label: string; emoji: string; genres: string[] }[] =
  [
    {
      key: "narrative",
      label: "داستانی",
      emoji: "📚",
      genres: ["رمان", "رئالیسم جادویی", "ادبیات ایران", "ادبیات ترکیه", "کودک و نوجوان"],
    },
    {
      key: "philosophical",
      label: "فلسفی",
      emoji: "🧠",
      genres: ["فلسفی", "فلسفه", "عرفانی"],
    },
    {
      key: "emotional",
      label: "احساسی",
      emoji: "❤️",
      genres: ["عرفانی", "عاشقانه", "خاطرات", "ادبیات ترکیه"],
    },
    {
      key: "mystery",
      label: "معمایی",
      emoji: "🔍",
      genres: ["جنایی", "معمایی", "روان‌شناختی"],
    },
    {
      key: "scifi",
      label: "علمی‌تخیلی",
      emoji: "🚀",
      genres: ["علمی‌تخیلی", "فانتزی", "سیاسی"],
    },
  ];

/** Books that make up the reader's history (read + loved + in progress). */
export function readerLibrary(): Book[] {
  const ids = new Set<string>();
  for (const s of shelves) {
    if (s.key === "read" || s.name.includes("مورد علاقه") || s.key === "reading") {
      s.bookIds.forEach((id) => ids.add(id));
    }
  }
  return books.filter((b) => ids.has(b.id));
}

function scoreDimensions(library: Book[]): TasteDimension[] {
  const raw = DIMENSIONS.map((d) => {
    let score = 0;
    for (const b of library) {
      const tags = [b.genre, ...b.genres];
      const hits = d.genres.filter((g) => tags.includes(g)).length;
      if (hits > 0) score += hits + b.rating / 5; // quality nudges the signal
    }
    return { ...d, score };
  });

  const max = Math.max(...raw.map((r) => r.score), 1);
  return raw
    .map((r) => ({
      key: r.key,
      label: r.label,
      emoji: r.emoji,
      // normalise to a readable 0..88 scale, floor non-zero signals at 24
      value:
        r.score === 0
          ? Math.round(10 + (r.key.length % 3) * 6)
          : Math.round(Math.min(88, 30 + (r.score / max) * 58)),
    }))
    .sort((a, b) => b.value - a.value);
}

function writeNarrative(dims: TasteDimension[]): { headline: string; narrative: string } {
  const [first, second] = dims;
  const map: Record<string, string> = {
    narrative:
      "کتاب‌هایی که قصه‌ی خوبی برای گفتن دارند و تا آخر نگهت می‌دارند",
    philosophical:
      "کتاب‌هایی که یک ایده یا پرسش را بعد از تمام‌شدن هم با تو نگه می‌دارند",
    emotional: "کتاب‌هایی که حس و حال می‌سازند و دلت را با خود می‌برند",
    mystery: "کتاب‌هایی که ذهنت را درگیر یک معما یا گره می‌کنند",
    scifi: "کتاب‌هایی که دنیایی تازه و متفاوت پیش رویت می‌گذارند",
  };
  const headline = "تو معمولاً سراغ کتاب‌هایی می‌روی که...";
  const narrative = `${map[first.key]}، اما در کنارش ${map[second.key].replace("کتاب‌هایی که ", "")} را هم دوست داری. ترکیبِ قصه‌ی خوب و یک جرقه‌ی فکری، همان چیزی است که معمولاً تو را جذب می‌کند.`;
  return { headline, narrative };
}

/** Simulated latency so the UI can show its "reading your taste" state. */
function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function buildTasteProfileSync(): TasteProfile {
  const library = readerLibrary();
  const dimensions = scoreDimensions(library);
  const { headline, narrative } = writeNarrative(dimensions);
  return {
    dimensions,
    headline,
    narrative,
    basedOn: library.length + currentUser.stats.reviews,
  };
}

export async function getTasteProfile(): Promise<TasteProfile> {
  return delay(buildTasteProfileSync());
}
