import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import { solutionTrustPoints } from "@/data/solutions";
import { getFeatureIcon } from "@/lib/icons";
import { FeatureVisual } from "@/components/features/feature-visual";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function SolutionsTrustSection() {
  const t = await getTranslations("Solutions");

  return (
    <section
      aria-labelledby="solutions-trust-heading"
      className="section-pad"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal className="space-y-6">
            <SectionHeading
              id="solutions-trust-heading"
              eyebrow={t("trust.eyebrow")}
              title={t("trust.title")}
              description={t("trust.description")}
            />
            <ul className="space-y-4">
              {solutionTrustPoints.map((point) => (
                <li key={point.id} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-muted text-primary">
                    {createElement(getFeatureIcon(point.icon), {
                      className: "size-4",
                      "aria-hidden": true,
                    })}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(point.titleKey)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(point.descriptionKey)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <FeatureVisual
              screenshotKey="permissions"
              alt={t("trust.screenshotAlt")}
              placeholderLabel={t("screenshotPlaceholder")}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
