"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { FaqItem } from "@/types/faq";
import { DemoLink, hasDemoUrl } from "@/components/ui/demo-link";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: readonly FaqItem[];
  /** Allow multiple panels open at once (simpler default UX). */
  allowMultiple?: boolean;
};

export function FaqAccordion({
  items,
  allowMultiple = true,
}: FaqAccordionProps) {
  const t = useTranslations("Faq");
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="divide-y divide-border rounded-[var(--radius-lg)] border border-border bg-background">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const headerId = `${baseId}-${item.id}-header`;

        return (
          <div key={item.id} className="px-4 sm:px-6">
            <h3 className="text-[0.95rem] font-semibold sm:text-base">
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 py-4.5 text-start text-foreground sm:py-5",
                  "transition-colors duration-200 hover:text-primary motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <span className="text-pretty pe-2 leading-snug">
                  {t(item.questionKey)}
                </span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={cn(!isOpen && "hidden")}
            >
              <div className="space-y-3 pb-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                <p className="text-pretty whitespace-pre-line">
                  {t(item.answerKey)}
                </p>
                {item.related ? (
                  <div>
                    {item.related.type === "demo" ? (
                      hasDemoUrl() ? (
                        <DemoLink
                          ctaId={`faq-${item.id}-demo`}
                          showIcon
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {t(item.related.labelKey)}
                        </DemoLink>
                      ) : null
                    ) : (
                      <Link
                        href={item.related.href}
                        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {t(item.related.labelKey)}
                      </Link>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
