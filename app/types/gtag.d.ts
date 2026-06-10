export {}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag.Gtag
  }
}

declare namespace Gtag {
  type Gtag = (...args: unknown[]) => void
}
