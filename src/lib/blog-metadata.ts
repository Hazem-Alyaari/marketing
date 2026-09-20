import type { Metadata } from "next";
import {
  buildCanonicalUrl,
  defaultOpenGraph,
  defaultTwitter,
  getSiteUrl,
} from "@/config/seo";
import { siteConfig } from "@/config/site";
import { articlePath } from "@/lib/blog";
import {
  productScreenshots,
  type ProductScreenshotKey,
} from "@/lib/product-media";
import type { Article, ArticleImage } from "@/types/blog";
import type { Locale } from "@/i18n/routing";
import { withBasePath } from "@/lib/utils";

function isProductScreenshotKey(
  value: ArticleImage["src"],
): value is ProductScreenshotKey {
  return value in productScreenshots;
}

export function resolveArticleImageSrc(image: ArticleImage): string {
  if (isProductScreenshotKey(image.src)) {
    return productScreenshots[image.src].src;
  }
  return withBasePath(image.src);
}

export function resolveArticleImageDimensions(image: ArticleImage): {
  width: number;
  height: number;
} {
  if (isProductScreenshotKey(image.src)) {
    const shot = productScreenshots[image.src];
    return { width: shot.width, height: shot.height };
  }
  return { width: 1200, height: 630 };
}

export function buildArticleMetadata(
  article: Article,
  counterpart?: Article,
): Metadata {
  const path = articlePath(article.slug);
  const canonical = buildCanonicalUrl(article.locale, path);
  const ogImage = article.ogImage ?? article.image;

  const languages: Record<string, string> = {};
  const base = getSiteUrl();
  if (base && canonical) {
    languages[article.locale] = canonical;
    if (counterpart) {
      const counterpartUrl = buildCanonicalUrl(
        counterpart.locale,
        articlePath(counterpart.slug),
      );
      if (counterpartUrl) {
        languages[counterpart.locale] = counterpartUrl;
      }
    }
  }

  const absoluteOgImage =
    base && ogImage
      ? `${base}${resolveArticleImageSrc(ogImage)}`
      : undefined;

  return {
    title: article.title,
    description: article.description,
    metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
    alternates: {
      canonical,
      languages: Object.keys(languages).length > 0 ? languages : undefined,
    },
    openGraph: {
      ...defaultOpenGraph,
      type: "article",
      title: article.title,
      description: article.description,
      locale: article.locale,
      url: canonical,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      images: absoluteOgImage
        ? [{ url: absoluteOgImage, alt: ogImage?.alt }]
        : undefined,
    },
    twitter: {
      ...defaultTwitter,
      title: article.title,
      description: article.description,
      images: absoluteOgImage ? [absoluteOgImage] : undefined,
    },
    robots: article.draft
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function buildBlogIndexMetadata(input: {
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  const canonical = buildCanonicalUrl(input.locale, "/blog");
  const base = getSiteUrl();
  const languages =
    base
      ? {
          ar: `${base}/ar/blog`,
          en: `${base}/en/blog`,
          "x-default": `${base}/ar/blog`,
        }
      : undefined;

  return {
    title: input.title,
    description: input.description,
    metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      ...defaultOpenGraph,
      title: input.title,
      description: input.description,
      locale: input.locale,
      url: canonical,
    },
    twitter: {
      ...defaultTwitter,
      title: input.title,
      description: input.description,
    },
    robots: { index: true, follow: true },
  };
}
