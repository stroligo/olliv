export {}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag.Gtag
    /** Event snippet Google Ads — conversão "Contato" nos CTAs WhatsApp. */
    gtag_report_conversion?: (url?: string) => false
  }
}

declare namespace Gtag {
  type Gtag = (...args: unknown[]) => void
}
