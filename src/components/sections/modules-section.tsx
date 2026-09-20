import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { modules } from "@/data/modules";
import { getLocaleDirection } from "@/lib/constants";
import { getModuleIcon } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function ModulesSection() {
  const t = await getTranslations("Modules");
  const locale = await getLocale();
  const direction = getLocaleDirection(locale);
  const Arrow = direction === "rtl" ? ArrowUpLeft : ArrowUpRight;

  return (
    <section
      aria-labelledby="modules-heading"
      className="section-pad section-muted border-y border-border"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="modules-heading"
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = getModuleIcon(module.icon);
            const content = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <IconBox className="size-12 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] transition-colors duration-200 group-hover:bg-[color-mix(in_srgb,var(--accent)_70%,var(--primary)_30%)] group-focus-visible:bg-[color-mix(in_srgb,var(--accent)_70%,var(--primary)_30%)]">
                    <Icon className="size-5" aria-hidden />
                  </IconBox>
                  {module.href ? (
                    <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-[color,background-color,transform] duration-200 group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-focus-visible:bg-accent group-focus-visible:text-accent-foreground">
                      <Arrow className="size-3.5" aria-hidden />
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {t(module.shortKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(module.descriptionKey)}
                  </p>
                </div>
              </>
            );

            if (module.href) {
              return (
                <Reveal key={module.id} delay={index * 0.06}>
                  <Link
                    href={module.href}
                    className="group block rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Card interactive className="h-full p-5 sm:p-6">
                      {content}
                    </Card>
                  </Link>
                </Reveal>
              );
            }

            return (
              <Reveal key={module.id} delay={index * 0.06}>
                <Card className="h-full p-5 sm:p-6">{content}</Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
