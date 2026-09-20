import { getTranslations } from "next-intl/server";
import { faqCategories, getFaqItemsByCategory } from "@/data/faq";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export async function FaqCategoriesSection() {
  const t = await getTranslations("Faq");

  const categoriesWithItems = faqCategories
    .map((category) => ({
      ...category,
      items: getFaqItemsByCategory(category.id),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <section aria-labelledby="faq-list-heading" className="section-pad">
      <Container narrow>
        <Reveal className="mb-8">
          <h2 id="faq-list-heading" className="sr-only">
            {t("listHeading")}
          </h2>
          <nav aria-label={t("categoryNavLabel")} className="mb-10">
            <ul className="flex flex-wrap gap-2">
              {categoriesWithItems.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#faq-${category.id}`}
                    className="inline-flex rounded-[var(--radius)] border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {t(category.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <div className="space-y-12">
          {categoriesWithItems.map((category, index) => (
            <Reveal key={category.id} delay={0.04 * index}>
              <section
                id={`faq-${category.id}`}
                aria-labelledby={`faq-${category.id}-heading`}
                className="scroll-mt-28"
              >
                <h2
                  id={`faq-${category.id}-heading`}
                  className="mb-4 text-lg font-semibold tracking-tight text-foreground"
                >
                  {t(category.labelKey)}
                </h2>
                <FaqAccordion items={category.items} />
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
