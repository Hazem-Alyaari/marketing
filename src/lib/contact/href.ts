import type { ContactInquiryType } from "@/lib/contact/types";
import { CONTACT_INQUIRY_TYPES } from "@/lib/contact/types";
import { routes } from "@/config/navigation";

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
