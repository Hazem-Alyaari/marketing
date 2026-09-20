import { Inter, Noto_Sans_Arabic } from "next/font/google";

/**
 * English UI font — modern, neutral SaaS typography.
 */
export const fontSansEn = Inter({
  subsets: ["latin"],
  variable: "--font-sans-en",
  display: "swap",
});

/**
 * Arabic UI font — high-quality Noto Sans Arabic for headings and body.
 */
export const fontSansAr = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans-ar",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** CSS variable names applied by next/font (for locale-aware font-family). */
export const fontCssVariables = {
  arabic: "--font-sans-ar",
  english: "--font-sans-en",
} as const;
