import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  PricingAfterYearSection,
  PricingComparisonSection,
  PricingCtaSection,
  PricingDemoSection,
  PricingFaqPreviewSection,
  PricingFirstYearSection,
  PricingHero,
  PricingSupportSection,
} from "@/components/pricing";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { buildLocalePath } from "@/config/seo";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricing" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/pricing",
  });
}

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("Navigation");
  const typedLocale = locale as Locale;

  return (
    <main id="main-content">
      <BreadcrumbJsonLd
        items={[
          {
            name: tNav("home"),
            path: buildLocalePath(typedLocale, "/"),
          },
          {
            name: tNav("pricing"),
            path: buildLocalePath(typedLocale, "/pricing"),
          },
        ]}
      />

      <PricingHero />
      <PricingFirstYearSection />
      <PricingComparisonSection />
      <PricingSupportSection />
      <PricingAfterYearSection />
      <PricingDemoSection />
      <PricingFaqPreviewSection />
      <PricingCtaSection />
    </main>
  );
}
