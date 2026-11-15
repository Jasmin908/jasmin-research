import type { Localized } from '../i18n/config';

/**
 * Subjects of the library. To add a new one, add an entry here – its id can
 * then be used in the `subjects` list of any publication, and a topic page
 * appears automatically. `icon` is one of the names in SubjectIcon.astro.
 */
export const subjects = {
  astronomy: {
    icon: 'orbit',
    name: { en: 'Astronomy & Astrophysics', de: 'Astronomie & Astrophysik' },
    short: { en: 'Astronomy', de: 'Astronomie' },
    description: {
      en: 'Stars, planets, galaxies and the physics that makes sense of them.',
      de: 'Sterne, Planeten, Galaxien und die Physik, die sie erklärt.',
    },
  },
  psychology: {
    icon: 'mind',
    name: { en: 'Psychology', de: 'Psychologie' },
    short: { en: 'Psychology', de: 'Psychologie' },
    description: {
      en: 'How we learn, remember, decide and feel – and how we know.',
      de: 'Wie wir lernen, erinnern, entscheiden und fühlen – und woher wir es wissen.',
    },
  },
  linguistics: {
    icon: 'speech',
    name: { en: 'Languages & Linguistics', de: 'Sprachen & Linguistik' },
    short: { en: 'Languages', de: 'Sprachen' },
    description: {
      en: 'The structure of language, and materials from learning new ones.',
      de: 'Wie Sprache aufgebaut ist, und Material aus dem Lernen neuer Sprachen.',
    },
  },
  philosophy: {
    icon: 'column',
    name: { en: 'Philosophy', de: 'Philosophie' },
    short: { en: 'Philosophy', de: 'Philosophie' },
    description: {
      en: 'Old questions about knowledge, mind and ethics, read closely.',
      de: 'Alte Fragen über Wissen, Geist und Ethik, genau gelesen.',
    },
  },
  history: {
    icon: 'hourglass',
    name: { en: 'History', de: 'Geschichte' },
    short: { en: 'History', de: 'Geschichte' },
    description: {
      en: 'Events, ideas and the sources we reconstruct them from.',
      de: 'Ereignisse, Ideen und die Quellen, aus denen wir sie rekonstruieren.',
    },
  },
  'computer-science': {
    icon: 'code',
    name: { en: 'Computer Science', de: 'Informatik' },
    short: { en: 'Computer Science', de: 'Informatik' },
    description: {
      en: 'Algorithms, systems and the theory underneath everyday code.',
      de: 'Algorithmen, Systeme und die Theorie hinter alltäglichem Code.',
    },
  },
} satisfies Record<string, Subject>;

export interface Subject {
  icon: 'orbit' | 'mind' | 'speech' | 'column' | 'hourglass' | 'code' | 'spark';
  name: Localized<string>;
  short: Localized<string>;
  description: Localized<string>;
}

export type SubjectId = keyof typeof subjects;
export const subjectIds = Object.keys(subjects) as [SubjectId, ...SubjectId[]];
