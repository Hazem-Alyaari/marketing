"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArticleCard } from "@/components/blog/article-card";
import { BlogCategoriesNav } from "@/components/blog/blog-categories-nav";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { parseBlogCategoryParam } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import type { ArticleCardData, BlogCategoryId } from "@/types/blog";

type BlogIndexContentProps = {
  locale: Locale;
  articles: readonly ArticleCardData[];
  featured: ArticleCardData | null;
  availableCategories: readonly BlogCategoryId[];
};

function BlogIndexInner({
  locale,
  articles,
  featured,
  availableCategories,
}: BlogIndexContentProps) {
  const t = useTranslations("Blog");
  const searchParams = useSearchParams();
  const category = parseBlogCategoryParam(searchParams.get("category") ?? undefined);

  const activeFeatured = category ? null : featured;

  const list = useMemo(() => {
    return articles.filter((article) => {
      if (category && article.category !== category) {
        return false;
      }
      if (activeFeatured && article.id === activeFeatured.id) {
        return false;
      }
      return true;
    });
  }, [articles, category, activeFeatured]);

  return (
    <>
      {activeFeatured ? (
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
                  article={activeFeatured}
                  locale={locale}
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

      <section aria-labelledby="blog-latest-heading" className="section-pad">
        <Container>
          <Reveal>
            <h2
              id="blog-latest-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              {category ? t("filteredHeading") : t("latestHeading")}
            </h2>
            {list.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">{t("empty")}</p>
            ) : (
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((article, index) => (
                  <li key={article.id}>
                    <Reveal delay={0.04 * index}>
                      <ArticleCard article={article} locale={locale} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </Container>
      </section>
    </>
  );
}

export function BlogIndexContent(props: BlogIndexContentProps) {
  return (
    <Suspense fallback={null}>
      <BlogIndexInner {...props} />
    </Suspense>
  );
}
