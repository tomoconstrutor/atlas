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
    eyebrow: t("Practical AI for operators", "AI pratica para operadores"),
    headline: t(
      "Most companies do not need more AI. They need less busywork.",
      "A maioria das empresas nao precisa de mais AI. Precisa de menos trabalho chato."
    ),
    subheadline: t(
      "A short map of where AI already helps by industry: classifying requests, summarizing information, personalizing responses, and removing manual work. No hype. No jargon.",
      "Um mapa curto de onde a AI ja ajuda por setor: classificar pedidos, resumir informacao, personalizar respostas e tirar trabalho manual da frente. Sem hype. Sem jargao."
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
      t("Less drag, faster response", "Menos friccao, resposta mais rapida")
    ]
  },
  context: {
    body: t(
      "Think less about chatbots. Think about classification, summaries, first drafts, routing, and useful context.",
      "Pensa menos em chatbots. Pensa mais em classificacao, resumo, primeira versao, routing e contexto util."
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
    materials: t("Exportable kit", "Kit exportavel"),
    opportunities: t("Universal opportunities", "Oportunidades universais"),
    howItWorks: t("How it works", "Como funciona"),
    cta: t("Custom map", "Mapa personalizado")
  },
  detail: {
    titlePrefix: t("AI /", "AI /"),
    timeLeaks: t("Where time usually disappears", "Onde o tempo desaparece"),
    useCases: t("Opportunity points", "Pontos de oportunidade"),
    quickWins: t("Quick wins", "Ganhos rapidos"),
    workflows: t("Practical workflows", "Workflows praticos"),
    miniTools: t("Mini-tools", "Mini-tools"),
    prompts: t("Prompt cards", "Prompts"),
    firstWorkflow: t("First workflow", "Primeiro workflow"),
    buildNext: t("Build next", "Programar a seguir"),
    copyPrompt: t("Copy prompt", "Copiar prompt"),
    copied: t("Copied", "Copiado"),
    implementation: t("Implementation", "Implementacao"),
    input: t("Input", "Input"),
    output: t("Output", "Output")
  },
  cards: {
    selected: t("Selected", "Selecionado"),
    route: t("Route", "Rota")
  },
  how: {
    step: t("Step", "Passo"),
    steps: [
      {
        title: t("Start with repeated work", "Comeca pelo trabalho repetido"),
        body: t(
          "The first wins are usually boring: classifying, summarizing, preparing a draft, and routing the next action.",
          "Os primeiros ganhos costumam ser aborrecidos: classificar, resumir, preparar um rascunho e encaminhar a proxima acao."
        )
      },
      {
        title: t("Structure the output", "Estrutura o output"),
        body: t(
          "Useful AI work has a shape: fields, priorities, missing information, recommended next step, and a clear owner.",
          "Trabalho util com AI tem forma: campos, prioridades, informacao em falta, proxima acao recomendada e responsavel claro."
        )
      },
      {
        title: t("Keep human control", "Mantem controlo humano"),
        body: t(
          "AI can prepare, suggest, and accelerate. Sensitive decisions still need a responsible person in the loop.",
          "AI pode preparar, sugerir e acelerar. Decisoes sensiveis continuam a precisar de uma pessoa responsavel no loop."
        )
      }
    ]
  },
  materials: {
    eyebrow: t("Ready-to-send asset", "Asset pronto a enviar"),
    headline: t("Export the selected report", "Exporta o relatorio do setor selecionado"),
    body: t(
      "A polished MIND-style report with workflows, prompts, mini-tools, and outreach copy for the industry currently open.",
      "Um relatorio polido em estilo MIND com workflows, prompts, mini-tools e copy de outreach para o setor aberto."
    ),
    previewTitle: t("Included", "Inclui"),
    previewItems: [
      t("Top time leaks", "Principais fugas de tempo"),
      t("Workflows and mini-tools", "Workflows e mini-tools"),
      t("Prompt cards", "Prompts"),
      t("Outreach email copy", "Copy de email")
    ],
    emailLabel: t("Send to email", "Enviar para email"),
    emailPlaceholder: t("name@company.com", "nome@empresa.com"),
    downloadButton: t("Download PDF", "Download PDF"),
    emailButton: t("Send PDF", "Enviar PDF"),
    emailFallbackButton: t("Email note", "Enviar nota"),
    invalidEmail: t("Enter a valid email or leave it empty to download the PDF.", "Usa um email valido ou deixa vazio para download do PDF."),
    copyButton: t("Copy email copy", "Copiar copy de email"),
    copied: t("Email copy copied", "Copy de email copiada"),
    preparing: t("Preparing PDF", "A preparar PDF"),
    sending: t("Sending PDF", "A enviar PDF"),
    sent: t("Sent. Check the inbox for the PDF report.", "Enviado. Ve a inbox para encontrar o relatorio PDF."),
    sendFailed: t("Could not send the PDF right now. Try again or leave the email empty to download it.", "Nao foi possivel enviar o PDF agora. Tenta outra vez ou deixa o email vazio para download."),
    filenameNote: t("If no email is entered, the report downloads as a PDF.", "Sem email, o relatorio fica disponivel como PDF."),
    emailNote: t("With email delivery configured, the PDF is sent directly with the report attached.", "Com envio de email configurado, o PDF e enviado diretamente em anexo."),
    emailFallbackNote: t("Email delivery is not configured here yet, so email opens a prefilled note.", "O envio direto ainda nao esta configurado aqui, por isso o email abre uma nota preenchida.")
  },
  cta: {
    headline: t("Custom AI Map", "Mapa AI personalizado"),
    body: t(
      "Tell me your industry, team size, and two tasks that waste time. I will send back 3 AI workflows that make sense.",
      "Diz-me o setor, o tamanho da equipa e duas tarefas que vos roubam tempo. Devolvo 3 workflows de AI que fazem sentido."
    ),
    button: t("Request my AI map", "Pedir o meu AI map"),
    disabledHint: t("Contact email not configured yet", "Email ainda nao configurado")
  },
  footer: {
    line: t(
      "Built for people who prefer clarity to buzzwords.",
      "Feito para quem prefere clareza a buzzwords."
    )
  }
};
