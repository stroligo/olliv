# OLLIV Perícia Médica — Design System + UI Kit (Tailwind)

## Visão da Marca

A identidade visual da OLLIV transmite:

- Autoridade técnica
- Sofisticação premium
- Segurança jurídica
- Clareza profissional
- Estratégia e precisão

---

# Paleta Oficial

| Token         | HEX     | Uso                   |
| ------------- | ------- | --------------------- |
| primary       | #0E1B33 | Fundo principal       |
| primary-light | #16284D | Hover / cards         |
| primary-dark  | #09101F | Background escuro     |
| gold          | #C9A44A | CTA / destaques       |
| gold-light    | #D8B763 | Hover dourado         |
| gold-dark     | #A8842F | Bordas / detalhes     |
| white         | #FFFFFF | Fundo claro           |
| off-white     | #F7F7F5 | Background secundário |
| silver        | #C8CCD3 | Bordas suaves         |
| text          | #EAECEF | Texto em fundo escuro |
| text-dark     | #111827 | Texto em fundo claro  |
| muted         | #94A3B8 | Texto secundário      |

---

# Tipografia

## Fonte Principal

### Montserrat

Pesos:

- 600
- 700
- 800

Uso:

- Hero titles
- Headlines
- CTA
- Sessões principais

---

## Fonte Secundária

### Inter

Pesos:

- 400
- 500
- 600

Uso:

- Parágrafos
- Descrições
- Cards
- UI

---

# Escala Tipográfica

| Token        | Size |
| ------------ | ---- |
| text-hero    | 72px |
| text-display | 56px |
| text-h1      | 48px |
| text-h2      | 36px |
| text-h3      | 28px |
| text-h4      | 22px |
| text-body-lg | 20px |
| text-body    | 18px |
| text-small   | 15px |
| text-caption | 13px |

---

# Tailwind Config

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0E1B33',
        'primary-light': '#16284D',
        'primary-dark': '#09101F',

        gold: '#C9A44A',
        'gold-light': '#D8B763',
        'gold-dark': '#A8842F',

        white: '#FFFFFF',
        silver: '#C8CCD3',
      },

      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },

      borderRadius: {
        premium: '22px',
      },

      boxShadow: {
        premium: '0 20px 60px rgba(0,0,0,0.25)',
      },
    },
  },
}
```

---

# Estrutura Recomendada da Landing Page

1. Hero
2. Logos de autoridade
3. Serviços principais
4. Diferenciais
5. Processo de atendimento
6. Credibilidade
7. CTA
8. Footer

---

# Hero Copy

## Headline

Assistência técnica médica estratégica para processos judiciais complexos.

## Subheadline

Pareceres técnicos e atuação médico-legal com foco em estratégia processual.

---

# CTA

## CTA Principal

- Fale com um especialista
- Solicite análise do caso
- Envie seu caso para análise

Evitar:

- “Envie sua mensagem”

---

# UI Tokens

## Primary Button

```html
class=" px-8 py-4 rounded-full bg-gold hover:bg-gold-light text-primary-dark font-semibold
transition-all shadow-premium "
```

## Secondary Button

```html
class=" px-8 py-4 rounded-full border border-gold text-gold hover:bg-gold hover:text-primary-dark
transition-all "
```

---

# Estilo Fotográfico

- Fundo escuro
- Contraste premium
- Roupa social
- Luz lateral suave
- Expressão séria/confiante

---

# Bibliotecas Recomendadas

- TailwindCSS
- Next.js
- Framer Motion
- Lucide Icons
- shadcn/ui

---

# Estrutura Recomendada no Cursor

```bash
/components
/ui
/sections
/styles
/lib
/tokens
```

---

# Posicionamento da Marca

OLLIV deve parecer:

- Premium
- Estratégica
- Jurídica
- Executiva
- Técnica

A landing page deve transmitir:
“Consultoria técnica premium para decisões judiciais complexas.”
