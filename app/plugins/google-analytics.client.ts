/**
 * Google tag (gtag.js) — Google Ads no page load; GA4 adiado; conversão WhatsApp.
 */
import {
  gtagReportConversion,
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

  /** Snippet Google Ads — `onclick="return gtag_report_conversion(url)"` */
  window.gtag_report_conversion = gtagReportConversion

  if (measurementId) {
    scheduleAnalyticsLoad(measurementId)

    const router = useRouter()
    router.afterEach((to) => {
      trackPageView(measurementId, to.fullPath)
    })
  }
})
