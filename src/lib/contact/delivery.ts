import type { ContactDeliveryResult, ContactPayload } from "@/lib/contact/types";

type DeliveryProvider = "resend" | "console" | "";

function readServerEnv(key: string): string {
  const value = process.env[key];
  return value ? value.trim() : "";
}

function getProvider(): DeliveryProvider {
  const raw = readServerEnv("CONTACT_DELIVERY_PROVIDER").toLowerCase();
  if (raw === "resend" || raw === "console") {
    return raw;
  }
  return "";
}

function formatMessageBody(payload: ContactPayload): string {
  const lines = [
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
  ];
  return lines.join("\n");
}

async function deliverViaResend(
  payload: ContactPayload,
): Promise<ContactDeliveryResult> {
  const apiKey = readServerEnv("RESEND_API_KEY");
  const to = readServerEnv("CONTACT_TO_EMAIL");
  const from =
    readServerEnv("CONTACT_FROM_EMAIL") || "MySchool Marketing <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return {
      ok: false,
      code: "not_configured",
      message: "Resend delivery requires RESEND_API_KEY and CONTACT_TO_EMAIL.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[MySchool Contact] ${payload.inquiryType} — ${payload.organization}`,
        text: formatMessageBody(payload),
        reply_to: payload.email ?? undefined,
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        code: "delivery_failed",
        message: `Resend responded with status ${response.status}.`,
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      code: "delivery_failed",
      message: "Failed to reach the Resend API.",
    };
  }
}

/**
 * Delivery abstraction for contact inquiries.
 * No fake success: if no provider is configured, returns not_configured.
 *
 * Providers:
 * - (empty) → not_configured
 * - console → logs payload in development only (never pretends email was sent in production)
 * - resend → sends via Resend when RESEND_API_KEY + CONTACT_TO_EMAIL are set
 */
export async function deliverContactMessage(
  payload: ContactPayload,
): Promise<ContactDeliveryResult> {
  const provider = getProvider();

  if (!provider) {
    return {
      ok: false,
      code: "not_configured",
      message:
        "No contact delivery provider configured. Set CONTACT_DELIVERY_PROVIDER when ready.",
    };
  }

  if (provider === "console") {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        code: "not_configured",
        message: "Console delivery is not allowed in production.",
      };
    }
    console.info("[contact] inquiry received (console delivery)", payload);
    return { ok: true };
  }

  if (provider === "resend") {
    return deliverViaResend(payload);
  }

  return {
    ok: false,
    code: "not_configured",
    message: "Unknown contact delivery provider.",
  };
}

export function isContactDeliveryConfigured(): boolean {
  const provider = getProvider();
  if (!provider) {
    return false;
  }
  if (provider === "console") {
    return process.env.NODE_ENV !== "production";
  }
  if (provider === "resend") {
    return Boolean(readServerEnv("RESEND_API_KEY") && readServerEnv("CONTACT_TO_EMAIL"));
  }
  return false;
}
