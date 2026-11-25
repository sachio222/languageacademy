// Task 5: the outline written from today's unit configs, and the frozen table of live positions.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../vite-shim.mjs';
import { readFileSync, existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { outlineFromUnitConfigs, checkOutline, mergeOutline, CAN_DO } from '../migrate/outline.mjs';
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
const frozen = JSON.parse(readFileSync(POSITIONS, 'utf8'));

test('committed table: count and spot values', () => {
  assert.equal(Object.keys(frozen).length, 172);
  assert.equal(frozen['1'], '2024-01-01-famous-words');
  assert.equal(frozen['13'], '2024-01-11-unit1-exam');
  assert.equal(frozen['14'], '2024-01-12-demonstratives'); // first module of Unit 2 on main
  assert.equal(frozen['161'], '2024-04-01-alphabet'); // Reference follows Unit 12
  assert.equal(frozen['172'], '2024-01-28-verb-pattern-help');
  const values = Object.values(frozen);
  for (const key of ['2026-11-24-numbers', '2026-11-24-negation-guide']) assert.ok(!values.includes(key), `${key} is not on main`);
});

// The whole table against main's own unit configs, read from git. A shallow clone (CI) lacks the commit.
const HAS_E4392E7 = spawnSync('git', ['cat-file', '-e', 'e4392e7^{commit}'], { cwd: repo }).status === 0;
test('committed table is frozenPositions of main at e4392e7', { skip: !HAS_E4392E7 && 'e4392e7 is not in this clone' }, async (t) => {
  const dir = mkdtempSync(path.join(tmpdir(), 'la-e4392e7-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const archive = spawnSync('git', ['archive', 'e4392e7', 'src'], { cwd: repo, maxBuffer: 1 << 28 });
  assert.equal(archive.status, 0, String(archive.stderr));
  const untar = spawnSync('tar', ['-x', '-C', dir], { input: archive.stdout });
  assert.equal(untar.status, 0, String(untar.stderr));
  const main = await import(pathToFileURL(path.join(dir, 'src/lessons/unitConfigLoader.js')).href);
  assert.deepEqual(frozen, frozenPositions(main.unitConfigs));
});

/* ---------- run.mjs outline: an existing course.json is kept (spec 8.2 item 2) ---------- */
const RUN = path.join(repo, 'scripts/content/migrate/run.mjs');
const runOutline = (...args) =>
  spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', RUN, 'outline', ...args], { encoding: 'utf8' });
// A content root holding the outline written from today's configs, changed by `edit`. Not the committed
// course.json: later tasks edit that by hand, and these tests must not depend on their edits.
const GENERATED = JSON.stringify(outline, null, 2) + '\n';
function rootWith(t, edit = () => {}) {
  const root = mkdtempSync(path.join(tmpdir(), 'la-outline-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const o = JSON.parse(GENERATED);
  edit(o);
  writeFileSync(path.join(root, 'course.json'), JSON.stringify(o, null, 2) + '\n');
  return root;
}
const readRoot = (root) => JSON.parse(readFileSync(path.join(root, 'course.json'), 'utf8'));
const unitByKey = (o, k) => o.units.find((u) => u.unit_key === k);

test('committed course.json passes --check', () => {
  const r = runOutline('--check');
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

const handEdit = (o) => {
  unitByKey(o, 'unit2').entries.splice(3, 0, 'relative-qui-help');
  o.units.push({ unit_key: 'unit13', name: 'Stories', entries: ['story-one'] });
  o.shelf.pages.push('phrasebook');
};

test('a hand-inserted guide, unit13 and a shelf page pass --check and survive a rerun', (t) => {
  const root = rootWith(t, handEdit);
  const before = readFileSync(path.join(root, 'course.json'), 'utf8');
  const check = runOutline('--root', root, '--check');
  assert.equal(check.status, 0, check.stdout + check.stderr);
  const rerun = runOutline('--root', root);
  assert.equal(rerun.status, 0, rerun.stdout + rerun.stderr);
  assert.match(rerun.stdout, /unchanged/);
  assert.equal(readFileSync(path.join(root, 'course.json'), 'utf8'), before);
});

test('a legacy key moved to another unit fails --check', (t) => {
  const root = rootWith(t, (o) => {
    const u3 = unitByKey(o, 'unit3');
    u3.entries = u3.entries.filter((k) => k !== '2024-01-27-aller');
    unitByKey(o, 'unit4').entries.push('2024-01-27-aller');
  });
  const r = runOutline('--root', root, '--check');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /config_key_moved 2024-01-27-aller is in unit4 but today's configs put it in unit3/);
  // A rerun cannot settle it without dropping the edit: it keeps the file and still fails.
  const rerun = runOutline('--root', root);
  assert.equal(rerun.status, 1);
  assert.deepEqual(unitByKey(readRoot(root), 'unit4').entries.at(-1), '2024-01-27-aller');
});

test('a legacy key listed twice fails --check', (t) => {
  const root = rootWith(t, (o) => unitByKey(o, 'unit5').entries.push('2024-01-27-aller'));
  const r = runOutline('--root', root, '--check');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /config_key_twice 2024-01-27-aller is listed 2 times \(unit3, unit5\)/);
});

test('a deleted legacy key fails --check, and a rerun puts it back after its neighbour', (t) => {
  const root = rootWith(t, (o) => {
    handEdit(o);
    const u3 = unitByKey(o, 'unit3');
    u3.entries = u3.entries.filter((k) => k !== '2024-01-26-venir');
    o.shelf.pages = o.shelf.pages.filter((k) => k !== '2024-04-04-holidays');
  });
  const check = runOutline('--root', root, '--check');
  assert.equal(check.status, 1);
  assert.match(check.stderr, /config_key_missing 2024-01-26-venir \(unit3 in today's configs\)/);
  assert.match(check.stderr, /config_key_missing 2024-04-04-holidays \(shelf in today's configs\)/);
  const rerun = runOutline('--root', root);
  assert.equal(rerun.status, 0, rerun.stdout + rerun.stderr);
  assert.match(rerun.stdout, /unit3: inserted 2024-01-26-venir after 2024-01-25-contractions/);
  assert.match(rerun.stdout, /shelf: inserted 2024-04-04-holidays after 2024-04-03-days-months/);
  const expected = JSON.parse(GENERATED);
  handEdit(expected);
  assert.deepEqual(readRoot(root), expected, 'only the deleted keys came back; the hand edits stayed');
  assert.equal(runOutline('--root', root, '--check').status, 0);
});

test('--force regenerates from the configs alone', (t) => {
  const root = rootWith(t, handEdit);
  const r = runOutline('--root', root, '--force');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(readFileSync(path.join(root, 'course.json'), 'utf8'), GENERATED);
});

test('mergeOutline puts back a whole missing unit in config order', () => {
  const o = JSON.parse(JSON.stringify(outline));
  o.units.splice(4, 1); // unit5
  o.units.push({ unit_key: 'unit13', name: 'Stories', entries: ['story-one'] });
  assert.deepEqual(checkOutline(o, outline).map((p) => p.code), Array(13).fill('config_key_missing'));
  const { outline: merged, report: added } = mergeOutline(o, outline);
  assert.deepEqual(merged.units.map((u) => u.unit_key), [...outline.units.map((u) => u.unit_key), 'unit13']);
  assert.deepEqual(merged.units[4], outline.units[4]);
  assert.deepEqual(added, ['unit5: unit added from today\'s configs with 13 entries']);
  assert.deepEqual(checkOutline(merged, outline), []);
});

test('a retired legacy key counts as placed', () => {
  const o = JSON.parse(JSON.stringify(outline));
  const u3 = unitByKey(o, 'unit3');
  u3.entries = u3.entries.filter((k) => k !== '2024-02-02-combining');
  o.retired.push({ module_key: '2024-02-02-combining', reason: 'merged into the possessives lessons' });
  assert.deepEqual(checkOutline(o, outline), []);
  assert.deepEqual(mergeOutline(o, outline).report, []);
});
