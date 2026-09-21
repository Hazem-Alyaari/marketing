"use client";

import { Suspense, useId, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Building2,
  Globe2,
  HelpCircle,
  Info,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INQUIRY_TYPES } from "@/lib/contact/types";
import type { ContactFieldErrors, ContactFormInput } from "@/lib/contact/types";
import { buildContactMailto, parseContactInquiryType } from "@/lib/contact/href";
import { emptyContactForm, validateContactForm } from "@/lib/contact/validation";
import { cn } from "@/lib/utils";

const MAX_MESSAGE_CHARS = 4000;

type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; messageKey: "errorValidation" };

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }
  return <p className="mt-1.5 text-sm text-destructive">{message}</p>;
}

function FieldLabel({
  htmlFor,
  icon,
  children,
  required,
}: {
  htmlFor: string;
  icon: ReactNode;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary"
    >
      <span className="inline-flex size-4 shrink-0 items-center justify-center text-primary" aria-hidden>
        {icon}
      </span>
      <span>{children}</span>
      {required ? (
        <span className="text-destructive" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-[var(--radius-lg)] border border-border/80 bg-[color-mix(in_srgb,var(--muted)_55%,var(--background))] px-3.5 py-3 text-sm text-foreground shadow-[var(--shadow-sm)] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted-foreground focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-ring";

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

  function onSubmit(event: FormEvent<HTMLFormElement>) {
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

    // Opens the user's email app with the inquiry prefilled (works on static GitHub Pages).
    window.location.href = buildContactMailto(clientResult.data);
    setValues(emptyContactForm());
    setStatus({ kind: "success" });
  }

  const submitting = status.kind === "submitting";
  const messageLength = values.message.length;

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-[var(--shadow-md)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-[color-mix(in_srgb,var(--primary)_70%,var(--accent))] to-accent"
      />

      <div className="border-b border-border/80 px-5 pb-7 pt-8 text-center sm:px-8 sm:pt-9">
        <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
          {t("eyebrow")}
        </p>
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary shadow-[var(--shadow-sm)] transition-transform duration-300 ease-out motion-safe:group-hover:scale-105">
          <MessageSquareText className="size-7" aria-hidden />
        </div>
        <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {t("title")}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-5 px-5 py-6 sm:px-8 sm:py-8"
        noValidate
        aria-describedby={status.kind === "error" ? `${formId}-status` : undefined}
      >
        <div className="rounded-[var(--radius-lg)] border border-border/70 bg-[color-mix(in_srgb,var(--muted)_35%,var(--background))] p-4 sm:p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel
                htmlFor={`${formId}-fullName`}
                icon={<User className="size-3.5" />}
                required
              >
                {t("fullName")}
              </FieldLabel>
              <input
                id={`${formId}-fullName`}
                name="fullName"
                autoComplete="name"
                required
                placeholder={t("placeholders.fullName")}
                value={values.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                className={cn(inputClassName, fieldErrors.fullName && "border-destructive")}
                disabled={submitting}
              />
              <FieldError message={errorMessage(fieldErrors.fullName)} />
            </div>

            <div>
              <FieldLabel
                htmlFor={`${formId}-organization`}
                icon={<Building2 className="size-3.5" />}
                required
              >
                {t("organization")}
              </FieldLabel>
              <input
                id={`${formId}-organization`}
                name="organization"
                autoComplete="organization"
                required
                placeholder={t("placeholders.organization")}
                value={values.organization}
                onChange={(e) => setField("organization", e.target.value)}
                className={cn(inputClassName, fieldErrors.organization && "border-destructive")}
                disabled={submitting}
              />
              <FieldError message={errorMessage(fieldErrors.organization)} />
            </div>

            <div>
              <FieldLabel
                htmlFor={`${formId}-country`}
                icon={<Globe2 className="size-3.5" />}
                required
              >
                {t("country")}
              </FieldLabel>
              <input
                id={`${formId}-country`}
                name="country"
                autoComplete="country-name"
                required
                placeholder={t("placeholders.country")}
                value={values.country}
                onChange={(e) => setField("country", e.target.value)}
                className={cn(inputClassName, fieldErrors.country && "border-destructive")}
                disabled={submitting}
              />
              <FieldError message={errorMessage(fieldErrors.country)} />
            </div>

            <div className="sm:col-span-2">
              <FieldLabel
                htmlFor={`${formId}-inquiryType`}
                icon={<HelpCircle className="size-3.5" />}
                required
              >
                {t("inquiryType")}
              </FieldLabel>
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
                  {t("placeholders.inquiryType")}
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
              <FieldLabel htmlFor={`${formId}-email`} icon={<Mail className="size-3.5" />}>
                {t("email")}
              </FieldLabel>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("placeholders.email")}
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
              <FieldLabel htmlFor={`${formId}-phone`} icon={<Phone className="size-3.5" />}>
                {t("phone")}
              </FieldLabel>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder={t("placeholders.phone")}
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
              <FieldLabel
                htmlFor={`${formId}-studentCount`}
                icon={<Users className="size-3.5" />}
              >
                {t("studentCount")}
              </FieldLabel>
              <input
                id={`${formId}-studentCount`}
                name="studentCount"
                inputMode="numeric"
                placeholder={t("placeholders.studentCount")}
                value={values.studentCount}
                onChange={(e) => setField("studentCount", e.target.value)}
                className={cn(inputClassName, fieldErrors.studentCount && "border-destructive")}
                disabled={submitting}
              />
              <FieldError message={errorMessage(fieldErrors.studentCount)} />
            </div>

            <div className="sm:col-span-2">
              <FieldLabel
                htmlFor={`${formId}-message`}
                icon={<MessageSquareText className="size-3.5" />}
              >
                {t("message")}
              </FieldLabel>
              <div className="relative">
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={5}
                  maxLength={MAX_MESSAGE_CHARS}
                  placeholder={t("placeholders.message")}
                  value={values.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className={cn(
                    inputClassName,
                    "min-h-[9rem] resize-y pb-10",
                    fieldErrors.message && "border-destructive",
                  )}
                  disabled={submitting}
                />
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-3 end-3 rounded-full border border-border/70 bg-background/90 px-2.5 py-0.5 text-[0.68rem] tabular-nums text-muted-foreground",
                    messageLength > MAX_MESSAGE_CHARS * 0.9 && "text-amber-600",
                    messageLength >= MAX_MESSAGE_CHARS && "text-destructive",
                  )}
                  aria-live="polite"
                >
                  {messageLength} / {MAX_MESSAGE_CHARS}
                </div>
              </div>
              <FieldError message={errorMessage(fieldErrors.message)} />
            </div>
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
            className="rounded-[var(--radius-lg)] border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground"
          >
            {t("success")}
          </p>
        ) : null}

        {status.kind === "error" ? (
          <p
            id={`${formId}-status`}
            role="alert"
            className="rounded-[var(--radius-lg)] border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {t(status.messageKey)}
          </p>
        ) : null}

        <div className="border-t border-border/70 pt-5 text-center">
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full max-w-xs sm:max-w-sm"
          >
            <Send className="size-4" aria-hidden />
            {submitting ? t("submitting") : t("submit")}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Info className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span>{t("requiredNote")}</span>
          </p>
        </div>
      </form>
    </div>
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
