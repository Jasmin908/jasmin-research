import { getCollection, type CollectionEntry } from 'astro:content';
import { publicationPath, type Locale } from '../i18n/config';
import type { SubjectId } from '../data/subjects';

export type Publication = CollectionEntry<'publications'>;

/** File name without the language folder, e.g. "en/my-paper" → "my-paper". */
export function slugOf(entry: Publication): string {
  return entry.id.split('/').pop()!;
}

export function urlOf(entry: Publication): string {
  return publicationPath(entry.data.lang, slugOf(entry));
}

/** Every published entry, newest first. Drafts only show up in `astro dev`. */
export async function getPublications(): Promise<Publication[]> {
  const entries = await getCollection('publications', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const groupKey = (entry: Publication) => entry.data.translationKey ?? entry.id;

/** The other language versions of a publication. */
export function translationsOf(entry: Publication, all: Publication[]): Publication[] {
  if (!entry.data.translationKey) return [];
  return all.filter((other) => other.id !== entry.id && groupKey(other) === groupKey(entry));
}

/**
 * One entry per publication for an interface language: the version in that
 * language if there is one, otherwise the original. Keeps translated works
 * from appearing twice in lists.
 */
export function forLocale(all: Publication[], locale: Locale): Publication[] {
  const chosen = new Map<string, Publication>();
  for (const entry of all) {
    const key = groupKey(entry);
    const current = chosen.get(key);
    if (!current || (current.data.lang !== locale && entry.data.lang === locale)) chosen.set(key, entry);
  }
  return all.filter((entry) => chosen.get(groupKey(entry)) === entry);
}

/** Languages a publication is available in, its own first. */
export function languagesOf(entry: Publication, all: Publication[]): Locale[] {
  return [entry.data.lang, ...translationsOf(entry, all).map((t) => t.data.lang)];
}

export function bySubject(entries: Publication[], subject: SubjectId): Publication[] {
  return entries.filter((entry) => entry.data.subjects.includes(subject));
}

/** Publications that share the most subjects and tags, newest first on ties. */
export function relatedTo(entry: Publication, candidates: Publication[], limit = 3): Publication[] {
  const excluded = new Set([entry.id, ...translationsOf(entry, candidates).map((t) => t.id)]);
  return candidates
    .filter((other) => !excluded.has(other.id))
    .map((other) => ({
      other,
      score:
        other.data.subjects.filter((s) => entry.data.subjects.includes(s)).length * 3 +
        other.data.tags.filter((t) => entry.data.tags.includes(t)).length +
        (other.data.type === entry.data.type ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.other.data.date.valueOf() - a.other.data.date.valueOf())
    .slice(0, limit)
    .map(({ other }) => other);
}

/** Minutes to read, from the raw Markdown body (math and code count lightly). */
export function readingTime(entry: Publication): number {
  const text = (entry.body ?? '')
    .replace(/```[\s\S]*?```/g, ' code ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' formula ')
    .replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
