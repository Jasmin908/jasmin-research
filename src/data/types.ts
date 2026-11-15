import type { Localized } from '../i18n/config';

/** Kinds of publication. Used for the `type` field and the library filter. */
export const publicationTypes = {
  paper: { en: 'Research paper', de: 'Forschungsarbeit' },
  review: { en: 'Literature review', de: 'Literaturübersicht' },
  summary: { en: 'Summary', de: 'Zusammenfassung' },
  notes: { en: 'Study notes', de: 'Lernnotizen' },
  language: { en: 'Language materials', de: 'Sprachmaterial' },
  investigation: { en: 'Investigation', de: 'Untersuchung' },
} satisfies Record<string, Localized<string>>;

export type PublicationType = keyof typeof publicationTypes;
export const publicationTypeIds = Object.keys(publicationTypes) as [PublicationType, ...PublicationType[]];
