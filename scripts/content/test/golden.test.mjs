// Task 8, spec 8.2 "Proof the live screens see the same lessons": every lesson today's lessonData.js builds
// (fixtures/golden-lessons.json, written by `node scripts/content/migrate/run.mjs golden`) is compared, field by field,
// with toLegacyLesson of its converted file. A difference passes only when fixtures/golden-allowed.json puts it in a
// class whose basis is a migration-report line of Tasks 6 and 7, Task 6's data or a ledger ruling, and whose relation
// ties the difference's values to that basis exactly; each class holds exactly the count it records, so a new
// difference fails until someone reads it and names its reason.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadCourse, CONTENT_ROOT } from '../load.mjs';
import { frenchSpans } from '../spans.mjs';
import { toLegacyLesson, plain } from '../legacy/to-legacy-lesson.mjs';
import { compareLesson, classify, parseReport, describe, goldenChecks } from '../legacy/golden.mjs';
import { REWRITES } from '../migrate/holds.mjs';

const here = new URL('./fixtures/', import.meta.url);
const readJson = (u) => JSON.parse(readFileSync(u, 'utf8'));
const snapshot = readJson(new URL('golden-lessons.json', here));
const allowed = readJson(new URL('golden-allowed.json', here));
const liveIds = readJson(join(CONTENT_ROOT, 'legacy', 'live-ids.json'));
const lSources = readJson(join(CONTENT_ROOT, 'legacy', 'l-sources.json'));
const handFixes = readJson(join(CONTENT_ROOT, 'legacy', 'hand-fixes.json'));
const report = parseReport(readFileSync(join(CONTENT_ROOT, 'migration-report.md'), 'utf8'));

// The course as today's lessonData.js numbers it: a module written after the snapshot (a new guide goes to L only,
// Jake 2026-11-25) has no live lesson, so it takes no live position and nothing is compared for it. A module the
// migration converted from the live app (it has live ids) is never left out this way.
function liveView(full, inSnapshot) {
  const modules = new Map();
  let position = 0;
  const units = full.units.map((u) => ({
    ...u,
    modules: u.modules.filter((m) => inSnapshot.has(m.module_key) || liveIds[m.module_key]).map((m) => {
      const live = { ...m, position: (position += 1) };
      modules.set(m.module_key, live);
      return live;
    }),
  }));
  for (const p of full.shelf.pages) modules.set(p.module_key, p);
  const writtenAfter = [...full.modules.keys()].filter((k) => !modules.has(k));
  return { course: { ...full, units, modules }, writtenAfter };
}
const { course, writtenAfter } = liveView(loadCourse(), new Set(snapshot.map((l) => l.moduleKey)));
const checks = goldenChecks({ liveIds, course, lSources, handFixes, rewrites: REWRITES, plain, adapt: (m) => toLegacyLesson(m, { liveIds, course }) });

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

const adapted = new Map();
const adapt = (mod) => {
  if (!adapted.has(mod.module_key)) adapted.set(mod.module_key, JSON.parse(JSON.stringify(toLegacyLesson(mod, { liveIds, course }))));
  return structuredClone(adapted.get(mod.module_key));
};

// mutate(moduleKey, lesson): a planted change to the adapter's lesson, for the planted-loss tests.
function run(mutate = null) {
  const diffs = [];
  const stats = { lessons: 0, fields: 0 };
  const seen = new Set();
  for (const live of snapshot) {
    const mod = course.modules.get(live.moduleKey);
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
  for (const [key, mod] of course.modules)
    if (mod.status !== 'planned' && !seen.has(key)) diffs.push({ module_key: key, kind: mod.kind, path: '(lesson)', live: undefined, converted: key });
  const r = classify(diffs, allowed.classes, report, checks);
  const counts = Object.fromEntries([...r.byClass].map(([c, ds]) => [c, ds.length]));
  const off = allowed.classes.filter((c) => counts[c.class] !== c.count).map((c) => `${c.class} ${c.count} -> ${counts[c.class]}`);
  return { diffs, stats, counts, off, ...r };
}

const result = run();

test('adapter shows the same lessons as today', () => {
  const { unexplained, stats } = result;
  console.log(`golden: ${stats.lessons} lessons, ${stats.fields} values compared, ${result.diffs.length} differences, ${unexplained.length} unexplained`);
  assert.equal(stats.lessons, 171, 'every converted module is compared with its live lesson');
  assert.deepEqual(unexplained.map(describe).slice(0, 50), [], `${unexplained.length} differences with no report line or ruling behind them`);
});

test('a module written after the snapshot takes no live number and is not compared', () => {
  // Exactly the guides written after the snapshot; a new module joins this list by hand.
  assert.deepEqual(writtenAfter, ['gender-endings-guide', 'which-past-guide', 'future-conditional-guide', 'past-with-etre-guide', 'subjunctive-que-guide']);
  for (const key of writtenAfter) assert.equal(liveIds[key], undefined, `${key} was converted from the live app`);
  // The reading after the guide keeps its live number.
  assert.equal(toLegacyLesson(course.modules.get('2024-03-30-reading-4'), { liveIds, course }).id, 52);
});

test('every allowed class holds exactly the differences it records', () => {
  assert.deepEqual(result.off, []);
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
