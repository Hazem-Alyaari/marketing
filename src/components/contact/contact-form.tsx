"use client";

import { Suspense, useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CONTACT_INQUIRY_TYPES } from "@/lib/contact/types";
import type {
  ContactApiResponse,
  ContactFieldErrors,
  ContactFormInput,
} from "@/lib/contact/types";
import { parseContactInquiryType } from "@/lib/contact/href";
import { emptyContactForm, validateContactForm } from "@/lib/contact/validation";
import { cn } from "@/lib/utils";

type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; messageKey: "errorGeneric" | "errorNotConfigured" | "errorValidation" };

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }
  return <p className="mt-1.5 text-sm text-destructive">{message}</p>;
}

const inputClassName =
  "w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-[var(--shadow-sm)] outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring";

function ContactFormInner() {
  const t = useTranslations("Contact.form");
  const formId = useId();
  const searchParams = useSearchParams();
  const [values, setValues] = useState<ContactFormInput>(() => {
    const base = emptyContactForm();
    const fromQuery = parseContactInquiryType(
      searchParams.get("type") ?? undefined,
    );
    return fromQuery ? { ...base, inquiryType: fromQuery } : base;
  });
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });

  const errorMessage = (key: string | undefined) => {
    if (!key) {
      return undefined;
    }
    return t(`errors.${key}` as "errors.fullNameRequired");
  };

  const setField = <K extends keyof ContactFormInput>(key: K, value: ContactFormInput[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "submitting" });

    const clientResult = validateContactForm(values);
    if (!clientResult.ok) {
      if (clientResult.honeypot) {
        setStatus({ kind: "success" });
        setValues(emptyContactForm());
        setFieldErrors({});
        return;
      }
      setFieldErrors(clientResult.fieldErrors);
      setStatus({ kind: "error", messageKey: "errorValidation" });
      return;
    }

    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (!data.ok) {
        if (data.code === "validation_error" && data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          setStatus({ kind: "error", messageKey: "errorValidation" });
          return;
        }
        if (data.code === "not_configured") {
          setStatus({ kind: "error", messageKey: "errorNotConfigured" });
          return;
        }
        setStatus({ kind: "error", messageKey: "errorGeneric" });
        return;
      }

      setValues(emptyContactForm());
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error", messageKey: "errorGeneric" });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate
      aria-describedby={status.kind === "error" ? `${formId}-status` : undefined}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-fullName`} className="mb-1.5 block text-sm font-medium">
            {t("fullName")}
          </label>
          <input
            id={`${formId}-fullName`}
            name="fullName"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            className={cn(inputClassName, fieldErrors.fullName && "border-destructive")}
            disabled={submitting}
          />
          <FieldError message={errorMessage(fieldErrors.fullName)} />
        </div>

        <div>
          <label htmlFor={`${formId}-organization`} className="mb-1.5 block text-sm font-medium">
            {t("organization")}
          </label>
          <input
            id={`${formId}-organization`}
            name="organization"
            autoComplete="organization"
            required
            value={values.organization}
            onChange={(e) => setField("organization", e.target.value)}
            className={cn(inputClassName, fieldErrors.organization && "border-destructive")}
            disabled={submitting}
          />
          <FieldError message={errorMessage(fieldErrors.organization)} />
        </div>

        <div>
          <label htmlFor={`${formId}-country`} className="mb-1.5 block text-sm font-medium">
            {t("country")}
          </label>
          <input
            id={`${formId}-country`}
            name="country"
            autoComplete="country-name"
            required
            value={values.country}
            onChange={(e) => setField("country", e.target.value)}
            className={cn(inputClassName, fieldErrors.country && "border-destructive")}
            disabled={submitting}
          />
          <FieldError message={errorMessage(fieldErrors.country)} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-inquiryType`} className="mb-1.5 block text-sm font-medium">
            {t("inquiryType")}
          </label>
          <select
            id={`${formId}-inquiryType`}
            name="inquiryType"
            required
            value={values.inquiryType}
            onChange={(e) => setField("inquiryType", e.target.value)}
            className={cn(inputClassName, fieldErrors.inquiryType && "border-destructive")}
            disabled={submitting}
          >
            <option value="" disabled>
              {t("inquiryType")}
            </option>
            {CONTACT_INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`inquiryTypes.${type}`)}
              </option>
            ))}
          </select>
          <FieldError message={errorMessage(fieldErrors.inquiryType)} />
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium">
            {t("email")}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className={cn(
              inputClassName,
              (fieldErrors.email || fieldErrors.contact) && "border-destructive",
            )}
            disabled={submitting}
          />
          <FieldError message={errorMessage(fieldErrors.email)} />
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-medium">
            {t("phone")}
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={cn(
              inputClassName,
              (fieldErrors.phone || fieldErrors.contact) && "border-destructive",
            )}
            disabled={submitting}
          />
          <FieldError message={errorMessage(fieldErrors.phone)} />
        </div>

        <p className="sm:col-span-2 text-sm text-muted-foreground">{t("contactHint")}</p>
        {fieldErrors.contact ? (
          <div className="sm:col-span-2 -mt-3">
            <FieldError message={errorMessage(fieldErrors.contact)} />
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-studentCount`} className="mb-1.5 block text-sm font-medium">
            {t("studentCount")}
          </label>
          <input
            id={`${formId}-studentCount`}
            name="studentCount"
            inputMode="numeric"
            value={values.studentCount}
            onChange={(e) => setField("studentCount", e.target.value)}
            className={cn(inputClassName, fieldErrors.studentCount && "border-destructive")}
            disabled={submitting}
          />
          <FieldError message={errorMessage(fieldErrors.studentCount)} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-medium">
            {t("message")}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
            className={cn(inputClassName, "resize-y", fieldErrors.message && "border-destructive")}
            disabled={submitting}
          />
          <FieldError message={errorMessage(fieldErrors.message)} />
        </div>
      </div>

      {/* Honeypot — visually hidden from humans */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={`${formId}-website`}>{t("honeypotLabel")}</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setField("website", e.target.value)}
        />
      </div>

      {status.kind === "success" ? (
        <p
          id={`${formId}-status`}
          role="status"
          className="rounded-[var(--radius)] border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground"
        >
          {t("success")}
        </p>
      ) : null}

      {status.kind === "error" ? (
        <p
          id={`${formId}-status`}
          role="alert"
          className="rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {t(status.messageKey)}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

/** Prefills inquiry type from `/contact?type=…` when present. */
export function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}
