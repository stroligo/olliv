<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error.statusCode === 404)

useHead({
  title: is404.value
    ? 'Página não encontrada — OLLIV Perícia Médica'
    : 'Erro — OLLIV Perícia Médica',
})

useSeoMeta({
  robots: 'noindex, nofollow',
})

if (import.meta.server && !import.meta.prerender && is404.value) {
  setResponseStatus(404)
}
</script>

<template>
  <div class="min-h-screen bg-off-white">
    <LandingHeader />
    <AppNotFoundContent v-if="is404" />
    <main
      v-else
      id="conteudo-principal"
      tabindex="-1"
      class="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8"
    >
      <h1 class="font-heading text-h2 font-bold text-primary">Algo correu mal</h1>
      <p class="mt-5 max-w-lg font-body text-body-lg leading-relaxed text-muted">
        Ocorreu um erro inesperado. Tente novamente ou volte ao início do site.
      </p>
      <NuxtLink
        to="/"
        class="mt-10 inline-flex items-center justify-center rounded-full border border-card-border bg-white px-6 py-3 font-heading text-caption font-semibold uppercase tracking-wide text-primary transition-[color,transform] duration-200 ease-out hover:scale-[0.985] hover:border-gold-dark/40 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2"
        @click="clearError()"
      >
        Voltar ao início
      </NuxtLink>
    </main>
    <LandingFooter />
  </div>
</template>
