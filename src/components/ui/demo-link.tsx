import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

/**
 * Centralized public-demo CTA.
 * - Uses siteConfig.demoUrl only (never invents a URL)
 * - Renders nothing when demoUrl is empty (no broken href)
 * - Opens externally in a new tab; ready for a future analytics hook via data-cta
 */
export type DemoLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
> & {
  children: ReactNode;
  /** Visual style shared with Button. Omit for unstyled / custom className-only. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  showIcon?: boolean;
  /** Stable id for future analytics (no tracking installed yet). */
  ctaId?: string;
};

export function hasDemoUrl(): boolean {
  return Boolean(siteConfig.demoUrl.trim());
}

export function getDemoUrl(): string {
  return siteConfig.demoUrl.trim();
}

export function DemoLink({
  children,
  className,
  variant,
  size = "md",
  showIcon = false,
  ctaId = "try-demo",
  onClick,
  ...props
}: DemoLinkProps) {
  const href = getDemoUrl();
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={ctaId}
      data-cta-destination="demo"
      className={
        variant
          ? buttonClassName({ variant, size, className })
          : cn(className)
      }
      onClick={onClick}
      {...props}
    >
      {children}
      {showIcon ? <ExternalLink className="size-4 shrink-0 opacity-80" aria-hidden /> : null}
    </a>
  );
}
