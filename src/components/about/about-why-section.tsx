import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutWhySection() {
  const t = await getTranslations("About");

  return (
    <section
      aria-labelledby="about-why-heading"
      className="border-y border-border bg-muted/40 section-pad"
    >
      <Container narrow>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            id="about-why-heading"
            align="center"
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
            description={t("why.description")}
          />
        </Reveal>
      </Container>
    </section>
  );
}
