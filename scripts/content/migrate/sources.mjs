// What the conversion reads from this checkout: today's module objects (through src/lessons/unitConfigLoader.js),
// the frozen L data (content/fr/legacy/l-sources.json), LiaisonHelp.jsx and src/data/frenchPhonics.js.
import '../vite-shim.mjs';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { REPO_ROOT, CONTENT_ROOT } from '../load.mjs';
import { L_SOURCES_FILE } from './l-sources.mjs';
import { fold } from '../../graph/fr/tokenize.mjs';

const importFrom = (p) => import(pathToFileURL(join(REPO_ROOT, p)).href);

// Today's builder logs [DEBUG] lines through console.log while it builds; they are not this command's output.
export async function quietly(fn) {
  const log = console.log;
  console.log = () => {};
  try {
    return await fn();
  } finally {
    console.log = log;
  }
}

/** { unitConfigs, configs: Map<moduleKey, module object> } */
export async function todaysModules() {
  const { unitConfigs } = await quietly(() => importFrom('src/lessons/unitConfigLoader.js'));
  return { unitConfigs, configs: new Map(unitConfigs.flatMap((u) => u.modules).map((m) => [m.moduleKey, m])) };
}

/** content/fr/legacy/l-sources.json, or null when it is not written yet. */
export function readLSources(root = CONTENT_ROOT) {
  const file = join(root, L_SOURCES_FILE);
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
}

/**
 * The English of every word taught before `key` in course order, from the written module files: Map<lowercased
 * French, gloss>, the first card of a spelling winning. run.mjs keeps the same map as it walks the course.
 */
export function glossesBefore(key, root = CONTENT_ROOT) {
  const outline = JSON.parse(readFileSync(join(root, 'course.json'), 'utf8'));
  const glosses = new Map();
  for (const unit of outline.units)
    for (const k of unit.entries) {
      if (k === key) return glosses;
      const file = join(root, 'modules', `${k}.json`);
      if (existsSync(file)) addGlosses(glosses, JSON.parse(readFileSync(file, 'utf8')));
    }
  return glosses;
}
export function addGlosses(glosses, mod) {
  for (const w of mod.vocabulary || []) {
    const fr = String(w.fr).trim().toLowerCase();
    if (!glosses.has(fr)) glosses.set(fr, w.gloss);
  }
}

export const liaisonJsx = () => readFileSync(join(REPO_ROOT, 'src/components/LiaisonHelp.jsx'), 'utf8');
export const frenchPhonics = async () => (await importFrom('src/data/frenchPhonics.js')).frenchPhonics;

/**
 * The credit a site picture (/img/…, under public/) states about itself, from its EXIF Artist and Copyright tags (a
 * JPEG's IFD0): { credit, stated }. credit is "<artist>, <licence>" only when the file names both an author and a
 * licence (CC BY-SA and CC BY ask for both); otherwise null, with `stated` saying what the file does name (or null).
 * Nothing is guessed from the file name (ledger ruling 2026-11-25 Task 8).
 */
const LICENCE = /\bCC[\s-]|creative ?commons|public domain|licen[cs]e|GFDL/i;
export function imageCredit(sitePath) {
  const tags = exifTags(sitePath);
  const artist = tags?.artist || null;
  const copyright = tags?.copyright || null;
  const licence = copyright && copyright !== artist && LICENCE.test(copyright) ? copyright : null;
  if (artist && licence) return { credit: `${artist}, ${licence}`, stated: null };
  const stated = [artist && `author "${artist}"`, copyright && `copyright "${copyright}"`].filter(Boolean).join(' and ');
  return { credit: null, stated: stated || null };
}
function exifTags(sitePath) {
  const file = join(REPO_ROOT, 'public', sitePath);
  if (!existsSync(file)) return null;
  const b = readFileSync(file);
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  for (let at = 2; at + 4 < b.length && b[at] === 0xff; ) {
    const marker = b[at + 1];
    const size = b.readUInt16BE(at + 2);
    if (marker === 0xe1 && b.toString('latin1', at + 4, at + 10) === 'Exif\0\0') return exifCredit(b.subarray(at + 10, at + 2 + size));
    if (marker === 0xda) break; // image data: no more headers
    at += 2 + size;
  }
  return null;
}
function exifCredit(t) {
  const le = t.toString('latin1', 0, 2) === 'II';
  const u16 = (o) => (le ? t.readUInt16LE(o) : t.readUInt16BE(o));
  const u32 = (o) => (le ? t.readUInt32LE(o) : t.readUInt32BE(o));
  const ifd = u32(4);
  const tags = {};
  for (let i = 0, n = u16(ifd); i < n; i++) {
    const e = ifd + 2 + i * 12;
    const tag = u16(e);
    if ((tag !== 0x013b && tag !== 0x8298) || u16(e + 2) !== 2) continue; // Artist, Copyright; ASCII
    const count = u32(e + 4);
    const off = count <= 4 ? e + 8 : u32(e + 8);
    tags[tag] = t.toString('utf8', off, off + count).replace(/\0+$/, '').split('\0')[0].trim();
  }
  return { artist: tags[0x013b] || null, copyright: tags[0x8298] || null };
}

/** Every folded spelling and form the live dictionary (src/data/dictionary/words/cambridge) has a pop-up for. */
export async function dictionaryForms() {
  const d = await importFrom('src/data/dictionary/words/cambridge/index.js');
  const forms = new Set();
  const addForm = (s) => {
    if (typeof s === 'string' && s.trim()) forms.add(fold(s.trim().replace(/[’ʼ‘]/g, "'")));
  };
  for (const words of Object.values(d))
    for (const [, w] of words) {
      if (w?.lang !== 'fr') continue;
      addForm(w.word);
      addForm(w.plural_form);
      for (const r of w.relationships || []) addForm(r.targetWord);
      for (const v of w.variants || []) addForm(typeof v === 'string' ? v : v?.word);
      if (w.adjective_forms && typeof w.adjective_forms === 'object') for (const v of Object.values(w.adjective_forms)) addForm(v);
    }
  return forms;
}
