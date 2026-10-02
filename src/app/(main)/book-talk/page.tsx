import type { Metadata } from "next";
import { authors } from "@/lib/data";
import { BookTalkView } from "@/components/ai/BookTalkView";

export const metadata: Metadata = {
  title: "گفت‌وگو با کتاب · کتابچی",
  description: "گفت‌وگوی شبیه‌سازی‌شده با هوش کتابچی درباره‌ی آثار نویسندگان",
};

export default function BookTalkPage() {
  return <BookTalkView authors={authors} />;
}
