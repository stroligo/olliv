<script setup lang="ts">
import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

const { revealRoot, isVisible } = useRevealSection()

const triagemHref = useWhatsAppHref(WHATSAPP_MESSAGES.triagem)

const points = [
  {
    title: 'Autoridade sem retórica vazia',
    text: 'Fundamentação explícita, referências quando necessário e clareza sobre grau de certeza médica.',
  },
  {
    title: 'Agilidade no contato',
    text: 'Primeiro contato via WhatsApp para encaminhar documentos e receber orientação sobre próximos passos.',
  },
  {
    title: 'Processos de alta complexidade',
    text: 'Estrutura pensada para causas com múltiplos documentos, evolução clínica longa e divergência de especialistas.',
  },
] as const
</script>

<template>
  <section
    id="diferenciais"
    ref="revealRoot"
    class="bg-primary-dark py-20 text-text md:py-24"
    :class="{ 'landing-section--visible': isVisible }"
    aria-labelledby="diff-heading"
  >
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div class="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div class="landing-reveal-item" :style="{ '--rv-i': 0 }">
          <p
            class="font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-light"
          >
            Por que nos escolher
          </p>
          <h2 id="diff-heading" class="mt-3 font-heading text-h2 font-bold text-white">
            Perícia Médica Especializada
          </h2>
          <p class="mt-6 font-body text-body-lg leading-relaxed text-text/92">
            A OLLIV entende que a prova médica só performa bem quando há alinhamento entre narrativa
            jurídica, dados clínicos e honestidade técnica. Trabalhamos com vocabulário acessível a
            magistrados, sem tirar peso da profundidade científica.
          </p>
        </div>
        <ul class="space-y-8 font-body text-body landing-reveal-stagger--alt">
          <li
            v-for="(p, i) in points"
            :key="p.title"
            class="landing-reveal-item flex gap-4"
            :style="{ '--rv-i': i + 1 }"
          >
            <span class="mt-1 size-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
            <div>
              <h3 class="font-heading text-h4 font-semibold text-white">
                {{ p.title }}
              </h3>
              <p class="mt-2 text-text/88">
                {{ p.text }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-14 flex flex-col items-center sm:items-start">
        <LandingWhatsappButton
          :href="triagemHref"
          label="Falar com o Dr. Messias"
          variant="primary"
          :dark-offset="true"
          analytics-label="cta_diferenciais_triagem"
        />
      </div>
    </div>
  </section>
</template>
