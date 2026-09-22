// Legacy Harp build artifact: /feed.xml.html → /rss.xml
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const url = new URL('/rss.xml', site).toString();
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${url}"><link rel="canonical" href="${url}"></head><body><a href="${url}">Redirecting…</a></body></html>`;
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
