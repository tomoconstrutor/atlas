import type { Category, Industry, LocalizedText, UseCase } from "@/types/content";

const t = (en: string, pt = ""): LocalizedText => ({ en, pt });
const empty = t("");

const useCase = (id: string, category: Category): UseCase => ({
  id,
  title: empty,
  description: empty,
  value: empty,
  category
});

export const industries: Industry[] = [
  {
    id: "real-estate",
    name: t("Real Estate", "Imobiliario"),
    icon: "Building2",
    subtitle: empty,
    tags: [],
    problems: { en: [], pt: [] },
    useCases: [
      useCase("seller-lead-qualifier", "Classification"),
      useCase("follow-up-drafter", "Personalization"),
      useCase("viewing-notes", "Summarization"),
      useCase("listing-builder", "Generation")
    ],
    quickWins: { en: [], pt: [] },
    prompts: { en: [], pt: [] },
    firstWorkflow: empty
  },
  {
    id: "tech",
    name: t("Tech", "Tecnologia"),
    icon: "Cpu",
    subtitle: empty,
    tags: [],
    problems: { en: [], pt: [] },
    useCases: [
      useCase("ticket-triage", "Routing"),
      useCase("feedback-synthesis", "Summarization"),
      useCase("answer-drafts", "Generation")
    ],
    quickWins: { en: [], pt: [] },
    prompts: { en: [], pt: [] },
    firstWorkflow: empty
  },
  {
    id: "health-clinics",
    name: t("Health / Clinics", "Saude / Clinicas"),
    icon: "HeartPulse",
    subtitle: empty,
    tags: [],
    problems: { en: [], pt: [] },
    useCases: [
      useCase("enquiry-classifier", "Classification"),
      useCase("reminder-personalizer", "Personalization"),
      useCase("visit-summary", "Summarization")
    ],
    quickWins: { en: [], pt: [] },
    prompts: { en: [], pt: [] },
    firstWorkflow: empty
  },
  {
    id: "car-dealers",
    name: t("Car Dealers", "Concessionarios"),
    icon: "Car",
    subtitle: empty,
    tags: [],
    problems: { en: [], pt: [] },
    useCases: [
      useCase("buyer-scoring", "Decision Support"),
      useCase("trade-in-intake", "Classification"),
      useCase("vehicle-listings", "Generation")
    ],
    quickWins: { en: [], pt: [] },
    prompts: { en: [], pt: [] },
    firstWorkflow: empty
  },
  {
    id: "law",
    name: t("Law", "Direito"),
    icon: "Scale",
    subtitle: empty,
    tags: [],
    problems: { en: [], pt: [] },
    useCases: [
      useCase("matter-intake", "Classification"),
      useCase("document-summary", "Summarization"),
      useCase("client-update", "Generation")
    ],
    quickWins: { en: [], pt: [] },
    prompts: { en: [], pt: [] },
    firstWorkflow: empty
  },
  {
    id: "sports",
    name: t("Sports", "Desporto"),
    icon: "Trophy",
    subtitle: empty,
    tags: [],
    problems: { en: [], pt: [] },
    useCases: [
      useCase("performance-summary", "Summarization"),
      useCase("athlete-feedback", "Personalization"),
      useCase("scouting-classifier", "Decision Support")
    ],
    quickWins: { en: [], pt: [] },
    prompts: { en: [], pt: [] },
    firstWorkflow: empty
  }
];
