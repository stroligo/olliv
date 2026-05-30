<script setup lang="ts">
/**
 * Crédito — desenvolvimento da página
 * Gabriel Stroligo
 * https://www.linkedin.com/in/gabrielstroligo/
 */
import { defineAsyncComponent } from 'vue'
import { OLLIV_WHATSAPP_E164 } from '~/composables/useWhatsApp'
import { OLLIV_CONTACT_EMAIL, SITE_LOGO_PATH, SITE_SEO } from '~/constants/siteMarketing'

/** Code-splitting: secções abaixo da dobra em chunks separados (menos JS inicial no cliente). */
const LandingMetrics = defineAsyncComponent(
  () => import('~/components/landing/LandingMetrics.vue')
)
const LandingAudience = defineAsyncComponent(
  () => import('~/components/landing/LandingAudience.vue')
)
const LandingAuthority = defineAsyncComponent(
  () => import('~/components/landing/LandingAuthority.vue')
)
const LandingServices = defineAsyncComponent(
  () => import('~/components/landing/LandingServices.vue')
)
const LandingDifferentials = defineAsyncComponent(
  () => import('~/components/landing/LandingDifferentials.vue')
)
const LandingProcess = defineAsyncComponent(() => import('~/components/landing/LandingProcess.vue'))
const LandingCredibility = defineAsyncComponent(
  () => import('~/components/landing/LandingCredibility.vue')
)
const LandingFaq = defineAsyncComponent(() => import('~/components/landing/LandingFaq.vue'))
const LandingCtaBanner = defineAsyncComponent(
  () => import('~/components/landing/LandingCtaBanner.vue')
)
const LandingFooter = defineAsyncComponent(() => import('~/components/landing/LandingFooter.vue'))
const LandingWhatsappFab = defineAsyncComponent(
  () => import('~/components/landing/LandingWhatsappFab.vue')
)

/**
 * OG/Twitter/canonical/JSON-LD quando `runtimeConfig.public.siteUrl` existe
 * (por defeito `SITE_ORIGIN` em `siteMarketing`; override com `NUXT_PUBLIC_SITE_URL`).
 */
const seoTitle = SITE_SEO.title
const seoDescription = SITE_SEO.description

const OLLIV_EMAIL = OLLIV_CONTACT_EMAIL
const phoneE164 = `+${OLLIV_WHATSAPP_E164}`

const siteUrl = usePublicSiteUrl()
const canonicalHref = siteUrl ? `${siteUrl}/` : null
/** Enquanto não houver imagem OG 1200×630 própria, usa ícone alto (preferível a logo cortado). */
const ogAbsolute = siteUrl ? `${siteUrl}/apple-touch-icon.png` : undefined

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  /** Explícito para previews em buscadores / redes */
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogLocale: 'pt_BR',
  ogType: 'website',
  ogSiteName: 'OLLIV Perícia Médica',
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  ...(canonicalHref && ogAbsolute
    ? { ogUrl: canonicalHref, ogImage: ogAbsolute, twitterImage: ogAbsolute }
    : {}),
})

const serviceLd = {
  '@type': 'ProfessionalService' as const,
  name: 'OLLIV Perícia Médica',
  description: seoDescription,
  serviceType: 'Assistência técnica e perícias médicas',
  telephone: phoneE164,
  email: OLLIV_EMAIL,
  areaServed: {
    '@type': 'AdministrativeArea' as const,
    name: 'Distrito Federal',
    containedInPlace: { '@type': 'Country' as const, name: 'Brasil' },
  },
  address: {
    '@type': 'PostalAddress' as const,
    addressLocality: 'Brasília',
    addressRegion: 'DF',
    addressCountry: 'BR',
  },
}

const orgLdInner = computed(() => {
  if (!siteUrl) {
    return JSON.stringify({
      '@context': 'https://schema.org',
      ...serviceLd,
    })
  }
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'OLLIV Perícia Médica',
        inLanguage: 'pt-BR',
        publisher: { '@id': `${siteUrl}/#business` },
      },
      {
        ...serviceLd,
        '@id': `${siteUrl}/#business`,
        url: siteUrl,
        logo: `${siteUrl}${SITE_LOGO_PATH}`,
        image: `${siteUrl}${SITE_LOGO_PATH}`,
      },
    ],
  })
})

useHead(() => ({
  link: canonicalHref ? [{ rel: 'canonical', href: canonicalHref }] : [],
  script: [
    {
      key: 'ld-pro-service',
      type: 'application/ld+json',
      innerHTML: orgLdInner.value,
    },
  ],
}))
</script>

<template>
  <div class="min-h-screen bg-off-white">
    <LandingHeader />
    <main id="conteudo-principal" tabindex="-1">
      <LandingHero />
      <LandingTrustBar />
      <LandingMetrics />
      <LandingAudience />
      <LandingAuthority />
      <LandingServices />
      <LandingDifferentials />
      <LandingProcess />
      <LandingCredibility />
      <LandingCtaBanner />
      <LandingFaq />
    </main>
    <LandingFooter />
    <LandingWhatsappFab />
  </div>
</template>
