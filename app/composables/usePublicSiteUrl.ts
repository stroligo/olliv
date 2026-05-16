/**
 * URL pública normalizada (sem `/` no fim), vinda de `runtimeConfig.public.siteUrl`
 * (defeito em `nuxt.config` + override `NUXT_PUBLIC_SITE_URL`).
 */
export function usePublicSiteUrl(): string {
  const config = useRuntimeConfig()
  const raw = config.public.siteUrl
  return typeof raw === 'string' && raw.length > 0 ? raw.replace(/\/$/, '') : ''
}
