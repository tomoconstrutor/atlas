import { outreachMaterials } from "@/data/materials";
import { BRAND_NAME } from "@/data/site";
import { text } from "@/lib/localize";
import type { Industry, Locale } from "@/types/content";

export type ReportKit = {
  brand: string;
  title: string;
  subtitle: string;
  locale: Locale;
  industryId: string;
  industryName: string;
  generatedLabel: string;
  intro: string;
  labels: {
    coverKicker: string;
    contents: string;
    opportunityFrame: string;
    timeLeaks: string;
    workflows: string;
    miniTools: string;
    prompts: string;
    outreach: string;
    firstWorkflow: string;
    section01: string;
    followUp: string;
    preparedBy: string;
    version: string;
    footer: string;
  };
  problems: string[];
  workflows: Array<{
    title: string;
    summary: string;
    implementation: string;
  }>;
  miniTools: Array<{
    title: string;
    description: string;
    inputs: string[];
    output: string;
  }>;
  prompts: Array<{
    title: string;
    prompt: string;
  }>;
  firstWorkflow: {
    title: string;
    why: string;
    steps: string[];
    buildNext: string[];
  };
  subjectLines: string[];
  outreachVariants: Array<{
    title: string;
    body: string;
  }>;
  followUp: string;
};

const reportCopy = {
  en: {
    titleSuffix: "AI Opportunity Report",
    generatedLabel: "Report kit",
    intro:
      "A compact operating brief for the first useful AI workflows: where time disappears, what to test first, and copy ready for outreach.",
    emailIntro:
      "I prepared a compact AI Atlas report for this sector. The PDF is ready on the page, and the note below gives you the useful summary.",
    problemHeading: "Top time leaks",
    workflowHeading: "Practical workflows",
    toolHeading: "Mini-tools",
    promptHeading: "Prompt cards",
    firstWorkflowHeading: "First workflow to test",
    outreachHeading: "Outreach copy",
    downloadName: "report",
    labels: {
      coverKicker: "Report kit",
      contents: "Contents",
      opportunityFrame: "Opportunity frame",
      timeLeaks: "Time leaks",
      workflows: "Workflows",
      miniTools: "Mini-tools",
      prompts: "Prompts",
      outreach: "Outreach",
      firstWorkflow: "First workflow",
      section01: "Section 01",
      followUp: "Follow-up",
      preparedBy: "Prepared by",
      version: "Version",
      footer: "AI Atlas / Exportable report"
    }
  },
  pt: {
    titleSuffix: "Relatório de Oportunidades AI",
    generatedLabel: "Report kit",
    intro:
      "Um briefing operacional compacto para os primeiros workflows úteis de AI: onde o tempo desaparece, o que testar primeiro e copy pronta para outreach.",
    emailIntro:
      "Preparei um relatório compacto do AI Atlas para este setor. O PDF está pronto na página, e a nota abaixo deixa o resumo útil.",
    problemHeading: "Principais fugas de tempo",
    workflowHeading: "Workflows práticos",
    toolHeading: "Mini-tools",
    promptHeading: "Prompts",
    firstWorkflowHeading: "Primeiro workflow a testar",
    outreachHeading: "Copy de outreach",
    downloadName: "relatório",
    labels: {
      coverKicker: "Report kit",
      contents: "Conteúdos",
      opportunityFrame: "Mapa de oportunidade",
      timeLeaks: "Fugas de tempo",
      workflows: "Workflows",
      miniTools: "Mini-tools",
      prompts: "Prompts",
      outreach: "Outreach",
      firstWorkflow: "Primeiro workflow",
      section01: "Secção 01",
      followUp: "Follow-up",
      preparedBy: "Preparado por",
      version: "Versão",
      footer: "AI Atlas / Relatório exportável"
    }
  }
};

export function buildReportKit(industry: Industry, locale: Locale): ReportKit {
  const copy = reportCopy[locale];
  const industryName = text(industry.name, locale);

  return {
    brand: BRAND_NAME,
    title: `${industryName} ${copy.titleSuffix}`,
    subtitle: text(industry.subtitle, locale),
    locale,
    industryId: industry.id,
    industryName,
    generatedLabel: copy.generatedLabel,
    intro: copy.intro,
    labels: copy.labels,
    problems: industry.problems[locale],
    workflows: industry.workflows.map((workflow) => ({
      title: text(workflow.title, locale),
      summary: text(workflow.summary, locale),
      implementation: text(workflow.implementation, locale)
    })),
    miniTools: industry.miniTools.map((tool) => ({
      title: text(tool.title, locale),
      description: text(tool.description, locale),
      inputs: tool.inputs[locale],
      output: text(tool.output, locale)
    })),
    prompts: industry.promptCards.map((promptCard) => ({
      title: text(promptCard.title, locale),
      prompt: text(promptCard.prompt, locale)
    })),
    firstWorkflow: {
      title: text(industry.firstWorkflow.title, locale),
      why: text(industry.firstWorkflow.why, locale),
      steps: industry.firstWorkflow.steps[locale],
      buildNext: industry.firstWorkflow.buildNext
    },
    subjectLines: outreachMaterials.subjectLines[locale],
    outreachVariants: outreachMaterials.variants.map((variant) => ({
      title: text(variant.title, locale),
      body: text(variant.body, locale)
    })),
    followUp: text(outreachMaterials.followUp, locale)
  };
}

export function buildReportFilename(report: ReportKit) {
  return `ai-atlas-${report.industryId}-${report.locale}-report.pdf`;
}

export function buildReportEmailSubject(report: ReportKit) {
  return report.locale === "pt"
    ? `AI Atlas: relatório para ${report.industryName}`
    : `AI Atlas: report for ${report.industryName}`;
}

export function buildReportEmailBody(report: ReportKit) {
  const copy = reportCopy[report.locale];
  const lines = [
    copy.emailIntro,
    "",
    `${report.title}`,
    `${report.subtitle}`,
    "",
    copy.problemHeading,
    ...report.problems.slice(0, 4).map((item, index) => `${index + 1}. ${item}`),
    "",
    copy.firstWorkflowHeading,
    `${report.firstWorkflow.title}: ${report.firstWorkflow.why}`,
    "",
    copy.outreachHeading,
    report.outreachVariants[0]?.body ?? "",
    "",
    report.followUp
  ];

  return lines.join("\n");
}

export function buildReportPlainText(report: ReportKit) {
  const copy = reportCopy[report.locale];
  return [
    `${report.brand} / ${report.title}`,
    report.subtitle,
    "",
    report.intro,
    "",
    copy.problemHeading,
    ...report.problems.map((item, index) => `${index + 1}. ${item}`),
    "",
    copy.workflowHeading,
    ...report.workflows.flatMap((workflow, index) => [
      `${index + 1}. ${workflow.title}`,
      `   ${workflow.summary}`,
      `   ${workflow.implementation}`
    ]),
    "",
    copy.toolHeading,
    ...report.miniTools.flatMap((tool, index) => [
      `${index + 1}. ${tool.title}`,
      `   ${tool.description}`,
      `   Inputs: ${tool.inputs.join(", ")}`,
      `   Output: ${tool.output}`
    ]),
    "",
    copy.promptHeading,
    ...report.prompts.flatMap((prompt, index) => [
      `${index + 1}. ${prompt.title}`,
      `   ${prompt.prompt}`
    ]),
    "",
    copy.firstWorkflowHeading,
    report.firstWorkflow.title,
    report.firstWorkflow.why,
    ...report.firstWorkflow.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    copy.outreachHeading,
    ...report.outreachVariants.map((variant, index) => `${index + 1}. ${variant.title}\n   ${variant.body}`),
    "",
    report.followUp
  ].join("\n");
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
