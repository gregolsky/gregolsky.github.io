# gregolsky.pl

Personal blog of Grzegorz Lachowski. Static Astro 4 site, Tailwind 3, deployed to GitHub Pages at
https://gregolsky.pl (`public/CNAME`).

## Commands

- `npm run dev` — dev server on http://localhost:4321
- `npm run check` — `astro check` (types + templates); must report 0 errors
- `npm run build` — static build into `dist/`
- `npm run preview` — serve `dist/`

Run `check` and `build` before committing. There are no tests.

## Deploy

Push to `master` → `.github/workflows/deploy.yml` builds and deploys to GitHub Pages. There is no
staging; `master` is production. Commit or push only when asked.

## Layout

- `src/content/posts/*.md|mdx` — posts (content collection, schema in `src/content/config.ts`).
  The file name is the slug: `/posts/<slug>`.
- `src/assets/articles/` — post images, optimized by Astro. Name them `<slug>.<ext>` for the cover
  and `<slug>-<descriptor>.<ext>` for inline images. Reference them as `../../assets/articles/...`.
- `public/images/` — unoptimized static images (hero background, OG image).
- `src/pages/` — routes. `posts/[slug].astro` renders posts; `rss.xml.ts` is the feed.
- `src/layouts/`, `src/components/` — `BaseLayout`, `ArticleLayout`, header (with the Conway's
  Game of Life canvas), cards, footer.
- `tailwind.config.mjs` — `brand` colors (`night`, `dusk`, `fog`, `paper`, `glow`) and fonts
  (Space Grotesk, Source Serif 4). Use these tokens, not raw colors.

## Legacy URLs — don't break them

The old site served `/articles/<slug>.html`, `/about.html` and `/feed.xml`. These still work via
`src/pages/articles/[slug].html.ts`, `about.html.ts` and `feed.xml.ts` (meta-refresh redirects and an
RSS alias). Renaming a post slug breaks inbound links; avoid it.

## Posts

- Frontmatter: `title`, `description`, `pubDate`, optional `updatedDate`, `cover` + `coverAlt`,
  `tags`, `draft`. Set `pubDate` to the actual publish day.
- `/new-post` (`.claude/commands/new-post.md`) is the drafting workflow. Use it for new posts.
- Cover images: dark, high-contrast, cinematic, no text. Generate them with Codex
  (`codex exec -s workspace-write`, prompt via stdin when attaching images with `-i`) and save
  straight into `src/assets/articles/`.
- Embeds (Spotify, Instagram) go in as raw HTML in the Markdown.
- HTML comments in Markdown end up in the built page. Remove `TODO` comments before publishing.

## Dependencies

- Stay on Astro 4 / Tailwind 3 until a deliberate major upgrade.
- `@astrojs/sitemap` is pinned to exactly `3.6.0`: 3.6.1+ needs Astro 5 and crashes the build.
  Unpin it as part of the Astro upgrade.
- `astro check` rejects HTML comments inside JSX expressions in `.astro` files. Put them outside
  the `{...}`.

## Writing style for blog posts (`src/content/posts/`)

Write like a person, not like a model.

- Short sentences. Each one is complete and makes sense on its own.
- Plain English. Explain technical things in everyday words; skip jargon the reader doesn't need.
- The reader never has to backtrack. Don't open a sentence with "That", "This" or "It" when it's unclear what it points to. Name the thing again.
- No rhetorical contrast tricks: "Today it's X, tomorrow it's Y", "X wants A before B can have any", "not because X, but because Y", "X instead of Y" as a punchline.
- No dramatic one-word or one-line paragraphs ("Almost.") and no slogan sentences ("The website is the app.").
- No chains of clauses glued with "and", "because", "so". Split them.
- Cut fluff: details the reader will be bored by, side tracks, checklists of what was done.
- Don't invent anecdotes, feelings or opinions for the author. Use facts from the source (commits, notes), or ask.
