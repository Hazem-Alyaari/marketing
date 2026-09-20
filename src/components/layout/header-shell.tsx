"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeaderShellProps = {
  children: ReactNode;
};

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrollSnapshot() {
  return window.scrollY > 8;
}

function getServerScrollSnapshot() {
  return false;
}

/**
 * Sticky header chrome with a subtle scrolled surface.
 */
export function HeaderShell({ children }: HeaderShellProps) {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-200 ease-out",
        scrolled
          ? "border-b border-border bg-background/95 shadow-[var(--shadow-sm)] backdrop-blur-md"
          : "border-b border-transparent bg-background/75 backdrop-blur-[2px]",
      )}
    >
      {children}
    </header>
  );
}
