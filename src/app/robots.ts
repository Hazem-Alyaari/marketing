import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: base ? `${base}/sitemap.xml` : undefined,
    host: base || undefined,
  };
}
