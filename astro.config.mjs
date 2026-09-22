import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// @astrojs/sitemap runs outside the content-collection pipeline, so it has no
// access to astro:content. Read pubDate/updatedDate straight from frontmatter
// to give each post a lastmod instead of shipping a sitemap with none at all.
const postsDir = fileURLToPath(new URL('./src/content/posts/', import.meta.url));
const postDates = new Map();

for (const file of readdirSync(postsDir)) {
  if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
  const slug = file.replace(/\.mdx?$/, '');
  const frontmatter = readFileSync(postsDir + file, 'utf-8').split('---')[1] ?? '';
  const pubDate = frontmatter.match(/^pubDate:\s*(\S+)/m)?.[1];
  const updatedDate = frontmatter.match(/^updatedDate:\s*(\S+)/m)?.[1];
  if (pubDate) postDates.set(slug, new Date(updatedDate ?? pubDate));
}

const latestPostDate = [...postDates.values()].sort((a, b) => b.valueOf() - a.valueOf())[0];

export default defineConfig({
  site: 'https://gregolsky.pl',
  base: '/',
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const slug = path.match(/^\/posts\/([^/]+)\/?$/)?.[1];
        if (slug && postDates.has(slug)) {
          return { ...item, lastmod: postDates.get(slug) };
        }
        if (path === '/' && latestPostDate) {
          return { ...item, lastmod: latestPostDate };
        }
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: true },
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
