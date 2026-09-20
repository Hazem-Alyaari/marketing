import { JsonLd } from "@/components/seo/json-ld";
import { getSiteUrl } from "@/config/seo";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

/**
 * BreadcrumbList structured data.
 * Renders nothing useful without NEXT_PUBLIC_SITE_URL configured.
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const base = getSiteUrl();
  if (!base || items.length === 0) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };

  return <JsonLd data={data} />;
}
