# Análise do projeto — OLLIV Perícia Médica (landing)

Este documento descreve o **estado atual** do site institucional em Nuxt/Vue (`app/pages/`, `app/components/landing/`): estrutura da página, pontos de conversão para WhatsApp, SEO/URL público e o que já está contemplado versus o que ainda é **opcional ou dependente de decisão institucional** (conteúdo jurídico/clínico, prova social, medição em produção).

---

## 1. Panorama técnico

| Aspecto | Situação atual no código |
|---------|---------------------------|
| **Stack** | Nuxt 4, Vue 3, Tailwind CSS, Lucide (`@lucide/vue`), `@nuxt/fonts` |
| **Páginas** | Home **SPA montada por seções** em `index.vue`; páginas leves **`/politica-de-privacidade`** e **`/como-trabalhamos`** (textos esboço — revisão jurídica/clínica antes de comunicação final) |
| **Contato principal** | Links `wa.me` em `composables/useWhatsApp.ts`; mensagens em camadas definidas em `constants/siteMarketing.ts` (`WHATSAPP_MESSAGES`, assunto SEO em `SITE_SEO`) |
| **Domínio e SEO off-page** | URL canônica oficial: **`https://www.ollivpericias.com.br`**, exposta como **`SITE_ORIGIN`** e como padrão de `runtimeConfig.public.siteUrl` no `nuxt.config.ts`. Override opcional: **`NUXT_PUBLIC_SITE_URL`** (staging ou testes locais com URL absolutas) |
| **SEO na home** | `SITE_SEO` + `useSeoMeta`; canonical; Open Graph/Twitter quando há `siteUrl` (via `usePublicSiteUrl`); **`og:image` provisória** usa `apple-touch-icon` até haver arte OG 1200×630 própria; JSON-LD **`@graph`** (`WebSite` + `ProfessionalService`) quando há URL base |
| **SEO institucionais** | `useSeoMeta` em cada página + **`<link rel="canonical">`** por rota usando a mesma base pública |
| **Arquivos estáticos** | `public/robots.txt`, `public/sitemap.xml` com o domínio `www` |
| **Conversão e medição** | `pushWhatsAppCtaClick(label)` faz `window.dataLayer.push({ event: 'whatsapp_cta', cta_label })` orientado a **GTM / GA4** quando o container existir |
| **Qualidade técnica** | Code-splitting de seções com `defineAsyncComponent` na home; `routeRules` para cache longo em estáticos; DevTools Nuxt apenas fora do build de produção |

---

## 2. Fluxo das seções (`app/pages/index.vue`)

Ordem atual no `<main>`:

1. **LandingHeader** — âncoras: `#inicio`, `#servicos`, `#sobre`, `#diferenciais`, `#faq`, `#contato`; CTA WhatsApp no desktop/nav e no menu mobile com analytics.
2. **LandingHero (`#inicio`)** — proposta de valor principal e CTA WhatsApp.
3. **LandingTrustBar** — mensagens rápidas de diferenciação operacional (**sem botão próprio**).
4. **LandingAuthority** — segmentação de públicos e especialidades médico-legais (**sem CTA próprio**, deliberadamente institucional).
5. **LandingServices (`#servicos`)** — cards de serviço com **WhatsApp por tema** (+ eventos `servico:&lt;título>`) e **faixa CTA intermediária** após os cards (“orientação rápida”, mensagem `afterServices`).
6. **LandingDifferentials (`#diferenciais`)** — texto de posicionamento e **micro-CTA** (“triagem no WhatsApp”).
7. **LandingProcess** — jornada em passos coerente com o canal WhatsApp (**CTA** alinhado à triagem).
8. **LandingCredibility (`#sobre`)** — credibilidade e modo de trabalhar; **CTA** “Falar sobre o meu caso”.
9. **LandingFaq (`#faq`)** — FAQ em `<details>`; rodapé de seção com CTA (**`afterFaq`**, analytics `cta_pos_faq`).
10. **LandingCtaBanner (`#contato`)** — **dois** CTAs WhatsApp (conversa institucional vs envio/anexo de documentos/processos); **disclaimer** com menção a dados/relação médica/LGPD e link para **`/politica-de-privacidade`**.
11. **LandingFooter** — contactos, link do site institucional, WhatsApp (`cta_footer_link`), política, como trabalhamos, `/#faq`.
12. **LandingWhatsappFab** — botão fixo global (`cta_fab`).

### Leitura de jornada

- **Pontos fortes**: a narrativa vai de valor → confiança operacional → oferta granular → diferenciação → método → figura institucional → **objectões frequentes** (FAQ) → **fecho de conversão** duplo — boa cadência cognitiva para decisor jurídico.
- **Conversão no meio do funil**: o histórico de “várias páginas de rolagem só com FAB/menu” está **substancialmente mitigado** por CTAs em serviços, credibilidade, FAQ e blocos antes do `#contato`.
- **Possível próximo refinamento opcional**: micro-entrada apenas na **TrustBar** ou **Authority** se métricas (scroll depth, tempo na página e cliques intermediários mostrarem gargalo aí — hoje faz sentido preservar maior sobriedade nesses dois blocos).

---

## 3. Conversão WhatsApp — onde o utilizador sai e como medir

Mensagens vêm sobretudo de **`WHATSAPP_MESSAGES`** (inclui `default`, `documents`, mensagens situacionais e `serviceInquiry(título)`).

### Mapa de `cta_label` (eventos `whatsapp_cta`)

| Contexto | Rótulo aproximado no `dataLayer` |
|----------|-----------------------------------|
| Hero principal | `cta_hero` |
| Barra superior (desktop) | `cta_header_nav` |
| Drawer/menu mobile | `cta_header_mobile` |
| FAB flutuante | `cta_fab` |
| Cada botão/card de tema em serviços | pré‑fixo `servico:` + título dinâmico do card |
| Faixa após lista de serviços | `cta_apos_servicos` |
| Diferenciais (triagem) | `cta_diferenciais_triagem` |
| Processo (triagem) | `cta_processo_triagem` |
| Credibilidade (caso) | `cta_credibilidade_caso` |
| Após FAQ | `cta_pos_faq` |
| Banner final — canal principal | `cta_banner_principal` |
| Banner — documentos / processos | `cta_banner_documentos` |
| Footer (link texto) | `cta_footer_link` |

**Próximo passo de produto/digital**: garantir que **Google Tag Manager** (ou GA4 Measurement Protocol apenas no servidor — menos comum em SPAs assim) está no layout de produção, com trigger no evento **`whatsapp_cta`** e variável **`cta_label`**, para fechar relatórios de origem/anúncio.

### Extensões possíveis (não obrigatórias)

- **UTMs nos anúncios** apontarem para páginas de destaque com mesmo domínio; o texto inicial do WhatsApp já qualifica bastante intent — espelhar campanhas com uma convenção nos `cta_label` se passar por query string em formulários paralelos não aplicável aqui.

---

## 4. UX, marca e conformidade institucional

- **Um único H1 no hero**, secções com hierarquia H2/H3 coerentes na maior parte dos componentes lidos.
- **Transparência e limitações**: página “Como trabalhamos” e política são **esboços** — devem ser substituídos por texto aprovado internamente antes de uso como base legal forte.
- **Privacidade e saúde**: o banner de contacto reforça cuidados com dados; o canal WhatsApp não é ferramenta clínica “à prova de sigilo médico-profissional” por si — esse matiz vale manter revisado pela área técnico-jurídica ao publicar oficialmente.
- **Imagem OG real**: projeto ainda sugere criar arquivo **1200×630px** específico e referenciá‑lo nos metadados quando existir arte final.

---

## 5. Checklist objetivo — entregues vs pendências

### Conteúdo e conversão

- [x] **CTAs WhatsApp intermediários** (entre leituras longas — serviços, credibilidade, FAQ antes do último banner).
- [x] **Links WhatsApp por serviço** com mensagens qualificadas.
- [ ] **Credenciais regulatórias** (CRM/COREM, etc.), só se institucionalmente autorizado e atualizado.
- [x] **FAQ curto** com CTA ao fim da seção.

### Prova social e autoridade “fora do repo”

- [ ] Logotipos de parceiros / “trust strip” institucional.
- [ ] Depoimentos com consentimento RGPD/LGPD.
- [ ] Arte **Open Graph** 1200×630.

### Produto legal (conteúdo, não apenas layout)

- [x] Páginas base de **privacidade** e **modo de trabalhar / limites do parecer** (estruturas prontas; **substituir textos pelo jurídico interno**).
- [x] **Texto/aviso próximo aos CTAs** sobre dados/LGPD (disclaimer atual no banner).

### Medições e infra

- [x] **Eventos por clique WhatsApp** (`dataLayer`) com rótulos estáveis por contexto.
- [ ] **GTM/GA4** em produção lendo esse evento.
- [ ] **Lighthouse / Search Console / PageSpeed** pós-deploy com domínio final e redirects (HTTP→HTTPS, apex→www) validados na hospedagem.

### Manutenção e consistência técnica

- [x] **Copy institucional e SEO primários** centralizados (`SITE_SEO`, `SITE_ORIGIN`, e-mail de contacto, mensagens WhatsApp num único local).
- [x] **Banner de CTA** com linguagem única sobre privacidade e link para política.

---

## 6. Conclusão

A landing já combina **argumentação B2B clara**, **vários pontos de saída qualificados** para WhatsApp e **base institucional/SEO** alinhadas ao domínio **`www.ollivpericias.com.br`**. Os ganhos restantes migram sobretudo para **conteúdo revisado pela OLLIV e assessoria**, **ativação de medição em produção (GTM/GA4)** e **prova visual/social opcional**.

---

*Este texto reflete revisão pontual do código e da documentação da repo. Métricas reais dependem da implementação dos tags na hospedagem; textos jurídicos devem ser validados pelos responsáveis da OLLIV.*
