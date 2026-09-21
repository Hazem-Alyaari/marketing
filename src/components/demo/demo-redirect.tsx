"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

type DemoRedirectProps = {
  demoUrl: string;
};

/**
 * Static-host friendly launch into the public demo.
 * Users land on `/demo` on the marketing site; this opens the real environment.
 */
export function DemoRedirect({ demoUrl }: DemoRedirectProps) {
  const t = useTranslations("DemoPage");

  useEffect(() => {
    window.location.replace(demoUrl);
  }, [demoUrl]);

  return (
    <main id="main-content" className="mx-auto max-w-lg px-4 py-16 text-center">
      <meta httpEquiv="refresh" content={`0;url=${demoUrl}`} />
      <h1 className="text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t("description")}
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        <a
          href={demoUrl}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {t("continue")}
        </a>
      </p>
    </main>
  );
}
