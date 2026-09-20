"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type JumpNavItem = {
  id: string;
  anchor: string;
};

type JumpNavProps = {
  items: readonly JumpNavItem[];
  labels: Record<string, string>;
  ariaLabel: string;
};

/**
 * Sticky same-page jump navigation with IntersectionObserver active state.
 * Content remains fully visible without JavaScript.
 */
export function JumpNav({ items, labels, ariaLabel }: JumpNavProps) {
  const [active, setActive] = useState<string>(items[0]?.anchor ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.anchor))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );
        const top = visible[0]?.target.id;
        if (top) {
          setActive(top);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-[var(--header-height)] z-40 border-b border-border/80 bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)]">
        <ul className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = active === item.anchor;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.anchor}`}
                  className={cn(
                    "inline-flex rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-primary/30 bg-accent text-accent-foreground"
                      : "border-border bg-surface text-muted-foreground hover:border-primary/25 hover:text-foreground",
                  )}
                >
                  {labels[item.id]}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
