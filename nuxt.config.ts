// https://nuxt.com/docs/api/configuration/nuxt-config
import { joinURL } from 'ufo'

import { SITE_ORIGIN, SITE_SEO } from './app/constants/siteMarketing'

/**
 * Produção OLLIV (`https://www.ollivpericias.com.br/`) → raiz do domínio: omitir `NUXT_APP_BASE_URL` (fica `/`).
 * Só definir variável para preview/staging ou outro deploy em subpasta (`/cliente/`, barras inicial e terminal).
 */
function normalizeNUXTAppBase(raw: string | undefined): string {
  const s = typeof raw === 'string' ? raw.trim() : ''
  if (s === '' || s === '/') return '/'
  const slug = joinURL('/', s.replace(/^\/+|\/+$/g, ''))
  return slug.endsWith('/') ? slug : `${slug}/`
}

const appBaseURL = normalizeNUXTAppBase(process.env.NUXT_APP_BASE_URL)
const appBaseWithoutTrailingSlash = appBaseURL === '/' ? '' : appBaseURL.replace(/\/+$/, '')
const rootedPath = (path: string) =>
  appBaseWithoutTrailingSlash === '' ? path : `${appBaseWithoutTrailingSlash}${path}`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  /** DevTools só em desenvolvimento — evita overhead desnecessário no build de produção. */
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  /** URL pública para canonical / OG / JSON-LD — override com `NUXT_PUBLIC_SITE_URL` (ex. staging). */
  runtimeConfig: {
    public: {
      siteUrl: SITE_ORIGIN,
      /** GA4; vazio em dev se `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=""`. Produção: `G-FGLW3DYBEH`. */
      googleAnalyticsId:
        process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID ??
        (process.env.NODE_ENV === 'production' ? 'G-FGLW3DYBEH' : ''),
    },
  },

  /**
   * Cache longo para estáticos servidos pelo Nitro (reduz revalidação em visitas repetidas).
   * Ajuste se servir HTML estático com outro CDN por cima.
   */
  routeRules: {
    [rootedPath('/images/**')]: {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    [rootedPath('/_nuxt/**')]: {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    [rootedPath('/favicon.ico')]: {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    [rootedPath('/favicon-16x16.png')]: {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    [rootedPath('/favicon-32x32.png')]: {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    [rootedPath('/apple-touch-icon.png')]: {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
  },

  /**
   * Substitui o link bloqueante do Google Fonts: fontes servidas de forma otimizada (sem CSS
   * render-blocking de fonts.googleapis.com). Pesos alinhados ao antigo stylesheet.
   */
  modules: ['@nuxt/fonts', '@nuxtjs/tailwindcss', '@nuxt/eslint'],

  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] },
      { name: 'Montserrat', provider: 'google', weights: [600, 700, 800] },
    ],
  },

  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: '~/assets/css/main.css',
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  /**
   * `modulePreload.polyfill: false` — desliga o trecho que o Nuxt injeta no entry e que, com
   * sourcemaps ativos, dispara WARN do Vite sobre o plugin `nuxt:module-preload-polyfill`.
   * Os targets do build já são modernos (Vite default “baseline widely available”); o impacto é
   * mínimo para um site institucional. Se precisares IE/legado, remove este bloco ou reverte.
   */
  vite: {
    build: {
      modulePreload: { polyfill: false },
    },
  },

  app: {
    baseURL: appBaseURL,
    head: {
      title: SITE_SEO.title,
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        {
          name: 'description',
          content: SITE_SEO.description,
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0E1B33' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: joinURL(appBaseURL, 'favicon.ico'),
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: joinURL(appBaseURL, 'favicon-32x32.png'),
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: joinURL(appBaseURL, 'favicon-16x16.png'),
          sizes: '16x16',
        },
        {
          rel: 'apple-touch-icon',
          href: joinURL(appBaseURL, 'apple-touch-icon.png'),
          sizes: '180x180',
        },
      ],
    },
  },
})
