# OLLIV Perícia Médica — Site institucional (Nuxt)

Site **institucional / landing page** da **OLLIV Perícia Médica** (assistência técnica médico-legal em Brasília-DF): foco em **conversão para WhatsApp**, copy e SEO reunidos num único codebase, tokens de marca alinhados a **`OLLIV_Design_System_Tailwind.md`**.

---

## Produção

- **Domínio oficial:** [https://www.ollivpericias.com.br](https://www.ollivpericias.com.br)
- **E-mail oficial:** `contato@ollivpericias.com.br` (constante `OLLIV_CONTACT_EMAIL` em `app/constants/siteMarketing.ts`)
- Textos institucionais em **`/politica-de-privacidade`** e **`/como-trabalhamos`** são **esboços** — devem ser validados pela equipe jurídica/clínica da OLLIV antes da versão "oficial".

- **Subpasta do domínio** (deploy em `/cliente/`, `/blog/`, etc.): antes do `npm run generate`/`build`, defina **`NUXT_APP_BASE_URL`** (`/cliente/` com barras) e **`NUXT_PUBLIC_SITE_URL`** com **o mesmo segmento no URL** (`https://exemplo.com/cliente`). Ver `.env.example`.

#### Testar em subpasta (ex.: `http://localhost/olliv/dist/`)

1. Gere com essa mesma base (o HTML passa a apontar para `/olliv/dist/_nuxt/…`, etc.):

   ```bash
   npm run generate:localhost-olliv-dist
   ```

2. O Apache (ou Sites) deve **servir fisicamente** o conteúdo de **`.output/public`** no URL `/olliv/dist/`. Ou seja, no disco isso deve resultar algo como **`…/htdocs/olliv/dist/index.html`** (pasta **`_nuxt`**, **`images`**, páginas, etc., **dentro de `dist/`**, copiadas a partir do que está em `.output/public`).

3. Se apenas copiaste **`index.html`** para `dist/` **sem** a pasta **`_nuxt`** e o restante, vai dar **404** — faz deploy do **conjunto inteiro** gerado.

4. Produção oficial na raiz do domínio continua `npm run generate` sem `NUXT_APP_BASE_URL`. Para só validar o build antes do deploy, **`npm run preview:output`** (HTTP estático sem subpasta).

---

## Stack

| Área              | Escolha |
|-------------------|---------|
| Framework         | **Nuxt 4** (preset Nitro por defeito **node-server**) |
| UI                | **Vue 3** (Composition API, `<script setup>`) |
| Estilização       | **Tailwind CSS** (`@nuxtjs/tailwindcss`) |
| Ícones            | **Lucide** (`@lucide/vue`) |
| Fontes            | **@nuxt/fonts** (Inter / Montserrat, Google Fonts, servidas em build sem stylesheet bloqueante) |
| Qualidade de código | **ESLint** (`@nuxt/eslint`) + **Prettier** |

---

## Requisitos

- **Node.js 18+** (recomendado: versão **LTS** atual)

## Instalação

```bash
npm install
```

O `postinstall` executa `nuxt prepare` (tipos ESLint gerados sob `.nuxt`).

## Scripts

| Comando                | Descrição |
|------------------------|-----------|
| `npm run dev`          | Servidor de desenvolvimento |
| `npm run build`        | Build de produção (`node .output/server/index.mjs`) |
| `npm run preview`      | Preview local do último build |
| `npm run generate`     | Geração estática (SSG), se aplicável à hospedagem |
| `npm run generate:localhost-olliv-dist` | SSG para testar sob **`/olliv/dist/`** (localhost + caminho igual ao exemplo) |
| `npm run preview:output` | Serve **`.output/public`** por HTTP (smoke‑test rápido) |
| `npm run lint`         | ESLint (`eslint.config.mjs`) |
| `npm run lint:fix`     | ESLint com `--fix` |
| `npm run format`       | Prettier (`--write`) |
| `npm run format:check` | Verifica formatação Prettier |

### Desenvolvimento local

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

---

## Visão funcional da landing (`/`)

Fluxo montado em `app/pages/index.vue` (seções abaixo da dobra carregadas com **`defineAsyncComponent`** para reduzir JS inicial):

1. **LandingHeader** — navegação por âncoras (`#inicio`, `#servicos`, `#sobre`, `#diferenciais`, `#faq`, `#contato`) + CTA WhatsApp.
2. **LandingHero**
3. **LandingTrustBar**
4. **LandingAuthority**
5. **LandingServices** — cards com WhatsApp contextual por tema + faixa intermediária pós‑serviços.
6. **LandingDifferentials**
7. **LandingProcess**
8. **LandingCredibility**
9. **LandingFaq** — acordeão acessível (botões + estado Vue, animação de altura).
10. **LandingCtaBanner** — dois CTAs (conversa institucional / documentos‑processos) + aviso dados/LGPD com link para política.
11. **LandingFooter** — contactos e ligações institucionais.
12. **LandingWhatsappFab** — botão fixo WhatsApp global.

Componentes partilhados em `app/components/landing/` incluem **`WhatsappButton.vue`**.

---

## Conversão e medição

- URLs WhatsApp geradas por **`useWhatsApp.ts`** (`wa.me`), mensagens partilhadas em **`constants/siteMarketing.ts`** (`WHATSAPP_MESSAGES`).
- **`pushWhatsAppCtaClick(cta_label)`** envia **`window.dataLayer.push({ event: 'whatsapp_cta', cta_label })`** para uso com **GTM / GA4** em produção.
- Rótulos por contexto (hero, FAQ, FAB, por serviço, etc.) estão distribuídos nos componentes correspondentes (`analytics-label` / chamadas ao `pushWhatsAppCtaClick`).

---

## Constantes e composables úteis

| Ficheiro | Função |
|----------|--------|
| `app/constants/siteMarketing.ts` | `SITE_SEO`, `SITE_ORIGIN`, **`contato@ollivpericias.com.br`** (`OLLIV_CONTACT_EMAIL`), mensagens pré‑WhatsApp (`WHATSAPP_MESSAGES`) |
| `app/composables/useWhatsApp.ts` | número E.164, `useWhatsAppHref`, `useWhatsAppHrefForService`, `pushWhatsAppCtaClick` |
| `app/composables/usePublicSiteUrl.ts` | URL base pública normalizada (canonical / JSON‑LD) |
| `app/composables/useRevealSection.ts` | revelação ao scroll em secções (respeita `prefers-reduced-motion`) |

---

## Rotas institucionais

| Caminho | Ficheiro | Nota |
|---------|----------|------|
| `/` | `app/pages/index.vue` | Landing principal |
| `/politica-de-privacidade` | `app/pages/politica-de-privacidade.vue` | Revisão jurídica recomendada antes de comunicação oficial |
| `/como-trabalhamos` | `app/pages/como-trabalhamos.vue` | Idem |

---

## CSS e marca

| Ficheiro | Conteúdo |
|----------|----------|
| `app/assets/css/tokens.css` | Variáveis de cor, tipo e espaçamento |
| `app/assets/css/main.css` | Entrada Tailwind + camadas (`@layer`) |
| `app/assets/css/reveal.css` | Animações de entrada «reveal» (`.landing-section--visible`) |
| `tailwind.config.ts` | Mapeamento de tokens para utilities |
| `OLLIV_Design_System_Tailwind.md` | Guia oficial de marca (está em **`.prettierignore`**) |

---

## Configuração (Nuxt)

- **`nuxt.config.ts`** — `runtimeConfig.public.siteUrl` (valor por defeito = `SITE_ORIGIN`), `routeRules` de cache para estáticos, módulos **fonts**, **Tailwind**, **ESLint**, `app.head` (título e meta alinhados a `SITE_SEO`).
- Ícones e tema: referências em `app.head` (`favicon.ico`, PNGs, `apple-touch-icon.png`, `theme-color`).

---

## Variáveis de ambiente

Ver **`.env.example`**.

- **`NUXT_PUBLIC_SITE_URL`** — opcional: ignorar em produção se o domínio for o oficial (já definido em código). Use para **staging** ou testes com URL absolutas no dev (`http://localhost:3000`).

---

## SEO e índices

1. Canonical, Open Graph, Twitter Cards e JSON‑LD **WebSite** + **ProfessionalService** quando há URL base configurada (`usePublicSiteUrl` / `SITE_ORIGIN`).
2. **`public/robots.txt`** e **`public/sitemap.xml`** apontam para `https://www.ollivpericias.com.br`. Altere se o deploy usar outro host.
3. **Imagem OG 1200×630:** ainda não obrigatória no código — `og:image` provisória na home pode usar ícone até existir arte final (ver `app/pages/index.vue`).

Para uma leitura consolidada da narrativa, conversões e checklist de melhorias, ver **`AnaliseProjeto.md`** (orientação interna).

---

## Qualidade de código

- ESLint com **`@nuxt/eslint`** e **`eslint-config-prettier`**.
- Prettier: **`.prettierrc`** na raiz.

---

## Deploy

Após `npm run build`, a saída fica em **`.output/`** (servidor Node por defeito). Consulte a [documentação de deploy do Nuxt](https://nuxt.com/docs/getting-started/deployment).

### Desempenho (já considerado no projeto)

- Fontes servidas via **@nuxt/fonts** (sem stylesheet bloqueante do Google Fonts no runtime).
- **Code-splitting** de secções pesadas na home.
- **`routeRules`** com `cache-control` longo para `/images/**`, `/_nuxt/**` e ícones (ajuste se o HTML for servido por CDN com política diferente).
- **DevTools** Nuxt desligados no build de produção.

**Opcional:** WebP/AVIF de imagens, `@nuxt/image`, auditoria Lighthouse/PageSpeed pós‑deploy, subset `latin` em `@nuxt/fonts`.

---

## Créditos

- **Cliente / marca:** **OLLIV Perícia Médica**.
- **Criação e desenvolvimento do site (implementação técnica, UI e estrutura):** **[Gabriel Stroligo](https://www.linkedin.com/in/gabrielstroligo/)**.

---

## Ligações úteis

- [Documentação Nuxt](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
