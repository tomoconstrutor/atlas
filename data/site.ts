import type { LocalizedText } from "@/types/content";

export const BRAND_NAME = "AI Atlas";
export const CONTACT_EMAIL = "";

const t = (en: string, pt = ""): LocalizedText => ({ en, pt });

export const siteText = {
  nav: {
    industries: t("Industries", "Setores"),
    opportunities: t("Opportunities", "Oportunidades"),
    materials: t("Materials", "Materiais"),
    cta: t("Get My AI Map", "Pedir AI Map")
  },
  hero: {
    eyebrow: t("Practical AI for operators", "AI prática para operadores"),
    headline: t(
      "Most companies do not need more AI. They need less busywork.",
      "A maioria das empresas não precisa de mais AI. Precisa de menos trabalho chato."
    ),
    subheadline: t(
      "A short map of where AI already helps by industry: classifying requests, summarizing information, personalizing responses, and removing manual work. No hype. No jargon.",
      "Um mapa curto de onde a AI já ajuda por setor: classificar pedidos, resumir informação, personalizar respostas e tirar trabalho manual da frente. Sem hype. Sem jargão."
    ),
    primaryCta: t("Explore use cases", "Explorar casos"),
    secondaryCta: t("Request custom map", "Pedir mapa"),
    stackWord: t("ATLAS", "ATLAS"),
    opportunityCard: t("Opportunity card", "Carta de oportunidade"),
    cardLabels: [
      t("Industry", "Setor"),
      t("Problem", "Problema"),
      t("AI Workflow", "Workflow AI"),
      t("Outcome", "Resultado")
    ],
    cardValues: [
      t("Choose the operating context", "Escolhe o contexto operacional"),
      t("Find repeated work", "Encontra trabalho repetido"),
      t("Classify, summarize, draft, route", "Classificar, resumir, rascunhar, encaminhar"),
      t("Less drag, faster response", "Menos fricção, resposta mais rápida")
    ]
  },
  context: {
    body: t(
      "Think less about chatbots. Think about classification, summaries, first drafts, routing, and useful context.",
      "Pensa menos em chatbots. Pensa mais em classificação, resumo, primeira versão, routing e contexto útil."
    ),
    pills: [
      t("Save time", "Poupar tempo"),
      t("Classify better", "Classificar melhor"),
      t("Personalize", "Personalizar"),
      t("Export materials", "Exportar materiais")
    ]
  },
  sections: {
    industries: t("Industry explorer", "Explorador de setores"),
    detail: t("Selected route", "Rota selecionada"),
    materials: t("Exportable kit", "Kit exportável"),
    opportunities: t("Universal opportunities", "Oportunidades universais"),
    howItWorks: t("How it works", "Como funciona"),
    cta: t("Custom map", "Mapa personalizado")
  },
  detail: {
    titlePrefix: t("AI /", "AI /"),
    timeLeaks: t("Where time usually disappears", "Onde o tempo desaparece"),
    useCases: t("Opportunity points", "Pontos de oportunidade"),
    quickWins: t("Quick wins", "Ganhos rápidos"),
    workflows: t("Practical workflows", "Workflows práticos"),
    miniTools: t("Mini-tools", "Mini-tools"),
    prompts: t("Prompt cards", "Prompts"),
    firstWorkflow: t("First workflow", "Primeiro workflow"),
    buildNext: t("Build next", "Programar a seguir"),
    copyPrompt: t("Copy prompt", "Copiar prompt"),
    copied: t("Copied", "Copiado"),
    implementation: t("Implementation", "Implementação"),
    input: t("Input", "Input"),
    output: t("Output", "Output")
  },
  cards: {
    selected: t("Selected", "Selecionado"),
    route: t("Route", "Rota")
  },
  exploreAnother: {
    label: t("Choose a different route", "Escolher outra rota"),
    button: t("Explore another industry", "Explorar outro setor")
  },
  how: {
    step: t("Step", "Passo"),
    steps: [
      {
        title: t("Start with repeated work", "Começa pelo trabalho repetido"),
        body: t(
          "The first wins are usually boring: classifying, summarizing, preparing a draft, and routing the next action.",
          "Os primeiros ganhos costumam ser aborrecidos: classificar, resumir, preparar um rascunho e encaminhar a próxima ação."
        )
      },
      {
        title: t("Structure the output", "Estrutura o output"),
        body: t(
          "Useful AI work has a shape: fields, priorities, missing information, recommended next step, and a clear owner.",
          "Trabalho útil com AI tem forma: campos, prioridades, informação em falta, próxima ação recomendada e responsável claro."
        )
      },
      {
        title: t("Keep human control", "Mantém controlo humano"),
        body: t(
          "AI can prepare, suggest, and accelerate. Sensitive decisions still need a responsible person in the loop.",
          "AI pode preparar, sugerir e acelerar. Decisões sensíveis continuam a precisar de uma pessoa responsável no loop."
        )
      }
    ]
  },
  materials: {
    eyebrow: t("Ready-to-send asset", "Asset pronto a enviar"),
    headline: t("Export the selected report", "Exporta o relatório do setor selecionado"),
    body: t(
      "A polished MIND-style report with workflows, prompts, mini-tools, and outreach copy for the industry currently open.",
      "Um relatório polido em estilo MIND com workflows, prompts, mini-tools e copy de outreach para o setor aberto."
    ),
    previewTitle: t("Included", "Inclui"),
    previewItems: [
      t("Top time leaks", "Principais fugas de tempo"),
      t("Workflows and mini-tools", "Workflows e mini-tools"),
      t("Prompt cards", "Prompts"),
      t("Outreach email copy", "Copy de email")
    ],
    emailLabel: t("Email", "Email"),
    emailPlaceholder: t("name@company.com", "nome@empresa.com"),
    downloadButton: t("Download PDF", "Download PDF"),
    invalidEmail: t("Enter a valid email to download the PDF.", "Usa um email válido para fazer download do PDF."),
    preparing: t("Preparing PDF", "A preparar PDF"),
    captured: t("Email added. Your PDF download has started.", "Email adicionado. O download do PDF já começou."),
    captureUnavailable: t(
      "Lead capture is not configured yet, so the download cannot start.",
      "A captura de leads ainda não está configurada, por isso o download não pode começar."
    ),
    captureFailed: t(
      "We could not save the email. Please try again.",
      "Não conseguimos guardar o email. Tenta novamente."
    ),
    filenameNote: t("Add an email to download the report as a PDF.", "Adiciona um email para descarregar o relatório em PDF."),
    emailNote: t("We will save the request, then start the download.", "Vamos guardar o pedido e depois iniciar o download.")
  },
  cta: {
    headline: t("Custom AI Map", "Mapa AI personalizado"),
    body: t(
      "Tell me your industry, team size, and two tasks that waste time. I will send back 3 AI workflows that make sense.",
      "Diz-me o setor, o tamanho da equipa e duas tarefas que vos roubam tempo. Devolvo 3 workflows de AI que fazem sentido."
    ),
    button: t("Request my AI map", "Pedir o meu AI map"),
    disabledHint: t("Contact email not configured yet", "Email ainda não configurado")
  },
  footer: {
    line: t(
      "Built for people who prefer clarity to buzzwords.",
      "Feito para quem prefere clareza a buzzwords."
    )
  }
};
