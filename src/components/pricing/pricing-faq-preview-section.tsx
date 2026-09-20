import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pricingFaqPreviewIds } from "@/data/pricing";
import { faqItems } from "@/data/faq";
import { routes } from "@/config/navigation";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function PricingFaqPreviewSection() {
  const t = await getTranslations("Pricing");

  const previewItems = pricingFaqPreviewIds
    .map((id) => faqItems.find((item) => item.id === id))
    .filter((item): item is (typeof faqItems)[number] => Boolean(item));

  if (previewItems.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="pricing-faq-heading"
      className="border-y border-border bg-muted/40 section-pad"
    >
      <Container className="max-w-[54rem]">
        <Reveal>
          <SectionHeading
            id="pricing-faq-heading"
            align="center"
            className="mx-auto"
            eyebrow={t("faqPreview.eyebrow")}
            title={t("faqPreview.title")}
            description={t("faqPreview.description")}
          />
        </Reveal>

        <Reveal className="mt-8" delay={0.06}>
          <FaqAccordion items={previewItems} />
        </Reveal>

        <Reveal className="mt-6 text-center">
          <Link
            href={routes.faq}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("faqPreview.more")}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
