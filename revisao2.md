# Revisão 2 — LP OLLIV

**Cliente:** José Messias Oliveira Júnior  
**Fonte:** [`revisao/revisao2.pdf`](revisao/revisao2.pdf)  
**Referência:** https://ollivpericias.com.br/  
**Status:** implementado em 25/05/2026

---

## Implementado (resumo)

| Item | O que foi feito |
|------|-----------------|
| Hero resumido | `h1`: *Assistência técnica e perícias médicas*; slides rotativos com os 2 exemplos do PDF |
| CTA hero | *Solicitar análise técnica* + mensagem `analysisRequest` |
| Dr. Messias nos CTAs | Labels e mensagens WhatsApp personalizadas em todo o site |
| RQE / copy | Removido *médico-legal* da LP pública; foco em *perícia médica* |
| Métricas | Nova `LandingMetrics`: 27 estados · 24h · 10+ anos |
| Advogado / paciente | Nova `LandingAudience` com toggle e listas distintas |
| CV | Texto revisão 2, badges, rede de parceiros (especialidades) |
| FAQ | 10 perguntas (modelo PeriCorp adaptado); sem “memorial” na pergunta |
| Diferenciais | Removido “litígios”; item → *Processos de alta complexidade* |
| Desktop foto | `object-position` no `lg+` para evitar corte da cabeça |

**Arquivos centrais:** `siteMarketing.ts`, `siteContent.ts`, `peritoCurriculo.ts`, `LandingHero.vue`, `LandingMetrics.vue`, `LandingAudience.vue`, demais `Landing*.vue`.

---

## Pendências opcionais (cliente)

- [ ] Validar ortografia e tom final dos textos com o Dr. Messias  
- [ ] Confirmar lista completa de especialidades parceiras  
- [ ] Número “95+ casos” se quiser terceira métrica como no benchmark Lumen  
- [ ] Revisão jurídica formal dos termos (RQE / CRM na legenda)
