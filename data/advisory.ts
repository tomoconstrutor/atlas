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
      "Não deixes que a AI te torne ultrapassado."
    ),
    subheadline: t(
      "Every day brings new models, tools, tactics, and opinions. Atlas filters the noise into the few moves that matter for your role, your decisions, and your leverage.",
      "Todos os dias aparecem novos modelos, ferramentas, táticas e opiniões. O Atlas filtra o ruído e deixa apenas os movimentos que importam para o teu papel, decisões e alavancagem."
    ),
    primaryCta: t("Request AI brief", "Pedir brief AI"),
    secondaryCta: t("View AI map", "Ver mapa AI")
  },
  counters: {
    releasedLabel: t(
      "AI news and updates released today",
      "Notícias e updates de AI lançados hoje"
    ),
    releasedSublabel: t(
      "Every few seconds, another one lands.",
      "A cada poucos segundos, chega mais um."
    ),
    relevantLabel: t(
      "AI news and updates that matter to you",
      "Notícias e updates de AI que importam para ti"
    ),
    relevantSublabel: t(
      "Atlas turns the feed into decisions.",
      "O Atlas transforma o feed em decisões."
    ),
    filterBody: t(
      "Reads the flood, rejects the generic, and keeps only the leverage signal.",
      "Lê a avalanche, rejeita o genérico e guarda apenas o sinal de alavancagem."
    ),
    releasedMin: 142,
    releasedMax: 2228,
    releasedCap: 2228,
    sessionIncrementMinMs: 7000,
    sessionIncrementMaxMs: 14000,
    relevant: 3
  },
  leveragePoints: [
    {
      label: t("Signal", "Sinal"),
      body: t(
        "What changed in AI that is actually worth your attention.",
        "O que mudou em AI e realmente merece a tua atenção."
      )
    },
    {
      label: t("Application", "Aplicação"),
      body: t(
        "Where that change can improve your work, decisions, or team speed.",
        "Onde essa mudança pode melhorar o teu trabalho, decisões ou velocidade da equipa."
      )
    },
    {
      label: t("Next move", "Próximo passo"),
      body: t(
        "The three actions to test first, without adding another tool graveyard.",
        "As três ações a testar primeiro, sem criar outro cemitério de ferramentas."
      )
    }
  ],
  form: {
    eyebrow: t("Brief request", "Pedido de brief"),
    title: t(
      "Get the 3 AI moves worth your attention.",
      "Recebe os 3 movimentos de AI que merecem a tua atenção."
    ),
    body: t(
      "Tell Atlas where leverage would matter most. The brief stays practical, short, and personal.",
      "Diz ao Atlas onde a alavancagem importa mais. O brief fica prático, curto e pessoal."
    ),
    nameLabel: t("Name", "Nome"),
    namePlaceholder: t("Your name", "O teu nome"),
    emailLabel: t("Work email", "Email profissional"),
    emailPlaceholder: t("name@company.com", "nome@empresa.com"),
    roleLabel: t("Role", "Função"),
    rolePlaceholder: t("Founder, operator, partner...", "Founder, operador, partner..."),
    goalLabel: t("Where do you want leverage?", "Onde queres mais alavancagem?"),
    goalPlaceholder: t(
      "Decisions, sales, hiring, reporting, personal workflow...",
      "Decisões, vendas, hiring, reporting, workflow pessoal..."
    ),
    button: t("Request AI brief", "Pedir brief AI"),
    submitting: t("Sending request", "A enviar pedido"),
    invalidEmail: t(
      "Enter a valid work email to request the brief.",
      "Insere um email profissional válido para pedir o brief."
    ),
    missingConfig: t(
      "Lead capture is not configured yet.",
      "A captura de leads ainda não está configurada."
    ),
    failed: t(
      "We could not save the request. Please try again.",
      "Não conseguimos guardar o pedido. Tenta novamente."
    ),
    success: t(
      "Request received. Atlas will filter the noise from here.",
      "Pedido recebido. O Atlas filtra o ruído a partir daqui."
    )
  }
};
