import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Static hosts (e.g. GitHub Pages) do not run next-intl middleware/proxy.
 * A root page keeps `/` working by sending visitors to the default locale.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
