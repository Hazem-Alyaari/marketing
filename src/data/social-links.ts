import type { SocialLink } from "@/types/common";
import { siteConfig } from "@/config/site";

/**
 * Social links derived from site config.
 * Empty hrefs are filtered out so we never render invented URLs.
 */
export const socialLinks: SocialLink[] = (
  [
    { id: "x", labelKey: "x", href: siteConfig.social.x },
    { id: "linkedin", labelKey: "linkedin", href: siteConfig.social.linkedin },
    { id: "facebook", labelKey: "facebook", href: siteConfig.social.facebook },
    {
      id: "instagram",
      labelKey: "instagram",
      href: siteConfig.social.instagram,
    },
    { id: "youtube", labelKey: "youtube", href: siteConfig.social.youtube },
  ] as const
).filter((link) => Boolean(link.href));
