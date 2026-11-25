// Task 8, spec 8.2 "Proof the live screens see the same lessons": every lesson today's lessonData.js builds
// (fixtures/golden-lessons.json, written by `node scripts/content/migrate/run.mjs golden`) is compared, field by field,
// with toLegacyLesson of its converted file. A difference passes only when fixtures/golden-allowed.json puts it in a
// class whose basis is a migration-report line of Tasks 6 and 7, Task 6's data or a ledger ruling, and whose relation
// ties the difference's values to that basis exactly; each class holds exactly the count it records, so a new
// difference fails until someone reads it and names its reason.
//
// After the conversion (final review I1): the counts are frozen per module in fixtures/golden-baseline.json. A module
// changed since the freeze, by a hand fix recorded in content/fr/legacy/hand-fixes.json or by a source change on main
// (content/fr/legacy/migration-sources.json), is excused from its frozen counts; each of its differences still needs a
// class, and a part a writer changed is allowed when the module holds exactly the recorded fix (hand_fix_recorded).
// `node --test scripts/content/test/golden.test.mjs` with GOLDEN_BASELINE=write rewrites the baseline from the course as
// it is, for the one time a new conversion-era class is ruled in.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadCourse, CONTENT_ROOT } from '../load.mjs';
import { frenchSpans } from '../spans.mjs';
import { toLegacyLesson, plain } from '../legacy/to-legacy-lesson.mjs';
import { compareLesson, classify, parseReport, describe, goldenChecks, changedSince, handFixCheck, handFixPrints, sourcesFingerprint } from '../legacy/golden.mjs';
import { planKeyList, readPlanKeys } from '../plan-stubs.mjs';
import { REWRITES } from '../migrate/holds.mjs';

const here = new URL('./fixtures/', import.meta.url);
const readJson = (u) => JSON.parse(readFileSync(u, 'utf8'));
const snapshot = readJson(new URL('golden-lessons.json', here));
const allowed = readJson(new URL('golden-allowed.json', here));
const liveIds = readJson(join(CONTENT_ROOT, 'legacy', 'live-ids.json'));
const lSources = readJson(join(CONTENT_ROOT, 'legacy', 'l-sources.json'));
const handFixes = readJson(join(CONTENT_ROOT, 'legacy', 'hand-fixes.json'));
const records = readJson(join(CONTENT_ROOT, 'legacy', 'migration-sources.json'));
const report = parseReport(readFileSync(join(CONTENT_ROOT, 'migration-report.md'), 'utf8'));
const BASELINE_FILE = new URL('golden-baseline.json', here);
const baseline = readJson(BASELINE_FILE);
// The class for a part a writer changed after the freeze; it holds no frozen count.
const HAND_FIX_CLASS = {
  class: 'hand_fix_recorded',
  reason: 'A part changed after the conversion, where the module holds exactly the fix hand-fixes.json records for it (final review I1).',
  basis: { data: 'hand_fix_recorded' },
  paths: ['^'],
};

// The course as today's lessonData.js numbers it: a module written after the snapshot (a new guide or Reference page
// goes to L only, Jake 2026-11-25) has no live lesson, so it takes no live position and nothing is compared for it. A
// module the migration converted from the live app (it has live ids) is never left out this way.
function liveView(full, inSnapshot) {
  const modules = new Map();
  let position = 0;
  const isLive = (m) => inSnapshot.has(m.module_key) || liveIds[m.module_key];
  const units = full.units.map((u) => ({
    ...u,
    modules: u.modules.filter(isLive).map((m) => {
      const live = { ...m, position: (position += 1) };
      modules.set(m.module_key, live);
      return live;
    }),
  }));
  for (const p of full.shelf.pages.filter(isLive)) modules.set(p.module_key, p);
  // A planned module (a course plan stub) is not written yet, so it is never live: it is left out by its status.
  const writtenAfter = [...full.modules].filter(([k, m]) => !modules.has(k) && m.status !== 'planned').map(([k]) => k);
  return { course: { ...full, units, modules }, writtenAfter };
}
const full = loadCourse();
const { course, writtenAfter } = liveView(full, new Set(snapshot.map((l) => l.moduleKey)));

// Every span text in a module: today's quotes around one are dropped before comparing (golden.mjs sameText).
function spansOf(mod) {
  const out = new Set();
  const walk = (v) => {
    if (typeof v === 'string') for (const s of frenchSpans(v)) out.add(s.trim());
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(mod);
  return out;
}

// By module object, so a run over changed modules adapts them afresh.
const adapted = new WeakMap();
const adaptIn = (c) => (mod) => {
  if (!adapted.has(mod)) adapted.set(mod, JSON.parse(JSON.stringify(toLegacyLesson(mod, { liveIds, course: c }))));
  return structuredClone(adapted.get(mod));
};

/**
 * mutate(moduleKey, lesson): a planted change to the adapter's lesson, for the planted-loss tests.
 * edits: { modules?: { key: module }, handFixes?, records? }: the course as a writer or a main merge left it, for the
 * tests of changes after the freeze. Without edits the run reads the committed files.
 */
function run(mutate = null, edits = {}) {
  const c = edits.modules ? { ...course, modules: new Map([...course.modules].map(([k, m]) => [k, edits.modules[k] ? { ...m, ...edits.modules[k] } : m])) } : course;
  const fixes = edits.handFixes ?? handFixes;
  const since = changedSince(baseline, { handFixes: fixes, records: edits.records ?? records });
  const adapt = adaptIn(c);
  const checks = {
    ...goldenChecks({ liveIds, course: c, lSources, handFixes: fixes, rewrites: REWRITES, plain, adapt }),
    hand_fix_recorded: handFixCheck({ course: c, handFixes: fixes, handFixed: since.handFixed, liveIds }),
  };
  const diffs = [];
  const stats = { lessons: 0, fields: 0 };
  const seen = new Set();
  for (const live of snapshot) {
    const mod = c.modules.get(live.moduleKey);
    if (!mod) {
      diffs.push({ module_key: live.moduleKey, kind: null, path: '(lesson)', live: live.id, converted: undefined });
      continue;
    }
    if (mod.status === 'planned') continue;
    // A guide listed twice today (in its unit and again on the Reference shelf) is one lesson now, at its unit place.
    if (seen.has(live.moduleKey)) {
      diffs.push({ module_key: live.moduleKey, kind: mod.kind, path: '(shelf copy)', live: live.id, converted: undefined });
      continue;
    }
    seen.add(live.moduleKey);
    let conv = adapt(mod);
    if (mutate) conv = mutate(live.moduleKey, conv) ?? conv;
    stats.lessons += 1;
    for (const d of compareLesson(live, conv, { spans: spansOf(mod), stats })) diffs.push({ module_key: live.moduleKey, kind: mod.kind, ...d });
  }
  for (const [key, mod] of c.modules)
    if (mod.status !== 'planned' && !seen.has(key)) diffs.push({ module_key: key, kind: mod.kind, path: '(lesson)', live: undefined, converted: key });
  // The new class only after every conversion-era one, and only in a module changed after the freeze.
  const r = classify(diffs, [...allowed.classes, HAND_FIX_CLASS], report, checks);
  const counts = Object.fromEntries([...r.byClass].map(([k, ds]) => [k, ds.length]));
  const byModule = {};
  for (const [k, ds] of r.byClass) for (const d of ds) ((byModule[k] ||= {})[d.module_key] = (byModule[k][d.module_key] || 0) + 1);
  // Exact counts per class and module, as frozen; a module changed after the freeze is excused.
  const off = [];
  for (const cl of allowed.classes) {
    const frozen = baseline.counts[cl.class] || {};
    for (const key of new Set([...Object.keys(frozen), ...Object.keys(byModule[cl.class] || {})]))
      if (!since.changed.has(key) && (frozen[key] || 0) !== (byModule[cl.class]?.[key] || 0)) off.push(`${cl.class} ${key} ${frozen[key] || 0} -> ${byModule[cl.class]?.[key] || 0}`);
  }
  return { diffs, stats, counts, byModule, off, since, ...r };
}

const result = run();

// GOLDEN_BASELINE=write: the frozen counts, hand fixes and sources, from the course as it is.
if (process.env.GOLDEN_BASELINE === 'write') {
  const counts = Object.fromEntries(allowed.classes.map((cl) => [cl.class, Object.fromEntries(Object.entries(result.byModule[cl.class] || {}).sort())]));
  const sources = Object.fromEntries(Object.keys(records).sort().map((k) => [k, sourcesFingerprint(records[k])]));
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify({ about: baseline.about, frozen_at: baseline.frozen_at, counts, hand_fixes: handFixPrints(handFixes), sources }, null, 2) + '\n',
  );
}

test('adapter shows the same lessons as today', () => {
  const { unexplained, stats } = result;
  console.log(`golden: ${stats.lessons} lessons, ${stats.fields} values compared, ${result.diffs.length} differences, ${unexplained.length} unexplained`);
  // Each live lesson once (a guide listed twice today is one module).
  assert.equal(stats.lessons, new Set(snapshot.map((l) => l.moduleKey)).size, 'every converted module is compared with its live lesson');
  assert.deepEqual(unexplained.map(describe).slice(0, 50), [], `${unexplained.length} differences with no report line or ruling behind them`);
});

test('a module written after the snapshot takes no live number and is not compared', () => {
  // Exactly the guides and the Reference page written after the snapshot, and any course plan module written since
  // (content/fr/plan-keys.json); any other new module joins this list by hand.
  const planned = new Set(planKeyList(readPlanKeys()));
  assert.deepEqual(writtenAfter.filter((k) => !planned.has(k)), ['gender-endings-guide', 'which-past-guide', 'future-conditional-guide', 'past-with-etre-guide', 'subjunctive-que-guide', 'pronoun-order-guide', 'who-what-questions-guide', 'phrasebook']);
  for (const key of writtenAfter) assert.equal(liveIds[key], undefined, `${key} was converted from the live app`);
  // The reading after the guide keeps its live number.
  const key = '2024-03-30-reading-4';
  assert.equal(toLegacyLesson(course.modules.get(key), { liveIds, course }).id, snapshot.find((l) => l.moduleKey === key).id);
});

test('a planned module is not live: it takes no live number, is never compared and is not listed as written after', () => {
  // By rule (status planned), so a new stub never needs a hand edit here; the list above stays for written modules.
  const planned = [...full.modules.values()].filter((m) => m.status === 'planned').map((m) => m.module_key);
  for (const key of planned) {
    assert.equal(liveIds[key], undefined, `${key} has live ids`);
    assert.equal(course.modules.has(key), false, `${key} takes a live number`);
    assert.equal(writtenAfter.includes(key), false, `${key} is listed as written after the snapshot`);
  }
  assert.equal(result.diffs.some((d) => planned.includes(d.module_key)), false, 'a planned module is compared');
});

test('every allowed class holds exactly the differences it records', () => {
  assert.deepEqual(result.off, []);
  // The frozen per-module counts add up to each class's recorded count.
  for (const cl of allowed.classes)
    assert.equal(Object.values(baseline.counts[cl.class] || {}).reduce((a, b) => a + b, 0), cl.count, `${cl.class}: golden-baseline.json and golden-allowed.json disagree`);
  // With no module changed since the freeze, the totals are the recorded counts too.
  if (result.since.changed.size === 0) for (const cl of allowed.classes) assert.equal(result.counts[cl.class], cl.count, cl.class);
});

/* ---------- after the freeze: recorded hand fixes and main's source changes (final review I1) ---------- */

// A writer changes one item of a converted lesson and a run records it in hand-fixes.json.
function writerEdit(key, edit) {
  const mod = structuredClone(course.modules.get(key));
  const { steps, ...plainItem } = mod.items.find(edit.find);
  const item = { ...plainItem, ...edit.change(plainItem) };
  mod.items = mod.items.map((it) => (it.id === item.id ? { ...item, steps: it.steps } : it));
  return { mod, item, fixes: { ...handFixes, [key]: { ...(handFixes[key] || {}), [`items/${item.id}`]: item } } };
}
// A converted lesson unchanged since the freeze, with an item that has a hint and one that has mistakes.
const TARGET = [...course.modules.values()].find(
  (m) => m.kind === 'lesson' && liveIds[m.module_key] && !result.since.changed.has(m.module_key) && m.items.some((it) => it.hint) && m.items.some((it) => (it.mistakes || []).length),
).module_key;
const rehint = { find: (it) => Boolean(it.hint), change: () => ({ hint: 'A hint written after the freeze.' }) };
const feedback = { find: (it) => (it.mistakes || []).length > 0, change: (it) => ({ mistakes: it.mistakes.map((m, i) => (i === 0 ? { ...m, feedback: 'Look again at the verb.' } : m)) }) };

test("a writer's recorded hand fix to a converted lesson passes, and the other modules keep their frozen counts", () => {
  for (const edit of [rehint, feedback]) {
    const { mod, fixes } = writerEdit(TARGET, edit);
    const r = run(null, { modules: { [TARGET]: mod }, handFixes: fixes });
    assert.deepEqual(r.unexplained.map(describe), []);
    assert.deepEqual(r.off, []);
    assert.equal(r.counts.hand_fix_recorded, (result.counts.hand_fix_recorded || 0) + 1);
    assert.ok(r.since.changed.has(TARGET));
    assert.equal(r.since.changed.size, result.since.changed.size + 1);
  }
});

test('an edit with no recorded fix, or a module that differs from its fix, is still caught', () => {
  const { mod, item, fixes } = writerEdit(TARGET, rehint);
  assert.ok(run(null, { modules: { [TARGET]: mod } }).unexplained.length > 0, 'an unrecorded edit');
  const drifted = { ...fixes, [TARGET]: { ...fixes[TARGET], [`items/${item.id}`]: { ...item, hint: 'Something else.' } } };
  assert.ok(run(null, { modules: { [TARGET]: mod }, handFixes: drifted }).unexplained.length > 0, 'a module that is not its fix');
  // A fix recorded at the freeze is no licence: the change must be in a part fixed after it.
  const frozenPart = Object.keys(handFixes['2024-01-06-basic-nouns'] || {}).find((p) => p.startsWith('items/'));
  if (frozenPart) {
    const id = frozenPart.slice('items/'.length);
    const m = structuredClone(course.modules.get('2024-01-06-basic-nouns'));
    m.items = m.items.map((it) => (it.id === id ? { ...it, hint: 'Junk.' } : it));
    assert.ok(run(null, { modules: { '2024-01-06-basic-nouns': m } }).unexplained.length > 0 || run(null, { modules: { '2024-01-06-basic-nouns': m } }).off.length > 0);
  }
});

// C2 and C4 add items, concept cards and vocabulary cards to converted lessons (C0 fix round). content:migrate records
// each as a hand fix; the golden test lets an added exercise, concept or card through only when it is recorded and no
// live id maps to it.
function writerAdds(key) {
  const mod = structuredClone(course.modules.get(key));
  const inserted = { id: 'i-added-by-hand-1', type: 'respond', situation: 'Say hello.', cue: 'hello', answer: 'bonjour' };
  const appended = { id: 'i-added-by-hand-2', type: 'gapfill', text: '___ !', gloss: 'Hello!', blanks: [{ answer: 'bonjour' }] };
  mod.items.splice(1, 0, inserted);
  mod.items.push(appended);
  const concept = { id: 'c-added-by-hand', term: '{bonjour} = hello', definition: 'A greeting for the day.', example: '{bonjour, Marie}' };
  mod.concepts = [...(mod.concepts || []), concept];
  const card = { word_id: 'added-by-hand-fr', fr: 'bonjour à tous', gloss: 'hello everyone' };
  mod.vocabulary = [...(mod.vocabulary || []), card];
  const parts = { [`items/${inserted.id}`]: inserted, [`items/${appended.id}`]: appended, concepts: mod.concepts, [`vocabulary/${card.word_id}`]: card };
  return { mod, parts, fixes: { ...handFixes, [key]: { ...(handFixes[key] || {}), ...parts } } };
}

test('items, a concept card and a vocabulary card added to a converted lesson pass once content:migrate records them', () => {
  const { mod, fixes } = writerAdds(TARGET);
  const r = run(null, { modules: { [TARGET]: mod }, handFixes: fixes });
  assert.deepEqual(r.unexplained.map(describe), []);
  assert.deepEqual(r.off, []);
  assert.ok(r.since.changed.has(TARGET));
});

test('an added item, concept card or vocabulary card that is not recorded still fails', () => {
  const { mod, parts, fixes } = writerAdds(TARGET);
  for (const part of Object.keys(parts)) {
    const { [part]: _, ...rest } = fixes[TARGET];
    const r = run(null, { modules: { [TARGET]: mod }, handFixes: { ...fixes, [TARGET]: rest } });
    assert.ok(r.unexplained.length > 0, `${part} unrecorded`);
  }
  // Nothing recorded at all.
  assert.ok(run(null, { modules: { [TARGET]: mod } }).unexplained.length > 0);
});

test('an added exercise or concept card that a live id maps to is no hand addition', () => {
  const key = TARGET;
  const { mod, parts } = writerAdds(key);
  const c = { modules: new Map([[key, mod]]) };
  const handFixed = new Map([[key, new Set(Object.keys(parts))]]);
  const fixes = { [key]: parts };
  const added = { module_key: key, path: 'exercises[+1]', live: undefined, converted: { id: `${key}.i-added-by-hand-1`, displayNumber: 2 } };
  const card = { module_key: key, path: `concepts[+${mod.concepts.length - 1}]`, live: undefined, converted: {} };
  const check = (ids) => handFixCheck({ course: c, handFixes: fixes, handFixed, liveIds: ids });
  assert.equal(check({})(added), true);
  assert.equal(check({})(card), true);
  assert.equal(check({ [key]: { items: { [`${key}.2`]: 'i-added-by-hand-1' }, concepts: {} } })(added), false);
  assert.equal(check({ [key]: { items: {}, concepts: { 9: 'c-added-by-hand' } } })(card), false);
});

test("a module whose source changed on main keeps no frozen counts; its differences still need a class", () => {
  // The record's source hashes move when main changes the module's source.
  const key = TARGET;
  const moved = structuredClone(records);
  moved[key].fields.title.src = 'main-changed';
  const r = run(null, { records: moved });
  assert.ok(r.since.sourceChanged.has(key));
  assert.equal(r.since.sourceChanged.size, result.since.sourceChanged.size + 1);
  assert.deepEqual(r.off, []);
  // A planted loss there is still unexplained.
  const lost = run((k, l) => (k === key ? { ...l, exercises: l.exercises.map((e, i) => (i === 0 ? { ...e, prompt: 'lost' } : e)) } : l), { records: moved });
  assert.ok(lost.unexplained.length > 0);
});

test('every allowed class names its path pattern, its basis and how its values relate to it', () => {
  for (const c of allowed.classes) {
    assert.ok(c.paths?.length && c.paths.every((p) => typeof p === 'string' && p.startsWith('^')), `${c.class}: anchored path patterns`);
    assert.ok(typeof c.reason === 'string' && c.reason.length > 20, `${c.class}: reason`);
    assert.ok(c.basis.report || c.basis.ruling || c.basis.data, `${c.class}: a report line kind, a ledger ruling or a data check`);
    if (c.basis.ruling) assert.ok(Array.isArray(c.basis.modules) && c.basis.modules.length, `${c.class}: a ruling names its modules`);
    // Every class checks the values, not only the place: a relation, a data check, or (a single exception) the values.
    assert.ok(c.basis.relation || c.basis.data || c.basis.values, `${c.class}: a relation, a data check or named values`);
    assert.ok(!['any', 'same_index'].includes(c.basis.relation), `${c.class}: a relation that checks the values`);
  }
});

// Planted losses: each change below makes the adapter's lesson lose or change something a learner sees, outside or
// inside an allowed class. The test must fail on every one (an unexplained difference or a class count off).
const only = (key, f) => (k, c) => (k === key ? f(c) ?? c : c);
function dropPicture(c, n) {
  const t = c.readingPassage.text.split('\n\n');
  const tr = c.readingPassage.translation.split('\n\n');
  const at = t.map((x, i) => (x.startsWith('![') ? i : -1)).filter((i) => i >= 0)[n];
  t.splice(at, 1);
  tr.splice(at, 1);
  c.readingPassage.text = t.join('\n\n');
  c.readingPassage.translation = tr.join('\n\n');
}
const PLANTED = [
  ['a wrong answer dropped and a prompt changed (Être)', only('2024-01-02-etre', (c) => {
    c.exercises[0].wrongAnswers.pop();
    c.exercises[1].prompt = 'something else';
  })],
  ['a picture dropped from Reading 5 (story_pictures)', only('2024-04-13-reading-5', (c) => dropPicture(c, 2))],
  ["another reading's picture in Reading 2 (story_pictures)", only('2024-01-22-reading2', (c) => {
    c.readingPassage.text = c.readingPassage.text.replace(/!\[img\/reading2\/[^\]]+\]/, '![img/reading9/x]');
  })],
  ['a Unit 9 hint reworded (fillblank_suffix_now_hint)', only('2024-05-30-passe-compose-er', (c) => {
    c.exercises[0].hint = "Use 'parlez'";
  })],
  ['a joined note cut (vocabulary_usage_into_note)', only('2024-05-28-more-spatial-relations', (c) => {
    c.vocabularyReference[10].note = 'adjective';
  })],
  ['a twin card note cut (vocabulary_card_listed_twice)', only('2024-05-23-temporal-words', (c) => {
    c.vocabularyReference.find((x) => x.french === 'après').note = 'sequence';
  })],
  ['a practice gloss cut (practice_instruction_as_gloss)', only('2024-01-10-unit1-practice', (c) => {
    c.sentences[0].instruction = 'I am';
  })],
  ['a misplaced-blank sentence loses a word (practice_blank_misplaced)', only('2024-01-23-unit2-practice', (c) => {
    c.sentences[6].text = c.sentences[6].text.replace('Il est', 'Il');
  })],
  ['a joined blank hint reworded (practice_blank_hints_joined)', only('2024-05-25-unit-8-practice', (c) => {
    c.sentences[0].blanks[0].hint = 'something else';
  })],
  ["the negation guide's part note dropped (negation_row_notes_joined)", only('2026-11-24-negation-guide', (c) => {
    delete c.guide.sections[1].note;
  })],
  ["Reading 4's scene heading dropped", only('2024-03-30-reading-4', (c) => {
    c.readingPassage.text = c.readingPassage.text.replace(/^## /m, '');
  })],
  ['a position-word fix replaced (position_words_fixed)', only('2024-01-06-basic-nouns', (c) => {
    c.exercises[0].hint = 'Combine';
  })],
  ['a unit exam title replaced (unit_exam_title_derived)', only('2024-01-11-unit1-exam', (c) => {
    c.title = 'Module 13: Unit exam';
  })],
  ['a ruled choice item changed (savoir_connaitre_choice)', only('2024-05-10-unit-7-exam', (c) => {
    c.exercises[18].expectedAnswer = 'anything';
  })],
  ['a story caption translation changed (story_translation)', only('2024-01-09-reading1', (c) => {
    c.readingPassage.translation = c.readingPassage.translation.replace('Paul, a cat and a dog.', 'Paul.');
  })],
  ["a position-word fix swapped for another card's fix (position_words_fixed, own path)", only('2024-01-06-basic-nouns', (c) => {
    c.concepts[1].definition = 'Every exercise uses être or avoir - reinforcing what you learned!';
  })],
  ['a position-word hint set to a mistake answer of the module (position_words_fixed, own path)', only('2024-01-06-basic-nouns', (c) => {
    c.exercises[0].hint = "j'ai le livre";
  })],
  ["a caption's English swapped for another block's (story_translation, own block)", only('2024-01-09-reading1', (c) => {
    c.readingPassage.translation = c.readingPassage.translation.replace('Paul, a cat and a dog.', 'Thank you and goodbye!');
  })],
  ['an English sentence of a Reading 5 block replaced by its neighbour (story_translation, exact block)', only('2024-04-13-reading-5', (c) => {
    c.readingPassage.translation = c.readingPassage.translation.replace('They drink a lot.', 'They like it.');
  })],
  ["two English sentences of Reading 5's subtitle block swapped (story_translation, in order)", only('2024-04-13-reading-5', (c) => {
    const [a, b] = ['The city of Arles.', 'It is sometimes said to make one see green fairies.'];
    c.readingPassage.translation = c.readingPassage.translation.replace(a, '\u0000').replace(b, a).replace('\u0000', b);
  })],
  ['two concept ids swapped in a module main lacks (concept_id_added)', only('2026-11-24-numbers', (c) => {
    [c.concepts[0].id, c.concepts[1].id] = [c.concepts[1].id, c.concepts[0].id];
  })],
  ['a passage title added back (story_title_from_stories)', only('2024-01-09-reading1', (c) => {
    c.readingPassage.title = 'junk';
  })],
  ['junk appended to a twin card note (vocabulary_card_listed_twice)', only('2024-05-23-temporal-words', (c) => {
    c.vocabularyReference.find((x) => x.french === 'après').note += ' JUNK';
  })],
  ['two new item ids swapped (new_item_ids)', only('2026-11-24-numbers', (c) => {
    const ex = c.exercises.filter((e) => !/\.\d+$/.test(e.id));
    [ex[0].id, ex[1].id] = [ex[1].id, ex[0].id];
  })],
];
for (const [name, mutate] of PLANTED)
  test(`a planted loss is caught: ${name}`, () => {
    const r = run(mutate);
    assert.ok(r.unexplained.length > 0 || r.off.length > 0, `${name} passed the golden test`);
  });
