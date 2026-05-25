<script setup lang="ts">
import { SITE_METRICS } from '~/constants/siteContent'

const { revealRoot, isVisible } = useRevealSection()
</script>

<template>
  <section
    ref="revealRoot"
    class="border-y border-silver/50 bg-primary py-10 md:py-12"
    :class="{ 'landing-section--visible': isVisible }"
    aria-label="Destaques de atendimento"
  >
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <ul class="landing-reveal-stagger--ltr grid list-none gap-8 p-0 sm:grid-cols-3 sm:gap-6">
        <li
          v-for="(m, i) in SITE_METRICS"
          :key="m.label"
          class="landing-reveal-item text-center"
          :style="{ '--rv-i': i }"
        >
          <p class="font-heading text-h1 font-bold tracking-tight text-white md:text-[2.5rem]">
            {{ m.value }}
          </p>
          <p
            class="mt-2 font-body text-caption font-semibold uppercase tracking-[0.14em] text-text/80 text-white"
          >
            {{ m.label }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
