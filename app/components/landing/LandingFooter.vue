<script setup lang="ts">
import { pushWhatsAppCtaClick } from '~/composables/useWhatsApp'
import { OLLIV_CONTACT_EMAIL, SITE_ORIGIN, SITE_ORIGIN_DISPLAY } from '~/constants/siteMarketing'

const wa = useWhatsAppHref()
</script>

<template>
  <footer class="bg-primary py-14 text-text" role="contentinfo">
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col gap-12 border-b border-primary-light/90 pb-12 md:flex-row md:justify-between"
      >
        <div>
          <p class="font-heading text-2xl font-bold tracking-tight text-white">OLLIV</p>
          <p class="mt-1 font-body text-caption font-medium uppercase tracking-[0.22em] text-gold">
            Perícia Médica
          </p>
          <p class="mt-6 max-w-sm font-body text-small leading-relaxed text-text/85">
            Assistência técnica médica estratégica para processos judiciais complexos. Foco em
            pareceres sólidos e comunicação clara com o foro.
          </p>
        </div>
        <div class="grid gap-10 sm:grid-cols-2 md:gap-16">
          <div>
            <h2 class="font-heading text-h4 font-semibold text-white">Contato</h2>
            <ul class="mt-4 space-y-3 font-body text-small">
              <li>
                <a
                  :href="wa"
                  class="text-gold-light transition-colors hover:text-gold"
                  @click="pushWhatsAppCtaClick('cta_footer_link')"
                  >WhatsApp — (61) 99197-8442</a
                >
              </li>
              <li>
                <a :href="`mailto:${OLLIV_CONTACT_EMAIL}`" class="hover:text-gold-light">{{
                  OLLIV_CONTACT_EMAIL
                }}</a>
              </li>
              <li>
                <a
                  :href="SITE_ORIGIN"
                  class="hover:text-gold-light"
                  target="_blank"
                  rel="noopener"
                >
                  {{ SITE_ORIGIN_DISPLAY }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="font-heading text-h4 font-semibold text-white">Local</h2>
            <p class="mt-4 font-body text-small leading-relaxed text-text/88">
              Brasília · Distrito Federal
            </p>
            <p class="mt-4 font-body text-caption text-text/65">
              Marca registrada conforme materiais institucionais OLLIV.
            </p>
          </div>
        </div>
      </div>
      <p class="pt-8 text-center font-body text-caption text-text/60">
        © {{ new Date().getFullYear() }} OLLIV Perícia Médica. Todos os direitos reservados.
      </p>
      <nav
        aria-label="Ligações institucionais"
        class="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-body text-caption text-text/50"
      >
        <NuxtLink class="transition-colors hover:text-gold-light" to="/politica-de-privacidade">
          Política de privacidade
        </NuxtLink>
        <span aria-hidden="true" class="text-text/35">·</span>
        <NuxtLink class="transition-colors hover:text-gold-light" to="/como-trabalhamos">
          Como trabalhamos
        </NuxtLink>
        <span aria-hidden="true" class="text-text/35">·</span>
        <a class="transition-colors hover:text-gold-light" href="/#faq">Dúvidas frequentes</a>
      </nav>
      <p class="mt-3 text-center font-body text-caption text-text/45">
        Desenvolvido por:
        <a
          href="https://www.linkedin.com/in/gabrielstroligo/"
          class="text-gold-light/90 underline-offset-2 transition-colors hover:text-gold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          >stroligo.dev</a
        >
      </p>
    </div>
  </footer>
</template>
