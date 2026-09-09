const fs = require('node:fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (value.startsWith('https:')) continue;
  if (value.startsWith('#')) {
    if (!html.includes(`id="${value.slice(1)}"`)) throw new Error(`Missing anchor: ${value}`);
  } else if (!fs.existsSync(`dist/${value}`)) throw new Error(`Missing asset: ${value}`);
}
console.log('Passed: local assets and navigation anchors. No client JavaScript required.');
