"use client";

import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { uiIcons } from "@/components/icons";
import { siteText } from "@/data/site";
import { buildEmailSubject, buildExportFilename, buildIndustryKit, isValidEmail } from "@/lib/exportKit";
import { text } from "@/lib/localize";
import type { Industry, Locale } from "@/types/content";

type MaterialsKitProps = {
  industry: Industry;
  locale: Locale;
};

export function MaterialsKit({ industry, locale }: MaterialsKitProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const DownloadIcon = uiIcons.Download;
  const FileIcon = uiIcons.FileText;
  const MailIcon = uiIcons.Mail;
  const CopyIcon = uiIcons.Copy;
  const CheckIcon = uiIcons.Check;

  const kitText = useMemo(() => buildIndustryKit(industry, locale), [industry, locale]);
  const filename = buildExportFilename(industry, locale);
  const hasEmail = email.trim().length > 0;

  function handleDownload() {
    const blob = new Blob([kitText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function handlePrimaryAction() {
    const targetEmail = email.trim();
    setError("");

    if (!targetEmail) {
      handleDownload();
      return;
    }

    if (!isValidEmail(targetEmail)) {
      setError(text(siteText.materials.invalidEmail, locale));
      return;
    }

    const subject = encodeURIComponent(buildEmailSubject(industry, locale));
    const body = encodeURIComponent(kitText);
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  }

  async function handleCopyKit() {
    await navigator.clipboard.writeText(kitText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section id="materials" className="scroll-mt-24 border-t border-[var(--color-rule)] px-4 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="03">{text(siteText.sections.materials, locale)}</SectionLabel>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_.9fr]">
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
                }}
                type="email"
                inputMode="email"
                placeholder={text(siteText.materials.emailPlaceholder, locale)}
                className="mt-3 min-h-12 w-full rounded-full border border-[rgba(234,234,242,0.22)] bg-[rgba(234,234,242,0.08)] px-5 text-sm font-light text-mind-bg outline-none placeholder:text-[rgba(234,234,242,0.42)] focus:border-mind-blob-light"
              />
            </label>

            {error ? (
              <p className="mt-3 text-sm font-light leading-6 text-mind-blob-light">{error}</p>
            ) : (
              <p className="mt-3 text-sm font-light leading-6 text-[rgba(234,234,242,0.64)]">
                {text(siteText.materials.filenameNote, locale)}
              </p>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handlePrimaryAction}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-mind-bg px-6 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-ink transition hover:scale-[1.03]"
              >
                {hasEmail ? <MailIcon size={18} /> : <DownloadIcon size={18} />}
                {hasEmail ? text(siteText.materials.emailButton, locale) : text(siteText.materials.downloadButton, locale)}
              </button>
              <button
                type="button"
                onClick={handleCopyKit}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(234,234,242,0.26)] px-6 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.03] hover:border-mind-bg"
              >
                {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                {copied ? text(siteText.materials.copied, locale) : text(siteText.materials.copyButton, locale)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
