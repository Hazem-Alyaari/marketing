import { withBasePath } from "@/lib/utils";

type BlogSlugRedirectProps = {
  locale: string;
  href: string;
};

/**
 * Static-host friendly redirect (GitHub Pages has no server redirects).
 * `href` is a locale-relative path like `/blog/my-slug`.
 */
export function BlogSlugRedirect({ locale, href }: BlogSlugRedirectProps) {
  const target = withBasePath(`/${locale}${href.endsWith("/") ? href : `${href}/`}`);

  return (
    <main id="main-content" className="mx-auto max-w-lg px-4 py-16 text-center">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <p className="text-sm text-muted-foreground">
        <a href={target} className="font-medium text-primary underline-offset-4 hover:underline">
          Continue to article
        </a>
      </p>
    </main>
  );
}
