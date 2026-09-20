import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import { contactHref } from "@/lib/contact/href";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export async function PricingFirstYearSection() {
  const t = await getTranslations("Pricing");

  const points = [
    t("firstYear.points.real"),
    t("firstYear.points.adopt"),
    t("firstYear.points.support"),
  ] as const;

  return (
    <section
      aria-labelledby="pricing-first-year-heading"
      className="section-pad"
    >
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-primary/20 bg-[color-mix(in_srgb,var(--primary)_6%,var(--background))] px-6 py-10 shadow-[var(--shadow-sm)] sm:px-10 sm:py-12 lg:px-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--hero-glow),transparent_50%)]"
            />
            <div className="relative mx-auto max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {t("firstYear.eyebrow")}
              </p>
              <h2
                id="pricing-first-year-heading"
                className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.15rem]"
              >
                {t("firstYear.title")}
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("firstYear.description")}
              </p>

              <ul className="mt-8 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm sm:text-base">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-pretty text-foreground">{point}</span>
                  </li>
                ))}
              </ul>

              <aside className="mt-8 rounded-[var(--radius-lg)] border border-border/80 bg-background/70 px-5 py-5 sm:px-6">
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  {t("firstYear.why.title")}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  {t("firstYear.why.description")}
                </p>
              </aside>

              <div className="mt-8">
                <Link
                  href={contactHref("firstYear")}
                  className={buttonClassName({
                    variant: "primary",
                    size: "lg",
                  })}
                >
                  {t("firstYear.cta")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
