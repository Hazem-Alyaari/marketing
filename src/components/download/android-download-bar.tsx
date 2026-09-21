"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonClassName } from "@/components/ui/button";

const DISMISS_KEY = "myschool-android-download-bar-dismissed";

type AndroidDownloadBarProps = {
  href: string;
  fileName: string;
};

function isAndroidPhone(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  if (!isAndroid) {
    return false;
  }

  // Prefer phone-like Android (exclude most desktop spoofing / wide layouts).
  const isPhoneUa = /Mobile/i.test(ua);
  const isNarrow = window.matchMedia("(max-width: 48rem)").matches;
  return isPhoneUa || isNarrow;
}

export function AndroidDownloadBar({ href, fileName }: AndroidDownloadBarProps) {
  const t = useTranslations("DownloadApp.phonePrompt");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        return;
      }
    } catch {
      // sessionStorage may be unavailable
    }

    const update = () => {
      setVisible(isAndroidPhone());
    };

    update();

    const media = window.matchMedia("(max-width: 48rem)");
    media.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.removeProperty("padding-bottom");
      return;
    }

    document.body.style.paddingBottom = "5.5rem";
    return () => {
      document.body.style.removeProperty("padding-bottom");
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label={t("ariaLabel")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 p-3 shadow-[var(--shadow-lg)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <a
          href={href}
          download={fileName}
          className={buttonClassName({
            variant: "primary",
            size: "lg",
            className: "min-w-0 flex-1",
          })}
        >
          <Download className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{t("cta")}</span>
        </a>
        <button
          type="button"
          onClick={dismiss}
          className={buttonClassName({
            variant: "ghost",
            size: "md",
            className: "shrink-0 px-2.5",
          })}
          aria-label={t("dismiss")}
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <p className="mx-auto mt-1.5 max-w-lg text-center text-[0.7rem] leading-snug text-muted-foreground">
        {t("hint")}
      </p>
    </div>
  );
}
