import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogCategories } from "@/data/blog/categories";
import { blogHref } from "@/lib/blog-href";
import type { BlogCategoryId } from "@/types/blog";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type BlogCategoriesNavProps = {
  active?: BlogCategoryId;
  available: readonly BlogCategoryId[];
};

export async function BlogCategoriesNav({
  active,
  available,
}: BlogCategoriesNavProps) {
  const t = await getTranslations("Blog");
  const visible = blogCategories.filter((category) =>
    available.includes(category.id),
  );

  if (visible.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="blog-categories-heading" className="border-b border-border">
      <Container className="py-6 sm:py-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="blog-categories-heading"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                {t("categoriesHeading")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("categoriesDescription")}
              </p>
            </div>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            <li>
              <Link
                href={blogHref()}
                className={cn(
                  "inline-flex rounded-[var(--radius)] border px-3 py-1.5 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  !active
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {t("allCategories")}
              </Link>
            </li>
            {visible.map((category) => {
              const isActive = active === category.id;
              return (
                <li key={category.id}>
                  <Link
                    href={blogHref(category.id)}
                    className={cn(
                      "inline-flex rounded-[var(--radius)] border px-3 py-1.5 text-sm transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    {t(category.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
