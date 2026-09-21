/**
 * Copies packaged apps from /downloads into /public/downloads so Next can
 * serve them in `next dev` and include them in static export (`out/`).
 *
 * Important: do NOT use a root `/app` folder — Next.js treats that as the
 * App Router and would ignore `src/app` (leaving only a 404).
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "downloads");
const target = join(root, "public", "downloads");

if (!existsSync(source)) {
  console.log("sync-app-downloads: no /downloads folder — skipped");
  process.exit(0);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(dirname(target), { recursive: true });
cpSync(source, target, { recursive: true });
console.log("sync-app-downloads: copied /downloads → /public/downloads");
