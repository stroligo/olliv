<script setup lang="ts">
import { Scale, UserRound } from '@lucide/vue'
import { AUDIENCE_PANELS, type AudienceKind } from '~/constants/siteContent'
import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

const { revealRoot, isVisible } = useRevealSection()

const active = ref<AudienceKind>('lawyer')

const panel = computed(() => AUDIENCE_PANELS[active.value])

const lawyerHref = useWhatsAppHref(WHATSAPP_MESSAGES.audienceLawyer)
const patientHref = useWhatsAppHref(WHATSAPP_MESSAGES.audiencePatient)
const ctaHref = computed(() => (active.value === 'lawyer' ? lawyerHref : patientHref))
</script>

<template>
  <section
    id="atendimento"
    ref="revealRoot"
    class="bg-off-white py-12 md:py-16"
    :class="{ 'landing-section--visible': isVisible }"
    aria-labelledby="audience-heading"
  >
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div class="landing-reveal-header mx-auto max-w-3xl text-center">
        <p class="font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-dark">
          Atendimento especializado
        </p>
        <h2 id="audience-heading" class="mt-3 font-heading text-h2 font-bold text-primary">
          Feito para quem precisa de suporte técnico estratégico
        </h2>
        <p class="mx-auto mt-4 font-body text-body text-muted">
          Seja você advogado(a) ou paciente, direcionamos o canal certo com o Dr. Messias.
        </p>
      </div>

      <div
        class="landing-reveal-item mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center"
        :style="{ '--rv-i': 1 }"
      >
        <button
          type="button"
          class="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 font-body text-small font-semibold transition-colors sm:text-body"
          :class="
            active === 'lawyer'
              ? 'olliv-btn-gold'
              : 'border border-silver bg-white text-primary hover:border-gold-dark/40'
          "
          @click="active = 'lawyer'"
        >
          <Scale class="size-4 shrink-0" aria-hidden="true" />
          Sou advogado(a)
        </button>
        <button
          type="button"
          class="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 font-body text-small font-semibold transition-colors sm:text-body"
          :class="
            active === 'patient'
              ? 'olliv-btn-gold'
              : 'border border-silver bg-white text-primary hover:border-gold-dark/40'
          "
          @click="active = 'patient'"
        >
          <UserRound class="size-4 shrink-0" aria-hidden="true" />
          Sou paciente
        </button>
      </div>

      <div
        class="landing-reveal-item mx-auto mt-8 max-w-3xl rounded-premium border border-silver/70 bg-white p-6 shadow-[0_14px_40px_rgba(10,14,20,0.06)] sm:p-8"
        :style="{ '--rv-i': 2 }"
      >
        <h3 class="font-heading text-h3 font-bold text-primary">{{ panel.title }}</h3>
        <p class="mt-4 font-body text-body leading-relaxed text-muted">{{ panel.intro }}</p>
        <ul class="mt-6 list-none space-y-3 p-0">
          <li
            v-for="(item, idx) in panel.bullets"
            :key="idx"
            class="flex gap-3 font-body text-small leading-relaxed text-muted"
          >
            <span
              class="mt-2 size-1.5 shrink-0 rounded-full bg-gold-dark"
              aria-hidden="true"
            />
            <span>{{ item }}</span>
          </li>
        </ul>
        <LandingWhatsappButton
          class="mt-8"
          :href="ctaHref"
          :label="panel.ctaLabel"
          variant="primary"
          :analytics-label="`cta_audience_${active}`"
        />
      </div>
    </div>
  </section>
</template>
