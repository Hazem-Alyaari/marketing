import type { TocItem } from "@/types/blog";
import { cn } from "@/lib/utils";

type ArticleTocProps = {
  items: readonly TocItem[];
  label: string;
};

/** Server-rendered TOC using hash links — no client JS required. */
export function ArticleToc({ items, label }: ArticleTocProps) {
  if (items.length < 3) {
    return null;
  }

  return (
    <nav
      aria-label={label}
      className="rounded-[var(--radius-lg)] border border-border bg-muted/40 px-4 py-4 sm:px-5"
    >
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <ol className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                item.level === 3 && "ps-3",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
