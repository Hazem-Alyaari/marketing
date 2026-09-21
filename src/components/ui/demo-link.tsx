import type { ComponentProps, ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

/**
 * Centralized public-demo CTA.
 * - Shown only when siteConfig.demoUrl is set (never invents a URL)
 * - Links to the branded marketing `/demo` launch page (not the raw demo host)
 * - Ready for a future analytics hook via data-cta
 */
export type DemoLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "locale"
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

/** Real demo environment URL (external). Prefer DemoLink / `/demo` for user-facing CTAs. */
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
  if (!hasDemoUrl()) {
    return null;
  }

  return (
    <Link
      href={routes.demo}
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
    </Link>
  );
}
