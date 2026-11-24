import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { fold } from '../fold.mjs';
import { parseId } from '../ids.mjs';
import { loadGraph } from '../load.mjs';
import { writeSortedJson } from '../write-json.mjs';
import { buildFormIndex } from './forms.mjs';

// Export-name suffix -> cell tense and the table field holding the surface.
// Checked in order; the first match wins. Passé composé tables give the participle only.
const TABLE_KINDS = [
  { suffix: 'PasseComposeConjugations', tense: 'ptcp', field: 'pastParticiple' },
  { suffix: 'ConditionalConjugations', tense: 'cond', field: 'conjugation' },
  { suffix: 'PastConjugations', tense: 'impf', field: 'conjugation' },
  { suffix: 'Conjugations', tense: 'prs', field: 'conjugation' },
];
const PERSON_CELLS = {
  je: '1sg', tu: '2sg', il: '3sg', elle: '3sg', nous: '1pl', vous: '2pl', ils: '3pl', elles: '3pl',
};

function classify(exportName) {
  for (const kind of TABLE_KINDS) {
    if (exportName.endsWith(kind.suffix) && exportName.length > kind.suffix.length) {
      return { ...kind, lemmaKey: exportName.slice(0, -kind.suffix.length).toLowerCase() };
    }
  }
  return null;
}

export function importConjugations(tables, graph) {
  const index = buildFormIndex(graph);
  const verbs = new Map();
  for (const h of graph.headwords) {
    const k = fold(h.lemma);
    if (!verbs.has(k) || h.pos === 'verb') verbs.set(k, h);
  }
  const out = new Map();
  for (const [name, table] of Object.entries(tables)) {
    const kind = classify(name);
    const headword = kind && verbs.get(kind.lemmaKey);
    if (!headword) continue;
    const key = parseId(headword.id).key;
    for (const [person, row] of Object.entries(table)) {
      const surface = row?.[kind.field];
      const personCell = PERSON_CELLS[person];
      if (typeof surface !== 'string' || !surface || !personCell) continue;
      const cell = kind.tense === 'ptcp' ? 'ptcp' : `${kind.tense}.${personCell}`;
      const id = `${graph.lang}:form:${key}.${cell}`;
      if (out.has(id) || graph.nodes.has(id)) continue;
      const covered = (index.get(fold(surface)) ?? []).some((r) => r.headwordId === headword.id && r.cell === cell);
      if (covered) continue;
      out.set(id, { id, of: headword.id, cell, surface });
    }
  }
  return [...out.values()];
}

async function main() {
  const repoRoot = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '../../..'));
  const graphDir = join(repoRoot, 'curriculum-graph');
  const file = join(graphDir, 'languages/fr/forms.json');
  const tables = await import(pathToFileURL(join(repoRoot, 'src/lessons/vocabulary/verbs/index.js')).href);
  const graph = loadGraph(graphDir, 'fr');
  const added = importConjugations(tables, graph);
  const existing = JSON.parse(readFileSync(file, 'utf8'));
  writeSortedJson(file, [...existing, ...added]);
  console.log(`import-conjugations: ${Object.keys(tables).length} tables, ${added.length} irregular forms added, ${existing.length + added.length} total`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
