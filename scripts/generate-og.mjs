// Renders the social sharing image (public/og.png). Run with `npm run og`
// after changing the texts below.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="a" cx="88%" cy="8%" r="75%">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity=".7"/>
      <stop offset=".55" stop-color="#3b82f6" stop-opacity=".18"/>
      <stop offset="1" stop-color="#0b0b12" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="t" x1="0" x2="1">
      <stop offset="0" stop-color="#c4b5fd"/>
      <stop offset=".5" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b0b12"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <g stroke="#ffffff" stroke-opacity=".06">
    ${Array.from({ length: 14 }, (_, i) => `<path d="M${i * 90} 0v630"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${i * 90}h1200"/>`).join('')}
  </g>
  <g transform="translate(80 66) scale(2)" fill="none">
    <rect x="1.25" y="1.25" width="29.5" height="29.5" rx="8.5" fill="#8b5cf6" fill-opacity=".14" stroke="#8b5cf6" stroke-width="1.25"/>
    <path d="M14.25 9.25v9a4 4 0 0 1-4 4H8.75M18.5 9.25v13H24" stroke="#f3f2f8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="23.5" cy="10" r="1.75" fill="#b6f36a"/>
  </g>
  <text x="160" y="112" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="34" fill="#f3f2f8">Research</text>
  <g font-family="Segoe UI, Helvetica, Arial, sans-serif" fill="#f3f2f8">
    <text x="80" y="330" font-size="92" font-weight="800" letter-spacing="-4">A personal</text>
    <text x="80" y="432" font-size="92" font-style="italic" font-family="Georgia, 'Times New Roman', serif" fill="url(#t)">knowledge library.</text>
    <text x="80" y="548" font-size="27" fill="#aaa8c0">Jasmin Loeffel  ·  Papers, reviews, summaries &amp; study notes</text>
  </g>
  <circle cx="1080" cy="540" r="9" fill="#b6f36a"/>
</svg>`;

const file = fileURLToPath(new URL('../public/og.png', import.meta.url));
await sharp(Buffer.from(svg)).png().toFile(file);
console.log(`written ${file}`);
