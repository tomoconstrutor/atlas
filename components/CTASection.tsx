import { SectionLabel } from "@/components/SectionLabel";
import { BRAND_NAME, CONTACT_EMAIL, siteText } from "@/data/site";
import { captureEvent } from "@/lib/analytics";
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
    <section className="border-t border-[var(--color-rule)] px-4 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionLabel number="04">{text(siteText.sections.cta, locale)}</SectionLabel>

        <div className="relative mt-7 overflow-hidden rounded-2xl bg-mind-ink p-6 text-mind-bg shadow-mindMd sm:p-8">
          <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob-light">
                {BRAND_NAME}
              </p>
              <h2 className="mt-2 font-display text-[clamp(42px,7vw,72px)] uppercase leading-[0.95] text-mind-bg">
                {text(siteText.cta.headline, locale)}
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-light leading-6 text-[rgba(234,234,242,0.72)]">
                {text(siteText.cta.body, locale)}
              </p>
            </div>

            <a
              href={href}
              onClick={() =>
                captureEvent("cta_clicked", {
                  has_contact_email: Boolean(CONTACT_EMAIL)
                })
              }
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-mind-bg px-7 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-ink transition hover:scale-[1.03]"
            >
              {text(siteText.cta.button, locale)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
