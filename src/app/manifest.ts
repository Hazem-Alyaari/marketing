import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description || undefined,
    start_url: `/${siteConfig.defaultLocale}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#171717",
    lang: siteConfig.defaultLocale,
  };
}
