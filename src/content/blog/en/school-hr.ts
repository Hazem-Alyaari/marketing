import type { Article } from "@/types/blog";
import { callout, h2, h3, internal, ol, p, t } from "@/content/blog/_helpers";

export const enSchoolHr: Article = {
  id: "en-school-hr",
  translationId: "school-hr",
  locale: "en",
  slug: "school-hr-employees-attendance-leave-payroll",
  title: "School HR: Employees, Attendance, Leave, and Payroll Links",
  description:
    "How schools organize employee records, staff attendance, leave, and payroll-related workflows inside school-aware HR processes.",
  excerpt:
    "Practical school HR: reliable staff records, leave workflows, and connections to daily operations.",
  category: "human-resources",
  publishedAt: "2026-03-18",
  updatedAt: "2026-03-18",
  readingTimeMinutes: 7,
  image: {
    src: "hr",
    alt: "School HR employee management",
  },
  relatedIds: [
    "en-school-fees-accounting",
    "en-digital-supervision",
    "en-choose-school-management-software",
  ],
  seo: {
    primaryKeyword: "school HR software",
    secondaryKeywords: [
      "school staff management",
      "teacher leave management",
      "school payroll",
    ],
    searchIntent: "informational — school human resources",
  },
  body: [
    p(
      t(
        "A school is an educational community — and a workplace. Teachers, administrators, supervisors, and support staff all depend on clear HR processes for records, attendance, leave, and payroll-related data.",
      ),
    ),

    h2("why-school-hr", "Why school HR is different"),
    p(
      t(
        "School calendars, timetable coverage, assessment periods, and substitute needs create an operating rhythm that generic office HR tools may not reflect well.",
      ),
    ),

    h2("core-areas", "Core areas"),
    h3("records", "Employee records"),
    p(t("A complete staff profile reduces scattered files and inconsistent updates.")),
    h3("attendance-leave", "Attendance and leave"),
    p(
      t(
        "Clear staff attendance and leave workflows help leadership plan coverage and spot gaps earlier.",
      ),
    ),
    h3("payroll", "Payroll-related links"),
    p(
      t(
        "Even when payroll is handled carefully on the finance side, HR needs trustworthy source data for people, attendance, and related operational inputs.",
      ),
    ),

    h2("connections", "Connections across the school"),
    p(
      t(
        "HR intersects with classroom coverage, finance, and system permissions. Staff roles should shape what people can access in the wider school platform.",
      ),
    ),
    p(
      t("Explore "),
      internal("/solutions", "HR solutions", "hr"),
      t(" and "),
      internal("/features", "HR features", "human-resources"),
      t("."),
    ),

    h2("adoption", "A quiet adoption path"),
    ol(
      "Clean core employee data first",
      "Standardize attendance and leave types",
      "Set permissions between leadership, HR, and department heads",
      "Connect finance-related flows after data quality is stable",
    ),
    callout([
      t("Start with trustworthy records. Add reports only when teams will actually use them."),
    ]),

    h2("myschool-context", "MySchool context"),
    p(
      t(
        "MySchool HR capabilities include employee records, attendance, leave, and related staffing workflows, with accounting links to payroll where applicable.",
      ),
    ),
  ],
};
