import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogHero, BlogPageCta } from "@/components/blog";
import { BlogIndexContent } from "@/components/blog/blog-index-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { buildLocalePath } from "@/config/seo";
import {
  getFeaturedArticle,
  getPublishedArticles,
  toArticleCard,
} from "@/lib/blog";
import { buildBlogIndexMetadata } from "@/lib/blog-metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return buildBlogIndexMetadata({
    locale: locale as Locale,
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const tNav = await getTranslations("Navigation");

  const published = getPublishedArticles(typedLocale);
  const availableCategories = [
    ...new Set(published.map((article) => article.category)),
  ];
  const featuredArticle = getFeaturedArticle(typedLocale);
  const articles = published.map(toArticleCard);
  const featured = featuredArticle ? toArticleCard(featuredArticle) : null;

  return (
    <main id="main-content">
      <BreadcrumbJsonLd
        items={[
          {
            name: tNav("home"),
            path: buildLocalePath(typedLocale, "/"),
          },
          {
            name: tNav("blog"),
            path: buildLocalePath(typedLocale, "/blog"),
          },
        ]}
      />

      <BlogHero />

      <BlogIndexContent
        locale={typedLocale}
        articles={articles}
        featured={featured}
        availableCategories={availableCategories}
      />

      <BlogPageCta />
    </main>
  );
}
