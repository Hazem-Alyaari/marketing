import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  narrow?: boolean;
};

export function Container({ className, narrow = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--container-padding)]",
        narrow
          ? "max-w-[var(--container-narrow)]"
          : "max-w-[var(--container-max)]",
        className,
      )}
      {...props}
    />
  );
}
