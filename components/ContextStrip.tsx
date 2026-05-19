import { siteText } from "@/data/site";
import { hasText, text } from "@/lib/localize";
import type { Locale } from "@/types/content";

type ContextStripProps = {
  locale: Locale;
};

export function ContextStrip({ locale }: ContextStripProps) {
  return (
    <section className="border-y border-[var(--color-rule)] px-4 py-8 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {hasText(siteText.context.body) ? (
          <p className="max-w-2xl text-base font-light leading-7 text-mind-muted">
            {text(siteText.context.body, locale)}
          </p>
        ) : (
          <div className="h-px flex-1 bg-[var(--color-rule)]" aria-hidden="true" />
        )}

        <div className="flex flex-wrap gap-2">
          {siteText.context.pills.map((pill) => (
            <span
              key={text(pill, "en")}
              className="inline-flex min-h-8 items-center rounded-full border-[1.5px] border-mind-blob px-4 text-[11px] font-medium uppercase tracking-[0.15em] text-mind-ink"
            >
              {text(pill, locale)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
