import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { aboutAudiences } from "@/data/about";
import { routes } from "@/config/navigation";
import { getUserIcon } from "@/lib/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutAudiencesSection() {
  const t = await getTranslations("About");

  return (
    <section
      aria-labelledby="about-audiences-heading"
      className="border-y border-border bg-muted/40 section-pad"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            id="about-audiences-heading"
            align="center"
            eyebrow={t("audiences.eyebrow")}
            title={t("audiences.title")}
            description={t("audiences.description")}
          />
        </Reveal>

        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {aboutAudiences.map((audience, index) => (
            <li key={audience.id}>
              <Reveal delay={0.03 * index}>
                <span className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-border bg-background px-3.5 py-2 text-sm text-foreground shadow-[var(--shadow-sm)]">
                  <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {createElement(getUserIcon(audience.icon), {
                      className: "size-3.5",
                      "aria-hidden": true,
                    })}
                  </span>
                  {t(audience.labelKey)}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-8 text-center">
          <Link
            href={routes.solutions}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("audiences.exploreSolutions")}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
