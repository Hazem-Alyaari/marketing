import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

/** Supported marketing locales — reuses the i18n routing union (no duplicated locale union). */
export type SiteLocale = Locale;

export type LocaleDirection = "rtl" | "ltr";

function readPublicEnv(key: `NEXT_PUBLIC_${string}`): string {
  const value = process.env[key];
  if (!value) {
    return "";
  }
  return value.trim();
}

/**
 * Normalize public URLs:
 * - trim whitespace
 * - strip a single trailing slash
 * - return "" when missing (never invent localhost or a production domain)
 */
function normalizePublicUrl(key: `NEXT_PUBLIC_${string}`): string {
  const value = readPublicEnv(key);
  if (!value) {
    return "";
  }
  return value.replace(/\/+$/, "");
}

const localeNames = {
  ar: "العربية",
  en: "English",
} as const satisfies Record<SiteLocale, string>;

const localeDirections = {
  ar: "rtl",
  en: "ltr",
} as const satisfies Record<SiteLocale, LocaleDirection>;

const defaultDescription =
  "MySchool is a multi-tenant school management platform that unifies admissions, academics, finance, HR, academic supervision, and family communication.";

/**
 * Central site configuration for the MySchool marketing website.
 * Safe for Server Components and metadata generation.
 * Unknown business values stay empty; URLs come from NEXT_PUBLIC_* env vars only.
 *
 * URL roles (keep distinct — do not conflate):
 * - siteUrl: marketing website
 * - appUrl: normal MySchool application / login (when applicable)
 * - demoUrl: public demo environment (free exploration; not a subscription claim).
 *   User-facing CTAs open the marketing `/demo` launch page, which then enters demoUrl.
 *
 * TODO(security): production marketing should eventually use a proper HTTPS demo
 * domain (conceptually https://demo.<production-domain>). Do not invent or
 * auto-upgrade the current HTTP/IP demo URL until a real HTTPS domain exists.
 */
export const siteConfig = {
  /** Canonical English product name (repo, package, technical refs). */
  name: "MySchool",
  shortName: "MySchool",
  /** Display name shown in the UI per locale. */
  localizedNames: {
    ar: "مدرستي",
    en: "MySchool",
  } as const satisfies Record<SiteLocale, string>,
  description: defaultDescription,

  siteUrl: normalizePublicUrl("NEXT_PUBLIC_SITE_URL"),
  appUrl: normalizePublicUrl("NEXT_PUBLIC_APP_URL"),
  /** Public demo entry. Empty when NEXT_PUBLIC_DEMO_URL is unset — never invent a fallback. */
  demoUrl: normalizePublicUrl("NEXT_PUBLIC_DEMO_URL"),

  defaultLocale: routing.defaultLocale as SiteLocale,
  locales: routing.locales,
  localeNames,
  localeDirections,

  contact: {
    email: readPublicEnv("NEXT_PUBLIC_CONTACT_EMAIL") || "alyaarihazem@gmail.com",
    phone: readPublicEnv("NEXT_PUBLIC_CONTACT_PHONE") || "+967 776 137 120",
    /** Opens WhatsApp chat — digits only in wa.me path. */
    whatsapp:
      normalizePublicUrl("NEXT_PUBLIC_WHATSAPP_URL") ||
      "https://wa.me/967776137120",
  },

  company: {
    legalName: "", // TODO: legal entity name when confirmed
    country: "", // TODO
    city: "", // TODO
    address: "", // TODO
  },

  social: {
    facebook: "", // TODO
    x: "", // TODO
    linkedin: "", // TODO
    instagram: "", // TODO
    youtube: "", // TODO
    github: "", // TODO
  },

  seo: {
    defaultTitle: "MySchool",
    titleTemplate: "%s | MySchool",
    defaultDescription,
    keywords: [
      "school management system",
      "school management software",
      "school management system demo",
      "school ERP",
      "student management",
      "attendance management",
      "school accounting",
      "education management",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Brand label for the active locale (Arabic UI uses «مدرستي»). */
export function getBrandName(locale: string): string {
  if (locale === "ar") {
    return siteConfig.localizedNames.ar;
  }
  return siteConfig.localizedNames.en;
}
