import type {
  Activity,
  AppNotification,
  Author,
  Book,
  Category,
  Review,
  Shelf,
  User,
} from "./types";

/* ----------------------------------------------------------------------------
 * NOTE: This is realistic Persian mock data for the Ketabkhoon prototype.
 * Book covers are rendered procedurally (see components/BookCover) from the
 * `cover` accent color so the prototype has no external image dependencies.
 * -------------------------------------------------------------------------- */

export const authors: Author[] = [
  {
    id: "a1",
    name: "الیف شافاک",
    slug: "elif-shafak",
    bio: "نویسنده‌ی ترک‌تبار بریتانیایی، خالق «ملت عشق». آثار او درباره‌ی عشق، هویت و معنویت است و به بیش از پنجاه زبان ترجمه شده‌اند.",
    booksCount: 12,
    accent: "#8B5E3C",
  },
  {
    id: "a2",
    name: "عباس معروفی",
    slug: "abbas-maroufi",
    bio: "نویسنده و روزنامه‌نگار ایرانی، خالق «سمفونی مردگان». از چهره‌های شاخص ادبیات داستانی معاصر ایران.",
    booksCount: 8,
    accent: "#2457A6",
  },
  {
    id: "a3",
    name: "صادق هدایت",
    slug: "sadegh-hedayat",
    bio: "پدر داستان‌نویسی مدرن ایران و خالق «بوف کور»؛ اثری که همچنان مرجع ادبیات تاریک و روان‌کاوانه‌ی فارسی است.",
    booksCount: 15,
    accent: "#242321",
  },
  {
    id: "a4",
    name: "گابریل گارسیا مارکز",
    slug: "gabriel-garcia-marquez",
    bio: "نویسنده‌ی کلمبیایی و برنده‌ی نوبل ادبیات؛ پدر رئالیسم جادویی و خالق «صد سال تنهایی».",
    booksCount: 20,
    accent: "#285943",
  },
  {
    id: "a5",
    name: "جورج اورول",
    slug: "george-orwell",
    bio: "نویسنده‌ی انگلیسی و منتقد اجتماعی، خالق «۱۹۸۴» و «قلعه‌ی حیوانات»؛ از تأثیرگذارترین نویسندگان قرن بیستم.",
    booksCount: 9,
    accent: "#B0862D",
  },
  {
    id: "a6",
    name: "آلبر کامو",
    slug: "albert-camus",
    bio: "فیلسوف و نویسنده‌ی فرانسوی‌الجزایری، برنده‌ی نوبل و خالق «بیگانه»؛ از پیشگامان فلسفه‌ی ابزورد.",
    booksCount: 11,
    accent: "#C89B3C",
  },
  {
    id: "a7",
    name: "آنتوان دو سنت‌اگزوپری",
    slug: "saint-exupery",
    bio: "خلبان و نویسنده‌ی فرانسوی، خالق «شازده کوچولو»؛ یکی از پرخواننده‌ترین کتاب‌های جهان.",
    booksCount: 6,
    accent: "#1D4786",
  },
  {
    id: "a8",
    name: "فئودور داستایفسکی",
    slug: "dostoevsky",
    bio: "نویسنده‌ی بزرگ روس و خالق «جنایت و مکافات» و «برادران کارامازوف»؛ استاد روان‌کاوی شخصیت‌ها.",
    booksCount: 14,
    accent: "#744D30",
  },
  {
    id: "a9",
    name: "ویکتور فرانکل",
    slug: "viktor-frankl",
    bio: "روان‌پزشک اتریشی و بازمانده‌ی اردوگاه‌های نازی، خالق «انسان در جستجوی معنا» و بنیان‌گذار معنادرمانی.",
    booksCount: 7,
    accent: "#3F7059",
  },
  {
    id: "a10",
    name: "پائولو کوئیلو",
    slug: "paulo-coelho",
    bio: "نویسنده‌ی برزیلی و خالق «کیمیاگر»؛ آثار او درباره‌ی سرنوشت، رؤیا و جست‌وجوی معناست.",
    booksCount: 18,
    accent: "#4A6E9E",
  },
];

export const categories: Category[] = [
  { id: "c1", name: "رمان", emoji: "📖" },
  { id: "c2", name: "فلسفه", emoji: "🧠" },
  { id: "c3", name: "روان‌شناسی", emoji: "🫀" },
  { id: "c4", name: "تاریخ", emoji: "🏛️" },
  { id: "c5", name: "علم", emoji: "🔬" },
  { id: "c6", name: "کسب‌وکار", emoji: "💼" },
  { id: "c7", name: "فانتزی", emoji: "🐉" },
  { id: "c8", name: "جنایی", emoji: "🕵️" },
  { id: "c9", name: "شعر", emoji: "🪶" },
  { id: "c10", name: "کودک و نوجوان", emoji: "🧸" },
];

export const users: User[] = [
  {
    id: "u1",
    name: "مریم احمدی",
    username: "marya",
    bio: "کتاب‌خوانی برای من یعنی سفر بدون این‌که از جایم تکان بخورم. عاشق رئالیسم جادویی و ادبیات روسم.",
    avatar: "#285943",
    stats: { read: 34, reading: 3, want: 12, reviews: 18 },
    followers: 1240,
    following: 312,
  },
  {
    id: "u2",
    name: "علی رضایی",
    username: "ali",
    bio: "دانشجوی فلسفه، خواننده‌ی حرفه‌ای کتاب‌های غیرداستانی و گاهی هم رمان.",
    avatar: "#242321",
    stats: { read: 56, reading: 2, want: 23, reviews: 41 },
    followers: 860,
    following: 540,
  },
  {
    id: "u3",
    name: "سارا نادری",
    username: "sara",
    bio: "مترجم و منتقد ادبی. درباره‌ی هر کتابی که می‌خوانم می‌نویسم.",
    avatar: "#C89B3C",
    stats: { read: 128, reading: 4, want: 60, reviews: 97 },
    followers: 4200,
    following: 180,
  },
  {
    id: "u4",
    name: "رضا کریمی",
    username: "reza",
    bio: "طرفدار پر و پا قرص فانتزی و علمی‌تخیلی.",
    avatar: "#744D30",
    stats: { read: 72, reading: 1, want: 40, reviews: 29 },
    followers: 530,
    following: 290,
  },
  {
    id: "u5",
    name: "نگار موسوی",
    username: "negar",
    bio: "روان‌شناس و علاقه‌مند به کتاب‌های رشد فردی و معنا.",
    avatar: "#2457A6",
    stats: { read: 44, reading: 2, want: 18, reviews: 22 },
    followers: 980,
    following: 410,
  },
  {
    id: "u6",
    name: "امیر حسینی",
    username: "amir",
    bio: "شب‌ها کتاب می‌خوانم، روزها درباره‌اش فکر می‌کنم.",
    avatar: "#8B5E3C",
    stats: { read: 61, reading: 3, want: 31, reviews: 35 },
    followers: 720,
    following: 350,
  },
];

/** The signed-in user for this prototype. */
export const currentUser = users[0];

export const books: Book[] = [
  {
    id: "b1",
    slug: "melate-eshgh",
    title: "ملت عشق",
    authorId: "a1",
    authorName: "الیف شافاک",
    genre: "رمان",
    genres: ["رمان", "ادبیات ترکیه", "عرفانی"],
    publisher: "ققنوس",
    publishYear: "1394",
    pages: 512,
    isbn: "978-964-311-998-2",
    description:
      "رمانی درباره‌ی عشق، دگرگونی و دیدار شمس و مولانا؛ داستانی در دو زمان که زندگی زنی معاصر را با چهل قاعده‌ی عشق پیوند می‌زند.",
    rating: 4.4,
    ratingsCount: 12482,
    reviewsCount: 2140,
    breakdown: { 5: 68, 4: 20, 3: 8, 2: 3, 1: 1 },
    cover: "#8B5E3C",
    coverText: "A Novel",
  },
  {
    id: "b2",
    slug: "symphony-mordegan",
    title: "سمفونی مردگان",
    authorId: "a2",
    authorName: "عباس معروفی",
    genre: "رمان",
    genres: ["رمان", "ادبیات ایران"],
    publisher: "ققنوس",
    publishYear: "1368",
    pages: 352,
    isbn: "978-964-311-100-9",
    description:
      "روایت فروپاشی یک خانواده در اردبیل؛ داستانی چندصدایی که مرز میان نبوغ و جنون و حسادت را می‌کاود.",
    rating: 4.6,
    ratingsCount: 9820,
    reviewsCount: 1510,
    breakdown: { 5: 74, 4: 18, 3: 5, 2: 2, 1: 1 },
    cover: "#2457A6",
  },
  {
    id: "b3",
    slug: "boofe-koor",
    title: "بوف کور",
    authorId: "a3",
    authorName: "صادق هدایت",
    genre: "رمان",
    genres: ["رمان", "ادبیات ایران", "روان‌شناختی"],
    publisher: "صادق",
    publishYear: "1315",
    pages: 128,
    isbn: "978-964-351-002-1",
    description:
      "شاهکار تاریک و رؤیاگون هدایت؛ تک‌گویی مردی که مرز میان واقعیت و توهم را در هم می‌شکند.",
    rating: 4.3,
    ratingsCount: 15300,
    reviewsCount: 2980,
    breakdown: { 5: 62, 4: 22, 3: 10, 2: 4, 1: 2 },
    cover: "#242321",
    coverText: "THE BLIND OWL",
  },
  {
    id: "b4",
    slug: "sad-sal-tanhai",
    title: "صد سال تنهایی",
    authorId: "a4",
    authorName: "گابریل گارسیا مارکز",
    genre: "رمان",
    genres: ["رمان", "رئالیسم جادویی"],
    publisher: "امیرکبیر",
    publishYear: "1353",
    pages: 464,
    isbn: "978-964-000-111-3",
    description:
      "حماسه‌ی خانواده‌ی بوئندیا در دهکده‌ی خیالی ماکوندو؛ شاهکار رئالیسم جادویی و یکی از مهم‌ترین رمان‌های قرن بیستم.",
    rating: 4.8,
    ratingsCount: 21040,
    reviewsCount: 3620,
    breakdown: { 5: 82, 4: 13, 3: 3, 2: 1, 1: 1 },
    cover: "#285943",
  },
  {
    id: "b5",
    slug: "1984",
    title: "۱۹۸۴",
    authorId: "a5",
    authorName: "جورج اورول",
    genre: "رمان",
    genres: ["رمان", "علمی‌تخیلی", "سیاسی"],
    publisher: "نیلوفر",
    publishYear: "1349",
    pages: 368,
    isbn: "978-964-448-200-7",
    description:
      "جهانی تحت نظارت کامل «برادر بزرگ»؛ رمانی درباره‌ی قدرت، حقیقت و آزادی که هشدارش هنوز تازه است.",
    rating: 4.5,
    ratingsCount: 18700,
    reviewsCount: 2410,
    breakdown: { 5: 70, 4: 21, 3: 6, 2: 2, 1: 1 },
    cover: "#B0862D",
    coverText: "THE WATCHFUL EYE",
  },
  {
    id: "b6",
    slug: "bigane",
    title: "بیگانه",
    authorId: "a6",
    authorName: "آلبر کامو",
    genre: "رمان",
    genres: ["رمان", "فلسفی"],
    publisher: "ماهی",
    publishYear: "1388",
    pages: 160,
    isbn: "978-964-209-300-5",
    description:
      "مورسو مردی است که احساساتش با قواعد جامعه هم‌خوان نیست؛ رمانی کوتاه و تکان‌دهنده درباره‌ی پوچی و معنا.",
    rating: 4.2,
    ratingsCount: 11200,
    reviewsCount: 1680,
    breakdown: { 5: 58, 4: 26, 3: 11, 2: 3, 1: 2 },
    cover: "#C89B3C",
  },
  {
    id: "b7",
    slug: "shazde-koochooloo",
    title: "شازده کوچولو",
    authorId: "a7",
    authorName: "آنتوان دو سنت‌اگزوپری",
    genre: "کودک و نوجوان",
    genres: ["کودک و نوجوان", "فلسفی"],
    publisher: "امیرکبیر",
    publishYear: "1333",
    pages: 112,
    isbn: "978-964-000-500-5",
    description:
      "دیدار خلبانی گم‌شده در صحرا با شاهزاده‌ای از یک سیاره‌ی کوچک؛ قصه‌ای ساده و عمیق برای همه‌ی سن‌ها.",
    rating: 4.7,
    ratingsCount: 19800,
    reviewsCount: 2250,
    breakdown: { 5: 78, 4: 16, 3: 4, 2: 1, 1: 1 },
    cover: "#1D4786",
    coverText: "The Little Prince",
  },
  {
    id: "b8",
    slug: "jenayat-mokafat",
    title: "جنایت و مکافات",
    authorId: "a8",
    authorName: "فئودور داستایفسکی",
    genre: "رمان",
    genres: ["رمان", "روان‌شناختی", "جنایی"],
    publisher: "خوارزمی",
    publishYear: "1351",
    pages: 720,
    isbn: "978-964-487-110-8",
    description:
      "راسکولنیکوف دانشجوی فقیری است که دست به قتل می‌زند و با وجدان خویش رو‌به‌رو می‌شود؛ شاهکار روان‌کاوی داستایفسکی.",
    rating: 4.6,
    ratingsCount: 16400,
    reviewsCount: 2010,
    breakdown: { 5: 73, 4: 19, 3: 5, 2: 2, 1: 1 },
    cover: "#744D30",
    coverText: "CRIME & PUNISHMENT",
  },
  {
    id: "b9",
    slug: "ensan-dar-jostojooye-mana",
    title: "انسان در جستجوی معنا",
    authorId: "a9",
    authorName: "ویکتور فرانکل",
    genre: "روان‌شناسی",
    genres: ["روان‌شناسی", "فلسفی", "خاطرات"],
    publisher: "درسا",
    publishYear: "1387",
    pages: 200,
    isbn: "978-964-182-220-4",
    description:
      "روایت فرانکل از بقا در اردوگاه‌های نازی و این‌که چگونه یافتن معنا، انسان را در سخت‌ترین شرایط سرِ پا نگه می‌دارد.",
    rating: 4.7,
    ratingsCount: 14100,
    reviewsCount: 1740,
    breakdown: { 5: 79, 4: 15, 3: 4, 2: 1, 1: 1 },
    cover: "#3F7059",
    coverText: "MAN'S SEARCH FOR MEANING",
  },
  {
    id: "b10",
    slug: "kimiagar",
    title: "کیمیاگر",
    authorId: "a10",
    authorName: "پائولو کوئیلو",
    genre: "رمان",
    genres: ["رمان", "عرفانی"],
    publisher: "کاروان",
    publishYear: "1384",
    pages: 184,
    isbn: "978-964-175-330-1",
    description:
      "سفر چوپانی اندلسی به دنبال گنج و افسانه‌ی شخصی‌اش؛ داستانی درباره‌ی گوش‌سپردن به دل و دنبال‌کردن رؤیاها.",
    rating: 4.1,
    ratingsCount: 13500,
    reviewsCount: 1920,
    breakdown: { 5: 55, 4: 25, 3: 13, 2: 4, 1: 3 },
    cover: "#4A6E9E",
    coverText: "THE ALCHEMIST",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    bookId: "b1",
    user: users[2],
    rating: 5,
    date: "۳ روز پیش",
    text: "روایت روان، شخصیت‌های به‌یادماندنی و ترجمه‌ای که ضرباهنگ داستان را حفظ کرده است. از آن کتاب‌هایی بود که دلم نمی‌خواست تمام شود.",
    likes: 24,
  },
  {
    id: "r2",
    bookId: "b1",
    user: users[1],
    rating: 4,
    date: "۳ روز پیش",
    text: "پایان‌بندی داستان شمس و مولانا را طور دیگری تصور می‌کردم؛ این بخش برایم غافلگیرکننده بود و کل نگاهم به کتاب را عوض کرد.",
    likes: 24,
    spoiler: true,
  },
  {
    id: "r3",
    bookId: "b1",
    user: users[4],
    rating: 5,
    date: "۱ هفته پیش",
    text: "چهل قاعده‌ی عشق را جداگانه هم می‌شود خواند و بارها به آن برگشت. کتابی که حال آدم را خوب می‌کند.",
    likes: 51,
  },
  {
    id: "r4",
    bookId: "b4",
    user: users[0],
    rating: 5,
    date: "۲ روز پیش",
    text: "هر بار که این کتاب را می‌خوانم چیز تازه‌ای کشف می‌کنم. ماکوندو برایم واقعی‌تر از خیلی جاهای واقعی است.",
    likes: 38,
  },
  {
    id: "r5",
    bookId: "b3",
    user: users[5],
    rating: 4,
    date: "۵ روز پیش",
    text: "تاریک، سنگین و فراموش‌نشدنی. برای خواندنش باید حوصله و حال‌وهوایش را داشت.",
    likes: 19,
  },
  {
    id: "r6",
    bookId: "b9",
    user: users[3],
    rating: 5,
    date: "دیروز",
    text: "کتابی که نگاهت را به سختی‌ها عوض می‌کند. جمله‌هایش را یادداشت کردم تا بعداً دوباره بخوانم.",
    likes: 44,
  },
];

export const activities: Activity[] = [
  {
    id: "ac1",
    user: users[0],
    kind: "rated",
    book: books[3],
    rating: 5,
    time: "۲ ساعت پیش",
    likes: 12,
    comments: 3,
  },
  {
    id: "ac2",
    user: users[1],
    kind: "shelved",
    book: books[2],
    shelf: "want",
    time: "۴ ساعت پیش",
    likes: 5,
    comments: 1,
  },
  {
    id: "ac3",
    user: users[2],
    kind: "reviewed",
    book: books[0],
    rating: 5,
    text: "روایت روان و ترجمه‌ای که ضرباهنگ داستان را حفظ کرده است.",
    time: "۶ ساعت پیش",
    likes: 31,
    comments: 8,
  },
  {
    id: "ac4",
    user: users[4],
    kind: "finished",
    book: books[8],
    time: "دیروز",
    likes: 22,
    comments: 4,
  },
  {
    id: "ac5",
    user: users[3],
    kind: "rated",
    book: books[4],
    rating: 4,
    time: "دیروز",
    likes: 9,
    comments: 2,
  },
  {
    id: "ac6",
    user: users[5],
    kind: "shelved",
    book: books[7],
    shelf: "reading",
    time: "۲ روز پیش",
    likes: 7,
    comments: 0,
  },
];

export const shelves: Shelf[] = [
  {
    id: "s-want",
    key: "want",
    name: "می‌خواهم بخوانم",
    icon: "bookmark",
    bookIds: ["b3", "b5", "b8", "b10"],
    isDefault: true,
  },
  {
    id: "s-reading",
    key: "reading",
    name: "در حال خواندن",
    icon: "book-open",
    bookIds: ["b1", "b9"],
    isDefault: true,
  },
  {
    id: "s-read",
    key: "read",
    name: "خوانده‌ام",
    icon: "check",
    bookIds: ["b4", "b7", "b6"],
    isDefault: true,
  },
  {
    id: "s-uni",
    key: "custom",
    name: "کتاب‌های دانشگاه",
    icon: "graduation-cap",
    bookIds: ["b2", "b6"],
    isDefault: false,
  },
  {
    id: "s-fav",
    key: "custom",
    name: "کتاب‌های مورد علاقه",
    icon: "heart",
    bookIds: ["b1", "b4", "b9", "b7"],
    isDefault: false,
  },
];

export const notifications: AppNotification[] = [
  {
    id: "n1",
    kind: "like",
    user: users[0],
    text: "مریم نقد شما درباره‌ی «صد سال تنهایی» را پسندید.",
    time: "۱۰ دقیقه پیش",
    unread: true,
  },
  {
    id: "n2",
    kind: "follow",
    user: users[1],
    text: "علی شما را دنبال کرد.",
    time: "۱ ساعت پیش",
    unread: true,
  },
  {
    id: "n3",
    kind: "trending",
    text: "کتاب «بوف کور» که در لیست مطالعه‌ی شماست این هفته محبوب شده است.",
    time: "۳ ساعت پیش",
    unread: false,
  },
  {
    id: "n4",
    kind: "comment",
    user: users[2],
    text: "سارا به نقد شما پاسخ داد.",
    time: "دیروز",
    unread: false,
  },
];

/* ----------------------------- helpers ----------------------------------- */

export const popularBooks = ["b1", "b2", "b3", "b4", "b5"].map(getBookById);
export const continueReading = ["b1", "b9"].map(getBookById);
export const newBooks = ["b7", "b6", "b10", "b8", "b9"].map(getBookById);
export const topRated = ["b4", "b9", "b7", "b2", "b8"].map(getBookById);
export const trending = ["b3", "b1", "b5", "b4", "b2"].map(getBookById);

// progress values for the two in-progress books
books[0].progress = 62;
books[8].progress = 35;

export function getBookById(id: string): Book {
  const b = books.find((x) => x.id === id);
  if (!b) throw new Error(`book ${id} not found`);
  return b;
}

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getUser(username: string): User | undefined {
  return users.find((u) => u.username === username);
}

export function booksByAuthor(authorId: string): Book[] {
  return books.filter((b) => b.authorId === authorId);
}

export function reviewsForBook(bookId: string): Review[] {
  return reviews.filter((r) => r.bookId === bookId);
}

export function relatedBooks(book: Book): Book[] {
  return books.filter((b) => b.id !== book.id).slice(0, 5);
}

export function searchBooks(query: string): Book[] {
  const q = query.trim();
  if (!q) return [];
  return books.filter(
    (b) => b.title.includes(q) || b.authorName.includes(q),
  );
}

export function searchAuthors(query: string): Author[] {
  const q = query.trim();
  if (!q) return [];
  return authors.filter((a) => a.name.includes(q));
}

export const recentSearches = ["ملت عشق", "هری پاتر", "بوف کور"];
