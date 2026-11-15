import type { Locale } from './config';

/** Interface texts. Both languages must have the same keys (checked by TypeScript). */
const en = {
  nav: {
    label: 'Main',
    home: 'Home',
    publications: 'Library',
    topics: 'Topics',
    about: 'About',
    portfolio: 'Portfolio',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
    skip: 'Skip to content',
    brand: 'Research',
  },
  footer: {
    content: 'Written content © {years} Jasmin Loeffel. All rights reserved.',
    code: 'Site code under the MIT licence.',
    copyright: 'Copyright',
    rss: 'RSS',
    top: 'Back to top',
  },
  meta: {
    homeTitle: 'Jasmin Loeffel · Research – a personal knowledge library',
    homeDescription:
      'Research papers, literature reviews, summaries and study notes by Jasmin Loeffel – on astronomy, psychology, languages, philosophy, history and computer science.',
    ogAlt: 'Jasmin Loeffel · Research – a personal knowledge library',
    libraryTitle: 'My Library – Jasmin Loeffel · Research',
    libraryDescription:
      'A collection of my research papers, summaries and study notes on different subjects, searchable by topic, format and language.',
    topicsTitle: 'Explore by Topic – Jasmin Loeffel · Research',
    topicsDescription: 'Explore my writing by subject: from science and psychology to languages, history and beyond.',
    aboutTitle: 'About – Jasmin Loeffel · Research',
    aboutDescription:
      'A little about me: a software development apprentice with a curiosity for all kinds of subjects, and how I approach learning and research.',
  },
  home: {
    eyebrow: 'Personal research journal · since 2026',
    titleLead: 'A collection of curiosity, research,',
    titleAccent: 'and everything in between.',
    intro:
      'I’ve always enjoyed learning about different subjects and exploring questions that interest me. This website is where I collect my research, notes and summaries, both to document what I’ve learned and to share it with anyone who might find it interesting.',
    ctaPrimary: 'Browse the library',
    ctaSecondary: 'My approach',
    statPublications: 'Publications',
    statSubjects: 'Subjects',
    statLanguages: 'Languages',
    featuredLabel: 'Featured',
    featuredTitle: 'Featured writing',
    recentLabel: 'Latest',
    recentTitle: 'Latest additions',
    recentAll: 'All publications',
    subjectsLabel: 'Subjects',
    subjectsTitle: 'Explore topics',
    subjectsText: 'From science and psychology to languages, history and beyond. Explore my writing by subject.',
  },
  library: {
    label: 'Library',
    title: 'My Library',
    intro:
      'Here you’ll find a collection of my research papers, summaries and study notes on different subjects. Feel free to explore whatever interests you.',
    search: 'Search',
    searchPlaceholder: 'Search titles, abstracts, tags…',
    subject: 'Topic',
    type: 'Format',
    language: 'Language',
    sort: 'Sort',
    allSubjects: 'All topics',
    allTypes: 'All formats',
    allLanguages: 'All languages',
    newest: 'Newest first',
    oldest: 'Oldest first',
    alphabetical: 'Title A–Z',
    results: '{n} publications',
    resultsOne: '1 publication',
    empty: 'No results found. Try changing your search or filters.',
    reset: 'Clear filters',
  },
  card: {
    read: 'Read',
    minutes: '{n} min read',
    alsoIn: 'Also in',
    example: 'Example',
  },
  article: {
    by: 'By',
    published: 'Published',
    updated: 'Updated',
    readingTime: 'Reading time',
    minutes: '{n} min',
    language: 'Language',
    abstract: 'Abstract',
    contents: 'On this page',
    references: 'References',
    cite: 'How to cite this work',
    copy: 'Copy citation',
    copied: 'Copied',
    pdf: 'Download PDF',
    related: 'You might also be interested in',
    translation: 'Also available in {lang}',
    readTranslation: 'Read in {lang}',
    example:
      'This is an example article created to demonstrate the website’s layout and features. It is not part of my published research or study notes.',
    rights: '© {year} {author}. All rights reserved. This text is not covered by the MIT licence of the site’s code.',
    back: 'Library',
    subjects: 'Subjects',
    tags: 'Tags',
    accessed: 'Retrieved from',
  },
  topics: {
    label: 'Topics',
    title: 'Explore by Topic',
    intro:
      'My interests cover a variety of subjects, and this is where I organise them. Whether you’re interested in science, languages, psychology or something else, you can explore my writing by topic.',
    count: '{n} publications',
    countOne: '1 publication',
    countNone: 'No publications yet',
    empty: 'I haven’t published anything on this topic yet.',
    inLibrary: 'View in Library',
    all: 'All topics',
  },
  notFound: {
    title: 'Page not found.',
    text: 'The page you’re looking for might have been moved or no longer exists. You can return to the homepage or explore the library instead.',
    cta: 'Go to the English home page',
    library: 'Explore the library',
  },
  languages: { en: 'English', de: 'German' },
};

type Dictionary = typeof en;

const de: Dictionary = {
  nav: {
    label: 'Hauptnavigation',
    home: 'Startseite',
    publications: 'Bibliothek',
    topics: 'Themen',
    about: 'Über mich',
    portfolio: 'Portfolio',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schliessen',
    language: 'Sprache',
    skip: 'Zum Inhalt springen',
    brand: 'Research',
  },
  footer: {
    content: 'Texte © {years} Jasmin Loeffel. Alle Rechte vorbehalten.',
    code: 'Code der Website unter MIT-Lizenz.',
    copyright: 'Urheberrecht',
    rss: 'RSS',
    top: 'Nach oben',
  },
  meta: {
    homeTitle: 'Jasmin Loeffel · Research – eine persönliche Wissensbibliothek',
    homeDescription:
      'Forschungsarbeiten, Literaturübersichten, Zusammenfassungen und Lernnotizen von Jasmin Loeffel – zu Astronomie, Psychologie, Sprachen, Philosophie, Geschichte und Informatik.',
    ogAlt: 'Jasmin Loeffel · Research – eine persönliche Wissensbibliothek',
    libraryTitle: 'Meine Bibliothek – Jasmin Loeffel · Research',
    libraryDescription:
      'Eine Sammlung meiner Recherchen, Zusammenfassungen und Lernnotizen zu verschiedenen Themen, durchsuchbar nach Thema, Format und Sprache.',
    topicsTitle: 'Themen entdecken – Jasmin Loeffel · Research',
    topicsDescription: 'Meine Beiträge nach Themengebieten entdecken: von Wissenschaft und Psychologie über Sprachen bis zur Geschichte.',
    aboutTitle: 'Über mich – Jasmin Loeffel · Research',
    aboutDescription:
      'Ein bisschen über mich: meine Ausbildung in der Applikationsentwicklung, meine Neugier für ganz unterschiedliche Themen und meine Herangehensweise ans Lernen und Recherchieren.',
  },
  home: {
    eyebrow: 'Persönliches Forschungsjournal · seit 2026',
    titleLead: 'Eine Sammlung aus Neugier, Recherche',
    titleAccent: 'und allem, was dazwischenliegt.',
    intro:
      'Ich habe schon immer gerne Neues gelernt und mich mit Fragen beschäftigt, die mich interessieren. Auf dieser Website sammle ich meine Recherchen, Notizen und Zusammenfassungen. So kann ich festhalten, was ich gelernt habe, und mein Wissen mit anderen teilen, die sich vielleicht für dieselben Themen interessieren.',
    ctaPrimary: 'Zur Bibliothek',
    ctaSecondary: 'Meine Herangehensweise',
    statPublications: 'Publikationen',
    statSubjects: 'Fachgebiete',
    statLanguages: 'Sprachen',
    featuredLabel: 'Empfohlen',
    featuredTitle: 'Ausgewählte Beiträge',
    recentLabel: 'Neu',
    recentTitle: 'Neueste Beiträge',
    recentAll: 'Alle Publikationen',
    subjectsLabel: 'Themen',
    subjectsTitle: 'Themen entdecken',
    subjectsText:
      'Von Wissenschaft und Psychologie über Sprachen und Geschichte bis hin zu vielen weiteren Themen. Entdecke meine Beiträge nach Themengebieten.',
  },
  library: {
    label: 'Bibliothek',
    title: 'Meine Bibliothek',
    intro:
      'Hier findest du eine Sammlung meiner Recherchen, Zusammenfassungen und Lernnotizen zu verschiedenen Themen. Schau dich gerne um und entdecke, was dich interessiert.',
    search: 'Suche',
    searchPlaceholder: 'Titel, Abstracts, Schlagwörter durchsuchen…',
    subject: 'Thema',
    type: 'Format',
    language: 'Sprache',
    sort: 'Sortierung',
    allSubjects: 'Alle Themen',
    allTypes: 'Alle Formate',
    allLanguages: 'Alle Sprachen',
    newest: 'Neueste zuerst',
    oldest: 'Älteste zuerst',
    alphabetical: 'Titel A–Z',
    results: '{n} Publikationen',
    resultsOne: '1 Publikation',
    empty: 'Keine Ergebnisse gefunden. Versuche, deine Suche oder die Filter anzupassen.',
    reset: 'Filter zurücksetzen',
  },
  card: {
    read: 'Lesen',
    minutes: '{n} Min. Lesezeit',
    alsoIn: 'Auch auf',
    example: 'Beispiel',
  },
  article: {
    by: 'Von',
    published: 'Veröffentlicht',
    updated: 'Aktualisiert',
    readingTime: 'Lesezeit',
    minutes: '{n} Min.',
    language: 'Sprache',
    abstract: 'Abstract',
    contents: 'Auf dieser Seite',
    references: 'Quellenverzeichnis',
    cite: 'So zitierst du diesen Beitrag',
    copy: 'Zitat kopieren',
    copied: 'Kopiert',
    pdf: 'PDF herunterladen',
    related: 'Das könnte dich auch interessieren',
    translation: 'Auch auf {lang} verfügbar',
    readTranslation: 'Auf {lang} lesen',
    example:
      'Dies ist ein Beispielartikel, der die Gestaltung und Funktionen der Website zeigt. Er gehört nicht zu meinen eigenen veröffentlichten Recherchen oder Lernnotizen.',
    rights: '© {year} {author}. Alle Rechte vorbehalten. Dieser Text fällt nicht unter die MIT-Lizenz des Website-Codes.',
    back: 'Bibliothek',
    subjects: 'Themen',
    tags: 'Schlagwörter',
    accessed: 'Abrufbar unter',
  },
  topics: {
    label: 'Themen',
    title: 'Themen entdecken',
    intro:
      'Ich interessiere mich für viele verschiedene Themen, und hier habe ich meine Beiträge nach Themengebieten geordnet. Ob Wissenschaft, Sprachen, Psychologie oder etwas ganz anderes – hier kannst du entdecken, worüber ich geschrieben habe.',
    count: '{n} Publikationen',
    countOne: '1 Publikation',
    countNone: 'Noch keine Beiträge',
    empty: 'Zu diesem Thema habe ich bisher noch nichts veröffentlicht.',
    inLibrary: 'In der Bibliothek ansehen',
    all: 'Alle Themen',
  },
  notFound: {
    title: 'Seite nicht gefunden.',
    text: 'Die gesuchte Seite wurde möglicherweise verschoben oder existiert nicht mehr. Du kannst zur Startseite zurückkehren oder stattdessen die Bibliothek erkunden.',
    cta: 'Zur deutschen Startseite',
    library: 'Bibliothek erkunden',
  },
  languages: { en: 'Englisch', de: 'Deutsch' },
};

const dictionaries: Record<Locale, Dictionary> = { en, de };

export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Fills {placeholders} in a text. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

/** "1 publication" / "{n} publications". */
export function count(n: number, one: string, many: string, none?: string): string {
  if (n === 0 && none) return none;
  return n === 1 ? one : fill(many, { n });
}
