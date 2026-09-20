import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  FeatureConnectionSection,
  FeatureGroupSection,
  FeatureRolesSection,
  FeaturesCtaSection,
  FeaturesHero,
  FeaturesJumpNav,
} from "@/components/features";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { featureGroups } from "@/data/features";
import { buildLocalePath } from "@/config/seo";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Features" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/features",
  });
}

export default async function FeaturesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Features");
  const tNav = await getTranslations("Navigation");
  const typedLocale = locale as Locale;

  const jumpLabels = Object.fromEntries(
    featureGroups.map((group) => [group.id, t(group.shortKey)]),
  );

  return (
    <main id="main-content">
      <BreadcrumbJsonLd
        items={[
          {
            name: tNav("home"),
            path: buildLocalePath(typedLocale, "/"),
          },
          {
            name: tNav("features"),
            path: buildLocalePath(typedLocale, "/features"),
          },
        ]}
      />

      <FeaturesHero locale={locale} />
      <FeaturesJumpNav labels={jumpLabels} ariaLabel={t("navLabel")} />

      {featureGroups.map((group, index) => (
        <FeatureGroupSection key={group.id} group={group} index={index} />
      ))}

      <FeatureConnectionSection />
      <FeatureRolesSection />
      <FeaturesCtaSection />
    </main>
  );
}
