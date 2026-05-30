<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import { FAQ_ITEMS } from '~/constants/siteContent'
import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

const { revealRoot, isVisible } = useRevealSection()

const faqHref = useWhatsAppHref(WHATSAPP_MESSAGES.afterFaq)

const openQs = ref<Set<string>>(new Set())

function isFaqOpen(q: string) {
  return openQs.value.has(q)
}

function toggleFaq(q: string) {
  const next = new Set(openQs.value)
  if (next.has(q)) next.delete(q)
  else next.add(q)
  openQs.value = next
}

function faqButtonId(idx: number) {
  return `faq-btn-${idx}`
}

function faqPanelId(idx: number) {
  return `faq-panel-${idx}`
}

const items = FAQ_ITEMS
</script>

<template>
  <section
    id="faq"
    ref="revealRoot"
    class="border-t border-silver/60 bg-off-white py-20 md:py-24"
    :class="{ 'landing-section--visible': isVisible }"
    aria-labelledby="faq-heading"
  >
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div class="landing-reveal-header mx-auto max-w-3xl text-center">
        <p class="font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-dark">
          Perguntas frequentes
        </p>
        <h2 id="faq-heading" class="mt-3 font-heading text-h2 font-bold text-primary">
          Antes de enviar mensagem no WhatsApp
        </h2>
        <p class="mx-auto mt-5 max-w-2xl font-body text-body-lg text-muted">
          Esclarecimentos rápidos sobre prazos, formatos e limites do papel técnico. Se preferir,
          fale diretamente no WhatsApp pela secção de contacto acima.
        </p>
      </div>

      <div class="mx-auto mt-12 max-w-3xl rounded-premium border border-silver/50 bg-white px-5 py-3 shadow-[0_12px_40px_rgba(10,14,20,0.05)] sm:px-8 sm:py-4">
        <div
          v-for="(item, idx) in items"
          :key="item.q"
          class="border-b border-silver/40 last:border-0"
        >
          <button
            :id="faqButtonId(idx)"
            type="button"
            class="olliv-btn-press faq-trigger flex w-full cursor-pointer items-start justify-between gap-3 text-left font-heading text-h4 font-semibold tracking-tight text-primary outline-none focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2"
            :aria-expanded="isFaqOpen(item.q)"
            :aria-controls="faqPanelId(idx)"
            @click="toggleFaq(item.q)"
          >
            <span class="py-4">{{ item.q }}</span>
            <ChevronDown
              class="mt-4 size-5 shrink-0 text-gold-dark transition-transform duration-300"
              :class="{ 'rotate-180': isFaqOpen(item.q) }"
              aria-hidden="true"
            />
          </button>
          <div
            v-show="isFaqOpen(item.q)"
            :id="faqPanelId(idx)"
            role="region"
            :aria-labelledby="faqButtonId(idx)"
            class="pb-4 font-body text-body leading-relaxed text-muted"
          >
            {{ item.a }}
          </div>
        </div>
      </div>

      <div class="landing-reveal-block mx-auto mt-12 max-w-2xl text-center">
        <LandingWhatsappButton
          :href="faqHref"
          label="Falar com o Dr. Messias"
          variant="secondary"
          analytics-label="cta_pos_faq"
        />
      </div>
    </div>
  </section>
</template>
