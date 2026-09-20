"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
  className?: string;
};

/**
 * Lightweight accessible image lightbox — no third-party gallery dependency.
 */
export function ImageLightbox({
  src,
  alt,
  width,
  height,
  openLabel,
  closeLabel,
  children,
  className,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "group/preview relative block w-full cursor-zoom-in text-start",
          "rounded-b-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={openLabel}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
              role="presentation"
            >
              <button
                type="button"
                className="absolute inset-0 bg-foreground/55 backdrop-blur-[2px]"
                aria-label={closeLabel}
                onClick={close}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative z-10 flex max-h-[min(100dvh-1.5rem,56rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background shadow-[var(--shadow-lg)]"
              >
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                  <p
                    id={titleId}
                    className="truncate text-sm font-medium text-foreground"
                  >
                    {alt}
                  </p>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={closeLabel}
                  >
                    <X className="size-5" aria-hidden />
                  </button>
                </div>
                <div className="overflow-auto overscroll-contain bg-muted/40 p-2 sm:p-4">
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="mx-auto h-auto w-full max-w-none"
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    priority
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
