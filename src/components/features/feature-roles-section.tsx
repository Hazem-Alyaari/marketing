import { getTranslations } from "next-intl/server";
import { featureRoleKeys } from "@/data/features";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function FeatureRolesSection() {
  const t = await getTranslations("Features");

  return (
    <section
      aria-labelledby="features-roles-heading"
      className="section-pad"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeading
              id="features-roles-heading"
              eyebrow={t("roles.eyebrow")}
              title={t("roles.title")}
              description={t("roles.description")}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="flex flex-wrap gap-2.5">
              {featureRoleKeys.map((roleKey) => (
                <li
                  key={roleKey}
                  className="rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-sm)] transition-colors duration-200 hover:border-primary/30 hover:bg-accent hover:text-accent-foreground"
                >
                  {t(`roles.items.${roleKey}`)}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("roles.note")}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
