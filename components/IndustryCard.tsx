import { industryIcons } from "@/components/icons";
import { siteText } from "@/data/site";
import { text } from "@/lib/localize";
import type { Industry, Locale } from "@/types/content";

type IndustryCardProps = {
  industry: Industry;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
};

export function IndustryCard({ industry, locale, selected, onSelect }: IndustryCardProps) {
  const Icon = industryIcons[industry.icon];
  const name = text(industry.name, locale);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group min-h-[210px] rounded-2xl border p-5 text-left shadow-mindSm transition duration-300 ${
        selected
          ? "border-mind-blob bg-mind-surface2 shadow-mindMd"
          : "border-[var(--color-rule)] bg-mind-surface hover:-translate-y-1 hover:bg-mind-surface2 hover:shadow-mindMd"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${
            selected ? "bg-mind-blob text-white" : "bg-mind-surface2 text-mind-blob"
          }`}
        >
          <Icon size={22} />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-mind-muted">
          {selected ? text(siteText.cards.selected, locale) : text(siteText.cards.route, locale)}
        </span>
      </div>

      <h3 className="mt-7 font-display text-4xl uppercase leading-none text-mind-ink">{name}</h3>

      <p className="mt-4 text-sm font-light leading-6 text-mind-muted">{text(industry.subtitle, locale)}</p>

      {industry.tags.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {industry.tags.map((tag) => (
            <span
              key={text(tag, "en")}
              className="rounded-full border border-[var(--color-rule)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-mind-muted"
            >
              {text(tag, locale)}
            </span>
          ))}
        </div>
      ) : null}
    </button>
  );
}
