import type { LocalizedText, OutreachMaterials } from "@/types/content";

const t = (en: string, pt = ""): LocalizedText => ({ en, pt });

export const outreachMaterials: OutreachMaterials = {
  subjectLines: {
    en: [
      "3 AI workflows that would make sense in your industry",
      "I made this short AI map and thought it could be useful",
      "Where AI actually saves time in your industry",
      "A short AI guide, without hype",
      "Practical AI cases for your sector"
    ],
    pt: [
      "3 workflows de AI que fariam sentido no teu setor",
      "Fiz este mapa curto de AI e achei que podias achar útil",
      "Onde a AI realmente poupa tempo no teu setor",
      "Um guia curto de AI, sem hype",
      "Casos práticos de AI para o teu setor"
    ]
  },
  variants: [
    {
      title: t("Short useful-share note", "Nota curta e útil"),
      body: t(
        "Hey [Name], I put together a short AI page with practical use cases by industry: less busywork, better triage, and more personalized communication. Thought you might find it useful: [link]",
        "Olá [Nome], fiz uma página curta com casos práticos de AI por setor, focada em poupar tempo, classificar melhor pedidos e personalizar comunicação. Achei que podias achar útil: [link]"
      )
    },
    {
      title: t("No-hype positioning", "Posicionamento sem hype"),
      body: t(
        "Hey [Name], this is a simple AI map by industry. Not hype, just useful workflows that save time and improve operations. Sharing in case it is helpful: [link]",
        "Olá [Nome], organizei exemplos simples de onde a AI já ajuda em negócios como [setor]: menos trabalho repetido, melhor triagem e respostas mais úteis. Deixo-te aqui caso seja útil: [link]"
      )
    },
    {
      title: t("Operator angle", "Ângulo operadores"),
      body: t(
        "Hey [Name], I made a short page on where AI already helps in real businesses: classification, summaries, first drafts, routing, and follow-up. Thought of you when building it: [link]",
        "Olá [Nome], montei um mapa prático de AI por área. A ideia não é vender AI, é mostrar onde ela já tira carga administrativa e melhora operações. Aqui vai: [link]"
      )
    },
    {
      title: t("Busy decision-maker", "Decisor ocupado"),
      body: t(
        "Hey [Name], I have been mapping practical AI opportunities by sector. This page is the short version, useful if you want the signal without the noise: [link]",
        "Olá [Nome], fiz isto a pensar em operadores e decisores ocupados: uma página curta com use cases de AI que fazem sentido primeiro. Se tiveres dois minutos, acho que vais tirar ideias daqui: [link]"
      )
    }
  ],
  followUp: t(
    "If helpful, send me: 1) your industry 2) team size 3) two tasks that waste time, and I will send back 3 AI workflows worth testing first.",
    "Boa. Se quiseres, diz-me só: 1) o teu setor 2) o tamanho da equipa 3) duas tarefas que vos roubam tempo, e devolvo 3 workflows de AI que fariam sentido primeiro."
  )
};
