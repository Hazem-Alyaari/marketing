import type { Article } from "@/types/blog";
import { arChooseSchoolManagementSoftware } from "@/content/blog/ar/choose-school-management-software";
import { arDigitalSupervision } from "@/content/blog/ar/digital-supervision";
import { arSchoolFeesAccounting } from "@/content/blog/ar/school-fees-accounting";
import { arSchoolHr } from "@/content/blog/ar/school-hr";
import { arSchoolManagementSystemGuide } from "@/content/blog/ar/school-management-system-guide";
import { arStudentAttendanceDigital } from "@/content/blog/ar/student-attendance-digital";
import { enChooseSchoolManagementSoftware } from "@/content/blog/en/choose-school-management-software";
import { enDigitalSupervision } from "@/content/blog/en/digital-supervision";
import { enSchoolFeesAccounting } from "@/content/blog/en/school-fees-accounting";
import { enSchoolHr } from "@/content/blog/en/school-hr";
import { enSchoolManagementSystemGuide } from "@/content/blog/en/school-management-system-guide";
import { enStudentAttendanceDigital } from "@/content/blog/en/student-attendance-digital";

/**
 * Repository-owned article catalog.
 * Add new articles here after creating their content files.
 */
export const allArticles: readonly Article[] = [
  arSchoolManagementSystemGuide,
  arChooseSchoolManagementSoftware,
  arStudentAttendanceDigital,
  arSchoolFeesAccounting,
  arSchoolHr,
  arDigitalSupervision,
  enSchoolManagementSystemGuide,
  enChooseSchoolManagementSoftware,
  enStudentAttendanceDigital,
  enSchoolFeesAccounting,
  enSchoolHr,
  enDigitalSupervision,
];
