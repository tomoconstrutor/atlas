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

export type Workflow = {
  title: LocalizedText;
  summary: LocalizedText;
  implementation: LocalizedText;
};

export type MiniTool = {
  title: LocalizedText;
  description: LocalizedText;
  inputs: Record<Locale, string[]>;
  output: LocalizedText;
};

export type PromptCard = {
  title: LocalizedText;
  prompt: LocalizedText;
};

export type FirstWorkflow = {
  title: LocalizedText;
  why: LocalizedText;
  steps: Record<Locale, string[]>;
  buildNext: string[];
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
  workflows: Workflow[];
  miniTools: MiniTool[];
  promptCards: PromptCard[];
  firstWorkflow: FirstWorkflow;
};

export type Opportunity = {
  id: string;
  title: LocalizedText;
  meaning: LocalizedText;
  example: LocalizedText;
};

export type OutreachVariant = {
  title: LocalizedText;
  body: LocalizedText;
};

export type OutreachMaterials = {
  subjectLines: Record<Locale, string[]>;
  variants: OutreachVariant[];
  followUp: LocalizedText;
};
