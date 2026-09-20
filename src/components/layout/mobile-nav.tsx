"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  actionNavigation,
  mainNavigation,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button, buttonClassName } from "@/components/ui/button";
import { DemoLink } from "@/components/ui/demo-link";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navigation");
  const panelId = useId();
  const loginHref = siteConfig.appUrl.trim();
  const canLogin = Boolean(loginHref);
  const shortKey =
    actionNavigation.tryDemo.shortLabelKey ?? actionNavigation.tryDemo.labelKey;

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? t("closeMenu") : t("openMenu")}
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={t("mobile")}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full z-50 max-h-[min(100dvh-var(--header-height),32rem)] overflow-y-auto border-b border-border bg-background shadow-[var(--shadow-md)]"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label={t("mobile")}>
              {mainNavigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="rounded-[var(--radius)] px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  onClick={close}
                >
                  {t(item.labelKey)}
                </Link>
              ))}

              <div className="my-2 border-t border-border" />

              <div className="flex flex-col gap-2 px-1 pb-1">
                <LocaleSwitcher />
                {canLogin ? (
                  <a
                    href={loginHref}
                    className={buttonClassName({ variant: "ghost", className: "justify-start px-3" })}
                    onClick={close}
                  >
                    {t(actionNavigation.login.labelKey)}
                  </a>
                ) : null}
                <DemoLink
                  variant="primary"
                  ctaId="mobile-try-demo"
                  onClick={close}
                >
                  {t(shortKey)}
                </DemoLink>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
