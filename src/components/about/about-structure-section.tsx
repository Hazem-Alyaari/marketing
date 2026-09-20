import { getTranslations } from "next-intl/server";
import { aboutStructureSteps, aboutVisuals } from "@/data/about";
import { FeatureVisual } from "@/components/features/feature-visual";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutStructureSection() {
  const t = await getTranslations("About");

  return (
    <section aria-labelledby="about-structure-heading" className="section-pad">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <Reveal className="space-y-8">
            <SectionHeading
              id="about-structure-heading"
              eyebrow={t("structure.eyebrow")}
              title={t("structure.title")}
              description={t("structure.description")}
            />
            <ol className="space-y-5">
              {aboutStructureSteps.map((step, index) => (
                <li key={step.id} className="flex gap-4">
                  <span
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.08} className="space-y-4 lg:pt-10">
            <FeatureVisual
              screenshotKey={aboutVisuals.studentPortal}
              alt={t("structure.screenshotAlt")}
              placeholderLabel={t("screenshotPlaceholder")}
            />
            <p className="text-center text-xs text-muted-foreground">
              {t("structure.caption")}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
