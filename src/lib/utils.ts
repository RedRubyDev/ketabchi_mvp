import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert latin digits in a string/number to Persian digits. */
export function toFa(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** Format a number with thousands separators, then Persian digits. */
export function faNum(n: number): string {
  return toFa(n.toLocaleString("en-US"));
}

/** Format a rating like 4.4 -> ۴٫۴ */
export function faRating(n: number): string {
  return toFa(n.toFixed(1)).replace(".", "٫");
}
