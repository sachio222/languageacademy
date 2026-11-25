// Task 7: guides converted to module files (spec 5.6, 6): L's four guides, the Liaison additions from LiaisonHelp.jsx,
// the negation guide from its sections, and reruns that keep hand edits.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { guideFromL, guideFromSections, convertGuide, blockFrench, lGuideFor } from '../migrate/guide.mjs';
import { todaysModules, readLSources, liaisonJsx } from '../migrate/sources.mjs';
import { validateModule } from '../schema/module.mjs';
import { tokenize, fold } from '../../graph/fr/tokenize.mjs';

const L = readLSources();
const { configs } = await todaysModules();
const clone = (v) => JSON.parse(JSON.stringify(v));
const cells = (part) => (part.blocks || []).flatMap(blockFrench);
const errors = (mod, unitIndex) => validateModule(mod, { unitIndex }).filter((p) => p.severity !== 'warning');

test('l-sources.json holds L’s four guides and eleven stories', () => {
  assert.ok(L, 'content/fr/legacy/l-sources.json is written by `pnpm content:migrate l-sources`');
  assert.deepEqual(L.guides.map((g) => g.slug), ['cognates', 'liaison', 'questions', 'verb-patterns']);
  assert.equal(L.stories.length, 11);
  assert.ok(L.stories.every((s) => !('questions' in s)), 'questions come from the module files');
});

test('cognates from L', () => {
  const mod = guideFromL(L.guides[0], '2024-10-21-cognates-help');
  assert.equal(mod.parts.length, 5);
  assert.equal(mod.checks.length, 3);
  for (const c of mod.checks) assert.equal(c.options.filter((o) => o.right).length, 1, c.ask);
  assert.deepEqual(mod.checks.map((c) => c.id), ['k1', 'k2', 'k3']);
  assert.equal(mod.minutes, 4);
  assert.equal(mod.parts[0].id, 'p-words-you-may-know');
  assert.deepEqual(errors(mod, 1), []);
});

test('each L guide maps to its module by component', () => {
  assert.equal(lGuideFor(L.guides, '2024-01-19-questions-help').slug, 'questions');
  assert.equal(lGuideFor(L.guides, '2024-01-28-verb-pattern-help').slug, 'verb-patterns');
  assert.equal(lGuideFor(L.guides, '2026-11-24-negation-guide'), null);
});

test('questions: the est-ce que part holds build, then lines with linesH as its heading', () => {
  const mod = guideFromL(lGuideFor(L.guides, '2024-01-19-questions-help'), '2024-01-19-questions-help');
  const part = mod.parts.find((p) => p.heading === '{Est-ce que}');
  assert.ok(part, mod.parts.map((p) => p.heading).join(' | '));
  assert.deepEqual(part.blocks.map((b) => Object.keys(b).filter((k) => k !== 'heading')[0]), ['build', 'lines']);
  assert.equal(part.blocks[1].heading, 'With a question word in front');
  assert.equal(mod.parts.find((p) => p.heading === 'Which one to use').text.length, 0, 'a part with no text has an empty list');
  assert.deepEqual(errors(mod, 2), []);
});

test('liaison keeps branch additions', () => {
  const r = convertGuide(configs.get('2024-10-20-liaison-help'), { lGuides: L.guides, liaisonJsx: liaisonJsx() });
  const parts = r.mod.parts;
  const elision = parts.find((p) => cells(p).includes("j'ai") && cells(p).includes("l'ami"));
  assert.ok(elision, 'an elision part with j’ai and l’ami');
  // LiaisonHelp.jsx's silent final letters: chat, salut, enfant (the brief named "petit", which the file does not use).
  const silent = parts.find((p) => ['les', 'chat', 'salut', 'enfant'].every((w) => cells(p).includes(w)));
  assert.ok(silent, 'a silent-final-letter part');
  // The file shows the silent letters first and elision last; L's four parts sit between.
  assert.equal(parts[0], silent);
  assert.equal(parts.at(-1), elision);
  assert.equal(parts.length, 6);
  assert.equal(elision.heading, "Elision: {l'ami, j'ai}");
  assert.deepEqual(errors(r.mod, 1), []);
});

test('negation guide parts', () => {
  const old = configs.get('2026-11-24-negation-guide');
  const { mod, report } = guideFromSections(old);
  const all = new Set(mod.parts.flatMap(cells));
  for (const s of old.guide.sections) {
    for (const r of s.rows) assert.ok(all.has(r.french), r.french);
    for (const e of s.examples) assert.ok(all.has(e.french), e.french);
  }
  for (const p of mod.parts) assert.deepEqual(p.blocks.map((b) => Object.keys(b)[0]), ['table', 'lines']);
  assert.equal(mod.parts[0].heading, 'Not: {ne … pas}');
  assert.equal(mod.parts[1].blocks[0].table.rows[3].note, '{Le}, {la} and {les} stay as they are.');
  assert.deepEqual(mod.checks, []);
  assert.ok(report.some((l) => l.kind === 'estimate'), 'minutes is an estimate, reported');
});

const CHECKS = [
  { id: 'k1', ask: 'Which one means “I don’t have a cat”?', options: [{ text: "Je n'ai pas de chat.", fr: true, right: true }, { text: "Je n'ai pas un chat.", fr: true }], why: 'x' },
  { id: 'k2', ask: 'b', options: [{ text: 'a', right: true }, { text: 'b' }], why: 'x' },
  { id: 'k3', ask: 'c', options: [{ text: 'a', right: true }, { text: 'b' }], why: 'x' },
];

test('negation checks written by hand survive a rerun, and --force applies them again', () => {
  const old = configs.get('2026-11-24-negation-guide');
  const first = convertGuide(old, {});
  assert.ok(first.report.some((l) => l.kind === 'guide_checks_by_hand'));
  const edited = clone(first.mod);
  edited.checks = clone(CHECKS);
  const second = convertGuide(old, { existing: edited, record: first.record });
  assert.deepEqual(second.mod, edited);
  assert.deepEqual(second.handFixes.checks, CHECKS);
  assert.deepEqual(second.record, first.record, 'the record keeps the converter’s base');
  const forced = convertGuide(old, { handFixes: second.handFixes });
  assert.deepEqual(forced.mod.checks, CHECKS);
});

test('an L guide: a hand edit on one part stays, a renamed heading keeps its id', () => {
  const old = configs.get('2024-10-21-cognates-help');
  const first = convertGuide(old, { lGuides: L.guides });
  const edited = clone(first.mod);
  edited.parts[1].note = 'A note written by hand.';
  const lGuides = clone(L.guides);
  lGuides[0].parts[2].h = 'Nearly the same';
  const second = convertGuide(old, { lGuides, existing: edited, record: first.record });
  assert.equal(second.mod.parts[1].note, 'A note written by hand.');
  assert.equal(second.mod.parts[2].heading, 'Nearly the same');
  assert.equal(second.mod.parts[2].id, first.mod.parts[2].id);
  assert.deepEqual(second.mod.parts.map((p) => p.id), first.mod.parts.map((p) => p.id));
  assert.ok(second.report.some((l) => l.kind === 'source_changed' && l.path === 'parts[2]'), JSON.stringify(second.report.filter((l) => l.kind !== 'dropped_field')));
});

test('the written negation guide has three checks in words taught by the start of Unit 2', () => {
  const mod = JSON.parse(readFileSync(fileURLToPath(new URL('../../../content/fr/modules/2026-11-24-negation-guide.json', import.meta.url)), 'utf8'));
  assert.equal(mod.checks.length, 3);
  for (const c of mod.checks) assert.equal(c.options.filter((o) => o.right).length, 1, c.ask);
  assert.deepEqual(errors(mod, 2), []);
  // être, avoir, articles, Unit 1 nouns and pronouns, and the guide's own ne … pas, pas de, ne … plus, ne … rien,
  // ne … jamais.
  const course = JSON.parse(readFileSync(fileURLToPath(new URL('../../../content/fr/course.json', import.meta.url)), 'utf8'));
  const allowed = new Set(['ne', "n'", 'pas', 'de', "d'", 'plus', 'rien', 'jamais']);
  for (const key of ['2024-01-01-pronouns', '2024-01-02-etre', '2024-01-04-avoir', '2024-01-05-articles', '2024-01-06-basic-nouns', '2024-01-07-plurals']) {
    assert.ok(course.units[0].entries.includes(key));
    const lesson = JSON.parse(readFileSync(fileURLToPath(new URL(`../../../content/fr/modules/${key}.json`, import.meta.url)), 'utf8'));
    for (const w of lesson.vocabulary) for (const t of tokenize(w.fr)) allowed.add(fold(t.surface));
  }
  const french = mod.checks.flatMap((c) => [
    ...[c.say, c.show].filter(Boolean),
    ...c.options.filter((o) => o.fr).map((o) => o.text),
    ...[c.ask, c.why].flatMap((t) => [...t.matchAll(/\{([^}]+)\}/g)].map((m) => m[1])),
  ]);
  const outside = [...new Set(french.flatMap((t) => tokenize(t).map((x) => fold(x.surface))))].filter((w) => !allowed.has(w));
  assert.deepEqual(outside, []);
});
