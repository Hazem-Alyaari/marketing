import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routes } from "@/config/navigation";
import { getLocaleDirection } from "@/lib/constants";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DemoLink } from "@/components/ui/demo-link";
import { ProductPreview } from "@/components/ui/product-preview";
import { Reveal } from "@/components/ui/reveal";

type HeroSectionProps = {
  locale: string;
};

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations("Hero");
  const direction = getLocaleDirection(locale);
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_50%)]"
      />
      <Container className="relative pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            {t("brand")}
          </p>
          <h1
            id="hero-heading"
            className="mt-3 text-balance text-[1.85rem] font-semibold leading-[1.2] tracking-tight text-foreground sm:text-4xl sm:leading-[1.15] lg:text-[2.75rem]"
          >
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            {t("description")}
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 sm:mt-7 sm:flex-row sm:items-center">
            <DemoLink
              variant="primary"
              size="lg"
              ctaId="hero-try-demo"
              className="w-full sm:w-auto"
            >
              {t("primaryCta")}
            </DemoLink>
            <Link
              href={routes.features}
              className={buttonClassName({
                variant: "outline",
                size: "lg",
                className:
                  "w-full sm:w-auto [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5 rtl:hover:[&_svg]:-translate-x-0.5",
              })}
            >
              {t("secondaryCta")}
              <Arrow className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-9 max-w-[70rem] sm:mt-10" delay={0.08}>
          <ProductPreview
            alt={t("previewAlt")}
            caption={t("previewCaption")}
          />
        </Reveal>
      </Container>
    </section>
  );
}
