<script setup lang="ts">
import { SITE_LOGO_HEIGHT, SITE_LOGO_PATH, SITE_LOGO_WIDTH } from '~/constants/siteMarketing'

const open = ref(false)

const whatsappHref = useWhatsAppHref()

const publicPath = usePublicPath()

const shellRef = ref<HTMLElement | null>(null)
const spacerHeight = ref(4.75 * 16) /* ~76px inicial até medição */
const scrolled = ref(false)
const headerHidden = ref(false)

let lastScrollY = 0
let rafId = 0

const links = [
  { href: '#inicio', label: 'Início' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#faq', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
]

function measureShell() {
  if (!shellRef.value) return
  spacerHeight.value = shellRef.value.offsetHeight
}

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    rafId = 0
    const y = Math.max(0, window.scrollY)

    scrolled.value = y > 32

    if (open.value) {
      headerHidden.value = false
      lastScrollY = y
      return
    }

    if (y < 72) headerHidden.value = false
    else {
      const delta = y - lastScrollY
      if (delta > 6) headerHidden.value = true
      else if (delta < -6) headerHidden.value = false
    }
    lastScrollY = y
  })
}

function closeMenu() {
  open.value = false
}

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  nextTick(() => {
    measureShell()
    if (shellRef.value) {
      resizeObserver = new ResizeObserver(measureShell)
      resizeObserver.observe(shellRef.value)
    }
    lastScrollY = window.scrollY
    scrolled.value = lastScrollY > 32
    onScroll()
  })
  window.addEventListener('scroll', onScroll, { passive: true })
})

function onMenuEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    e.preventDefault()
    open.value = false
  }
}

watch(open, (isOpen) => {
  headerHidden.value = false
  nextTick(measureShell)
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    document.addEventListener('keydown', onMenuEscape)
  } else {
    document.removeEventListener('keydown', onMenuEscape)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  resizeObserver?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
  if (import.meta.client) {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onMenuEscape)
  }
})

const compact = computed(() => scrolled.value && !open.value)
const barHidden = computed(() => headerHidden.value && !open.value)
</script>

<template>
  <div class="landing-header-root">
    <div
      ref="shellRef"
      class="fixed inset-x-0 top-0 z-50 overflow-hidden bg-white backdrop-blur-lg transition-[transform,box-shadow] duration-300 ease-out"
      :class="[
        barHidden ? '-translate-y-full shadow-none' : 'translate-y-0',
        scrolled ? 'shadow-[0_8px_30px_rgba(10,14,20,0.08)]' : 'shadow-none',
      ]"
    >
      <div
        class="mx-auto flex max-w-content items-center justify-between transition-[padding,gap] duration-300 ease-out"
        :class="
          compact
            ? 'gap-3 px-4 py-2 sm:px-5 lg:gap-5 lg:px-6 xl:gap-6'
            : 'gap-4 px-4 py-3.5 sm:px-6 lg:gap-8 lg:px-8 md:py-4'
        "
      >
        <a
          href="#inicio"
          class="flex shrink-0 items-center transition-opacity hover:opacity-90"
          @click="closeMenu"
        >
          <img
            :src="publicPath(SITE_LOGO_PATH)"
            alt="OLLIV Perícia Médica"
            class="w-auto object-contain transition-[height] duration-300 ease-out"
            :class="compact ? 'h-7 sm:h-8 md:h-[2.375rem]' : 'h-10 sm:h-11 md:h-[3.25rem]'"
            :width="SITE_LOGO_WIDTH"
            :height="SITE_LOGO_HEIGHT"
            decoding="async"
          />
        </a>

        <nav
          class="hidden items-center font-body font-medium text-primary lg:flex"
          :class="compact ? 'gap-6 text-caption xl:gap-7' : 'gap-8 text-small xl:gap-10'"
          aria-label="Navegação principal"
        >
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="rounded-md transition-colors hover:text-gold-dark"
            :class="compact ? 'py-0.5' : 'py-1'"
          >
            {{ l.label }}
          </a>
        </nav>

        <div class="flex items-center" :class="compact ? 'gap-1.5 sm:gap-2' : 'gap-2 sm:gap-3'">
          <LandingWhatsappButton
            class="hidden sm:inline-flex"
            :dense="compact"
            :href="whatsappHref"
            label="Falar com o Dr. Messias"
            variant="secondary"
            analytics-label="cta_header_nav"
          />

          <button
            type="button"
            class="inline-flex shrink-0 rounded-full text-primary transition-[transform,padding] duration-300 ease-out hover:scale-[0.94] active:scale-[0.88] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 lg:hidden"
            :class="compact ? 'p-1.5' : 'p-2'"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
            @click="open = !open"
          >
            <svg
              v-if="!open"
              class="transition-[width,height] duration-300"
              :class="compact ? 'size-6' : 'size-7'"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="transition-[width,height] duration-300"
              :class="compact ? 'size-6' : 'size-7'"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <div
          v-if="open"
          id="mobile-menu"
          class="border-t border-silver/40 bg-white/80 px-4 py-5 backdrop-blur-lg lg:hidden"
        >
          <nav
            class="flex flex-col gap-4 font-body text-body font-medium text-primary"
            aria-label="Seções do site (menu móvel)"
          >
            <a
              v-for="l in links"
              :key="l.href"
              :href="l.href"
              class="border-b border-silver/40 pb-3 transition-colors hover:text-gold-dark last:border-0"
              @click="closeMenu"
            >
              {{ l.label }}
            </a>
            <LandingWhatsappButton
              class="mt-2"
              :href="whatsappHref"
              label="Falar com o Dr. Messias"
              variant="outline-navy"
              analytics-label="cta_header_mobile"
            />
          </nav>
        </div>
      </Transition>
    </div>

    <!-- Reserva espaço no fluxo para o cabeçalho fixo (altura medida pelo shell) -->
    <div
      class="pointer-events-none w-full shrink-0"
      aria-hidden="true"
      :style="{ height: `${spacerHeight}px` }"
    />
  </div>
</template>
