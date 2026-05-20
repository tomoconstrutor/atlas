import { outreachMaterials } from "@/data/materials";
import { BRAND_NAME } from "@/data/site";
import { text } from "@/lib/localize";
import type { Industry, Locale } from "@/types/content";

const labels = {
  en: {
    kit: "Industry kit",
    problems: "Top time leaks",
    workflows: "Workflows",
    miniTools: "Mini-tools",
    prompts: "Prompt cards",
    firstWorkflow: "First workflow to test",
    buildNext: "Build next",
    subjectLines: "Subject lines",
    outreach: "Outreach variants",
    followUp: "Follow-up CTA",
    inputs: "Inputs",
    output: "Output"
  },
  pt: {
    kit: "Kit do setor",
    problems: "Principais fugas de tempo",
    workflows: "Workflows",
    miniTools: "Mini-tools",
    prompts: "Prompts",
    firstWorkflow: "Primeiro workflow a testar",
    buildNext: "Programar a seguir",
    subjectLines: "Linhas de assunto",
    outreach: "Variantes de outreach",
    followUp: "CTA de follow-up",
    inputs: "Inputs",
    output: "Output"
  }
};

function section(title: string, lines: string[]) {
  return [title, ...lines].join("\n");
}

function numbered(lines: string[]) {
  return lines.map((line, index) => `${index + 1}. ${line}`);
}

export function buildExportFilename(industry: Industry, locale: Locale) {
  return `ai-atlas-${industry.id}-${locale}-kit.txt`;
}

export function buildEmailSubject(industry: Industry, locale: Locale) {
  return locale === "pt"
    ? `AI Atlas: kit para ${text(industry.name, locale)}`
    : `AI Atlas: kit for ${text(industry.name, locale)}`;
}

export function buildIndustryKit(industry: Industry, locale: Locale) {
  const l = labels[locale];
  const industryName = text(industry.name, locale);
  const kitTitle = `${BRAND_NAME} / ${l.kit}: ${industryName}`;

  const header = [
    kitTitle,
    text(industry.subtitle, locale),
    "",
    locale === "pt"
      ? "Copy pronta para usar em outreach, briefing interno ou primeiro teste operacional."
      : "Ready-to-use copy for outreach, internal briefing, or a first operational test."
  ];

  const problemLines = numbered(industry.problems[locale]);

  const workflowLines = industry.workflows.flatMap((workflow, index) => [
    `${index + 1}. ${text(workflow.title, locale)}`,
    `   ${text(workflow.summary, locale)}`,
    `   ${text(workflow.implementation, locale)}`
  ]);

  const miniToolLines = industry.miniTools.flatMap((tool, index) => [
    `${index + 1}. ${text(tool.title, locale)}`,
    `   ${text(tool.description, locale)}`,
    `   ${l.inputs}: ${tool.inputs[locale].join(", ")}`,
    `   ${l.output}: ${text(tool.output, locale)}`
  ]);

  const promptLines = industry.promptCards.flatMap((promptCard, index) => [
    `${index + 1}. ${text(promptCard.title, locale)}`,
    `   ${text(promptCard.prompt, locale)}`
  ]);

  const firstWorkflowLines = [
    text(industry.firstWorkflow.title, locale),
    text(industry.firstWorkflow.why, locale),
    ...numbered(industry.firstWorkflow.steps[locale]),
    "",
    `${l.buildNext}: ${industry.firstWorkflow.buildNext.join(", ")}`
  ];

  const outreachLines = outreachMaterials.variants.flatMap((variant, index) => [
    `${index + 1}. ${text(variant.title, locale)}`,
    `   ${text(variant.body, locale)}`
  ]);

  return [
    header.join("\n"),
    section(l.problems, problemLines),
    section(l.workflows, workflowLines),
    section(l.miniTools, miniToolLines),
    section(l.prompts, promptLines),
    section(l.firstWorkflow, firstWorkflowLines),
    section(l.subjectLines, numbered(outreachMaterials.subjectLines[locale])),
    section(l.outreach, outreachLines),
    section(l.followUp, [text(outreachMaterials.followUp, locale)])
  ].join("\n\n");
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
