import {
  CONTACT_INQUIRY_TYPES,
  type ContactFieldErrors,
  type ContactFormInput,
  type ContactInquiryType,
  type ContactValidationResult,
} from "@/lib/contact/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
const MAX_MESSAGE = 4000;

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isInquiryType(value: string): value is ContactInquiryType {
  return (CONTACT_INQUIRY_TYPES as readonly string[]).includes(value);
}

/**
 * Shared client/server validation for the general inquiry form.
 * Requires at least one of email or phone. Honeypot must be empty.
 */
export function validateContactForm(
  input: Partial<ContactFormInput>,
): ContactValidationResult {
  const website = trim(input.website);
  if (website) {
    return { ok: false, fieldErrors: {}, honeypot: true };
  }

  const fullName = trim(input.fullName);
  const organization = trim(input.organization);
  const country = trim(input.country);
  const inquiryTypeRaw = trim(input.inquiryType);
  const email = trim(input.email);
  const phone = trim(input.phone);
  const studentCountRaw = trim(input.studentCount);
  const messageRaw = trim(input.message);

  const fieldErrors: ContactFieldErrors = {};

  if (!fullName) {
    fieldErrors.fullName = "fullNameRequired";
  }
  if (!organization) {
    fieldErrors.organization = "organizationRequired";
  }
  if (!country) {
    fieldErrors.country = "countryRequired";
  }
  if (!inquiryTypeRaw || !isInquiryType(inquiryTypeRaw)) {
    fieldErrors.inquiryType = "inquiryTypeRequired";
  }

  if (!email && !phone) {
    fieldErrors.contact = "contactRequired";
  }
  if (email && !EMAIL_RE.test(email)) {
    fieldErrors.email = "emailInvalid";
  }
  if (phone && !PHONE_RE.test(phone)) {
    fieldErrors.phone = "phoneInvalid";
  }

  let studentCount: number | null = null;
  if (studentCountRaw) {
    const parsed = Number(studentCountRaw);
    if (!Number.isFinite(parsed) || parsed < 0 || !Number.isInteger(parsed)) {
      fieldErrors.studentCount = "studentCountInvalid";
    } else {
      studentCount = parsed;
    }
  }

  if (messageRaw.length > MAX_MESSAGE) {
    fieldErrors.message = "messageTooLong";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    data: {
      fullName,
      organization,
      country,
      inquiryType: inquiryTypeRaw as ContactInquiryType,
      email: email || null,
      phone: phone || null,
      studentCount,
      message: messageRaw || null,
    },
  };
}

export function emptyContactForm(): ContactFormInput {
  return {
    fullName: "",
    organization: "",
    country: "",
    inquiryType: "",
    email: "",
    phone: "",
    studentCount: "",
    message: "",
    website: "",
  };
}
