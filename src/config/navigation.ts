import type { NavCta, NavGroup, NavItem } from "@/types/navigation";

/**
 * Canonical locale-independent internal routes.
 * next-intl adds the locale prefix at link/navigation time.
 */
export const routes = {
  home: "/",
  features: "/features",
  solutions: "/solutions",
  pricing: "/pricing",
  about: "/about",
  blog: "/blog",
  faq: "/faq",
  contact: "/contact",
  /** Branded marketing entry that opens the public demo (hides the raw demo host). */
  demo: "/demo",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

const home = {
  id: "home",
  href: routes.home,
  labelKey: "home",
} as const satisfies NavItem;

const features = {
  id: "features",
  href: routes.features,
  labelKey: "features",
} as const satisfies NavItem;

const solutions = {
  id: "solutions",
  href: routes.solutions,
  labelKey: "solutions",
} as const satisfies NavItem;

const pricing = {
  id: "pricing",
  href: routes.pricing,
  labelKey: "pricing",
} as const satisfies NavItem;

const about = {
  id: "about",
  href: routes.about,
  labelKey: "about",
} as const satisfies NavItem;

const blog = {
  id: "blog",
  href: routes.blog,
  labelKey: "blog",
} as const satisfies NavItem;

const faq = {
  id: "faq",
  href: routes.faq,
  labelKey: "faq",
} as const satisfies NavItem;

const contact = {
  id: "contact",
  href: routes.contact,
  labelKey: "contact",
} as const satisfies NavItem;

/** Shared item definitions — reuse across main/footer to avoid duplicated hrefs. */
export const navItems = {
  home,
  features,
  solutions,
  pricing,
  about,
  blog,
  faq,
  contact,
} as const;

export const mainNavigation = [
  navItems.home,
  navItems.features,
  navItems.solutions,
  navItems.pricing,
  navItems.about,
  navItems.blog,
  navItems.faq,
  navItems.contact,
] as const satisfies readonly NavItem[];

export const footerNavigation = {
  product: {
    id: "product",
    labelKey: "footer.product",
    items: [navItems.features, navItems.solutions, navItems.pricing],
  },
  company: {
    id: "company",
    labelKey: "footer.company",
    items: [navItems.about, navItems.contact],
  },
  resources: {
    id: "resources",
    labelKey: "footer.resources",
    items: [navItems.blog, navItems.faq],
  },
} as const satisfies Record<string, NavGroup>;

export const footerNavigationGroups = [
  footerNavigation.product,
  footerNavigation.company,
  footerNavigation.resources,
] as const satisfies readonly NavGroup[];

/**
 * Header / mobile action links.
 * - login → siteConfig.appUrl (normal product entry; empty when unset)
 * - tryDemo → internal `/demo` launch page (only when NEXT_PUBLIC_DEMO_URL is set)
 * login stays an external origin; tryDemo is locale-routed via next-intl.
 */
export const actionNavigation = {
  login: {
    id: "login",
    href: siteConfig.appUrl,
    labelKey: "login",
    external: true,
  },
  tryDemo: {
    id: "tryDemo",
    href: routes.demo,
    labelKey: "tryDemo",
    shortLabelKey: "tryDemoShort",
    external: false,
  },
} as const satisfies Record<string, NavCta>;

/** Convenience aliases for existing layout imports. Prefer actionNavigation.*. */
export const loginLink = actionNavigation.login;
export const primaryCta = actionNavigation.tryDemo;
