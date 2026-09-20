import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow-sm)]",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-md)] group-focus-visible:-translate-y-1 group-focus-visible:border-primary/35 group-focus-visible:shadow-[var(--shadow-md)]",
        className,
      )}
      {...props}
    />
  );
}
