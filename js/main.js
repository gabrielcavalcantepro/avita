/* =========================================================
   main.js — Instituto Avita
   Inicializacao geral: chama todas as funcoes dos modulos
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
  /* Overlay 100% derivada de window.scrollY. Tambem controla a entrada da navbar e o reveal da hero. */
  initIntroOverlay();

  initAnimations();
  initCounter();
  initParallax();
  initAccordion();
  initMobileMenu();
  initCarousel();
  initComparisonSliders();
  initReadingProgress();
  initInstagramFeed();
});
