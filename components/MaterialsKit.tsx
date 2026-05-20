"use client";

import { useMemo, useState } from "react";
import { ReportPreview } from "@/components/ReportPreview";
import { SectionLabel } from "@/components/SectionLabel";
import { uiIcons } from "@/components/icons";
import { siteText } from "@/data/site";
import { text } from "@/lib/localize";
import { generateReportPdf } from "@/lib/reportPdf";
import {
  buildReportEmailBody,
  buildReportFilename,
  buildReportKit,
  isValidEmail
} from "@/lib/reportKit";
import type { Industry, Locale } from "@/types/content";

type MaterialsKitProps = {
  industry: Industry;
  locale: Locale;
};

export function MaterialsKit({ industry, locale }: MaterialsKitProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const DownloadIcon = uiIcons.Download;
  const FileIcon = uiIcons.FileText;
  const CopyIcon = uiIcons.Copy;
  const CheckIcon = uiIcons.Check;

  const report = useMemo(() => buildReportKit(industry, locale), [industry, locale]);
  const emailCopy = useMemo(() => buildReportEmailBody(report), [report]);
  const filename = buildReportFilename(report);

  async function handleDownload() {
    setPreparing(true);
    try {
      const bytes = await generateReportPdf(report);
      const pdfBuffer = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(pdfBuffer).set(bytes);
      const blob = new Blob([pdfBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } finally {
      setPreparing(false);
    }
  }

  function rememberEmailCapture(targetEmail: string) {
    try {
      const key = "ai-atlas-report-captures";
      const existing = JSON.parse(window.localStorage.getItem(key) ?? "[]") as Array<{
        email: string;
        industryId: string;
        locale: Locale;
        capturedAt: string;
      }>;
      const next = [
        {
          email: targetEmail,
          industryId: report.industryId,
          locale,
          capturedAt: new Date().toISOString()
        },
        ...existing.filter((item) => item.email !== targetEmail)
      ].slice(0, 20);

      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Local capture is a convenience for static hosting; download should still continue.
    }
  }

  async function handlePrimaryAction() {
    const targetEmail = email.trim();
    setError("");
    setCaptured(false);

    if (!targetEmail || !isValidEmail(targetEmail)) {
      setError(text(siteText.materials.invalidEmail, locale));
      return;
    }

    rememberEmailCapture(targetEmail);
    await handleDownload();
    setCaptured(true);
  }

  async function handleCopyEmail() {
    await navigator.clipboard.writeText(emailCopy);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section id="materials" className="scroll-mt-24 border-t border-[var(--color-rule)] px-4 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="03">{text(siteText.sections.materials, locale)}</SectionLabel>

        <div className="mt-10 grid gap-4 lg:grid-cols-[.82fr_.58fr]">
          <div className="rounded-[20px] bg-mind-surface2 p-6 shadow-mindMd sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob">
                  {text(siteText.materials.eyebrow, locale)}
                </p>
                <h2 className="mt-3 font-display text-[clamp(42px,6vw,72px)] uppercase leading-[0.92] text-mind-ink">
                  {text(siteText.materials.headline, locale)}
                </h2>
              </div>
              <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-mind-blob-pale text-mind-blob-deep">
                <FileIcon size={22} />
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-base font-light leading-7 text-mind-muted">
              {text(siteText.materials.body, locale)}
            </p>

            <div className="mt-7 border-t border-[var(--color-rule)] pt-6">
              <h3 className="font-display text-3xl uppercase leading-none text-mind-ink">
                {text(industry.name, locale)}
              </h3>
              <p className="mt-3 text-sm font-light leading-6 text-mind-muted">
                {text(industry.subtitle, locale)}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {siteText.materials.previewItems.map((item) => (
                <div key={text(item, "en")} className="flex items-center gap-3 text-sm font-light text-mind-muted">
                  <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mind-blob text-white">
                    <CheckIcon size={13} />
                  </span>
                  <span>{text(item, locale)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] bg-mind-ink p-6 text-mind-bg shadow-mindLg sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob-light">
              {filename}
            </p>

            <label className="mt-8 block">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[rgba(234,234,242,0.72)]">
                {text(siteText.materials.emailLabel, locale)}
              </span>
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setCaptured(false);
                }}
                type="email"
                inputMode="email"
                placeholder={text(siteText.materials.emailPlaceholder, locale)}
                className="mt-3 min-h-12 w-full rounded-full border border-[rgba(234,234,242,0.22)] bg-[rgba(234,234,242,0.08)] px-5 text-sm font-light text-mind-bg outline-none placeholder:text-[rgba(234,234,242,0.42)] focus:border-mind-blob-light"
              />
            </label>

            {error ? (
              <p className="mt-3 text-sm font-light leading-6 text-mind-blob-light">{error}</p>
            ) : captured ? (
              <p className="mt-3 text-sm font-light leading-6 text-mind-blob-light">
                {text(siteText.materials.captured, locale)}
              </p>
            ) : (
              <div className="mt-3 space-y-1 text-sm font-light leading-6 text-[rgba(234,234,242,0.64)]">
                <p>{text(siteText.materials.filenameNote, locale)}</p>
                <p>{text(siteText.materials.emailNote, locale)}</p>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handlePrimaryAction}
                disabled={preparing}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-mind-bg px-6 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-ink transition hover:scale-[1.03]"
              >
                <DownloadIcon size={18} />
                {preparing ? text(siteText.materials.preparing, locale) : text(siteText.materials.downloadButton, locale)}
              </button>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(234,234,242,0.26)] px-6 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.03] hover:border-mind-bg"
              >
                {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                {copied ? text(siteText.materials.copied, locale) : text(siteText.materials.copyButton, locale)}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[20px] bg-mind-surface2 p-4 shadow-mindSm sm:p-6">
          <ReportPreview report={report} />
        </div>
      </div>
    </section>
  );
}
