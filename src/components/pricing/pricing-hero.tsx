import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { contactHref } from "@/lib/contact/href";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DemoLink } from "@/components/ui/demo-link";
import { Reveal } from "@/components/ui/reveal";

export async function PricingHero() {
  const t = await getTranslations("Pricing");

  return (
    <section
      aria-labelledby="pricing-hero-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_55%)]"
      />
      <Container className="relative py-12 sm:py-14 lg:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            {t("hero.eyebrow")}
          </p>
          <h1
            id="pricing-hero-heading"
            className="mt-3 text-balance text-[1.85rem] font-semibold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]"
          >
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            {t("hero.description")}
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
            <Link
              href={contactHref("firstYear")}
              className={buttonClassName({
                variant: "primary",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              {t("hero.primaryCta")}
            </Link>
            <DemoLink
              variant="outline"
              size="lg"
              ctaId="pricing-hero-demo"
              className="w-full sm:w-auto"
            >
              {t("hero.secondaryCta")}
            </DemoLink>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("hero.note")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
