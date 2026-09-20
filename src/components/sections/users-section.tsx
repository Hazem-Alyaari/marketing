import { getTranslations } from "next-intl/server";
import { users } from "@/data/users";
import { getUserIcon } from "@/lib/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export async function UsersSection() {
  const t = await getTranslations("Users");

  return (
    <section
      aria-labelledby="users-heading"
      className="section-pad section-muted border-y border-border"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:items-start lg:gap-14">
          <Reveal className="max-w-md space-y-4 lg:sticky lg:top-24">
            <p className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              {t("eyebrow")}
            </p>
            <h2
              id="users-heading"
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <p className="border-s-2 border-primary/40 ps-4 text-sm leading-relaxed text-muted-foreground">
              {t("note")}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="divide-y divide-border overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-[var(--shadow-sm)]">
              {users.map((user, index) => {
                const Icon = getUserIcon(user.icon);
                return (
                  <li
                    key={user.id}
                    tabIndex={0}
                    className={cn(
                      "group/role flex gap-4 px-4 py-4 outline-none transition-[background-color,transform] duration-200 sm:gap-5 sm:px-5 sm:py-4",
                      "hover:bg-muted/70 focus-visible:bg-muted/70 active:bg-muted",
                      index === 0 && "rounded-t-[var(--radius-xl)]",
                      index === users.length - 1 &&
                        "rounded-b-[var(--radius-xl)]",
                    )}
                  >
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[var(--radius)] bg-muted text-primary transition-[background-color,color,transform] duration-200 group-hover/role:bg-accent group-hover/role:text-accent-foreground group-hover/role:scale-105 group-focus-visible/role:bg-accent group-focus-visible/role:text-accent-foreground">
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover/role:text-primary group-focus-visible/role:text-primary sm:text-base">
                        {t(user.nameKey)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {t(user.descriptionKey)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
