import { createElement } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featureConnectionSteps } from "@/data/features";
import { getLocaleDirection } from "@/lib/constants";
import { getFeatureIcon } from "@/lib/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function FeatureConnectionSection() {
  const t = await getTranslations("Features");
  const locale = await getLocale();
  const direction = getLocaleDirection(locale);
  const Chevron = direction === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <section
      aria-labelledby="features-connection-heading"
      className="section-pad border-y border-border section-muted"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="features-connection-heading"
            align="center"
            eyebrow={t("connection.eyebrow")}
            title={t("connection.title")}
            description={t("connection.description")}
          />
        </Reveal>

        <ol className="mt-10 grid gap-0 lg:grid-cols-5">
          {featureConnectionSteps.map((step, index) => {
            const isLast = index === featureConnectionSteps.length - 1;

            return (
              <li key={step.id} className="relative">
                <Reveal delay={index * 0.06}>
                  <div className="flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:px-2 lg:text-center">
                    <div className="relative flex shrink-0 items-center">
                      <div className="flex size-11 items-center justify-center rounded-[var(--radius-lg)] border border-border bg-surface text-primary shadow-[var(--shadow-sm)] lg:size-12">
                        {createElement(getFeatureIcon(step.icon), {
                          className: "size-5",
                          "aria-hidden": true,
                        })}
                      </div>
                      {!isLast ? (
                        <Chevron
                          className="ms-1 hidden size-4 text-muted-foreground/60 lg:absolute lg:start-[calc(100%+0.35rem)] lg:top-1/2 lg:ms-0 lg:block lg:-translate-y-1/2"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1 pb-6 lg:pb-0">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        {t(step.titleKey)}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">
                        {t(step.descriptionKey)}
                      </p>
                    </div>
                  </div>
                  {!isLast ? (
                    <div
                      aria-hidden
                      className="ms-[1.35rem] h-3 w-px bg-border lg:hidden"
                    />
                  ) : null}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
