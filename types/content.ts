export type Locale = "en" | "pt";

export type LocalizedText = {
  en: string;
  pt: string;
};

export type Category =
  | "Classification"
  | "Personalization"
  | "Summarization"
  | "Generation"
  | "Routing"
  | "Decision Support";

export type IconName =
  | "Building2"
  | "Cpu"
  | "HeartPulse"
  | "Car"
  | "Scale"
  | "Trophy";

export type UseCase = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  value: LocalizedText;
  category: Category;
};

export type Industry = {
  id: string;
  name: LocalizedText;
  icon: IconName;
  subtitle: LocalizedText;
  tags: LocalizedText[];
  problems: Record<Locale, string[]>;
  useCases: UseCase[];
  quickWins: Record<Locale, string[]>;
  prompts: Record<Locale, string[]>;
  firstWorkflow: LocalizedText;
};

export type Opportunity = {
  id: string;
  title: LocalizedText;
  meaning: LocalizedText;
  example: LocalizedText;
};
