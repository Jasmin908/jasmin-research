// Creates a new publication file with all frontmatter fields filled in.
//
//   npm run new -- "My new paper"                 → English, research paper
//   npm run new -- "Mein Text" --lang de --type notes --subject history
//   npm run new -- "Interactive piece" --mdx      → .mdx instead of .md
//
// The file is created as a draft; set `draft: false` to publish it.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const title = args.find((arg, i) => !arg.startsWith('--') && !args[i - 1]?.startsWith('--'));

if (!title) {
  console.error('Usage: npm run new -- "Title" [--lang en|de] [--type paper|review|summary|notes|language|investigation] [--subject astronomy] [--mdx]');
  process.exit(1);
}

const lang = option('lang', 'en');
const type = option('type', 'paper');
const subject = option('subject', 'astronomy');
const ext = args.includes('--mdx') ? 'mdx' : 'md';
const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/ß/g, 'ss')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const today = new Date().toISOString().slice(0, 10);

const dir = fileURLToPath(new URL(`../src/content/publications/${lang}/`, import.meta.url));
const file = `${dir}${slug}.${ext}`;
if (existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

writeFileSync(
  file,
  `---
title: '${title.replace(/'/g, "''")}'
description: 'One or two sentences for cards, search and search engines.'
abstract: 'Optional. A longer summary shown at the top of the article.'
date: ${today}
lang: ${lang}
type: ${type}
subjects: [${subject}]
tags: []
featured: false
draft: true
# translationKey: same-value-in-both-language-versions
# pdf: /papers/${slug}.pdf
references: []
#  - id: author2024
#    authors: 'Author, A.'
#    year: 2024
#    title: 'Title of the work'
#    source: 'Journal, 1(2), 3–4'
#    url: 'https://…'
---

Write the introduction here. Cite a source with [@author2024].

## First section

Inline maths like $E = mc^2$, or a display formula:

$$
\\int_0^1 x^2 \\, dx = \\frac{1}{3}
$$
`,
);

console.log(`Created ${file}`);
console.log('It is a draft: visible with `npm run dev`, left out of the build until you set draft: false.');
