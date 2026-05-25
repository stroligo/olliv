<script setup lang="ts">
import { OLLIV_CONTACT_EMAIL } from '~/constants/siteMarketing'

useSeoMeta({
  title: 'Como trabalhamos — OLLIV Perícia Médica',
  description:
    'Papel da assistência técnica e perícia médica, limites do parecer e alinhamento com a equipa jurídica na OLLIV.',
  robots: 'index, follow',
})

const siteUrl = usePublicSiteUrl()
useHead(() => ({
  link: siteUrl ? [{ rel: 'canonical', href: `${siteUrl}/como-trabalhamos` }] : [],
}))
</script>

<template>
  <div class="min-h-screen bg-off-white pb-16 pt-28">
    <div class="mx-auto max-w-content px-4 text-primary sm:px-6 lg:px-8">
      <NuxtLink
        to="/#contato"
        class="inline-flex font-body text-caption font-semibold uppercase tracking-wide text-gold-dark hover:text-gold"
      >
        ← Voltar ao site
      </NuxtLink>
      <article class="mt-10 max-w-3xl space-y-5">
        <h1 class="font-heading text-h2 font-bold tracking-tight text-primary">
          Como trabalhamos e limites do parecer
        </h1>
        <p class="font-body text-body leading-relaxed text-muted">
          Documento de transparência para escritórios e clientes jurídicos. Deve ser validado pelos
          responsáveis clínicos e jurídicos da OLLIV antes de divulgação definitiva.
        </p>
        <h2 class="pt-6 font-heading text-h3 font-bold text-primary">
          Papel da assistência técnica
        </h2>
        <p class="font-body text-body leading-relaxed text-muted">
          A OLLIV atua na leitura técnica da prova médica, na formulação de subsídios e na clareza
          para o foro. Não substitui o patrocínio advocatício nem a decisão judicial.
        </p>
        <h2 class="pt-8 font-heading text-h3 font-bold text-primary">
          Honestidade técnica e incerteza médica
        </h2>
        <p class="font-body text-body leading-relaxed text-muted">
          O parecer comunica graus de certeza compatíveis com a medicina baseada em evidências e com
          a documentação disponível. Não se comprometem resultados garantidos nem “vitórias”
          inexequíveis.
        </p>
        <h2 class="pt-8 font-heading text-h3 font-bold text-primary">
          Articulação com a estratégia jurídica
        </h2>
        <p class="font-body text-body leading-relaxed text-muted">
          Quesitos, memoriais e impugnações técnicas integram-se ao plano da equipa jurídica. Prazos
          e formato de entrega são acordados após triagem inicial e compreensão do objeto processual.
        </p>
        <p class="pt-10 font-body text-body leading-relaxed text-muted">
          Contacto geral por e-mail:<br />
          <a class="font-semibold text-gold-dark underline-offset-2 hover:underline" :href="`mailto:${OLLIV_CONTACT_EMAIL}`">{{ OLLIV_CONTACT_EMAIL }}</a>
        </p>
        <p class="pt-10">
          <NuxtLink
            to="/"
            class="font-heading font-semibold text-gold-dark underline-offset-2 hover:underline"
          >
            Voltar à página principal
          </NuxtLink>
        </p>
      </article>
    </div>
  </div>
</template>
