import { RatingStars } from "./Rating";
import type { RatingBreakdown } from "@/lib/types";
import { faRating, toFa } from "@/lib/utils";

export function RatingDistribution({
  rating,
  breakdown,
}: {
  rating: number;
  breakdown: RatingBreakdown;
}) {
  const rows = [5, 4, 3, 2, 1] as const;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="text-h1 font-extrabold">{faRating(rating)}</span>
        <RatingStars value={rating} size={22} />
      </div>
      <div className="flex flex-col gap-2.5">
        {rows.map((r) => (
          <div key={r} className="flex items-center gap-3">
            <span className="w-4 text-body-sm text-muted">{toFa(r)}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-border/70">
              <div
                className="h-full rounded-full bg-secondary"
                style={{ width: `${breakdown[r]}%` }}
              />
            </div>
            <span className="w-10 text-left text-caption text-muted">
              {toFa(breakdown[r])}٪
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
