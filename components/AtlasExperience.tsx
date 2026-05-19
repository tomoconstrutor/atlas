"use client";

import { useState } from "react";
import { CTASection } from "@/components/CTASection";
import { ContextStrip } from "@/components/ContextStrip";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { IndustryExplorer } from "@/components/IndustryExplorer";
import { UniversalOpportunities } from "@/components/UniversalOpportunities";
import type { Locale } from "@/types/content";

export function AtlasExperience() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedIndustryId, setSelectedIndustryId] = useState("real-estate");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  function handleSelectIndustry(id: string) {
    setSelectedIndustryId(id);
    setCopiedPromptId(null);
    window.requestAnimationFrame(() => {
      document.getElementById("industry-detail")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  async function handleCopyPrompt(prompt: string, id: string) {
    if (!prompt.trim()) {
      return;
    }

    await navigator.clipboard.writeText(prompt);
    setCopiedPromptId(id);
    window.setTimeout(() => setCopiedPromptId(null), 1600);
  }

  return (
    <main>
      <Header locale={locale} onLocaleChange={setLocale} />
      <Hero locale={locale} />
      <ContextStrip locale={locale} />
      <IndustryExplorer
        locale={locale}
        selectedIndustryId={selectedIndustryId}
        copiedPromptId={copiedPromptId}
        onSelectIndustry={handleSelectIndustry}
        onCopyPrompt={handleCopyPrompt}
      />
      <UniversalOpportunities locale={locale} />
      <HowItWorks locale={locale} />
      <CTASection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
