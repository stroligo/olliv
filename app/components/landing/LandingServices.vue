<script setup lang="ts">
import { ClipboardList, FileText, GitCompareArrows, Scale, Search, Users } from '@lucide/vue'

const services = [
  {
    title: 'Análise de viabilidade',
    text: 'Prévia dos pontos médicos decisivos e limitações antes de investir em diligências periciais e expensas da causa.',
    icon: Search,
  },
  {
    title: 'Parecer médico-legal',
    text: 'Fundamentação objetiva sobre nexo causal, padrão de conduta assistencial, sequelas e previsibilidade.',
    icon: FileText,
  },
  {
    title: 'Assistentes técnicos',
    text: 'Apoio contínuo na instrução, quesitos bem direcionados e contraste seguro contra achados incompletos.',
    icon: Users,
  },
  {
    title: 'Acompanhamento da perícia',
    text: 'Roteiros de inconsistência na prova, respeito aos limites éticos da relação médico-legista/perito.',
    icon: ClipboardList,
  },
  {
    title: 'Impugnação / subsídios técnicos',
    text: 'Subsidios escritos quando a decisão depende da correção de premissas técnicas equivocadas na prova médica.',
    icon: Scale,
  },
  {
    title: 'Parecer convergente / divergente',
    text: 'Quando o laudo pericial merece confirmação técnica ou quando é necessário refinar o debate com base sólida.',
    icon: GitCompareArrows,
  },
] as const
</script>

<template>
  <section id="servicos" class="bg-off-white py-20 md:py-24" aria-labelledby="servicos-heading">
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-dark">
          Serviços
        </p>
        <h2 id="servicos-heading" class="mt-3 font-heading text-h2 font-bold text-primary">
          O que a OLLIV entrega na prática processual
        </h2>
        <p class="mt-5 font-body text-body-lg text-muted">
          Cada etapa é pensada para reduzir ruído clínico, fortalecer o raciocínio jurídico e
          proteger a qualidade da prova na fase em que o técnico realmente importa.
        </p>
      </div>

      <ul class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="svc in services"
          :key="svc.title"
          class="group relative flex flex-col overflow-hidden rounded-premium border border-silver/20 bg-white p-9 pb-10 shadow-[0_12px_44px_rgba(14,27,51,0.07)] ring-1 ring-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-dark/30 hover:shadow-premium"
        >
          <div
            class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-dark/85 to-transparent opacity-95"
            aria-hidden="true"
          />
          <div
            class="mx-auto mb-8 flex size-[5.25rem] items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 via-gold/14 to-transparent text-gold-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-300 group-hover:scale-[1.045] lg:size-[5.5rem]"
          >
            <component
              :is="svc.icon"
              class="size-10 stroke-[1.3] lg:size-11"
              :stroke-width="1.3"
              aria-hidden="true"
            />
          </div>
          <h3 class="font-heading text-h4 font-semibold text-primary">{{ svc.title }}</h3>
          <p class="mt-3.5 grow font-body text-small leading-relaxed text-muted">{{ svc.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
