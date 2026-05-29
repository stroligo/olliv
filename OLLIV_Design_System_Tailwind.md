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
| primary-dark  | #0A0E14 | Fundo mais escuro     |
| primary       | #14284B | Fundo principal       |
| primary-light | #1E3568 | Hover / cards         |
| gold-dark     | #9B7A46 | Bordas / detalhes     |
| gold          | #C8A165 | CTA / destaques       |
| gold-light    | #D9B882 | Hover dourado         |
| white         | #FFFFFF | Fundo claro           |
| off-white     | #F4F4F3 | Background secundário |
| silver        | #D1D3D4 | Bordas suaves         |
| text          | #FFFFFF | Texto em fundo escuro |
| text-dark     | #0A0E14 | Texto em fundo claro  |
| muted         | #9BA3AD | Texto secundário      |

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
        primary: '#14284B',
        'primary-light': '#1E3568',
        'primary-dark': '#0A0E14',

        gold: '#C8A165',
        'gold-light': '#D9B882',
        'gold-dark': '#9B7A46',

        white: '#FFFFFF',
        silver: '#D1D3D4',
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
