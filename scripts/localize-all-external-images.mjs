import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const OUT_DIR = path.resolve('public/img/external');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 LanguageAcademy/1.0 (support@languageacademy.io)';
const HOST_RE = /^(upload\.wikimedia\.org|images\.unsplash\.com|images\.pexels\.com)$/;

// Files to skip (emails need absolute URLs, docstrings are examples)
const SKIP_FILES = new Set([
  path.resolve('src/utils/emailTemplates.js'),
  path.resolve('src/utils/readings/tooltipCardUtils.jsx'),
]);

fs.mkdirSync(OUT_DIR, { recursive: true });

// Collect all source files
const files = execSync('find src -type f \\( -name "*.js" -o -name "*.jsx" -o -name "*.css" \\)')
  .toString().trim().split('\n').map(f => path.resolve(f)).filter(f => !SKIP_FILES.has(f));

// Extract unique external image URLs
const urls = new Set();
const fileContents = new Map();
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  fileContents.set(f, src);
  const matches = src.matchAll(/https?:\/\/[^"'\s)]+/g);
  for (const m of matches) {
    try {
      const u = new URL(m[0]);
      if (HOST_RE.test(u.hostname)) urls.add(m[0]);
    } catch {}
  }
}

function filenameFor(url) {
  const u = new URL(url);
  let base = decodeURIComponent(u.pathname.split('/').pop());
  base = base.replace(/^\d+px-/, '');
  base = base.replace(/[^\w.\-]+/g, '_');
  const ext = path.extname(base).toLowerCase().match(/\.(jpg|jpeg|png|gif|webp|svg)/) ? path.extname(base).toLowerCase() : '.jpg';
  const stem = path.basename(base, path.extname(base)).slice(0, 80);
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 6);
  return `${stem}-${hash}${ext}`;
}

const mapping = {};
let ok = 0, fail = 0;
for (const url of urls) {
  const fname = filenameFor(url);
  const out = path.join(OUT_DIR, fname);
  mapping[url] = `/img/external/${fname}`;
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
  await new Promise(r => setTimeout(r, 200));
}

// Rewrite all files
let filesRewritten = 0;
for (const [f, src] of fileContents.entries()) {
  let out = src;
  for (const [remote, local] of Object.entries(mapping)) {
    out = out.split(remote).join(local);
  }
  if (out !== src) {
    fs.writeFileSync(f, out);
    filesRewritten++;
  }
}

console.log(`\nDownloaded ${ok}/${urls.size}, failed ${fail}`);
console.log(`Rewrote ${filesRewritten} files`);
