<script setup lang="ts">
useSeoMeta({
  title: 'Página não encontrada — OLLIV Perícia Médica',
  description:
    'A página solicitada não foi encontrada. Retorne ao site da OLLIV Perícia Médica ou entre em contacto pelo WhatsApp.',
  robots: 'noindex, nofollow',
})

/** HTTP 404 em runtime; omitido no prerender para não falhar o `nuxt generate`. */
if (import.meta.server && !import.meta.prerender) {
  setResponseStatus(404)
}
</script>

<template>
  <div class="min-h-screen bg-off-white">
    <LandingHeader />
    <AppNotFoundContent />
    <LandingFooter />
  </div>
</template>
