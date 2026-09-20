import { createElement } from "react";
import { getTranslations } from "next-intl/server";
import { getFeatureIcon } from "@/lib/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const connectionRoles = [
  { id: "teachers", icon: "graduation-cap" as const },
  { id: "finance", icon: "wallet" as const },
  { id: "hr", icon: "briefcase" as const },
  { id: "supervision", icon: "clipboard-list" as const },
  { id: "students", icon: "book-user" as const },
  { id: "guardians", icon: "heart-handshake" as const },
] as const;

export async function SolutionsConnectionSection() {
  const t = await getTranslations("Solutions");

  return (
    <section
      aria-labelledby="solutions-connection-heading"
      className="section-pad section-muted border-y border-border"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="solutions-connection-heading"
            align="center"
            eyebrow={t("connection.eyebrow")}
            title={t("connection.title")}
            description={t("connection.description")}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {connectionRoles.map((role) => (
              <li
                key={role.id}
                className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[var(--shadow-sm)]"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] bg-accent text-accent-foreground">
                  {createElement(getFeatureIcon(role.icon), {
                    className: "size-4",
                    "aria-hidden": true,
                  })}
                </span>
                <div className="min-w-0 space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {t(`connection.roles.${role.id}.title`)}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {t(`connection.roles.${role.id}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
