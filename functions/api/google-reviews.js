/* =========================================================
   functions/api/google-reviews.js — Cloudflare Pages Function
   GET /api/google-reviews — retorna as avaliacoes do Google
   Meu Negocio (Instituto Avita) para exibir no front-end.

   Este endpoint NUNCA chama a Places API diretamente. Ele so
   le o valor mais recente gravado no KV pelo worker separado
   workers/google-reviews-sync (que roda 1x/dia via Cron
   Trigger). Isso existe porque:

   1. Places API New com o campo "reviews" cai no tier
      Enterprise + Atmosphere (o mais caro) — chamar isso a
      cada visita do site custaria dinheiro sem necessidade,
      ja que reviews do Google nao mudam a cada minuto.
   2. Cloudflare Pages Functions nao suportam Cron Triggers
      (so Workers standalone suportam) — por isso o fetch
      periodico vive num Worker separado, nao aqui.

   KV_NAMESPACE precisa ser configurado no dashboard do
   Cloudflare Pages (Settings > Functions > KV namespace
   bindings), com o binding chamado GOOGLE_REVIEWS_KV,
   apontando pro MESMO namespace usado no wrangler.jsonc do
   worker de sync. Nenhum secret/API key e necessario aqui —
   essa function so le KV.
   ========================================================= */

const KV_KEY = 'reviews';
const CACHE_SECONDS = 3600;

const EMPTY_PAYLOAD = {
  status: 'unavailable',
  fetchedAt: null,
  displayName: null,
  rating: null,
  userRatingCount: null,
  googleMapsUri: null,
  reviews: [],
};

export async function onRequestGet(context) {
  const cache = caches.default;
  const cacheKey = new Request(context.request.url, context.request);

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const kv = context.env.GOOGLE_REVIEWS_KV;
  if (!kv) {
    // Binding nao configurado ainda — nao e um erro do visitante,
    // so retorna o payload vazio pro front-end mostrar o fallback.
    return jsonResponse(EMPTY_PAYLOAD, 200, CACHE_SECONDS);
  }

  try {
    const stored = await kv.get(KV_KEY, 'json');
    if (!stored) {
      // Cron ainda nao rodou pela primeira vez (ou expirou/foi limpo).
      return jsonResponse(EMPTY_PAYLOAD, 200, CACHE_SECONDS);
    }

    const response = jsonResponse({ status: 'ok', ...stored }, 200, CACHE_SECONDS);
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    return jsonResponse(EMPTY_PAYLOAD, 200, CACHE_SECONDS);
  }
}

function jsonResponse(body, status, cacheSeconds) {
  const headers = { 'Content-Type': 'application/json' };
  if (cacheSeconds) headers['Cache-Control'] = `public, max-age=${cacheSeconds}`;
  return new Response(JSON.stringify(body), { status, headers });
}
