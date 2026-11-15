/**
 * Locale configuration: the single place that decides which interface
 * languages exist and what their URLs look like.
 *
 * Like the portfolio, German lives at the root and English under /en/.
 * To make English the default instead, swap the two `base` values.
 *
 * Publications are written in one language each (frontmatter `lang`) and
 * live under the URL of that language. A translation is optional.
 */
export const locales = {
  de: {
    htmlLang: 'de-CH',
    ogLocale: 'de_CH',
    label: 'DE',
    name: 'Deutsch',
    base: '/',
    segments: { publications: 'publikationen', topics: 'themen', about: 'ueber-mich' },
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_GB',
    label: 'EN',
    name: 'English',
    base: '/en/',
    segments: { publications: 'publications', topics: 'topics', about: 'about' },
  },
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'de';
export const localeCodes = Object.keys(locales) as Locale[];

/** A value that must exist in every language. */
export type Localized<T> = Record<Locale, T>;

export type Section = keyof (typeof locales)['de']['segments'];

export function homePath(locale: Locale): string {
  return locales[locale].base;
}

export function sectionPath(locale: Locale, section: Section): string {
  return `${locales[locale].base}${locales[locale].segments[section]}/`;
}

export function publicationPath(locale: Locale, slug: string): string {
  return `${sectionPath(locale, 'publications')}${slug}/`;
}

export function topicPath(locale: Locale, subject: string): string {
  return `${sectionPath(locale, 'topics')}${subject}/`;
}

/** The same page in every language, for hreflang and the switcher. */
export function alternatesFor(build: (locale: Locale) => string): Record<Locale, string> {
  return Object.fromEntries(localeCodes.map((code) => [code, build(code)])) as Record<Locale, string>;
}

export function formatDate(date: Date, locale: Locale, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat(locales[locale].htmlLang, {
    dateStyle: style === 'long' ? 'long' : 'medium',
    timeZone: 'UTC',
  }).format(date);
}
