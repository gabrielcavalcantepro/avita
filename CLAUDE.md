# CLAUDE.md — Instituto Ávita Landing Page
> Este arquivo é lido automaticamente pelo Claude Code ao abrir este projeto.

---

## ⛔ REGRA #1 — COPY

**Existe um arquivo `COPY.md` nesta pasta com o texto literal de todos os 15 blocos.**

- ❌ **PROIBIDO criar, inventar, resumir ou reescrever qualquer texto**
- ✅ **Copiar palavra por palavra do `COPY.md` para o HTML**
- Cada seção do HTML mapeia diretamente para um bloco numerado no `COPY.md`
- Os únicos campos que podem ser deixados como placeholder são os marcados com `[INSERIR ...]`
- Se não encontrar o texto de uma seção, **parar e ler o `COPY.md`** antes de continuar

---

## CONTEXTO DO PROJETO

Landing page de vendas para o **Instituto Ávita** (Dr. Diego Leite — Reabilitação Oral e Estética).
Objetivo: captar pacientes via WhatsApp. Um único CTA em toda a página, todos apontando para o link já definido no SPEC.md.

**Leia o SPEC.md antes de qualquer implementação.** Ele contém todas as decisões de design, tokens, specs por seção e checklist.

---

## ESTRUTURA DE ARQUIVOS A CRIAR

```
instituto-avita/
├── SPEC.md                  ← referência de design
├── CLAUDE.md                ← este arquivo
├── COPY.md                  ← ⚠️ TEXTO LITERAL DOS 15 BLOCOS — LER ANTES DE QUALQUER HTML
├── index.html               ← estrutura semântica + CSS crítico inline
├── css/
│   ├── tokens.css           ← TODAS as CSS variables (cores, tipos, espaços)
│   ├── base.css             ← Reset + estilos globais (body, tipografia, links)
│   ├── layout.css           ← Estrutura de seções, container, grid system
│   ├── components.css       ← Botões, cards, badges, accordion, nav
│   ├── animations.css       ← Classes .reveal, .revealed, stagger delays, parallax
│   └── responsive.css       ← Media queries (mobile-first, todos os breakpoints)
├── js/
│   ├── main.js              ← Init geral: chama funções dos outros módulos
│   ├── animations.js        ← IntersectionObserver, split-text hero, contador +500
│   └── ui.js                ← Scrollbar, progresso leitura, parallax, accordion, smooth scroll
└── assets/
    ├── images/
    │   ├── logo-isotipo.svg       ← PLACEHOLDER — comentário HTML indicando substituição
    │   ├── logo-completa.svg      ← PLACEHOLDER — comentário HTML indicando substituição
    │   └── logo-completa-branca.svg ← PLACEHOLDER — comentário HTML indicando substituição
    └── fonts/               ← vazio (usando Google Fonts via CDN)
```

---

## REGRAS ABSOLUTAS — NÃO VIOLAR

### Copy
- ❌ **Jamais alterar, resumir ou reescrever o texto da copy**
- A copy completa está no SPEC.md seção por seção
- Copiar exatamente, incluindo pontuação, emojis e formatação
- Substituições permitidas: apenas os `[INSERIR ...]` placeholders

### Design tokens
- ❌ **Nenhum valor de cor, fonte ou espaçamento hardcoded**
- Todo valor vem das variáveis em `tokens.css`
- Se precisar de um valor novo, adicionar a `tokens.css` primeiro

### Desempenho
- ❌ Nenhuma biblioteca JavaScript externa (zero deps — nem jQuery, nem GSAP, nem ScrollReveal)
- ❌ Nenhum CSS framework (nem Bootstrap, nem Tailwind)
- ✅ CSS puro + Vanilla JS

### CTAs
- ❌ Jamais colocar `href="#"` em botões CTA — sempre usar o link do WhatsApp
- **Link obrigatório para todos os botões:**
  ```
  https://l.instagram.com/?u=https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D5585998119223%26text%3DOl%2525C3%2525A1%25252C%252520gostaria%252520de%252520marcar%252520minha%252520consulta%252521%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnmtaloL-Xft2s-PIMGlLFGK2qnugMWEYR_L-hrNktaCjH3w6dO9GDxqN2eUc_aem_xAzyyD5NPygzf-eykj0PtQ&e=AUBriN79TZKHfBZq8PAMk9-vmvmrBHg1MdvnrQQg5mbIinRcT1mdfl0qUArWGEULu3yYax2OkxJ7DkpZlO2VzRvoUc54e-LAreZzjwymzh0SDFKBbjxjhGmtGwr3Xs81OThor9HrCyz30GxIz6qIIUs
  ```
- Atributos obrigatórios: `target="_blank" rel="noopener noreferrer"`

---

## IMPLEMENTAÇÃO ARQUIVO POR ARQUIVO

### tokens.css
Deve conter 100% das variáveis listadas no SPEC.md seção 2.
Sem estilos — apenas declaração de variáveis em `:root {}`.

### base.css
```css
/* O que incluir: */
/* 1. Reset mínimo (box-sizing, margin/padding 0) */
/* 2. html { scroll-behavior: smooth; } */
/* 3. Scrollbar customizada (spec seção 4) */
/* 4. Body: font-family body, color text, background white */
/* 5. Tipografia base: h1-h6, p, strong, em */
/* 6. Links: sem underline padrão, cor gold em texto */
/* 7. Imagens: max-width 100%, height auto */
/* 8. ::selection com cor gold */
```

### layout.css
```css
/* O que incluir: */
/* 1. .container (max-width 1200px, padding clamp) */
/* 2. Cada seção: background, padding-top/bottom via section-py tokens */
/* 3. Grid system para dor (2-col), benefícios (3-col), oferta (3-col), depoimentos (3-col) */
/* 4. Transições de forma entre seções (clip-path diagonal) */
/* 5. Seção hero (min-height 100svh, flex coluna centralizado) */
/* 6. Ornamentos botânicos posicionados absolutamente por seção */
```

### components.css
```css
/* O que incluir: */
/* 1. .btn-primary e .btn-outline (spec seção 7) com hover/active/focus */
/* 2. .nav e seus elementos */
/* 3. .card-dor, .card-beneficio, .card-depoimento */
/* 4. .accordion (sem JS aqui — apenas estados CSS) */
/* 5. .badge-counter (o +500) */
/* 6. .badge-rating */
/* 7. .ornamento-divisor (linha + folhinha dourada entre blocos) */
/* 8. .pilar-oferta */
/* 9. .reading-progress (barra dourada fixa no topo) */
```

### animations.css
```css
/* O que incluir: */
/* 1. .reveal e .revealed (opacity + translateY) */
/* 2. .reveal-left (translateX) */
/* 3. .reveal-scale (scale 0.95 → 1) */
/* 4. data-delay 1-6 com transition-delay */
/* 5. @keyframes para folha crescendo (stroke-dashoffset) */
/* 6. @media prefers-reduced-motion — DESATIVA TUDO */
```

### responsive.css
```css
/* Mobile-first: estilos base são mobile, media queries adicionam para telas maiores */
/* Breakpoints:
   @media (min-width: 480px)  — sm: ajustes de fonte
   @media (min-width: 768px)  — md: 2 colunas onde cabem 
   @media (min-width: 1024px) — lg: 3 colunas, layout desktop completo
   @media (min-width: 1280px) — xl: espaçamentos generosos
*/
/* Nav mobile: hamburger menu */
/* Hero mobile: texto menor (clamp já resolve maioria) */
/* Grid mobile: sempre 1 coluna, exceto dor (2-col a partir de 480px) */
```

### index.html
```html
<!-- Estrutura obrigatória: -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <!-- Meta charset + viewport + description + title + OG tags + JSON-LD -->
  <!-- Preconnect Google Fonts -->
  <!-- Google Fonts link com display=swap -->
  <!-- CSS CRÍTICO INLINE: tokens.css + base.css + nav + hero (above-fold) -->
  <!-- Demais CSS carregados como: media="print" onload="this.media='all'" -->
</head>
<body>
  <!-- Barra de progresso de leitura: #reading-progress (div vazio, estilizado por CSS) -->
  
  <header> <!-- NAV sticky --> </header>
  
  <main>
    <section id="hero">...</section>
    <section id="abertura">...</section>
    <section id="dor">...</section>
    <section id="solucao">...</section>
    <section id="beneficios">...</section>
    <section id="prova-social">...</section>
    <section id="oferta">...</section>
    <section id="objecoes">...</section>
    <section id="garantia">...</section>
    <section id="urgencia">...</section>
    <section id="faq">...</section>
    <section id="cta-final">...</section>
    <section id="ps">...</section>
  </main>
  
  <footer>...</footer>
  
  <!-- Scripts defer no final do body -->
  <script src="js/main.js" defer></script>
  <script src="js/animations.js" defer></script>
  <script src="js/ui.js" defer></script>
</body>
</html>
```

### main.js
```js
// Responsabilidade: inicializar tudo
// import/require não disponível — usar funções globais
// DOMContentLoaded → chamar:
//   initAnimations()    (de animations.js)
//   initAccordion()     (de ui.js)
//   initParallax()      (de ui.js)
//   initReadingProgress() (de ui.js)
//   initCounter()       (de animations.js)
//   initSmoothScroll()  (de ui.js)
```

### animations.js
```js
// 1. initAnimations():
//    - Pegar todos os .reveal
//    - Criar IntersectionObserver com threshold 0.15, rootMargin '0px 0px -60px 0px'
//    - Ao intersectar: adicionar .revealed
//    - Chamar observer.observe(el) em cada .reveal
//
// 2. initHeroSplitText():
//    - Pegar .hero__headline
//    - Dividir em spans por linha já definida no HTML (usar .hero-line)
//    - Adicionar delay progressivo via CSS custom property ou data-delay
//
// 3. initCounter(el, target, duration):
//    - Usar IntersectionObserver (triggerOnce = true)
//    - easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
//    - requestAnimationFrame para suavidade
//    - Formatar como "+500"
```

### ui.js
```js
// 1. initReadingProgress():
//    - Pegar #reading-progress
//    - window.addEventListener('scroll', handler, { passive: true })
//    - Calcular: scrollY / (document.body.scrollHeight - window.innerHeight) * 100
//    - Setar width via style.width
//
// 2. initParallax():
//    - Pegar todos .parallax-leaf
//    - scroll listener passivo + requestAnimationFrame
//    - Aplicar transform: translateY() com fator do data-parallax-factor
//    - Usar will-change: transform no CSS de .parallax-leaf
//
// 3. initAccordion():
//    - Pegar todos .accordion__trigger
//    - Click handler: toggle .accordion__item--open na .accordion__item pai
//    - Para abrir: medir .accordion__body scrollHeight, setar max-height
//    - Para fechar: max-height = 0
//    - Transição CSS no .accordion__body: max-height 350ms ease, overflow hidden
//    - Apenas 1 aberto por vez (fechar os outros ao abrir um)
//    - Girar ícone: rotateZ(45deg) no estado aberto
//
// 4. initSmoothScroll():
//    - Verificar se scroll-behavior: smooth é suportado
//    - Se não: polyfill manual com requestAnimationFrame + easeInOutCubic
//    - Para qualquer href="#*": interceptar click e animar manualmente
//
// 5. initMobileMenu():
//    - Toggle .nav--open na nav ao clicar no hamburger
//    - Fechar ao clicar em qualquer link ou fora do menu
//    - Bloquear scroll do body quando menu está aberto (overflow: hidden no body)
```

---

## ORNAMENTO BOTÂNICO SVG

Use este SVG inline para os ornamentos decorativos de fundo:

```svg
<svg class="botanical-ornament" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M80,270 C75,220 55,180 40,120 C40,120 30,80 45,30" 
        stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M80,270 C72,215 65,175 72,110 C72,110 70,65 80,20" 
        stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M80,270 C85,220 95,185 100,120 C100,120 108,75 100,28" 
        stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/>
  <path d="M80,270 C88,230 105,195 120,140 C120,140 135,95 130,45" 
        stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/>
  <!-- Á geométrico -->
  <path d="M100,260 L125,160 L150,260" 
        stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M110,230 L140,230" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <!-- Acento -->
  <path d="M120,148 L128,132" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```

**Classes CSS para ornamentos:**
```css
.botanical-ornament {
  position: absolute;
  color: var(--color-gold);
  opacity: 0.09;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}
.botanical-ornament--hero    { bottom: -2rem; right: -2rem; width: clamp(180px, 25vw, 360px); }
.botanical-ornament--solucao { top: -2rem; right: 0; width: clamp(200px, 28vw, 400px); opacity: 0.15; }
.botanical-ornament--oferta  { bottom: 0; left: -2rem; width: clamp(160px, 22vw, 320px); transform: scaleX(-1); }
.botanical-ornament--cta     { top: 50%; right: 5%; transform: translateY(-50%); width: clamp(200px, 30vw, 450px); opacity: 0.07; }
```

---

## SPEC TÉCNICO DO BOTÃO CTA (TRECHO CSS COMPLETO)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 2rem;
  background: var(--color-gold);
  color: #ffffff;
  font-family: var(--font-label);
  font-weight: 300;
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
  text-decoration: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-base), 
              box-shadow var(--transition-base),
              transform var(--transition-base);
  position: relative;
  overflow: hidden;
}

.btn-primary::after {
  content: '→';
  display: inline-block;
  transition: transform var(--transition-base);
}

.btn-primary:hover {
  background: var(--color-gold-dark);
  box-shadow: var(--shadow-gold);
  transform: translateY(-2px);
}

.btn-primary:hover::after {
  transform: translateX(6px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 4px;
}

/* Variação outline para fundos escuros */
.btn-outline {
  background: transparent;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
}
.btn-outline:hover {
  background: var(--color-gold);
  color: #ffffff;
}
```

---

## SEÇÕES COM CLIP-PATH (TRANSIÇÃO DIAGONAL)

Para criar a transição em ângulo entre seções brancas e coloridas:

```css
/* Seção com clip diagonal na borda inferior */
.section--clip-bottom {
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
  margin-bottom: -4rem;
  padding-bottom: calc(var(--section-py) + 4rem);
}

/* Seção com clip diagonal na borda superior */
.section--clip-top {
  clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%);
  margin-top: -4rem;
  padding-top: calc(var(--section-py) + 4rem);
}
```

**Onde aplicar:**
- HERO → ABERTURA: hero tem `.section--clip-bottom`
- DOR → SOLUÇÃO: seção dor tem `.section--clip-bottom`
- SOLUÇÃO → BENEFÍCIOS: solução tem `.section--clip-bottom`
- PROVA SOCIAL → OFERTA: prova social tem `.section--clip-bottom`

---

## PROMPT MASTER PARA EXECUÇÃO

Ao abrir a pasta no Claude Code, use exatamente este prompt:

```
Leia o COPY.md, o SPEC.md e o CLAUDE.md antes de escrever qualquer linha de código.

Implemente a landing page completa do Instituto Ávita seguindo fielmente os três arquivos.

REGRA CRÍTICA DE COPY: Todo o texto da página está no COPY.md. Copie palavra por palavra. Não invente, resuma ou reescreva nenhum texto. Se um bloco não tiver texto no COPY.md, deixe um comentário HTML <!-- [INSERIR] --> e avance.

Crie todos os arquivos da estrutura definida, na seguinte ordem:
1. css/tokens.css
2. css/base.css
3. css/layout.css
4. css/components.css
5. css/animations.css
6. css/responsive.css
7. js/animations.js
8. js/ui.js
9. js/main.js
10. assets/images/ (criar SVG placeholders para as logos)
11. index.html (por último — referencia todos os demais)

Demais regras críticas:
- Zero bibliotecas externas
- Zero valores hardcoded (tudo via CSS variables de tokens.css)
- Todos os botões apontam para o link do WhatsApp definido em CLAUDE.md
- O index.html inclui CSS crítico inline e carrega o restante de forma assíncrona
- Implementar todas as animações listadas (IntersectionObserver, split-text, contador, parallax, accordion, progresso de leitura)
- O ornamento botânico SVG deve aparecer nas seções indicadas
- Responsivo mobile-first com todos os breakpoints do SPEC.md
- Semântica HTML correta (header, main, section, footer, nav)
```

---

## NOTAS DE REVISÃO PÓS-ENTREGA

Após o Claude Code terminar, verificar:

1. **Abrir no browser:** `open index.html` ou live-server
2. **Conferir mobile:** DevTools → 375px (iPhone SE)
3. **Testar accordion:** Objeções e FAQ devem abrir/fechar suavemente
4. **Testar animações:** Scrollar devagar e ver entradas
5. **Testar CTAs:** Cada botão deve abrir o WhatsApp na nova aba
6. **Conferir logos:** As 3 imagens placeholder devem estar referenciadas corretamente
7. **Lighthouse:** Rodar audit (Performance, Accessibility, SEO, Best Practices)
8. **Conferir copy:** Cada seção deve ter o texto exato do SPEC.md

---

*Spec criado em: Junho 2025 | Versão 1.0*
