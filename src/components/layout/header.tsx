import { getTranslations } from "next-intl/server";
import {
  actionNavigation,
  mainNavigation,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";
import { DemoLink } from "@/components/ui/demo-link";
import { SiteWordmark } from "@/components/ui/site-wordmark";
import { HeaderShell } from "@/components/layout/header-shell";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";

export async function Header() {
  const t = await getTranslations("Navigation");
  const loginHref = siteConfig.appUrl.trim();
  const canLogin = Boolean(loginHref);
  const shortKey =
    actionNavigation.tryDemo.shortLabelKey ?? actionNavigation.tryDemo.labelKey;

  return (
    <HeaderShell>
      <Container className="relative flex h-[var(--header-height)] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-7">
          <SiteWordmark />

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label={t("primary")}
          >
            {mainNavigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="relative rounded-[var(--radius)] px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:text-foreground after:absolute after:inset-x-2.5 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2.5 lg:flex">
          <LocaleSwitcher compact />
          {canLogin ? (
            <a
              href={loginHref}
              className={buttonClassName({
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground",
              })}
            >
              {t(actionNavigation.login.labelKey)}
            </a>
          ) : null}
          <DemoLink variant="primary" size="sm" ctaId="header-try-demo">
            {t(shortKey)}
          </DemoLink>
        </div>

        <MobileNav />
      </Container>
    </HeaderShell>
  );
}
