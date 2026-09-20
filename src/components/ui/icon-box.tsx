import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type IconBoxProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "brand" | "muted";
};

export function IconBox({
  className,
  tone = "brand",
  ...props
}: IconBoxProps) {
  return (
    <div
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius)]",
        tone === "brand" && "bg-accent text-accent-foreground",
        tone === "muted" && "bg-muted text-foreground",
        className,
      )}
      {...props}
    />
  );
}
