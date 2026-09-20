import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:bg-primary-hover hover:shadow-[var(--shadow-md)] hover:-translate-y-px active:translate-y-0 active:shadow-[var(--shadow-sm)]",
  secondary:
    "bg-accent text-accent-foreground hover:bg-[color-mix(in_srgb,var(--accent)_75%,var(--primary)_25%)] hover:-translate-y-px active:translate-y-0",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary/30 hover:bg-muted hover:-translate-y-px active:translate-y-0",
  ghost:
    "bg-transparent text-foreground hover:bg-muted active:bg-muted/80",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium",
    "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
