/**
 * Copies packaged apps from /app into /public/app so Next can serve them
 * in `next dev` and include them in static export (`out/`).
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "app");
const target = join(root, "public", "app");

if (!existsSync(source)) {
  console.log("sync-app-downloads: no /app folder — skipped");
  process.exit(0);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(dirname(target), { recursive: true });
cpSync(source, target, { recursive: true });
console.log("sync-app-downloads: copied /app → /public/app");
