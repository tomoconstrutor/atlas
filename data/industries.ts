import type { Category, Industry, LocalizedText, UseCase } from "@/types/content";

const t = (en: string, pt = ""): LocalizedText => ({ en, pt });

const useCase = (
  id: string,
  category: Category,
  title: LocalizedText,
  description: LocalizedText,
  value: LocalizedText
): UseCase => ({
  id,
  category,
  title,
  description,
  value
});

export const industries: Industry[] = [
  {
    id: "real-estate",
    name: t("Real Estate", "Imobiliario"),
    icon: "Building2",
    subtitle: t("Fewer tire-kickers. More signs of real intent.", "Menos curiosos. Mais sinais reais de intencao."),
    tags: [t("Leads", "Leads"), t("Follow-up", "Follow-up"), t("CRM", "CRM")],
    problems: {
      en: [
        "Slow response to buyer and seller leads.",
        "Manual and inconsistent qualification.",
        "Uneven follow-up across WhatsApp and email.",
        "Incomplete CRM notes.",
        "Property descriptions written in a hurry."
      ],
      pt: [
        "Resposta lenta a leads de comprador e vendedor.",
        "Qualificacao manual e inconsistente.",
        "Seguimento desigual por WhatsApp e email.",
        "Notas de CRM incompletas.",
        "Descricoes de imoveis feitas a pressa."
      ]
    },
    useCases: [
      useCase(
        "seller-lead-qualifier",
        "Classification",
        t("Seller lead qualifier", "Qualificador de lead vendedor"),
        t("Reads the seller context and extracts timeline, motivation, zone, expected price, and property state.", "Le o contexto do vendedor e extrai prazo, motivacao, zona, preco esperado e estado do imovel."),
        t("Hot, Warm, or Low priority with missing information and next action.", "Prioridade Hot, Warm ou Low com informacao em falta e proxima acao.")
      ),
      useCase(
        "buyer-lead-classifier",
        "Classification",
        t("Buyer lead classifier", "Classificador de comprador"),
        t("Extracts budget, zone, property type, financing status, and urgency from free text.", "Extrai budget, zona, tipologia, financiamento e urgencia a partir de texto livre."),
        t("A cleaner handoff for sales follow-up.", "Um handoff mais limpo para seguimento comercial.")
      ),
      useCase(
        "follow-up-drafter",
        "Personalization",
        t("Follow-up drafter", "Rascunho de follow-up"),
        t("Turns lead context into a short message that feels specific instead of generic.", "Transforma contexto da lead numa mensagem curta que parece especifica em vez de generica."),
        t("Faster response without losing tone.", "Resposta mais rapida sem perder tom.")
      ),
      useCase(
        "listing-builder",
        "Generation",
        t("Listing builder", "Gerador de anuncio"),
        t("Turns rough property bullets into a polished listing and marketplace highlights.", "Transforma bullets do imovel num anuncio polido e highlights para marketplace."),
        t("Better listings from the same raw facts.", "Anuncios melhores a partir dos mesmos factos.")
      )
    ],
    quickWins: {
      en: [
        "Score inbound seller leads before calling.",
        "Generate a personalized first follow-up.",
        "Convert call notes into CRM bullets.",
        "Rewrite listings for a specific buyer profile."
      ],
      pt: [
        "Pontuar leads de vendedor antes da chamada.",
        "Gerar o primeiro follow-up personalizado.",
        "Converter notas de chamada em bullets de CRM.",
        "Reescrever anuncios para um perfil de comprador."
      ]
    },
    workflows: [
      {
        title: t("Seller lead qualification", "Qualificacao de lead vendedor"),
        summary: t("Asks for timeline, motivation, zone, expected price, and property state.", "Pede prazo, motivacao, zona, preco esperado e estado do imovel."),
        implementation: t("Form plus prompt plus Hot/Warm/Low score.", "Formulario + prompt + score Hot/Warm/Low.")
      },
      {
        title: t("Buyer lead classifier", "Classificador de lead comprador"),
        summary: t("Extracts budget, zone, property type, financing, and urgency.", "Extrai budget, zona, tipologia, financiamento e urgencia."),
        implementation: t("Free text to simple JSON with priority.", "Texto livre para JSON simples com prioridade.")
      },
      {
        title: t("Follow-up assistant", "Assistente de follow-up"),
        summary: t("Creates a personalized response from the latest interaction.", "Gera resposta personalizada a partir da ultima interacao."),
        implementation: t("Template plus lead context and buyer persona.", "Template + contexto da lead + buyer persona.")
      },
      {
        title: t("Property description rewriter", "Rewriter de descricao"),
        summary: t("Turns bullet points into a clearer and more premium listing.", "Transforma bullet points num anuncio mais claro e premium."),
        implementation: t("Prompt with tone, persona, and factual guardrails.", "Prompt com tom, persona e limites factuais.")
      }
    ],
    miniTools: [
      {
        title: t("Seller Lead Scorecard", "Seller Lead Scorecard"),
        description: t("Shows whether the lead deserves immediate attention.", "Ajuda a perceber se vale perseguir a lead ja."),
        inputs: {
          en: ["property data", "timeline", "motivation", "expected price"],
          pt: ["dados do imovel", "prazo", "motivacao", "preco esperado"]
        },
        output: t("score plus next best action", "score + proxima acao")
      },
      {
        title: t("Property Description Rewriter", "Property Description Rewriter"),
        description: t("Improves listings in seconds without inventing facts.", "Melhora anuncios em segundos sem inventar factos."),
        inputs: {
          en: ["bullet points", "tone", "buyer persona"],
          pt: ["bullet points", "tom", "buyer persona"]
        },
        output: t("premium listing copy", "descricao premium")
      },
      {
        title: t("Follow-up Composer", "Follow-up Composer"),
        description: t("Prevents generic lead messages.", "Evita mensagens genericas."),
        inputs: {
          en: ["lead context", "last interaction", "goal"],
          pt: ["contexto da lead", "ultima interacao", "objetivo"]
        },
        output: t("ready-to-send message", "mensagem pronta")
      }
    ],
    promptCards: [
      {
        title: t("Classify seller lead", "Classificar lead vendedor"),
        prompt: t(
          "Act as a real estate operator. Classify this seller lead as Hot, Warm, or Low based on timeline, motivation, location, expected price, and property state. Return JSON with {priority, score_0_100, reason, missingInfo, nextBestAction}. Lead: {text}",
          "Age como operador imobiliario. Classifica esta lead vendedora como Hot, Warm ou Low com base em prazo, motivacao, localizacao, preco esperado e estado do imovel. Devolve JSON com {priority, score_0_100, reason, missingInfo, nextBestAction}. Lead: {texto}"
        )
      },
      {
        title: t("Write buyer follow-up", "Escrever follow-up comprador"),
        prompt: t(
          "Write a short, human follow-up for a buyer interested in {property_type} in {area}. Context: {context}. Goal: confirm intent and move toward a viewing or call. Avoid robotic language.",
          "Escreve um follow-up curto e humano para comprador interessado em {tipologia} em {zona}. Contexto: {contexto}. Objetivo: confirmar intencao e avancar para visita ou chamada. Evita tom robotico."
        )
      },
      {
        title: t("Rewrite listing", "Reescrever anuncio"),
        prompt: t(
          "Turn these property bullet points into a polished listing. Buyer persona: {buyer_persona}. Facts: {facts}. Return 1) main description 2) 5 highlights 3) short marketplace version.",
          "Transforma estes bullet points de imovel num anuncio polido. Buyer persona: {buyer_persona}. Factos: {factos}. Devolve 1) descricao principal 2) 5 highlights 3) versao curta para marketplace."
        )
      }
    ],
    firstWorkflow: {
      title: t("Seller lead qualification", "Qualificacao de lead vendedor"),
      why: t("It focuses sales energy where intent is strongest and improves follow-up immediately.", "Poe foco comercial onde a intencao e mais forte e melhora follow-up logo no primeiro contacto."),
      steps: {
        en: [
          "Define 7 to 9 required lead fields.",
          "Score urgency, motivation, area, and price realism.",
          "Return priority, summary, missing information, and next action.",
          "Render a clear summary card for the operator.",
          "Keep the structure ready for CRM export later."
        ],
        pt: [
          "Definir 7 a 9 campos obrigatorios.",
          "Pontuar urgencia, motivacao, zona e realismo de preco.",
          "Devolver prioridade, resumo, informacao em falta e proxima acao.",
          "Mostrar um cartao-resumo claro para o operador.",
          "Deixar a estrutura pronta para exportar para CRM mais tarde."
        ]
      },
      buildNext: ["sellerLeadSchema", "scoreSellerLead", "PromptCard", "LeadSummaryCard", "CopyToClipboardButton"]
    }
  },
  {
    id: "tech",
    name: t("Tech", "Tecnologia"),
    icon: "Cpu",
    subtitle: t("Less manual triage. More useful context.", "Menos triagem manual. Mais contexto util."),
    tags: [t("Tickets", "Tickets"), t("Knowledge", "Conhecimento"), t("Feedback", "Feedback")],
    problems: {
      en: [
        "Tickets arrive without clear priority.",
        "Internal knowledge is scattered.",
        "Customer feedback is noisy.",
        "Long meetings produce weak notes.",
        "Team handoffs lack context."
      ],
      pt: [
        "Tickets entram sem prioridade clara.",
        "Conhecimento interno espalhado.",
        "Feedback de clientes demasiado ruidoso.",
        "Reunioes longas e notas pouco uteis.",
        "Handoffs entre equipas sem contexto."
      ]
    },
    useCases: [
      useCase("ticket-triage", "Routing", t("Ticket triage", "Triagem de tickets"), t("Classifies urgency, area, and owner from raw support text.", "Classifica urgencia, area e responsavel a partir do texto bruto."), t("Cleaner queues and faster first response.", "Filas mais limpas e primeira resposta mais rapida.")),
      useCase("kb-helper", "Summarization", t("Knowledge base helper", "Assistente de knowledge base"), t("Turns repeated questions into short answers grounded in docs.", "Transforma perguntas repetidas em respostas curtas baseadas em docs."), t("Less repeated support work.", "Menos trabalho de suporte repetido.")),
      useCase("feedback-cluster", "Classification", t("Feedback theme mapper", "Mapa de temas de feedback"), t("Groups comments by recurring themes and frequency.", "Agrupa comentarios por temas recorrentes e frequencia."), t("Product signal without the noise.", "Sinal de produto sem ruido.")),
      useCase("meeting-summary", "Summarization", t("Meeting summary formatter", "Resumo de reuniao"), t("Extracts pains, objections, owners, and next steps.", "Extrai dores, objecoes, responsaveis e proximos passos."), t("Handoffs that people can act on.", "Handoffs acionaveis.")
      )
    ],
    quickWins: {
      en: ["Label the next 50 tickets.", "Summarize sales calls into CRM format.", "Cluster 20 customer comments.", "Draft answers for repeated support questions."],
      pt: ["Etiquetar os proximos 50 tickets.", "Resumir calls de vendas em formato CRM.", "Agrupar 20 comentarios de clientes.", "Rascunhar respostas para perguntas recorrentes."]
    },
    workflows: [
      { title: t("Ticket classifier", "Classificador de tickets"), summary: t("Triages by urgency, product area, and team.", "Faz triage por urgencia, area e equipa."), implementation: t("Ticket text to labels and owner.", "Texto do ticket para labels e responsavel.") },
      { title: t("Knowledge base assistant", "Assistente de knowledge base"), summary: t("Answers repeated questions using existing docs.", "Responde perguntas recorrentes com base em docs."), implementation: t("Search plus short answer template.", "Pesquisa + template de resposta curta.") },
      { title: t("Feedback clustering", "Cluster de feedback"), summary: t("Groups noisy comments into themes.", "Agrupa comentarios ruidosos por temas."), implementation: t("List of inputs to themes and frequency.", "Lista de inputs para temas e frequencia.") },
      { title: t("Sales call summary", "Resumo de call de vendas"), summary: t("Extracts pains, objections, and next steps.", "Extrai dores, objecoes e proximos passos."), implementation: t("Transcript to CRM bullets.", "Transcricao para bullets de CRM.") }
    ],
    miniTools: [
      { title: t("Ticket Triage Card", "Ticket Triage Card"), description: t("Shows priority and route at intake.", "Mostra prioridade e rota a entrada."), inputs: { en: ["raw ticket", "customer plan", "known issue"], pt: ["ticket bruto", "plano do cliente", "incidente conhecido"] }, output: t("priority plus route", "prioridade + rota") },
      { title: t("Feedback Theme Mapper", "Feedback Theme Mapper"), description: t("Turns scattered customer text into product signal.", "Transforma texto disperso de clientes em sinal de produto."), inputs: { en: ["10 to 20 comments", "product area"], pt: ["10 a 20 comentarios", "area de produto"] }, output: t("3 to 5 themes", "3 a 5 temas") },
      { title: t("Meeting Summary Formatter", "Meeting Summary Formatter"), description: t("Normalizes messy meeting notes.", "Normaliza notas de reuniao confusas."), inputs: { en: ["transcript", "meeting type"], pt: ["transcricao", "tipo de reuniao"] }, output: t("structured summary", "resumo estruturado") }
    ],
    promptCards: [
      { title: t("Classify ticket", "Classificar ticket"), prompt: t("Act as a support ops lead. Classify this ticket by urgency, product area, owner team, missing information, and next action. Return JSON with {urgency, area, ownerTeam, reason, missingInfo, nextAction}. Ticket: {text}", "Age como lead de support ops. Classifica este ticket por urgencia, area de produto, equipa responsavel, informacao em falta e proxima acao. Devolve JSON com {urgency, area, ownerTeam, reason, missingInfo, nextAction}. Ticket: {texto}") },
      { title: t("Map feedback themes", "Mapear temas de feedback"), prompt: t("Group these customer comments into 3 to 5 themes. For each theme, return frequency, representative quotes, product implication, and suggested next question. Comments: {comments}", "Agrupa estes comentarios de clientes em 3 a 5 temas. Para cada tema, devolve frequencia, exemplos representativos, implicacao de produto e proxima pergunta sugerida. Comentarios: {comentarios}") },
      { title: t("Summarize sales call", "Resumir call de vendas"), prompt: t("Turn this sales call transcript into CRM notes. Extract pain points, objections, buying signals, decision makers, next steps, and follow-up email draft. Transcript: {transcript}", "Transforma esta transcricao de call de vendas em notas de CRM. Extrai dores, objecoes, sinais de compra, decisores, proximos passos e rascunho de email de follow-up. Transcricao: {transcricao}") }
    ],
    firstWorkflow: {
      title: t("Ticket classification", "Classificacao de tickets"),
      why: t("It is visible, measurable, and immediately reduces queue noise.", "E visivel, mensuravel e reduz ruido na fila imediatamente."),
      steps: {
        en: ["Define a short taxonomy for priority and teams.", "Create a prompt that returns category, urgency, route, and missing info.", "Add good and bad examples for calibration.", "Show badge, owner team, and reason.", "Leave a future webhook path for Jira or Slack."],
        pt: ["Definir taxonomia curta de prioridade e equipas.", "Criar prompt que devolve categoria, urgencia, rota e missing info.", "Adicionar exemplos bons e maus para calibracao.", "Mostrar badge, equipa e razao.", "Deixar caminho futuro para webhook Jira ou Slack."]
      },
      buildNext: ["ticketSchema", "classifyTicket", "PriorityBadge", "TriageResultPanel", "sampleTickets"]
    }
  },
  {
    id: "health-clinics",
    name: t("Health / Clinics", "Saude / Clinicas"),
    icon: "HeartPulse",
    subtitle: t("Less administrative load. More team time.", "Menos carga administrativa. Mais tempo de equipa."),
    tags: [t("Admin", "Administrativo"), t("Routing", "Routing"), t("Review", "Revisao")],
    problems: {
      en: ["Repeated front desk messages.", "Scheduling requests handled by hand.", "No-shows and confirmations are scattered.", "Weak routing of patient messages.", "FAQs are not structured."],
      pt: ["Mensagens repetidas para rececao.", "Pedidos de marcacao tratados a mao.", "No-shows e confirmacoes dispersas.", "Encaminhamento fraco de mensagens.", "FAQs nao estruturadas."]
    },
    useCases: [
      useCase("patient-message-router", "Routing", t("Patient message router", "Router de mensagens"), t("Classifies administrative requests and flags sensitive items for human review.", "Classifica pedidos administrativos e sinaliza itens sensiveis para revisao humana."), t("Safer intake and less front desk overload.", "Intake mais seguro e menos carga na rececao.")),
      useCase("appointment-assistant", "Generation", t("Appointment assistant", "Assistente de marcacao"), t("Drafts standard replies and reminders from appointment context.", "Rascunha respostas e lembretes padronizados a partir do contexto da consulta."), t("More consistent communication.", "Comunicacao mais consistente.")),
      useCase("faq-builder", "Summarization", t("FAQ builder", "FAQ builder"), t("Turns repeated questions into consistent answers.", "Transforma perguntas repetidas em respostas consistentes."), t("Fewer repeated explanations.", "Menos explicacoes repetidas.")),
      useCase("feedback-summary", "Summarization", t("Feedback summary", "Resumo de feedback"), t("Extracts recurring themes from reviews and complaints.", "Extrai temas recorrentes de reviews e reclamacoes."), t("Operational signal for the clinic.", "Sinal operacional para a clinica."))
    ],
    quickWins: {
      en: ["Route inbox messages into clear buckets.", "Draft safe administrative replies.", "Turn repeated questions into FAQ entries.", "Create reminder templates."],
      pt: ["Encaminhar mensagens em categorias claras.", "Rascunhar respostas administrativas seguras.", "Transformar perguntas repetidas em FAQ.", "Criar templates de lembrete."]
    },
    workflows: [
      { title: t("Patient message router", "Router de mensagens de pacientes"), summary: t("Classifies requests by type and administrative urgency.", "Classifica pedidos por tipo e urgencia administrativa."), implementation: t("Message to category, action, and review flag.", "Mensagem para categoria, acao e flag de revisao.") },
      { title: t("Appointment assistant", "Assistente de marcacao"), summary: t("Creates standardized replies and reminders.", "Gera respostas e lembretes padronizados."), implementation: t("Template plus appointment variables.", "Template + variaveis da consulta.") },
      { title: t("FAQ builder", "FAQ builder"), summary: t("Turns repeated questions into consistent answers.", "Transforma perguntas repetidas em respostas consistentes."), implementation: t("Question list to FAQ base.", "Lista de perguntas para base FAQ.") },
      { title: t("Reception script assistant", "Assistente de script para rececao"), summary: t("Drafts a safe first response for reception.", "Gera primeira versao de resposta segura para rececao."), implementation: t("Question to administrative draft.", "Pergunta para draft administrativo.") }
    ],
    miniTools: [
      { title: t("Patient Message Router", "Patient Message Router"), description: t("Helps reception separate what comes in.", "Ajuda a rececao a separar o que entra."), inputs: { en: ["patient message", "clinic rules"], pt: ["mensagem", "regras da clinica"] }, output: t("category plus action", "categoria + acao") },
      { title: t("Reminder Builder", "Reminder Builder"), description: t("Standardizes reminders.", "Uniformiza lembretes."), inputs: { en: ["appointment context", "channel"], pt: ["contexto da consulta", "canal"] }, output: t("SMS or email draft", "SMS ou email") },
      { title: t("FAQ Draft Maker", "FAQ Draft Maker"), description: t("Creates safe standard answers.", "Cria respostas padrao seguras."), inputs: { en: ["frequent question", "policy"], pt: ["pergunta frequente", "politica"] }, output: t("answer draft", "resposta draft") }
    ],
    promptCards: [
      { title: t("Route patient message", "Encaminhar mensagem"), prompt: t("Act as a clinic operations assistant. Classify this patient message as scheduling, pricing, follow-up, billing, FAQ, or human review. If there is clinical urgency or sensitive content, flag human review. Return JSON with {category, urgency, reviewFlag, suggestedReply, nextAction}. Message: {text}", "Age como assistente operacional de clinica. Classifica esta mensagem como marcacao, precos, follow-up, faturacao, FAQ ou revisao humana. Se houver urgencia clinica ou conteudo sensivel, assinala revisao humana. Devolve JSON com {category, urgency, reviewFlag, suggestedReply, nextAction}. Mensagem: {texto}") },
      { title: t("Build reminder", "Criar lembrete"), prompt: t("Write a clear appointment reminder for {appointment_type} on {date}. Include preparation notes: {notes}. Keep it administrative, neutral, and short.", "Escreve um lembrete claro para consulta de {tipo_consulta} em {data}. Inclui notas de preparacao: {notas}. Mantem tom administrativo, neutro e curto.") },
      { title: t("Draft FAQ answer", "Rascunhar FAQ"), prompt: t("Turn this repeated clinic question into a safe FAQ answer. Question: {question}. Rules: do not diagnose, do not give medical advice, point to human contact when needed.", "Transforma esta pergunta recorrente da clinica numa resposta FAQ segura. Pergunta: {pergunta}. Regras: nao diagnosticar, nao dar conselho medico, apontar para contacto humano quando necessario.") }
    ],
    firstWorkflow: {
      title: t("Patient message routing", "Routing de mensagens"),
      why: t("It gives immediate operational relief while keeping sensitive work under human review.", "Da alivio operacional imediato e mantem trabalho sensivel sob revisao humana."),
      steps: {
        en: ["Define categories: scheduling, pricing, follow-up, billing, FAQ, human review.", "Add explicit human review rules for sensitive signals.", "Return category, urgency, base reply, and next action.", "Render the result as a simple reception card.", "Validate language as neutral and administrative."],
        pt: ["Definir categorias: marcacao, precos, follow-up, faturacao, FAQ, revisao humana.", "Adicionar regra explicita de revisao humana para sinais sensiveis.", "Devolver categoria, urgencia, resposta base e proxima acao.", "Renderizar resultado como cartao simples para rececao.", "Validar linguagem neutra e administrativa."]
      },
      buildNext: ["patientMessageSchema", "routePatientMessage", "EscalationFlag", "ResponseTemplateCard", "CategoryLegend"]
    }
  },
  {
    id: "car-dealers",
    name: t("Car Dealers", "Concessionarios"),
    icon: "Car",
    subtitle: t("Respond faster. Filter better. Sell with context.", "Responder mais rapido. Filtrar melhor. Vender com contexto."),
    tags: [t("Sales", "Vendas"), t("Trade-in", "Retoma"), t("Listings", "Anuncios")],
    problems: {
      en: ["The same questions arrive constantly.", "Low-intent leads mix with real buyers.", "Finance and trade-in context is weak.", "Vehicle listings feel generic.", "Sales follow-up is inconsistent."],
      pt: ["Perguntas iguais entram em permanencia.", "Leads com pouca intencao misturadas com compradores reais.", "Financiamento e retoma mal pre-qualificados.", "Descricoes de viaturas pouco diferenciadas.", "Seguimento comercial irregular."]
    },
    useCases: [
      useCase("buyer-scoring", "Decision Support", t("Buyer readiness scoring", "Score de prontidao"), t("Reads budget, financing, timing, target model, and trade-in signal.", "Le budget, financiamento, prazo, modelo e sinal de retoma."), t("Sales focus goes to real buying intent.", "Foco comercial vai para intencao real.")),
      useCase("trade-in-intake", "Classification", t("Trade-in intake", "Intake de retoma"), t("Structures vehicle data for valuation.", "Estrutura dados da viatura para avaliacao."), t("Cleaner evaluation requests.", "Pedidos de avaliacao mais limpos.")),
      useCase("vehicle-listings", "Generation", t("Listing rewriter", "Rewriter de anuncio"), t("Adapts vehicle descriptions to buyer persona.", "Adapta descricoes de viaturas a buyer persona."), t("Better marketplace copy.", "Melhor copy para marketplaces.")),
      useCase("follow-up", "Personalization", t("Buyer follow-up", "Follow-up comprador"), t("Drafts messages based on model, budget, and next action.", "Rascunha mensagens com base em modelo, budget e proxima acao."), t("Less generic commercial follow-up.", "Seguimento comercial menos generico."))
    ],
    quickWins: {
      en: ["Score leads by readiness.", "Structure trade-in requests.", "Rewrite top listings.", "Draft personalized follow-ups."],
      pt: ["Pontuar leads por prontidao.", "Estruturar pedidos de retoma.", "Reescrever anuncios principais.", "Rascunhar follow-ups personalizados."]
    },
    workflows: [
      { title: t("Purchase readiness classifier", "Classificador de prontidao de compra"), summary: t("Reads budget, financing, timeline, model interest, and trade-in.", "Le budget, financiamento, prazo, modelo de interesse e retoma."), implementation: t("Form plus prompt plus readiness score.", "Formulario + prompt + readiness score.") },
      { title: t("Trade-in intake", "Intake de retoma"), summary: t("Structures valuation requests.", "Estrutura pedido de avaliacao."), implementation: t("Fields plus commercial summary.", "Campos + resumo comercial.") },
      { title: t("Follow-up assistant", "Assistente de follow-up"), summary: t("Creates messages by buyer profile.", "Gera mensagem por perfil de comprador."), implementation: t("Context to personalized message.", "Contexto para mensagem personalizada.") },
      { title: t("Vehicle listing rewriter", "Rewriter de anuncio"), summary: t("Adapts specs to buyer persona.", "Adapta specs a buyer persona."), implementation: t("Specs to listing, highlights, short version.", "Specs para anuncio, highlights e versao curta.") }
    ],
    miniTools: [
      { title: t("Buyer Readiness Scorecard", "Buyer Readiness Scorecard"), description: t("Shows who deserves commercial priority.", "Ajuda a ver quem merece prioridade comercial."), inputs: { en: ["model", "budget", "timeline", "financing", "trade-in"], pt: ["modelo", "budget", "prazo", "financiamento", "retoma"] }, output: t("readiness plus next actions", "readiness + proximas acoes") },
      { title: t("Trade-In Intake Builder", "Trade-In Intake Builder"), description: t("Structures information for trade-in valuation.", "Estrutura informacao para avaliacao de retoma."), inputs: { en: ["brand", "model", "year", "mileage", "condition"], pt: ["marca", "modelo", "ano", "kms", "estado"] }, output: t("clear trade-in sheet", "ficha de retoma clara") },
      { title: t("Listing Rewriter", "Listing Rewriter"), description: t("Improves copy without losing facts.", "Sobe a qualidade da copy sem perder factualidade."), inputs: { en: ["specs", "buyer persona", "tone"], pt: ["specs", "buyer persona", "tom"] }, output: t("stronger vehicle description", "descricao mais forte") }
    ],
    promptCards: [
      { title: t("Classify buyer readiness", "Classificar prontidao"), prompt: t("Act as a car dealership sales manager. Classify this lead as high, medium, or low buying signal based on budget, financing, timeline, model interest, and trade-in. Return JSON with {readiness, score_0_100, mainSignal, missingInfo, nextBestAction}. Lead: {text}", "Age como gestor comercial de um stand automovel. Classifica este lead como alto, medio ou baixo sinal de compra com base em budget, financiamento, prazo, modelo de interesse e eventual retoma. Devolve JSON com {readiness, score_0_100, mainSignal, missingInfo, nextBestAction}. Lead: {texto}") },
      { title: t("Write buyer follow-up", "Escrever follow-up"), prompt: t("Write a short, professional, human message for a buyer interested in {model}. Context: {context}. Goal: confirm real interest and move toward a visit, call, or finance simulation. Avoid robotic tone.", "Escreve uma mensagem curta, profissional e humana para comprador interessado em {modelo}. Contexto: {contexto}. Objetivo: confirmar interesse real e avancar para visita, chamada ou simulacao. Evita tom robotico.") },
      { title: t("Improve vehicle listing", "Melhorar anuncio"), prompt: t("Turn these specs into a clear commercial vehicle description. Buyer persona: {buyer_persona}. Specs: {specs}. Return 1) main description 2) 5 highlights 3) short marketplace version.", "Transforma estas especificacoes numa descricao comercial clara. Buyer persona: {buyer_persona}. Specs: {specs}. Devolve 1) descricao principal 2) 5 highlights 3) versao curta para marketplace.") }
    ],
    firstWorkflow: {
      title: t("Purchase readiness classification", "Classificacao de prontidao de compra"),
      why: t("It improves prioritization and follow-up from the first contact.", "Melhora priorizacao e follow-up desde o primeiro contacto."),
      steps: {
        en: ["Define minimum fields: model, budget, financing, trade-in, timeline.", "Use three simple states: high, medium, low signal.", "Return score, main signal, and next best action.", "Show the result in a simple commercial card.", "Keep CRM handoff ready."],
        pt: ["Definir campos minimos: modelo, budget, financiamento, retoma e prazo.", "Usar tres estados simples: alto, medio e baixo sinal.", "Devolver score, principal sinal e next best action.", "Mostrar resultado num cartao comercial simples.", "Deixar handoff para CRM preparado."]
      },
      buildNext: ["buyerLeadSchema", "scoreBuyerReadiness", "ReadinessPill", "BuyerSummaryCard", "sampleCarLeads"]
    }
  },
  {
    id: "law",
    name: t("Law", "Direito"),
    icon: "Scale",
    subtitle: t("Less loose paperwork. More structured intake. More control.", "Menos papel solto. Mais intake estruturado. Mais controlo."),
    tags: [t("Intake", "Intake"), t("Review", "Revisao"), t("Drafting", "Drafting")],
    problems: {
      en: ["Initial intake is disorganized.", "Long documents are poorly triaged.", "Dates, parties, and clauses are buried in text.", "Email and memo drafting is repetitive.", "Internal knowledge is hard to recover."],
      pt: ["Intake inicial desorganizado.", "Documentos longos e pouco triados.", "Datas, partes e clausulas enterradas no texto.", "Drafting repetitivo de emails e notas.", "Conhecimento interno dificil de recuperar."]
    },
    useCases: [
      useCase("matter-intake", "Classification", t("Matter intake", "Intake juridico"), t("Turns a client email into a structured matter brief.", "Transforma email do cliente num matter brief estruturado."), t("Clearer next steps and missing documents.", "Proximos passos e documentos em falta mais claros.")),
      useCase("document-summary", "Summarization", t("Document summarizer", "Resumo de documento"), t("Summarizes contracts, pleadings, and long files.", "Resume contratos, pecas e dossiers longos."), t("Faster first-pass review.", "Revisao inicial mais rapida.")),
      useCase("clause-extractor", "Classification", t("Key-term extractor", "Extrator de termos"), t("Extracts dates, parties, obligations, and sensitive clauses.", "Extrai datas, partes, obrigacoes e clausulas sensiveis."), t("More controlled review.", "Revisao com mais controlo.")),
      useCase("client-update", "Generation", t("Client email draft", "Draft de email ao cliente"), t("Drafts clear client-friendly messages for human review.", "Rascunha mensagens claras para cliente com revisao humana."), t("Less repetitive drafting.", "Menos drafting repetitivo."))
    ],
    quickWins: {
      en: ["Structure new client emails.", "Summarize long documents.", "Extract key dates and parties.", "Draft client updates with uncertainty flagged."],
      pt: ["Estruturar emails iniciais de clientes.", "Resumir documentos longos.", "Extrair datas e partes-chave.", "Rascunhar updates ao cliente com incertezas assinaladas."]
    },
    workflows: [
      { title: t("Intake structurer", "Intake structurer"), summary: t("Organizes the first client email into a clear matter brief.", "Organiza email inicial do cliente em matter brief claro."), implementation: t("Email to normalized fields.", "Email para campos normalizados.") },
      { title: t("Document summarizer", "Document summarizer"), summary: t("Summarizes contracts, pleadings, and long files.", "Resume contratos, pecas e dossiers longos."), implementation: t("Text to executive summary.", "Texto para resumo executivo.") },
      { title: t("Clause extractor", "Clause extractor"), summary: t("Extracts dates, parties, obligations, and sensitive clauses.", "Extrai datas, partes, obrigacoes e clausulas sensiveis."), implementation: t("Text to table or structured list.", "Texto para tabela ou lista estruturada.") },
      { title: t("Draft assistant", "Draft assistant"), summary: t("Creates first drafts of emails, notes, and memos.", "Gera primeira versao de email, nota ou memo."), implementation: t("Context to draft for review.", "Contexto para draft sujeito a revisao.") }
    ],
    miniTools: [
      { title: t("Legal Intake Structurer", "Legal Intake Structurer"), description: t("Reduces ambiguity in first contact.", "Arruma o primeiro contacto e reduz ambiguidade."), inputs: { en: ["client email", "practice area", "optional jurisdiction"], pt: ["email do cliente", "area de pratica", "jurisdicao opcional"] }, output: t("matter brief plus missing docs", "matter brief + missing docs") },
      { title: t("Contract Key-Term Extractor", "Contract Key-Term Extractor"), description: t("Speeds up first-pass contract reading.", "Poupa tempo de leitura inicial."), inputs: { en: ["contract text", "clause types to watch"], pt: ["texto do contrato", "tipos de clausula a vigiar"] }, output: t("key points, dates, apparent risks", "pontos-chave, datas, riscos aparentes") },
      { title: t("Client Email Draft", "Client Email Draft"), description: t("Speeds administrative drafting with human review.", "Acelera drafting administrativo com revisao humana."), inputs: { en: ["context", "email goal", "tone"], pt: ["contexto", "objetivo do email", "tom"] }, output: t("first draft", "primeira versao") }
    ],
    promptCards: [
      { title: t("Structure legal intake", "Estruturar intake juridico"), prompt: t("Turn this email into a structured legal intake. Extract parties, matter type, relevant dates, urgency, missing documents, next steps, and summary. Do not invent facts. Mark missing items as 'to confirm'. Return JSON with {parties, matterType, keyDates, urgency, missingDocs, nextSteps, summary}. Email: {text}", "Transforma este email num intake juridico estruturado. Extrai partes, assunto, datas relevantes, urgencia, documentos em falta e proximos passos. Nao inventes factos. Se algo faltar, marca como 'por confirmar'. Devolve JSON com {parties, matterType, keyDates, urgency, missingDocs, nextSteps, summary}. Email: {texto}") },
      { title: t("Summarize contract carefully", "Resumir contrato com cautela"), prompt: t("Summarize this contract in clear technical language without losing precision. Extract subject, parties, main obligations, dates, apparent risks, and clauses to review. Do not cite case law or invent references. Text: {contract}", "Resume este contrato em linguagem clara e tecnica sem perder precisao. Extrai objeto, partes, principais obrigacoes, datas, riscos aparentes e clausulas a rever. Nao cites jurisprudencia nem inventes referencias. Texto: {contrato}") },
      { title: t("Draft client email", "Primeira versao de email"), prompt: t("Write the first version of a professional client email based on this context: {context}. Goal: {goal}. Keep the tone clear and client-friendly. If facts are uncertain, flag them instead of filling gaps.", "Escreve a primeira versao de um email profissional ao cliente com base neste contexto: {contexto}. Objetivo: {objetivo}. Mantem tom juridico claro e cliente-friendly. Se houver incerteza factual, assinala-a em vez de preencher.") }
    ],
    firstWorkflow: {
      title: t("Structured legal intake", "Intake juridico estruturado"),
      why: t("It balances real utility, low risk, and easy human review.", "Equilibra utilidade real, baixo risco e revisao humana facil."),
      steps: {
        en: ["Define minimum fields for initial intake.", "Use explicit instructions not to invent facts.", "Show matter brief and missing documents in a clear card.", "Add a visible human review reminder.", "Reuse the structure as a template for other matters."],
        pt: ["Definir campos minimos para intake inicial.", "Criar prompt com instrucao explicita para nao inventar.", "Mostrar matter brief e missing docs num cartao claro.", "Adicionar aviso de revisao humana visivel.", "Reutilizar a estrutura como template noutros assuntos."]
      },
      buildNext: ["legalIntakeSchema", "buildMatterBrief", "HumanReviewBanner", "MatterSummaryCard", "missingDocsHelper"]
    }
  },
  {
    id: "sports",
    name: t("Sports", "Desporto"),
    icon: "Trophy",
    subtitle: t("Fewer lost notes. More useful feedback.", "Menos notas perdidas. Mais feedback util."),
    tags: [t("Reports", "Relatorios"), t("Training", "Treino"), t("Sponsors", "Sponsors")],
    problems: {
      en: ["Player reports are manual and inconsistent.", "Match notes are scattered.", "Training planning is repetitive.", "Messages to athletes and parents lack consistency.", "Sponsor materials take too long."],
      pt: ["Relatorios de jogadores feitos a mao e sem padrao.", "Notas de jogo dispersas.", "Planeamento de treino repetitivo.", "Comunicacao com atletas e pais pouco consistente.", "Materiais para sponsors demorados."]
    },
    useCases: [
      useCase("player-report", "Summarization", t("Player report builder", "Relatorio de jogador"), t("Turns coach notes into a structured athlete report.", "Converte notas do treinador num relatorio estruturado."), t("Consistent feedback in less time.", "Feedback consistente em menos tempo.")),
      useCase("match-notes", "Personalization", t("Match notes converter", "Conversor de notas de jogo"), t("Creates versions for staff, athlete, and parents.", "Cria versoes para staff, atleta e pais."), t("One input, multiple useful outputs.", "Um input, varios outputs uteis.")),
      useCase("training-plan", "Generation", t("Training plan drafter", "Rascunho de treino"), t("Drafts a session from the goal and constraints.", "Rascunha uma sessao a partir do objetivo e restricoes."), t("Faster planning without losing coach control.", "Planeamento mais rapido sem perder controlo tecnico.")),
      useCase("sponsor-pitch", "Generation", t("Sponsor pitch starter", "Proposta para sponsor"), t("Creates a commercial outline for partners.", "Cria outline comercial para parceiros."), t("Better starting point for sponsorship.", "Melhor ponto de partida para patrocinio."))
    ],
    quickWins: {
      en: ["Turn coach notes into report format.", "Create parent-friendly updates.", "Draft training sessions.", "Prepare sponsor pitch outlines."],
      pt: ["Transformar notas do treinador em relatorio.", "Criar updates apropriados para pais.", "Rascunhar sessoes de treino.", "Preparar outlines para sponsors."]
    },
    workflows: [
      { title: t("Player report builder", "Player report builder"), summary: t("Converts loose notes into a standardized report.", "Converte notas soltas em relatorio padronizado."), implementation: t("Notes to clear player report.", "Notas para relatorio claro.") },
      { title: t("Match notes summarizer", "Resumo de notas de jogo"), summary: t("Creates separate versions for staff, athlete, and parents.", "Gera versoes separadas para staff, atleta e pais."), implementation: t("Notes to multiple outputs.", "Notas para multiplas saidas.") },
      { title: t("Training plan drafter", "Rascunho de plano de treino"), summary: t("Drafts a session based on the objective.", "Gera primeira versao de sessao com base no objetivo."), implementation: t("Goal to training draft.", "Objetivo para draft de treino.") },
      { title: t("Sponsor pitch starter", "Starter de sponsor"), summary: t("Creates a commercial outline for partners.", "Cria outline comercial para parceiros."), implementation: t("Brief to base proposal.", "Briefing para proposta base.") }
    ],
    miniTools: [
      { title: t("Player Report Builder", "Player Report Builder"), description: t("Standardizes evaluations and reduces manual writing.", "Uniformiza avaliacoes e reduz escrita manual."), inputs: { en: ["coach notes", "age group", "cycle goal"], pt: ["notas do treinador", "categoria", "objetivo do ciclo"] }, output: t("athlete report", "relatorio do atleta") },
      { title: t("Match Notes Converter", "Match Notes Converter"), description: t("Gets several useful versions from the same input.", "Tira varias versoes uteis do mesmo input."), inputs: { en: ["match notes", "audience"], pt: ["notas de jogo", "publico-alvo"] }, output: t("staff summary, athlete summary, parent update", "staff summary, athlete summary, update para pais") },
      { title: t("Sponsor Starter", "Sponsor Starter"), description: t("Speeds commercial work without killing clarity.", "Acelera a parte comercial sem matar clareza."), inputs: { en: ["club information", "sponsor type", "goal"], pt: ["informacao do clube", "tipo de sponsor", "objetivo"] }, output: t("proposal outline", "outline de proposta") }
    ],
    promptCards: [
      { title: t("Generate player report", "Gerar relatorio de jogador"), prompt: t("Turn these coach notes into a structured athlete report. Return 1) strengths 2) areas to improve 3) behavior and attitude 4) one concrete next action. Keep the tone useful, specific, and respectful. Notes: {coach_notes}", "Transforma estas notas do treinador num relatorio estruturado do atleta. Devolve 1) pontos fortes 2) areas a melhorar 3) comportamento e atitude 4) uma proxima acao concreta. Mantem tom util, especifico e respeitoso. Notas: {notas_do_treinador}") },
      { title: t("Convert match notes", "Converter notas de jogo"), prompt: t("Based on these match notes, create three outputs: 1) technical staff version 2) athlete feedback 3) parent-appropriate update. Adjust detail and tone to each audience. Notes: {notes}", "Com base nestas notas de jogo, cria tres saidas: 1) versao staff tecnico 2) feedback ao atleta 3) atualizacao apropriada para pais. Ajusta detalhe e tom a cada publico. Notas: {notas}") },
      { title: t("Draft sponsor proposal", "Criar proposta para sponsor"), prompt: t("Create a sponsor proposal outline based on this briefing: {briefing}. Include club context, audience, value proposition, available assets, and commercial next step.", "Cria um outline de proposta para sponsor com base nestas informacoes: {briefing}. Inclui contexto do clube, audiencia, proposta de valor, ativos disponiveis e proximo passo comercial.") }
    ],
    firstWorkflow: {
      title: t("Player report builder", "Player report builder"),
      why: t("It is visible, useful for coaches, and easy to demonstrate.", "E visivel, util para treinadores e facil de demonstrar."),
      steps: {
        en: ["Define a fixed report structure.", "Create prompt for strengths, improvements, and next action.", "Add an optional short parent version.", "Show output in an easy-to-copy card.", "Tune the template with feedback from 2 or 3 coaches."],
        pt: ["Definir estrutura fixa de relatorio.", "Criar prompt para pontos fortes, melhorias e proxima acao.", "Adicionar versao curta opcional para pais.", "Mostrar output num cartao facil de copiar.", "Ajustar template com feedback de 2 ou 3 treinadores."]
      },
      buildNext: ["playerReportSchema", "buildPlayerReport", "CoachReportCard", "ParentReportCard", "sampleCoachNotes"]
    }
  }
];
