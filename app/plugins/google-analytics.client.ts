/**
 * Google tag (gtag.js) — GA4 + Google Ads (mesmo `dataLayer`).
 * Só carrega no cliente; IDs vazios (ex. dev sem env) desligam o script.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const measurementId = String(config.googleAnalyticsId ?? '').trim()
  const adsId = String(config.googleAdsId ?? '').trim()
  const tagIds = [measurementId, adsId].filter(Boolean)

  if (!tagIds.length) return

  const configLines = [
    measurementId
      ? `gtag('config', '${measurementId}', { send_page_view: true });`
      : '',
    adsId ? `gtag('config', '${adsId}');` : '',
  ]
    .filter(Boolean)
    .join('\n          ')

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${tagIds[0]}`,
        async: true,
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configLines}
        `,
        type: 'text/javascript',
        tagPosition: 'head',
      },
    ],
  })

  if (!measurementId) return

  const router = useRouter()

  router.afterEach((to) => {
    if (typeof window.gtag !== 'function') return
    window.gtag('config', measurementId, {
      page_path: to.fullPath,
    })
  })
})
