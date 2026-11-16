// Astro integration: after the build, delete screenshot files that no page
// refers to.
//
// <Screenshot> finds images with import.meta.glob, so Vite copies every file in
// src/assets/screenshots/ into dist/_astro/, even when only a draft uses it
// (drafts are not built) and even though pages link to optimised WebP copies,
// not the original. This step removes those unreferenced copies, so
// screenshots for unpublished drafts never go online. Files that a built page
// uses are referenced in the HTML and stay untouched.
import { readdir, readFile, rm } from 'node:fs/promises';
import { extname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const TEXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.webmanifest']);

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries.filter((e) => e.isFile()).map((e) => join(e.parentPath ?? e.path, e.name));
}

export default function pruneUnusedScreenshots({ source = 'src/assets/screenshots' } = {}) {
  let root;
  return {
    name: 'prune-unused-screenshots',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = fileURLToPath(config.root);
      },
      'astro:build:done': async ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        let names;
        try {
          names = (await readdir(join(root, source))).map((f) => parse(f).name);
        } catch {
          return; // no screenshots folder
        }
        if (names.length === 0) return;

        const all = await files(out);
        // Emitted files look like <name>.<hash>.<ext> or <name>.<hash>_<variant>.<ext>.
        const candidates = all.filter((f) => {
          const base = parse(f).base;
          return names.some((n) => base.startsWith(`${n}.`)) && !TEXT.has(extname(f));
        });
        if (candidates.length === 0) return;

        let text = '';
        for (const f of all) if (TEXT.has(extname(f))) text += await readFile(f, 'utf8');

        const unused = candidates.filter((f) => !text.includes(parse(f).base));
        await Promise.all(unused.map((f) => rm(f)));
        if (unused.length) logger.info(`removed ${unused.length} screenshot file(s) not used by any built page`);
      },
    },
  };
}
