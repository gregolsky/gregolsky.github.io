// Legacy redirect: /articles/<slug>.html → /posts/<slug>/
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
};

export const GET: APIRoute = ({ params }) => {
  const url = `/posts/${params.slug}/`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${url}"><link rel="canonical" href="${url}"></head><body><a href="${url}">Redirecting…</a></body></html>`;
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
