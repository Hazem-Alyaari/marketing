import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  ConnectedWorkflowSection,
  DemoExplainerSection,
  FinalCtaSection,
  HeroSection,
  ModulesSection,
  UsersSection,
  ValueSection,
} from "@/components/sections";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Meta" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: tMeta("title"),
    description: tMeta("description"),
    path: "",
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content">
      <HeroSection locale={locale} />
      <ValueSection />
      <ModulesSection />
      <ConnectedWorkflowSection />
      <UsersSection />
      <DemoExplainerSection />
      <FinalCtaSection />
    </main>
  );
}
