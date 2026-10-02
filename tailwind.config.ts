import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ketabchi design tokens — Persian cultural palette
        primary: {
          // سبز ایرانی عمیق
          DEFAULT: "#285943",
          hover: "#1F4535",
          soft: "#E4EDE8",
          softer: "#F0F5F2",
        },
        secondary: {
          // طلایی تذهیب
          DEFAULT: "#C89B3C",
          hover: "#B0862D",
          soft: "#F6ECD4",
        },
        brown: {
          // قهوه‌ای جلد کتاب
          DEFAULT: "#8B5E3C",
          hover: "#744D30",
          soft: "#EFE4D9",
        },
        tech: {
          // آبی عمیق — AI / Technology
          DEFAULT: "#2457A6",
          hover: "#1D4786",
          soft: "#DFE8F4",
        },
        background: "#F7F3EA",
        surface: "#FFFFFF",
        ink: "#242321",
        muted: "#6F6A61",
        success: {
          DEFAULT: "#22A06B",
          soft: "#E3F5EC",
        },
        danger: {
          DEFAULT: "#C4452F",
          soft: "#F7E6E1",
        },
        border: "#E7E0D2",
      },
      fontFamily: {
        sans: ["Vazir", "Vazirmatn", "Tahoma", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(36,35,33,0.04), 0 4px 16px rgba(36,35,33,0.06)",
        soft: "0 1px 3px rgba(36,35,33,0.06)",
        pop: "0 8px 30px rgba(36,35,33,0.12)",
        sheet: "0 -8px 30px rgba(36,35,33,0.12)",
        // AI surfaces — deep night console + blue glow (used only for AI)
        console: "0 24px 70px -20px rgba(36,35,33,0.45)",
        glow: "0 0 0 1px rgba(74,127,212,0.25), 0 10px 40px -8px rgba(36,87,166,0.45)",
      },
      fontSize: {
        // Headings fluidly scale with the viewport (clamp) so large Persian
        // titles stay readable on 320px phones without wrapping heavily, then
        // reach their full size on desktop. Body sizes stay fixed.
        display: ["clamp(2.25rem, 1.3rem + 4.5vw, 3.25rem)", { lineHeight: "1.15", fontWeight: "800" }],
        h1: ["clamp(1.75rem, 1.25rem + 2.4vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "800" }],
        h2: ["clamp(1.375rem, 1.15rem + 1.1vw, 1.625rem)", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["clamp(1.125rem, 1.03rem + 0.45vw, 1.25rem)", { lineHeight: "1.4", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.8" }],
        body: ["1rem", { lineHeight: "1.8" }],
        "body-sm": ["0.875rem", { lineHeight: "1.7" }],
        caption: ["0.75rem", { lineHeight: "1.6" }],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(-100%)" },
        },
        // AI motion — one orchestrated reveal + soft ambient life
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "node-drift": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "step-in": {
          from: { opacity: "0", transform: "translateX(10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "bar-grow": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16,1,0.3,1)",
        "toast-in": "toast-in 0.25s ease-out",
        "reveal-up": "reveal-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "node-drift": "node-drift 4s ease-in-out infinite",
        "step-in": "step-in 0.35s ease-out both",
        "bar-grow": "bar-grow 0.9s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
