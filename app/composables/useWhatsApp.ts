import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'
import {
  ensureGoogleAdsLoaded,
  trackAdsContatoConversion,
  trackWhatsAppCta,
} from '~/utils/gtag'

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
 */
export function pushGoogleAdsContatoConversion() {
  if (!import.meta.client || typeof window === 'undefined') return

  const config = useRuntimeConfig().public
  const sendTo = String(config.googleAdsContatoConversion ?? '').trim()
  const adsId = String(config.googleAdsId ?? '').trim()
  if (!sendTo) return

  ensureGoogleAdsLoaded(adsId)
  trackAdsContatoConversion(sendTo)
}

/**
 * Clique em CTA WhatsApp — `dataLayer` + GA4 (`whatsapp_cta`) + conversão Google Ads.
 * Registre `cta_label` como parâmetro personalizado no GA4, se quiser relatórios por rótulo.
 */
export function pushWhatsAppCtaClick(label: string) {
  if (!import.meta.client || typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: 'whatsapp_cta', cta_label: label })
  trackWhatsAppCta(label)
  pushGoogleAdsContatoConversion()
}
