<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

const { revealRoot, isVisible } = useRevealSection()

const faqHref = useWhatsAppHref(WHATSAPP_MESSAGES.afterFaq)

/** Aberto/fechado por texto da pergunta (acordeão controlado para animação homogênea nos browsers). */
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

const items = [
  {
    q: 'Quanto tempo leva o primeiro retorno?',
    a: 'Em muitos contactos o primeiro retorno ocorre em até 1 dia útil, conforme fila, complexidade e urgência relatada no WhatsApp. Casos muito extensos podem exigir leitura prévia antes de uma resposta completa.',
  },
  {
    q: 'O parecer ou memorial substitui o trabalho do advogado?',
    a: 'Não. A OLLIV presta assistência técnica médico-legal: subsídios para peças, quesitos e estratégia da prova. A condução processual e as decisões de defesa permanecem com a equipe jurídica.',
  },
  {
    q: 'Como é tratado o sigilo e dados de saúde?',
    a: 'Atuamos com discrição e respeito ao sigilo profissional. Por WhatsApp, envie apenas o necessário e consulte a nossa Política de privacidade. Conteúdo sensível pode ser tratado por canais alinhados à sua equipe.',
  },
  {
    q: 'Quais formatos de entrega existem?',
    a: 'Definimos em conjunto (memorial breve ou amplo, quesitos auxiliados, impugnação técnica, parecer convergente ou divergente, entre outros) conforme a fase processual e a estratégia do caso.',
  },
  {
    q: 'Atendem somente Brasília?',
    a: 'Base em Brasília-DF, com atendimento remoto nacional quando o caso e a documentação permitem trabalho à distância com qualidade.',
  },
] as const
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
          vá direto ao contacto no fim da secção.
        </p>
      </div>

      <div class="mx-auto mt-12 max-w-3xl rounded-premium border border-silver/50 bg-white px-5 py-3 shadow-[0_12px_40px_rgba(14,27,51,0.05)] sm:px-8 sm:py-4">
        <div
          v-for="(item, idx) in items"
          :key="item.q"
          class="faq-item border-b border-silver/60 py-4 last:border-b-0"
        >
          <button
            :id="faqButtonId(idx)"
            type="button"
            class="faq-trigger flex w-full cursor-pointer items-start justify-between gap-3 text-left font-heading text-h4 font-semibold tracking-tight text-primary outline-none focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2"
            :aria-expanded="isFaqOpen(item.q)"
            :aria-controls="faqPanelId(idx)"
            @click="toggleFaq(item.q)"
          >
            <span>{{ item.q }}</span>
            <ChevronDown
              class="faq-chevron mt-0.5 size-5 shrink-0 text-gold-dark motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
              :class="{ 'faq-chevron--open': isFaqOpen(item.q) }"
              aria-hidden="true"
              :stroke-width="2"
            />
          </button>
          <div
            :id="faqPanelId(idx)"
            class="faq-panel"
            role="region"
            :aria-labelledby="faqButtonId(idx)"
            :class="{ 'faq-panel--open': isFaqOpen(item.q) }"
          >
            <div class="faq-panel-inner">
              <p class="pt-3 font-body text-small leading-relaxed text-muted sm:text-body">
                {{ item.a }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="landing-reveal-block mx-auto mt-12 flex max-w-2xl flex-col items-center px-2 text-center"
      >
        <p class="font-body text-body text-muted">
          Continuar no WhatsApp com o contexto desta página.
        </p>
        <LandingWhatsappButton
          class="mt-6"
          :href="faqHref"
          label="Continuar no WhatsApp"
          variant="primary"
          analytics-label="cta_pos_faq"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/** Acordeão: grid 0fr → 1fr (classe .faq-panel--open garante igual em todos os itens vs. quirks de <details>). */
.faq-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-panel--open {
  grid-template-rows: 1fr;
}

.faq-panel-inner {
  min-height: 0;
  overflow: hidden;
}

.faq-chevron--open {
  transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .faq-panel {
    transition-duration: 0.01ms;
  }

  .faq-chevron--open {
    transition-duration: 0.01ms;
  }
}
</style>
