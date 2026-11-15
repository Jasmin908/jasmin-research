import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { subjects } from '../data/subjects';
import { getPublications, urlOf } from '../lib/publications';

// One feed for the whole library, in both languages.
export const GET: APIRoute = async (context) => {
  const publications = await getPublications();
  return rss({
    title: site.title,
    description: 'Research papers, reviews, summaries and study notes by Jasmin Loeffel.',
    site: context.site!,
    trailingSlash: true,
    items: publications.map((entry) => ({
      title: entry.data.title,
      description: entry.data.abstract ?? entry.data.description,
      pubDate: entry.data.date,
      link: urlOf(entry),
      author: entry.data.author,
      categories: entry.data.subjects.map((s) => subjects[s].name.en),
      customData: `<dc:language>${entry.data.lang}</dc:language>`,
    })),
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
    customData: `<copyright>© ${site.since} ${site.name}. All rights reserved.</copyright>`,
  });
};
