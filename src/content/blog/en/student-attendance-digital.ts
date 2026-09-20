import type { Article } from "@/types/blog";
import { callout, h2, h3, internal, ol, p, t, ul } from "@/content/blog/_helpers";

export const enStudentAttendanceDigital: Article = {
  id: "en-student-attendance-digital",
  translationId: "student-attendance-digital",
  locale: "en",
  slug: "student-attendance-from-paper-to-digital",
  title: "Student Attendance: From Paper Registers to Digital Follow-up",
  description:
    "How schools move from paper attendance registers to digital workflows that support daily recording, leadership visibility, and family communication.",
  excerpt:
    "A practical path from paper attendance to connected digital follow-up.",
  category: "attendance-assessment",
  publishedAt: "2026-03-14",
  updatedAt: "2026-03-14",
  readingTimeMinutes: 7,
  image: {
    src: "attendance",
    alt: "Digital attendance and assessment tools",
  },
  relatedIds: [
    "en-school-management-system-guide",
    "en-school-fees-accounting",
    "en-digital-supervision",
  ],
  seo: {
    primaryKeyword: "school attendance software",
    secondaryKeywords: [
      "student attendance system",
      "digital attendance school",
      "track student absences",
    ],
    searchIntent: "informational — digitize school attendance",
  },
  body: [
    p(
      t(
        "Attendance is more than a daily mark. It is an early signal of student engagement, classroom follow-up quality, and how quickly a school can involve families when absences repeat.",
      ),
    ),

    h2("paper-limits", "Limits of paper registers"),
    ul(
      "Slow weekly or monthly rollups",
      "Late manual review of absence patterns",
      "Weak connection between absences and family outreach",
      "Inconsistent records between teachers and administration",
    ),

    h2("digital-meaning", "What “digital attendance” should mean"),
    p(
      t(
        "Successful digitization is not a screen that copies a paper book. It is a workflow: record in class, store against the student record, surface patterns to authorized roles, and communicate with families when needed.",
      ),
    ),
    h3("daily", "Daily classroom level"),
    p(t("Teachers record attendance with minimal friction inside their normal tools.")),
    h3("school", "School level"),
    p(
      t(
        "Leadership can see patterns across classes and students who need earlier intervention.",
      ),
    ),

    h2("workflow", "A clear attendance workflow"),
    ol(
      "Record attendance for the class or school day",
      "Store it with the student academic record",
      "Expose it to authorized roles only",
      "Follow repeated absences with an agreed internal process",
      "Notify families through the approved channel when required",
    ),
    p(
      t("In connected platforms, attendance sits inside "),
      internal("/features", "attendance and assessment", "attendance-assessment"),
      t(" rather than as an orphan tool."),
    ),

    h2("families", "Guardian visibility with care"),
    p(
      t(
        "When guardians can view attendance in a dedicated portal, routine questions drop and home follow-up improves — provided access rights stay precise.",
      ),
    ),
    callout([
      t(
        "The aim is responsible transparency, not surveillance theater.",
      ),
    ]),

    h2("rollout", "Rollout tips"),
    ul(
      "Pilot with a few classes first",
      "Standardize attendance statuses",
      "Train teachers on the shortest daily path",
      "Agree who owns repeated-absence follow-up",
    ),

    h2("myschool-context", "MySchool context"),
    p(
      t("In MySchool, attendance is part of academic and classroom workflows and can connect to teacher and family experiences by permission. Explore "),
      internal("/features", "Features", "attendance-assessment"),
      t(" or "),
      internal("/solutions", "teacher solutions", "teachers"),
      t("."),
    ),
  ],
};
