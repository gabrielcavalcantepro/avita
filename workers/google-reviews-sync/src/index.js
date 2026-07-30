/* =========================================================
   workers/google-reviews-sync — Cloudflare Worker (standalone,
   separado do projeto Cloudflare Pages do site).

   Roda 1x por dia via Cron Trigger, busca os dados do Google
   Business Profile do Instituto Avita via Places API (New) e
   grava um resumo normalizado no KV. Existe como Worker
   separado (nao como Pages Function) porque Cloudflare Pages
   nao suporta Cron Triggers — so Workers standalone suportam.

   O campo "reviews" da Places API New cai no tier Enterprise +
   Atmosphere (o mais caro dessa API), entao ele SO e buscado
   aqui, 1x/dia, nunca a partir do front-end nem da Pages
   Function que serve o site (functions/api/google-reviews.js
   so le o KV que este worker escreve — nunca chama a Places
   API, e por isso nunca precisa da API key).

   A Places API New retorna no maximo 5 reviews por lugar, sem
   paginacao — e limite do proprio Google, nao ha como pedir
   mais nem "contornar" isso.
   ========================================================= */

const KV_KEY = 'reviews';
const FIELD_MASK = 'displayName,rating,userRatingCount,reviews,googleMapsUri';

export default {
  async scheduled(controller, env, ctx) {
    ctx.waitUntil(syncReviews(env));
  },
};

async function syncReviews(env) {
  try {
    const url = `https://places.googleapis.com/v1/places/${env.GOOGLE_PLACE_ID}?languageCode=pt-BR`;
    const res = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': FIELD_MASK,
      },
    });

    if (!res.ok) {
      console.error('google-reviews-sync: places api error', res.status, await res.text());
      return;
    }

    const place = await res.json();

    const normalized = {
      fetchedAt: new Date().toISOString(),
      displayName: place.displayName?.text || null,
      rating: place.rating ?? null,
      userRatingCount: place.userRatingCount ?? null,
      googleMapsUri: place.googleMapsUri || null,
      reviews: (place.reviews || []).map((r) => ({
        authorName: r.authorAttribution?.displayName || 'Paciente Google',
        authorPhotoUri: r.authorAttribution?.photoUri || null,
        rating: r.rating ?? null,
        relativeTime: r.relativePublishTimeDescription || '',
        text: r.text?.text || '',
        publishTime: r.publishTime || null,
      })),
    };

    // TTL de 3 dias: se o cron parar de rodar por algum motivo, o KV expira
    // sozinho e a Pages Function volta a servir o fallback (em vez de
    // mostrar avaliacoes de semanas atras sem ninguem perceber o problema).
    await env.GOOGLE_REVIEWS_KV.put(KV_KEY, JSON.stringify(normalized), {
      expirationTtl: 60 * 60 * 24 * 3,
    });
  } catch (err) {
    console.error('google-reviews-sync: unexpected error', err);
  }
}
