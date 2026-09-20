import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import { aboutTrustPoints, aboutVisuals } from "@/data/about";
import { getFeatureIcon } from "@/lib/icons";
import { FeatureVisual } from "@/components/features/feature-visual";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutTrustSection() {
  const t = await getTranslations("About");

  return (
    <section
      aria-labelledby="about-trust-heading"
      className="border-y border-border bg-muted/40 section-pad"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal className="space-y-6 lg:order-2">
            <SectionHeading
              id="about-trust-heading"
              eyebrow={t("trust.eyebrow")}
              title={t("trust.title")}
              description={t("trust.description")}
            />
            <ul className="space-y-4">
              {aboutTrustPoints.map((point) => (
                <li key={point.id} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-background text-primary shadow-[var(--shadow-sm)]">
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

          <Reveal delay={0.08} className="lg:order-1">
            <FeatureVisual
              screenshotKey={aboutVisuals.permissions}
              alt={t("trust.screenshotAlt")}
              placeholderLabel={t("screenshotPlaceholder")}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
