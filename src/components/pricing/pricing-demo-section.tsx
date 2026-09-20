import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { DemoLink, hasDemoUrl } from "@/components/ui/demo-link";
import { Reveal } from "@/components/ui/reveal";

export async function PricingDemoSection() {
  if (!hasDemoUrl()) {
    return null;
  }

  const t = await getTranslations("Pricing");

  return (
    <section aria-labelledby="pricing-demo-heading" className="section-pad">
      <Container narrow>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-demo-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {t("demo.title")}
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("demo.description")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{t("demo.note")}</p>
          <DemoLink
            variant="primary"
            size="lg"
            showIcon
            ctaId="pricing-demo-try"
            className="mt-6"
          >
            {t("demo.cta")}
          </DemoLink>
        </Reveal>
      </Container>
    </section>
  );
}
