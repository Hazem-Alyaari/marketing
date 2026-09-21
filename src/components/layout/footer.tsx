import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { footerNavigationGroups } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SiteWordmark } from "@/components/ui/site-wordmark";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";

export async function Footer() {
  const tNav = await getTranslations("Navigation");
  const tFooter = await getTranslations("Footer");
  const year = new Date().getFullYear();

  const contactEmail = siteConfig.contact.email;
  const contactPhone = siteConfig.contact.phone;
  const contactWhatsapp = siteConfig.contact.whatsapp;

  return (
    <footer className="mt-auto border-t border-border bg-muted/50">
      <Container className="py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] md:gap-10">
          <div className="max-w-sm space-y-4">
            <SiteWordmark />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tFooter("description")}
            </p>
            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {contactEmail}
              </a>
            ) : null}
            {contactPhone ? (
              <a
                href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                dir="ltr"
              >
                {contactPhone}
              </a>
            ) : null}
            {contactWhatsapp ? (
              <a
                href={contactWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {tFooter("whatsapp")}
              </a>
            ) : null}
            <LocaleSwitcher compact />
          </div>

          {footerNavigationGroups.map((group) => (
            <nav
              key={group.id}
              className="space-y-3"
              aria-label={tNav(group.labelKey)}
            >
              <p className="text-xs font-semibold tracking-wide text-foreground uppercase">
                {tNav(group.labelKey)}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => {
                  const isExternal = "external" in item && item.external;

                  return (
                    <li key={item.id}>
                      {isExternal ? (
                        <a
                          href={item.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {tNav(item.labelKey)}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {tNav(item.labelKey)}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. {tFooter("rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
