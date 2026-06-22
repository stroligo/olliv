/**
 * Google tag (gtag.js) — Google Ads no page load (tráfego pago); GA4 adiado.
 */
import {
  initGoogleAdsOnPageLoad,
  scheduleAnalyticsLoad,
  trackPageView,
} from '~/utils/gtag'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const measurementId = String(config.googleAnalyticsId ?? '').trim()
  const adsId = String(config.googleAdsId ?? '').trim()

  if (adsId) {
    initGoogleAdsOnPageLoad(adsId)
  }

  if (measurementId) {
    scheduleAnalyticsLoad(measurementId)

    const router = useRouter()
    router.afterEach((to) => {
      trackPageView(measurementId, to.fullPath)
    })
  }
})
