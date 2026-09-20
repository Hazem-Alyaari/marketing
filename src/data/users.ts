import type { UserTypeItem } from "@/types/common";

/**
 * Verified school personas from Identity / TenantRole / SchoolUserRoleKeys
 * and dedicated UI shells (school, teacher, student, guardian, academic-supervision).
 * Platform ADMIN is intentionally omitted — it is an operator role, not a school user.
 */
export const users = [
  {
    id: "administration",
    nameKey: "administration.title",
    descriptionKey: "administration.description",
    icon: "building-2",
  },
  {
    id: "teachers",
    nameKey: "teachers.title",
    descriptionKey: "teachers.description",
    icon: "graduation-cap",
  },
  {
    id: "supervisors",
    nameKey: "supervisors.title",
    descriptionKey: "supervisors.description",
    icon: "clipboard-list",
  },
  {
    id: "accountants",
    nameKey: "accountants.title",
    descriptionKey: "accountants.description",
    icon: "calculator",
  },
  {
    id: "hr",
    nameKey: "hr.title",
    descriptionKey: "hr.description",
    icon: "users",
  },
  {
    id: "students",
    nameKey: "students.title",
    descriptionKey: "students.description",
    icon: "book-user",
  },
  {
    id: "guardians",
    nameKey: "guardians.title",
    descriptionKey: "guardians.description",
    icon: "heart-handshake",
  },
] as const satisfies readonly UserTypeItem[];
