# Publishing workflow

Every publication is a single Markdown file. Add a file, commit, push – Cloudflare
Pages rebuilds the site and the new publication appears in the library, on its
topic pages, on the home page, in the RSS feed and in the sitemap.

## 1. Create the file

The quickest way:

```bash
npm run new -- "The title of my paper" --lang en --type paper --subject astronomy
```

This creates `src/content/publications/en/the-title-of-my-paper.md` as a
**draft**. Options:

| Option | Values |
| --- | --- |
| `--lang` | `en`, `de` |
| `--type` | `paper`, `review`, `summary`, `notes`, `language`, `investigation`, `explanation`, `guide` |
| `--subject` | `astronomy`, `psychology`, `linguistics`, `philosophy`, `history`, `computer-science`, `artificial-intelligence`, `physics` |
| `--mdx` | create an `.mdx` file (allows components such as `<Callout>`) |

You can also copy [`src/content/publications/_template.md`](src/content/publications/_template.md)
by hand. Files whose name starts with `_` are ignored.

The file name becomes the URL:

- `src/content/publications/en/my-paper.md` → `/en/publications/my-paper/`
- `src/content/publications/de/meine-arbeit.md` → `/publikationen/meine-arbeit/`

## 2. Fill in the frontmatter

```yaml
---
title: 'My paper'
description: 'One or two sentences for cards, search and search engines (max. 260 characters).'
abstract: 'Optional longer abstract shown at the top of the article.'
date: 2026-11-15          # publication date
updated: 2026-12-01       # optional, shown as “Updated”
lang: en                  # en or de – must match the folder
type: paper               # see the table above
subjects: [astronomy, history]   # one or more
tags: [exoplanets, radiation]    # optional, searchable
featured: false           # true = shown under “Featured” on the home page (newest 3)
draft: true               # drafts only appear in `npm run dev`
pdf: /papers/my-paper.pdf # optional – put the file in public/papers/
translationKey: my-paper  # optional – same value in both language versions
difficulty: beginner      # optional – beginner | intermediate | advanced, shown as “Level”
aiAssisted: true          # optional – shows a short note that AI helped write the article
references:               # optional – cite with [@id] in the text
  - id: sagan1980
    authors: 'Sagan, C.'
    year: 1980
    title: 'Cosmos'
    source: 'Random House'
    url: 'https://…'      # optional
---
```

If something is missing or misspelled (for example an unknown subject), the
build stops with a message that names the file and the field.

## 3. Write

Standard Markdown, plus:

- **Maths** with KaTeX: inline `$E = mc^2$`, display blocks with `$$ … $$`.
- **Citations**: `[@sagan1980]` or `[@a; @b]` become numbered links to the
  reference list, numbered in the order of `references`.
- **Footnotes**: `text[^1]` and `[^1]: The note.` at the end.
- **Tables, code blocks** (with syntax highlighting), quotes, images.
- Headings `##` and `###` build the table of contents automatically.

In `.mdx` files you can also use, without importing:

```mdx
<Callout type="note" title="Key idea">…</Callout>   {/* note | definition | warning */}
<Figure src="/images/chart.png" alt="…" caption="Figure 1. …" />
<Zh>你好</Zh>  <Ja>日本語</Ja>                      {/* Chinese / Japanese text with the right glyphs */}
<KanaChart script="hiragana" />                    {/* or "katakana": the 46 basic kana */}
<FrameworkVsLibrary />                             {/* the library-vs-framework diagram */}

<Exercise>
1. A question…

<Fragment slot="answers">
1. The answer… (hidden until the reader opens it)
</Fragment>
</Exercise>
```

Diagrams for the GitHub and Cloudflare guides: `<GitWorkflow />`, `<BranchMerge />`,
`<RequestFlow />` and `<DeployPipeline />`.

The labels of `<Exercise>`, `<KanaChart>`, `<FrameworkVsLibrary>` and the diagrams
follow the language of the page automatically.

### Screenshots

```mdx
<Screenshot
  name="github-new-repository"
  alt="What the image shows, for screen readers"
  caption="What readers should notice"
  capture="Instructions for taking the screenshot"
/>
```

The image is looked up by `name` in `src/assets/screenshots/` (`.png`, `.jpg` or
`.webp`). To add or replace a screenshot, save the file there under that name;
the article does not change. Images are converted to WebP in several sizes, and
readers can click them to see the full-size version.

- While the file is missing, `npm run dev` shows a placeholder with the capture
  instructions, and `npm run build` **fails** for a published article, so a
  placeholder can never go live. Drafts are not built, so they are not affected.
- Screenshots used only by drafts are removed from the build output
  automatically (`src/plugins/prune-unused-screenshots.mjs`).
- Before saving a screenshot, crop or blur personal data: names, email
  addresses, account IDs, tokens.

Images go in `public/images/` and are referenced as `/images/name.png`.

## 4. Translations (optional)

A publication does not need a translation. If you write one, put it in the other
language folder and give both files the same `translationKey`. The site then
links the two versions, uses the right version in each language's library, and
sets the `hreflang` tags for search engines. Without a translation the language
switcher on that article leads to the other language's library.

## 5. Preview and publish

```bash
npm run dev       # http://localhost:4321 – drafts visible
npm run build     # the same build Cloudflare runs; stops on errors
```

Set `draft: false`, then commit and push. Done.

## Adding a new subject

Add an entry to [`src/data/subjects.ts`](src/data/subjects.ts) (id, icon, names
and description in both languages). The topic pages, filters and the About page
pick it up automatically.
