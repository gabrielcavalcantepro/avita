/* =========================================================
   animations.js — Instituto Avita
   ========================================================= */

/*
 * Intro overlay — mascara derivada 100% de window.scrollY, sem GSAP/ScrollTrigger:
 * a overlay e um retangulo solido dourado com a logo recortada como mascara,
 * mostrando o video da hero atras dela. Ao rolar (0 -> 80vh), o recorte da logo
 * cresce e a overlay perde opacidade em paralelo, ate sumir por completo.
 * A hero fica sticky (position: sticky) atras da overlay (z-index 9999) dentro de um
 * .hero-sticky-wrapper de 260vh.
 */
function initIntroOverlay() {
  var overlay       = document.getElementById('intro-overlay');
  var logoGroup     = document.getElementById('intro-logo-group');
  var scrollHint    = overlay ? overlay.querySelector('.overlay__scroll-hint') : null;
  var heroWrapper   = document.querySelector('.hero-sticky-wrapper');
  var hero          = document.getElementById('hero');
  var nav           = document.getElementById('site-nav');

  if (!overlay || !logoGroup || !hero || !heroWrapper) return;

  var heroContentVisible = false;
  var heroSnapActive = false;
  var navVisible = false;
  var revealTimers = [];

  function showNav() {
    if (!nav || navVisible) return;
    navVisible = true;
    nav.style.transition = 'none';
    nav.style.opacity = '0';
    nav.style.visibility = 'visible';
    nav.style.transform = 'translateY(-100%)';
    nav.classList.remove('nav--hidden');
    nav.classList.add('scrolled');
    void nav.offsetWidth; /* forca reflow para a transicao pegar do estado oculto */
    nav.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    nav.style.opacity = '1';
    nav.style.transform = 'translateY(0)';
  }

  function hideNav() {
    if (!nav || !navVisible) return;
    navVisible = false;
    nav.style.transition = 'none';
    nav.style.opacity = '0';
    nav.style.visibility = 'hidden';
    nav.style.transform = 'translateY(-100%)';
    nav.classList.add('nav--hidden');
    nav.classList.remove('scrolled');
  }

  function clearRevealTimers() {
    revealTimers.forEach(function (id) { clearTimeout(id); });
    revealTimers = [];
  }

  /* entrada: dispara quando a overlay some por completo, com o stagger de 150ms */
  function showHeroContent() {
    if (heroContentVisible) return;
    heroContentVisible = true;
    clearRevealTimers();

    var els = hero.querySelectorAll('.reveal, .reveal-scale');
    els.forEach(function (el, i) {
      revealTimers.push(setTimeout(function () { el.classList.add('revealed'); }, i * 150));
    });
  }

  /* saida: dispara quando o usuario rola de volta e a overlay reaparece */
  function hideHeroContent() {
    if (!heroContentVisible) return;
    heroContentVisible = false;
    clearRevealTimers();

    var els = hero.querySelectorAll('.reveal, .reveal-scale');
    els.forEach(function (el) { el.classList.remove('revealed'); });
  }

  /* prefers-reduced-motion: sem animacao, mostra tudo direto */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    overlay.style.display = 'none';
    showNav();
    showHeroContent();
    return;
  }

  /* LW/CX/CY: largura natural e centro visual da logo, no espaco dos paths do SVG */
  var LW = 376, CX = 188, CY = 156.5;
  var vw, vh, bufferEnd, initialScale, finalScale;

  function computeBreakpoints() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    /* mobile: gestos de arrastar cobrem muito mais pixels por vez que um
       "tick" de scroll wheel no desktop, entao o mesmo buffer de 0.8vh
       faz o recorte crescer rapido demais com pouco scroll. Dobrar a
       distancia no mobile deixa a sensibilidade equivalente. */
    var isMobile = vw <= 767;
    bufferEnd = vh * (isMobile ? 1.6 : 0.8);

    /* largura inicial da logo: entre 200px e 360px, proporcional a viewport */
    var initialWidth = Math.min(Math.max(vw * 0.45, 200), 360);
    initialScale = initialWidth / LW;

    /* escala final: crescimento suave e decorativo (a revelacao real e
       via opacidade do overlay, nao mais via mascara cortando um recorte) */
    finalScale = initialScale * 1.35;
  }
  computeBreakpoints();

  function updateIntro() {
    var y = window.scrollY;
    var p = Math.min(y / bufferEnd, 1);

    /* a logo cresce suavemente (ease-out) mantendo-se centrada na viewport */
    var s = initialScale + (finalScale - initialScale) * Math.pow(p, 0.6);
    var tx = vw / 2 - CX * s;
    var ty = vh / 2 - CY * s;
    logoGroup.setAttribute('transform', 'translate(' + tx.toFixed(2) + ',' + ty.toFixed(2) + ') scale(' + s.toFixed(4) + ')');

    /* overlay perde opacidade conforme o scroll avanca, revelando a hero atras */
    overlay.style.opacity = String(1 - p);
    if (scrollHint) scrollHint.style.opacity = String(Math.max(0, 1 - p * 3));

    /* navbar so comeca a aparecer na metade do fade */
    var navT = Math.max(0, (p - 0.5) / 0.5);
    if (navT > 0) { showNav(); } else { hideNav(); }

    if (y >= bufferEnd) {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      showHeroContent();
    } else {
      overlay.style.pointerEvents = 'auto';
      hideHeroContent();
    }
  }

  /* "mina trava": ao subir perto do fim do sticky, encaixa a hero perfeitamente na tela */
  function checkSnap(scrollDir) {
    if (!heroContentVisible || heroSnapActive || scrollDir !== 'up') return;

    var y = window.scrollY;
    var snapPoint = heroWrapper.offsetHeight - window.innerHeight;
    var snapZone = window.innerHeight * 0.15;

    if (y > snapPoint && y < snapPoint + snapZone) {
      heroSnapActive = true;
      window.scrollTo(0, snapPoint);
      setTimeout(function () { heroSnapActive = false; }, 800);
    }
  }

  var lastScrollY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    var scrollDir = y < lastScrollY ? 'up' : 'down';
    lastScrollY = y;
    updateIntro();
    checkSnap(scrollDir);
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      computeBreakpoints();
      updateIntro();
    }, 200);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  updateIntro();
}

/* ── Reveal de seções ── */
function initAnimations() {
  /* elementos dentro de #hero sao revelados/escondidos por showHeroContent()/hideHeroContent(), na intro overlay */
  var els = Array.prototype.filter.call(
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale'),
    function (el) { return !el.closest('#hero'); }
  );
  if (!els.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach(function (el) { obs.observe(el); });
}

/* ── Contador ── */
function initCounter() {
  var els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;

  var easeOut = function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); };

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el      = entry.target;
      var target  = parseInt(el.getAttribute('data-counter'), 10);
      var prefix  = el.getAttribute('data-counter-prefix') || '+';
      var start   = null;
      var dur     = 2000;

      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = prefix + Math.round(easeOut(p) * target);
        if (p < 1) requestAnimationFrame(step); else el.textContent = prefix + target;
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(function (el) { obs.observe(el); });
}
