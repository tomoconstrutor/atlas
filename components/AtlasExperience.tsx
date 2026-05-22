"use client";

import { useEffect, useState } from "react";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IndustryExplorer } from "@/components/IndustryExplorer";
import { MaterialsKit } from "@/components/MaterialsKit";
import { industries } from "@/data/industries";
import { captureEvent } from "@/lib/analytics";
import type { Locale } from "@/types/content";

const LOCALE_STORAGE_KEY = "atlas_locale";

export function AtlasExperience() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedIndustryId, setSelectedIndustryId] = useState("real-estate");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const selectedIndustry =
    industries.find((industry) => industry.id === selectedIndustryId) ?? industries[0];

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

    if (savedLocale === "en" || savedLocale === "pt") {
      setLocale(savedLocale);
    }
  }, []);

  function handleLocaleChange(nextLocale: Locale) {
    if (nextLocale !== locale) {
      captureEvent("language_changed", {
        locale: nextLocale,
        surface: "map"
      });
    }

    setLocale(nextLocale);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
  }

  function handleSelectIndustry(id: string) {
    setSelectedIndustryId(id);
    setCopiedPromptId(null);
    captureEvent("industry_selected", {
      industry_id: id
    });
    window.requestAnimationFrame(() => {
      document.getElementById("industry-detail")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  function handleExploreAnotherIndustry() {
    setCopiedPromptId(null);
    captureEvent("explore_another_industry_clicked", {
      industry_id: selectedIndustryId
    });
    window.requestAnimationFrame(() => {
      document.getElementById("industries")?.scrollIntoView({
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
    captureEvent("prompt_copied", {
      prompt_id: id,
      industry_id: selectedIndustryId
    });
    window.setTimeout(() => setCopiedPromptId(null), 1600);
  }

  return (
    <main>
      <Header locale={locale} onLocaleChange={handleLocaleChange} />
      <Hero locale={locale} />
      <IndustryExplorer
        locale={locale}
        selectedIndustryId={selectedIndustryId}
        copiedPromptId={copiedPromptId}
        onSelectIndustry={handleSelectIndustry}
        onCopyPrompt={handleCopyPrompt}
        onExploreAnotherIndustry={handleExploreAnotherIndustry}
      />
      <MaterialsKit
        industry={selectedIndustry}
        locale={locale}
        onExploreAnotherIndustry={handleExploreAnotherIndustry}
      />
      <CTASection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
