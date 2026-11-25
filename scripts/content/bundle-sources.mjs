// What the bundle builder reads besides the course (Node only): IPA and parts of speech from the live dictionary
// (src/data/dictionary/words/cambridge, imported through the Vite shim), L's frozen story records
// (content/fr/legacy/l-sources.json), the frozen live position table (content/fr/legacy/positions-e4392e7.json) and
// the commit the content comes from.
import './vite-shim.mjs';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { REPO_ROOT, CONTENT_ROOT } from './load.mjs';

export const LEGACY_POSITIONS_FILE = 'legacy/positions-e4392e7.json';
export const L_SOURCES_FILE = 'legacy/l-sources.json';
export const DICTIONARY_DIR = 'src/data/dictionary/words/cambridge';

const readJson = (file) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null);
const str = (v) => (typeof v === 'string' && v.trim() !== '' ? v.trim() : null);

/* ---------- IPA ---------- */

// Symbols of English transcription that French IPA never uses: the Cambridge scrape wrote English IPA for some
// French words ("/ˈɜːθ ˌtəʊn/", earth tone, on elles). Stress marks count too: French IPA marks no word stress.
const ENGLISH_ONLY = [
  ['ɜ', 'ɜ (English vowel)'],
  ['əʊ', 'əʊ (English diphthong)'],
  ['ˈ', 'ˈ (stress mark)'],
  ['ˌ', 'ˌ (stress mark)'],
  ['θ', 'θ (English consonant)'],
  ['ð', 'ð (English consonant)'],
  ['ʌ', 'ʌ (English vowel)'],
  ['æ', 'æ (English vowel)'],
];

/**
 * A dictionary phonetic string as French IPA for the bundle, or why it is refused. Slashes are stripped
 * ("/ʒə/" -> "ʒə"); a string with an English-only symbol is refused, so a phrase shows no IPA rather than wrong IPA.
 * @returns { ipa: string|null, refused: string|null }
 */
export function frenchIpa(phonetic) {
  const raw = str(phonetic);
  if (!raw) return { ipa: null, refused: null };
  const found = ENGLISH_ONLY.filter(([s]) => raw.includes(s)).map(([, why]) => why);
  if (found.length) return { ipa: null, refused: found.join(', ') };
  return { ipa: str(raw.replace(/\//g, '')), refused: null };
}

// File and line of an entry's phonetic field, for the dictionary owner: the first `phonetic` after its id line.
function phoneticLine(file, id) {
  const lines = readFileSync(join(REPO_ROOT, file), 'utf8').split('\n');
  const at = lines.findIndex((l) => new RegExp(`["']?id["']?\\s*:\\s*["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(l));
  if (at === -1) return null;
  const p = lines.findIndex((l, i) => i > at && /["']?phonetic["']?\s*:/.test(l));
  return p === -1 ? null : p + 1;
}

/* ---------- the dictionary ---------- */

let dictionaryCache = null;
/**
 * The live dictionary's French entries as { byId, bySpelling, refused }: Map<id, { id, ipa, part_of_speech }>,
 * Map<spelling, the same entry> (the first entry of an id or a spelling wins, as the migration's word ids did), and
 * every refused IPA string as { id, word, phonetic, why, file, line }.
 */
export async function loadDictionary() {
  if (dictionaryCache) return dictionaryCache;
  const d = await import(pathToFileURL(join(REPO_ROOT, DICTIONARY_DIR, 'index.js')).href);
  const byId = new Map();
  const bySpelling = new Map();
  const refused = [];
  // Each export (pronounsCambridge) comes from its own file (pronouns.js).
  for (const [name, words] of Object.entries(d)) {
    const file = `${DICTIONARY_DIR}/${name.replace(/Cambridge$/, '')}.js`;
    for (const [id, w] of words) {
      if (w?.lang !== 'fr' || byId.has(id)) continue;
      const { ipa, refused: why } = frenchIpa(w.phonetic);
      if (why) refused.push({ id, word: w.word, phonetic: w.phonetic, why, file, line: phoneticLine(file, id) });
      const entry = { id, ipa, part_of_speech: str(w.partOfSpeech) };
      byId.set(id, entry);
      const spelling = str(w.word)?.toLowerCase();
      if (spelling && !bySpelling.has(spelling)) bySpelling.set(spelling, entry);
    }
  }
  dictionaryCache = { byId, bySpelling, refused };
  return dictionaryCache;
}

/** { dictionary, stories, legacyPositions } for buildBundle, read from a content root. */
export async function loadBundleSources({ root = CONTENT_ROOT } = {}) {
  return {
    dictionary: await loadDictionary(),
    stories: readJson(join(root, L_SOURCES_FILE))?.stories ?? [],
    legacyPositions: readJson(join(root, LEGACY_POSITIONS_FILE)) ?? {},
  };
}

/* ---------- the source commit ---------- */

const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

/**
 * The commit the content comes from: { commit, dirty }, or null without git. `dirty` is true when the content root
 * has uncommitted changes, or lies outside the repository whose HEAD is named (a copied folder), so the commit does
 * not hold exactly what was built.
 */
export function sourceCommit(root = CONTENT_ROOT) {
  try {
    const top = git(root, 'rev-parse', '--show-toplevel');
    const path = relative(top, root).split(sep).join('/') || '.';
    return { commit: git(root, 'rev-parse', 'HEAD'), dirty: git(top, 'status', '--porcelain', '--', path) !== '' };
  } catch {
    // the root is not in a git checkout: name this repository's HEAD, which does not hold it
  }
  try {
    return { commit: git(REPO_ROOT, 'rev-parse', 'HEAD'), dirty: true };
  } catch {
    return null;
  }
}
