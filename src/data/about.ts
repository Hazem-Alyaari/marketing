import type { FeatureIconId } from "@/types/feature";
import type { UserRoleIconId, ValuePillarItem } from "@/types/common";
import type { ProductScreenshotKey } from "@/lib/product-media";

export type AboutPrincipleIcon =
  | FeatureIconId
  | UserRoleIconId
  | ValuePillarItem["icon"];

export type AboutPrinciple = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: AboutPrincipleIcon;
};

export type AboutStructureStep = {
  id: string;
  titleKey: string;
  descriptionKey: string;
};

export type AboutAudience = {
  id: string;
  labelKey: string;
  icon: UserRoleIconId;
};

/**
 * Verified product principles — derived from existing platform capabilities.
 * Multi-branch is included because branch management is verified in Features/Solutions.
 * Bilingual UI is verified via ar/en product and marketing locale support.
 */
export const aboutPrinciples = [
  {
    id: "connected",
    titleKey: "principles.connected.title",
    descriptionKey: "principles.connected.description",
    icon: "layers",
  },
  {
    id: "roles",
    titleKey: "principles.roles.title",
    descriptionKey: "principles.roles.description",
    icon: "users",
  },
  {
    id: "data",
    titleKey: "principles.data.title",
    descriptionKey: "principles.data.description",
    icon: "layout-dashboard",
  },
  {
    id: "permissions",
    titleKey: "principles.permissions.title",
    descriptionKey: "principles.permissions.description",
    icon: "key-round",
  },
  {
    id: "locales",
    titleKey: "principles.locales.title",
    descriptionKey: "principles.locales.description",
    icon: "messages",
  },
  {
    id: "branches",
    titleKey: "principles.branches.title",
    descriptionKey: "principles.branches.description",
    icon: "building-2",
  },
] as const satisfies readonly AboutPrinciple[];

/** Conceptual platform organization — not a technical architecture diagram. */
export const aboutStructureSteps = [
  {
    id: "operations",
    titleKey: "structure.steps.operations.title",
    descriptionKey: "structure.steps.operations.description",
  },
  {
    id: "workspaces",
    titleKey: "structure.steps.workspaces.title",
    descriptionKey: "structure.steps.workspaces.description",
  },
  {
    id: "permissions",
    titleKey: "structure.steps.permissions.title",
    descriptionKey: "structure.steps.permissions.description",
  },
  {
    id: "portals",
    titleKey: "structure.steps.portals.title",
    descriptionKey: "structure.steps.portals.description",
  },
  {
    id: "reporting",
    titleKey: "structure.steps.reporting.title",
    descriptionKey: "structure.steps.reporting.description",
  },
] as const satisfies readonly AboutStructureStep[];

/** Compact audience list — verified Solutions roles, not a full Solutions page. */
export const aboutAudiences = [
  { id: "management", labelKey: "audiences.management", icon: "building-2" },
  { id: "teachers", labelKey: "audiences.teachers", icon: "graduation-cap" },
  {
    id: "supervisors",
    labelKey: "audiences.supervisors",
    icon: "clipboard-list",
  },
  { id: "finance", labelKey: "audiences.finance", icon: "calculator" },
  { id: "hr", labelKey: "audiences.hr", icon: "users" },
  { id: "students", labelKey: "audiences.students", icon: "book-user" },
  {
    id: "guardians",
    labelKey: "audiences.guardians",
    icon: "heart-handshake",
  },
] as const satisfies readonly AboutAudience[];

export const aboutTrustPoints = [
  {
    id: "rbac",
    titleKey: "trust.points.rbac.title",
    descriptionKey: "trust.points.rbac.description",
    icon: "key-round" as const,
  },
  {
    id: "separation",
    titleKey: "trust.points.separation.title",
    descriptionKey: "trust.points.separation.description",
    icon: "shield" as const,
  },
  {
    id: "branches",
    titleKey: "trust.points.branches.title",
    descriptionKey: "trust.points.branches.description",
    icon: "building-2" as const,
  },
] as const;

export const aboutVisuals = {
  dashboard: "dashboard" as ProductScreenshotKey,
  permissions: "permissions" as ProductScreenshotKey,
  studentPortal: "studentPortal" as ProductScreenshotKey,
};
