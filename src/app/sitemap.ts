import type { MetadataRoute } from "next";
import { buildLocalePath, getSiteUrl } from "@/config/seo";
import { routing } from "@/i18n/routing";
import { articlePath, getAllPublishedSitemapArticles } from "@/lib/blog";

export const dynamic = "force-static";

const staticPaths = [
  "",
  "/features",
  "/solutions",
  "/pricing",
  "/about",
  "/contact",
  "/blog",
  "/faq",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  if (!base) {
    return [];
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${base}${buildLocalePath(locale, path)}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((item) => [
              item,
              `${base}${buildLocalePath(item, path)}`,
            ]),
          ),
        },
      });
    }
  }

  const articles = getAllPublishedSitemapArticles();
  for (const article of articles) {
    const lastModified = new Date(
      article.updatedAt ?? article.publishedAt,
    );
    entries.push({
      url: `${base}${buildLocalePath(article.locale, articlePath(article.slug))}`,
      lastModified,
    });
  }

  return entries;
}
