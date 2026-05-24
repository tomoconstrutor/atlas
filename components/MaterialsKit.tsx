"use client";

import { useMemo, useState } from "react";
import { ReportPreview } from "@/components/ReportPreview";
import { SectionLabel } from "@/components/SectionLabel";
import { uiIcons } from "@/components/icons";
import { siteText } from "@/data/site";
import { captureReportLead } from "@/lib/leadCapture";
import { text } from "@/lib/localize";
import { generateReportPdf } from "@/lib/reportPdf";
import {
  buildReportFilename,
  buildReportKit,
  isValidEmail
} from "@/lib/reportKit";
import type { Industry, Locale } from "@/types/content";

type MaterialsKitProps = {
  industry: Industry;
  locale: Locale;
  onExploreAnotherIndustry: () => void;
};

export function MaterialsKit({ industry, locale, onExploreAnotherIndustry }: MaterialsKitProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [captured, setCaptured] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const DownloadIcon = uiIcons.Download;
  const FileIcon = uiIcons.FileText;
  const CheckIcon = uiIcons.Check;
  const RouteIcon = uiIcons.Route;

  const report = useMemo(() => buildReportKit(industry, locale), [industry, locale]);
  const filename = buildReportFilename(report);

  async function downloadReport() {
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
  }

  async function handlePrimaryAction() {
    const targetEmail = email.trim();
    setError("");
    setCaptured(false);

    if (!targetEmail || !isValidEmail(targetEmail)) {
      setError(text(siteText.materials.invalidEmail, locale));
      return;
    }

    setPreparing(true);

    try {
      const captureResult = await captureReportLead({
        email: targetEmail,
        industryId: report.industryId,
        industryName: report.industryName,
        locale,
        reportFilename: filename,
        pageUrl: window.location.href,
        userAgent: window.navigator.userAgent
      });

      if (!captureResult.ok) {
        setError(
          text(
            captureResult.reason === "missing_config"
              ? siteText.materials.captureUnavailable
              : siteText.materials.captureFailed,
            locale
          )
        );
        return;
      }

      await downloadReport();
      setCaptured(true);
    } catch {
      setError(text(siteText.materials.captureFailed, locale));
    } finally {
      setPreparing(false);
    }
  }

  return (
    <section id="materials" className="scroll-mt-20 border-t border-[var(--color-rule)] px-4 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionLabel number="03">{text(siteText.sections.materials, locale)}</SectionLabel>

        <div className="mt-7 grid gap-3 lg:grid-cols-[.9fr_.55fr]">
          <div className="rounded-2xl bg-mind-surface2 p-5 shadow-mindSm sm:p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob">
                  {text(siteText.materials.eyebrow, locale)}
                </p>
                <h2 className="mt-2 font-display text-[clamp(36px,5vw,56px)] uppercase leading-[0.95] text-mind-ink">
                  {text(siteText.materials.headline, locale)}
                </h2>
              </div>
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-mind-blob-pale text-mind-blob-deep">
                <FileIcon size={19} />
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-sm font-light leading-6 text-mind-muted">
              {text(siteText.materials.body, locale)}
            </p>

            <div className="mt-5 border-t border-[var(--color-rule)] pt-5">
              <h3 className="font-display text-2xl uppercase leading-none text-mind-ink">
                {text(industry.name, locale)}
              </h3>
              <p className="mt-3 text-sm font-light leading-6 text-mind-muted">
                {text(industry.subtitle, locale)}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
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

          <div className="rounded-2xl bg-mind-ink p-5 text-mind-bg shadow-mindMd sm:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob-light">
              {filename}
            </p>

            <label className="mt-6 block">
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
                name="email"
                inputMode="email"
                disabled={preparing}
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

            <div className="mt-6">
              <button
                type="button"
                onClick={handlePrimaryAction}
                disabled={preparing}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-mind-bg px-6 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-ink transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <DownloadIcon size={18} />
                {preparing ? text(siteText.materials.preparing, locale) : text(siteText.materials.downloadButton, locale)}
              </button>
            </div>

            <div className="mt-5 border-t border-[rgba(234,234,242,0.16)] pt-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[rgba(234,234,242,0.58)]">
                {text(siteText.exploreAnother.label, locale)}
              </p>
              <button
                type="button"
                onClick={onExploreAnotherIndustry}
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[rgba(234,234,242,0.3)] px-6 pb-2 pt-2.5 font-display text-lg uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.03] hover:border-mind-bg"
              >
                <RouteIcon size={18} />
                {text(siteText.exploreAnother.button, locale)}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-mind-surface2 p-3 shadow-mindSm sm:p-4">
          <ReportPreview report={report} />
        </div>
      </div>
    </section>
  );
}
