import type { Article } from "@/types/blog";
import { callout, h2, h3, internal, ol, p, t, ul } from "@/content/blog/_helpers";

export const enSchoolManagementSystemGuide: Article = {
  id: "en-school-management-system-guide",
  translationId: "school-management-system-guide",
  locale: "en",
  slug: "what-is-a-school-management-system",
  title: "What Is a School Management System? A Practical Guide",
  description:
    "Learn what a school management system covers, how it differs from disconnected tools, and how schools can evaluate one with clear operational questions.",
  excerpt:
    "A practical explanation of school management systems — what they usually include, who they help, and how to evaluate them without hype.",
  category: "school-management",
  publishedAt: "2026-03-10",
  updatedAt: "2026-03-10",
  readingTimeMinutes: 8,
  image: {
    src: "dashboard",
    alt: "School management dashboard overview",
  },
  featured: true,
  relatedIds: [
    "en-choose-school-management-software",
    "en-student-attendance-digital",
    "en-school-fees-accounting",
  ],
  seo: {
    primaryKeyword: "school management system",
    secondaryKeywords: [
      "school management software",
      "school ERP",
      "student management system",
    ],
    searchIntent: "informational — understand school management systems",
  },
  body: [
    p(
      t(
        "When schools search for a school management system, they are usually looking for clarity: one place to organize students, schedules, attendance, fees, staff processes, and family communication.",
      ),
    ),
    p(
      t(
        "This guide explains the concept in practical terms — what these platforms typically cover, how they differ from disconnected tools, and how to evaluate them without inflated claims.",
      ),
    ),

    h2("what-is-sms", "What a school management system is"),
    p(
      t(
        "A school management system is software that helps a school run core operations in one connected environment, instead of spreading work across paper registers, spreadsheets, and separate apps that do not share data cleanly.",
      ),
    ),
    p(
      t(
        "The goal is not to automate everything overnight. It is to reduce duplicate entry, improve visibility, and give each role — leadership, teachers, supervisors, finance, families — access that matches their responsibility.",
      ),
    ),

    h2("what-it-covers", "What it usually covers"),
    ul(
      "Admissions, student records, and guardian relationships",
      "Academic structure: classes, subjects, schedules, and assignments",
      "Attendance and assessment",
      "Fees and school accounting workflows",
      "HR: employees, attendance, leave, and payroll-related processes",
      "Educational supervision and teacher follow-up",
      "Internal communication plus student and guardian portals",
    ),
    p(
      t("You can browse these areas as product capabilities on the "),
      internal("/features", "Features"),
      t(" page."),
    ),

    h2("why-now", "Why schools look for one platform"),
    p(
      t(
        "Schools handle constant information flow: a new admission, a schedule change, an absence, a fee payment, staff leave, or a supervision note. When those workflows are fragmented, teams rely on memory and manual chasing."),
    ),
    h3("fragmentation", "The cost of fragmentation"),
    p(
      t(
        "Separate tools can work for a while. As schools grow — or add branches — coordination between systems often becomes harder than using one connected platform.",
      ),
    ),

    h2("roles", "Different roles need different experiences"),
    p(
      t(
        "Leadership needs overview. Teachers need classroom tools. Supervisors need structured follow-up. Guardians need a trustworthy channel for academic and approved financial information. A strong system respects those differences.",
      ),
    ),
    p(
      t("See how role-based needs are framed on the "),
      internal("/solutions", "Solutions"),
      t(" page."),
    ),

    h2("evaluation", "Practical evaluation questions"),
    ol(
      "Which workflows hurt most today: admissions, attendance, fees, or communication?",
      "Do you need multi-branch support now or later?",
      "Who will use the system daily, and what permissions do they need?",
      "Are student and guardian portals part of the same platform?",
      "How will adoption start: exploration first, then real school use?",
    ),
    callout([
      t(
        "Useful distinction: a public demo is for exploration. Real school adoption is a separate operational decision.",
      ),
    ]),
    p(
      t("MySchool presents that journey on "),
      internal("/pricing", "Pricing"),
      t(" and through "),
      internal("/contact", "Contact"),
      t("."),
    ),

    h2("myschool-context", "Where MySchool fits"),
    p(
      t(
        "MySchool is a multi-tenant school management platform that brings admissions, academics, attendance, fees and accounting, HR, supervision, communication, and portals together. This article is informational — if you want to see the workflows in product form, explore ",
      ),
      internal("/features", "Features"),
      t(" or try the public demo when available."),
    ),
  ],
};
