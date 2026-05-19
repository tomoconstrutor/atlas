import { EmptyRails } from "@/components/EmptyRails";
import { hasText, text } from "@/lib/localize";
import type { Locale, UseCase } from "@/types/content";

type UseCaseCardProps = {
  useCase: UseCase;
  locale: Locale;
};

export function UseCaseCard({ useCase, locale }: UseCaseCardProps) {
  const title = text(useCase.title, locale);
  const description = text(useCase.description, locale);
  const value = text(useCase.value, locale);

  return (
    <article className="rounded-2xl bg-mind-surface p-5 shadow-mindSm transition hover:-translate-y-1 hover:shadow-mindMd">
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-mind-blob-pale px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-mind-blob-deep">
          {useCase.category}
        </span>
        <span className="h-2 w-2 rounded-full bg-mind-blob" aria-hidden="true" />
      </div>

      {hasText(useCase.title) ? (
        <h4 className="font-display text-3xl uppercase leading-none text-mind-ink">{title}</h4>
      ) : null}

      {hasText(useCase.description) ? (
        <p className="mt-4 text-sm font-light leading-6 text-mind-muted">{description}</p>
      ) : null}

      {hasText(useCase.value) ? (
        <div className="mt-5 border-t border-[var(--color-rule)] pt-4 text-sm font-light leading-6 text-mind-ink">
          {value}
        </div>
      ) : null}

      {!hasText(useCase.title) && !hasText(useCase.description) && !hasText(useCase.value) ? (
        <EmptyRails rows={3} />
      ) : null}
    </article>
  );
}
