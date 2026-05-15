<script setup lang="ts">
const open = ref(false)

const whatsappHref = useWhatsAppHref()

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

watch(open, () => {
  headerHidden.value = false
  nextTick(measureShell)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  resizeObserver?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})

const compact = computed(() => scrolled.value && !open.value)
const barHidden = computed(() => headerHidden.value && !open.value)
</script>

<template>
  <div class="landing-header-root">
    <div
      ref="shellRef"
      class="fixed inset-x-0 top-0 z-50 overflow-hidden bg-white/80 backdrop-blur-lg transition-[transform,box-shadow] duration-300 ease-out"
      :class="[
        barHidden ? '-translate-y-full shadow-none' : 'translate-y-0',
        scrolled ? 'shadow-[0_8px_30px_rgba(14,27,51,0.08)]' : 'shadow-none',
      ]"
    >
      <div
        class="mx-auto flex max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8 transition-[padding] duration-300 ease-out"
        :class="compact ? 'py-2 md:py-2.5' : 'py-3.5 md:py-4'"
      >
        <a
          href="#inicio"
          class="flex shrink-0 items-center transition-opacity hover:opacity-90"
          @click="closeMenu"
        >
          <img
            src="/images/logo_nobg.png"
            alt="OLLIV Perícia Médica"
            class="w-auto object-contain transition-[height] duration-300 ease-out"
            :class="compact ? 'h-8 sm:h-9 md:h-[2.625rem]' : 'h-10 sm:h-11 md:h-[3.25rem]'"
            width="200"
            height="52"
            decoding="async"
          />
        </a>

        <nav
          class="hidden items-center gap-8 font-body text-small font-medium text-primary lg:flex xl:gap-10"
          aria-label="Principal"
        >
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="rounded-md py-1 transition-colors hover:text-gold-dark"
          >
            {{ l.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <LandingWhatsappButton
            class="hidden sm:inline-flex"
            :href="whatsappHref"
            label="Fale conosco"
            variant="primary"
          />

          <button
            type="button"
            class="inline-flex rounded-full p-2 text-primary lg:hidden"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
            @click="open = !open"
          >
            <svg
              v-if="!open"
              class="size-7"
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
              class="size-7"
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
            aria-label="Mobile"
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
              label="Fale no WhatsApp"
              variant="secondary"
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
