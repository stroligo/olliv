<script setup lang="ts">
/** Após ativar o skip link, foco vai para `<main>` (Leitor de tela / teclado). */
function focusMainContent() {
  if (!import.meta.client) return
  nextTick(() => {
    document.getElementById('conteudo-principal')?.focus({ preventScroll: false })
  })
}
</script>

<template>
  <div>
    <a
      href="#conteudo-principal"
      class="skip-to-main"
      @click="focusMainContent"
    >
      Ir para o conteúdo principal
    </a>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
