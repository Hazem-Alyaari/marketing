import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBrandName } from "@/config/site";
import { cn } from "@/lib/utils";

type SiteWordmarkProps = {
  className?: string;
};

/**
 * Typography-only brand wordmark — no invented logo asset.
 * Arabic locales show «مدرستي»; English shows «MySchool».
 */
export async function SiteWordmark({ className }: SiteWordmarkProps) {
  const locale = await getLocale();
  const brand = getBrandName(locale);
  const mark = locale === "ar" ? "م" : "MS";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <span
        aria-hidden
        className="flex size-8 shrink-0 items-center justify-center rounded-[0.55rem] bg-primary text-[0.7rem] font-bold tracking-tight text-primary-foreground shadow-[var(--shadow-sm)] transition-colors group-hover:bg-primary-hover"
      >
        {mark}
      </span>
      <span className="text-[0.95rem] font-semibold tracking-tight text-foreground">
        {brand}
      </span>
    </Link>
  );
}
