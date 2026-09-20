import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export async function BlogHero() {
  const t = await getTranslations("Blog");

  return (
    <section
      aria-labelledby="blog-hero-heading"
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
            id="blog-hero-heading"
            className="mt-3 text-balance text-[1.85rem] font-semibold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]"
          >
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            {t("hero.description")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
