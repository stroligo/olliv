<script setup lang="ts">
const whatsappHref = useWhatsAppHref()
</script>

<template>
  <main
    id="conteudo-principal"
    tabindex="-1"
    class="relative flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(200,161,101,0.1),transparent_55%)]"
      aria-hidden="true"
    />
    <div class="relative max-w-xl">
      <p
        class="font-heading text-[clamp(4.5rem,18vw,7rem)] font-bold leading-none tracking-tight text-gold/90"
        aria-hidden="true"
      >
        404
      </p>
      <h1 class="mt-4 font-heading text-h2 font-bold text-primary md:text-h1">
        Página não encontrada
      </h1>
      <p class="mt-5 font-body text-body-lg leading-relaxed text-muted">
        O endereço que você acessou não existe ou foi movido. Volte ao início ou fale conosco pelo
        WhatsApp para continuar.
      </p>
      <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center rounded-full border border-card-border bg-white px-6 py-3 font-heading text-caption font-semibold uppercase tracking-wide text-primary transition-[color,transform,box-shadow] duration-200 ease-out hover:scale-[0.985] hover:border-gold-dark/40 active:scale-[0.96] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2"
        >
          Voltar ao início
        </NuxtLink>
        <LandingWhatsappButton
          :href="whatsappHref"
          label="Falar com o Dr. Messias"
          variant="primary"
          analytics-label="cta_404"
        />
      </div>
    </div>
  </main>
</template>
