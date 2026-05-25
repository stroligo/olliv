/**
 * Google tag (gtag.js) — GA4.
 * Só carrega no cliente; ID vazio (ex. dev sem env) desliga o script.
 */
export default defineNuxtPlugin(() => {
  const measurementId = String(useRuntimeConfig().public.googleAnalyticsId ?? '').trim()

  if (!measurementId) return

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
        async: true,
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: true });
        `,
        type: 'text/javascript',
        tagPosition: 'head',
      },
    ],
  })

  const router = useRouter()

  router.afterEach((to) => {
    if (typeof window.gtag !== 'function') return
    window.gtag('config', measurementId, {
      page_path: to.fullPath,
    })
  })
})
