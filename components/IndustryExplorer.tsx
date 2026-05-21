import { IndustryCard } from "@/components/IndustryCard";
import { IndustryDetail } from "@/components/IndustryDetail";
import { SectionLabel } from "@/components/SectionLabel";
import { industries } from "@/data/industries";
import { siteText } from "@/data/site";
import { text } from "@/lib/localize";
import type { Locale } from "@/types/content";

type IndustryExplorerProps = {
  locale: Locale;
  selectedIndustryId: string;
  copiedPromptId: string | null;
  onSelectIndustry: (id: string) => void;
  onCopyPrompt: (prompt: string, id: string) => void;
  onExploreAnotherIndustry: () => void;
};

export function IndustryExplorer({
  locale,
  selectedIndustryId,
  copiedPromptId,
  onSelectIndustry,
  onCopyPrompt,
  onExploreAnotherIndustry
}: IndustryExplorerProps) {
  const selectedIndustry =
    industries.find((industry) => industry.id === selectedIndustryId) ?? industries[0];

  return (
    <>
      <section id="industries" className="scroll-mt-20 px-4 py-12 sm:px-10 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionLabel number="01">{text(siteText.sections.industries, locale)}</SectionLabel>
          <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <IndustryCard
                key={industry.id}
                industry={industry}
                locale={locale}
                selected={industry.id === selectedIndustryId}
                onSelect={() => onSelectIndustry(industry.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <IndustryDetail
        industry={selectedIndustry}
        locale={locale}
        copiedPromptId={copiedPromptId}
        onCopyPrompt={onCopyPrompt}
        onExploreAnotherIndustry={onExploreAnotherIndustry}
      />
    </>
  );
}
