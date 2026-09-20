import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import type { FeatureGroup } from "@/types/feature";
import { getFeatureIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { FeatureVisual } from "@/components/features/feature-visual";
import { cn } from "@/lib/utils";

type FeatureGroupSectionProps = {
  group: FeatureGroup;
  index: number;
};

export async function FeatureGroupSection({
  group,
  index,
}: FeatureGroupSectionProps) {
  const t = await getTranslations("Features");
  const visualFirst = index % 2 === 1;

  return (
    <section
      id={group.anchor}
      aria-labelledby={`${group.anchor}-heading`}
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
              {createElement(getFeatureIcon(group.icon), {
                className: "size-3.5",
                "aria-hidden": true,
              })}
              {t(group.shortKey)}
            </Badge>
            <h2
              id={`${group.anchor}-heading`}
              className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {t(group.titleKey)}
            </h2>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              {t(group.descriptionKey)}
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {group.capabilities.map((capability) => (
              <li
                key={capability.id}
                className="rounded-[var(--radius-lg)] border border-border/80 bg-surface/80 p-3.5 transition-[border-color,box-shadow] duration-200 hover:border-primary/25 hover:shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius)] bg-accent text-accent-foreground">
                    {createElement(getFeatureIcon(capability.icon), {
                      className: "size-3.5",
                      "aria-hidden": true,
                    })}
                  </span>
                  <div className="min-w-0 space-y-1">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      {t(capability.titleKey)}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">
                      {t(capability.descriptionKey)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={cn(visualFirst && "lg:order-1")} delay={0.08}>
          <FeatureVisual
            screenshotKey={group.screenshotKey}
            alt={t(group.screenshotAltKey)}
            placeholderLabel={t("screenshotPlaceholder")}
          />
        </Reveal>
      </div>
    </section>
  );
}
