export {}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag.Gtag
  }
}

declare namespace Gtag {
  type Gtag = (...args: GtagCommand[]) => void

  type GtagCommand =
    | ['js', Date]
    | ['config', string, Record<string, unknown>?]
    | ['event', string, Record<string, unknown>?]
}
