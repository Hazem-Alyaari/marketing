"use client";

import { useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export function LocaleSwitcher({
  className,
  compact = false,
}: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const selectId = useId();

  return (
    <div className={cn("inline-flex items-center", className)}>
      <label className="sr-only" htmlFor={selectId}>
        {t("label")}
      </label>
      <select
        id={selectId}
        className={cn(
          "rounded-[var(--radius)] border border-border bg-transparent text-sm text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          compact ? "px-2 py-1.5" : "px-2.5 py-2",
        )}
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          router.replace(pathname, { locale: nextLocale });
        }}
        aria-label={t("label")}
      >
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {t(item)}
          </option>
        ))}
      </select>
    </div>
  );
}
