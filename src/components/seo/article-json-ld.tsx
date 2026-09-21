import { JsonLd } from "@/components/seo/json-ld";
import { getBrandName } from "@/config/site";
import { getSiteUrl } from "@/config/seo";
import { articlePath } from "@/lib/blog";
import {
  resolveArticleImageSrc,
} from "@/lib/blog-metadata";
import type { Article } from "@/types/blog";

type ArticleJsonLdProps = {
  article: Article;
};

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const base = getSiteUrl();
  if (!base) {
    return null;
  }

  const brand = getBrandName(article.locale);
  const url = `${base}/${article.locale}${articlePath(article.slug)}`;
  const image = article.ogImage ?? article.image;

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: article.locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: brand,
    },
    publisher: {
      "@type": "Organization",
      name: brand,
    },
    image: image ? `${base}${resolveArticleImageSrc(image)}` : undefined,
  };

  return <JsonLd data={data} />;
}
