import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "کتابچی | جامعه‌ی کتاب‌خوان‌های ایرانی",
  description:
    "کتاب بعدی‌ات را پیدا کن؛ کتاب بخوان، نظر بده و با آدم‌هایی که مثل تو عاشق کتاب‌اند آشنا شو.",
};

// Without an explicit viewport, mobile browsers render the page at a ~980px
// desktop width — so the whole site looks like a shrunken desktop and no
// responsive breakpoints appear to apply. This makes it mobile-first.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="min-h-screen bg-background text-ink">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
