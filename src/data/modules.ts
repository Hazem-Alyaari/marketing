import { routes } from "@/config/navigation";
import type { ModuleItem } from "@/types/module";

/**
 * Verified MySchool product domains grouped for the marketing homepage.
 * Every group maps to routes/controllers present in the product repository.
 * Do not add items that cannot be traced to the Angular app or Backend.
 */
export const modules = [
  {
    id: "students-family",
    nameKey: "studentsFamily.title",
    shortKey: "studentsFamily.short",
    descriptionKey: "studentsFamily.description",
    icon: "graduation-cap",
    href: routes.features,
  },
  {
    id: "academics",
    nameKey: "academics.title",
    shortKey: "academics.short",
    descriptionKey: "academics.description",
    icon: "book-open",
    href: routes.features,
  },
  {
    id: "assessment",
    nameKey: "assessment.title",
    shortKey: "assessment.short",
    descriptionKey: "assessment.description",
    icon: "clipboard-check",
    href: routes.features,
  },
  {
    id: "finance",
    nameKey: "finance.title",
    shortKey: "finance.short",
    descriptionKey: "finance.description",
    icon: "wallet",
    href: routes.features,
  },
  {
    id: "hr-supervision",
    nameKey: "hrSupervision.title",
    shortKey: "hrSupervision.short",
    descriptionKey: "hrSupervision.description",
    icon: "briefcase",
    href: routes.features,
  },
  {
    id: "operations",
    nameKey: "operations.title",
    shortKey: "operations.short",
    descriptionKey: "operations.description",
    icon: "messages",
    href: routes.features,
  },
] as const satisfies readonly ModuleItem[];
