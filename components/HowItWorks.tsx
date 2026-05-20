import { SectionLabel } from "@/components/SectionLabel";
import { siteText } from "@/data/site";
import { text } from "@/lib/localize";
import type { Locale } from "@/types/content";
import { uiIcons } from "@/components/icons";

type HowItWorksProps = {
  locale: Locale;
};

export function HowItWorks({ locale }: HowItWorksProps) {
  const RouteIcon = uiIcons.Route;

  return (
    <section className="border-t border-[var(--color-rule)] px-4 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="05">{text(siteText.sections.howItWorks, locale)}</SectionLabel>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {siteText.how.steps.map((step, index) => (
            <article key={text(step.title, "en")} className="rounded-[20px] bg-mind-surface p-6 shadow-mindSm">
              <div className="mb-8 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mind-surface2 text-mind-blob shadow-mindSm">
                  <RouteIcon size={20} />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-muted">
                  {text(siteText.how.step, locale)} {index + 1}
                </span>
              </div>
              <h3 className="font-display text-4xl uppercase leading-none text-mind-ink">
                {text(step.title, locale)}
              </h3>
              <p className="mt-4 text-sm font-light leading-6 text-mind-muted">{text(step.body, locale)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
