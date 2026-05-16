/** Copy partilhada: WhatsApp pré-preenchido, SEO e micro-textos institucionais. */

export const SITE_SEO = {
  title: 'OLLIV Perícia Médica — Assistência técnica médico-legal',
  description:
    'Assistência técnica médica estratégica para processos judiciais complexos. Pareceres médico-legais em Brasília-DF.',
} as const

export const OLLIV_CONTACT_EMAIL = 'contato@ollivpericias.com.br' as const

/** Domínio público oficial (HTTPS, sem barra terminal) — alinhado a runtimeConfig.public.siteUrl. */
export const SITE_ORIGIN = 'https://www.ollivpericias.com.br' as const

/** Texto do rodapé / cópias que mostram apenas o host. */
export const SITE_ORIGIN_DISPLAY = 'www.ollivpericias.com.br' as const

export const WHATSAPP_MESSAGES = {
  default:
    'Olá! Vim pelo site da OLLIV Perícia Médica e gostaria de falar com um especialista sobre assistência técnica médico-legal.',

  documents:
    'Olá! Preciso enviar documentos para análise e anexar ao processo em andamento.',

  /** Logo após a leitura da grelha de serviços */
  afterServices:
    'Olá! Já vi os serviços no site da OLLIV e gostaria de uma orientação rápida sobre viabilidade do meu caso.',

  /** Secção Sobre / credibilidade */
  aboutCase:
    'Olá! Li a secção sobre a OLLIV no site e quero falar sobre o meu caso com um especialista.',

  /** Diferenciais — triagem */
  triagem:
    'Olá! Quero iniciar pela triagem no WhatsApp, conforme descrito no site da OLLIV.',

  /** Processo — mesmo canal */
  processTriagem:
    'Olá! Quero seguir o fluxo do site: triagem no WhatsApp para o meu caso médico-legal.',

  /** FAQ final */
  afterFaq:
    'Olá! Li as perguntas frequentes no site e quero continuar a conversa no WhatsApp.',

  serviceInquiry: (serviceTitle: string) =>
    `Olá! Vim pelo site da OLLIV e quero conversar sobre o serviço: ${serviceTitle}.`,
} as const
