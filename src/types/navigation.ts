export type NavItem = {
  id: string;
  href: string;
  labelKey: string;
  external?: boolean;
  descriptionKey?: string;
  children?: readonly NavItem[];
};

export type NavGroup = {
  id: string;
  labelKey: string;
  items: readonly NavItem[];
};

export type NavCta = {
  id: string;
  href: string;
  labelKey: string;
  /** Compact label for constrained UI (e.g. header). */
  shortLabelKey?: string;
  external?: boolean;
};
