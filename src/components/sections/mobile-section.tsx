import { getTranslations } from "next-intl/server";
import { Download, Monitor, Smartphone } from "lucide-react";
import {
  getAvailableAppDownloads,
  type AppPlatformId,
} from "@/config/downloads";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const platformIcons: Record<
  AppPlatformId,
  typeof Smartphone
> = {
  android: Smartphone,
  mac: Monitor,
};

export async function MobileSection() {
  const downloads = getAvailableAppDownloads();
  if (downloads.length === 0) {
    return null;
  }

  const t = await getTranslations("DownloadApp");

  return (
    <section
      id="download"
      aria-labelledby="download-app-heading"
      className="border-y border-border bg-muted/40"
    >
      <Container className="py-10 sm:py-12">
        <Reveal>
          <SectionHeading
            id="download-app-heading"
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            {downloads.map((item) => {
              const Icon = platformIcons[item.id];

              return (
                <li key={item.id} className="flex-1 sm:flex-initial">
                  <a
                    href={item.href}
                    download={item.fileName}
                    className={buttonClassName({
                      variant: "primary",
                      size: "lg",
                      className: "w-full sm:w-auto",
                    })}
                  >
                    <Icon className="size-4" aria-hidden />
                    {t(`platforms.${item.id}.cta`)}
                    <Download className="size-4 opacity-80" aria-hidden />
                  </a>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {t(`platforms.${item.id}.hint`)}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
