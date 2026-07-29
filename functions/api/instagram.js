/* =========================================================
   functions/api/instagram.js — Cloudflare Pages Function
   GET /api/instagram — retorna os posts mais recentes do
   Instagram do Dr. Diego Leite (@drdiegotavaresleite1).

   O token de acesso vive apenas aqui, como secret de ambiente
   (IG_ACCESS_TOKEN) configurado no dashboard do Cloudflare
   Pages — nunca no HTML/JS enviado ao navegador.
   ========================================================= */

const GRAPH_API_VERSION = 'v21.0';
const IG_USERNAME = 'drdiegotavaresleite1';
const POST_LIMIT = 6;
const CACHE_SECONDS = 3600;

export async function onRequestGet(context) {
  const cache = caches.default;
  const cacheKey = new Request(context.request.url, context.request);

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const token = context.env.IG_ACCESS_TOKEN;
  if (!token) {
    return jsonResponse({ error: 'missing_token' }, 500);
  }

  try {
    const igUserId = await resolveIgUserId(token);
    if (!igUserId) {
      return jsonResponse({ error: 'ig_account_not_found' }, 502);
    }

    const mediaRes = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media` +
        `?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp` +
        `&limit=${POST_LIMIT}&access_token=${encodeURIComponent(token)}`
    );
    const mediaData = await mediaRes.json();

    if (mediaData.error) {
      return jsonResponse({ error: mediaData.error.message }, 502);
    }

    const posts = (mediaData.data || [])
      .filter((item) => item.media_type !== 'CAROUSEL_ALBUM' || item.media_url || item.thumbnail_url)
      .slice(0, POST_LIMIT)
      .map((item) => ({
        id: item.id,
        caption: item.caption || '',
        permalink: item.permalink,
        imageUrl: item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url,
        timestamp: item.timestamp,
      }));

    const response = jsonResponse({ posts }, 200, CACHE_SECONDS);
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    return jsonResponse({ error: 'internal_error' }, 500);
  }
}

async function resolveIgUserId(token) {
  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/me/accounts` +
      `?fields=instagram_business_account{id,username}&access_token=${encodeURIComponent(token)}`
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  const pages = data.data || [];
  const match = pages.find(
    (page) =>
      page.instagram_business_account &&
      page.instagram_business_account.username === IG_USERNAME
  );

  return match ? match.instagram_business_account.id : null;
}

function jsonResponse(body, status, cacheSeconds) {
  const headers = { 'Content-Type': 'application/json' };
  if (cacheSeconds) headers['Cache-Control'] = `public, max-age=${cacheSeconds}`;
  return new Response(JSON.stringify(body), { status, headers });
}
