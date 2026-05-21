import { SectionLabel } from "@/components/SectionLabel";
import { UseCaseCard } from "@/components/UseCaseCard";
import { siteText } from "@/data/site";
import { hasItems, text } from "@/lib/localize";
import type { Industry, Locale } from "@/types/content";
import { uiIcons } from "@/components/icons";

type IndustryDetailProps = {
  industry: Industry;
  locale: Locale;
  copiedPromptId: string | null;
  onCopyPrompt: (prompt: string, id: string) => void;
  onExploreAnotherIndustry: () => void;
};

export function IndustryDetail({
  industry,
  locale,
  copiedPromptId,
  onCopyPrompt,
  onExploreAnotherIndustry
}: IndustryDetailProps) {
  const name = text(industry.name, locale);
  const problems = industry.problems[locale];
  const quickWins = industry.quickWins[locale];
  const CopyIcon = uiIcons.Copy;
  const CheckIcon = uiIcons.Check;
  const RouteIcon = uiIcons.Route;

  return (
    <section id="industry-detail" className="scroll-mt-20 border-t border-[var(--color-rule)] px-4 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionLabel number="02">{text(siteText.sections.detail, locale)}</SectionLabel>

        <div className="mt-7 grid gap-6 lg:grid-cols-[.88fr_1.12fr]">
          <div className="space-y-4">
            <div className="rounded-2xl bg-mind-surface2 p-5 shadow-mindSm sm:p-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob">
                {text(siteText.detail.titlePrefix, locale)}
              </span>
              <h2 className="mt-2 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[0.95] text-mind-ink">
                {name}
              </h2>
              <p className="mt-4 text-sm font-light leading-6 text-mind-muted">
                {text(industry.subtitle, locale)}
              </p>
            </div>

            <div className="rounded-2xl bg-mind-surface p-5 shadow-mindSm sm:p-6">
              <h3 className="font-display text-2xl uppercase leading-none text-mind-ink">
                {text(siteText.detail.timeLeaks, locale)}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {problems.map((problem) => (
                  <li key={problem} className="flex gap-3 text-sm font-light leading-6 text-mind-muted">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-mind-blob" aria-hidden="true" />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-mind-blob bg-mind-surface2 p-5 shadow-mindSm sm:p-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob">
                {text(siteText.detail.firstWorkflow, locale)}
              </span>
              <h3 className="mt-2 font-display text-2xl uppercase leading-none text-mind-ink">
                {text(industry.firstWorkflow.title, locale)}
              </h3>
              <p className="mt-3 text-sm font-light leading-6 text-mind-muted">
                {text(industry.firstWorkflow.why, locale)}
              </p>
              <ol className="mt-4 space-y-2.5">
                {industry.firstWorkflow.steps[locale].slice(0, 4).map((step, index) => (
                  <li key={step} className="grid grid-cols-[28px_1fr] gap-3 text-sm font-light leading-6 text-mind-muted">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-mind-blob-pale text-[11px] font-medium text-mind-blob-deep">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 border-t border-[var(--color-rule)] pt-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-mind-muted">
                  {text(siteText.detail.buildNext, locale)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {industry.firstWorkflow.buildNext.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full bg-mind-blob-pale px-3 py-1 text-[10px] font-medium text-mind-blob-deep">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-3 font-display text-3xl uppercase leading-none text-mind-ink">
                {text(siteText.detail.useCases, locale)}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {industry.useCases.map((useCase) => (
                  <UseCaseCard key={useCase.id} useCase={useCase} locale={locale} />
                ))}
              </div>
            </div>

            {hasItems(quickWins) ? (
              <div className="rounded-2xl bg-mind-surface2 p-5 shadow-mindSm sm:p-6">
                <h3 className="font-display text-2xl uppercase leading-none text-mind-ink">
                  {text(siteText.detail.quickWins, locale)}
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
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

            <div className="rounded-2xl bg-mind-surface2 p-5 shadow-mindSm sm:p-6">
              <h3 className="font-display text-2xl uppercase leading-none text-mind-ink">
                {text(siteText.detail.workflows, locale)}
              </h3>
              <div className="mt-4 grid gap-3">
                {industry.workflows.map((workflow) => (
                  <article key={text(workflow.title, "en")} className="rounded-xl border border-[var(--color-rule)] bg-mind-surface p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h4 className="font-display text-2xl uppercase leading-none text-mind-ink">
                        {text(workflow.title, locale)}
                      </h4>
                      <span className="shrink-0 rounded-full bg-mind-blob-pale px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-mind-blob-deep">
                        {text(siteText.detail.implementation, locale)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-light leading-6 text-mind-muted">
                      {text(workflow.summary, locale)}
                    </p>
                    <p className="mt-3 border-t border-[var(--color-rule)] pt-3 text-sm font-light leading-6 text-mind-ink">
                      {text(workflow.implementation, locale)}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-mind-surface2 p-5 shadow-mindSm sm:p-6">
              <h3 className="font-display text-2xl uppercase leading-none text-mind-ink">
                {text(siteText.detail.miniTools, locale)}
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {industry.miniTools.map((tool) => (
                  <article key={text(tool.title, "en")} className="rounded-xl border border-[var(--color-rule)] bg-mind-surface p-4">
                    <h4 className="font-display text-2xl uppercase leading-none text-mind-ink">
                      {text(tool.title, locale)}
                    </h4>
                    <p className="mt-3 text-sm font-light leading-6 text-mind-muted">
                      {text(tool.description, locale)}
                    </p>
                    <div className="mt-4 space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs font-light leading-5 text-mind-muted">
                      <p>
                        <span className="font-medium text-mind-ink">{text(siteText.detail.input, locale)}:</span>{" "}
                        {tool.inputs[locale].join(", ")}
                      </p>
                      <p>
                        <span className="font-medium text-mind-ink">{text(siteText.detail.output, locale)}:</span>{" "}
                        {text(tool.output, locale)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-mind-surface2 p-5 shadow-mindSm sm:p-6">
              <h3 className="font-display text-2xl uppercase leading-none text-mind-ink">
                {text(siteText.detail.prompts, locale)}
              </h3>
              <div className="mt-4 grid gap-3">
                {industry.promptCards.map((promptCard, index) => {
                  const id = `${industry.id}-prompt-${index}`;
                  const prompt = text(promptCard.prompt, locale);
                  const copied = copiedPromptId === id;
                  return (
                    <div key={id} className="rounded-xl border border-[var(--color-rule)] bg-mind-surface p-4">
                      <h4 className="font-display text-2xl uppercase leading-none text-mind-ink">
                        {text(promptCard.title, locale)}
                      </h4>
                      <p className="mt-3 text-sm font-light leading-6 text-mind-muted">{prompt}</p>
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
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-mind-surface2 p-5 shadow-mindSm sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob">
              {text(siteText.exploreAnother.label, locale)}
            </p>
            <p className="mt-2 text-sm font-light leading-6 text-mind-muted">
              {text(industry.name, locale)}
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreAnotherIndustry}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-mind-ink px-6 pb-2 pt-2.5 font-display text-lg uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.03] sm:mt-0 sm:w-auto"
          >
            <RouteIcon size={18} />
            {text(siteText.exploreAnother.button, locale)}
          </button>
        </div>
      </div>
    </section>
  );
}
