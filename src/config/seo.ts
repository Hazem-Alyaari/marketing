import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export const defaultOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: siteConfig.name,
  locale: siteConfig.defaultLocale,
};

export const defaultTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
};

export function getSiteUrl(): string {
  return siteConfig.siteUrl.replace(/\/$/, "");
}

export function buildLocalePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function buildCanonicalUrl(locale: Locale, path = ""): string | undefined {
  const base = getSiteUrl();
  if (!base) {
    return undefined;
  }
  return `${base}${buildLocalePath(locale, path)}`;
}

export function buildLanguageAlternates(
  path = "",
): Record<string, string> | undefined {
  const base = getSiteUrl();
  if (!base) {
    return undefined;
  }

  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${base}${buildLocalePath(locale, path)}`;
  }
  languages["x-default"] = `${base}${buildLocalePath(routing.defaultLocale, path)}`;
  return languages;
}
