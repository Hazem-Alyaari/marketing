import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routes } from "@/config/navigation";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DemoLink } from "@/components/ui/demo-link";
import { Reveal } from "@/components/ui/reveal";

export async function AboutCtaSection() {
  const t = await getTranslations("About");

  return (
    <section aria-labelledby="about-cta-heading" className="section-pad">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-primary px-6 py-10 text-primary-foreground shadow-[var(--shadow-md)] sm:px-10 sm:py-12 lg:px-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(255_255_255/0.12),transparent_42%)]"
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2
                id="about-cta-heading"
                className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                {t("cta.description")}
              </p>
              <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-auto sm:flex-row">
                <DemoLink
                  variant="secondary"
                  size="lg"
                  ctaId="about-cta-try-demo"
                  className="w-full bg-surface text-primary hover:bg-surface/90 sm:w-auto"
                >
                  {t("cta.primary")}
                </DemoLink>
                <Link
                  href={routes.contact}
                  className={buttonClassName({
                    variant: "ghost",
                    size: "lg",
                    className:
                      "w-full text-primary-foreground hover:bg-white/10 sm:w-auto",
                  })}
                >
                  {t("cta.secondary")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
