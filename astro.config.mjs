import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkCitations, { rehypeFootnoteLabel } from './src/plugins/remark-citations.mjs';

// The public address, used for canonical links, hreflang, RSS and the sitemap.
// - SITE_URL, if set, wins (e.g. for a custom domain later).
// - Otherwise the Cloudflare Pages address is used, for every build.
const site = process.env.SITE_URL ?? 'https://jasmin-research.pages.dev';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    // The unified (remark/rehype) pipeline, so KaTeX and the citation plugin
    // run on both .md and .mdx publications.
    processor: unified({
      remarkPlugins: [remarkMath, remarkCitations],
      rehypePlugins: [[rehypeKatex, { strict: 'ignore' }], rehypeFootnoteLabel],
    }),
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
    },
  },
});
