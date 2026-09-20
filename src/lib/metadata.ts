import type { Metadata } from "next";
import {
  buildCanonicalUrl,
  buildLanguageAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/config/seo";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

type BuildPageMetadataInput = {
  locale: Locale;
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  locale,
  title,
  description = "",
  path = "",
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const canonical = buildCanonicalUrl(locale, path);
  const languages = buildLanguageAlternates(path);

  return {
    title,
    description: description || undefined,
    metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      ...defaultOpenGraph,
      title,
      description: description || undefined,
      locale,
      url: canonical,
    },
    twitter: {
      ...defaultTwitter,
      title,
      description: description || undefined,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}
