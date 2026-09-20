"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { productScreenshots } from "@/lib/product-media";
import { ImageLightbox } from "@/components/ui/image-lightbox";

type ProductPreviewProps = {
  alt: string;
  caption?: string;
  className?: string;
  src?: string;
};

/**
 * Browser-style product frame.
 * Real screenshots use intrinsic aspect ratio (width 100%, height auto).
 * Never uses object-cover cropping.
 */
export function ProductPreview({
  alt,
  caption,
  className,
  src = productScreenshots.dashboard.src,
}: ProductPreviewProps) {
  const t = useTranslations("Hero");
  const showImage = productScreenshots.dashboard.available;
  const { width, height } = productScreenshots.dashboard;

  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface",
          "shadow-[var(--shadow-md)] ring-1 ring-black/[0.03]",
          "transition-[box-shadow,transform] duration-200",
          showImage &&
            "hover:shadow-[var(--shadow-lg)] hover:ring-black/[0.05] motion-safe:hover:scale-[1.008]",
        )}
      >
        <div className="flex items-center gap-2 border-b border-border bg-muted/70 px-3 py-2.5 sm:px-4">
          <span
            className="size-2 rounded-full bg-[color-mix(in_srgb,var(--muted-foreground)_40%,transparent)]"
            aria-hidden
          />
          <span
            className="size-2 rounded-full bg-[color-mix(in_srgb,var(--muted-foreground)_40%,transparent)]"
            aria-hidden
          />
          <span
            className="size-2 rounded-full bg-[color-mix(in_srgb,var(--muted-foreground)_40%,transparent)]"
            aria-hidden
          />
          <span className="ms-2 truncate rounded-md border border-border/60 bg-background/90 px-2.5 py-0.5 text-[11px] text-muted-foreground">
            app.myschool
          </span>
        </div>

        {showImage ? (
          <ImageLightbox
            src={src}
            alt={alt}
            width={width}
            height={height}
            openLabel={t("viewLarger")}
            closeLabel={t("closePreview")}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto w-full bg-muted"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1120px"
              priority
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-foreground/25 to-transparent pb-3 pt-10 opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-sm)]">
                <Expand className="size-3.5" aria-hidden />
                {t("viewLarger")}
              </span>
            </span>
          </ImageLightbox>
        ) : (
          <div
            className="flex min-h-[12rem] flex-col items-center justify-center gap-2.5 px-6 py-10 text-center"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, var(--hero-glow), transparent 55%), linear-gradient(180deg, color-mix(in srgb, var(--accent) 55%, var(--muted)) 0%, var(--muted) 100%)",
            }}
          >
            <p className="text-sm font-medium tracking-tight text-foreground">
              {alt}
            </p>
            {caption ? (
              <p className="mx-auto max-w-sm text-xs leading-relaxed text-muted-foreground">
                {caption}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </figure>
  );
}
