// https://nuxt.com/docs/api/configuration/nuxt-config
import { SITE_ORIGIN, SITE_SEO } from './app/constants/siteMarketing'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  /** DevTools só em desenvolvimento — evita overhead desnecessário no build de produção. */
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  /** URL pública para canonical / OG / JSON-LD — override com `NUXT_PUBLIC_SITE_URL` (ex. staging). */
  runtimeConfig: {
    public: {
      siteUrl: SITE_ORIGIN,
    },
  },

  /**
   * Cache longo para estáticos servidos pelo Nitro (reduz revalidação em visitas repetidas).
   * Ajuste se servir HTML estático com outro CDN por cima.
   */
  routeRules: {
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/favicon.ico': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/favicon-16x16.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/favicon-32x32.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/apple-touch-icon.png': {
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

  app: {
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
  },
})
