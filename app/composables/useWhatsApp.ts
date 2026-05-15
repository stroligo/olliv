/** Número do WhatsApp para CTA (Brasília). Ajuste se necessário. */
export const OLLIV_WHATSAPP_E164 = '5561991978442'

export const OLLIV_WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Vim pelo site da OLLIV Perícia Médica e gostaria de falar com um especialista sobre assistência técnica médico-legal.'

export function useWhatsAppHref(message = OLLIV_WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${OLLIV_WHATSAPP_E164}?text=${encodeURIComponent(message)}`
}
