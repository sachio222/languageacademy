// plan:stubs: the plan's modules as planned module files and an outline, without touching anything written.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadCourse } from '../../content/load.mjs';
import { PLAN_FILE, REPO_ROOT, readPlan } from '../plan.mjs';
import { planOutline, planToStubs, stubsCommand } from '../stubs.mjs';

const module = (key, kind, more = {}) => ({ module_key: key, kind, title: `Title of ${key}`, teaches: { words: [], constructions: [] }, minutes: 10, ...more });
const PLAN = {
  schema: 'la-course-plan@1', language: 'xx', native: 'en',
  units: [
    { unit_key: 'unit2', title: 'Second {deux}', can_do: 'c', setting: { cast: ['A'] }, modules: [
      module('l-new', 'lesson', { teaches: { words: ['xx:lex:known', 'xx:lex:pending'], constructions: ['xx:cx:one'] }, note: 'a note' }),
      module('l-done', 'lesson'),
      module('r-new', 'reading', { teaches: { words: ['xx:lex:known2'], constructions: [] }, reading: { parts: [{ kind: 'story', title: 't', title_native: 't' }], premise: 'p', must_use: ['xx:cx:one', 'xx:cx:one'] } }),
      module('e-new', 'unit_exam', { exam: { items: 20, minutes: 15, checks: 'three items a goal' } }),
    ] },
    { unit_key: 'unit3', title: 'Third', can_do: 'c', setting: { cast: ['A'] }, modules: [module('l-third', 'lesson')] },
  ],
};
const GRAPH = { words: new Set(['xx:lex:known', 'xx:lex:known2']), constructions: new Set(['xx:cx:one']) };

test('a stub holds what the plan settles; a written module gets none; a word the graph lacks is left out and listed', () => {
  const { stubs, pending } = planToStubs(PLAN, { graphIds: GRAPH, written: new Set(['l-done']) });
  assert.deepEqual(stubs.map((s) => s.module_key), ['l-new', 'r-new', 'e-new', 'l-third']);
  assert.deepEqual(stubs[0], {
    schema: 'la-module@1', module_key: 'l-new', kind: 'lesson', status: 'planned', title: 'Title of l-new',
    plan: { words: ['xx:lex:known'], constructions: ['xx:cx:one'], source: PLAN_FILE },
  });
  assert.deepEqual(pending, [{ module_key: 'l-new', id: 'xx:lex:pending' }]);
  assert.deepEqual(stubs[1].plan, { words: ['xx:lex:known2'], constructions: ['xx:cx:one'], source: PLAN_FILE }, 'a reading names the patterns its text must use, once each');
  assert.equal('title' in stubs[2], false, 'a unit exam takes its title from its unit');
  assert.deepEqual(stubs[2].plan, { words: [], constructions: [], source: PLAN_FILE }, 'notes stay in the plan');
});

test('a title that names a position is refused', () => {
  const plan = { ...PLAN, units: [{ ...PLAN.units[1], modules: [module('l-third', 'lesson', { title: 'Lesson 3' })] }] };
  assert.throws(() => planToStubs(plan, { graphIds: GRAPH }), /names a position/);
});

test('the outline lists each plan unit in plan order, keeps written modules the plan does not list, and drops stale stubs', () => {
  const outline = { schema: 's', units: [
    { unit_key: 'unit1', name: 'First', entries: ['w1', 'w2'] },
    { unit_key: 'unit2', name: 'Old name', can_do: 'kept', entries: ['w3', 'l-third', 'stale-one', 'l-done'] },
    { unit_key: 'unit9', name: 'Gone', entries: ['stale-two'] },
  ] };
  const out = planOutline(outline, PLAN, { stale: new Set(['stale-one', 'stale-two']), writtenIn: (k) => k === 'w3' });
  assert.deepEqual(out.units, [
    { unit_key: 'unit1', name: 'First', entries: ['w1', 'w2'] },
    { unit_key: 'unit2', name: 'Old name', can_do: 'kept', entries: ['w3', 'l-new', 'l-done', 'r-new', 'e-new'] },
    { unit_key: 'unit3', name: 'Third', entries: ['l-third'] },
  ]);
  assert.deepEqual(outline.units[1].entries, ['w3', 'l-third', 'stale-one', 'l-done'], 'the outline given is not changed');
  const renamed = planOutline(outline, PLAN, { stale: new Set(['stale-one', 'stale-two', 'w3']) });
  assert.equal(renamed.units.find((u) => u.unit_key === 'unit2').name, 'Second {deux}', 'a unit with nothing written takes the plan title');
});

// The real command on a copy of each language's content: it must leave every written file as it was.
const languages = readdirSync(join(REPO_ROOT, 'content')).filter((lang) => existsSync(join(REPO_ROOT, 'content', lang, PLAN_FILE)));
for (const lang of languages) {
  test(`${lang}: stubs written from the plan load as a course, change no written file, and a second run changes nothing`, async () => {
    const root = mkdtempSync(join(tmpdir(), 'la-plan-stubs-'));
    const log = console.log;
    const err = console.error;
    try {
      console.log = console.error = () => {};
      cpSync(join(REPO_ROOT, 'content', lang), join(root, 'content', lang), { recursive: true });
      symlinkSync(join(REPO_ROOT, 'curriculum-graph'), join(root, 'curriculum-graph'));
      const dir = join(root, 'content', lang, 'modules');
      const read = () => new Map(readdirSync(dir).map((f) => [f, readFileSync(join(dir, f), 'utf8')]));
      const before = read();
      const written = [...before].filter(([, text]) => JSON.parse(text).status !== 'planned');
      assert.equal(await stubsCommand({ repoRoot: root, lang, write: true }), 0);
      const after = read();
      for (const [f, text] of written) assert.equal(after.get(f), text, `${f} is written and must not change`);
      const plan = readPlan(root, lang);
      const planned = [...after].filter(([, text]) => JSON.parse(text).status === 'planned').map(([f]) => f.slice(0, -5)).sort();
      const writtenKeys = new Set(written.map(([f]) => f.slice(0, -5)));
      assert.deepEqual(planned, plan.units.flatMap((u) => u.modules.map((m) => m.module_key)).filter((k) => !writtenKeys.has(k)).sort());
      const course = loadCourse({ root: join(root, 'content', lang), graphDir: join(root, 'curriculum-graph', 'languages', lang) });
      const outline = JSON.parse(readFileSync(join(root, 'content', lang, 'course.json'), 'utf8'));
      const original = JSON.parse(readFileSync(join(REPO_ROOT, 'content', lang, 'course.json'), 'utf8'));
      const planUnits = new Set(plan.units.map((u) => u.unit_key));
      const hasWritten = (u) => u.entries.some((k) => writtenKeys.has(k));
      assert.deepEqual(outline.units.filter(hasWritten), original.units.filter(hasWritten).map((u) => (planUnits.has(u.unit_key) ? outline.units.find((x) => x.unit_key === u.unit_key) : u)), 'units of written modules keep their place and content');
      for (const pu of plan.units) assert.deepEqual(course.units.find((u) => u.unit_key === pu.unit_key).modules.map((m) => m.module_key).filter((k) => !writtenKeys.has(k) || pu.modules.some((m) => m.module_key === k)), pu.modules.map((m) => m.module_key));
      assert.equal(await stubsCommand({ repoRoot: root, lang, check: true }), 0, 'a second run finds nothing to change');
      const edited = join(dir, `${planned[0]}.json`);
      writeFileSync(edited, JSON.stringify({ ...JSON.parse(readFileSync(edited, 'utf8')), plan: { words: [], constructions: [], source: 'by-hand' } }));
      assert.equal(await stubsCommand({ repoRoot: root, lang, check: true }), 1, 'an edited stub is reported');
    } finally {
      console.log = log;
      console.error = err;
      rmSync(root, { recursive: true, force: true });
    }
  });
}

test('the outline takes a unit description, can-do lines and French example from the plan', async () => {
  const { planOutline } = await import('../stubs.mjs');
  const outline = { units: [] };
  const plan = { units: [{ unit_key: 'u1', title: 'One', can_do: 'You can show a newcomer round.', outline: { description: 'D.', can_do_short: 'show round', can_do_example_fr: 'Voilà.' }, modules: [{ module_key: 'a' }] }] };
  const out = planOutline(outline, plan);
  const u = out.units.find((x) => x.unit_key === 'u1');
  assert.equal(u.description, 'D.');
  assert.equal(u.can_do, 'show a newcomer round');
  assert.equal(u.can_do_short, 'show round');
  assert.equal(u.can_do_example_fr, 'Voilà.');
});
