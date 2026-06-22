type GtagArgs = unknown[]

let gtagScriptInjected = false
let adsConfigured = false
let gaConfigured = false
let gaLoadScheduled = false

function initDataLayer() {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: GtagArgs) => {
      window.dataLayer?.push(args)
    }
  }
}

function injectScript(id: string, marker: string) {
  if (document.querySelector(`script[data-olliv-gtag="${marker}"]`)) return
  const loader = document.createElement('script')
  loader.async = true
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  loader.dataset.ollivGtag = marker
  document.head.appendChild(loader)
}

function gtagCall(...args: GtagArgs) {
  initDataLayer()
  window.gtag?.(...args)
}

/**
 * Google Ads — snippet oficial, carrega no page load para Tag Assistant / remarketing.
 * `gtag/js?id=AW-…` + `gtag('config', 'AW-…')`
 */
export function initGoogleAdsOnPageLoad(adsId: string) {
  if (!adsId || adsConfigured) return
  adsConfigured = true
  initDataLayer()

  if (!gtagScriptInjected) {
    gtagScriptInjected = true
    injectScript(adsId, adsId)
    gtagCall('js', new Date())
  }

  gtagCall('config', adsId)
}

/** GA4 — adiado após interação ou timeout (performance). Reutiliza o gtag.js do Ads se já carregou. */
export function ensureAnalyticsLoaded(measurementId: string) {
  if (!measurementId || gaConfigured) return
  initDataLayer()

  if (!gtagScriptInjected) {
    gtagScriptInjected = true
    injectScript(measurementId, measurementId)
    gtagCall('js', new Date())
  }

  gtagCall('config', measurementId, { send_page_view: true })
  gaConfigured = true
}

/** Garante Ads ativo antes de disparar conversão (já deve estar no load da página). */
export function ensureGoogleAdsLoaded(adsId: string) {
  if (!adsId) return
  initGoogleAdsOnPageLoad(adsId)
}

export function trackPageView(measurementId: string, pagePath: string) {
  if (!measurementId) return
  gtagCall('config', measurementId, { page_path: pagePath })
}

export function trackWhatsAppCta(label: string) {
  gtagCall('event', 'whatsapp_cta', { cta_label: label })
}

export function trackAdsContatoConversion(sendTo: string) {
  gtagCall('event', 'conversion', {
    send_to: sendTo,
    value: 1.0,
    currency: 'BRL',
  })
}

const GA_DEFER_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const

/** Agenda GA4 após interação ou timeout (fallback para bounce). */
export function scheduleAnalyticsLoad(measurementId: string, idleTimeoutMs = 8000) {
  if (!measurementId || gaLoadScheduled || typeof window === 'undefined') return
  gaLoadScheduled = true
  initDataLayer()

  let loaded = false
  const load = () => {
    if (loaded) return
    loaded = true
    for (const ev of GA_DEFER_EVENTS) {
      window.removeEventListener(ev, load, captureOpts)
    }
    ensureAnalyticsLoaded(measurementId)
  }

  const captureOpts: AddEventListenerOptions = { capture: true, passive: true, once: true }
  for (const ev of GA_DEFER_EVENTS) {
    window.addEventListener(ev, load, captureOpts)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => load(), { timeout: idleTimeoutMs })
  } else {
    setTimeout(load, idleTimeoutMs)
  }
}
