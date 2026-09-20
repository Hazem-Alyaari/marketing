import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routes } from "@/config/navigation";
import { getLocaleDirection } from "@/lib/constants";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DemoLink } from "@/components/ui/demo-link";
import { Reveal } from "@/components/ui/reveal";

type FeaturesHeroProps = {
  locale: string;
};

export async function FeaturesHero({ locale }: FeaturesHeroProps) {
  const t = await getTranslations("Features");
  const direction = getLocaleDirection(locale);
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section
      aria-labelledby="features-hero-heading"
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
            id="features-hero-heading"
            className="mt-3 text-balance text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]"
          >
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            {t("hero.description")}
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
            <DemoLink
              variant="primary"
              size="lg"
              ctaId="features-hero-try-demo"
              className="w-full sm:w-auto"
            >
              {t("hero.primaryCta")}
            </DemoLink>
            <Link
              href={routes.home}
              className={buttonClassName({
                variant: "outline",
                size: "lg",
                className:
                  "w-full sm:w-auto [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5 rtl:hover:[&_svg]:-translate-x-0.5",
              })}
            >
              {t("hero.secondaryCta")}
              <Arrow className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
