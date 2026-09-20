import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ContactPageContent } from "@/components/contact/contact-page-content";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content">
      <ContactPageContent />
    </main>
  );
}
