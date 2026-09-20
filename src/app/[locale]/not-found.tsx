import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";

export default async function LocaleNotFound() {
  const t = await getTranslations("Pages");

  return (
    <main>
      <Container className="py-16">
        <h1>{t("notFound")}</h1>
      </Container>
    </main>
  );
}
