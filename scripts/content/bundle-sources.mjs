// What the bundle builder reads besides the course (Node only): IPA and parts of speech from the live dictionary
// (src/data/dictionary/words/cambridge, imported through the Vite shim), L's frozen story records
// (content/fr/legacy/l-sources.json) and the frozen live position table (content/fr/legacy/positions-e4392e7.json).
import './vite-shim.mjs';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { REPO_ROOT, CONTENT_ROOT } from './load.mjs';

export const LEGACY_POSITIONS_FILE = 'legacy/positions-e4392e7.json';
export const L_SOURCES_FILE = 'legacy/l-sources.json';

const readJson = (file) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null);
const str = (v) => (typeof v === 'string' && v.trim() !== '' ? v.trim() : null);

let dictionaryCache = null;
/**
 * The live dictionary's French entries as { byId, bySpelling }: Map<id, { id, ipa, part_of_speech }> and
 * Map<spelling, the same entry> (the first entry of an id or a spelling wins, as the migration's word ids did).
 */
export async function loadDictionary() {
  if (dictionaryCache) return dictionaryCache;
  const d = await import(pathToFileURL(join(REPO_ROOT, 'src/data/dictionary/words/cambridge/index.js')).href);
  const byId = new Map();
  const bySpelling = new Map();
  for (const words of Object.values(d))
    for (const [id, w] of words) {
      if (w?.lang !== 'fr' || byId.has(id)) continue;
      const entry = { id, ipa: str(w.phonetic), part_of_speech: str(w.partOfSpeech) };
      byId.set(id, entry);
      const spelling = str(w.word)?.toLowerCase();
      if (spelling && !bySpelling.has(spelling)) bySpelling.set(spelling, entry);
    }
  dictionaryCache = { byId, bySpelling };
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

/** The commit the content was built from: HEAD of the repository holding the content root, or of this repository. */
export function sourceCommit(root = CONTENT_ROOT) {
  for (const cwd of [root, REPO_ROOT]) {
    try {
      return execFileSync('git', ['rev-parse', 'HEAD'], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    } catch {
      // not a git checkout; try the next
    }
  }
  return null;
}
