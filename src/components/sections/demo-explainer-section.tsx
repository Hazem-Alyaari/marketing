import { getTranslations } from "next-intl/server";
import { Monitor } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DemoLink, hasDemoUrl } from "@/components/ui/demo-link";
import { Reveal } from "@/components/ui/reveal";

/**
 * Concise public-demo explainer. Shown only when NEXT_PUBLIC_DEMO_URL is set.
 * Does not name specific demo roles or credentials.
 */
export async function DemoExplainerSection() {
  if (!hasDemoUrl()) {
    return null;
  }

  const t = await getTranslations("Demo");

  return (
    <section aria-labelledby="demo-explainer-heading" className="border-y border-border bg-muted/40">
      <Container className="py-10 sm:py-12">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex size-10 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
            <Monitor className="size-5" aria-hidden />
          </div>
          <h2
            id="demo-explainer-heading"
            className="mt-4 text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {t("title")}
          </h2>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("description")}
          </p>
          <DemoLink
            variant="primary"
            size="md"
            showIcon
            ctaId="demo-explainer-try-demo"
            className="mt-5"
          >
            {t("cta")}
          </DemoLink>
        </Reveal>
      </Container>
    </section>
  );
}
