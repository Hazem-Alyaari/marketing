import type { Article } from "@/types/blog";
import { callout, h2, h3, internal, ol, p, t, ul } from "@/content/blog/_helpers";

export const enDigitalSupervision: Article = {
  id: "en-digital-supervision",
  translationId: "digital-supervision",
  locale: "en",
  slug: "digital-educational-supervision-teacher-follow-up",
  title: "Digital Educational Supervision and Teacher Follow-up",
  description:
    "How digital educational supervision helps schools organize classroom visits, evaluations, and ongoing teacher follow-up without turning support into paperwork.",
  excerpt:
    "From scattered notes to a continuous supervision path that supports teachers.",
  category: "educational-supervision",
  publishedAt: "2026-03-20",
  updatedAt: "2026-03-20",
  readingTimeMinutes: 7,
  image: {
    src: "supervision",
    alt: "Educational supervision and teacher follow-up tools",
  },
  relatedIds: [
    "en-school-hr",
    "en-student-attendance-digital",
    "en-school-management-system-guide",
  ],
  seo: {
    primaryKeyword: "educational supervision",
    secondaryKeywords: [
      "teacher evaluation software",
      "classroom visit tracking",
      "digital supervision school",
    ],
    searchIntent: "informational — digital educational supervision",
  },
  body: [
    p(
      t(
        "Good educational supervision is continuous support, not a one-off classroom visit. Digitization helps when it makes documentation clearer and follow-up easier — without turning supervision into bureaucracy.",
      ),
    ),

    h2("why-system", "Why supervision needs structure"),
    ul(
      "Visit notes scattered across paper and chats",
      "Hard-to-find teacher follow-up history across a term",
      "Weak link between evaluations, feedback, and next steps",
      "Leadership needs overview without micromanaging every note",
    ),

    h2("what-it-enables", "What digital supervision enables"),
    h3("visits", "Classroom visits"),
    p(t("Consistent documentation in one place reduces lost observations.")),
    h3("evaluations", "Evaluations"),
    p(
      t(
        "Stored evaluations support fairer conversations based on a shared record, not only a moment’s impression.",
      ),
    ),
    h3("follow-up", "Follow-up"),
    p(
      t(
        "Follow-up turns a visit into development. Systems help track agreements and later check-ins.",
      ),
    ),

    h2("culture", "Support culture first"),
    callout([
      t(
        "A healthy test: does the tool help supervisor and teacher have a clearer conversation after the visit?",
      ),
    ]),

    h2("rollout", "Start without overload"),
    ol(
      "Agree on a simple shared visit model",
      "Train supervisors on concise useful documentation",
      "Begin with a manageable weekly visit rhythm",
      "Review follow-up quality monthly — not form volume alone",
    ),

    h2("myschool-context", "MySchool context"),
    p(
      t("MySchool provides a dedicated educational supervision experience for evaluations, classroom visits, and teacher follow-up. See "),
      internal("/solutions", "supervision solutions", "supervision"),
      t(" and "),
      internal("/features", "supervision features", "educational-supervision"),
      t("."),
    ),
  ],
};
