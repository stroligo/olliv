/**
 * Google tag (gtag.js) — GA4 adiado; Google Ads só na conversão WhatsApp.
 */
import {
  scheduleAnalyticsLoad,
  trackPageView,
} from '~/utils/gtag'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const measurementId = String(config.googleAnalyticsId ?? '').trim()

  if (!measurementId) return

  scheduleAnalyticsLoad(measurementId)

  const router = useRouter()
  router.afterEach((to) => {
    trackPageView(measurementId, to.fullPath)
  })
})
