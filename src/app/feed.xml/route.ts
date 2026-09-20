import { getSiteUrl } from "@/config/seo";
import { siteConfig } from "@/config/site";
import {
  articlePath,
  extractPlainText,
  getAllPublishedSitemapArticles,
} from "@/lib/blog";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const base = getSiteUrl();
  if (!base) {
    return new Response("Site URL is not configured.", { status: 503 });
  }

  const articles = getAllPublishedSitemapArticles().slice(0, 50);
  const items = articles
    .map((article) => {
      const link = `${base}/${article.locale}${articlePath(article.slug)}`;
      const description = escapeXml(article.description);
      const title = escapeXml(article.title);
      const pubDate = new Date(article.publishedAt).toUTCString();
      const summary = escapeXml(extractPlainText(article.body).slice(0, 280));
      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <content:encoded><![CDATA[${summary}…]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} Blog</title>
    <link>${base}/ar/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ar</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
