<script setup lang="ts">
const whatsappHero = useWhatsAppHref()

const heroPortrait = {
  src: '/images/Messias_terno_nobg.png',
  alt: 'Dr. José Messias Oliveira Júnior, médico-legista, retrato profissional em terno.',
}
</script>

<template>
  <section
    id="inicio"
    class="hero-section relative flex max-h-[calc(100svh-6rem)] min-h-0 flex-col overflow-y-auto overflow-x-hidden bg-primary-dark text-text lg:overflow-hidden"
    aria-labelledby="hero-heading"
  >
    <div
      class="relative mx-auto flex min-h-0 w-full max-w-content flex-1 flex-col px-4 sm:px-6 lg:px-8 overflow-hidden md:overflow-visible"
    >
      <div
        class="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-8 xl:gap-10"
      >
        <!-- Texto primeiro no mobile e à esquerda no desktop -->
        <div class="min-h-0 max-w-xl pt-10 md:pt-0 lg:self-center">
          <p
            class="font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-light"
          >
            Consultoria técnica premium
          </p>
          <h1
            id="hero-heading"
            class="hero-title mt-2 font-heading font-bold tracking-tight text-white sm:mt-3"
          >
            Assistência técnica médica estratégica para decisões judiciais mais seguras.
          </h1>
          <p class="mt-4 font-body text-body leading-relaxed text-text/93 sm:mt-5 sm:text-body-lg">
            Pareceres médico-legais rigorosos, leitura clínica aplicada ao processo e apoio à
            estratégia — com transparência, ética e foco na sustentação técnica do seu objeto
            litigioso.
          </p>

          <div
            class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-7 z-50 relative"
          >
            <LandingWhatsappButton
              :href="whatsappHero"
              label="Fale com um especialista"
              variant="primary"
              dark-offset
              class="!py-3.5 md:!px-6 md:!py-3.5"
            />
          </div>

          <ul
            class="mt-5 hidden md:flex flex-wrap gap-x-5 gap-y-1.5 pb-1 font-body text-caption text-text/75 sm:mt-6 sm:text-small"
          >
            <li>Pareceres e assistência técnica</li>
            <li>Estratégia processual alinhada</li>
            <li>Brasília-DF • atendimento direcionado</li>
          </ul>
        </div>

        <!-- Imagem depois no mobile e à direita no desktop -->
        <div class="flex min-h-0 items-end justify-center lg:justify-end">
          <figure
            class="hero-portrait relative w-full max-w-[18rem] sm:max-w-xs lg:max-w-md xl:max-w-lg"
          >
            <div class="hero-portrait__stage relative flex w-full items-end justify-center">
              <div class="hero-portrait__spotlight" aria-hidden="true" />
              <div class="hero-portrait__frame relative z-10 w-full pt-8">
                <img
                  :src="heroPortrait.src"
                  :alt="heroPortrait.alt"
                  class="hero-portrait__img block w-full max-h-[min(42svh,calc(100svh-14rem))] object-contain object-bottom lg:max-h-[min(100%,calc(100svh-9.5rem))] pt-8 md:pt-0"
                  width="880"
                  height="1100"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
                <figcaption class="hero-portrait__caption">
                  <div class="hero-portrait__caption-box">
                    <span
                      class="block font-heading text-base font-semibold tracking-tight text-white sm:text-lg"
                    >
                      Dr. José Messias Oliveira Júnior
                    </span>
                    <span class="mt-1 block font-body text-caption leading-snug text-text/92">
                      Médico-legista · assistência técnica médico-legal estratégica
                    </span>
                  </div>
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  font-size: clamp(1.625rem, 2.5vw + 0.85rem, 2.5rem);
  line-height: 1.14;
}

.hero-portrait__stage {
  min-height: min(40svh, calc(100svh - 14rem));
}

@media (min-width: 1024px) {
  .hero-portrait__stage {
    min-height: min(100%, calc(100svh - 9.5rem));
  }
}

/**
 * Holofote esfumaçado — centro azul royal, bordas = fundo do hero (primary-dark).
 * Blur alto evita “bola” visível; núcleo extra no ::before dá sensação de luz.
 */
.hero-portrait__spotlight {
  position: absolute;
  left: 50%;
  top: 60%;
  z-index: 0;
  width: min(200%, 52rem);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  filter: blur(72px);
  will-change: filter;
  background: radial-gradient(
    ellipse 88% 82% at 50% 58%,
    var(--hero-spot-core) 0%,
    var(--hero-spot-bright) 6%,
    color-mix(in srgb, var(--hero-spot-mid) 92%, var(--color-primary-dark)) 18%,
    color-mix(in srgb, var(--hero-spot-deep) 70%, var(--color-primary-dark)) 32%,
    color-mix(in srgb, var(--hero-spot-edge) 45%, var(--color-primary-dark)) 48%,
    color-mix(in srgb, var(--hero-spot-edge) 18%, var(--color-primary-dark)) 62%,
    var(--color-primary-dark) 78%,
    var(--color-primary-dark) 100%
  );
}

.hero-portrait__spotlight::before {
  content: '';
  position: absolute;
  inset: 18%;
  border-radius: 50%;
  filter: blur(28px);
  background: radial-gradient(
    circle at 50% 48%,
    color-mix(in srgb, var(--hero-spot-core) 88%, white) 0%,
    var(--hero-spot-bright) 22%,
    color-mix(in srgb, var(--hero-spot-mid) 35%, var(--color-primary-dark)) 50%,
    var(--color-primary-dark) 100%
  );
  opacity: 0.55;
}

.hero-portrait__img {
  filter: drop-shadow(0 20px 36px rgba(2, 6, 23, 0.55));
}

/* Legenda sobreposta na base da foto */
.hero-portrait__frame {
  display: block;
}

.hero-portrait__caption {
  position: absolute;
  inset-inline: 0;
  bottom: 20px;
  z-index: 20;
  padding: 0;
  pointer-events: none;
}

.hero-portrait__caption-box {
  padding: 0.875rem 1rem;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(9, 16, 31, 0.55) 0%,
    rgba(9, 16, 31, 0.92) 35%,
    rgba(9, 16, 31, 0.97) 100%
  );
  border: 1px solid rgba(201, 164, 74, 0.4);
  border-top: 2px solid rgba(201, 164, 74, 0.65);
  border-radius: 0 0 var(--radius-premium) var(--radius-premium);
  box-shadow:
    0 -8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(234, 236, 239, 0.06);
  backdrop-filter: blur(10px);
}

@media (min-width: 1024px) {
  .hero-portrait__caption-box {
    text-align: left;
  }
}
</style>
