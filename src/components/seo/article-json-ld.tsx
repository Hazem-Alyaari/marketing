import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
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
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    image: image ? `${base}${resolveArticleImageSrc(image)}` : undefined,
  };

  return <JsonLd data={data} />;
}
