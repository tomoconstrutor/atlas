import { BRAND_NAME, siteText } from "@/data/site";
import { hasText, text } from "@/lib/localize";
import type { Locale } from "@/types/content";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-rule)] px-4 py-10 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-display text-3xl uppercase tracking-[0.04em] text-mind-ink">
            AI ATLAS<span className="text-mind-blob">.</span>
          </div>
          {hasText(siteText.footer.line) ? (
            <p className="mt-2 text-sm font-light text-mind-muted">{text(siteText.footer.line, locale)}</p>
          ) : null}
        </div>

        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-muted">
          {BRAND_NAME} / V1
        </div>
      </div>
    </footer>
  );
}
