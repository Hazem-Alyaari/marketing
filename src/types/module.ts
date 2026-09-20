export type ModuleIconId =
  | "graduation-cap"
  | "book-open"
  | "clipboard-check"
  | "wallet"
  | "briefcase"
  | "messages";

export type ModuleItem = {
  id: string;
  /** Translation key for the full module title. */
  nameKey: string;
  /** Translation key for the short card title. */
  shortKey: string;
  /** Translation key for the card description. */
  descriptionKey: string;
  /** Lucide icon identifier — mapped in the UI layer. */
  icon: ModuleIconId;
  /** Optional internal route (locale-aware via next-intl Link). */
  href?: string;
};
