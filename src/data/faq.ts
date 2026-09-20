import type { FaqCategory, FaqItem } from "@/types/faq";
import { FAQ_CATEGORIES } from "@/types/faq";
import { routes } from "@/config/navigation";

/**
 * Locale-independent FAQ catalog.
 * Copy lives in messages under Faq.items.* and Faq.categories.*.
 * Only include questions with verified, non-invented answers.
 */
export const faqCategories: readonly FaqCategory[] = FAQ_CATEGORIES.map((id) => ({
  id,
  labelKey: `categories.${id}`,
}));

export const faqItems = [
  {
    id: "what-is-myschool",
    category: "general",
    questionKey: "items.whatIs.question",
    answerKey: "items.whatIs.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "who-is-it-for",
    category: "general",
    questionKey: "items.whoFor.question",
    answerKey: "items.whoFor.answer",
    related: {
      type: "route",
      href: routes.solutions,
      labelKey: "related.solutions",
    },
  },
  {
    id: "arabic-english",
    category: "general",
    questionKey: "items.locales.question",
    answerKey: "items.locales.answer",
  },
  {
    id: "try-before-contact",
    category: "demo",
    questionKey: "items.tryBeforeContact.question",
    answerKey: "items.tryBeforeContact.answer",
    related: { type: "demo", labelKey: "related.demo" },
  },
  {
    id: "demo-free",
    category: "demo",
    questionKey: "items.demoFree.question",
    answerKey: "items.demoFree.answer",
    related: { type: "demo", labelKey: "related.demo" },
  },
  {
    id: "demo-account",
    category: "demo",
    questionKey: "items.demoAccount.question",
    answerKey: "items.demoAccount.answer",
    related: { type: "demo", labelKey: "related.demo" },
  },
  {
    id: "demo-not-production",
    category: "demo",
    questionKey: "items.demoNotProduction.question",
    answerKey: "items.demoNotProduction.answer",
  },
  {
    id: "student-management",
    category: "features",
    questionKey: "items.students.question",
    answerKey: "items.students.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "attendance",
    category: "features",
    questionKey: "items.attendance.question",
    answerKey: "items.attendance.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "finance",
    category: "features",
    questionKey: "items.finance.question",
    answerKey: "items.finance.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "hr",
    category: "features",
    questionKey: "items.hr.question",
    answerKey: "items.hr.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "supervision",
    category: "features",
    questionKey: "items.supervision.question",
    answerKey: "items.supervision.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "student-portal",
    category: "features",
    questionKey: "items.studentPortal.question",
    answerKey: "items.studentPortal.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "guardian-portal",
    category: "features",
    questionKey: "items.guardianPortal.question",
    answerKey: "items.guardianPortal.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "portals",
    category: "features",
    questionKey: "items.portals.question",
    answerKey: "items.portals.answer",
    related: {
      type: "route",
      href: routes.features,
      labelKey: "related.features",
    },
  },
  {
    id: "separated-experiences",
    category: "permissions",
    questionKey: "items.separated.question",
    answerKey: "items.separated.answer",
    related: {
      type: "route",
      href: routes.solutions,
      labelKey: "related.solutions",
    },
  },
  {
    id: "permissions",
    category: "permissions",
    questionKey: "items.permissions.question",
    answerKey: "items.permissions.answer",
    related: {
      type: "route",
      href: routes.solutions,
      labelKey: "related.solutions",
    },
  },
  {
    id: "branches",
    category: "permissions",
    questionKey: "items.branches.question",
    answerKey: "items.branches.answer",
  },
  {
    id: "deployment",
    category: "deployment",
    questionKey: "items.deployment.question",
    answerKey: "items.deployment.answer",
    related: {
      type: "route",
      href: routes.contact,
      labelKey: "related.contact",
    },
  },
  {
    id: "how-to-contact",
    category: "commercial",
    questionKey: "items.contact.question",
    answerKey: "items.contact.answer",
    related: {
      type: "route",
      href: routes.contact,
      labelKey: "related.contact",
    },
  },
  {
    id: "is-myschool-free",
    category: "commercial",
    questionKey: "items.isFree.question",
    answerKey: "items.isFree.answer",
    related: {
      type: "route",
      href: routes.pricing,
      labelKey: "related.pricing",
    },
  },
  {
    id: "first-year-fees",
    category: "commercial",
    questionKey: "items.firstYearFees.question",
    answerKey: "items.firstYearFees.answer",
    related: {
      type: "route",
      href: routes.pricing,
      labelKey: "related.pricing",
    },
  },
  {
    id: "pay-before-demo",
    category: "commercial",
    questionKey: "items.payBeforeDemo.question",
    answerKey: "items.payBeforeDemo.answer",
    related: { type: "demo", labelKey: "related.demo" },
  },
  {
    id: "demo-vs-first-year",
    category: "commercial",
    questionKey: "items.demoVsFirstYear.question",
    answerKey: "items.demoVsFirstYear.answer",
    related: {
      type: "route",
      href: routes.pricing,
      labelKey: "related.pricing",
    },
  },
  {
    id: "after-first-year",
    category: "commercial",
    questionKey: "items.afterFirstYear.question",
    answerKey: "items.afterFirstYear.answer",
    related: {
      type: "route",
      href: routes.contact,
      labelKey: "related.contact",
    },
  },
  {
    id: "how-subscription-determined",
    category: "commercial",
    questionKey: "items.howSubscription.question",
    answerKey: "items.howSubscription.answer",
    related: {
      type: "route",
      href: routes.contact,
      labelKey: "related.contact",
    },
  },
  {
    id: "try-before-school-use",
    category: "commercial",
    questionKey: "items.tryBeforeSchool.question",
    answerKey: "items.tryBeforeSchool.answer",
    related: { type: "demo", labelKey: "related.demo" },
  },
  {
    id: "problem-support",
    category: "commercial",
    questionKey: "items.problemSupport.question",
    answerKey: "items.problemSupport.answer",
    related: {
      type: "route",
      href: routes.contact,
      labelKey: "related.contact",
    },
  },
  {
    id: "feature-requests",
    category: "commercial",
    questionKey: "items.featureRequests.question",
    answerKey: "items.featureRequests.answer",
    related: {
      type: "route",
      href: routes.contact,
      labelKey: "related.contact",
    },
  },
  {
    id: "how-start-first-year",
    category: "commercial",
    questionKey: "items.howStartFirstYear.question",
    answerKey: "items.howStartFirstYear.answer",
    related: {
      type: "route",
      href: routes.contact,
      labelKey: "related.contact",
    },
  },
] as const satisfies readonly FaqItem[];

export function getFaqItemsByCategory(category: FaqItem["category"]) {
  return faqItems.filter((item) => item.category === category);
}
