<script setup lang="ts">
import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

const { revealRoot, isVisible } = useRevealSection()

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
        <figure
          class="landing-reveal-item mx-auto max-w-md lg:col-span-5 lg:mx-0 xl:sticky xl:top-28"
          :style="{ '--rv-i': 0 }"
        >
          <div
            class="overflow-hidden rounded-premium border border-silver shadow-[0_20px_50px_rgba(14,27,51,0.1)] ring-2 ring-primary/5"
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
          <figcaption class="mt-4 font-body text-small leading-relaxed text-muted">
            <span class="font-medium text-primary">Medicina aplicada aos autos</span>
            — vínculo explícito entre prática assistencial racional e exigências da instrução
            pericial nos tribunais.
          </figcaption>
        </figure>

        <div class="lg:col-span-7">
          <p
            class="cred-copy-reveal font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-dark"
            style="--cred-i: 0"
          >
            Credibilidade
          </p>
          <h2
            id="cred-heading"
            class="cred-copy-reveal mt-3 font-heading text-h2 font-bold text-primary"
            style="--cred-i: 1"
          >
            Quando a prova médica é o centro do caso, método importa tanto quanto reputação.
          </h2>
          <p
            class="cred-copy-reveal mt-6 font-body text-body-lg leading-relaxed text-muted"
            style="--cred-i: 2"
          >
            Escritórios jurídicos parceiros usam parecer médico-legista quando precisam de um
            documento técnico que não venda promessas inexequíveis, mas também não deixe o juiz sem
            orientação suficiente. Nossa marca é o equilíbrio entre profundidade e didática.
          </p>
          <p
            class="cred-copy-reveal mt-5 font-body text-body leading-relaxed text-muted"
            style="--cred-i: 3"
          >
            A OLLIV posiciona a assistência médica dentro do plano estratégico da sua equipe
            jurídica: quesitos, produção de provas, audiências e recursos onde a doutrina médica faz
            diferença.
          </p>

          <div
            class="mt-10 grid gap-6 rounded-premium border border-gold/25 bg-white p-8 shadow-[0_18px_45px_rgba(14,27,51,0.06)] sm:grid-cols-3 sm:gap-4"
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
              <p class="mt-2 font-heading text-h4 font-bold text-primary">≤ 1 dia útil</p>
              <p class="mt-1 font-body text-caption leading-snug text-muted">
                Via WhatsApp, conforme urgência relatada no primeiro contato.
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
                Brasília-DF · atendimento remoto nacional
              </p>
            </div>
          </div>

          <div class="cred-copy-reveal mt-10" style="--cred-i: 7">
            <LandingWhatsappButton
              :href="sobreCasoHref"
              label="Falar sobre o meu caso"
              variant="primary"
              analytics-label="cta_credibilidade_caso"
            />
            <p class="mt-3 max-w-xl font-body text-caption leading-relaxed text-muted">
              Retorno orientado à viabilidade técnica; em muitos contactos o primeiro retorno ocorre
              em até 1 dia útil, conforme fila e complexidade.
            </p>
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

@media (prefers-reduced-motion: reduce) {
  .cred-copy-reveal {
    opacity: 1;
    transform: none;
    animation: none !important;
  }
}
</style>
