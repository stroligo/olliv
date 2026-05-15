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

## Links úteis

- [Documentação Nuxt](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
