import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { articlePath, formatArticleDate } from "@/lib/blog";
import { blogHref } from "@/lib/blog-href";
import {
  resolveArticleImageDimensions,
  resolveArticleImageSrc,
} from "@/lib/blog-metadata";
import { getBlogCategory } from "@/data/blog/categories";
import type { ArticleCardData } from "@/types/blog";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  article: ArticleCardData;
  locale: Locale;
  featured?: boolean;
};

export async function ArticleCard({
  article,
  locale,
  featured = false,
}: ArticleCardProps) {
  const t = await getTranslations("Blog");
  const category = getBlogCategory(article.category);
  const href = articlePath(article.slug);

  return (
    <article
      className={cn(
        "group flex h-full flex-col",
        featured && "lg:grid lg:grid-cols-2 lg:items-center lg:gap-8",
      )}
    >
      {article.image ? (
        <Link
          href={href}
          className="relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted"
        >
          <Image
            src={resolveArticleImageSrc(article.image)}
            alt={article.image.alt}
            width={resolveArticleImageDimensions(article.image).width}
            height={resolveArticleImageDimensions(article.image).height}
            className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            priority={featured}
          />
        </Link>
      ) : null}

      <div
        className={cn(
          "flex flex-1 flex-col",
          article.image && "mt-4",
          featured && article.image && "lg:mt-0",
        )}
      >
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
            {formatArticleDate(article.publishedAt, locale)}
          </time>
          <span>
            {t("readingTime", { minutes: article.readingTimeMinutes })}
          </span>
        </div>
        <h3
          className={cn(
            "mt-2 text-balance font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary",
            featured ? "text-xl sm:text-2xl" : "text-lg",
          )}
        >
          <Link href={href}>{article.title}</Link>
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {article.excerpt}
        </p>
        <Link
          href={href}
          className="mt-3 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {t("readArticle")}
        </Link>
      </div>
    </article>
  );
}
