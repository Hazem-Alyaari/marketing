import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArticleCard,
  BlogCategoriesNav,
  BlogHero,
  BlogPageCta,
} from "@/components/blog";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { buildLocalePath } from "@/config/seo";
import {
  getFeaturedArticle,
  getPublishedArticles,
  parseBlogCategoryParam,
  toArticleCard,
} from "@/lib/blog";
import { buildBlogIndexMetadata } from "@/lib/blog-metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
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

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const t = await getTranslations("Blog");
  const tNav = await getTranslations("Navigation");
  const category = parseBlogCategoryParam(query.category);

  const published = getPublishedArticles(typedLocale);
  const availableCategories = [
    ...new Set(published.map((article) => article.category)),
  ];

  const featured = category ? undefined : getFeaturedArticle(typedLocale);
  const list = published.filter((article) => {
    if (category && article.category !== category) {
      return false;
    }
    if (featured && article.id === featured.id) {
      return false;
    }
    return true;
  });

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

      {featured ? (
        <section
          aria-labelledby="blog-featured-heading"
          className="section-pad border-b border-border"
        >
          <Container>
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {t("featured")}
              </p>
              <h2 id="blog-featured-heading" className="sr-only">
                {t("featured")}
              </h2>
              <div className="mt-4">
                <ArticleCard
                  article={toArticleCard(featured)}
                  locale={typedLocale}
                  featured
                />
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <BlogCategoriesNav
        active={category}
        available={availableCategories}
      />

      <section
        aria-labelledby="blog-latest-heading"
        className="section-pad"
      >
        <Container>
          <Reveal>
            <h2
              id="blog-latest-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              {category ? t("filteredHeading") : t("latestHeading")}
            </h2>
            {list.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                {t("empty")}
              </p>
            ) : (
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((article, index) => (
                  <li key={article.id}>
                    <Reveal delay={0.04 * index}>
                      <ArticleCard
                        article={toArticleCard(article)}
                        locale={typedLocale}
                      />
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </Container>
      </section>

      <BlogPageCta />
    </main>
  );
}
