/** Conteúdo estruturado da LP (revisão 2). */

export const HERO_TITLE = 'Assistência técnica e perícias médicas' as const

export const HERO_SLIDES = [
  {
    lead: 'O laudo pericial vai definir o destino do seu processo.',
    body: 'Advogados que contam com assistência técnica especializada revertem laudos desfavoráveis e vencem a fase probatória com consistência. Não deixe a prova médica ao acaso.',
  },
  {
    lead: 'Quando o laudo define o processo, cada detalhe técnico importa.',
    body: 'Experiência e qualidade técnica para a sua estratégia jurídica — para advogados, empresas e pessoas físicas que não abrem mão da precisão.',
  },
] as const

export const SITE_METRICS = [
  { value: '27', label: 'estados atendidos' },
  { value: '24h', label: 'resposta garantida' },
  { value: '10+', label: 'anos em cirurgia e urgência' },
] as const

export type AudienceKind = 'lawyer' | 'patient'

export const AUDIENCE_PANELS = {
  lawyer: {
    title: 'Fortaleça sua tese com suporte técnico médico',
    intro:
      'Trabalhamos com escritórios em direito à saúde, responsabilidade civil, trabalhista e previdenciário — com linguagem clara para o Judiciário.',
    bullets: [
      'Formulação de quesitos técnicos estratégicos',
      'Impugnação fundamentada de laudos periciais',
      'Tradução da linguagem médica para o processo',
      'Análise de viabilidade técnica do caso',
    ],
    ctaLabel: 'Sou advogado(a) — falar com o Dr. Messias',
    messageKey: 'audienceLawyer' as const,
  },
  patient: {
    title: 'Seus direitos merecem uma defesa técnica à altura',
    intro:
      'Orientação e pareceres para demandas judiciais e administrativas em que a prova médica é decisiva.',
    bullets: [
      'Benefício previdenciário negado',
      'Perícia judicial desfavorável',
      'Negativa de plano de saúde',
      'Organização de documentação médica',
      'Pareceres para instrução do seu caso',
    ],
    ctaLabel: 'Sou paciente — falar com o Dr. Messias',
    messageKey: 'audiencePatient' as const,
  },
} as const

export const PARTNER_SPECIALTIES = [
  'Cardiologia',
  'Ortopedia',
  'Neurologia',
  'Psiquiatria',
  'Clínica geral',
  'Dermatologia',
  'Ginecologia',
  'Pediatria',
  'Urologia',
  'Traumatologia',
  'Cirurgia geral',
  'Outras especialidades (rede de parceiros)',
] as const

export const FAQ_ITEMS = [
  {
    q: 'Quanto tempo leva o primeiro retorno?',
    a: 'Em muitos contactos respondemos em até 24 horas, inclusive fins de semana quando a urgência do caso exige. Demandas muito extensas podem precisar de leitura prévia antes da resposta completa.',
  },
  {
    q: 'O parecer substitui o trabalho do advogado?',
    a: 'Não. A OLLIV presta assistência técnica e perícia médica: subsídios para peças, quesitos e estratégia da prova. A condução processual permanece com a equipe jurídica.',
  },
  {
    q: 'Por que contratar assistência técnica se já tenho advogado?',
    a: 'O advogado conduz o processo; o assistente técnico médico traduz o prontuário e a literatura para a prova pericial — reduzindo risco de quesitos frágeis e de laudos desfavoráveis.',
  },
  {
    q: 'Por que um médico com experiência pericial e não só o especialista da doença?',
    a: 'O especialista clínico descreve a doença; o perito e o assistente técnico respondem ao que o juiz precisa decidir — nexo, padrão de conduta, incapacidade e coerência com o processo.',
  },
  {
    q: 'A OLLIV garante o resultado do processo?',
    a: 'Não. Garantimos rigor técnico, clareza e honestidade sobre limites e possibilidades — sem promessas de êxito que a medicina e o direito não permitem.',
  },
  {
    q: 'Atendem em todo o território nacional?',
    a: 'Sim. Base em Brasília-DF, com atendimento remoto nos 27 estados quando a documentação permite trabalho à distância com qualidade.',
  },
  {
    q: 'O que preciso enviar para iniciar a triagem?',
    a: 'Resumo do caso, fase processual, peças principais e documentos médicos disponíveis (laudos, prontuários, exames). Envie pelo WhatsApp apenas o necessário, respeitando o sigilo.',
  },
  {
    q: 'Posso contratar depois que a perícia já foi realizada?',
    a: 'Sim. Muitos contactos chegam para impugnação, parecer divergente ou subsidiar recurso — desde que ainda haja margem processual e documentação útil.',
  },
  {
    q: 'Como é tratado o sigilo e dados de saúde?',
    a: 'Atuamos com discrição e respeito ao sigilo profissional. Consulte a Política de privacidade. Conteúdo sensível pode ser tratado por canais alinhados à sua equipe.',
  },
  {
    q: 'Quais formatos de entrega existem?',
    a: 'Definimos em conjunto (parecer, quesitos auxiliados, impugnação técnica, parecer convergente ou divergente, entre outros) conforme a fase processual.',
  },
] as const
