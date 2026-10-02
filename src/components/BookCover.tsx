import { cn } from "@/lib/utils";
import type { Book } from "@/lib/types";

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function darken(hex: string, amount = 0.3) {
  const { r, g, b } = hexToRgb(hex);
  const f = 1 - amount;
  return `rgb(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)})`;
}

/**
 * Procedurally rendered book cover (no external images). Uses the book's
 * accent color plus the title/author to produce a consistent, bookish cover.
 */
export function BookCover({
  book,
  className,
  rounded = "rounded-lg",
}: {
  book: Pick<Book, "title" | "authorName" | "cover" | "coverText">;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden shadow-card",
        rounded,
        className,
      )}
      style={{
        background: `linear-gradient(150deg, ${book.cover}, ${darken(book.cover, 0.35)})`,
      }}
    >
      {/* spine */}
      <div
        className="absolute inset-y-0 right-0 w-[7px]"
        style={{ background: darken(book.cover, 0.45) }}
      />
      {/* subtle frame */}
      <div className="absolute inset-2.5 rounded-[6px] border border-white/15" />
      <div className="flex h-full flex-col items-center justify-between p-4 text-center text-white">
        <div className="h-5" />
        <div className="flex flex-col items-center gap-2">
          <span className="text-pretty text-[0.95rem] font-extrabold leading-snug drop-shadow">
            {book.title}
          </span>
          {book.coverText && (
            <span className="text-[0.5rem] font-medium uppercase tracking-[0.2em] text-white/70">
              {book.coverText}
            </span>
          )}
        </div>
        <span className="text-[0.6rem] font-medium text-white/75">
          {book.authorName}
        </span>
      </div>
    </div>
  );
}
