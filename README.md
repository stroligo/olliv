# OLLIV Perícia Médica — Landing (Nuxt)

Site institucional / landing page da **OLLIV Perícia Médica**, com foco em **CTAs para WhatsApp**, design tokens alinhados ao guia em `OLLIV_Design_System_Tailwind.md` e stack **Nuxt 4 + Vue 3 + Tailwind CSS**.

## Requisitos

- Node.js 18+ (recomendado: LTS atual)

## Instalação

```bash
npm install
```

O `postinstall` roda `nuxt prepare` (gera tipos e config do ESLint em `.nuxt`).

## Scripts

| Comando                | Descrição                         |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento       |
| `npm run build`        | Build de produção                 |
| `npm run preview`      | Preview do build localmente       |
| `npm run generate`     | Site estático (SSG), se aplicável |
| `npm run lint`         | ESLint (`eslint.config.mjs`)      |
| `npm run lint:fix`     | ESLint com `--fix`                |
| `npm run format`       | Prettier (formata o projeto)      |
| `npm run format:check` | Verifica formatação Prettier      |

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura principal

- **`app/pages/index.vue`** — Montagem da landing (seções).
- **`app/components/landing/`** — Blocos da página (hero, serviços, CTA, footer, FAB WhatsApp, etc.).
- **`app/composables/useWhatsApp.ts`** — Número E.164 e URLs `wa.me`; ajuste aqui mensagens e telefone.
- **`app/assets/css/tokens.css`** — Variáveis CSS (cores, tipo, escalas).
- **`app/assets/css/main.css`** — Entrada Tailwind + layer base.
- **`tailwind.config.ts`** — Tokens mapeados para classes utilitárias.
- **`public/`** — Arquivos estáticos (ex.: imagens em `public/images/`).

## Design system

Referência oficial de marca e Tailwind está em **`OLLIV_Design_System_Tailwind.md`**. Esse arquivo está no **`.prettierignore`** para não ser reformatado automaticamente.

## Qualidade de código

- **ESLint:** `@nuxt/eslint` + `eslint-config-prettier`.
- **Prettier:** `.prettierrc` na raiz.

## Deploy / produção

Consulte a [documentação de deploy do Nuxt](https://nuxt.com/docs/getting-started/deployment). Após `npm run build`, a saída fica em `.output/` (preset padrão `node-server`).

### SEO (recomendado em produção)

1. **`NUXT_PUBLIC_SITE_URL`** pode ficar omitida na produção: o defeito já é `https://www.ollivpericias.com.br` (`SITE_ORIGIN` em `siteMarketing`). Use a variável para **staging** ou `http://localhost:3000` se quiser testar URLs absolutas no dev.
2. Copie `.env.example` para `.env` quando precisar de override local; em hospedagem, configure a variável só se o host não for o domínio oficial.
3. **`public/sitemap.xml`** e **`robots.txt`** apontam para `https://www.ollivpericias.com.br`. Se o deploy usar outro host, atualize esses ficheiros (ou gere sitemap/robots dinamicamente no futuro).
4. Para compartilhamento social ideal, adicione uma imagem **Open Graph 1200×630** em `public/` e referencie em `useSeoMeta` (`ogImage` / `twitterImage`) em `app/pages/index.vue`.

### Desempenho (implementado no projeto)

- **@nuxt/fonts** — remove o stylesheet bloqueante do Google Fonts; fontes em woff2 no build, com pesos usados (Inter / Montserrat).
- **Code-splitting** — secções abaixo da dobra e footer/FAB carregados como chunks assíncronos em `app/pages/index.vue`.
- **`routeRules`** — `cache-control` longo para `/images/**`, `/_nuxt/**` e ícones (ajuste se o HTML for servido por CDN com outra política).
- **Hero** — `sizes` no retrato LCP para o browser dimensionar melhor o recurso.
- **DevTools** — desligados no build de produção (`NODE_ENV=production`).

Próximo nível (opcional): gerar **WebP/AVIF** das fotos em `public/images/`, `@nuxt/image`, auditoria **Lighthouse** / **PageSpeed** em deploy, e **subset** `latin` em `@nuxt/fonts` se quiser menos arquivos de fonte.

## Links úteis

- [Documentação Nuxt](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
