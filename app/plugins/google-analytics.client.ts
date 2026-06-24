/**
 * Google tag — GA4 adiado. Google Ads vem do HTML estático (`nuxt.config` head).
 */
import { GOOGLE_ADS_ID } from '~/constants/analytics'
import { scheduleAnalyticsLoad, trackPageView } from '~/utils/gtag'

function adsTagInHead(): boolean {
  return Boolean(document.querySelector(`script[src*="gtag/js?id=${GOOGLE_ADS_ID}"]`))
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const measurementId = String(config.googleAnalyticsId ?? '').trim()

  if (measurementId) {
    scheduleAnalyticsLoad(measurementId)

    const router = useRouter()
    router.afterEach((to) => {
      trackPageView(measurementId, to.fullPath)
    })
  }

  if (!adsTagInHead()) {
    const adsId = String(config.googleAdsId ?? '').trim()
    if (adsId) {
      import('~/utils/gtag').then(({ initGoogleAdsOnPageLoad, gtagReportConversion }) => {
        initGoogleAdsOnPageLoad(adsId)
        if (typeof window.gtag_report_conversion !== 'function') {
          window.gtag_report_conversion = gtagReportConversion
        }
      })
    }
  }
})
