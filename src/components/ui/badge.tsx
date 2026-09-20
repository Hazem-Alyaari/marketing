import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "brand";
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        tone === "neutral" &&
          "border border-border bg-muted text-muted-foreground",
        tone === "brand" && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}
