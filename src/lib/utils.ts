import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefix a root-absolute public asset path with Next.js `basePath`
 * (e.g. `/marketing` on GitHub Pages). `next/image` does not always
 * do this for unoptimized static exports.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/") || path.startsWith("//")) {
    return path;
  }
  if (!base || path === base || path.startsWith(`${base}/`)) {
    return path;
  }
  return `${base}${path}`;
}
