import type { Article } from "@/types/blog";
import { callout, h2, h3, internal, ol, p, t, ul } from "@/content/blog/_helpers";

export const enSchoolFeesAccounting: Article = {
  id: "en-school-fees-accounting",
  translationId: "school-fees-accounting",
  locale: "en",
  slug: "school-fees-and-accounting-systems",
  title: "How School Systems Help Organize Fees and Accounting",
  description:
    "A practical look at school fees, student accounts, collections, and accounting workflows inside a connected school management system.",
  excerpt:
    "What schools need to keep fees, student accounts, and financial follow-up clear and traceable.",
  category: "finance",
  publishedAt: "2026-03-16",
  updatedAt: "2026-03-16",
  readingTimeMinutes: 7,
  image: {
    src: "finance",
    alt: "School fees and accounting interface",
  },
  relatedIds: [
    "en-school-management-system-guide",
    "en-school-hr",
    "en-choose-school-management-software",
  ],
  seo: {
    primaryKeyword: "school accounting software",
    secondaryKeywords: [
      "school fee management",
      "student fee collection",
      "school finance system",
    ],
    searchIntent: "informational — school fees and accounting",
  },
  body: [
    p(
      t(
        "School finance is sensitive because it affects family trust and operational stability. Organizing fees and accounts is less about complex corporate accounting theater and more about clear obligations, payments, and follow-up.",
      ),
    ),

    h2("why-link", "Why fees should link to the student record"),
    ul(
      "Faster answers about a student’s account status",
      "Fewer mismatches between finance and what families expect",
      "Less dependence on disconnected spreadsheets",
      "Controlled guardian visibility when appropriate",
    ),

    h2("capabilities", "Useful financial capabilities"),
    h3("fees", "Fee collection"),
    p(t("A clear path for what is due, what was paid, and what remains.")),
    h3("accounts", "Student accounts"),
    p(
      t(
        "One shared reference for finance and administration reduces repeated internal chasing.",
      ),
    ),
    h3("accounting", "Expenses and accounting workflows"),
    p(
      t(
        "Schools vary in accounting depth. What matters is that finance teams can track operational expenses and related accounting work without losing the school context.",
      ),
    ),

    h2("guardians", "Transparent — within bounds"),
    callout([
      t(
        "Financial transparency for families means the information they need, not every internal ledger detail.",
      ),
    ]),

    h2("operating-model", "A calm operating model"),
    ol(
      "Define fee types and policies",
      "Attach obligations to the correct student record",
      "Clarify who posts and who confirms payments",
      "Review collection reports weekly during adoption",
      "Enable family visibility after data quality stabilizes",
    ),

    h2("myschool-context", "MySchool context"),
    p(
      t("MySchool includes fee collection, student accounts, expenses, and accounting capabilities such as payroll-related workflows. See "),
      internal("/features", "finance features", "finance-accounting"),
      t(" and "),
      internal("/solutions", "finance solutions", "finance"),
      t("."),
    ),
  ],
};
