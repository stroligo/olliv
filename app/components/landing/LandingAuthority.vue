<script setup lang="ts">
const { revealRoot, isVisible } = useRevealSection()

const tags = [
  'Clareza aos advogados',
  'Resposta segura aos tribunais',
  'Leitura forense do prontuário',
  'Respeito à litigância de alto risco',
] as const
</script>

<template>
  <section
    ref="revealRoot"
    class="bg-off-white py-12 md:py-14"
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
      <ul
        class="landing-reveal-stagger--alt mt-10 flex list-none flex-wrap items-center justify-center gap-4 p-0 font-body text-caption font-semibold uppercase tracking-[0.16em] text-primary/70"
      >
        <li
          v-for="(label, i) in tags"
          :key="label"
          class="landing-reveal-item rounded-full border border-silver px-6 py-2"
          :style="{ '--rv-i': i + 1 }"
        >
          {{ label }}
        </li>
      </ul>
    </div>
  </section>
</template>
