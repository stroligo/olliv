<script setup lang="ts">
import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

const { revealRoot, isVisible } = useRevealSection()

const processTriagemHref = useWhatsAppHref(WHATSAPP_MESSAGES.processTriagem)

const steps = [
  {
    title: 'Triagem rápida no WhatsApp',
    text: 'Você descreve a situação, anexa o essencial na medida possível e recebe retorno objetivo sobre enquadramento da demanda.',
  },
  {
    title: 'Leitura clínico-jurídica',
    text: 'Mapeamos fatos médicos decisivos e lacunas na documentação — incluindo o que um perito deve esclarecer.',
  },
  {
    title: 'Proposta de entrega técnica',
    text: 'Definimos formato (memorial breve ou amplo), prazos e prioridades de acordo com sua estratégia no processo.',
  },
  {
    title: 'Entrega para instrução',
    text: 'Síntese redacional pronta para integrar suas peças, quesitos, impugnação ou recurso especializado da prova médica.',
  },
] as const
</script>

<template>
  <section
    ref="revealRoot"
    class="bg-white py-20 md:py-24"
    :class="{ 'landing-section--visible': isVisible }"
    aria-labelledby="processo-heading"
  >
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div class="landing-reveal-header max-w-3xl">
        <p class="font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-dark">
          Processo
        </p>
        <h2 id="processo-heading" class="mt-3 font-heading text-h2 font-bold text-primary">
          Do primeiro contato ao subsídio técnico pronto
        </h2>
        <p class="mt-5 font-body text-body-lg text-muted">
          Um fluxo enxuto para você saber o que esperar — e para o caso receber a leitura médica
          certa no tempo processual disponível.
        </p>
      </div>

      <ol class="landing-reveal-stagger--alt mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          class="landing-reveal-item relative rounded-premium border border-silver/75 bg-off-white p-7"
          :style="{ '--rv-i': i + 1 }"
        >
          <span
            class="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-gold font-heading text-small font-bold text-primary-dark"
            >{{ String(i + 1).padStart(2, '0') }}</span
          >
          <h3 class="font-heading text-h4 font-semibold text-primary">{{ step.title }}</h3>
          <p class="mt-3 font-body text-small leading-relaxed text-muted">{{ step.text }}</p>
        </li>
      </ol>
      <div class="mt-14 max-w-3xl border-t border-silver/40 pt-10">
        <p class="font-body text-body text-muted">
          O primeiro contacto pode ser pelo WhatsApp: descreva a situação e, na medida do possível,
          anexe o essencial para retorno objetivo.
        </p>
        <LandingWhatsappButton
          class="mt-6 sm:inline-flex"
          :href="processTriagemHref"
          label="Iniciar pela triagem no WhatsApp"
          variant="primary"
          analytics-label="cta_processo_triagem"
        />
      </div>
    </div>
  </section>
</template>
