import { EmptyRails } from "@/components/EmptyRails";
import { SectionLabel } from "@/components/SectionLabel";
import { opportunities } from "@/data/opportunities";
import { siteText } from "@/data/site";
import { hasText, text } from "@/lib/localize";
import type { Locale } from "@/types/content";
import { uiIcons } from "@/components/icons";

type UniversalOpportunitiesProps = {
  locale: Locale;
};

export function UniversalOpportunities({ locale }: UniversalOpportunitiesProps) {
  const LayersIcon = uiIcons.Layers3;

  return (
    <section id="opportunities" className="scroll-mt-24 border-t border-[var(--color-rule)] px-4 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="03">{text(siteText.sections.opportunities, locale)}</SectionLabel>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((opportunity, index) => (
            <article
              key={opportunity.id}
              className="rounded-[20px] bg-mind-surface2 p-6 shadow-mindSm transition hover:-translate-y-1 hover:shadow-mindMd"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mind-blob-pale text-mind-blob-deep">
                  <LayersIcon size={20} />
                </span>
                <span className="font-display text-3xl uppercase leading-none text-mind-blob">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-display text-4xl uppercase leading-none text-mind-ink">
                {text(opportunity.title, locale)}
              </h3>

              {hasText(opportunity.meaning) ? (
                <p className="mt-4 text-sm font-light leading-6 text-mind-muted">
                  {text(opportunity.meaning, locale)}
                </p>
              ) : null}

              {hasText(opportunity.example) ? (
                <p className="mt-5 border-t border-[var(--color-rule)] pt-4 text-sm font-light leading-6 text-mind-ink">
                  {text(opportunity.example, locale)}
                </p>
              ) : null}

              {!hasText(opportunity.meaning) && !hasText(opportunity.example) ? (
                <div className="mt-6">
                  <EmptyRails rows={3} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
