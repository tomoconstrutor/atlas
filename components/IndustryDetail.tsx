import { EmptyRails } from "@/components/EmptyRails";
import { SectionLabel } from "@/components/SectionLabel";
import { UseCaseCard } from "@/components/UseCaseCard";
import { siteText } from "@/data/site";
import { hasItems, hasText, text } from "@/lib/localize";
import type { Industry, Locale } from "@/types/content";
import { uiIcons } from "@/components/icons";

type IndustryDetailProps = {
  industry: Industry;
  locale: Locale;
  copiedPromptId: string | null;
  onCopyPrompt: (prompt: string, id: string) => void;
};

export function IndustryDetail({ industry, locale, copiedPromptId, onCopyPrompt }: IndustryDetailProps) {
  const name = text(industry.name, locale);
  const problems = industry.problems[locale];
  const quickWins = industry.quickWins[locale];
  const prompts = industry.prompts[locale].filter((prompt) => prompt.trim().length > 0);
  const CopyIcon = uiIcons.Copy;
  const CheckIcon = uiIcons.Check;

  return (
    <section id="industry-detail" className="scroll-mt-24 border-t border-[var(--color-rule)] px-4 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="02">{text(siteText.sections.detail, locale)}</SectionLabel>

        <div className="mt-10 grid gap-8 lg:grid-cols-[.88fr_1.12fr]">
          <div className="space-y-6">
            <div className="rounded-[20px] bg-mind-surface2 p-6 shadow-mindMd sm:p-8">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob">
                {text(siteText.detail.titlePrefix, locale)}
              </span>
              <h2 className="mt-3 font-display text-[clamp(48px,7vw,84px)] uppercase leading-[0.92] text-mind-ink">
                {name}
              </h2>
              {hasText(industry.subtitle) ? (
                <p className="mt-5 text-base font-light leading-7 text-mind-muted">
                  {text(industry.subtitle, locale)}
                </p>
              ) : (
                <div className="mt-6">
                  <EmptyRails rows={3} />
                </div>
              )}
            </div>

            <div className="rounded-[20px] bg-mind-surface p-6 shadow-mindSm sm:p-8">
              <h3 className="font-display text-3xl uppercase leading-none text-mind-ink">
                {text(siteText.detail.timeLeaks, locale)}
              </h3>
              {hasItems(problems) ? (
                <ul className="mt-5 space-y-3">
                  {problems.map((problem) => (
                    <li key={problem} className="flex gap-3 text-sm font-light leading-6 text-mind-muted">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-mind-blob" aria-hidden="true" />
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6">
                  <EmptyRails rows={5} />
                </div>
              )}
            </div>

            {hasText(industry.firstWorkflow) ? (
              <div className="rounded-[20px] border border-mind-blob bg-mind-surface2 p-6 shadow-mindMd sm:p-8">
                <h3 className="font-display text-3xl uppercase leading-none text-mind-ink">
                  {text(siteText.detail.firstWorkflow, locale)}
                </h3>
                <p className="mt-4 text-sm font-light leading-6 text-mind-muted">
                  {text(industry.firstWorkflow, locale)}
                </p>
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-display text-4xl uppercase leading-none text-mind-ink">
                {text(siteText.detail.useCases, locale)}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {industry.useCases.map((useCase) => (
                  <UseCaseCard key={useCase.id} useCase={useCase} locale={locale} />
                ))}
              </div>
            </div>

            {hasItems(quickWins) ? (
              <div className="rounded-[20px] bg-mind-surface2 p-6 shadow-mindSm sm:p-8">
                <h3 className="font-display text-3xl uppercase leading-none text-mind-ink">
                  {text(siteText.detail.quickWins, locale)}
                </h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {quickWins.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-light leading-6 text-mind-muted">
                      <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mind-blob text-white">
                        <CheckIcon size={13} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {prompts.length ? (
              <div className="rounded-[20px] bg-mind-surface2 p-6 shadow-mindSm sm:p-8">
                <h3 className="font-display text-3xl uppercase leading-none text-mind-ink">
                  {text(siteText.detail.prompts, locale)}
                </h3>
                <div className="mt-5 grid gap-3">
                  {prompts.map((prompt, index) => {
                    const id = `${industry.id}-prompt-${index}`;
                    const copied = copiedPromptId === id;
                    return (
                      <div key={id} className="rounded-xl border border-[var(--color-rule)] bg-mind-surface p-4">
                        <p className="text-sm font-light leading-6 text-mind-muted">{prompt}</p>
                        <button
                          type="button"
                          onClick={() => onCopyPrompt(prompt, id)}
                          className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-mind-ink px-4 pb-1.5 pt-2 font-display text-base uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.03]"
                        >
                          {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                          {copied ? text(siteText.detail.copied, locale) : text(siteText.detail.copyPrompt, locale)}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
