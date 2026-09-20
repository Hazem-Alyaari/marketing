import type { AppRoute } from "@/config/navigation";

export const FAQ_CATEGORIES = [
  "general",
  "demo",
  "features",
  "permissions",
  "deployment",
  "commercial",
] as const;

export type FaqCategoryId = (typeof FAQ_CATEGORIES)[number];

export type FaqRelatedLink =
  | {
      type: "route";
      href: AppRoute;
      labelKey: string;
    }
  | {
      type: "demo";
      labelKey: string;
    };

export type FaqItem = {
  id: string;
  category: FaqCategoryId;
  questionKey: string;
  answerKey: string;
  related?: FaqRelatedLink;
};

export type FaqCategory = {
  id: FaqCategoryId;
  labelKey: string;
};
