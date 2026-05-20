import { SectionLabel } from "@/components/SectionLabel";
import { BRAND_NAME, CONTACT_EMAIL, siteText } from "@/data/site";
import { text } from "@/lib/localize";
import type { Locale } from "@/types/content";

type CTASectionProps = {
  locale: Locale;
};

export function CTASection({ locale }: CTASectionProps) {
  const href = CONTACT_EMAIL
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Custom AI Map Request")}`
    : "#materials";

  return (
    <section className="border-t border-[var(--color-rule)] px-4 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="06">{text(siteText.sections.cta, locale)}</SectionLabel>

        <div className="relative mt-10 overflow-hidden rounded-[20px] bg-mind-ink p-8 text-mind-bg shadow-mindLg sm:p-12">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob-light">
                {BRAND_NAME}
              </p>
              <h2 className="mt-3 font-display text-[clamp(52px,8vw,96px)] uppercase leading-[0.92] text-mind-bg">
                {text(siteText.cta.headline, locale)}
              </h2>
              <p className="mt-5 max-w-2xl text-base font-light leading-7 text-[rgba(234,234,242,0.72)]">
                {text(siteText.cta.body, locale)}
              </p>
            </div>

            <a
              href={href}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-mind-bg px-8 pb-2 pt-2.5 font-display text-2xl uppercase tracking-[0.04em] text-mind-ink transition hover:scale-[1.03]"
            >
              {text(siteText.cta.button, locale)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
