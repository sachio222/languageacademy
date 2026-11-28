// A lesson's conjugation, from the short form a writer gives to the data the Verb forms step runs on.
// A lesson writes { verb, en } and, when needed, gloss (the English verb when en is not "to <verb>": can for pouvoir),
// aspect "progressive" (I'm leaving), ing (an -ing form the rule would misspell: running) and note (a line of its own
// for the sound map). The language module builds the forms, sound groups, stems, silent letters and what to listen for
// (language.conjugation(graph, spec)); the pair's person-glosses.json gives the English for each person. Nothing here
// knows one language's grammar.
// pattern follows the course: the first verb of a shape gets the whole step (irregular); a later verb of the same
// shape names the first as its model (er for a regular -er verb, like for any other shape).
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const cache = new Map();
const read = (file) => {
  if (!cache.has(file)) cache.set(file, JSON.parse(readFileSync(file, 'utf8')));
  return cache.get(file);
};

/** The parts of a language's graph a conjugation is built from. */
export function conjugationGraph(graphLangDir) {
  const j = (f) => read(join(graphLangDir, f));
  return { headwords: j('headwords.json'), forms: j('forms.json'), paradigms: j('paradigms.json') };
}

/** The pair's English for each person (curriculum-graph/pairs/<native>-<target>/person-glosses.json), or null. */
export function personGlosses(graphDir, native, target) {
  const file = join(graphDir, 'pairs', `${native}-${target}`, 'person-glosses.json');
  return existsSync(file) ? read(file) : null;
}

// English verb forms by rule: wants, goes, tries; leaving, trying, seeing.
const sForm = (base, table) => table?.[base] ?? (/(s|x|z|ch|sh)$/.test(base) ? `${base}es` : /[^aeiou]y$/.test(base) ? `${base.slice(0, -1)}ies` : `${base}s`);
const ingForm = (base) => (/ie$/.test(base) ? `${base.slice(0, -2)}ying` : /[^aeoy]e$/.test(base) ? `${base.slice(0, -1)}ing` : `${base}ing`);

function glossRow(cell, spec, glosses) {
  // A verb of several words inflects its first word: "be able to" has no such form, so the lesson names its gloss.
  const base = spec.gloss ?? String(spec.en).replace(/^to\s+/, '');
  if (base === 'be') return glosses.be[cell];
  const [head, ...rest] = base.split(' ');
  const tail = rest.length ? ` ${rest.join(' ')}` : '';
  const set = spec.aspect === 'progressive' ? glosses.progressive : glosses.simple;
  return set[cell].replaceAll('{base}', base).replaceAll('{s}', sForm(head, glosses.s_forms) + tail).replaceAll('{ing}', (spec.ing ?? ingForm(head)) + tail);
}

/** A conjugation a writer gave in the short form: it names a verb and lists no rows. */
export const isShortConjugation = (c) => !!c && typeof c === 'object' && !Array.isArray(c) && c.rows === undefined && typeof c.verb === 'string';

/**
 * @param spec  { verb, en, gloss?, aspect?, ing?, note? }
 * @param opts  generate(spec): the language's conjugation; glosses: the pair's person glosses;
 *              earlier: Map shape -> verb of the conjugations before this one in course order (updated here)
 * @returns the conjugation the schema checks and the bundle carries
 */
export function expandConjugation(spec, { generate, glosses, earlier = new Map() }) {
  if (typeof generate !== 'function') throw new Error('this language builds no conjugations (its language module has no conjugation member)');
  if (!glosses) throw new Error('the language pair has no person-glosses.json');
  const g = generate(spec);
  const model = earlier.get(g.shape);
  if (model === undefined) earlier.set(g.shape, g.verb);
  const out = { verb: g.verb, en: spec.en, pattern: model === undefined ? 'irregular' : g.shape === 'er' ? 'er' : 'like' };
  if (model !== undefined) out.model = model;
  if (spec.note ?? g.note) out.note = spec.note ?? g.note;
  out.groups = g.groups;
  out.rows = g.rows.map(({ cell, ...r }) => {
    const row = { person: r.person, form: r.form, en: glossRow(cell, spec, glosses), group: r.group, stem: r.stem };
    if (r.silent) row.silent = r.silent;
    return row;
  });
  out.contrast = g.contrast;
  return out;
}
