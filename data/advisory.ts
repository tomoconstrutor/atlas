import type { LocalizedText } from "@/types/content";

const t = (en: string, pt: string): LocalizedText => ({ en, pt });

export const advisoryText = {
  tabs: {
    advisory: t("AI Advisory", "Advisoria AI"),
    map: t("AI Map", "Mapa AI")
  },
  hero: {
    eyebrow: t("Personal AI Advisory", "Advisoria AI pessoal"),
    headline: t(
      "Do not let AI make you outdated.",
      "Nao deixes que a AI te torne ultrapassado."
    ),
    subheadline: t(
      "Every day brings new models, tools, tactics, and opinions. Atlas filters the noise into the few moves that matter for your role, your decisions, and your leverage.",
      "Todos os dias aparecem novos modelos, ferramentas, taticas e opinioes. O Atlas filtra o ruido e deixa apenas os movimentos que importam para o teu papel, decisoes e alavancagem."
    ),
    primaryCta: t("Request AI brief", "Pedir brief AI"),
    secondaryCta: t("View AI map", "Ver mapa AI")
  },
  counters: {
    releasedLabel: t(
      "AI news and updates released today",
      "Noticias e updates de AI lancados hoje"
    ),
    releasedSublabel: t(
      "Every few seconds, another one lands.",
      "A cada poucos segundos, chega mais um."
    ),
    relevantLabel: t(
      "AI news and updates that matter to you",
      "Noticias e updates de AI que importam para ti"
    ),
    relevantSublabel: t(
      "Atlas turns the feed into decisions.",
      "O Atlas transforma o feed em decisoes."
    ),
    filterBody: t(
      "Reads the flood, rejects the generic, and keeps only the leverage signal.",
      "Le a avalanche, rejeita o generico e guarda apenas o sinal de alavancagem."
    ),
    releasedMin: 142,
    releasedMax: 187,
    releasedCap: 199,
    sessionIncrementMinMs: 7000,
    sessionIncrementMaxMs: 14000,
    relevant: 3
  },
  leveragePoints: [
    {
      label: t("Signal", "Sinal"),
      body: t(
        "What changed in AI that is actually worth your attention.",
        "O que mudou em AI e realmente merece a tua atencao."
      )
    },
    {
      label: t("Application", "Aplicacao"),
      body: t(
        "Where that change can improve your work, decisions, or team speed.",
        "Onde essa mudanca pode melhorar o teu trabalho, decisoes ou velocidade da equipa."
      )
    },
    {
      label: t("Next move", "Proximo passo"),
      body: t(
        "The three actions to test first, without adding another tool graveyard.",
        "As tres acoes a testar primeiro, sem criar outro cemiterio de ferramentas."
      )
    }
  ],
  form: {
    eyebrow: t("Brief request", "Pedido de brief"),
    title: t(
      "Get the 3 AI moves worth your attention.",
      "Recebe os 3 movimentos de AI que merecem a tua atencao."
    ),
    body: t(
      "Tell Atlas where leverage would matter most. The brief stays practical, short, and personal.",
      "Diz ao Atlas onde a alavancagem importa mais. O brief fica pratico, curto e pessoal."
    ),
    nameLabel: t("Name", "Nome"),
    namePlaceholder: t("Your name", "O teu nome"),
    emailLabel: t("Work email", "Email profissional"),
    emailPlaceholder: t("name@company.com", "nome@empresa.com"),
    roleLabel: t("Role", "Funcao"),
    rolePlaceholder: t("Founder, operator, partner...", "Founder, operador, partner..."),
    goalLabel: t("Where do you want leverage?", "Onde queres mais alavancagem?"),
    goalPlaceholder: t(
      "Decisions, sales, hiring, reporting, personal workflow...",
      "Decisoes, vendas, hiring, reporting, workflow pessoal..."
    ),
    button: t("Request AI brief", "Pedir brief AI"),
    submitting: t("Sending request", "A enviar pedido"),
    invalidEmail: t(
      "Enter a valid work email to request the brief.",
      "Insere um email profissional valido para pedir o brief."
    ),
    missingConfig: t(
      "Lead capture is not configured yet.",
      "A captura de leads ainda nao esta configurada."
    ),
    failed: t(
      "We could not save the request. Please try again.",
      "Nao conseguimos guardar o pedido. Tenta novamente."
    ),
    success: t(
      "Request received. Atlas will filter the noise from here.",
      "Pedido recebido. O Atlas filtra o ruido a partir daqui."
    )
  }
};
