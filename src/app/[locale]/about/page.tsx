import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AboutAudiencesSection,
  AboutCtaSection,
  AboutHero,
  AboutPrinciplesSection,
  AboutStructureSection,
  AboutTrustSection,
  AboutWhatSection,
  AboutWhySection,
} from "@/components/about";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { buildLocalePath } from "@/config/seo";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/about",
  });
}

export default async function AboutPage({ params }: PageProps) {
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
            name: tNav("about"),
            path: buildLocalePath(typedLocale, "/about"),
          },
        ]}
      />

      <AboutHero locale={locale} />
      <AboutWhatSection />
      <AboutWhySection />
      <AboutPrinciplesSection />
      <AboutAudiencesSection />
      <AboutStructureSection />
      <AboutTrustSection />
      <AboutCtaSection />
    </main>
  );
}
