import { NextResponse } from "next/server";
import { deliverContactMessage } from "@/lib/contact/delivery";
import type { ContactApiResponse, ContactFormInput } from "@/lib/contact/types";
import { validateContactForm } from "@/lib/contact/validation";

export const runtime = "nodejs";

function json(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let body: Partial<ContactFormInput>;

  try {
    body = (await request.json()) as Partial<ContactFormInput>;
  } catch {
    return json(
      {
        ok: false,
        code: "validation_error",
        message: "Invalid JSON body.",
      },
      400,
    );
  }

  const validated = validateContactForm(body);

  if (!validated.ok) {
    if (validated.honeypot) {
      // Silent success for bots — do not deliver.
      return json({ ok: true }, 200);
    }

    return json(
      {
        ok: false,
        code: "validation_error",
        message: "Validation failed.",
        fieldErrors: validated.fieldErrors,
      },
      400,
    );
  }

  const delivery = await deliverContactMessage(validated.data);

  if (!delivery.ok) {
    const status = delivery.code === "not_configured" ? 503 : 502;
    return json(
      {
        ok: false,
        code: delivery.code,
        message: delivery.message,
      },
      status,
    );
  }

  return json({ ok: true }, 200);
}

export async function GET() {
  return json(
    {
      ok: false,
      code: "method_not_allowed",
      message: "Use POST to submit a contact inquiry.",
    },
    405,
  );
}
