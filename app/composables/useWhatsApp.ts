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
 * Conversão Google Ads — evento "Contato" (clique em CTA WhatsApp).
 * Equivalente ao snippet `gtag_report_conversion` do Google Ads.
 */
export function pushGoogleAdsContatoConversion() {
  if (!import.meta.client || typeof window === 'undefined') return

  const sendTo = String(useRuntimeConfig().public.googleAdsContatoConversion ?? '').trim()
  if (!sendTo || typeof window.gtag !== 'function') return

  window.gtag('event', 'conversion', {
    send_to: sendTo,
    value: 1.0,
    currency: 'BRL',
  })
}

/**
 * Clique em CTA WhatsApp — `dataLayer` + GA4 (`whatsapp_cta`) + conversão Google Ads.
 * Registre `cta_label` como parâmetro personalizado no GA4, se quiser relatórios por rótulo.
 */
export function pushWhatsAppCtaClick(label: string) {
  if (!import.meta.client || typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: 'whatsapp_cta', cta_label: label })
  window.gtag?.('event', 'whatsapp_cta', { cta_label: label })
  pushGoogleAdsContatoConversion()
}
