export const CONTACT_INQUIRY_TYPES = [
  "general",
  "firstYear",
  "commercial",
  "deployment",
  "product",
] as const;

export type ContactInquiryType = (typeof CONTACT_INQUIRY_TYPES)[number];

export type ContactFormInput = {
  fullName: string;
  organization: string;
  country: string;
  inquiryType: string;
  email: string;
  phone: string;
  studentCount: string;
  message: string;
  /** Honeypot — must remain empty. */
  website: string;
};

export type ContactPayload = {
  fullName: string;
  organization: string;
  country: string;
  inquiryType: ContactInquiryType;
  email: string | null;
  phone: string | null;
  studentCount: number | null;
  message: string | null;
};

export type ContactFieldErrors = Partial<
  Record<
    | "fullName"
    | "organization"
    | "country"
    | "inquiryType"
    | "email"
    | "phone"
    | "studentCount"
    | "message"
    | "contact",
    string
  >
>;

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; fieldErrors: ContactFieldErrors; honeypot?: boolean };

export type ContactDeliveryResult =
  | { ok: true }
  | {
      ok: false;
      code: "not_configured" | "delivery_failed";
      message: string;
    };

export type ContactApiSuccess = {
  ok: true;
};

export type ContactApiError = {
  ok: false;
  code:
    | "validation_error"
    | "not_configured"
    | "delivery_failed"
    | "honeypot"
    | "method_not_allowed";
  message: string;
  fieldErrors?: ContactFieldErrors;
};

export type ContactApiResponse = ContactApiSuccess | ContactApiError;
