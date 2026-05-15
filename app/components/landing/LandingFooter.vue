<script setup lang="ts">
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
                <a :href="wa" class="text-gold-light transition-colors hover:text-gold"
                  >WhatsApp — (61) 99197-8442</a
                >
              </li>
              <li>
                <a href="mailto:contato@ollivpericias.com.br" class="hover:text-gold-light"
                  >contato@ollivpericias.com.br</a
                >
              </li>
              <li>
                <a
                  href="https://www.ollivpericias.com.br"
                  class="hover:text-gold-light"
                  target="_blank"
                  rel="noopener"
                >
                  www.ollivpericias.com.br
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
    </div>
  </footer>
</template>
