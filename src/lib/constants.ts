import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export const APP_NAME = siteConfig.name;
export const DEFAULT_LOCALE = routing.defaultLocale;
export const SUPPORTED_LOCALES = routing.locales;

/** Direction helpers for locale-aware rendering. */
export function getLocaleDirection(locale: string): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
