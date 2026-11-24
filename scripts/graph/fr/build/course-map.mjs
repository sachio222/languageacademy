// Writes the hand-curated fields of curriculum-graph/languages/fr/course-map.json (teachesConstructions, tests,
// teachesWordsManual, excludeWords, itemKinds, overrides, contentNotes) from course-map-data.mjs, writes
// names.json, and edits headwords.json (names removed, savoir dictionaryId, pronoun notes). teachesWords is
// left to `pnpm graph:extract`: run it after this script.
// Source of truth: course-map.json, names.json and headwords.json. This script reproduces them as committed and
// course-map-data.mjs records why each entry exists. Running it again overwrites any hand edit to those fields,
// so after a hand edit, change course-map-data.mjs to match or stop using this script.
// Usage: node scripts/graph/fr/build/course-map.mjs [--report]
//   --report prints counts and the item-kind table and writes nothing.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { load, FR_DIR as DIR } from './lib.mjs';
import { writeSortedJson } from '../../write-json.mjs';
import { fold } from '../../fold.mjs';
import { tokenize } from '../tokenize.mjs';
import { lookupToken, lookupTokenStrict } from '../forms.mjs';
import { TEACH, TESTS, HOMOGRAPHS, NAMES, NAME_HEADWORDS, PRONOUN_NOTES, CONTENT_NOTES, CHUNK_ONLY } from './course-map-data.mjs';
import { matchPattern } from '../detect.mjs';
import { classify } from './item-kinds.mjs';

const REPORT = process.argv.includes('--report');
const { graph, course, raw, index, detects, analyze } = await load();
const byPos = new Map(course.map((m) => [m.position, m]));
const cx = (id) => (id.includes(':') ? id : `fr:cx:${id}`);
const problems = [];
const need = (id, where) => { if (!graph.nodes.has(id)) problems.push(`${where}: unknown node ${id}`); };

const courseMap = JSON.parse(readFileSync(join(DIR, 'course-map.json'), 'utf8'));
const entry = (m) => (courseMap[m.moduleKey] ??= {});
const FIELDS = ['teachesConstructions', 'tests', 'teachesWordsManual', 'excludeWords', 'itemKinds', 'overrides', 'contentNotes'];
for (const e of Object.values(courseMap)) for (const f of FIELDS) delete e[f];

// teachesConstructions
for (const [pos, ids] of Object.entries(TEACH)) {
  const m = byPos.get(Number(pos));
  if (!['lesson', 'help'].includes(m.kind)) problems.push(`TEACH ${pos} is a ${m.kind}`);
  const list = [...new Set(ids.map(cx))];
  list.forEach((id) => need(id, `TEACH ${pos}`));
  entry(m).teachesConstructions = list;
}
// tests
for (const [pos, ids] of Object.entries(TESTS)) {
  const m = byPos.get(Number(pos));
  if (!['exam', 'practice'].includes(m.kind)) problems.push(`TESTS ${pos} is a ${m.kind}`);
  const list = [...new Set(ids.map(cx))];
  list.forEach((id) => need(id, `TESTS ${pos}`));
  entry(m).tests = list;
}
for (const m of course) if (['exam', 'practice'].includes(m.kind) && m.conceptTerms.length && !TESTS[m.position]) problems.push(`no TESTS for ${m.position}`);

// homographs
const add = (m, field, ids) => { const e = entry(m); e[field] = [...new Set([...(e[field] ?? []), ...ids])]; };
for (const [pos, { manual, exclude }] of HOMOGRAPHS) {
  const m = byPos.get(pos);
  manual.forEach((id) => need(id, `manual ${pos}`));
  exclude.forEach((id) => need(id, `exclude ${pos}`));
  if (manual.length) add(m, 'teachesWordsManual', manual);
  if (exclude.length) add(m, 'excludeWords', exclude);
}
// le.pronoun: excluded from every vocabulary table where le / la / les / l' is only an article.
// A use counts as the pronoun when the token is attached to an imperative (-le) or the next word
// can only be a verb (je le vois, il l'a), or when the entry is the bare pronoun in the object-pronoun lesson.
const LE_IDS = ['fr:lex:le.pronoun', 'fr:form:le.pronoun.f', 'fr:form:le.pronoun.pl', 'fr:form:le.pronoun.elided'];
const lePronounKept = [];
for (const m of course) {
  if (!['lesson', 'help'].includes(m.kind)) continue;
  let credited = false; let pronounUse = false;
  for (const v of raw.get(m.moduleKey).vocabularyReference ?? []) {
    if (typeof v.french !== 'string') continue;
    const toks = tokenize(v.french, { isWord: (f) => index.has(f) });
    const reads = toks.map((t) => { const s = lookupTokenStrict(index, t); return s.length ? s : lookupToken(index, t); });
    toks.forEach((t, i) => {
      if (!reads[i].some((r) => r.headwordId === 'fr:lex:le.pronoun')) return;
      credited = true;
      const next = reads[i + 1] ?? [];
      const verbOnly = next.length > 0 && next.every((r) => r.pos === 'verb');
      if (t.clitic || verbOnly || (toks.length === 1 && /pronoun|him|her|them|it\b/i.test(v.english ?? ''))) pronounUse = true;
    });
  }
  if (!credited) continue;
  if (pronounUse) lePronounKept.push(m.position);
  else add(m, 'excludeWords', LE_IDS);
}

// overrides: s'il vous plaît is a fixed phrase taught at position 1, before elision (4) and subject pronouns (2).
const overrides = [];
for (const it of byPos.get(1).items) {
  if (it.french.some((t) => /s'il vous pla[iî]t/i.test(t))) {
    entry(byPos.get(1)).overrides = { ...(entry(byPos.get(1)).overrides ?? {}), [it.ref]: { ignore: ['fr:cx:elision', 'fr:cx:pronoun.subject'] } };
    overrides.push(it.ref);
  }
}

// overrides: a phrase taught whole (je voudrais, on y va, vas-y) before its general pattern is taught:
// an item whose every use of the general construction sits inside one of those phrases does not count as the
// general construction. Spans are the exact token ranges each detector matches.
const exactSpans = (text, c, strict) => {
  const { tokens, readings } = analyze(text, strict);
  const hit = (a, b) => matchPattern(tokens.slice(a, b), readings.slice(a, b), c.detect, graph.names);
  const out = [];
  for (let a = 0; a < tokens.length; a++) {
    for (let b = a + 1; b <= tokens.length; b++) {
      if (hit(a, b) && !hit(a + 1, b) && !hit(a, b - 1)) out.push([a, b]);
    }
  }
  return out;
};
const taughtAt = (id) => Math.min(...Object.entries(TEACH).filter(([, ids]) => ids.includes(id)).map(([p]) => Number(p)));
for (const [general, chunks] of CHUNK_ONLY) {
  const G = graph.nodes.get(cx(general));
  const C = chunks.map((id) => graph.nodes.get(cx(id)));
  const until = taughtAt(general); // Infinity when the general construction is never taught
  for (const m of course) {
    if (m.position >= until) break;
    for (const it of m.items) {
      const texts = [...it.french.map((t) => [t, true]), ...it.lenient.map((t) => [t, false])];
      const uses = texts.filter(([t, strict]) => detects(t, G, strict));
      if (!uses.length) continue;
      const inside = uses.every(([t, strict]) => {
        const chunkSpans = C.flatMap((c) => exactSpans(t, c, strict));
        return exactSpans(t, G, strict).every(([a, b]) => chunkSpans.some(([x, y]) => x <= a && b <= y));
      });
      if (!inside) continue;
      const e = entry(m);
      e.overrides = { ...(e.overrides ?? {}), [it.ref]: { ignore: [...new Set([...(e.overrides?.[it.ref]?.ignore ?? []), cx(general)])] } };
      overrides.push(it.ref);
    }
  }
}

// contentNotes: lesson text to fix, listed at the top of the fix list.
for (const [pos, note] of CONTENT_NOTES) {
  const m = byPos.get(pos);
  entry(m).contentNotes = [...(entry(m).contentNotes ?? []), note];
}

// itemKinds: written only where the kind differs from the checker's default.
const counts = { situation: 0, translate: 0, other: 0 };
const table = [];
for (const m of course) {
  const r = raw.get(m.moduleKey);
  for (const it of m.items) {
    const path = it.ref.slice(it.ref.indexOf('#') + 1);
    const ex = /^exercises\[(\d+)\]$/.exec(path);
    const rawItem = ex ? r.exercises?.[Number(ex[1])] : null;
    const [kind, why] = classify(m, it, rawItem);
    const def = it.englishPrompt && it.french.length ? 'translate' : 'other';
    counts[kind]++;
    table.push({ pos: m.position, unit: m.unitId, ref: it.ref, kind, why, def, instruction: it.instruction, prompt: it.englishPrompt, french: it.french[0] });
    if (kind !== def) entry(m).itemKinds = { ...(entry(m).itemKinds ?? {}), [it.ref]: kind };
  }
}

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

// names and headwords
const names = NAMES.map((surface) => ({ id: `fr:name:${fold(surface).replace(/[\s']+/g, '-')}`, surface }));
const headwords = JSON.parse(readFileSync(join(DIR, 'headwords.json'), 'utf8'));
const dropped = new Set(NAME_HEADWORDS.map((k) => `fr:lex:${k}`));
const kept = headwords.filter((h) => !dropped.has(h.id)).map((h) => {
  if (h.id === 'fr:lex:savoir') return { ...h, dictionaryId: null };
  if (h.id === 'fr:lex:savoir.verb') return { ...h, dictionaryId: 'savoir-fr' };
  if (PRONOUN_NOTES[h.id]) return { ...h, note: PRONOUN_NOTES[h.id] };
  return h;
});

const summary = {
  modulesWithTeachesConstructions: Object.keys(TEACH).length,
  teachesConstructionEntries: Object.values(TEACH).reduce((n, l) => n + l.length, 0),
  modulesWithTests: Object.keys(TESTS).length,
  testEntries: Object.values(TESTS).reduce((n, l) => n + l.length, 0),
  itemKinds: counts,
  itemKindsWritten: table.filter((t) => t.kind !== t.def).length,
  names: names.length,
  headwordsRemoved: headwords.length - kept.length,
  lePronounKeptAt: lePronounKept,
  lePronounExcludedModules: course.filter((m) => courseMap[m.moduleKey]?.excludeWords?.includes('fr:lex:le.pronoun')).length,
  overrides,
};
if (REPORT) {
  console.log(JSON.stringify(summary, null, 1));
  for (const row of table) console.log(JSON.stringify(row));
  process.exit(0);
}
writeSortedJson(join(DIR, 'course-map.json'), courseMap);
writeSortedJson(join(DIR, 'names.json'), names);
writeSortedJson(join(DIR, 'headwords.json'), kept);
console.log(JSON.stringify(summary));
