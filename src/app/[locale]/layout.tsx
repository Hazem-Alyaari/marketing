import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { routing } from "@/i18n/routing";
import { getLocaleDirection } from "@/lib/constants";
import { fontCssVariables, fontSansAr, fontSansEn } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const tCommon = await getTranslations("Common");
  const direction = getLocaleDirection(locale);
  const fontVariable =
    locale === "ar" ? fontCssVariables.arabic : fontCssVariables.english;

  return (
    <html
      lang={locale}
      dir={direction}
      className={cn(
        "h-full antialiased",
        fontSansAr.variable,
        fontSansEn.variable,
      )}
    >
      <body
        className="flex min-h-full flex-col bg-background text-foreground"
        style={{ fontFamily: `var(${fontVariable})` }}
      >
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius)] focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
          >
            {tCommon("skipToContent")}
          </a>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
