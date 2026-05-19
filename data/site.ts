import type { LocalizedText } from "@/types/content";

export const BRAND_NAME = "AI Atlas";
export const CONTACT_EMAIL = "";

const t = (en: string, pt = ""): LocalizedText => ({ en, pt });
const empty = t("");

export const siteText = {
  nav: {
    industries: t("Industries", "Industrias"),
    opportunities: t("Opportunities", "Oportunidades"),
    cta: t("Get My AI Map", "Pedir AI Map")
  },
  hero: {
    eyebrow: empty,
    headline: empty,
    subheadline: empty,
    primaryCta: t("Explore use cases", "Explorar casos"),
    secondaryCta: t("Request custom map", "Pedir mapa"),
    stackWord: t("ATLAS", "ATLAS"),
    opportunityCard: t("Opportunity card", "Carta de oportunidade"),
    cardLabels: [
      t("Industry", "Setor"),
      t("Problem", "Problema"),
      t("AI Workflow", "Workflow AI"),
      t("Outcome", "Resultado")
    ]
  },
  context: {
    body: empty,
    pills: [
      t("Save time", "Poupar tempo"),
      t("Classify better", "Classificar melhor"),
      t("Personalize", "Personalizar"),
      t("Automate workflows", "Automatizar")
    ]
  },
  sections: {
    industries: t("Industry explorer", "Explorador de setores"),
    detail: t("Selected route", "Rota selecionada"),
    opportunities: t("Universal opportunities", "Oportunidades universais"),
    howItWorks: t("How it works", "Como funciona"),
    cta: t("Custom map", "Mapa personalizado")
  },
  detail: {
    titlePrefix: t("AI /", "AI /"),
    timeLeaks: t("Where time usually disappears", "Onde o tempo desaparece"),
    useCases: t("Opportunity points", "Pontos de oportunidade"),
    quickWins: t("Quick wins", "Ganhos rapidos"),
    prompts: t("Prompt slots", "Prompts"),
    firstWorkflow: t("First workflow", "Primeiro workflow"),
    copyPrompt: t("Copy prompt", "Copiar prompt"),
    copied: t("Copied", "Copiado")
  },
  cards: {
    selected: t("Selected", "Selecionado"),
    route: t("Route", "Rota")
  },
  how: {
    step: t("Step", "Passo"),
    steps: [
      {
        title: t("Find repeated work", "Encontrar trabalho repetido"),
        body: empty
      },
      {
        title: t("Classify the input", "Classificar o input"),
        body: empty
      },
      {
        title: t("Keep human control", "Manter controlo humano"),
        body: empty
      }
    ]
  },
  cta: {
    headline: t("Custom AI Map", "Mapa AI personalizado"),
    body: empty,
    button: t("Request my AI map", "Pedir o meu AI map"),
    disabledHint: t("Contact email not configured yet", "Email ainda nao configurado")
  },
  footer: {
    line: empty
  }
};
