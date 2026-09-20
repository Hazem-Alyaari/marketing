import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "start",
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-3",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div className={cn(align === "center" && "flex justify-center")}>
          <Badge tone="brand">{eyebrow}</Badge>
        </div>
      ) : null}
      <Tag
        id={id}
        className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </Tag>
      {description ? (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
