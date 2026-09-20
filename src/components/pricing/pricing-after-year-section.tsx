import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pricingDiscussItems } from "@/data/pricing";
import { contactHref } from "@/lib/contact/href";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export async function PricingAfterYearSection() {
  const t = await getTranslations("Pricing");

  return (
    <section
      aria-labelledby="pricing-after-heading"
      className="border-y border-border bg-muted/40 section-pad"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
              {t("after.eyebrow")}
            </p>
            <h2
              id="pricing-after-heading"
              className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {t("after.title")}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("after.description")}
            </p>
            <div className="mt-7">
              <Link
                href={contactHref("commercial")}
                className={buttonClassName({ variant: "outline", size: "lg" })}
              >
                {t("after.cta")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[var(--radius-lg)] border border-border bg-background px-5 py-6 shadow-[var(--shadow-sm)] sm:px-6">
              <h3 className="text-base font-semibold text-foreground">
                {t("after.discussTitle")}
              </h3>
              <ul className="mt-4 space-y-3">
                {pricingDiscussItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{t(item.labelKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
