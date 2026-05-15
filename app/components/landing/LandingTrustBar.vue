<script setup lang="ts">
import { Award, Gauge, HeartHandshake, UserRound } from '@lucide/vue'

const items = [
  {
    title: 'Rigor técnico e ética',
    text: 'Pareceres sustentados em literatura, protocolos e prática clínica responsável.',
    icon: Award,
  },
  {
    title: 'Foco em resultados',
    text: 'Leitura do caso sob o prisma probatório: o que convence técnica e juridicamente.',
    icon: Gauge,
  },
  {
    title: 'Credibilidade e confiança',
    text: 'Linguagem institucional, transparência de limitações e segurança na condução da prova técnica.',
    icon: HeartHandshake,
  },
  {
    title: 'Atendimento personalizado',
    text: 'Canal objetivo por WhatsApp para triagem rápida e priorização quando houver urgência.',
    icon: UserRound,
  },
] as const
</script>

<template>
  <section
    class="border-y border-silver/70 bg-white py-14 md:py-16"
    aria-label="Benefícios em destaque"
  >
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <article
          v-for="item in items"
          :key="item.title"
          class="group flex flex-col rounded-premium border border-silver/10 bg-gradient-to-br from-white to-off-white px-7 pb-8 pt-9 shadow-[0_14px_40px_rgba(14,27,51,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-dark/35 hover:shadow-premium"
        >
          <div
            class="mx-auto mb-7 flex size-[4.75rem] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/22 via-gold/10 to-transparent text-gold-dark shadow-inner shadow-black/5 transition-transform duration-300 group-hover:scale-[1.04] md:size-[5rem]"
          >
            <component
              :is="item.icon"
              class="size-10 stroke-[1.35] md:size-11"
              :stroke-width="1.35"
              aria-hidden="true"
            />
          </div>
          <h2 class="font-heading text-h4 font-semibold tracking-tight text-primary">
            {{ item.title }}
          </h2>
          <p class="mt-3 font-body text-small leading-relaxed text-muted">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
