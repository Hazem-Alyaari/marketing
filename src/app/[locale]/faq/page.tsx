import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  FaqCategoriesSection,
  FaqCtaSection,
  FaqHero,
} from "@/components/faq";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqPageJsonLd } from "@/components/seo/faq-page-json-ld";
import { faqItems } from "@/data/faq";
import { buildLocalePath } from "@/config/seo";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/faq",
  });
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Faq");
  const tNav = await getTranslations("Navigation");
  const typedLocale = locale as Locale;

  const jsonLdItems = faqItems.map((item) => ({
    question: t(item.questionKey),
    answer: t(item.answerKey),
  }));

  return (
    <main id="main-content">
      <BreadcrumbJsonLd
        items={[
          {
            name: tNav("home"),
            path: buildLocalePath(typedLocale, "/"),
          },
          {
            name: tNav("faq"),
            path: buildLocalePath(typedLocale, "/faq"),
          },
        ]}
      />
      <FaqPageJsonLd items={jsonLdItems} />

      <FaqHero />
      <FaqCategoriesSection />
      <FaqCtaSection />
    </main>
  );
}
