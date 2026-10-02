"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <span className="flex size-24 items-center justify-center rounded-full bg-danger-soft text-danger">
        <AlertTriangle className="size-12" strokeWidth={1.5} />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-h1 font-bold">مشکلی پیش آمد</h2>
        <p className="max-w-md text-body text-muted">
          متأسفیم، در بارگذاری این صفحه خطایی رخ داد. لطفاً دوباره تلاش کنید.
        </p>
      </div>
      <button
        onClick={reset}
        className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-body-sm font-bold text-white transition hover:bg-primary-hover"
      >
        <RotateCw className="size-4" />
        تلاش دوباره
      </button>
    </div>
  );
}
