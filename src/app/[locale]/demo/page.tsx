import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DemoRedirect } from "@/components/demo/demo-redirect";
import { getDemoUrl, hasDemoUrl } from "@/components/ui/demo-link";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DemoPage" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/demo",
  });
}

export default async function DemoPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!hasDemoUrl()) {
    notFound();
  }

  return <DemoRedirect demoUrl={getDemoUrl()} />;
}
