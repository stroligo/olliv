/**
 * Revela a seção ao entrar na viewport (similar ao WOW / AOS, sem dependência extra).
 * Respeita prefers-reduced-motion.
 */
export function useRevealSection() {
  const revealRoot = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = revealRoot.value
    if (!el) return

    if (
      typeof window.matchMedia !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
          observer = null
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -6% 0px',
      }
    )
    observer.observe(el)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { revealRoot, isVisible }
}
