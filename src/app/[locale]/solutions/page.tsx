import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  SolutionAudienceSection,
  SolutionsConnectionSection,
  SolutionsCtaSection,
  SolutionsHero,
  SolutionsJumpNav,
  SolutionsTrustSection,
} from "@/components/solutions";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { solutionAudiences } from "@/data/solutions";
import { buildLocalePath } from "@/config/seo";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/solutions",
  });
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Solutions");
  const tNav = await getTranslations("Navigation");
  const typedLocale = locale as Locale;

  const jumpLabels = Object.fromEntries(
    solutionAudiences.map((audience) => [audience.id, t(audience.shortKey)]),
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
            name: tNav("solutions"),
            path: buildLocalePath(typedLocale, "/solutions"),
          },
        ]}
      />

      <SolutionsHero locale={locale} />
      <SolutionsJumpNav labels={jumpLabels} ariaLabel={t("navLabel")} />

      {solutionAudiences.map((audience, index) => (
        <SolutionAudienceSection
          key={audience.id}
          audience={audience}
          index={index}
        />
      ))}

      <SolutionsConnectionSection />
      <SolutionsTrustSection />
      <SolutionsCtaSection />
    </main>
  );
}
