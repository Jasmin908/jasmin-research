import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { subjectIds } from './data/subjects';
import { difficultyIds, publicationTypeIds } from './data/types';

/**
 * Publications: one Markdown (.md) or MDX (.mdx) file each, in
 * src/content/publications/<lang>/<slug>.md. See PUBLISHING.md.
 */
const publications = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    /** One or two sentences for cards, search results and SEO. */
    description: z.string().max(260),
    /** The abstract shown at the top of the article. */
    abstract: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    lang: z.enum(['en', 'de']),
    type: z.enum(publicationTypeIds),
    subjects: z.array(z.enum(subjectIds)).min(1),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Jasmin Loeffel'),
    /** Shown on the home page under "Featured". */
    featured: z.boolean().default(false),
    /** Drafts are left out of the build. */
    draft: z.boolean().default(false),
    /** Marks placeholder content with a visible notice. */
    example: z.boolean().default(false),
    /** Optional level, shown in the article header. */
    difficulty: z.enum(difficultyIds).optional(),
    /** Shows a short note that AI helped write the article. */
    aiAssisted: z.boolean().default(false),
    /** Same value in both language versions links them as translations. */
    translationKey: z.string().optional(),
    /** Path of a PDF in /public, e.g. /papers/my-paper.pdf */
    pdf: z.string().startsWith('/').optional(),
    /** Cite in the text with [@id]. Numbered in this order. */
    references: z
      .array(
        z.object({
          id: z.string(),
          authors: z.string(),
          year: z.union([z.string(), z.number()]),
          title: z.string(),
          source: z.string().optional(),
          url: z.url().optional(),
          note: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { publications };
