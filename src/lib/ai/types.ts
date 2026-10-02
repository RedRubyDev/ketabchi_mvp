import type { Book } from "@/lib/types";

/* ----------------------------------------------------------------------------
 * AI domain types for Ketabchi.
 *
 * These describe the *contract* between the UI and the AI layer. The current
 * implementations under `src/lib/ai/*Service.ts` are deterministic mocks that
 * compute results from the local mock data, but every function is async and
 * returns these shapes — so a real backend (LLM + retrieval) can be dropped in
 * behind the same signatures without touching the UI.
 * -------------------------------------------------------------------------- */

/** A single reading-taste dimension, e.g. "داستانی" at 82%. */
export interface TasteDimension {
  key: string;
  label: string;
  emoji: string;
  /** 0..100 */
  value: number;
}

export interface TasteProfile {
  dimensions: TasteDimension[];
  /** AI-written, second-person summary of the reader's taste. */
  narrative: string;
  /** short headline, e.g. «کتابچی فکر می‌کنه تو...» completion */
  headline: string;
  /** how many signals (books/ratings) this is based on */
  basedOn: number;
}

/** Structured intent parsed from a natural-language request. */
export interface SearchIntent {
  /** the raw text the reader typed */
  query: string;
  topic?: string; // موضوع، مثل «روان‌شناسی»
  level?: string; // سطح، مثل «مقدماتی»
  style?: string; // سبک، مثل «روان و داستان‌محور»
  length?: string; // طول، مثل «کوتاه / متوسط»
  mood?: string; // حال‌وهوا، مثل «آرام»
  /** slug of a book the reader referenced as a seed ("شبیه کیمیاگر") */
  seedBookSlug?: string;
  /** the facets we actually understood, for the "AI برداشت کرده" panel */
  facets: { label: string; value: string }[];
}

/** One explainable reason a book was recommended. */
export interface MatchReason {
  /** short reason shown as a bullet, e.g. «داستان‌محوره» */
  text: string;
  /** which signal it came from, for transparency */
  source: "intent" | "taste" | "similar" | "quality";
}

export interface Recommendation {
  book: Book;
  /** 0..100 fit score */
  matchScore: number;
  reasons: MatchReason[];
  /** true for the deliberate "step outside your taste" pick */
  offTaste?: boolean;
}

export interface RecommendationSet {
  intent: SearchIntent;
  picks: Recommendation[];
  /** one book intentionally a little outside the reader's usual taste */
  stretch?: Recommendation;
}

/** Axes the reader can use to tell the AI what missed. */
export type FeedbackAxis =
  | "genre"
  | "mood"
  | "difficulty"
  | "length"
  | "topic"
  | "characters"
  | "pace";

export interface FeedbackAxisOption {
  key: FeedbackAxis;
  label: string;
}

/** A turn in the simulated author conversation. */
export interface BookTalkReply {
  text: string;
  /** what the simulated answer is grounded in */
  basis: string;
  /** 0..100 confidence the model expresses */
  confidence: number;
  /** related books to keep exploring */
  relatedBookIds: string[];
}
