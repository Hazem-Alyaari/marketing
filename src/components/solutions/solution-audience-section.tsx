import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SolutionAudience } from "@/types/solution";
import { getLocaleDirection } from "@/lib/constants";
import { getFeatureIcon } from "@/lib/icons";
import { routes } from "@/config/navigation";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { FeatureVisual } from "@/components/features/feature-visual";
import { cn } from "@/lib/utils";

type SolutionAudienceSectionProps = {
  audience: SolutionAudience;
  index: number;
};

export async function SolutionAudienceSection({
  audience,
  index,
}: SolutionAudienceSectionProps) {
  const t = await getTranslations("Solutions");
  const tFeatures = await getTranslations("Features");
  const locale = await getLocale();
  const direction = getLocaleDirection(locale);
  const Arrow = direction === "rtl" ? ArrowUpLeft : ArrowUpRight;
  const visualFirst = index % 2 === 1;

  return (
    <section
      id={audience.anchor}
      aria-labelledby={`${audience.anchor}-heading`}
      className={cn(
        "scroll-mt-[calc(var(--header-height)+3.5rem)] section-pad",
        index % 2 === 1 && "section-muted border-y border-border",
      )}
    >
      <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-[var(--container-padding)] lg:grid-cols-2 lg:items-center lg:gap-14">
        <Reveal
          className={cn("space-y-6", visualFirst && "lg:order-2")}
          delay={0.02}
        >
          <div className="space-y-3">
            <Badge tone="brand" className="inline-flex items-center gap-1.5">
              {createElement(getFeatureIcon(audience.icon), {
                className: "size-3.5",
                "aria-hidden": true,
              })}
              {t(audience.shortKey)}
            </Badge>
            <h2
              id={`${audience.anchor}-heading`}
              className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {t(audience.titleKey)}
            </h2>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              {t(audience.problemKey)}
            </p>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-foreground/90">
              {t(audience.approachKey)}
            </p>
          </div>

          <ul className="space-y-3">
            {audience.highlights.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 rounded-[var(--radius-lg)] border border-transparent p-3 transition-[border-color,background-color] duration-200 hover:border-border hover:bg-surface/80"
              >
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-accent text-accent-foreground">
                  {createElement(getFeatureIcon(item.icon), {
                    className: "size-4",
                    "aria-hidden": true,
                  })}
                </span>
                <div className="min-w-0 space-y-1">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {audience.relatedFeatureAnchors.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-medium text-muted-foreground">
                {t("relatedFeatures")}
              </span>
              {audience.relatedFeatureAnchors.map((anchor) => {
                const group = featureShortLabel(anchor);
                return (
                  <Link
                    key={anchor}
                    href={`${routes.features}#${anchor}`}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {tFeatures(group)}
                    <Arrow className="size-3" aria-hidden />
                  </Link>
                );
              })}
            </div>
          ) : null}
        </Reveal>

        <Reveal className={cn(visualFirst && "lg:order-1")} delay={0.08}>
          <FeatureVisual
            screenshotKey={audience.screenshotKey}
            alt={t(audience.screenshotAltKey)}
            placeholderLabel={t("screenshotPlaceholder")}
          />
        </Reveal>
      </div>
    </section>
  );
}

/** Map Features anchors to Features.groups.*.short translation keys. */
function featureShortLabel(anchor: string): string {
  const map: Record<string, string> = {
    "students-admissions": "groups.studentsAdmissions.short",
    academics: "groups.academics.short",
    "attendance-assessment": "groups.attendanceAssessment.short",
    "finance-accounting": "groups.financeAccounting.short",
    "human-resources": "groups.humanResources.short",
    "educational-supervision": "groups.educationalSupervision.short",
    "communication-operations": "groups.communicationOperations.short",
    "portals-admin": "groups.portalsAdmin.short",
  };
  return map[anchor] ?? anchor;
}
