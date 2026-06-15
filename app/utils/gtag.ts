type GtagArgs = unknown[]

let analyticsScriptInjected = false
let adsConfigured = false
let adsScriptInjected = false
let interactionScheduled = false

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

/** GA4 — carrega só após interação ou timeout longo (não compete com LCP). */
export function ensureAnalyticsLoaded(measurementId: string) {
  if (!measurementId || analyticsScriptInjected) return
  analyticsScriptInjected = true
  initDataLayer()
  injectScript(measurementId, measurementId)
  gtagCall('js', new Date())
  gtagCall('config', measurementId, { send_page_view: true })
}

/** Google Ads — só na conversão WhatsApp; evita ~140 KiB no carregamento inicial. */
export function ensureGoogleAdsLoaded(adsId: string, measurementId = '') {
  if (!adsId) return
  initDataLayer()

  const gaId = measurementId.trim()
  if (!analyticsScriptInjected) {
    ensureAnalyticsLoaded(gaId || adsId)
  }

  if (adsConfigured) return

  if (!adsScriptInjected && adsId !== gaId) {
    adsScriptInjected = true
    injectScript(adsId, `ads-${adsId}`)
  }

  gtagCall('config', adsId)
  adsConfigured = true
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

const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const

/** Agenda GA4 após primeira interação ou timeout (fallback para bounce). */
export function scheduleAnalyticsLoad(measurementId: string, idleTimeoutMs = 8000) {
  if (!measurementId || interactionScheduled || typeof window === 'undefined') return
  interactionScheduled = true
  initDataLayer()

  let loaded = false
  const load = () => {
    if (loaded) return
    loaded = true
    for (const ev of INTERACTION_EVENTS) {
      window.removeEventListener(ev, load, captureOpts)
    }
    ensureAnalyticsLoaded(measurementId)
  }

  const captureOpts: AddEventListenerOptions = { capture: true, passive: true, once: true }
  for (const ev of INTERACTION_EVENTS) {
    window.addEventListener(ev, load, captureOpts)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => load(), { timeout: idleTimeoutMs })
  } else {
    setTimeout(load, idleTimeoutMs)
  }
}

