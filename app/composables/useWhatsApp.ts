import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'
import { ensureGoogleAdsLoaded, gtagReportConversion, trackWhatsAppCta } from '~/utils/gtag'

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
 * Clique em CTA WhatsApp — `gtag_report_conversion(url)` (snippet Google Ads no HTML).
 */
export function handleWhatsAppCtaClick(event: MouseEvent, href: string, label: string) {
  if (!import.meta.client || typeof window === 'undefined') return

  event.preventDefault()

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: 'whatsapp_cta', cta_label: label })
  trackWhatsAppCta(label)

  const adsId = String(useRuntimeConfig().public.googleAdsId ?? '').trim()
  if (adsId) ensureGoogleAdsLoaded(adsId)

  if (typeof window.gtag_report_conversion === 'function') {
    window.gtag_report_conversion(href)
  } else {
    gtagReportConversion(href)
  }
}
