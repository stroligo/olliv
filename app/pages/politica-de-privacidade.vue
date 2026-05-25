<script setup lang="ts">
import { OLLIV_CONTACT_EMAIL } from '~/constants/siteMarketing'

useSeoMeta({
  title: 'Política de privacidade — OLLIV Perícia Médica',
  description:
    'Informações sobre tratamento de dados pessoais e boas práticas no contacto institucional com a OLLIV Perícia Médica.',
  robots: 'index, follow',
})

const siteUrl = usePublicSiteUrl()
useHead(() => ({
  link: siteUrl
    ? [{ rel: 'canonical', href: `${siteUrl}/politica-de-privacidade` }]
    : [],
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
          Política de privacidade
        </h1>
        <p class="font-body text-body leading-relaxed text-muted">
          Esta página descreve, em nível institucional, compromissos com privacidade e boas práticas
          no contacto pela web e pelo WhatsApp. O texto deve ser revisto pela área jurídica da OLLIV
          antes da publicação final.
        </p>
        <h2 class="pt-6 font-heading text-h3 font-bold text-primary">
          Base legal e titulares
        </h2>
        <p class="font-body text-body leading-relaxed text-muted">
          O tratamento de dados deve observar a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
          e diretrizes aplicáveis à relação médica e à documentação judicial. Titulares têm direito à
          transparência, acesso e correções legítimas, nos termos da legislação.
        </p>
        <h2 class="pt-8 font-heading text-h3 font-bold text-primary">
          WhatsApp e dados sensíveis de saúde
        </h2>
        <p class="font-body text-body leading-relaxed text-muted">
          Mensagens devem incluir apenas o indispensável ao primeiro contacto. Evite transmitir dados
          clínicos detalhados sem necessidade antes de canal seguro combinado ou orientação jurídica
          definida pela sua equipa. A OLLIV trata dados com discrição e em suporte técnico
          perícia médica conforme cada encargo.
        </p>
        <h2 class="pt-8 font-heading text-h3 font-bold text-primary">
          Contacto para questões de privacidade
        </h2>
        <p class="font-body text-body leading-relaxed text-muted">
          Para pedidos relacionados a dados pessoais, utilize
          <a class="text-gold-dark underline-offset-2 hover:underline" :href="`mailto:${OLLIV_CONTACT_EMAIL}`">
            {{ OLLIV_CONTACT_EMAIL }}
          </a>
          com assunto claro (ex.: “LGPD — pedido de titular”).
        </p>
        <p class="pt-10 font-body text-caption text-muted">
          Última atualização do esboço: {{ new Date().getFullYear() }}.
        </p>
      </article>
    </div>
  </div>
</template>
