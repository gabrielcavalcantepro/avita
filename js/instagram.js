/* =========================================================
   instagram.js — Instituto Avita
   Busca os posts recentes em /api/instagram (funcao serverless
   que guarda o token do Meta) e injeta no #instagramGrid.
   ========================================================= */

function initInstagramFeed() {
  var grid = document.getElementById('instagramGrid');
  if (!grid) return;

  fetch('/api/instagram')
    .then(function (res) {
      if (!res.ok) throw new Error('request_failed');
      return res.json();
    })
    .then(function (data) {
      if (!data.posts || !data.posts.length) {
        grid.classList.add('instagram__grid--empty');
        return;
      }
      renderInstagramPosts(grid, data.posts);
    })
    .catch(function () {
      grid.classList.add('instagram__grid--empty');
    });
}

function renderInstagramPosts(grid, posts) {
  posts.forEach(function (post, i) {
    var item = document.createElement('a');
    item.className = 'instagram__post reveal-scale';
    item.setAttribute('data-delay', String((i % 6) + 1));
    item.href = post.permalink;
    item.target = '_blank';
    item.rel = 'noopener noreferrer';
    item.setAttribute('aria-label', 'Ver post no Instagram do Dr. Diego Leite');

    var img = document.createElement('img');
    img.src = post.imageUrl;
    img.alt = post.caption ? post.caption.slice(0, 140) : 'Post do Instagram do Dr. Diego Leite';
    img.loading = 'lazy';
    img.decoding = 'async';

    var overlay = document.createElement('span');
    overlay.className = 'instagram__post-overlay';
    overlay.innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>' +
      '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>' +
      '<circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>' +
      '</svg>';

    item.appendChild(img);
    item.appendChild(overlay);
    grid.appendChild(item);
  });

  observeReveal(grid.querySelectorAll('.reveal-scale'));
}

function observeReveal(elements) {
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('revealed'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(function (el) { observer.observe(el); });
}
