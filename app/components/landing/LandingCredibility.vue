<script setup lang="ts">
import { Award, Globe, GraduationCap, Scale } from '@lucide/vue'
import type { Component } from 'vue'
import { PARTNER_SPECIALTIES } from '~/constants/siteContent'
import { PERITO_CURRICULO } from '~/constants/peritoCurriculo'
import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

const badgeIcons: Record<string, Component> = {
  escs: GraduationCap,
  cpem: Award,
  nacional: Globe,
  judicial: Scale,
}

const { revealRoot, isVisible } = useRevealSection()
/** Bloco do currículo no fim da secção — observer próprio (secção alta + sticky). */
const { revealRoot: cvRevealRoot, isVisible: cvVisible } = useRevealSection()
const curriculo = PERITO_CURRICULO

const sobreCasoHref = useWhatsAppHref(WHATSAPP_MESSAGES.aboutCase)

const publicPath = usePublicPath()
</script>

<template>
  <section
    id="sobre"
    ref="revealRoot"
    class="bg-off-white py-20 md:py-24"
    :class="{ 'landing-section--visible': isVisible }"
    aria-labelledby="cred-heading"
  >
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-16">
        <div
          class="h-full flex items-center justify-center landing-reveal-item mx-auto max-w-md lg:col-span-5 lg:mx-0"
        >
          <figure class="" :style="{ '--rv-i': 0 }">
            <div
              class="overflow-hidden rounded-premium border border-card-border shadow-[0_20px_50px_rgba(10,14,20,0.1)]"
            >
              <img
                :src="publicPath('/images/Messias_jaleco.jpeg')"
                alt="Dr. José Messias Oliveira Júnior em ambiente hospitalar — jaleco, contexto técnico e clínico."
                class="aspect-[4/5] h-auto w-full object-cover object-top"
                width="720"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption class="mt-4 text-center lg:text-left">
              <p class="font-heading text-h4 font-bold leading-snug text-primary">
                {{ curriculo.nome }}
              </p>
              <p
                class="mt-1 font-body text-caption font-semibold uppercase tracking-[0.14em] text-gold-dark"
              >
                {{ curriculo.cargo }}
              </p>
            </figcaption>
          </figure>
        </div>

        <div class="lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
          <p
            class="cred-copy-reveal font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-dark"
            style="--cred-i: 0"
          >
            Credibilidade
          </p>
          <h2
            id="cred-heading"
            class="cred-copy-reveal mt-3 max-w-xl font-heading text-h2 font-bold leading-tight text-primary md:max-w-2xl"
            style="--cred-i: 1"
          >
            Quando a prova médica decide, método e reputação contam.
          </h2>
          <ul
            class="cred-copy-reveal mt-6 list-none space-y-4 p-0 font-body text-body leading-relaxed text-muted"
            style="--cred-i: 2"
          >
            <li class="flex gap-3">
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />
              <span>
                <strong class="font-semibold text-primary">Parecer técnico equilibrado</strong> —
                profundidade científica sem promessas inexequíveis e com orientação clara para o
                juiz.
              </span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />
              <span>
                <strong class="font-semibold text-primary">Didática institucional</strong> —
                linguagem acessível a magistrados e equipes jurídicas, sem perder rigor.
              </span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />
              <span>
                <strong class="font-semibold text-primary">Assistência no plano processual</strong>
                — quesitos, produção de provas, audiências e recursos onde a medicina faz diferença.
              </span>
            </li>
          </ul>

          <div
            class="mt-10 grid gap-6 rounded-premium border border-gold/25 bg-white p-8 shadow-[0_18px_45px_rgba(10,14,20,0.06)] sm:grid-cols-3 sm:gap-4"
          >
            <div
              class="cred-copy-reveal border-b border-silver/80 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4"
              style="--cred-i: 4"
            >
              <p
                class="font-body text-caption font-semibold uppercase tracking-[0.12em] text-gold-dark"
              >
                Retorno inicial
              </p>
              <p class="mt-2 font-heading text-h4 font-bold text-primary">Até 24h</p>
              <p class="mt-1 font-body text-caption leading-snug text-muted">
                Resposta rápida via WhatsApp, inclusive quando a urgência exige.
              </p>
            </div>
            <div
              class="cred-copy-reveal border-b border-silver/80 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:px-2 sm:pr-4"
              style="--cred-i: 5"
            >
              <p
                class="font-body text-caption font-semibold uppercase tracking-[0.12em] text-gold-dark"
              >
                Formatos técnicos
              </p>
              <p class="mt-2 font-heading text-h4 font-semibold leading-snug text-primary">
                Memoriais sob medida · Quesitos auxiliados
              </p>
            </div>
            <div class="cred-copy-reveal sm:pl-2" style="--cred-i: 6">
              <p
                class="font-body text-caption font-semibold uppercase tracking-[0.12em] text-gold-dark"
              >
                Alcance
              </p>
              <p class="mt-2 font-heading text-h4 font-semibold leading-snug text-primary">
                27 estados · base Brasília-DF
              </p>
            </div>
          </div>

          <div class="cred-copy-reveal mt-10" style="--cred-i: 7">
            <LandingWhatsappButton
              :href="sobreCasoHref"
              label="Falar com o Dr. Messias"
              variant="secondary"
              analytics-label="cta_credibilidade_caso"
            />
            <p class="mt-3 max-w-xl font-body text-caption leading-relaxed text-muted">
              Retorno orientado à viabilidade técnica; na maioria dos contactos respondemos em até
              24 horas, conforme fila e complexidade.
            </p>
          </div>
        </div>
      </div>

      <div
        ref="cvRevealRoot"
        class="cred-cv-block mx-auto mt-12 max-w-content lg:mt-14"
        :class="{ 'cred-cv-block--visible': cvVisible }"
      >
        <p
          class="cred-cv-reveal font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-dark"
          style="--cred-cv-i: 0"
        >
          {{ curriculo.secaoEyebrow }}
        </p>
        <h2
          class="cred-cv-reveal mt-3 font-heading text-h2 font-bold text-primary md:text-[1.75rem] md:leading-tight"
          style="--cred-cv-i: 1"
        >
          {{ curriculo.secaoTitulo }}
        </h2>

        <div
          class="cred-cv-reveal cred-mini-cv mt-6 rounded-premium border border-silver/80 bg-white p-5 shadow-[0_12px_32px_rgba(10,14,20,0.06)] sm:mt-8 sm:p-6 lg:p-8"
          style="--cred-cv-i: 2"
        >
          <p class="font-body text-small leading-relaxed text-muted lg:max-w-4xl">
            {{ curriculo.perfil }}
          </p>

          <ul class="mt-5 flex list-none flex-wrap gap-2 p-0">
            <li
              v-for="badge in curriculo.badges"
              :key="badge.id"
              class="inline-flex items-center gap-2 rounded-full border border-silver/80 bg-off-white px-3 py-1.5 font-body text-caption font-medium text-primary"
            >
              <component
                :is="badgeIcons[badge.id]"
                class="size-3.5 shrink-0 text-gold-dark"
                aria-hidden="true"
              />
              {{ badge.label }}
            </li>
          </ul>

          <div
            class="mt-6 grid gap-6 border-t border-silver/70 pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:pt-8"
          >
            <div v-for="secao in curriculo.secoes" :key="secao.id">
              <h3
                class="font-body text-caption font-semibold uppercase tracking-[0.12em] text-gold-dark"
              >
                {{ secao.titulo }}
              </h3>
              <ul class="mt-2.5 list-none space-y-2 p-0">
                <li
                  v-for="(item, idx) in secao.itens"
                  :key="idx"
                  class="flex gap-2.5 font-body text-small leading-relaxed text-muted"
                >
                  <span
                    class="mt-2 size-1 shrink-0 rounded-full bg-gold-dark/80"
                    aria-hidden="true"
                  />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 border-t border-silver/70 pt-8">
            <h3 class="font-heading text-h4 font-semibold text-primary">
              {{ curriculo.parceirosTitulo }}
            </h3>
            <p class="mt-2 font-body text-small leading-relaxed text-muted">
              {{ curriculo.parceirosIntro }}
            </p>
            <ul class="mt-4 flex list-none flex-wrap gap-2 p-0">
              <li
                v-for="esp in PARTNER_SPECIALTIES"
                :key="esp"
                class="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 font-body text-caption text-primary/80"
              >
                {{ esp }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/** Mesma linguagem do hero: fade + deslize de cima; só corre com a secção visível (scroll). */
@keyframes cred-copy-in {
  from {
    opacity: 0;
    transform: translateY(-1.125rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cred-copy-reveal {
  opacity: 0;
  transform: translateY(-1.125rem);
}

section.landing-section--visible .cred-copy-reveal {
  animation: cred-copy-in 0.78s cubic-bezier(0.22, 0.82, 0.12, 1)
    calc(0.06s + var(--cred-i, 0) * 0.085s) both;
}

/** Currículo: revela quando o bloco entra na viewport (não depende do topo da secção). */
.cred-cv-reveal {
  opacity: 0;
  transform: translateY(1.125rem);
}

.cred-cv-block--visible .cred-cv-reveal {
  animation: cred-copy-in 0.78s cubic-bezier(0.22, 0.82, 0.12, 1)
    calc(0.06s + var(--cred-cv-i, 0) * 0.1s) both;
}

@media (prefers-reduced-motion: reduce) {
  .cred-copy-reveal,
  .cred-cv-reveal {
    opacity: 1;
    transform: none;
    animation: none !important;
  }
}
</style>
