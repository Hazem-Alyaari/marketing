import type { SolutionAudience } from "@/types/solution";

/**
 * Verified MySchool solution audiences for the marketing Solutions page.
 * Organized by role / operational need — not a second feature catalog.
 * relatedFeatureAnchors map to Features page section IDs.
 */
export const solutionAudiences = [
  {
    id: "management",
    anchor: "management",
    shortKey: "audiences.management.short",
    titleKey: "audiences.management.title",
    problemKey: "audiences.management.problem",
    approachKey: "audiences.management.approach",
    icon: "building-2",
    screenshotKey: "dashboard",
    screenshotAltKey: "audiences.management.screenshotAlt",
    relatedFeatureAnchors: [
      "portals-admin",
      "students-admissions",
      "finance-accounting",
      "human-resources",
    ],
    highlights: [
      {
        id: "dashboard",
        titleKey: "audiences.management.highlights.dashboard.title",
        descriptionKey: "audiences.management.highlights.dashboard.description",
        icon: "layout-dashboard",
      },
      {
        id: "visibility",
        titleKey: "audiences.management.highlights.visibility.title",
        descriptionKey:
          "audiences.management.highlights.visibility.description",
        icon: "eye",
      },
      {
        id: "permissions",
        titleKey: "audiences.management.highlights.permissions.title",
        descriptionKey:
          "audiences.management.highlights.permissions.description",
        icon: "key-round",
      },
      {
        id: "branches",
        titleKey: "audiences.management.highlights.branches.title",
        descriptionKey: "audiences.management.highlights.branches.description",
        icon: "building-2",
      },
    ],
  },
  {
    id: "teachers",
    anchor: "teachers",
    shortKey: "audiences.teachers.short",
    titleKey: "audiences.teachers.title",
    problemKey: "audiences.teachers.problem",
    approachKey: "audiences.teachers.approach",
    icon: "graduation-cap",
    screenshotKey: "academics",
    screenshotAltKey: "audiences.teachers.screenshotAlt",
    relatedFeatureAnchors: ["academics", "attendance-assessment"],
    highlights: [
      {
        id: "classroom",
        titleKey: "audiences.teachers.highlights.classroom.title",
        descriptionKey: "audiences.teachers.highlights.classroom.description",
        icon: "school",
      },
      {
        id: "attendance",
        titleKey: "audiences.teachers.highlights.attendance.title",
        descriptionKey: "audiences.teachers.highlights.attendance.description",
        icon: "clipboard-list",
      },
      {
        id: "grades",
        titleKey: "audiences.teachers.highlights.grades.title",
        descriptionKey: "audiences.teachers.highlights.grades.description",
        icon: "clipboard-check",
      },
      {
        id: "self-service",
        titleKey: "audiences.teachers.highlights.selfService.title",
        descriptionKey: "audiences.teachers.highlights.selfService.description",
        icon: "user-cog",
      },
    ],
  },
  {
    id: "supervision",
    anchor: "supervision",
    shortKey: "audiences.supervision.short",
    titleKey: "audiences.supervision.title",
    problemKey: "audiences.supervision.problem",
    approachKey: "audiences.supervision.approach",
    icon: "clipboard-list",
    screenshotKey: "supervision",
    screenshotAltKey: "audiences.supervision.screenshotAlt",
    relatedFeatureAnchors: ["educational-supervision"],
    highlights: [
      {
        id: "evaluations",
        titleKey: "audiences.supervision.highlights.evaluations.title",
        descriptionKey:
          "audiences.supervision.highlights.evaluations.description",
        icon: "clipboard-check",
      },
      {
        id: "visits",
        titleKey: "audiences.supervision.highlights.visits.title",
        descriptionKey: "audiences.supervision.highlights.visits.description",
        icon: "school",
      },
      {
        id: "feedback",
        titleKey: "audiences.supervision.highlights.feedback.title",
        descriptionKey: "audiences.supervision.highlights.feedback.description",
        icon: "messages",
      },
      {
        id: "follow-up",
        titleKey: "audiences.supervision.highlights.followUp.title",
        descriptionKey: "audiences.supervision.highlights.followUp.description",
        icon: "eye",
      },
    ],
  },
  {
    id: "finance",
    anchor: "finance",
    shortKey: "audiences.finance.short",
    titleKey: "audiences.finance.title",
    problemKey: "audiences.finance.problem",
    approachKey: "audiences.finance.approach",
    icon: "wallet",
    screenshotKey: "finance",
    screenshotAltKey: "audiences.finance.screenshotAlt",
    relatedFeatureAnchors: ["finance-accounting"],
    highlights: [
      {
        id: "fees",
        titleKey: "audiences.finance.highlights.fees.title",
        descriptionKey: "audiences.finance.highlights.fees.description",
        icon: "receipt",
      },
      {
        id: "collections",
        titleKey: "audiences.finance.highlights.collections.title",
        descriptionKey: "audiences.finance.highlights.collections.description",
        icon: "wallet",
      },
      {
        id: "accounting",
        titleKey: "audiences.finance.highlights.accounting.title",
        descriptionKey: "audiences.finance.highlights.accounting.description",
        icon: "landmark",
      },
      {
        id: "payroll",
        titleKey: "audiences.finance.highlights.payroll.title",
        descriptionKey: "audiences.finance.highlights.payroll.description",
        icon: "calculator",
      },
    ],
  },
  {
    id: "hr",
    anchor: "hr",
    shortKey: "audiences.hr.short",
    titleKey: "audiences.hr.title",
    problemKey: "audiences.hr.problem",
    approachKey: "audiences.hr.approach",
    icon: "briefcase",
    screenshotKey: "hr",
    screenshotAltKey: "audiences.hr.screenshotAlt",
    relatedFeatureAnchors: ["human-resources"],
    highlights: [
      {
        id: "employees",
        titleKey: "audiences.hr.highlights.employees.title",
        descriptionKey: "audiences.hr.highlights.employees.description",
        icon: "users",
      },
      {
        id: "attendance",
        titleKey: "audiences.hr.highlights.attendance.title",
        descriptionKey: "audiences.hr.highlights.attendance.description",
        icon: "clipboard-list",
      },
      {
        id: "leave",
        titleKey: "audiences.hr.highlights.leave.title",
        descriptionKey: "audiences.hr.highlights.leave.description",
        icon: "calendar-days",
      },
      {
        id: "recruitment",
        titleKey: "audiences.hr.highlights.recruitment.title",
        descriptionKey: "audiences.hr.highlights.recruitment.description",
        icon: "user-plus",
      },
    ],
  },
  {
    id: "students",
    anchor: "students",
    shortKey: "audiences.students.short",
    titleKey: "audiences.students.title",
    problemKey: "audiences.students.problem",
    approachKey: "audiences.students.approach",
    icon: "book-user",
    screenshotKey: "studentPortal",
    screenshotAltKey: "audiences.students.screenshotAlt",
    relatedFeatureAnchors: ["students-admissions", "attendance-assessment"],
    highlights: [
      {
        id: "schedule",
        titleKey: "audiences.students.highlights.schedule.title",
        descriptionKey: "audiences.students.highlights.schedule.description",
        icon: "calendar-days",
      },
      {
        id: "homework",
        titleKey: "audiences.students.highlights.homework.title",
        descriptionKey: "audiences.students.highlights.homework.description",
        icon: "pen-line",
      },
      {
        id: "grades",
        titleKey: "audiences.students.highlights.grades.title",
        descriptionKey: "audiences.students.highlights.grades.description",
        icon: "clipboard-check",
      },
      {
        id: "documents",
        titleKey: "audiences.students.highlights.documents.title",
        descriptionKey: "audiences.students.highlights.documents.description",
        icon: "file-badge",
      },
    ],
  },
  {
    id: "guardians",
    anchor: "guardians",
    shortKey: "audiences.guardians.short",
    titleKey: "audiences.guardians.title",
    problemKey: "audiences.guardians.problem",
    approachKey: "audiences.guardians.approach",
    icon: "heart-handshake",
    screenshotKey: "guardianPortal",
    screenshotAltKey: "audiences.guardians.screenshotAlt",
    relatedFeatureAnchors: ["students-admissions", "communication-operations"],
    highlights: [
      {
        id: "follow-up",
        titleKey: "audiences.guardians.highlights.followUp.title",
        descriptionKey: "audiences.guardians.highlights.followUp.description",
        icon: "eye",
      },
      {
        id: "attendance",
        titleKey: "audiences.guardians.highlights.attendance.title",
        descriptionKey: "audiences.guardians.highlights.attendance.description",
        icon: "clipboard-list",
      },
      {
        id: "finance",
        titleKey: "audiences.guardians.highlights.finance.title",
        descriptionKey: "audiences.guardians.highlights.finance.description",
        icon: "wallet",
      },
      {
        id: "communication",
        titleKey: "audiences.guardians.highlights.communication.title",
        descriptionKey:
          "audiences.guardians.highlights.communication.description",
        icon: "messages",
      },
    ],
  },
] as const satisfies readonly SolutionAudience[];

/** Permission / RBAC trust points — verified role-permission model only. */
export const solutionTrustPoints = [
  {
    id: "roles",
    titleKey: "trust.points.roles.title",
    descriptionKey: "trust.points.roles.description",
    icon: "users" as const,
  },
  {
    id: "permissions",
    titleKey: "trust.points.permissions.title",
    descriptionKey: "trust.points.permissions.description",
    icon: "key-round" as const,
  },
  {
    id: "workspaces",
    titleKey: "trust.points.workspaces.title",
    descriptionKey: "trust.points.workspaces.description",
    icon: "layout-dashboard" as const,
  },
] as const;
