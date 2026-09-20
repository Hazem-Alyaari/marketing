"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  productScreenshots,
  type ProductScreenshotKey,
} from "@/lib/product-media";
import { ImageLightbox } from "@/components/ui/image-lightbox";

type FeatureVisualProps = {
  screenshotKey: ProductScreenshotKey;
  alt: string;
  placeholderLabel: string;
  className?: string;
};

/**
 * Feature/Solutions product visual.
 * Shows a real screenshot when available; otherwise a clear slot — never fake UI.
 */
export function FeatureVisual({
  screenshotKey,
  alt,
  placeholderLabel,
  className,
}: FeatureVisualProps) {
  const t = useTranslations("Features");
  const shot = productScreenshots[screenshotKey];
  const [failed, setFailed] = useState(false);

  const showImage = Boolean(shot?.available) && !failed;

  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface",
          "shadow-[var(--shadow-md)] ring-1 ring-black/[0.03]",
          showImage &&
            "transition-[box-shadow,transform] duration-200 hover:shadow-[var(--shadow-lg)] motion-safe:hover:scale-[1.005]",
        )}
      >
        <div className="flex items-center gap-2 border-b border-border bg-muted/70 px-3 py-2">
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
          <span className="ms-2 truncate text-[11px] text-muted-foreground">
            MySchool
          </span>
        </div>

        {showImage ? (
          <ImageLightbox
            src={shot.src}
            alt={alt}
            width={shot.width}
            height={shot.height}
            openLabel={t("viewLarger")}
            closeLabel={t("closePreview")}
          >
            <Image
              src={shot.src}
              alt={alt}
              width={shot.width}
              height={shot.height}
              className="h-auto w-full bg-muted"
              sizes="(max-width: 768px) 100vw, 560px"
              onError={() => setFailed(true)}
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-foreground/20 to-transparent pb-3 pt-8 opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-sm)]">
                <Expand className="size-3.5" aria-hidden />
                {t("viewLarger")}
              </span>
            </span>
          </ImageLightbox>
        ) : (
          <div
            className="flex min-h-[11rem] flex-col items-center justify-center gap-2 px-6 py-10 text-center"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 0%, var(--hero-glow), transparent 55%), var(--muted)",
            }}
          >
            <div className="flex size-11 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border bg-surface text-primary">
              <ImageIcon className="size-5" aria-hidden />
            </div>
            <p className="max-w-xs text-sm font-medium text-foreground">{alt}</p>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              {placeholderLabel}
            </p>
          </div>
        )}
      </div>
    </figure>
  );
}
