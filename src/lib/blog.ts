import type { Locale } from "@/i18n/routing";
import type {
  Article,
  ArticleCardData,
  BlogCategoryId,
  ContentBlock,
  TocItem,
} from "@/types/blog";
import { isBlogCategoryId } from "@/data/blog/categories";
import { allArticles } from "@/content/blog";

function allowDraftsInDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isArticlePublished(article: Article): boolean {
  if (!article.draft) {
    return true;
  }
  return allowDraftsInDev();
}

export function getArticlesForLocale(
  locale: Locale,
  options?: { includeDrafts?: boolean },
): Article[] {
  const includeDrafts = options?.includeDrafts ?? allowDraftsInDev();
  return allArticles
    .filter((article) => article.locale === locale)
    .filter((article) => (includeDrafts ? true : !article.draft))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPublishedArticles(locale: Locale): Article[] {
  return getArticlesForLocale(locale, { includeDrafts: false });
}

export function getArticleBySlug(
  locale: Locale,
  slug: string,
): Article | undefined {
  const article = allArticles.find(
    (item) => item.locale === locale && item.slug === slug,
  );
  if (!article) {
    return undefined;
  }
  if (article.draft && !allowDraftsInDev()) {
    return undefined;
  }
  return article;
}

export function getArticleById(id: string): Article | undefined {
  return allArticles.find((article) => article.id === id);
}

export function getLocaleCounterpart(article: Article): Article | undefined {
  return allArticles.find(
    (item) =>
      item.translationId === article.translationId &&
      item.locale !== article.locale &&
      !item.draft,
  );
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const related = article.relatedIds
    .map((id) => getArticleById(id))
    .filter((item): item is Article => Boolean(item))
    .filter((item) => item.locale === article.locale)
    .filter((item) => !item.draft || allowDraftsInDev());

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = getPublishedArticles(article.locale).filter(
    (item) =>
      item.id !== article.id &&
      !related.some((r) => r.id === item.id) &&
      item.category === article.category,
  );

  return [...related, ...fallback].slice(0, limit);
}

export function getFeaturedArticle(locale: Locale): Article | undefined {
  const published = getPublishedArticles(locale);
  return published.find((article) => article.featured) ?? published[0];
}

export function getArticlesByCategory(
  locale: Locale,
  category: BlogCategoryId,
): Article[] {
  return getPublishedArticles(locale).filter(
    (article) => article.category === category,
  );
}

export function parseBlogCategoryParam(
  value: string | string[] | undefined,
): BlogCategoryId | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !isBlogCategoryId(raw)) {
    return undefined;
  }
  return raw;
}

export function toArticleCard(article: Article): ArticleCardData {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    description: article.description,
    excerpt: article.excerpt,
    category: article.category,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    readingTimeMinutes: article.readingTimeMinutes,
    image: article.image,
    featured: article.featured,
    translationId: article.translationId,
  };
}

export function extractToc(body: readonly ContentBlock[]): TocItem[] {
  const items: TocItem[] = [];
  for (const block of body) {
    if (block.type === "h2") {
      items.push({ id: block.id, text: block.text, level: 2 });
    } else if (block.type === "h3") {
      items.push({ id: block.id, text: block.text, level: 3 });
    }
  }
  return items;
}

export function extractPlainText(body: readonly ContentBlock[]): string {
  const parts: string[] = [];
  for (const block of body) {
    switch (block.type) {
      case "p":
      case "callout":
        parts.push(block.children.map((node) => node.value).join(""));
        break;
      case "h2":
      case "h3":
      case "quote":
        parts.push(block.text);
        break;
      case "ul":
      case "ol":
        parts.push(...block.items);
        break;
      default:
        break;
    }
  }
  return parts.join(" ");
}

export function getAllPublishedSitemapArticles(): Article[] {
  return allArticles
    .filter((article) => !article.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function articlePath(slug: string): string {
  return `/blog/${slug}`;
}

export function formatArticleDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
