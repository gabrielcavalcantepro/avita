/* =========================================================
   ui.js — Instituto Avita
   Parallax, accordion, reading progress, mobile menu,
   comparison slider, carousel, GSAP dores animation
   (nav de entrada e controlada por initIntroOverlay em animations.js)
   ========================================================= */

/* ── Barra de progresso de leitura ── */
function initReadingProgress() {
  var bar = document.getElementById('reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', function () {
    var total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive: true });
}

/* ── Parallax leve ── */
function initParallax() {
  var leaves = document.querySelectorAll('.parallax-leaf');
  var heroMedia = document.querySelector('.hero__media');
  if (!leaves.length && !heroMedia) return;

  var ticking = false;
  function update() {
    var y = window.scrollY;
    leaves.forEach(function (el) {
      var f = parseFloat(el.getAttribute('data-parallax-factor') || '-0.08');
      el.style.transform = 'translateY(' + (y * f) + 'px)';
    });
    if (heroMedia) heroMedia.style.transform = 'translateY(' + (y * -0.06) + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* ── Accordion ── */
function initAccordion() {
  var triggers = document.querySelectorAll('.accordion__trigger');
  if (!triggers.length) return;

  triggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      var item = trigger.closest('.accordion__item');
      var body = item.querySelector('.accordion__body');
      var isOpen = item.classList.contains('accordion__item--open');

      // Fechar todos os itens abertos
      var allItems = document.querySelectorAll('.accordion__item--open');
      allItems.forEach(function(openItem) {
        openItem.classList.remove('accordion__item--open');
        var openBody = openItem.querySelector('.accordion__body');
        if (openBody) openBody.style.maxHeight = '0';
      });

      // Abrir o item clicado se estava fechado
      if (!isOpen) {
        item.classList.add('accordion__item--open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ── Mobile menu ── */
function initMobileMenu() {
  var nav = document.getElementById('site-nav');
  var hamburger = document.querySelector('.nav__hamburger');
  var mobileMenu = document.querySelector('.nav__mobile-menu');
  if (!nav || !hamburger) return;

  hamburger.addEventListener('click', function() {
    var isOpen = nav.classList.toggle('nav--open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fechar ao clicar num link
  if (mobileMenu) {
    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Fechar ao clicar fora
  document.addEventListener('click', function(e) {
    if (nav.classList.contains('nav--open') &&
        !nav.contains(e.target)) {
      nav.classList.remove('nav--open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Carousel antes/depois ── */
function initCarousel() {
  var carousel = document.getElementById('antesDepoisCarousel');
  if (!carousel) return;

  var track = carousel.querySelector('.carousel__track');
  var dots = carousel.querySelectorAll('.carousel__dot');
  var prevBtn = document.querySelector('.carousel__btn--prev');
  var nextBtn = document.querySelector('.carousel__btn--next');
  var slides = carousel.querySelectorAll('.carousel__slide');
  var current = 0;
  var total = slides.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function(dot, i) {
      dot.classList.toggle('carousel__dot--active', i === current);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { goTo(i); });
  });

  // Touch swipe
  var startX = 0;
  var isDragging = false;

  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    isDragging = false;
  });
}

/* ── Comparison slider ── */
function initComparisonSliders() {
  var sliders = document.querySelectorAll('.comparison-slider');
  if (!sliders.length) return;

  sliders.forEach(function(slider) {
    var antesEl = slider.querySelector('.comparison-slider__antes');
    var handleEl = slider.querySelector('.comparison-slider__handle');
    var isDragging = false;

    function setPosition(x) {
      var rect = slider.getBoundingClientRect();
      var percent = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
      antesEl.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
      handleEl.style.left = percent + '%';
    }

    slider.addEventListener('mousedown', function(e) {
      e.preventDefault(); // evita selecao de texto do navegador ao arrastar
      isDragging = true;
      setPosition(e.clientX);
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    document.addEventListener('mouseup', function() {
      isDragging = false;
    });

    slider.addEventListener('touchstart', function(e) {
      isDragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', function() {
      isDragging = false;
    });
  });
}
