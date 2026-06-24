/** Google Analytics 4 — measurement ID (produção OLLIV). */
export const GOOGLE_ANALYTICS_ID = 'G-FGLW3DYBEH' as const

/** Google Ads — conta OLLIV Perícias. */
export const GOOGLE_ADS_ID = 'AW-18195120521' as const

/** Rótulo da conversão "Contato" — snippet oficial Google Ads. */
export const GOOGLE_ADS_CONTATO_CONVERSION_LABEL = 'JGjdCPK07LscEImDjuRD' as const

/** Conversão "Contato" — dispara em cliques nos CTAs WhatsApp. */
export const GOOGLE_ADS_CONTATO_CONVERSION =
  `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONTATO_CONVERSION_LABEL}` as const
