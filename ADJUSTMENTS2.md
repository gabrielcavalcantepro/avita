# ADJUSTMENTS2.md — Instituto Ávita
# Novas seções e ajustes adicionais — aplicar após ADJUSTMENTS.md

---

## AJUSTE 1 — Hero: Adicionar logo acima da headline

Na seção `#hero`, adicionar o isotipo da logo **acima** do bloco da headline, como primeiro elemento do container:

```html
<!-- Dentro de #hero .hero__content, ANTES da headline -->
<div class="hero__logo-wrapper">
  <!-- SUBSTITUIR: colocar assets/images/logo-isotipo.svg aqui -->
  <img
    src="assets/images/logo-isotipo.svg"
    alt="Instituto Ávita"
    class="hero__logo"
    width="90"
    height="90"
  >
</div>
```

CSS:
```css
.hero__logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.hero__logo {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

/* Tablet */
@media (max-width: 768px) {
  .hero__logo { width: 72px; height: 72px; }
}

/* Mobile */
@media (max-width: 480px) {
  .hero__logo { width: 60px; height: 60px; }
}
```

---

## AJUSTE 2 — Nova seção: Procedimentos (`#procedimentos`)

**Inserir logo após a seção `#solucao`** (fundo sage) e antes de `#beneficios`.

**Fundo:** `var(--color-white)`
**Padding:** `var(--section-py)` (96px top e bottom)

### HTML completo da seção:

```html
<section id="procedimentos">
  <div class="container">

    <div class="procedimentos__header reveal">
      <h2 class="procedimentos__titulo">
        Cada sorriso tem uma história.<br>
        <em>Cada tratamento, um resultado único.</em>
      </h2>
      <p class="procedimentos__intro">
        No Instituto Ávita, os procedimentos são escolhidos e planejados de forma integrada,
        sempre com foco em devolver função, saúde e beleza ao mesmo tempo.
      </p>
    </div>

    <div class="procedimentos__grid">

      <!-- Card 1: Implante Dentário -->
      <div class="proc-card reveal" data-delay="1">
        <div class="proc-card__icon">
          <!-- Ícone implante: pilar + coroa -->
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="19" y="6" width="10" height="6" rx="2" stroke="currentColor" stroke-width="1.3"/>
            <path d="M19 12h10v4l2 4H17l2-4V12z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <path d="M22 20v20" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M26 20v20" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M20 28h8M19 34h10" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
            <path d="M14 40h20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <h3 class="proc-card__titulo">Implante Dentário</h3>
        <p class="proc-card__texto">
          A solução definitiva para dentes perdidos. O implante dentário reintegra forma,
          função e estética com naturalidade — permitindo mastigar, falar e sorrir com a
          mesma segurança de um dente natural. Com planejamento digital preciso,
          cada implante é posicionado para compor um resultado harmonioso e duradouro.
        </p>
        <ul class="proc-card__lista">
          <li>Resultado natural, permanente e funcional</li>
          <li>Planejamento digital individualizado</li>
          <li>Reabilitação de casos simples e complexos</li>
          <li>Protocolo completo: do implante à prótese</li>
        </ul>
      </div>

      <!-- Card 2: Facetas de Porcelana -->
      <div class="proc-card reveal" data-delay="2">
        <div class="proc-card__icon">
          <!-- Ícone faceta: dente com camada -->
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M16 10c0 0 -2 5 -2 12s2 14 4 18c1 2 2 2 3 2h6c1 0 2 0 3-2 2-4 4-11 4-18s-2-12-2-12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 10h14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M14 22s2-1 5-1 5 1 5 1" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
            <path d="M28 14c2 1 4 4 4 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
          </svg>
        </div>
        <h3 class="proc-card__titulo">Facetas de Porcelana</h3>
        <p class="proc-card__texto">
          A transformação mais completa que um sorriso pode ter. As facetas de porcelana
          corrigem cor, forma, tamanho e proporção dos dentes em um único procedimento,
          com resultado que dura anos e mantém toda a naturalidade. Para quem quer um sorriso
          diferente — e perfeito.
        </p>
        <ul class="proc-card__lista">
          <li>Correção de cor, forma e proporção</li>
          <li>Porcelana de alta resistência e translucidez natural</li>
          <li>Planejamento digital do sorriso antes do procedimento</li>
          <li>Duração de 10 a 20 anos com cuidados adequados</li>
        </ul>
      </div>

      <!-- Card 3: Design do Sorriso -->
      <div class="proc-card reveal" data-delay="3">
        <div class="proc-card__icon">
          <!-- Ícone sorriso/design -->
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="1.3"/>
            <path d="M16 27c2 4 5.5 7 8 7s6-3 8-7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M18 20v1M30 20v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 12L4 8M40 12l4-8" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" opacity="0.5"/>
            <path d="M6 24H2M46 24h-4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" opacity="0.5"/>
          </svg>
        </div>
        <h3 class="proc-card__titulo">Transformação do Sorriso</h3>
        <p class="proc-card__texto">
          Mais do que um procedimento — um planejamento completo de como o seu sorriso
          vai se parecer antes de qualquer intervenção. Com o design digital do sorriso,
          você visualiza o resultado final, alinha expectativas e toma decisões com
          segurança. O resultado final é um sorriso que parece sempre ter sido seu.
        </p>
        <ul class="proc-card__lista">
          <li>Visualização digital antes do tratamento</li>
          <li>Planejamento integrado com harmonização orofacial</li>
          <li>Alinhamento de proporção entre sorriso e rosto</li>
          <li>Resultado personalizado para o seu biotipo</li>
        </ul>
      </div>

    </div><!-- /.procedimentos__grid -->

    <div class="procedimentos__cta reveal">
      <a href="WHATSAPP_LINK" target="_blank" rel="noopener noreferrer" class="btn-primary">
        QUERO CONHECER MEU TRATAMENTO
        <!-- [SVG WhatsApp aqui] -->
      </a>
    </div>

  </div>
</section>
```

### CSS da seção de procedimentos:

```css
/* Procedimentos */
#procedimentos {
  background: var(--color-white);
  padding: var(--section-py) 0;
}

.procedimentos__header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 4rem;
}

.procedimentos__titulo {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  color: var(--color-text);
  line-height: var(--leading-snug);
  margin-bottom: 1.25rem;
  letter-spacing: var(--tracking-tight);
}

.procedimentos__titulo em {
  color: var(--color-gold);
  font-style: italic;
}

.procedimentos__intro {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 300;
  color: var(--color-text-body);
  line-height: var(--leading-relaxed);
}

.procedimentos__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 1024px) {
  .procedimentos__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .procedimentos__grid { grid-template-columns: 1fr; }
}

.proc-card {
  padding: 2.5rem 2rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);
}

.proc-card:hover {
  border-color: var(--color-gold);
  box-shadow: var(--shadow-gold);
  transform: translateY(-4px);
}

.proc-card__icon {
  width: 48px;
  height: 48px;
  color: var(--color-gold);
  margin-bottom: 1.25rem;
}

.proc-card__icon svg {
  width: 100%;
  height: 100%;
}

.proc-card__titulo {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.875rem;
}

.proc-card__texto {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 300;
  color: var(--color-text-body);
  line-height: var(--leading-relaxed);
  margin-bottom: 1.25rem;
}

.proc-card__lista {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid var(--color-divider);
  padding-top: 1.25rem;
}

.proc-card__lista li {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-text-muted);
  padding-left: 1.25rem;
  position: relative;
}

.proc-card__lista li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-gold);
  opacity: 0.7;
}

.procedimentos__cta {
  text-align: center;
  margin-top: 1rem;
}
```

---

## AJUSTE 3 — Substituir seção de depoimentos por Carrossel Antes/Depois

### Sobre as imagens do Instagram
O Instagram bloqueia scraping automatizado — não é possível extrair imagens programaticamente.

**O que o usuário deve fazer:**
1. Acessar `https://www.instagram.com/avita.instituto/` ou `https://www.instagram.com/drdiegotavaresleite1/`
2. Fazer download manual das fotos de antes e depois (salvar pares: antes + depois)
3. Nomear os arquivos como:
   - `antes-01.jpg`, `depois-01.jpg`
   - `antes-02.jpg`, `depois-02.jpg`
   - `antes-03.jpg`, `depois-03.jpg`
   - (até no mínimo 3 pares, ideal 5)
4. Colocar os arquivos em `assets/images/antes-depois/`

### Substituir a seção `#prova-social` por `#antes-depois`

Remover o HTML atual de `#prova-social` e substituir pelo seguinte:

```html
<section id="antes-depois">
  <div class="container">

    <div class="antes-depois__header reveal">
      <h2 class="antes-depois__titulo">Resultados que falam por si</h2>
      <p class="antes-depois__subtitulo">
        Mais de 500 transformações reais. Arraste para ver a diferença.
      </p>
    </div>

    <!-- Carrossel -->
    <div class="carousel" id="antesDepoisCarousel">
      <div class="carousel__track">

        <!-- Slide 1 -->
        <div class="carousel__slide">
          <div class="comparison-slider" data-index="0">
            <div class="comparison-slider__depois">
              <img
                src="assets/images/antes-depois/depois-01.jpg"
                alt="Resultado após tratamento no Instituto Ávita"
                loading="lazy" decoding="async" width="600" height="450"
              >
              <span class="comparison-label comparison-label--depois">Depois</span>
            </div>
            <div class="comparison-slider__antes">
              <img
                src="assets/images/antes-depois/antes-01.jpg"
                alt="Antes do tratamento no Instituto Ávita"
                loading="lazy" decoding="async" width="600" height="450"
              >
              <span class="comparison-label comparison-label--antes">Antes</span>
            </div>
            <div class="comparison-slider__handle">
              <div class="comparison-slider__line"></div>
              <div class="comparison-slider__circle">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H16M8 12L5 9M8 12L5 15M16 12L19 9M16 12L19 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel__slide">
          <div class="comparison-slider" data-index="1">
            <div class="comparison-slider__depois">
              <img src="assets/images/antes-depois/depois-02.jpg" alt="Resultado após tratamento no Instituto Ávita" loading="lazy" decoding="async" width="600" height="450">
              <span class="comparison-label comparison-label--depois">Depois</span>
            </div>
            <div class="comparison-slider__antes">
              <img src="assets/images/antes-depois/antes-02.jpg" alt="Antes do tratamento no Instituto Ávita" loading="lazy" decoding="async" width="600" height="450">
              <span class="comparison-label comparison-label--antes">Antes</span>
            </div>
            <div class="comparison-slider__handle">
              <div class="comparison-slider__line"></div>
              <div class="comparison-slider__circle">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H16M8 12L5 9M8 12L5 15M16 12L19 9M16 12L19 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 3 -->
        <div class="carousel__slide">
          <div class="comparison-slider" data-index="2">
            <div class="comparison-slider__depois">
              <img src="assets/images/antes-depois/depois-03.jpg" alt="Resultado após tratamento no Instituto Ávita" loading="lazy" decoding="async" width="600" height="450">
              <span class="comparison-label comparison-label--depois">Depois</span>
            </div>
            <div class="comparison-slider__antes">
              <img src="assets/images/antes-depois/antes-03.jpg" alt="Antes do tratamento no Instituto Ávita" loading="lazy" decoding="async" width="600" height="450">
              <span class="comparison-label comparison-label--antes">Antes</span>
            </div>
            <div class="comparison-slider__handle">
              <div class="comparison-slider__line"></div>
              <div class="comparison-slider__circle">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H16M8 12L5 9M8 12L5 15M16 12L19 9M16 12L19 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /.carousel__track -->

      <!-- Controles -->
      <button class="carousel__btn carousel__btn--prev" aria-label="Anterior">
        <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="carousel__btn carousel__btn--next" aria-label="Próximo">
        <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>

      <!-- Dots -->
      <div class="carousel__dots">
        <button class="carousel__dot carousel__dot--active" data-index="0" aria-label="Slide 1"></button>
        <button class="carousel__dot" data-index="1" aria-label="Slide 2"></button>
        <button class="carousel__dot" data-index="2" aria-label="Slide 3"></button>
      </div>
    </div><!-- /.carousel -->

    <div class="antes-depois__cta reveal">
      <a href="WHATSAPP_LINK" target="_blank" rel="noopener noreferrer" class="btn-primary">
        QUERO UM RESULTADO ASSIM
        <!-- [SVG WhatsApp aqui] -->
      </a>
    </div>

  </div>
</section>
```

### CSS do carrossel antes/depois (adicionar em components.css):

```css
/* ===== SEÇÃO ANTES/DEPOIS ===== */
#antes-depois {
  background: var(--color-cream);
  padding: var(--section-py) 0;
}

.antes-depois__header {
  text-align: center;
  margin-bottom: 3rem;
}

.antes-depois__titulo {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  color: var(--color-text);
  letter-spacing: var(--tracking-tight);
  margin-bottom: 0.75rem;
}

.antes-depois__subtitulo {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 300;
  color: var(--color-text-muted);
}

.antes-depois__cta {
  text-align: center;
  margin-top: 2.5rem;
}

/* ===== CARROSSEL ===== */
.carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  max-width: 780px;
  margin: 0 auto;
}

.carousel__track {
  display: flex;
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.carousel__slide {
  min-width: 100%;
}

/* ===== COMPARISON SLIDER ===== */
.comparison-slider {
  position: relative;
  overflow: hidden;
  cursor: col-resize;
  user-select: none;
  border-radius: var(--radius-md);
  aspect-ratio: 4/3;
  background: var(--color-forest);
}

.comparison-slider__depois,
.comparison-slider__antes {
  position: absolute;
  inset: 0;
}

.comparison-slider__depois img,
.comparison-slider__antes img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  display: block;
}

.comparison-slider__antes {
  clip-path: inset(0 50% 0 0); /* inicia no meio */
  transition: clip-path 0ms;   /* sem transition — atualizado em tempo real por JS */
}

.comparison-label {
  position: absolute;
  bottom: 1rem;
  font-family: var(--font-label);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  pointer-events: none;
}

.comparison-label--depois {
  right: 1rem;
  background: var(--color-gold);
  color: white;
}

.comparison-label--antes {
  left: 1rem;
  background: rgba(44, 36, 32, 0.7);
  color: var(--color-on-dark);
}

/* Handle (linha de arrasto) */
.comparison-slider__handle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  pointer-events: none;
  z-index: 10;
}

.comparison-slider__line {
  position: absolute;
  inset: 0;
  background: white;
  opacity: 0.9;
}

.comparison-slider__circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  color: var(--color-gold);
}

.comparison-slider__circle svg {
  width: 20px;
  height: 20px;
}

/* Botões prev/next */
.carousel__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: 1px solid var(--color-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  box-shadow: var(--shadow-md);
  transition: background var(--transition-base), border-color var(--transition-base);
  color: var(--color-gold);
}

.carousel__btn:hover {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: white;
}

.carousel__btn svg { width: 20px; height: 20px; }

.carousel__btn--prev { left: -22px; }
.carousel__btn--next { right: -22px; }

/* Dots */
.carousel__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-gold);
  opacity: 0.3;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.carousel__dot--active {
  opacity: 1;
  transform: scale(1.25);
}
```

### JavaScript do carrossel (adicionar em ui.js):

```js
function initAntesDepoisCarousel() {
  const carousel = document.getElementById('antesDepoisCarousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const dots = carousel.querySelectorAll('.carousel__dot');
  const btnPrev = carousel.querySelector('.carousel__btn--prev');
  const btnNext = carousel.querySelector('.carousel__btn--next');
  let current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach(d => d.classList.remove('carousel__dot--active'));
    dots[current].classList.add('carousel__dot--active');
  }

  btnPrev?.addEventListener('click', () => goTo(current - 1));
  btnNext?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Swipe touch
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  // Inicializar comparison sliders
  initComparisonSliders();
}

function initComparisonSliders() {
  document.querySelectorAll('.comparison-slider').forEach(slider => {
    const antes = slider.querySelector('.comparison-slider__antes');
    const handle = slider.querySelector('.comparison-slider__handle');
    let isDragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.min(Math.max(pct, 2), 98);
      antes.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
    }

    slider.addEventListener('mousedown', e => { isDragging = true; setPosition(e.clientX); });
    window.addEventListener('mousemove', e => { if (isDragging) setPosition(e.clientX); });
    window.addEventListener('mouseup', () => { isDragging = false; });

    slider.addEventListener('touchstart', e => { isDragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', e => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
  });
}
```

Adicionar no `main.js` dentro do `DOMContentLoaded`:
```js
initAntesDepoisCarousel(); // de ui.js
```

---

## AJUSTE 4 — Nova seção: Dr. Diego (`#dr-diego`)

**Inserir antes da seção `#oferta`** (fundo forest escuro).

**Fundo:** `var(--color-white)`
**Padding:** `var(--section-py)` (96px)

> ⚠️ IMPORTANTE: Os campos marcados com `[INSERIR ...]` devem ser preenchidos pelo cliente com as informações reais do Dr. Diego. NÃO inventar ou assumir informações de formação acadêmica.

### HTML da seção:

```html
<section id="dr-diego">
  <div class="container">
    <div class="dr-diego__grid">

      <!-- Coluna esquerda: Foto -->
      <div class="dr-diego__foto-col reveal">
        <div class="dr-diego__foto-wrapper">
          <!-- SUBSTITUIR: Colocar foto do Dr. Diego em assets/images/dr-diego.jpg -->
          <img
            src="assets/images/dr-diego.jpg"
            alt="Dr. Diego Leite — Instituto Ávita"
            class="dr-diego__foto"
            loading="lazy"
            decoding="async"
            width="480"
            height="600"
          >
          <!-- Badge com CRO -->
          <div class="dr-diego__cro-badge">
            <span class="dr-diego__cro-label">CRO-CE</span>
            <span class="dr-diego__cro-num">6928 | 14712</span>
          </div>
        </div>
      </div>

      <!-- Coluna direita: Texto -->
      <div class="dr-diego__content reveal" data-delay="1">

        <p class="dr-diego__eyebrow">Conheça quem vai cuidar de você</p>

        <h2 class="dr-diego__nome">Dr. Diego Leite</h2>
        <p class="dr-diego__especialidade">Reabilitação Oral e Harmonização Orofacial</p>

        <div class="dr-diego__bio">
          <p>
            [INSERIR: Texto de apresentação do Dr. Diego — quem ele é, sua trajetória,
            o que o motivou a criar o Instituto Ávita e o que diferencia sua abordagem.
            Sugestão: 3 parágrafos curtos, tom pessoal e acolhedor.]
          </p>
        </div>

        <div class="dr-diego__formacoes">
          <h3 class="dr-diego__formacoes-titulo">Formação e especializações</h3>
          <ul class="dr-diego__lista">
            <li>[INSERIR: Graduação — ex: Cirurgião-Dentista pela Universidade X]</li>
            <li>[INSERIR: Especialização 1 — ex: Especialista em Implantodontia pela Y]</li>
            <li>[INSERIR: Especialização 2 — ex: Especialista em Prótese Dentária pela Z]</li>
            <li>[INSERIR: Formação em Harmonização Orofacial]</li>
            <li>[INSERIR: Outros cursos, certificações, congressos relevantes]</li>
          </ul>
        </div>

        <a href="WHATSAPP_LINK" target="_blank" rel="noopener noreferrer" class="btn-primary">
          AGENDAR COM O DR. DIEGO
          <!-- [SVG WhatsApp aqui] -->
        </a>

      </div><!-- /.dr-diego__content -->

    </div><!-- /.dr-diego__grid -->
  </div>
</section>
```

### CSS da seção Dr. Diego (adicionar em components.css):

```css
/* ===== DR. DIEGO ===== */
#dr-diego {
  background: var(--color-white);
  padding: var(--section-py) 0;
}

.dr-diego__grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: center;
}

@media (max-width: 900px) {
  .dr-diego__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* Foto */
.dr-diego__foto-col { position: relative; }

.dr-diego__foto-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dr-diego__foto {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-md);
  display: block;
}

/* Borda decorativa dourada atrás da foto */
.dr-diego__foto-wrapper::before {
  content: '';
  position: absolute;
  inset: -12px -12px 12px 12px;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  z-index: -1;
}

.dr-diego__cro-badge {
  position: absolute;
  bottom: 1.5rem;
  right: -1rem;
  background: var(--color-gold);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
}

.dr-diego__cro-label {
  font-family: var(--font-label);
  font-size: var(--text-xs);
  font-weight: 200;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  opacity: 0.85;
}

.dr-diego__cro-num {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
}

/* Conteúdo */
.dr-diego__eyebrow {
  font-family: var(--font-label);
  font-size: var(--text-xs);
  font-weight: 200;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 0.75rem;
}

.dr-diego__nome {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 400;
  color: var(--color-text);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  margin-bottom: 0.4rem;
}

.dr-diego__especialidade {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 300;
  color: var(--color-gold);
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}

.dr-diego__bio p {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 300;
  color: var(--color-text-body);
  line-height: var(--leading-relaxed);
  margin-bottom: 1rem;
}

.dr-diego__formacoes {
  margin: 2rem 0 2.5rem;
  padding: 1.75rem;
  background: var(--color-cream);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-gold);
}

.dr-diego__formacoes-titulo {
  font-family: var(--font-label);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.dr-diego__lista {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.dr-diego__lista li {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-text-body);
  line-height: var(--leading-normal);
  padding-left: 1.25rem;
  position: relative;
}

.dr-diego__lista li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-gold);
}
```

---

## CHECKLIST DESTE ARQUIVO

- [ ] Logo do isotipo adicionada acima da headline no hero (90px)
- [ ] Seção `#procedimentos` inserida após `#solucao` com 3 cards e CTA
- [ ] Seção `#prova-social` removida e substituída por `#antes-depois` com carrossel
- [ ] Comparison slider funcional (arrastar para revelar antes/depois)
- [ ] Pasta `assets/images/antes-depois/` criada com 3 pares de placeholders
- [ ] Seção `#dr-diego` inserida antes de `#oferta` com layout 2 colunas
- [ ] Todos os `WHATSAPP_LINK` substituídos pelo link real do CLAUDE.md
- [ ] Animações `.reveal` adicionadas nos elementos das novas seções
- [ ] Hover transitions nos proc-cards e carousel buttons
- [ ] `initAntesDepoisCarousel()` chamado no main.js

---

## ORDEM FINAL DAS SEÇÕES (após todas as alterações)

```
1.  #hero
2.  #abertura
3.  #dor
4.  #solucao         (sage)
5.  #procedimentos   ← NOVO
6.  #beneficios
7.  #antes-depois    ← NOVO (substituiu #prova-social)
8.  #dr-diego        ← NOVO
9.  #oferta          (forest)
10. #garantia        (cream)
11. #faq
12. #cta-final       (forest)
footer
```
