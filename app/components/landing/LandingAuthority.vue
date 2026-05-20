<script setup lang="ts">
import { Building2, FileSearch, Scale } from '@lucide/vue'

const { revealRoot, isVisible } = useRevealSection()

const tags = [
  'Clareza aos advogados',
  'Resposta segura aos tribunais',
  'Leitura forense do prontuário',
  'Respeito à litigância de alto risco',
] as const

const highlights = [
  {
    icon: Scale,
    title: 'Litígios de alta complexidade',
    text: 'Erro médico, indenização, incapacidades, seguradora e responsabilidade civil com leitura probatória consistente.',
  },
  {
    icon: FileSearch,
    title: 'Prontuário e prova técnica',
    text: 'Análise forense de documentos clínicos e subsídios alinhados ao que o processo exige na instrução.',
  },
  {
    icon: Building2,
    title: 'Brasília-DF e alcance nacional',
    text: 'Atuação presencial no DF e suporte remoto para equipes jurídicas em todo o país.',
  },
] as const
</script>

<template>
  <section
    ref="revealRoot"
    class="bg-off-white py-10 md:py-12"
    :class="{ 'landing-section--visible': isVisible }"
    aria-labelledby="authority-heading"
  >
    <div class="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
      <div class="landing-reveal-header">
        <h2 id="authority-heading" class="font-heading text-h3 font-bold text-primary">
          Atuação voltada a processos que exigem precisão probatória
        </h2>
        <p class="mx-auto mt-4 max-w-3xl font-body text-body text-muted">
          Direito à saúde, indenização, erro médico, incapacidades, seguradora, responsabilidade
          civil e outras frentes em que boa técnica e boa comunicação mudam desfechos na prova
          médica pericial e na instrução.
        </p>
      </div>
      <div class="mt-8 flex flex-col gap-8">
        <ul
          class="landing-reveal-stagger--ltr flex list-none flex-wrap items-center justify-center gap-3 p-0 font-body text-caption font-semibold uppercase tracking-[0.16em] text-primary/70 sm:gap-4"
        >
          <li
            v-for="(label, i) in tags"
            :key="label"
            class="landing-reveal-item rounded-full border border-silver px-5 py-2 sm:px-6"
            :style="{ '--rv-i': i }"
          >
            {{ label }}
          </li>
        </ul>

        <ul
          class="landing-reveal-stagger--ltr grid list-none gap-4 p-0 text-left sm:grid-cols-3 sm:gap-5"
        >
          <li
            v-for="(item, i) in highlights"
            :key="item.title"
            class="landing-reveal-item flex gap-4 rounded-premium border border-silver/60 bg-white px-5 py-5 shadow-[0_10px_28px_rgba(14,27,51,0.05)] sm:flex-col sm:items-center sm:px-6 sm:py-6 sm:text-center"
            :style="{ '--rv-i': i }"
          >
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/12 text-gold-dark sm:mx-auto"
            >
              <component :is="item.icon" class="size-5 stroke-[1.35]" aria-hidden="true" />
            </div>
            <div class="min-w-0">
              <h3 class="font-heading text-h4 font-semibold text-primary">{{ item.title }}</h3>
              <p class="mt-2 font-body text-small leading-relaxed text-muted">{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
