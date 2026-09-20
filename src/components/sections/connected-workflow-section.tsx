import { getLocale, getTranslations } from "next-intl/server";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { workflowSteps, getWorkflowIcon } from "@/data/workflow";
import { getLocaleDirection } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export async function ConnectedWorkflowSection() {
  const t = await getTranslations("Workflow");
  const locale = await getLocale();
  const direction = getLocaleDirection(locale);
  const Chevron = direction === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <section aria-labelledby="workflow-heading" className="section-pad">
      <Container>
        <Reveal>
          <SectionHeading
            id="workflow-heading"
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <ol className="mt-10 grid gap-0 lg:grid-cols-5">
          {workflowSteps.map((step, index) => {
            const Icon = getWorkflowIcon(step.icon);
            const isLast = index === workflowSteps.length - 1;

            return (
              <li
                key={step.id}
                className={cn(
                  "group/step relative rounded-[var(--radius-lg)] outline-none",
                  "transition-colors duration-200",
                  "focus-within:bg-muted/40 hover:bg-muted/40",
                  "lg:px-1 lg:py-2",
                )}
                tabIndex={0}
              >
                <Reveal delay={index * 0.06}>
                  <div className="flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:px-2 lg:text-center">
                    <div className="relative flex shrink-0 items-center">
                      <div className="flex size-11 items-center justify-center rounded-[var(--radius-lg)] border border-border bg-surface text-primary shadow-[var(--shadow-sm)] transition-[border-color,box-shadow,transform,background-color] duration-200 group-hover/step:border-primary/35 group-hover/step:bg-accent group-hover/step:shadow-[var(--shadow-md)] group-hover/step:-translate-y-0.5 group-focus-within/step:border-primary/35 group-focus-within/step:bg-accent lg:size-12">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      {!isLast ? (
                        <Chevron
                          className="ms-1 hidden size-4 text-muted-foreground/60 transition-colors duration-200 group-hover/step:text-primary group-focus-within/step:text-primary lg:absolute lg:start-[calc(100%+0.35rem)] lg:top-1/2 lg:ms-0 lg:block lg:-translate-y-1/2"
                          aria-hidden
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1 pb-6 lg:pb-0">
                      <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-primary uppercase">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover/step:text-primary group-focus-within/step:text-primary">
                        {t(step.titleKey)}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">
                        {t(step.descriptionKey)}
                      </p>
                    </div>
                  </div>

                  {!isLast ? (
                    <div
                      aria-hidden
                      className="ms-[1.35rem] h-3 w-px bg-border transition-colors duration-200 group-hover/step:bg-primary/40 lg:hidden"
                    />
                  ) : null}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
