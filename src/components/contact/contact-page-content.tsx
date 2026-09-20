import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { DemoLink, hasDemoUrl } from "@/components/ui/demo-link";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/config/site";

export async function ContactPageContent() {
  const t = await getTranslations("Contact");
  const showDemo = hasDemoUrl();
  const contactEmail = siteConfig.contact.email.trim();
  const contactPhone = siteConfig.contact.phone.trim();

  return (
    <>
      <section
        aria-labelledby="contact-hero-heading"
        className="relative overflow-hidden border-b border-border"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_55%)]"
        />
        <Container className="relative py-12 sm:py-14 lg:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h1
              id="contact-hero-heading"
              className="text-balance text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]"
            >
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
              {t("hero.description")}
            </p>
          </Reveal>
        </Container>
      </section>

      {showDemo ? (
        <section
          aria-labelledby="contact-demo-heading"
          className="border-b border-border bg-muted/40"
        >
          <Container className="py-8 sm:py-10">
            <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2
                id="contact-demo-heading"
                className="text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              >
                {t("demoInvite.title")}
              </h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("demoInvite.description")}
              </p>
              <DemoLink
                variant="primary"
                size="lg"
                showIcon
                ctaId="contact-try-demo"
                className="mt-5"
              >
                {t("demoInvite.cta")}
              </DemoLink>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="contact-form-heading" className="section-pad">
        <Container narrow>
          <Reveal>
            <div className="mb-8 max-w-xl">
              <h2
                id="contact-form-heading"
                className="text-balance text-2xl font-semibold tracking-tight text-foreground"
              >
                {t("form.title")}
              </h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("form.description")}
              </p>
              {(contactEmail || contactPhone) && (
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {contactEmail ? (
                    <li>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        {contactEmail}
                      </a>
                    </li>
                  ) : null}
                  {contactPhone ? <li dir="ltr">{contactPhone}</li> : null}
                </ul>
              )}
            </div>
            <div className="relative">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
