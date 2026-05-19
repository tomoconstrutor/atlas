import { EmptyRails } from "@/components/EmptyRails";
import { GlossyBlobs } from "@/components/GlossyBlobs";
import { BRAND_NAME, CONTACT_EMAIL, siteText } from "@/data/site";
import { hasText, text } from "@/lib/localize";
import type { Locale } from "@/types/content";
import { uiIcons } from "@/components/icons";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const hasHeroCopy = hasText(siteText.hero.headline) || hasText(siteText.hero.subheadline);
  const mailto = CONTACT_EMAIL
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Custom AI Map Request")}`
    : "";
  const MapIcon = uiIcons.Map;
  const MouseIcon = uiIcons.MousePointer2;

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-12 pt-12 sm:px-10 lg:pb-16">
      <div className="atlas-map-plane pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="relative h-[520px] overflow-hidden rounded-[20px] border border-[var(--color-rule)] bg-mind-bg shadow-mindLg sm:h-[640px]">
          <span className="absolute left-5 top-5 z-30 text-[11px] font-medium uppercase tracking-[0.18em] text-mind-ink">
            AI
          </span>
          <span className="absolute right-5 top-5 z-30 text-right text-[11px] font-medium uppercase tracking-[0.18em] text-mind-ink">
            MAP
          </span>
          <span className="absolute bottom-5 left-5 z-30 text-[11px] font-medium uppercase tracking-[0.18em] text-mind-ink">
            V1
          </span>
          <span className="absolute bottom-5 right-5 z-30 text-right text-[11px] font-medium uppercase tracking-[0.18em] text-mind-ink">
            ATLAS
          </span>

          <div
            className="absolute inset-0 z-10 px-5 py-20 font-display text-[clamp(76px,16vw,168px)] uppercase leading-[0.88] text-mind-ink sm:px-8 sm:py-24"
            aria-label={text(siteText.hero.stackWord, locale)}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>{text(siteText.hero.stackWord, locale)}</div>
            ))}
          </div>
          <GlossyBlobs />
        </div>

        <div className="relative z-10 animate-reveal">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-mind-muted">
            <MapIcon size={16} className="text-mind-blob" />
            <span>{BRAND_NAME}</span>
          </div>

          {hasHeroCopy ? (
            <div>
              {hasText(siteText.hero.headline) ? (
                <h1 className="max-w-xl font-display text-[clamp(56px,9vw,104px)] uppercase leading-[0.92] text-mind-ink">
                  {text(siteText.hero.headline, locale)}
                </h1>
              ) : null}
              {hasText(siteText.hero.subheadline) ? (
                <p className="mt-6 max-w-xl text-lg font-light leading-8 text-mind-muted">
                  {text(siteText.hero.subheadline, locale)}
                </p>
              ) : null}
            </div>
          ) : (
            <h1 className="sr-only">{BRAND_NAME}</h1>
          )}

          <div className="mt-8 rounded-[20px] bg-mind-surface2 p-5 shadow-mindMd sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--color-rule)] pb-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob">
                  {text(siteText.hero.opportunityCard, locale)}
                </p>
                <p className="mt-2 font-display text-4xl uppercase leading-none text-mind-ink">{BRAND_NAME}</p>
              </div>
              <MouseIcon size={26} className="text-mind-blob" />
            </div>

            <div className="grid gap-4">
              {siteText.hero.cardLabels.map((label, index) => (
                <div key={index} className="grid gap-2 rounded-xl border border-[var(--color-rule)] bg-mind-surface px-4 py-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-mind-muted">
                    {text(label, locale)}
                  </span>
                  <EmptyRails rows={1} compact />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#industries"
              className="inline-flex min-h-11 items-center rounded-full bg-mind-ink px-7 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.03] hover:shadow-mindMd"
            >
              {text(siteText.hero.primaryCta, locale)}
            </a>
            {mailto ? (
              <a
                href={mailto}
                className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-mind-ink px-7 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-ink transition hover:scale-[1.03] hover:bg-mind-ink hover:text-mind-bg"
              >
                {text(siteText.hero.secondaryCta, locale)}
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex min-h-11 cursor-default items-center rounded-full border-[1.5px] border-mind-ink px-7 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-ink opacity-70"
                aria-disabled="true"
                title={text(siteText.cta.disabledHint, locale)}
              >
                {text(siteText.hero.secondaryCta, locale)}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
