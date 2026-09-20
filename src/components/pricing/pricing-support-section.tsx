import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import { Lightbulb, MessagesSquare, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  pricingSupportItems,
  type PricingSupportItem,
} from "@/data/pricing";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const supportIcons = {
  wrench: Wrench,
  messages: MessagesSquare,
  lightbulb: Lightbulb,
} as const satisfies Record<PricingSupportItem["icon"], LucideIcon>;

export async function PricingSupportSection() {
  const t = await getTranslations("Pricing");

  return (
    <section
      aria-labelledby="pricing-support-heading"
      className="section-pad"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            id="pricing-support-heading"
            align="center"
            eyebrow={t("support.eyebrow")}
            title={t("support.title")}
            description={t("support.description")}
          />
        </Reveal>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
          {pricingSupportItems.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={0.05 * index} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-transparent px-1 py-1 sm:px-2">
                  <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
                    {createElement(supportIcons[item.icon], {
                      className: "size-5",
                      "aria-hidden": true,
                    })}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
