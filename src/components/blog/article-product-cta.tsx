import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routes } from "@/config/navigation";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DemoLink } from "@/components/ui/demo-link";
import { Reveal } from "@/components/ui/reveal";

export async function ArticleProductCta() {
  const t = await getTranslations("Blog.articleCta");

  return (
    <aside className="my-10 rounded-[var(--radius-lg)] border border-primary/20 bg-[color-mix(in_srgb,var(--primary)_5%,var(--background))] px-5 py-6 sm:px-6">
      <p className="text-base font-semibold text-foreground sm:text-lg">
        {t("title")}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t("description")}
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <DemoLink
          variant="primary"
          size="md"
          ctaId="article-inline-demo"
          className="w-full sm:w-auto"
        >
          {t("demo")}
        </DemoLink>
        <Link
          href={routes.features}
          className={buttonClassName({
            variant: "outline",
            size: "md",
            className: "w-full sm:w-auto",
          })}
        >
          {t("features")}
        </Link>
      </div>
    </aside>
  );
}

export async function BlogPageCta() {
  const t = await getTranslations("Blog.cta");

  return (
    <section aria-labelledby="blog-cta-heading" className="section-pad">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-primary px-6 py-10 text-primary-foreground shadow-[var(--shadow-md)] sm:px-10 sm:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(255_255_255/0.12),transparent_42%)]"
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2
                id="blog-cta-heading"
                className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {t("title")}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                {t("description")}
              </p>
              <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-auto sm:flex-row">
                <DemoLink
                  variant="secondary"
                  size="lg"
                  ctaId="blog-cta-demo"
                  className="w-full bg-surface text-primary hover:bg-surface/90 sm:w-auto"
                >
                  {t("primary")}
                </DemoLink>
                <Link
                  href={routes.features}
                  className={buttonClassName({
                    variant: "ghost",
                    size: "lg",
                    className:
                      "w-full text-primary-foreground hover:bg-white/10 sm:w-auto",
                  })}
                >
                  {t("secondary")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
