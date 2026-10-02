"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { RatingInput } from "./ui/Rating";
import { useToast } from "./ui/Toast";
import type { Book, ShelfKey } from "@/lib/types";
import {
  BookmarkPlus,
  Check,
  Star,
  PenLine,
  BookOpen,
  BookMarked,
  ChevronDown,
} from "lucide-react";
import { toFa } from "@/lib/utils";

const shelfOptions: { key: ShelfKey; label: string; icon: typeof BookOpen }[] = [
  { key: "want", label: "می‌خواهم بخوانم", icon: BookmarkPlus },
  { key: "reading", label: "در حال خواندن", icon: BookOpen },
  { key: "read", label: "خوانده‌ام", icon: BookMarked },
];

export function BookActions({ book }: { book: Book }) {
  const { toast } = useToast();
  const [shelf, setShelf] = useState<ShelfKey | null>(null);
  const [sheet, setSheet] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const current = shelfOptions.find((s) => s.key === shelf);

  const pickShelf = (key: ShelfKey, label: string) => {
    setShelf(key);
    setSheet(false);
    toast(`«${book.title}» به قفسه‌ی «${label}» اضافه شد.`);
  };

  const submitRating = () => {
    setRateOpen(false);
    toast(`امتیاز ${toFa(rating)} برای «${book.title}» ثبت شد.`);
  };

  const submitReview = () => {
    if (!reviewText.trim()) return;
    setReviewOpen(false);
    toast("نقد شما با موفقیت ثبت شد. ممنون که نظرتان را به اشتراک گذاشتید.");
    setReviewText("");
    setReviewRating(0);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Button
          variant={shelf ? "outline" : "primary"}
          fullWidth
          onClick={() => setSheet(true)}
        >
          {current ? (
            <>
              <Check className="size-4" />
              {current.label}
              <ChevronDown className="size-4" />
            </>
          ) : (
            <>
              <BookmarkPlus className="size-4" />
              افزودن به قفسه
            </>
          )}
        </Button>

        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setRateOpen(true)}>
            <Star className="size-4" />
            امتیاز
          </Button>
          <Button variant="outline" fullWidth onClick={() => setReviewOpen(true)}>
            <PenLine className="size-4" />
            نقد بنویسید
          </Button>
        </div>
      </div>

      <Modal open={sheet} onClose={() => setSheet(false)} title="افزودن به قفسه" size="sm">
        <div className="flex flex-col gap-1">
          {shelfOptions.map((o) => {
            const Icon = o.icon;
            const active = shelf === o.key;
            return (
              <button
                key={o.key}
                onClick={() => pickShelf(o.key, o.label)}
                className={`flex items-center gap-3 rounded-md px-3 py-3 text-right text-body transition hover:bg-background ${
                  active ? "bg-primary-soft text-primary" : ""
                }`}
              >
                <Icon className="size-5" />
                <span className="flex-1">{o.label}</span>
                {active && <Check className="size-5" />}
              </button>
            );
          })}
        </div>
      </Modal>

      <Modal
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        title="به این کتاب امتیاز دهید"
        size="sm"
        footer={
          <Button fullWidth disabled={rating === 0} onClick={submitRating}>
            ثبت امتیاز
          </Button>
        }
      >
        <div className="flex flex-col items-center gap-4 py-2">
          <p className="text-body-sm text-muted">{book.title}</p>
          <RatingInput value={rating} onChange={setRating} size={40} />
        </div>
      </Modal>

      <Modal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title="نقد شما"
        footer={
          <Button fullWidth disabled={!reviewText.trim()} onClick={submitReview}>
            انتشار نقد
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-body-sm text-muted">امتیاز شما:</span>
            <RatingInput value={reviewRating} onChange={setReviewRating} size={28} />
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={6}
            placeholder="نظرتان درباره‌ی این کتاب چیست؟ چه چیزی را دوست داشتید؟"
            className="w-full resize-none rounded-md border border-border bg-background p-3 text-body-sm leading-7 focus:border-primary focus:outline-none"
          />
        </div>
      </Modal>
    </>
  );
}
