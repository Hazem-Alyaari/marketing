import { getTranslations } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
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
            {(contactEmail || contactPhone) && (
              <ul className="mb-8 flex flex-wrap items-center justify-center gap-3">
                {contactEmail ? (
                  <li>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="inline-flex items-center gap-2 rounded-[var(--radius-lg)] border border-border bg-surface px-4 py-2.5 text-sm text-foreground shadow-[var(--shadow-sm)] transition-colors hover:border-primary/30 hover:bg-muted"
                    >
                      <Mail className="size-4 text-primary" aria-hidden />
                      <span>{contactEmail}</span>
                    </a>
                  </li>
                ) : null}
                {contactPhone ? (
                  <li>
                    <a
                      href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-[var(--radius-lg)] border border-border bg-surface px-4 py-2.5 text-sm text-foreground shadow-[var(--shadow-sm)] transition-colors hover:border-primary/30 hover:bg-muted"
                      dir="ltr"
                    >
                      <Phone className="size-4 text-primary" aria-hidden />
                      <span>{contactPhone}</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            )}

            <h2 id="contact-form-heading" className="sr-only">
              {t("form.title")}
            </h2>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
