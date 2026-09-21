import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArticleBody,
  ArticleProductCta,
  ArticleToc,
} from "@/components/blog";
import { ArticleCard } from "@/components/blog/article-card";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Link, redirect } from "@/i18n/navigation";
import { getBlogCategory } from "@/data/blog/categories";
import { buildLocalePath } from "@/config/seo";
import { routes } from "@/config/navigation";
import { buttonClassName } from "@/components/ui/button";
import { DemoLink } from "@/components/ui/demo-link";
import {
  articlePath,
  extractToc,
  formatArticleDate,
  getArticleBySlug,
  getArticleBySlugAnyLocale,
  getLocaleCounterpart,
  getRelatedArticles,
  toArticleCard,
} from "@/lib/blog";
import { blogHref } from "@/lib/blog-href";
import {
  buildArticleMetadata,
  resolveArticleImageDimensions,
  resolveArticleImageSrc,
} from "@/lib/blog-metadata";
import type { Locale } from "@/i18n/routing";
import { allArticles } from "@/content/blog";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * Canonical locale+slug pairs, plus cross-locale slug aliases so a language
 * switch that keeps the wrong slug can still redirect on static hosts.
 */
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const seen = new Set<string>();

  const push = (locale: string, slug: string) => {
    const key = `${locale}:${slug}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    params.push({ locale, slug });
  };

  for (const article of allArticles) {
    if (article.draft) {
      continue;
    }
    push(article.locale, article.slug);
    const counterpart = getLocaleCounterpart(article);
    if (counterpart) {
      push(counterpart.locale, article.slug);
    }
  }

  return params;
}

function resolveBlogArticle(locale: Locale, slug: string) {
  const article = getArticleBySlug(locale, slug);
  if (article) {
    return { article, redirectTo: null as string | null };
  }

  const source = getArticleBySlugAnyLocale(slug);
  if (!source) {
    return { article: null, redirectTo: null as string | null };
  }

  const counterpart = getLocaleCounterpart(source);
  if (counterpart && counterpart.locale === locale) {
    return { article: null, redirectTo: articlePath(counterpart.slug) };
  }

  return { article: null, redirectTo: null as string | null };
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const { article, redirectTo } = resolveBlogArticle(typedLocale, slug);

  if (redirectTo) {
    return {};
  }
  if (!article) {
    return {};
  }
  const counterpart = getLocaleCounterpart(article);
  return buildArticleMetadata(article, counterpart);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const { article, redirectTo } = resolveBlogArticle(typedLocale, slug);

  if (redirectTo) {
    redirect({ href: redirectTo, locale: typedLocale });
  }
  if (!article) {
    notFound();
  }

  const t = await getTranslations("Blog");
  const tNav = await getTranslations("Navigation");
  const category = getBlogCategory(article.category);
  const toc = extractToc(article.body);
  const related = getRelatedArticles(article);
  const counterpart = getLocaleCounterpart(article);

  const ctaAfterIndex = (() => {
    let h2Count = 0;
    for (let i = 0; i < article.body.length; i += 1) {
      const block = article.body[i];
      if (block?.type === "h2") {
        h2Count += 1;
        if (h2Count === 3) {
          return i;
        }
      }
    }
    return Math.min(Math.floor(article.body.length * 0.45), article.body.length);
  })();

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
          {
            name: article.title,
            path: buildLocalePath(typedLocale, articlePath(article.slug)),
          },
        ]}
      />
      <ArticleJsonLd article={article} />

      <article>
        <header className="border-b border-border">
          <Container className="max-w-[48rem] py-10 sm:py-12">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {category ? (
                  <Link
                    href={blogHref(article.category)}
                    className="font-medium text-primary hover:underline"
                  >
                    {t(category.labelKey)}
                  </Link>
                ) : null}
                <time dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt, typedLocale)}
                </time>
                {article.updatedAt &&
                article.updatedAt !== article.publishedAt ? (
                  <span>
                    {t("updated", {
                      date: formatArticleDate(article.updatedAt, typedLocale),
                    })}
                  </span>
                ) : null}
                <span>
                  {t("readingTime", { minutes: article.readingTimeMinutes })}
                </span>
              </div>

              <h1 className="mt-4 text-balance text-[1.75rem] font-semibold leading-[1.25] tracking-tight text-foreground sm:text-4xl">
                {article.title}
              </h1>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {article.description}
              </p>

              {counterpart ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  {t("alsoAvailable")}{" "}
                  <Link
                    href={articlePath(counterpart.slug)}
                    locale={counterpart.locale}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {counterpart.locale === "ar" ? "العربية" : "English"}
                  </Link>
                </p>
              ) : null}
            </Reveal>
          </Container>
        </header>

        {article.image ? (
          <Container className="max-w-[52rem] pt-8">
            <Reveal>
              <figure className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted">
                <Image
                  src={resolveArticleImageSrc(article.image)}
                  alt={article.image.alt}
                  width={resolveArticleImageDimensions(article.image).width}
                  height={resolveArticleImageDimensions(article.image).height}
                  className="w-full object-cover object-top"
                  sizes="(max-width: 896px) 100vw, 832px"
                  priority
                />
                <figcaption className="border-t border-border px-4 py-2.5 text-sm text-muted-foreground">
                  {article.image.alt}
                </figcaption>
              </figure>
            </Reveal>
          </Container>
        ) : null}

        <Container className="max-w-[48rem] py-10 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
            <div>
              <Reveal className="mb-8 lg:hidden">
                <ArticleToc items={toc} label={t("toc")} />
              </Reveal>

              <Reveal>
                <ArticleBody body={article.body.slice(0, ctaAfterIndex)} />
              </Reveal>

              <Reveal>
                <ArticleProductCta />
              </Reveal>

              <Reveal>
                <ArticleBody body={article.body.slice(ctaAfterIndex)} />
              </Reveal>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ArticleToc items={toc} label={t("toc")} />
              </div>
            </aside>
          </div>

          <Reveal className="mt-12 border-t border-border pt-10">
            <div className="rounded-[var(--radius-lg)] border border-border bg-muted/40 px-5 py-6 sm:px-6">
              <h2 className="text-lg font-semibold text-foreground">
                {t("finalCta.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("finalCta.description")}
              </p>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <DemoLink
                  variant="primary"
                  size="md"
                  ctaId="article-final-demo"
                  className="w-full sm:w-auto"
                >
                  {t("finalCta.demo")}
                </DemoLink>
                <Link
                  href={routes.contact}
                  className={buttonClassName({
                    variant: "outline",
                    size: "md",
                    className: "w-full sm:w-auto",
                  })}
                >
                  {t("finalCta.contact")}
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>

        {related.length > 0 ? (
          <section
            aria-labelledby="related-articles-heading"
            className="border-t border-border bg-muted/40 section-pad"
          >
            <Container>
              <h2
                id="related-articles-heading"
                className="text-2xl font-semibold tracking-tight text-foreground"
              >
                {t("related")}
              </h2>
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.id}>
                    <ArticleCard
                      article={toArticleCard(item)}
                      locale={typedLocale}
                    />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}
      </article>
    </main>
  );
}
