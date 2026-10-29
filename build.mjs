// Dependency-free static build; only runtime assets enter the public bundle.
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const file of ['index.html', 'style.css', 'script.js', 'films.js', 'favicon.svg', 'assets']) {
  cpSync(path.join(root, file), path.join(out, file), { recursive: true });
}
console.log('Cinévia: static bundle ready in dist/');
