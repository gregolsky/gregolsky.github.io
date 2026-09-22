// Legacy Harp URLs (2015–2026): /articles/<slug>.html → /posts/<slug>/
// Hardcoded on purpose: only these 4 articles ever existed on the old site.
// Do NOT switch this to getCollection() — every new post would grow a
// crawlable /articles/<slug>.html twin that never actually existed.
import type { APIRoute, GetStaticPaths } from 'astro';

const LEGACY_SLUGS = ['paycode', 'trying-out-harp', 'tslint-rulez', 'apps-launcher-2-0'];

export const getStaticPaths: GetStaticPaths = () => {
  return LEGACY_SLUGS.map((slug) => ({ params: { slug } }));
};

export const GET: APIRoute = ({ params, site }) => {
  const url = new URL(`/posts/${params.slug}/`, site).toString();
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${url}"><link rel="canonical" href="${url}"></head><body><a href="${url}">Redirecting…</a></body></html>`;
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
