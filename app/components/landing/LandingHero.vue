<script setup lang="ts">
import { HERO_SLIDES, HERO_TITLE } from '~/constants/siteContent'
import { WHATSAPP_MESSAGES } from '~/constants/siteMarketing'

const whatsappHero = useWhatsAppHref(WHATSAPP_MESSAGES.analysisRequest)

const slideIndex = ref(0)
const activeSlide = computed(() => HERO_SLIDES[slideIndex.value] ?? HERO_SLIDES[0])

let slideTimer: ReturnType<typeof setInterval> | undefined

const publicPath = usePublicPath()

useHead(() => ({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: publicPath('/images/Messias_terno_nobg-512.webp'),
      type: 'image/webp',
      fetchpriority: 'high',
      media: '(max-width: 1023px)',
    },
    {
      rel: 'preload',
      as: 'image',
      href: publicPath('/images/Messias_terno_nobg.webp'),
      type: 'image/webp',
      fetchpriority: 'high',
      media: '(min-width: 1024px)',
    },
  ],
}))

const heroPortraitSrc = computed(() => publicPath('/images/Messias_terno_nobg-512.webp'))
const heroPortraitSrcset = computed(
  () =>
    `${publicPath('/images/Messias_terno_nobg-512.webp')} 512w, ${publicPath('/images/Messias_terno_nobg.webp')} 846w`,
)
const heroBgStyle = computed(() => ({
  '--hero-bg-url': `url(${publicPath('/images/bg-hero-sm.webp')})`,
}))
const heroPortraitAlt =
  'Dr. José Messias Oliveira Júnior, perito médico, retrato profissional em terno.'

const heroSectionRef = ref<HTMLElement | null>(null)
const spotlightEl = ref<HTMLElement | null>(null)

/** Mesmo elemento `<section>`: scroll interno + parallax pelo mouse na área toda do hero. */
let heroRootEl: HTMLElement | null = null

/** Deslocamento em px vindos do mouse sobre o hero (só desktop / pointer fino). */
let mouseOffsetX = 0
let mouseOffsetY = 0

/** Alvo imediato (scroll + mouse) vs. valor exibido (interpolação suave). */
let targetParallaxX = 0
let targetParallaxY = 0
let currentParallaxX = 0
let currentParallaxY = 0

/** Quão rápido o holofote persegue o alvo (por frame ~60 Hz). Mouse sai → volta suave ao base do scroll. */
const PARALLAX_LERP = 0.22
/** Para de animar quando a diferença for ínfima (evita loop infinito). */
const PARALLAX_EPS = 0.35

/** rAF único para suavização. */
let smoothingRaf = 0
/** Primeira atualização sem ease (evita “slide” desde 0 ao carregar). */
let parallaxDidInit = false

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function prefersReducedMotion() {
  return (
    typeof window.matchMedia !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Calcula o deslocamento desejado (scroll + contribuição do mouse).
 */
function computeTargetParallax(): { x: number; y: number } | null {
  if (!heroSectionRef.value) return null

  const pageY = window.scrollY ?? window.pageYOffset ?? 0
  const heroScroll = heroSectionRef.value.scrollTop ?? 0
  const heroRect = heroSectionRef.value.getBoundingClientRect()

  let strength = 1
  if (heroRect.bottom < 0) strength = Math.max(0, 1 + heroRect.bottom / (heroRect.height * 0.35))
  else if (heroRect.top > window.innerHeight)
    strength = Math.max(0, 1 - (heroRect.top - window.innerHeight) / window.innerHeight)

  const blended = pageY + heroScroll * 0.65
  const scrollYOff = clamp(blended * 0.16 * strength, -82, 82)
  const scrollXOff = clamp(blended * 0.07 * strength, -40, 40)

  const mx = clamp(mouseOffsetX * strength, -72, 72)
  const my = clamp(mouseOffsetY * strength, -56, 56)

  return {
    x: clamp(scrollXOff + mx, -110, 110),
    y: clamp(scrollYOff + my, -110, 110),
  }
}

function applyParallaxCss(x: number, y: number) {
  const spot = spotlightEl.value
  if (!spot) return
  spot.style.setProperty('--hero-spot-parallax-y', `${y}px`)
  spot.style.setProperty('--hero-spot-parallax-x', `${x}px`)
}

function smoothTick() {
  smoothingRaf = 0
  const spot = spotlightEl.value
  if (!spot || !heroSectionRef.value) return

  if (prefersReducedMotion()) {
    const t = computeTargetParallax()
    if (t) applyParallaxCss(t.x, t.y)
    return
  }

  const target = computeTargetParallax()
  if (!target) return

  targetParallaxX = target.x
  targetParallaxY = target.y

  currentParallaxX += (targetParallaxX - currentParallaxX) * PARALLAX_LERP
  currentParallaxY += (targetParallaxY - currentParallaxY) * PARALLAX_LERP

  applyParallaxCss(currentParallaxX, currentParallaxY)

  const err = Math.hypot(targetParallaxX - currentParallaxX, targetParallaxY - currentParallaxY)
  if (err > PARALLAX_EPS) {
    smoothingRaf = requestAnimationFrame(smoothTick)
  } else {
    currentParallaxX = targetParallaxX
    currentParallaxY = targetParallaxY
    applyParallaxCss(currentParallaxX, currentParallaxY)
  }
}

function scheduleParallax() {
  const start = () => {
    bumpParallax()
    window.addEventListener('scroll', bumpParallax, { passive: true })
    heroRootEl?.addEventListener('scroll', bumpParallax, { passive: true })
    heroRootEl?.addEventListener('pointermove', onHeroPointerMove, { passive: true })
    heroRootEl?.addEventListener('pointerleave', onHeroPointerLeave)
  }
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(start, { timeout: 1500 })
  } else {
    start()
  }
}

function bumpParallax() {
  const spot = spotlightEl.value
  if (!spot || !heroSectionRef.value) return

  if (prefersReducedMotion()) {
    if (smoothingRaf) {
      cancelAnimationFrame(smoothingRaf)
      smoothingRaf = 0
    }
    const t = computeTargetParallax()
    if (t) applyParallaxCss(t.x, t.y)
    return
  }

  const t = computeTargetParallax()
  if (!t) return

  targetParallaxX = t.x
  targetParallaxY = t.y

  if (!parallaxDidInit) {
    currentParallaxX = targetParallaxX
    currentParallaxY = targetParallaxY
    applyParallaxCss(currentParallaxX, currentParallaxY)
    parallaxDidInit = true
    return
  }

  if (!smoothingRaf) smoothingRaf = requestAnimationFrame(smoothTick)
}

function onHeroPointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  const hero = heroSectionRef.value
  if (!hero) return
  const r = hero.getBoundingClientRect()
  if (r.width < 1 || r.height < 1) return
  /** Posição normalizada em toda a seção do hero (-0.5 … 0.5 no centro). */
  const nx = (e.clientX - r.left) / r.width - 0.5
  const ny = (e.clientY - r.top) / r.height - 0.5
  mouseOffsetX = nx * 2 * 70
  mouseOffsetY = ny * 2 * 52
  bumpParallax()
}

function onHeroPointerLeave() {
  mouseOffsetX = 0
  mouseOffsetY = 0
  bumpParallax()
}

onMounted(() => {
  heroRootEl = heroSectionRef.value

  if (HERO_SLIDES.length >= 2 && !prefersReducedMotion()) {
    slideTimer = setInterval(() => {
      slideIndex.value = (slideIndex.value + 1) % HERO_SLIDES.length
    }, 9000)
  }

  scheduleParallax()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', bumpParallax)
  heroRootEl?.removeEventListener('scroll', bumpParallax)

  heroRootEl?.removeEventListener('pointermove', onHeroPointerMove)
  heroRootEl?.removeEventListener('pointerleave', onHeroPointerLeave)
  heroRootEl = null

  mouseOffsetX = 0
  mouseOffsetY = 0

  if (smoothingRaf) {
    cancelAnimationFrame(smoothingRaf)
    smoothingRaf = 0
  }

  if (slideTimer) clearInterval(slideTimer)
})
</script>

<template>
  <section
    id="inicio"
    ref="heroSectionRef"
    class="hero-section relative flex max-h-[calc(100svh-6rem)] min-h-0 flex-col overflow-y-auto overflow-x-hidden text-text lg:overflow-hidden"
    aria-labelledby="hero-heading"
  >
    <!-- Textura de fundo: só desktop (CSS), mobile usa gradientes — não compete com LCP -->
    <div
      class="hero-section__bg pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      :style="heroBgStyle"
    />

    <div
      class="relative z-10 mx-auto flex min-h-0 w-full max-w-content flex-1 flex-col px-4 sm:px-6 lg:px-8 overflow-hidden md:overflow-visible"
    >
      <div
        class="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-8 xl:gap-10"
      >
        <!-- Texto primeiro no mobile e à esquerda no desktop -->
        <div class="min-h-0 max-w-xl pt-10 md:pt-0 lg:self-center">
          <p
            class="hero-copy-reveal font-body text-caption font-semibold uppercase tracking-[0.18em] text-gold-light"
            style="--hc-i: 0"
          >
            Consultoria técnica premium
          </p>
          <h1
            id="hero-heading"
            class="hero-copy-reveal hero-title mt-2 font-heading font-bold tracking-tight text-white sm:mt-3"
            style="--hc-i: 1"
          >
            {{ HERO_TITLE }}
          </h1>
          <div class="hero-copy-reveal mt-4 min-h-[5.5rem] sm:min-h-[6rem]" style="--hc-i: 2">
            <Transition name="hero-slide" mode="out-in">
              <div
                :key="slideIndex"
                class="hero-slide-content"
                aria-live="polite"
                aria-atomic="true"
              >
                <p
                  class="font-heading text-h4 font-semibold leading-snug text-gold-light sm:text-h3"
                >
                  {{ activeSlide.lead }}
                </p>
                <p
                  class="mt-3 hidden font-body text-body leading-relaxed text-text/93 sm:block sm:text-body-lg"
                >
                  {{ activeSlide.body }}
                </p>
              </div>
            </Transition>
          </div>

          <div
            class="hero-copy-reveal mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-7 z-40 relative"
            style="--hc-i: 3"
          >
            <LandingWhatsappButton
              :href="whatsappHero"
              label="Solicitar análise técnica"
              variant="primary"
              dark-offset
              analytics-label="cta_hero_analise"
            />
          </div>

          <ul
            class="mt-5 hidden md:flex flex-wrap gap-x-5 gap-y-1.5 pb-1 font-body text-caption text-text/75 sm:mt-6 sm:text-small"
          >
            <li class="hero-copy-reveal" style="--hc-i: 4">27 estados atendidos</li>
            <li class="hero-copy-reveal" style="--hc-i: 5">Resposta em até 24h</li>
            <li class="hero-copy-reveal" style="--hc-i: 6">Perícia médica · Brasília-DF</li>
          </ul>
        </div>

        <!-- Imagem depois no mobile e à direita no desktop -->
        <div class="flex min-h-0 items-end justify-center lg:justify-end">
          <figure
            class="hero-portrait relative w-full max-w-[18rem] sm:max-w-xs lg:max-w-md xl:max-w-lg"
          >
            <div class="hero-portrait__stage relative flex w-full items-end justify-center">
              <div ref="spotlightEl" class="hero-portrait__spotlight" aria-hidden="true" />
              <div class="hero-portrait__frame hero-portrait__reveal-img relative z-10 w-full pt-8">
                <img
                  :src="heroPortraitSrc"
                  :srcset="heroPortraitSrcset"
                  :alt="heroPortraitAlt"
                  class="hero-portrait__img block w-full max-h-[min(42svh,calc(100svh-14rem))] object-contain object-bottom pt-2 md:pt-0"
                  width="512"
                  height="675"
                  sizes="(max-width: 1023px) min(90vw, 18rem), min(42vw, 36rem)"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
            </div>
            <figcaption class="hero-portrait__caption hero-portrait__reveal-caption">
              <div class="hero-portrait__caption-box">
                <span
                  class="block font-heading text-base font-semibold tracking-tight text-white sm:text-lg"
                >
                  Dr. José Messias Oliveira Júnior
                </span>
                <span class="mt-1 block font-body text-caption leading-snug text-text/92">
                  Cirurgião geral · Perícia Médica Judicial
                </span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/**
 * Hero: base azul + malha radial suave + granulado (noise) bem leve — acabamento moderno sem poluir legibilidade.
 */
.hero-section {
  isolation: isolate;
  background-color: var(--color-primary-dark);
  /**
   * Escritório (bg-hero) — foto já escura; overlay em ::before garante legibilidade do copy.
   */
  --hero-bg-blend: normal;
  --hero-bg-opacity: 1;
}

.hero-section__bg {
  background-size: cover;
  background-position: center center;
  opacity: var(--hero-bg-opacity);
  mix-blend-mode: var(--hero-bg-blend);
}

@media (min-width: 1024px) {
  .hero-section__bg {
    background-image: var(--hero-bg-url);
  }
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(
      105deg,
      color-mix(in srgb, var(--color-primary-dark) 92%, transparent) 0%,
      color-mix(in srgb, var(--color-primary-dark) 62%, transparent) 38%,
      color-mix(in srgb, var(--color-primary-dark) 28%, transparent) 58%,
      transparent 78%
    ),
    radial-gradient(
      ellipse 110% 90% at 10% -5%,
      color-mix(in srgb, var(--color-primary-light) 22%, transparent) 0%,
      transparent 58%
    ),
    radial-gradient(
      ellipse 85% 70% at 95% 95%,
      color-mix(in srgb, var(--color-primary) 28%, transparent) 0%,
      transparent 55%
    );
  opacity: 1;
}

.hero-section::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.055;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  mix-blend-mode: overlay;
}

@media (prefers-reduced-motion: reduce) {
  .hero-section::after {
    opacity: 0.035;
  }
}

.hero-title {
  font-size: clamp(1.625rem, 2.5vw + 0.85rem, 2.5rem);
  line-height: 1.14;
}

/** Coluna de texto: cada bloco entra com fade vindo de cima (escalonado por --hc-i). */
@keyframes hero-copy-in {
  from {
    opacity: 0;
    transform: translateY(-1.125rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-copy-reveal {
  animation: hero-copy-in 0.78s cubic-bezier(0.22, 0.82, 0.12, 1)
    calc(0.06s + var(--hc-i, 0) * 0.085s) both;
}

/** Rotação dos slides (lead + body) */
.hero-slide-enter-active,
.hero-slide-leave-active {
  transition:
    opacity 0.5s cubic-bezier(0.22, 0.82, 0.12, 1),
    transform 0.5s cubic-bezier(0.22, 0.82, 0.12, 1);
}

.hero-slide-enter-from {
  opacity: 0;
  transform: translateY(0.875rem);
}

.hero-slide-leave-to {
  opacity: 0;
  transform: translateY(-0.625rem);
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy-reveal {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .hero-slide-enter-active,
  .hero-slide-leave-active {
    transition-duration: 0.01ms;
  }

  .hero-slide-enter-from,
  .hero-slide-leave-to {
    opacity: 1;
    transform: none;
  }

  .hero-portrait__reveal-img,
  .hero-portrait__reveal-caption {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.hero-portrait__stage {
  min-height: min(40svh, calc(100svh - 14rem));
}

@media (min-width: 1024px) {
  .hero-portrait__stage {
    min-height: min(100%, calc(100svh - 9.5rem));
  }

  .hero-portrait__frame {
    padding-top: 32px;
  }

  .hero-portrait__img {
    max-height: min(78svh, calc(100svh - 8rem));
    object-position: center 12%;
  }
}

/**
 * Holofote esfumaçado — centro azul royal, bordas = fundo do hero (primary-dark).
 * Blur alto evita “bola” visível; núcleo extra no ::before dá sensação de luz.
 */
.hero-portrait__spotlight {
  --hero-spot-parallax-x: 0px;
  --hero-spot-parallax-y: 0px;
  opacity: 0.5;

  position: absolute;
  left: 50%;
  top: 60%;
  z-index: 0;
  width: min(200%, 52rem);
  aspect-ratio: 1;
  transform: translate(
    calc(-50% + var(--hero-spot-parallax-x)),
    calc(-50% + var(--hero-spot-parallax-y))
  );
  border-radius: 50%;
  pointer-events: none;
  filter: blur(72px);
  will-change: transform;
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

/** Entrada do retrato: fade + deslize de baixo para cima */
@keyframes hero-portrait-reveal {
  from {
    opacity: 0;
    transform: translateY(2.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-portrait__reveal-img {
  animation: hero-portrait-reveal 1.15s cubic-bezier(0.22, 0.82, 0.12, 1) 0.18s both;
}

.hero-portrait__reveal-caption {
  animation: hero-portrait-reveal 0.95s cubic-bezier(0.22, 0.82, 0.12, 1) 0.42s both;
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
    rgba(10, 14, 20, 0.55) 0%,
    rgba(10, 14, 20, 0.92) 35%,
    rgba(10, 14, 20, 0.97) 100%
  );
  border: 1px solid rgba(200, 161, 101, 0.4);
  border-top: 2px solid rgba(200, 161, 101, 0.65);
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
