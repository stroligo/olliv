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
    'Médico Cirurgião Geral com ampla trajetória na assistência pública e privada no Distrito Federal, com mais de 10 anos de experiência em medicina de urgência, emergência e cirurgia especializada. Concilia a prática hospitalar com a atuação em Perícia Médica Judicial, com expertise para laudos fundamentados em casos complexos — incluindo suposto erro médico e análises em diversas áreas (Plástica, Ginecologia, Ortopedia, entre outras).',
  secoes: [
    {
      id: 'experiencia',
      titulo: 'Experiência assistencial e gestão',
      itens: [
        'Hospital Regional de Planaltina (HRPL-DF): atuação contínua desde 2016 como Cirurgião Geral, com alta complexidade no cenário público.',
        'Bariclinic: sócio e cirurgião em hospitais privados — procedimentos laparoscópicos, incluindo Cirurgia Bariátrica, particulares e auxílio cirúrgico especializado.',
        'SAMU-DF (2014–2022): Médico Regulador e Emergencista — visão crítica e agilidade em decisões de alta pressão.',
        'Exército Brasileiro (22º BI): Oficial Médico Temporário — disciplina e liderança na formação.',
      ],
    },
    {
      id: 'pericia',
      titulo: 'Expertise em perícia',
      itens: [
        'Domínio das normas processuais aplicáveis à prova pericial.',
        'Redação de laudos objetivos, claros e alinhados ao objeto da perícia judicial.',
        'Compromisso com pontualidade e cronogramas do sistema judiciário.',
      ],
    },
    {
      id: 'formacao',
      titulo: 'Formação e atualização',
      itens: [
        'Residência Médica em Cirurgia Geral — Hospital Regional de Sobradinho (HRS-DF).',
        'Especialização em Perícia Médica (CPEM) — Instituto Felipe Hurtado (2026).',
        'Formação complementar: Especialista em Laparoscopia (IRCAD).',
      ],
    },
  ] satisfies readonly CurriculoSecao[],
} as const
