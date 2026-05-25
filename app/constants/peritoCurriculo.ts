/** Mini currículo — Dr. José Messias Oliveira Júnior (secção Credibilidade / #sobre). */

export type CurriculoSecao = {
  id: string
  titulo: string
  itens: readonly string[]
}

export const PERITO_CURRICULO = {
  secaoEyebrow: 'Trajetória profissional',
  secaoTitulo: 'Experiência comprovada',
  nome: 'Dr. José Messias Oliveira Júnior',
  cargo: 'Cirurgião Geral e Perito Médico Judicial',
  perfil:
    'Cirurgião geral com mais de 10 anos entre urgência, emergência e cirurgia — público e privado no DF. Atuação em perícia médica judicial com laudos em casos complexos, erro médico e múltiplas áreas cirúrgicas (plástica, ginecologia, ortopedia, entre outras).',
  badges: [
    { id: 'escs', label: 'Formado ESCS-DF' },
    { id: 'cpem', label: 'Perícia médica (IFH)' },
    { id: 'nacional', label: 'Atuação nacional' },
    { id: 'judicial', label: 'Experiência judicial' },
  ] as const,
  secoes: [
    {
      id: 'experiencia',
      titulo: 'Experiência assistencial',
      itens: [
        'SES-DF: Cirurgião Geral desde 2016 — alta complexidade, traumas e complicações cirúrgicas no setor público.',
        'Hospitais privados no DF: cirurgia laparoscópica, incluindo bariátrica e auxílio cirúrgico especializado.',
        'SAMU-DF (2014–2022): regulador e emergencista.',
        'Exército Brasileiro (22º BI): oficial médico temporário.',
      ],
    },
    {
      id: 'pericia',
      titulo: 'Expertise em perícia',
      itens: [
        'Normas processuais da prova pericial.',
        'Laudos objetivos e alinhados ao objeto da perícia.',
        'Pontualidade e cronogramas do Judiciário.',
      ],
    },
    {
      id: 'formacao',
      titulo: 'Formação',
      itens: [
        'Graduação — ESCS-DF (Escola Superior de Ciências da Saúde).',
        'Residência em Cirurgia Geral — HRS-DF.',
        'Formação em Perícia Médica (CPEM) — Instituto Felipe Hurtado.',
        'Laparoscopia — IRCAD.',
      ],
    },
  ] satisfies readonly CurriculoSecao[],
  parceirosTitulo: 'Corpo clínico multidisciplinar (parceiros)',
  parceirosIntro:
    'Demandas que exigem outra especialidade são encaminhadas à rede de médicos parceiros do grupo — com a mesma seriedade técnica.',
} as const
