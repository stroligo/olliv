<script setup lang="ts">
/**
 * Meta alinhada a `app.head` em `nuxt.config.ts`, com OG/Twitter/canonical quando
 * `runtimeConfig.public.siteUrl` está definida (variável `NUXT_PUBLIC_SITE_URL`).
 */
const seoTitle = 'OLLIV Perícia Médica — Assistência técnica médico-legal'
const seoDescription =
  'Assistência técnica médica estratégica para processos judiciais complexos. Pareceres médico-legais em Brasília-DF.'

const config = useRuntimeConfig()
const raw = config.public.siteUrl
const siteUrl =
  typeof raw === 'string' && raw.length > 0 ? raw.replace(/\/$/, '') : ''
const canonicalHref = siteUrl ? `${siteUrl}/` : null
/** Enquanto não houver imagem OG 1200×630 própria, usa ícone alto (preferível a logo cortado). */
const ogAbsolute = siteUrl ? `${siteUrl}/apple-touch-icon.png` : undefined

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogLocale: 'pt_BR',
  ogType: 'website',
  ogSiteName: 'OLLIV Perícia Médica',
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  twitterCard: 'summary_large_image',
  ...(canonicalHref && ogAbsolute
    ? { ogUrl: canonicalHref, ogImage: ogAbsolute, twitterImage: ogAbsolute }
    : {}),
})

const orgLdInner = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'OLLIV Perícia Médica',
    description: seoDescription,
    serviceType: 'Assistência técnica médico-legal',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Distrito Federal',
      containedInPlace: { '@type': 'Country', name: 'Brasil' },
    },
    ...(siteUrl ? { url: siteUrl } : {}),
  }),
)

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
    <main>
      <LandingHero />
      <LandingTrustBar />
      <LandingAuthority />
      <LandingServices />
      <LandingDifferentials />
      <LandingProcess />
      <LandingCredibility />
      <LandingCtaBanner />
    </main>
    <LandingFooter />
    <LandingWhatsappFab />
  </div>
</template>
