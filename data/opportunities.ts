import type { LocalizedText, Opportunity } from "@/types/content";

const t = (en: string, pt = ""): LocalizedText => ({ en, pt });

export const opportunities: Opportunity[] = [
  {
    id: "classification",
    title: t("Classification", "Classificacao"),
    meaning: t(
      "Turn messy inputs into useful labels: leads, tickets, messages, documents, notes, and requests.",
      "Transformar inputs confusos em etiquetas uteis: leads, tickets, mensagens, documentos, notas e pedidos."
    ),
    example: t(
      "A raw lead becomes Hot, Warm, or Low with missing information and a next action.",
      "Uma lead bruta passa a Hot, Warm ou Low com informacao em falta e proxima acao."
    )
  },
  {
    id: "summarization",
    title: t("Summarization", "Resumo"),
    meaning: t(
      "Compress calls, chats, meetings, long documents, and scattered feedback into something the team can use.",
      "Comprimir chamadas, chats, reunioes, documentos longos e feedback disperso em algo que a equipa consegue usar."
    ),
    example: t(
      "A transcript becomes CRM bullets, risks, objections, and next steps.",
      "Uma transcricao vira bullets de CRM, riscos, objecoes e proximos passos."
    )
  },
  {
    id: "first-draft",
    title: t("First draft", "Primeira versao"),
    meaning: t(
      "Use AI to prepare emails, proposals, descriptions, reports, follow-ups, and scripts faster.",
      "Usar AI para preparar emails, propostas, descricoes, relatorios, follow-ups e scripts mais depressa."
    ),
    example: t(
      "A few bullet points become a polished message that still gets human review.",
      "Alguns bullets viram uma mensagem polida que continua a ter revisao humana."
    )
  },
  {
    id: "routing",
    title: t("Routing", "Routing"),
    meaning: t(
      "Send the right request to the right person with less manual sorting and fewer forgotten handoffs.",
      "Enviar o pedido certo para a pessoa certa com menos triagem manual e menos handoffs esquecidos."
    ),
    example: t(
      "A patient message, support ticket, or intake email gets a category, urgency, and owner.",
      "Uma mensagem, ticket ou email de intake recebe categoria, urgencia e responsavel."
    )
  },
  {
    id: "personalization",
    title: t("Personalization", "Personalizacao"),
    meaning: t(
      "Create better responses without sounding like every customer, lead, or athlete received the same text.",
      "Criar respostas melhores sem parecer que todos os clientes, leads ou atletas receberam o mesmo texto."
    ),
    example: t(
      "A follow-up uses the lead context, objections, and desired next step.",
      "Um follow-up usa contexto da lead, objecoes e proxima acao desejada."
    )
  },
  {
    id: "context",
    title: t("Context", "Contexto"),
    meaning: t(
      "Turn scattered information into a shared operating view for the team.",
      "Transformar informacao espalhada numa visao operacional partilhada pela equipa."
    ),
    example: t(
      "Reviews, notes, and emails become recurring themes and decisions to make.",
      "Reviews, notas e emails viram temas recorrentes e decisoes a tomar."
    )
  }
];
