import type { ContactInquiryType, ContactPayload } from "@/lib/contact/types";
import { CONTACT_INQUIRY_TYPES } from "@/lib/contact/types";
import { routes } from "@/config/navigation";

/** Inbox that receives contact-form mailto messages. */
export const CONTACT_MAILTO_RECIPIENT =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()) ||
  "alyaarihazem@gmail.com";

/** Build a locale-independent contact path with an optional inquiry-type query. */
export function contactHref(inquiryType?: ContactInquiryType): string {
  if (!inquiryType) {
    return routes.contact;
  }
  return `${routes.contact}?type=${inquiryType}`;
}

export function parseContactInquiryType(
  value: string | string[] | undefined,
): ContactInquiryType | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) {
    return undefined;
  }
  return (CONTACT_INQUIRY_TYPES as readonly string[]).includes(raw)
    ? (raw as ContactInquiryType)
    : undefined;
}

/** Build a mailto URL with the inquiry as subject + body (opens the user's email app). */
export function buildContactMailto(payload: ContactPayload): string {
  const subject = `[MySchool] ${payload.inquiryType} — ${payload.organization}`;
  const body = [
    `Inquiry type: ${payload.inquiryType}`,
    `Name: ${payload.fullName}`,
    `Organization: ${payload.organization}`,
    `Country: ${payload.country}`,
    `Email: ${payload.email ?? "—"}`,
    `Phone: ${payload.phone ?? "—"}`,
    `Student count: ${payload.studentCount ?? "—"}`,
    "",
    "Message:",
    payload.message ?? "(none)",
  ].join("\n");

  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${CONTACT_MAILTO_RECIPIENT}?${params.toString()}`;
}
