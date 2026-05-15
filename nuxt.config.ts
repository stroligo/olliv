// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  /** URL pública absoluta para canonical, og:url e JSON-LD (ex.: https://seudominio.com.br) */
  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],

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
      title: 'OLLIV Perícia Médica — Assistência técnica médico-legal',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        {
          name: 'description',
          content:
            'Assistência técnica médica estratégica para processos judiciais complexos. Pareceres médico-legais em Brasília-DF.',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0E1B33' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap',
        },
      ],
    },
  },
})
