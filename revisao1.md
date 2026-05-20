# Revisão 1 — LP OLLIV

**Cliente:** José Messias Oliveira Júnior  
**Fonte:** [`revisao/ANÁLISE DE LP - José Messias Oliveira Junior.pdf`](revisao/ANÁLISE%20DE%20LP%20-%20José%20Messias%20Oliveira%20Junior.pdf)  
**Referência analisada:** https://olliv.vercel.app/  
**Data do levantamento:** 20/05/2026  
**Status:** implementado em 20/05/2026

---

## Resumo

| Tipo | Quantidade |
|------|------------|
| Modificações solicitadas | 8 |
| Feedback positivo (manter) | 6 |

---

## Modificações a implementar

### 1. Hero — reduzir texto da descrição inicial

**Solicitação do cliente:** diminuir a quantidade de texto na descrição inicial para facilitar leitura rápida; os serviços já são detalhados mais abaixo na LP.

**Onde alterar:** `app/components/landing/LandingHero.vue`

- [x] Parágrafo enxuto: *"Pareceres médico-legais rigorosos e leitura clínica alinhada ao processo — com transparência, ética e foco na sua estratégia."*

---

### 2. Seção “Atuação voltada…” — espaço em branco excessivo

**Solicitação do cliente:** preencher o vazio inferior com informação ou elemento visual que reforce a proposta de valor.

**Onde alterar:** `app/components/landing/LandingAuthority.vue`

- [x] Três cards de destaque com ícones (litígios, prontuário, alcance)
- [x] Padding da seção ajustado (`py-10` / `py-12`)

---

### 3. “Por que nos escolher” — título mais simples

**Solicitação do cliente:** título menos técnico.

**Onde alterar:** `app/components/landing/LandingDifferentials.vue`

- [x] Título: **Perícia Médica Especializada**

---

### 4. Seção “Processo” — ícones nos passos

**Onde alterar:** `app/components/landing/LandingProcess.vue`

- [x] Ícones Lucide por etapa (WhatsApp, estetoscópio, clipboard, entrega)
- [x] Numeração 01–04 mantida

---

### 5. Credibilidade — mini currículo abaixo da foto

**Onde alterar:** `app/constants/peritoCurriculo.ts`, `LandingCredibility.vue`

- [x] Conteúdo biográfico do cliente
- [x] Mini CV estruturado abaixo da foto

---

### 6. Credibilidade — título menos pesado visualmente

**Onde alterar:** `LandingCredibility.vue`

- [x] Título: *"Quando a prova médica decide, método e reputação contam."*
- [x] `max-width` no `h2` para melhor quebra de linha

---

### 7. Credibilidade — quebrar parágrafos densos

**Onde alterar:** `LandingCredibility.vue`

- [x] Dois parágrafos substituídos por lista com três tópicos em destaque

---

### 8. CTA final (WhatsApp) — um botão principal dourado

**Onde alterar:** `app/components/landing/LandingCtaBanner.vue`

- [x] Removido “Fale com um especialista”
- [x] Único CTA: “Enviar documentos para análise” (`variant="primary"`, `WHATSAPP_MESSAGES.documents`)

---

## Aprovações — manter como está

| Seção | Feedback |
|-------|----------|
| **Benefícios / Trust bar** (`LandingTrustBar.vue`) | Ícones, tipografia e espaçamento — aprovado |
| **Serviços** (`LandingServices.vue`) | Ícones, espaçamento e CTAs por serviço — aprovado |
| **FAQ** (`LandingFaq.vue`) | Accordion — aprovado |

---

## Mapa rápido PDF → código

| Pág. PDF | Tema | Componente principal |
|----------|------|----------------------|
| 1 | Hero + benefícios | `LandingHero.vue`, `LandingTrustBar.vue` |
| 2 | Autoridade + serviços | `LandingAuthority.vue`, `LandingServices.vue` |
| 3 | Diferenciais + processo | `LandingDifferentials.vue`, `LandingProcess.vue` |
| 4 | Credibilidade / sobre | `LandingCredibility.vue` |
| 5 | FAQ + CTA contato | `LandingFaq.vue`, `LandingCtaBanner.vue` |

---

## Pendências opcionais (cliente)

- [ ] CRM/registro profissional no mini CV, se desejar exibir
- [ ] Validar copy final do hero e título de credibilidade em reunião com o cliente
