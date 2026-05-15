<script setup lang="ts">
const primary = useWhatsAppHref()
const second = useWhatsAppHref(
  'Olá! Preciso enviar documentos para análise e anexar ao processo em andamento.'
)
</script>

<template>
  <section
    id="contato"
    class="relative overflow-hidden bg-primary-dark py-20 md:py-28"
    aria-labelledby="cta-heading"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,164,74,0.12),transparent_45%)]"
    />
    <div class="relative mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
      <h2 id="cta-heading" class="font-heading text-h2 font-bold text-white md:text-h1">
        Vamos direcionar seu caso no canal certo — com resposta rápida no WhatsApp.
      </h2>
      <p
        class="mx-auto mt-6 max-w-2xl font-body text-body-lg leading-relaxed text-white text-text/92"
      >
        Envie mensagem agora para receber orientação sobre documentos necessários e possíveis
        formatos de parecer ou assistência. O contato inicial é informal, objetivo e orientado à
        viabilidade técnica.
      </p>
      <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <LandingWhatsappButton
          :href="primary"
          label="Fale com um especialista"
          variant="primary"
          :dark-offset="true"
        />
        <LandingWhatsappButton
          :href="second"
          label="Enviar documentos para análise"
          variant="outline"
          :dark-offset="true"
        />
      </div>
      <p class="mt-8 font-body text-white text-caption text-text/70">
        Responderemos com discrição e respeito ao sigilo profissional em relação aos fatos narrados.
      </p>
    </div>
  </section>
</template>
