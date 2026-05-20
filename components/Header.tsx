import { BRAND_NAME, CONTACT_EMAIL, siteText } from "@/data/site";
import { text } from "@/lib/localize";
import type { Locale } from "@/types/content";

type HeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function Header({ locale, onLocaleChange }: HeaderProps) {
  const ctaHref = CONTACT_EMAIL
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Custom AI Map Request")}`
    : "#materials";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-rule)] bg-[rgba(234,234,242,0.88)] px-4 py-3 backdrop-blur-md sm:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-2xl uppercase tracking-[0.05em] text-mind-ink"
          aria-label={BRAND_NAME}
        >
          AI ATLAS<span className="text-mind-blob">.</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <a className="text-[11px] font-medium uppercase tracking-[0.16em] text-mind-muted transition hover:text-mind-ink" href="#industries">
            {text(siteText.nav.industries, locale)}
          </a>
          <a className="text-[11px] font-medium uppercase tracking-[0.16em] text-mind-muted transition hover:text-mind-ink" href="#opportunities">
            {text(siteText.nav.opportunities, locale)}
          </a>
          <a className="text-[11px] font-medium uppercase tracking-[0.16em] text-mind-muted transition hover:text-mind-ink" href="#materials">
            {text(siteText.nav.materials, locale)}
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex rounded-full border border-[var(--color-rule)] bg-mind-surface2 p-1 shadow-mindSm" aria-label="Language">
            {(["en", "pt"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onLocaleChange(item)}
                className={`min-h-9 min-w-10 rounded-full px-3 text-[11px] font-medium uppercase tracking-[0.14em] transition ${
                  locale === item
                    ? "bg-mind-ink text-mind-bg"
                    : "text-mind-muted hover:text-mind-ink"
                }`}
                aria-pressed={locale === item}
              >
                {item}
              </button>
            ))}
          </div>

          <a
            href={ctaHref}
            className="hidden min-h-11 items-center rounded-full bg-mind-ink px-6 pb-2 pt-2.5 font-display text-lg uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.03] hover:shadow-mindMd sm:inline-flex"
          >
            {text(siteText.nav.cta, locale)}
          </a>
        </div>
      </nav>
    </header>
  );
}
