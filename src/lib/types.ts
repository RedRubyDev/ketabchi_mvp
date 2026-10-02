export type ShelfKey = "want" | "reading" | "read";

export interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  booksCount: number;
  /** tailwind gradient classes used for the generated avatar/cover accent */
  accent: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  authorId: string;
  authorName: string;
  genre: string;
  genres: string[];
  publisher: string;
  publishYear: string; // persian year e.g. ۱۳۹۴ stored as latin "1394"
  pages: number;
  isbn: string;
  description: string;
  rating: number;
  ratingsCount: number;
  reviewsCount: number;
  breakdown: RatingBreakdown;
  /** reading progress 0..100 when in "reading" shelf */
  progress?: number;
  /** accent color (hex) for the generated cover */
  cover: string;
  coverText?: string; // optional latin subtitle on the cover
}

export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string; // hex accent for generated avatar
  stats: {
    read: number;
    reading: number;
    want: number;
    reviews: number;
  };
  followers: number;
  following: number;
}

export interface Review {
  id: string;
  bookId: string;
  user: User;
  rating: number;
  date: string; // persian relative, e.g. "۳ روز پیش"
  text: string;
  likes: number;
  spoiler?: boolean;
}

export type ActivityKind = "rated" | "shelved" | "reviewed" | "finished";

export interface Activity {
  id: string;
  user: User;
  kind: ActivityKind;
  book: Book;
  rating?: number;
  shelf?: ShelfKey;
  text?: string;
  time: string; // "۲ ساعت پیش"
  likes: number;
  comments: number;
}

export interface Shelf {
  id: string;
  key: ShelfKey | "custom";
  name: string;
  icon: string; // lucide icon name key
  bookIds: string[];
  isDefault: boolean;
}

export type NotificationKind = "like" | "follow" | "trending" | "comment";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  user?: User;
  text: string;
  time: string;
  unread: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}
