/** Copy partilhada: WhatsApp pré-preenchido, SEO e micro-textos institucionais. */

export const SITE_SEO = {
  title: 'OLLIV Perícia Médica — Assistência técnica e perícias médicas',
  description:
    'Assistência técnica e perícias médicas para processos judiciais. Pareceres periciais e suporte à prova técnica. Atendimento em todo o Brasil.',
} as const

/** E-mail institucional oficial (contacto geral). Única fonte no projeto — importar onde for necessário. */
export const OLLIV_CONTACT_EMAIL = 'contato@ollivpericias.com.br' as const

/** Domínio público oficial (HTTPS, sem barra terminal) — alinhado a runtimeConfig.public.siteUrl. */
export const SITE_ORIGIN = 'https://www.ollivpericias.com.br' as const

/** Texto do rodapé / cópias que mostram apenas o host. */
export const SITE_ORIGIN_DISPLAY = 'www.ollivpericias.com.br' as const

export const DR_MESSIAS_SHORT = 'Dr. Messias' as const

export const WHATSAPP_MESSAGES = {
  default:
    'Olá, Dr. Messias! Vim pelo site da OLLIV Perícia Médica e gostaria de conversar sobre assistência técnica e perícia médica.',

  /** CTA principal do hero — revisão 2 */
  analysisRequest:
    'Olá, Dr. Messias! Gostaria de solicitar uma análise técnica do meu caso (OLLIV Perícia Médica).',

  documents:
    'Olá, Dr. Messias! Preciso enviar documentos para análise e anexar ao processo em andamento.',

  afterServices:
    'Olá, Dr. Messias! Já vi os serviços no site da OLLIV e gostaria de uma orientação rápida sobre viabilidade do meu caso.',

  aboutCase:
    'Olá, Dr. Messias! Li a secção sobre a OLLIV no site e quero falar sobre o meu caso.',

  triagem:
    'Olá, Dr. Messias! Quero iniciar pela triagem no WhatsApp, conforme descrito no site da OLLIV.',

  processTriagem:
    'Olá, Dr. Messias! Quero seguir o fluxo do site: triagem no WhatsApp para o meu caso.',

  afterFaq:
    'Olá, Dr. Messias! Li as perguntas frequentes no site e quero continuar a conversa no WhatsApp.',

  audienceLawyer:
    'Olá, Dr. Messias! Sou advogado(a) e busco assistência técnica médica para o meu processo (OLLIV).',

  audiencePatient:
    'Olá, Dr. Messias! Sou paciente e preciso de orientação sobre perícia médica e documentação do meu caso (OLLIV).',

  serviceInquiry: (serviceTitle: string) =>
    `Olá, Dr. Messias! Vim pelo site da OLLIV e quero conversar sobre o serviço: ${serviceTitle}.`,
} as const
