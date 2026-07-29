# ADJUSTMENTS.md — Instituto Ávita
# Aplicar TODAS as alterações abaixo. Nenhuma é opcional.

---

## BLOCO 1 — ALTERAÇÕES GLOBAIS (aplicar em toda a página)

### 1.1 Remover todos os eyebrow labels
- Remover TODOS os elementos com classe `.eyebrow`, `.section-label`, `.section-tag` ou similar
- **Exceção:** manter apenas o label "Instituto Ávita" na seção `#abertura`
- O label "Instituto Ávita" deve ter `font-weight: 600` (semi-bold) para melhor contraste

### 1.2 Botões — reformatar todos
Aplicar a TODOS os elementos `<a>` e `<button>` com classe `.btn-primary` e `.btn-outline`:
```css
border-radius: 100px;             /* totalmente arredondado */
padding: 1.1rem 2.2rem;           /* padding vertical maior */
font-family: var(--font-body);    /* DM Sans */
font-weight: 400;
```
- Substituir todo ícone de seta `→` pelo SVG do WhatsApp inline:
```html
<svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.5l5.817-1.517A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.867 9.867 0 01-5.031-1.373l-.361-.214-3.734.975.999-3.62-.235-.373A9.845 9.845 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
</svg>
```
CSS do ícone dentro do botão:
```css
.btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: transform var(--transition-base);
}
.btn-primary:hover .btn-icon,
.btn-outline:hover .btn-icon {
  transform: scale(1.1);
}
```

### 1.3 Remover cabeçalho e barra de progresso
- Remover o elemento `<header>` inteiro e todo seu conteúdo
- Remover o elemento `#reading-progress` e todo CSS/JS relacionado
- Remover a função `initReadingProgress()` do `ui.js`
- Remover o import/call de `initReadingProgress` no `main.js`

### 1.4 Remover todos os travessões "—"
Substituir todas as ocorrências de ` — ` (com espaços) no HTML por `, ` (vírgula + espaço).
Casos específicos onde faz mais sentido usar ponto ou apenas espaço:
- "caminham juntas — para devolver" → "caminham juntas, para devolver"
- "seja qual for o grau de complexidade do seu caso — com" → remover o travessão, manter o trecho
- "trata com profundidade — Se você chegou" → ". Se você chegou"
- "P.S. — O seu sorriso" → "P.S. O seu sorriso" (se a seção PS não for removida)
- Em qualquer lugar que reste "—" sozinho ou com espaços: remover completamente

### 1.5 Remover todos os emojis
Remover do HTML todos os caracteres a seguir (incluindo seus espaços adjacentes):
`🦷` `✨` `🎯` `🔒` `★` `✓` `✔` `◇` `◆` `→` (apenas os standalone fora de botões) e qualquer outro emoji ou caractere especial decorativo.
- Nos cards de oferta: remover o ícone emoji do título de cada pilar; manter apenas o texto do título
- Nas estrelas dos depoimentos: manter as estrelas `★★★★★` dentro dos cards de depoimento; remover estrelas standalone fora dos cards
- Nos checkmarks das listas de oferta: substituir `✓` por um SVG checkmark em linha:
```html
<svg class="check-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 8L6.5 12L13.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### 1.6 Scroll suave
No `css/base.css`:
```css
html {
  scroll-behavior: smooth;
}
```
No `js/ui.js`, manter o polyfill para Safari já implementado.

### 1.7 Transitions em todos os hovers
Garantir que TODOS os elementos interativos tenham `transition`. Verificar e adicionar onde faltar:
```css
/* Cards de dor */
.card-dor { transition: border-color 300ms ease, box-shadow 300ms ease; }

/* Cards de benefício */
.card-beneficio { transition: border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease; }

/* Cards de depoimento */
.card-depoimento { transition: box-shadow 300ms ease, transform 300ms ease; }

/* Cards de oferta */
.pilar-oferta { transition: border-color 300ms ease, background 300ms ease; }

/* Items de accordion (objeções e FAQ) */
.accordion__trigger { transition: color 200ms ease; }

/* Links do footer */
footer a { transition: color 200ms ease, opacity 200ms ease; }
footer a:hover { opacity: 0.75; }
```
Todos os `.btn-primary` e `.btn-outline` já devem ter `transition` — verificar se está aplicado.

---

## BLOCO 2 — ALTERAÇÕES POR SEÇÃO

### Seção 1 — Hero (`#hero`)
- **Centralizar TUDO:** `text-align: center` no container do hero
- Headline (todas as 3 linhas): centradas
- Subheadline: centrada, `margin: 0 auto`
- Botão CTA: centralizado com `display: flex; justify-content: center` no wrapper
- Micro-texto ("Sem compromisso • ...") : centralizado
- O ornamento botânico de fundo pode ficar como está (posicionado absolutamente)

---

### Seção 2 — Abertura (`#abertura`)
- O ornamento SVG entre as linhas douradas: aumentar para `width: 48px; height: 48px` (atualmente está pequeno)
- Label "Instituto Ávita": `font-weight: 600` (semi-bold) para mais contraste
- **Remover o espaço excessivo** entre o badge "+500 SORRISOS TRANSFORMADOS" e o início da Seção 3:
  - Reduzir `padding-bottom` da seção `#abertura` para `3rem`
  - Reduzir `margin-bottom` do badge `.badge-counter` para `0`
  - Reduzir `padding-top` da seção `#dor` para `4rem`

---

### Seção 3 — Dor (`#dor`)
- Aumentar `padding-bottom` para `6rem` (para criar respiro antes da seção verde de baixo)
- Os cards de dor já estão bem; manter como estão visualmente

---

### Seção 4 — Solução (`#solucao`) — fundo sage #81866e
- **Centralizar conteúdo verticalmente:** garantir `min-height: 100%` no container interno com `display: flex; flex-direction: column; justify-content: center`
- **Cor dos parágrafos:** todos os `<p>` dentro de `#solucao` devem ter `color: var(--color-on-dark)` (o cream claro `#f5f0e8`), NÃO preto
- Verificar também `color` de qualquer `<p>`, `<span>` herdando cor escura — forçar branco nesta seção:
```css
#solucao p,
#solucao .solucao__text {
  color: var(--color-on-dark);
}
```

---

### Seção 5 — Benefícios (`#beneficios`)
- **Substituir o isotipo da logo** em cada card pelo SVG correspondente ao tema do benefício
- Cada SVG deve ter `width: 40px; height: 40px; color: var(--color-gold)` e `stroke-width: 1.2` (estilo linha fina, igual ao ornamento botânico)
- Usar os 6 SVGs abaixo, UM por card, na ordem:

**Card 1 — Sorriso livre, sem hesitar:**
```html
<svg class="benefit-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="20" cy="20" r="15" stroke="currentColor" stroke-width="1.2"/>
  <path d="M13 22c1.5 3 4 5 7 5s5.5-2 7-5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="15" cy="17" r="1.2" fill="currentColor"/>
  <circle cx="25" cy="17" r="1.2" fill="currentColor"/>
</svg>
```

**Card 2 — Aparência que combina com você:**
```html
<svg class="benefit-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M20 6C14 6 9 11 9 17c0 4 2 7.5 5 9.5V32h12v-5.5c3-2 5-5.5 5-9.5 0-6-5-11-11-11z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M16 32v2M24 32v2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M16 22c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
</svg>
```

**Card 3 — Leveza no dia a dia:**
```html
<svg class="benefit-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M20 34V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M20 10C20 10 12 14 12 22" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M20 10C20 10 28 14 28 22" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M20 18C20 18 15 20 14 26" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M20 18C20 18 25 20 26 26" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
</svg>
```

**Card 4 — Harmonia em cada detalhe:**
```html
<svg class="benefit-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M20 5L24.5 15.5L36 17.3L27.5 25.7L29.5 37L20 32L10.5 37L12.5 25.7L4 17.3L15.5 15.5L20 5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
</svg>
```

**Card 5 — Plano exclusivo para você:**
```html
<svg class="benefit-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="10" y="6" width="20" height="28" rx="2" stroke="currentColor" stroke-width="1.2"/>
  <path d="M15 14h10M15 19h10M15 24h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="28" cy="30" r="5" fill="var(--color-cream)" stroke="currentColor" stroke-width="1.2"/>
  <path d="M26 30l1.5 1.5L30 28" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**Card 6 — Segurança no espelho:**
```html
<svg class="benefit-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="20" cy="17" rx="9" ry="11" stroke="currentColor" stroke-width="1.2"/>
  <path d="M14 30c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M17 17l2 2 4-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

CSS para os ícones:
```css
.benefit-icon {
  width: 40px;
  height: 40px;
  color: var(--color-gold);
  margin-bottom: 1rem;
  display: block;
}
```

---

### Seção 6 — Prova Social (`#prova-social`) — fundo cream
- **Remover** o badge standalone de estrelas `★★★★★` que fica acima dos cards de depoimento (o badge pill separado, não as estrelas dentro dos cards)
- **Mover o botão CTA** para DEPOIS do placeholder de fotos:
  - Atualmente o botão está entre o badge "+500" e os cards de depoimento
  - Mover para logo abaixo do elemento `[INSERIR: Fotos de antes e depois...]`
  - Estrutura final da seção:
    ```
    [badge +500 SORRISOS TRANSFORMADOS]
    [3 cards de depoimento]
    [placeholder área de fotos — div com comentário HTML]
    [botão CTA]   ← mover para cá
    ```

---

### Seção 7 — Oferta (`#oferta`) — fundo forest #484e35
- **Texto dourado:** todo texto com `color: var(--color-gold)` dentro desta seção deve ter `font-weight: 700` para legibilidade no fundo escuro
- Aplicar especificamente em:
  ```css
  #oferta .pilar__titulo,
  #oferta .pilar__label,
  #oferta [class*="gold"],
  #oferta h3,
  #oferta h4 {
    font-weight: 700;
  }
  ```
- **Remover linhas divisórias** dentro e entre os cards (qualquer `border`, `::after` com `background: gold`, ou `<hr>` dentro dos cards de pilar)
- **Remover completamente** o parágrafo/elemento que contém o texto:
  `"→ Dê o primeiro passo: fale com a nossa equipe pelo WhatsApp"`
  (manter apenas o botão CTA que fica abaixo)

---

### Seção 8 — Objeções (`#objecoes`) — REMOVER COMPLETAMENTE
- Remover do `index.html` a seção inteira com `id="objecoes"` e todo seu conteúdo
- Esta seção duplica o conteúdo do FAQ, por isso é removida

---

### Seção 9 — Garantia (`#garantia`) — fundo cream
- **Adicionar padding interno** ao container da seção: `padding: 5rem 2rem` (atualmente os elementos estão colados)
- Garantir que o `<section>` tenha:
  ```css
  #garantia {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  #garantia .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  ```
- **Remover completamente** o elemento que contém:
  `"Nosso compromisso é com o seu resultado — do início ao fim do tratamento."`
  (manter apenas o título e o texto do parágrafo acima)

---

### Seção 10 — Urgência (`#urgencia`) — REMOVER COMPLETAMENTE
- Remover do `index.html` a seção inteira com `id="urgencia"` e todo seu conteúdo

---

### Seção 11 — FAQ (`#faq`)
- **Manter exatamente como está** — nenhuma alteração necessária

---

### Seção 12 — CTA Final (`#cta-final`) — fundo forest #484e35
- **Cor dos parágrafos:** todos os `<p>` dentro de `#cta-final` devem ter `color: var(--color-on-dark)` (cream claro), não cor escura/preta:
  ```css
  #cta-final p {
    color: var(--color-on-dark);
  }
  ```
- **Transformar o elemento com o texto** "Mais de 500 pacientes já deram esse primeiro passo. Seja o próximo." em um destaque especial:
  - Cor: `var(--color-gold)`
  - Font: `var(--font-display)` (Cormorant Garamond)
  - Tamanho: `clamp(1.4rem, 2.5vw, 2rem)` (maior que o parágrafo, menor que o título)
  - Font-weight: 400 (elegante, não bold)
  - Margin: `2rem 0`
  - Não é um parágrafo comum; envolver em `<p class="cta-highlight">` com estilo diferenciado

---

### Seção 13 — PS (`#ps`) — REMOVER COMPLETAMENTE
- Remover do `index.html` a seção inteira com `id="ps"` e todo seu conteúdo

---

### Rodapé (`footer`)
- **Aumentar a logo:** o `<img>` ou placeholder da logo no footer deve ter:
  ```css
  footer .logo-completa,
  footer .logo-placeholder {
    height: 80px;   /* era ~40px, aumentar significativamente */
    width: auto;
  }
  ```
- Manter todo o resto do footer como está

---

## BLOCO 3 — CHECKLIST DE VERIFICAÇÃO

Após aplicar todos os ajustes, verificar:

- [ ] Nenhum eyebrow label visível (exceto "Instituto Ávita" em #abertura com font-weight: 600)
- [ ] Todos os botões com border-radius: 100px e ícone WhatsApp SVG (sem seta →)
- [ ] Sem `<header>` ou `#reading-progress` no HTML
- [ ] Nenhum "—" em texto visível da página
- [ ] Nenhum emoji em texto visível (exceto ★ dentro dos cards de depoimento)
- [ ] Hero: tudo centralizado
- [ ] Seção abertura: logo no divisor maior (48px); "Instituto Ávita" semi-bold
- [ ] Espaço entre seção 2 e 3 reduzido
- [ ] Seção dor: padding bottom generoso antes do verde
- [ ] Seção solução: parágrafos em branco/cream, conteúdo centralizado verticalmente
- [ ] Seção benefícios: 6 ícones SVG distintos (não logo da marca)
- [ ] Seção prova social: stars badge removido; botão abaixo das fotos
- [ ] Seção oferta: texto dourado bold; sem linhas divisórias; sem texto da seta
- [ ] Seção objeções: REMOVIDA
- [ ] Seção garantia: padding ok; linha de compromisso removida
- [ ] Seção urgência: REMOVIDA
- [ ] Seção FAQ: sem alteração
- [ ] Seção CTA final: parágrafos brancos; "Mais de 500..." dourado, Cormorant, maior
- [ ] Seção PS: REMOVIDA
- [ ] Footer: logo maior (80px de altura)
- [ ] `html { scroll-behavior: smooth }` presente no CSS
- [ ] Todos os hovers com transition
