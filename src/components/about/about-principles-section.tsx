import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import { aboutPrinciples } from "@/data/about";
import { getAboutIcon } from "@/lib/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutPrinciplesSection() {
  const t = await getTranslations("About");

  return (
    <section aria-labelledby="about-principles-heading" className="section-pad">
      <Container>
        <Reveal>
          <SectionHeading
            id="about-principles-heading"
            align="center"
            className="mx-auto"
            eyebrow={t("principles.eyebrow")}
            title={t("principles.title")}
            description={t("principles.description")}
          />
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutPrinciples.map((principle, index) => (
            <li key={principle.id}>
              <Reveal delay={0.04 * index} className="space-y-3">
                <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
                  {createElement(getAboutIcon(principle.icon), {
                    className: "size-5",
                    "aria-hidden": true,
                  })}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {t(principle.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(principle.descriptionKey)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
