import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { fold } from '../fold.mjs';
import { parseId } from '../ids.mjs';
import { writeSortedJson } from '../write-json.mjs';

const REFLEXIVE_RE = /^(?:se |s['’])(.+)$/i;
const PARADIGMS_BY_ENDING = {
  er: ['fr:cx:verb.er.present', 'fr:cx:ptcp.er'],
  ir: ['fr:cx:verb.ir.present', 'fr:cx:ptcp.ir'],
  re: ['fr:cx:verb.re.present', 'fr:cx:ptcp.re'],
};

// fold, spaces and apostrophes to '-', repeated '-' collapsed, edge '-' trimmed.
// A key already taken gets '.<pos>' (and a counter if that is taken too).
export function headwordKey(lemma, pos, takenKeys) {
  const base = fold(lemma).replace(/[\s']+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (!takenKeys.has(base)) return base;
  const withPos = `${base}.${String(pos).toLowerCase().replace(/\s+/g, '-')}`;
  if (!takenKeys.has(withPos)) return withPos;
  let n = 2;
  while (takenKeys.has(`${withPos}${n}`)) n++;
  return `${withPos}${n}`;
}

// A conjugated-form entry says so about itself, or points at a different infinitive.
function isConjugatedForm(entry) {
  return (entry.relationships ?? []).some((r) => r.type === 'conjugation_pair'
    && ((r.note === 'conjugated form' && r.targetId === entry.id)
      || (r.note === 'infinitive form' && r.targetId !== entry.id)));
}

function inferParadigms(lemma, pos) {
  if (pos !== 'verb') return [];
  const m = REFLEXIVE_RE.exec(lemma);
  const stem = (m ? m[1] : lemma).toLowerCase();
  return [...(PARADIGMS_BY_ENDING[stem.slice(-2)] ?? [])];
}

export function seedHeadwords(entries, existing) {
  const out = [...existing];
  const taken = new Set(existing.map((n) => parseId(n.id).key));
  const seenDictionary = new Set(existing.map((n) => n.dictionaryId));
  const seenLemmaPos = new Set(existing.map((n) => `${n.lemma}|${n.pos}`));
  for (const e of entries) {
    if (isConjugatedForm(e) || seenDictionary.has(e.id)) continue;
    const pos = e.partOfSpeech ?? 'unknown';
    if (seenLemmaPos.has(`${e.word}|${pos}`)) continue;
    const key = headwordKey(e.word, pos, taken);
    taken.add(key);
    seenDictionary.add(e.id);
    seenLemmaPos.add(`${e.word}|${pos}`);
    out.push({
      id: `fr:lex:${key}`,
      lemma: e.word,
      pos,
      paradigms: inferParadigms(e.word, pos),
      senses: [],
      dictionaryId: e.id,
      cefr: null,
      cefrSource: null,
    });
  }
  return out;
}

async function main() {
  const repoRoot = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '../../..'));
  const file = join(repoRoot, 'curriculum-graph/languages/fr/headwords.json');
  // index.js re-exports with extensionless paths, which Node cannot resolve, so read its list
  // of per-POS files and import each one directly.
  const dir = join(repoRoot, 'src/data/dictionary/words/cambridge');
  const files = [...readFileSync(join(dir, 'index.js'), 'utf8').matchAll(/from\s+['"]\.\/([\w-]+)['"]/g)].map((m) => m[1]);
  const entries = [];
  for (const name of files) {
    const mod = await import(pathToFileURL(join(dir, `${name}.js`)).href);
    for (const map of Object.values(mod)) if (map instanceof Map) entries.push(...map.values());
  }
  const existing = JSON.parse(readFileSync(file, 'utf8'));
  const nodes = seedHeadwords(entries, existing);
  writeSortedJson(file, nodes);
  console.log(`seed-headwords: ${entries.length} dictionary entries, ${existing.length} existing, ${nodes.length - existing.length} added, ${nodes.length} total`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
