import type { Article } from "@/types/blog";
import { callout, h2, internal, ol, p, t, ul } from "@/content/blog/_helpers";

export const enChooseSchoolManagementSoftware: Article = {
  id: "en-choose-school-management-software",
  translationId: "choose-school-management-software",
  locale: "en",
  slug: "how-to-choose-school-management-software",
  title: "How to Choose School Management Software for Your School",
  description:
    "A practical checklist for choosing school management software: operations, roles, permissions, portals, adoption, and evaluation red flags.",
  excerpt:
    "Choose school software based on real school workflows — not feature-list theater.",
  category: "school-management",
  publishedAt: "2026-03-12",
  updatedAt: "2026-03-12",
  readingTimeMinutes: 7,
  image: {
    src: "permissions",
    alt: "Role and permission settings in school software",
  },
  relatedIds: [
    "en-school-management-system-guide",
    "en-student-attendance-digital",
    "en-school-hr",
  ],
  seo: {
    primaryKeyword: "school management software",
    secondaryKeywords: [
      "choose school ERP",
      "evaluate school management system",
      "school software comparison",
    ],
    searchIntent: "commercial investigation — choose school software",
  },
  body: [
    p(
      t(
        "Choosing school management software is an operations decision. It affects leadership, teachers, finance, HR, and families. Start from school pain points, not from a polished feature grid.",
      ),
    ),

    h2("start-with-pain", "Start with operational pain"),
    ul(
      "Student registration and handoffs between teams",
      "Daily attendance follow-up",
      "Fee collection and account clarity",
      "Staff leave and employee records",
      "Family questions about grades, attendance, and fees",
    ),

    h2("roles-permissions", "Map roles and permissions early"),
    p(
      t(
        "The right product gives each role a clear workspace. If teachers, admins, and guardians share one undifferentiated interface, permission and usability problems usually follow.",
      ),
    ),
    p(
      t("Compare role needs using the "),
      internal("/solutions", "Solutions"),
      t(" page as a reference model."),
    ),

    h2("connected-data", "Prefer connected workflows over isolated screens"),
    p(
      t(
        "Count of screens matters less than data flow. Does one student record support attendance, fees, and portals without repeated manual entry?",
      ),
    ),
    callout([
      t(
        "If every department exports files so another department can work, you are looking at adjacent tools — not a connected platform.",
      ),
    ]),

    h2("portals", "Family portals are operational, not cosmetic"),
    p(
      t(
        "Student and guardian portals reduce repetitive inquiries when schedule, homework, grades, attendance, and approved financial information are available with proper access control.",
      ),
    ),
    p(
      t("See portal-related capabilities under "),
      internal("/features", "Features", "portals-admin"),
      t("."),
    ),

    h2("adoption", "Plan adoption, not only launch day"),
    ol(
      "Define phase-one scope",
      "Train core users before expanding",
      "Agree on the source of truth for each data type",
      "Review permissions after real use begins",
    ),
    p(
      t("Explore first if helpful, then discuss real school adoption through "),
      internal("/contact", "Contact"),
      t(" and "),
      internal("/pricing", "Pricing"),
      t("."),
    ),

    h2("red-flags", "Evaluation red flags"),
    ul(
      "Unsupported percentage claims about time saved",
      "Vague answers on student data permissions",
      "No clear path for issue follow-up after go-live",
      "Confusion between demo exploration and production readiness",
    ),

    h2("closing", "Bottom line"),
    p(
      t(
        "The best fit is software your school can adopt gradually with confidence. If you want an example of connected school workflows, start with ",
      ),
      internal("/features", "Features"),
      t(" or "),
      internal("/faq", "FAQ"),
      t("."),
    ),
  ],
};
