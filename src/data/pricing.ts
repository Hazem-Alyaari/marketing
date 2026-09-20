/**
 * Locale-independent Pricing page structure.
 * No numeric prices — commercial model is first-year free + flexible continuation.
 */

import type { ContactInquiryType } from "@/lib/contact/types";

export type PricingJourneyCta =
  | { type: "demo"; labelKey: string }
  | {
      type: "contact";
      labelKey: string;
      inquiryType: ContactInquiryType;
    };

export type PricingJourneyStage = {
  id: "demo" | "firstYear" | "after";
  number: "01" | "02" | "03";
  icon: "eye" | "school" | "handshake";
  labelKey: string;
  titleKey: string;
  points: readonly { id: string; labelKey: string }[];
  cta: PricingJourneyCta;
  emphasized?: boolean;
  badgeKey?: string;
};

export type PricingSupportItem = {
  id: string;
  icon: "wrench" | "messages" | "lightbulb";
  titleKey: string;
  descriptionKey: string;
};

export type PricingDiscussItem = {
  id: string;
  labelKey: string;
};

/** Explore → Adopt → Continue journey. */
export const pricingJourneyStages = [
  {
    id: "demo",
    number: "01",
    icon: "eye",
    labelKey: "journey.demo.label",
    titleKey: "journey.demo.title",
    points: [
      { id: "direct", labelKey: "journey.demo.points.direct" },
      { id: "explore", labelKey: "journey.demo.points.explore" },
      { id: "noYear", labelKey: "journey.demo.points.noYear" },
    ],
    cta: { type: "demo", labelKey: "journey.demo.cta" },
    emphasized: false,
    badgeKey: undefined,
  },
  {
    id: "firstYear",
    number: "02",
    icon: "school",
    labelKey: "journey.firstYear.label",
    titleKey: "journey.firstYear.title",
    points: [
      { id: "noFee", labelKey: "journey.firstYear.points.noFee" },
      { id: "real", labelKey: "journey.firstYear.points.real" },
      { id: "time", labelKey: "journey.firstYear.points.time" },
    ],
    cta: {
      type: "contact",
      labelKey: "journey.firstYear.cta",
      inquiryType: "firstYear",
    },
    emphasized: true,
    badgeKey: "journey.firstYear.badge",
  },
  {
    id: "after",
    number: "03",
    icon: "handshake",
    labelKey: "journey.after.label",
    titleKey: "journey.after.title",
    points: [
      { id: "commercial", labelKey: "journey.after.points.commercial" },
      { id: "discuss", labelKey: "journey.after.points.discuss" },
      { id: "flexible", labelKey: "journey.after.points.flexible" },
    ],
    cta: {
      type: "contact",
      labelKey: "journey.after.cta",
      inquiryType: "commercial",
    },
    emphasized: false,
    badgeKey: undefined,
  },
] as const satisfies readonly PricingJourneyStage[];

/** Continuous support & product development after adoption. */
export const pricingSupportItems = [
  {
    id: "problems",
    icon: "wrench",
    titleKey: "support.items.problems.title",
    descriptionKey: "support.items.problems.description",
  },
  {
    id: "feedback",
    icon: "messages",
    titleKey: "support.items.feedback.title",
    descriptionKey: "support.items.feedback.description",
  },
  {
    id: "features",
    icon: "lightbulb",
    titleKey: "support.items.features.title",
    descriptionKey: "support.items.features.description",
  },
] as const satisfies readonly PricingSupportItem[];

/** Discussion factors for post-year continuation — not a pricing calculator. */
export const pricingDiscussItems = [
  { id: "size", labelKey: "after.discuss.size" },
  { id: "branches", labelKey: "after.discuss.branches" },
  { id: "capabilities", labelKey: "after.discuss.capabilities" },
  { id: "scope", labelKey: "after.discuss.scope" },
  { id: "support", labelKey: "after.discuss.support" },
] as const satisfies readonly PricingDiscussItem[];

/**
 * FAQ item ids shown on the Pricing page (must exist in faqItems).
 * Shared source with /faq so answers stay consistent.
 */
export const pricingFaqPreviewIds = [
  "is-myschool-free",
  "first-year-fees",
  "pay-before-demo",
  "demo-vs-first-year",
  "after-first-year",
  "how-subscription-determined",
  "try-before-school-use",
  "branches",
  "finance",
  "hr",
  "portals",
  "problem-support",
  "feature-requests",
  "how-start-first-year",
] as const;
