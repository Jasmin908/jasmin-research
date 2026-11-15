import type { Localized } from '../i18n/config';

/** Kinds of publication. Used for the `type` field and the library filter. */
export const publicationTypes = {
  paper: { en: 'Research paper', de: 'Forschungsarbeit' },
  review: { en: 'Literature review', de: 'Literaturübersicht' },
  summary: { en: 'Summary', de: 'Zusammenfassung' },
  notes: { en: 'Study notes', de: 'Lernnotizen' },
  language: { en: 'Language materials', de: 'Sprachmaterial' },
  investigation: { en: 'Investigation', de: 'Untersuchung' },
  explanation: { en: 'Explanation', de: 'Erklärung' },
  guide: { en: 'Learning guide', de: 'Lernleitfaden' },
} satisfies Record<string, Localized<string>>;

export type PublicationType = keyof typeof publicationTypes;

/** Optional difficulty level of a publication (frontmatter `difficulty`). */
export const difficulties = {
  beginner: { en: 'Beginner', de: 'Einsteiger' },
  intermediate: { en: 'Intermediate', de: 'Mittelstufe' },
  advanced: { en: 'Advanced', de: 'Fortgeschritten' },
} satisfies Record<string, Localized<string>>;

export type Difficulty = keyof typeof difficulties;
export const difficultyIds = Object.keys(difficulties) as [Difficulty, ...Difficulty[]];
export const publicationTypeIds = Object.keys(publicationTypes) as [PublicationType, ...PublicationType[]];
