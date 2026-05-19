import type { LocalizedText, Opportunity } from "@/types/content";

const t = (en: string, pt = ""): LocalizedText => ({ en, pt });
const empty = t("");

export const opportunities: Opportunity[] = [
  {
    id: "classification",
    title: t("Classification", "Classificacao"),
    meaning: empty,
    example: empty
  },
  {
    id: "personalization",
    title: t("Personalization", "Personalizacao"),
    meaning: empty,
    example: empty
  },
  {
    id: "summarization",
    title: t("Summarization", "Resumo"),
    meaning: empty,
    example: empty
  },
  {
    id: "generation",
    title: t("Generation", "Geracao"),
    meaning: empty,
    example: empty
  },
  {
    id: "routing",
    title: t("Routing", "Routing"),
    meaning: empty,
    example: empty
  },
  {
    id: "decision-support",
    title: t("Decision Support", "Apoio a decisao"),
    meaning: empty,
    example: empty
  }
];
