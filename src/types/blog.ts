import type { AppRoute } from "@/config/navigation";
import type { Locale } from "@/i18n/routing";
import type { ProductScreenshotKey } from "@/lib/product-media";

export const BLOG_CATEGORIES = [
  "school-management",
  "students-academics",
  "attendance-assessment",
  "finance",
  "human-resources",
  "educational-supervision",
  "digital-transformation",
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number];

export type BlogCategory = {
  id: BlogCategoryId;
  labelKey: string;
  descriptionKey: string;
};

/** Inline rich-text nodes for paragraphs that need links. */
export type InlineNode =
  | { type: "text"; value: string }
  | {
      type: "internal";
      href: AppRoute;
      hash?: string;
      value: string;
    }
  | {
      type: "external";
      href: string;
      value: string;
    };

export type ContentBlock =
  | { type: "p"; children: readonly InlineNode[] }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "ol"; items: readonly string[] }
  | { type: "callout"; title?: string; children: readonly InlineNode[] }
  | { type: "quote"; text: string };

export type ArticleSeo = {
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  searchIntent: string;
};

export type ArticleImage = {
  /** Product screenshot key or absolute public path. */
  src: ProductScreenshotKey | `/images/${string}`;
  alt: string;
};

/**
 * Locale-specific article record.
 * Arabic and English counterparts share `translationId` when they cover the same topic.
 */
export type Article = {
  /** Stable id within a locale, e.g. `ar-school-management-system-guide`. */
  id: string;
  /** Shared across locale counterparts for hreflang pairing. */
  translationId: string;
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategoryId;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  image?: ArticleImage;
  ogImage?: ArticleImage;
  featured?: boolean;
  draft?: boolean;
  relatedIds: readonly string[];
  seo: ArticleSeo;
  body: readonly ContentBlock[];
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type ArticleCardData = Pick<
  Article,
  | "id"
  | "slug"
  | "title"
  | "description"
  | "excerpt"
  | "category"
  | "publishedAt"
  | "updatedAt"
  | "readingTimeMinutes"
  | "image"
  | "featured"
  | "translationId"
>;
