import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

/** Número do WhatsApp para CTA (Brasília). Ajuste se necessário. */
export const OLLIV_WHATSAPP_E164 = '5561991978442'

export const OLLIV_WHATSAPP_DEFAULT_MESSAGE = WHATSAPP_MESSAGES.default

export function useWhatsAppHref(message: string = WHATSAPP_MESSAGES.default) {
  return `https://wa.me/${OLLIV_WHATSAPP_E164}?text=${encodeURIComponent(message)}`
}

/** Mensagem qualificada por tema de serviço (cards). */
export function useWhatsAppHrefForService(serviceTitle: string) {
  return useWhatsAppHref(WHATSAPP_MESSAGES.serviceInquiry(serviceTitle))
}

/**
 * Evento para GTM / GA4 (dataLayer). Sem GTM instalado, não faz mal ser chamado.
 * No GTM: trigger com event name `whatsapp_cta` e variável `cta_label`.
 */
export function pushWhatsAppCtaClick(label: string) {
  if (!import.meta.client || typeof window === 'undefined') return
  const w = window as Window & { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event: 'whatsapp_cta', cta_label: label })
}
