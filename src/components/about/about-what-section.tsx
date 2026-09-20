import { getTranslations } from "next-intl/server";
import { aboutVisuals } from "@/data/about";
import { FeatureVisual } from "@/components/features/feature-visual";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutWhatSection() {
  const t = await getTranslations("About");

  return (
    <section aria-labelledby="about-what-heading" className="section-pad">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeading
              id="about-what-heading"
              eyebrow={t("what.eyebrow")}
              title={t("what.title")}
              description={t("what.description")}
            />
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("what.detail")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <FeatureVisual
              screenshotKey={aboutVisuals.dashboard}
              alt={t("what.screenshotAlt")}
              placeholderLabel={t("screenshotPlaceholder")}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
