# jasmin-research
A personal collection of research papers, study notes, and summaries exploring a wide range of subjects and ideas.

**Jasmin Loeffel · Research** is a bilingual (German / English) personal research
journal and knowledge library – astronomy, psychology, languages, philosophy,
history, computer science and whatever comes next. It shares its visual identity
with the [developer portfolio](https://jasmin-loeffel.pages.dev).

Built with [Astro](https://astro.build), TypeScript, Content Collections,
Markdown/MDX and KaTeX. Fully static, deployed on Cloudflare Pages.

## Writing

See **[PUBLISHING.md](PUBLISHING.md)** – in short:

```bash
npm run new -- "Title" --lang en --type paper --subject astronomy
```

then write Markdown in the created file, set `draft: false`, commit and push.

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview  # serve dist/ locally
npm run check    # type-check
npm run og       # re-render public/og.png
```

## Structure

```
src/
  content/publications/{en,de}/  the publications (Markdown / MDX)
  content.config.ts              frontmatter schema
  data/                          site details, subjects, publication types
  i18n/                          languages, URL segments, interface texts
  views/                         one component per page type
  pages/[...path].astro          builds every page in every language
  components/  layouts/  styles/  scripts/  plugins/
public/
  papers/                        downloadable PDFs
```

| Page | German | English |
| --- | --- | --- |
| Home | `/` | `/en/` |
| Library (search & filters) | `/publikationen/` | `/en/publications/` |
| Publication | `/publikationen/<slug>/` | `/en/publications/<slug>/` |
| Topics | `/themen/`, `/themen/<subject>/` | `/en/topics/`, `/en/topics/<subject>/` |
| About | `/ueber-mich/` | `/en/about/` |

Plus `/rss.xml`, `/sitemap-index.xml` and `/robots.txt`.

## Deploying to Cloudflare Pages

Connect the GitHub repository in Cloudflare → Workers & Pages → Create → Pages:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable (optional) | `SITE_URL` = the final address, e.g. a custom domain |

Without `SITE_URL`, canonical links and the sitemap use
`https://jasmin-research.pages.dev`. The Node version comes from `.node-version`;
caching headers from `public/_headers`.

## Licence

- **Code**: MIT – see [LICENSE](LICENSE).
- **Written content** (everything in `src/content/`, the PDFs in `public/papers/`
  and the site's texts): © Jasmin Loeffel, **all rights reserved** – see
  [CONTENT-LICENSE.md](CONTENT-LICENSE.md). The MIT licence does not apply to it.
