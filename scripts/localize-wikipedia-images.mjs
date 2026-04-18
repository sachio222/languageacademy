import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const FILE = path.resolve('src/data/wikipediaEntries.js');
const OUT_DIR = path.resolve('public/img/wikipedia');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 LanguageAcademy/1.0 (support@languageacademy.io)';

fs.mkdirSync(OUT_DIR, { recursive: true });

const src = fs.readFileSync(FILE, 'utf8');
const urlRe = /image:\s*\n?\s*"([^"]+)"/g;
const urls = new Set();
for (const m of src.matchAll(urlRe)) {
  if (m[1].startsWith('http://') || m[1].startsWith('https://')) urls.add(m[1]);
}

function filenameFor(url) {
  const u = new URL(url);
  let base = decodeURIComponent(u.pathname.split('/').pop());
  base = base.replace(/^\d+px-/, '');
  base = base.replace(/[^\w.\-]+/g, '_');
  const ext = path.extname(base).toLowerCase() || '.jpg';
  const stem = path.basename(base, path.extname(base)).slice(0, 80);
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 6);
  return `${stem}-${hash}${ext}`;
}

const mapping = {};
let ok = 0, fail = 0;
for (const url of urls) {
  const fname = filenameFor(url);
  const out = path.join(OUT_DIR, fname);
  mapping[url] = `/img/wikipedia/${fname}`;
  if (fs.existsSync(out) && fs.statSync(out).size > 0) { ok++; continue; }
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(out, buf);
    console.log(`  ok  ${fname} (${buf.length}B)`);
    ok++;
  } catch (e) {
    console.warn(`  FAIL ${url} -> ${e.message}`);
    fail++;
    delete mapping[url];
  }
  await new Promise(r => setTimeout(r, 150));
}

let rewritten = src;
for (const [remote, local] of Object.entries(mapping)) {
  rewritten = rewritten.split(remote).join(local);
}
fs.writeFileSync(FILE, rewritten);

console.log(`\nDownloaded ${ok}/${urls.size}, failed ${fail}`);
console.log(`Rewrote ${FILE}`);
