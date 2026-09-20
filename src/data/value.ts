import type { ValuePillarItem } from "@/types/common";

/**
 * Value pillars grounded in verified architecture:
 * unified school modules, role-based shells/permissions, and operational dashboards.
 */
export const valuePillars = [
  {
    id: "unified",
    titleKey: "pillars.unified.title",
    descriptionKey: "pillars.unified.description",
    icon: "layers",
  },
  {
    id: "roles",
    titleKey: "pillars.roles.title",
    descriptionKey: "pillars.roles.description",
    icon: "shield",
  },
  {
    id: "visibility",
    titleKey: "pillars.visibility.title",
    descriptionKey: "pillars.visibility.description",
    icon: "eye",
  },
] as const satisfies readonly ValuePillarItem[];
