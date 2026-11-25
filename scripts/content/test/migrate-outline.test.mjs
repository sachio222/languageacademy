// Task 5: the outline written from today's unit configs, and the frozen table of live positions.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import './vite-shim.mjs';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { outlineFromUnitConfigs, CAN_DO } from '../migrate/outline.mjs';
import { frozenPositions } from '../migrate/positions.mjs';
import { validateOutline } from '../outline.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const imp = (p) => import(pathToFileURL(path.join(repo, p)).href);
const { unitConfigs } = await imp('src/lessons/unitConfigLoader.js');
const { lessons } = await imp('src/lessons/lessonData.js');
const settings = JSON.parse(readFileSync(path.join(repo, 'curriculum-graph/core/settings.json'), 'utf8'));

const { outline, report } = outlineFromUnitConfigs(unitConfigs, { opensWords: settings.reference.modules });
const unitOf = (key) => outline.units.filter((u) => u.entries.includes(key)).map((u) => u.unit_key);
const referenceConfig = unitConfigs.find((u) => u.metadata.isReference);

test('every module once', () => {
  const listed = [...outline.units.flatMap((u) => u.entries), ...outline.shelf.pages];
  const all = new Set(unitConfigs.flatMap((u) => u.modules.map((m) => m.moduleKey)));
  assert.equal(new Set(listed).size, listed.length, 'a module key is listed twice');
  assert.deepEqual([...listed].sort(), [...all].sort());
});

test('reference is a shelf', () => {
  assert.equal(outline.units.length, 12);
  assert.ok(!outline.units.some((u) => u.unit_key === 'unit13'), 'unit13 exists');
  assert.deepEqual(outline.units.map((u) => u.unit_key), Array.from({ length: 12 }, (_, i) => `unit${i + 1}`));
  const pages = referenceConfig.modules.filter((m) => !m.isHelpModule).map((m) => m.moduleKey);
  assert.equal(pages.length, 9);
  assert.deepEqual(outline.shelf.pages, pages);
  assert.deepEqual(unitOf('2024-10-21-cognates-help'), ['unit1']);
  assert.ok(!outline.shelf.pages.includes('2024-10-21-cognates-help'));
  for (const key of ['2024-10-20-liaison-help', '2024-01-28-verb-pattern-help']) assert.ok(!outline.shelf.pages.includes(key), key);
  assert.ok(report.some((line) => /2024-10-21-cognates-help/.test(line)), 'the report names the guides taken off the shelf');
});

test('folder does not decide unit', () => {
  for (const key of ['2024-01-27-aller', '2024-01-26-venir', '2024-01-28-verb-pattern-help']) assert.deepEqual(unitOf(key), ['unit3'], key);
  assert.deepEqual(unitOf('2024-05-15-daily-actions-1'), ['unit11']);
  for (const key of ['2024-06-06-reciprocal-reflexives', '2024-06-07-reflexive-past']) assert.deepEqual(unitOf(key), ['unit8'], key);
});

test('branch modules are in the outline', () => {
  assert.deepEqual(outline.units[1].entries.slice(0, 2), ['2026-11-24-numbers', '2026-11-24-negation-guide']);
});

test('unit text comes from the unit config and L can-do table', () => {
  const u1 = outline.units[0];
  assert.equal(u1.name, 'Essential Grammar');
  assert.equal(u1.description, unitConfigs[0].metadata.description);
  assert.deepEqual(u1.theme, { icon: unitConfigs[0].metadata.icon, color: unitConfigs[0].metadata.color });
  assert.equal(u1.can_do, 'introduce yourself, say who has what and join two ideas with {et} and {mais}');
  assert.equal(u1.can_do_short, 'introduce yourself');
  assert.equal(u1.can_do_example_fr, 'Je suis {name}. J’ai un chat. Je suis fatiguée, mais contente.');
  assert.equal(outline.units[11].can_do_short, 'ask any question');
});

test('outline passes the outline checks when every file exists', () => {
  const kinds = new Map();
  for (const u of unitConfigs) for (const m of u.modules) kinds.set(m.moduleKey, m.isHelpModule ? 'guide' : u.metadata.isReference ? 'reference' : 'lesson');
  const modulesByKey = new Map([...kinds].map(([k, kind]) => [k, { module_key: k, kind, status: 'written' }]));
  assert.deepEqual(validateOutline(outline, modulesByKey), []);
});

test('opens_words are shelf pages from the checker settings', () => {
  assert.deepEqual(outline.shelf.opens_words, settings.reference.modules);
  for (const k of outline.shelf.opens_words) assert.ok(outline.shelf.pages.includes(k), k);
});

const J_PLAN = path.resolve(repo, '../../agent_workspaces/language_academy/projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/l/j-plan.js');
test('can-do table is a faithful copy of L', { skip: !existsSync(J_PLAN) && 'prototype L is not on this machine' }, () => {
  const src = readFileSync(J_PLAN, 'utf8');
  const m = src.match(/var CAN_DO = (\{[\s\S]*?\n {2}\});/);
  assert.ok(m, 'CAN_DO not found in j-plan.js');
  const theirs = vm.runInNewContext(`(${m[1]})`, { NAME: '{name}' });
  assert.deepEqual(JSON.parse(JSON.stringify(CAN_DO)), JSON.parse(JSON.stringify(theirs)));
});

test('frozen positions', () => {
  const mod = (moduleKey, extra = {}) => ({ moduleKey, ...extra });
  const fixtureConfigs = [
    { metadata: { id: 1 }, modules: [mod('a-one'), mod('a-guide', { isHelpModule: true }), mod('a-two')] },
    { metadata: { id: 12 }, modules: [mod('l-one')] },
    { metadata: { id: 13, isReference: true }, modules: [mod('r-page'), mod('a-guide', { isHelpModule: true })] },
  ];
  assert.deepEqual(frozenPositions(fixtureConfigs), { 1: 'a-one', 2: 'a-guide', 3: 'a-two', 4: 'l-one', 5: 'r-page', 6: 'a-guide' });
  assert.equal(frozenPositions(fixtureConfigs)['1'], 'a-one');
});

test('frozen positions number lessons exactly as lessonData.js does', () => {
  const table = frozenPositions(unitConfigs);
  assert.equal(Object.keys(table).length, lessons.length);
  for (const l of lessons) assert.equal(table[String(l.id)], l.moduleKey, `position ${l.id}`);
});

const POSITIONS = path.join(repo, 'content/fr/legacy/positions-e4392e7.json');
test('committed table is main at e4392e7', () => {
  const table = JSON.parse(readFileSync(POSITIONS, 'utf8'));
  assert.equal(Object.keys(table).length, 172);
  assert.equal(table['1'], '2024-01-01-famous-words');
  assert.equal(table['14'], '2024-01-12-demonstratives');
  assert.equal(table['160'], '2024-03-25-multi-clause-questions'); // last module of Unit 12
  assert.equal(table['161'], '2024-04-01-alphabet'); // Reference follows Unit 12
  assert.equal(table['172'], '2024-01-28-verb-pattern-help');
  const values = Object.values(table);
  for (const key of ['2026-11-24-numbers', '2026-11-24-negation-guide']) assert.ok(!values.includes(key), `${key} is not on main`);
  // main differs from this branch only by the two modules inserted at the start of Unit 2.
  const branchOnly = new Set(['2026-11-24-numbers', '2026-11-24-negation-guide']);
  const mainConfigs = unitConfigs.map((u) => ({ ...u, modules: u.modules.filter((m) => !branchOnly.has(m.moduleKey)) }));
  assert.deepEqual(table, frozenPositions(mainConfigs));
});

const RUN = path.join(repo, 'scripts/content/migrate/run.mjs');
test('committed course.json is what the script writes', () => {
  const r = spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', RUN, 'outline', '--check'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
});
