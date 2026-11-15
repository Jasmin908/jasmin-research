// Turns citation keys like [@sagan1980] or [@kant1781; @hume1748] into
// numbered links to the reference list of the same publication.
//
// The numbers follow the order of `references` in the frontmatter, so the
// list at the end of the article and the markers in the text always agree.
import { visit, SKIP } from 'unist-util-visit';

const CITATION = /\[(@[\w:-]+(?:\s*;\s*@[\w:-]+)*)\]/g;

/**
 * Rehype plugin: gives the GFM footnote heading the language of the
 * publication ("Footnotes" / "Fussnoten").
 */
export function rehypeFootnoteLabel() {
  const labels = { en: 'Footnotes', de: 'Fussnoten' };
  return (tree, file) => {
    const lang = file.data?.astro?.frontmatter?.lang;
    const label = labels[lang];
    if (!label) return;
    visit(tree, 'element', (node) => {
      if (node.properties?.id === 'footnote-label') node.children = [{ type: 'text', value: label }];
    });
  };
}

export default function remarkCitations() {
  return (tree, file) => {
    const frontmatter = file.data?.astro?.frontmatter ?? {};
    const references = Array.isArray(frontmatter.references) ? frontmatter.references : [];
    const numbers = new Map(references.map((ref, index) => [ref.id, index + 1]));

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined || !CITATION.test(node.value)) return;
      CITATION.lastIndex = 0;

      const parts = [];
      let last = 0;
      for (const match of node.value.matchAll(CITATION)) {
        if (match.index > last) parts.push({ type: 'text', value: node.value.slice(last, match.index) });

        const keys = match[1].split(';').map((key) => key.trim().slice(1));
        const children = [{ type: 'text', value: '[' }];
        keys.forEach((key, i) => {
          if (i > 0) children.push({ type: 'text', value: ', ' });
          const number = numbers.get(key);
          if (!number) {
            file.message(`Unknown citation key "@${key}" – add it to "references" in the frontmatter.`);
            children.push({ type: 'text', value: `?${key}` });
            return;
          }
          children.push({
            type: 'link',
            url: `#ref-${key}`,
            children: [{ type: 'text', value: String(number) }],
            data: { hProperties: { className: ['cite'], 'aria-label': `Reference ${number}` } },
          });
        });
        children.push({ type: 'text', value: ']' });

        parts.push({
          type: 'emphasis',
          children,
          data: { hName: 'span', hProperties: { className: ['citation'] } },
        });
        last = match.index + match[0].length;
      }
      if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });

      parent.children.splice(index, 1, ...parts);
      return [SKIP, index + parts.length];
    });
  };
}
