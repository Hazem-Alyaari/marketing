import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { withBasePath } from "@/lib/utils";

export type AppPlatformId = "android" | "mac";

export type AppDownload = {
  id: AppPlatformId;
  /** Public URL path (includes basePath when on GitHub Pages). */
  href: string;
  /** Suggested filename for the browser download attribute. */
  fileName: string;
};

const APP_ROOT = join(process.cwd(), "app");

const PLATFORM_DIRS: Record<
  AppPlatformId,
  { dir: string; extensions: readonly string[]; fileName: string }
> = {
  android: {
    dir: "android",
    extensions: [".apk", ".aab"],
    fileName: "myschool-android.apk",
  },
  mac: {
    dir: "mac",
    extensions: [".dmg", ".pkg", ".zip"],
    fileName: "myschool-mac.zip",
  },
};

function findPackageFile(
  dirName: string,
  extensions: readonly string[],
): string | null {
  const dir = join(APP_ROOT, dirName);
  if (!existsSync(dir)) {
    return null;
  }

  const match = readdirSync(dir).find((name) =>
    extensions.some((ext) => name.toLowerCase().endsWith(ext)),
  );

  return match ?? null;
}

/**
 * Discovers downloadable packages under `/app/<platform>/`.
 * Empty / missing folders are omitted — the UI only shows ready platforms.
 */
export function getAvailableAppDownloads(): AppDownload[] {
  const downloads: AppDownload[] = [];

  for (const id of Object.keys(PLATFORM_DIRS) as AppPlatformId[]) {
    const platform = PLATFORM_DIRS[id];
    const file = findPackageFile(platform.dir, platform.extensions);
    if (!file) {
      continue;
    }

    downloads.push({
      id,
      href: withBasePath(`/app/${platform.dir}/${file}`),
      fileName: platform.fileName,
    });
  }

  return downloads;
}

export function hasAppDownloads(): boolean {
  return getAvailableAppDownloads().length > 0;
}

/** Android APK entry when present — used by the phone-only install prompt. */
export function getAndroidAppDownload(): AppDownload | null {
  return getAvailableAppDownloads().find((item) => item.id === "android") ?? null;
}
