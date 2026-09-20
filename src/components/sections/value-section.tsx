import { getTranslations } from "next-intl/server";
import { valuePillars } from "@/data/value";
import { getValueIcon } from "@/lib/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export async function ValueSection() {
  const t = await getTranslations("Value");

  return (
    <section aria-labelledby="value-heading" className="section-pad">
      <Container>
        <Reveal>
          <SectionHeading
            id="value-heading"
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-0 sm:grid-cols-3 sm:divide-x sm:divide-border rtl:sm:divide-x-reverse">
            {valuePillars.map((pillar, index) => {
              const Icon = getValueIcon(pillar.icon);
              return (
                <li
                  key={pillar.id}
                  className={cn(
                    "px-1 py-6 text-center sm:px-6 sm:py-2",
                    index > 0 && "border-t border-border sm:border-t-0",
                  )}
                >
                  <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {t(pillar.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(pillar.descriptionKey)}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
