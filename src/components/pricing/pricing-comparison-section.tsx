import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import { Eye, Handshake, School } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  pricingJourneyStages,
  type PricingJourneyStage,
} from "@/data/pricing";
import { contactHref } from "@/lib/contact/href";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DemoLink, hasDemoUrl } from "@/components/ui/demo-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const stageIcons = {
  eye: Eye,
  school: School,
  handshake: Handshake,
} as const satisfies Record<PricingJourneyStage["icon"], LucideIcon>;

export async function PricingComparisonSection() {
  const t = await getTranslations("Pricing");

  return (
    <section
      aria-labelledby="pricing-journey-heading"
      className="border-y border-border bg-muted/40 section-pad"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            id="pricing-journey-heading"
            align="center"
            eyebrow={t("journey.eyebrow")}
            title={t("journey.title")}
            description={t("journey.description")}
          />
        </Reveal>

        <ol className="relative mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
          <div
            aria-hidden
            className="pointer-events-none absolute start-[16.5%] end-[16.5%] top-[2.15rem] hidden border-t border-dashed border-border lg:block"
          />

          {pricingJourneyStages.map((stage, index) => {
            const Icon = stageIcons[stage.icon];
            const isLast = index === pricingJourneyStages.length - 1;
            const emphasized = Boolean(stage.emphasized);

            return (
              <li key={stage.id} className="relative flex gap-4 lg:block lg:gap-0">
                {/* Mobile vertical timeline rail */}
                <div className="flex w-11 shrink-0 flex-col items-center lg:hidden">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-full border text-sm font-semibold tabular-nums",
                      emphasized
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-surface text-primary",
                    )}
                  >
                    {stage.number}
                  </span>
                  {!isLast ? (
                    <div aria-hidden className="mt-2 w-px flex-1 bg-border" />
                  ) : null}
                </div>

                <Reveal delay={0.05 * index} className="min-w-0 flex-1">
                  <article
                    className={cn(
                      "group/stage relative flex h-full flex-col rounded-[var(--radius-lg)] border px-5 py-6 transition-[border-color,box-shadow,background-color] duration-200",
                      "focus-within:border-primary/30",
                      emphasized
                        ? "border-primary/40 bg-[color-mix(in_srgb,var(--primary)_7%,var(--background))] shadow-[var(--shadow-md)] ring-1 ring-primary/15"
                        : "border-border bg-background/85 hover:border-primary/25",
                    )}
                  >
                    <div className="hidden items-center gap-3 lg:flex">
                      <span
                        className={cn(
                          "flex size-11 items-center justify-center rounded-full border text-sm font-semibold tabular-nums",
                          emphasized
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-surface text-primary",
                        )}
                      >
                        {stage.number}
                      </span>
                    </div>

                    <div className="mt-0 flex flex-wrap items-center gap-2 lg:mt-4">
                      <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
                        {t(stage.labelKey)}
                      </p>
                      {stage.badgeKey ? (
                        <span className="inline-flex rounded-[var(--radius)] bg-primary/12 px-2 py-0.5 text-[0.7rem] font-semibold text-primary">
                          {t(stage.badgeKey)}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)]",
                          emphasized
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-primary",
                        )}
                      >
                        {createElement(Icon, {
                          className: "size-4",
                          "aria-hidden": true,
                        })}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {t(stage.titleKey)}
                      </h3>
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {stage.points.map((point) => (
                        <li
                          key={point.id}
                          className="text-sm leading-relaxed text-muted-foreground"
                        >
                          {t(point.labelKey)}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      {stage.cta.type === "demo" ? (
                        hasDemoUrl() ? (
                          <DemoLink
                            variant={emphasized ? "primary" : "outline"}
                            size="md"
                            ctaId={`pricing-journey-${stage.id}`}
                            className="w-full sm:w-auto"
                          >
                            {t(stage.cta.labelKey)}
                          </DemoLink>
                        ) : null
                      ) : (
                        <Link
                          href={contactHref(stage.cta.inquiryType)}
                          className={buttonClassName({
                            variant: emphasized ? "primary" : "outline",
                            size: "md",
                            className: cn(
                              "w-full sm:w-auto",
                              emphasized && "shadow-[var(--shadow-sm)]",
                            ),
                          })}
                        >
                          {t(stage.cta.labelKey)}
                        </Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
