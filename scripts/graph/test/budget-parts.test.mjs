// The issue budget in two parts (final review triage, ledger ruling 2026-11-25): legacy (Units 1 to 12 and the shelf,
// today's counts as a ceiling that only --lower-budget moves, and only down) and new (Unit 13 onward, every rule at
// zero), so a module written in a new unit can never hide behind the old units' headroom.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { budgetPartOf, checkBudgetParts, countByPart, BUDGET_PARTS } from '../budget.mjs';
import { loadCourse, CONTENT_ROOT } from '../../content/load.mjs';
import { runCheck } from '../check.mjs';
import { dueFor } from '../rules/reuse.mjs';
import { repoRoot } from './content-helpers.mjs';

const issue = (rule, moduleKey) => ({ rule, moduleKey, severity: 'error' });
const units = new Map([['a', 'unit3'], ['b', 'unit12'], ['c', 'unit13'], ['d', null]]);
const unitOf = (key) => units.get(key) ?? null;

test('Units 1 to 12, the shelf and course-wide issues are legacy; Unit 13 onward is new', () => {
  assert.deepEqual(BUDGET_PARTS, ['legacy', 'new']);
  assert.equal(budgetPartOf('unit1'), 'legacy');
  assert.equal(budgetPartOf('unit12'), 'legacy');
  assert.equal(budgetPartOf(null), 'legacy');
  assert.equal(budgetPartOf('unit13'), 'new');
  assert.equal(budgetPartOf('unit29'), 'new');
});

test('a new-unit issue is over budget however much headroom the legacy units have', () => {
  const budget = { legacy: { 'untaught-word': 10 }, new: {} };
  const r = checkBudgetParts([issue('untaught-word', 'a'), issue('untaught-word', 'c')], unitOf, budget);
  assert.deepEqual(r.legacy.over, []);
  assert.deepEqual(r.new.over, [{ rule: 'untaught-word', count: 1, budget: 0 }]);
  // The same issue in a legacy unit passes.
  assert.deepEqual(checkBudgetParts([issue('untaught-word', 'a'), issue('untaught-word', 'b'), issue('untaught-word', 'd')], unitOf, budget).new.over, []);
});

test('the committed budget is in two parts, the new units at zero', () => {
  const file = fileURLToPath(new URL('../../../curriculum-graph/reports/issue-budget.json', import.meta.url));
  const budget = JSON.parse(readFileSync(file, 'utf8'));
  assert.deepEqual(Object.keys(budget).sort(), ['about', 'legacy', 'new']);
  assert.deepEqual(budget.new, {});
  assert.ok(Object.values(budget.legacy).every((n) => Number.isInteger(n) && n > 0));
});

test('an issue that names the module it is charged to (budgetModuleKey) counts in that module\'s part', () => {
  // A reuse miss of a word taught in Unit 12 whose window closes in Unit 13 is Unit 13's to fix.
  const miss = { rule: 'reuse-missed', moduleKey: 'b', budgetModuleKey: 'c', severity: 'warning' };
  const r = checkBudgetParts([miss], unitOf, { legacy: { 'reuse-missed': 1 }, new: {} });
  assert.deepEqual(r.counts, { legacy: {}, new: { 'reuse-missed': 1 } });
  assert.deepEqual(r.new.over, [{ rule: 'reuse-missed', count: 1, budget: 0 }]);
  // Charged back to Unit 12, it fits the legacy budget.
  assert.deepEqual(checkBudgetParts([{ ...miss, budgetModuleKey: 'b' }], unitOf, { legacy: { 'reuse-missed': 1 }, new: {} }).new.over, []);
});

// The reviewer's sim (final re-review N2): a lesson written in Unit 13. Its reuse windows count written modules, so
// what Unit 12's last modules taught comes due in this lesson (pnpm graph:due lists it) and counts in Unit 13. A lesson
// that reuses it is clean, and moving the end of the written course charges nothing to Units 1 to 12. While Unit 12's
// reading, practice set and exam are stubs, constructions its last lessons taught come due here; once they are written
// they reuse most of them, so the bare lesson's misses are exactly the due entries whose window closes at its place.
test('writing a clean Unit 13 lesson leaves every legacy count as it is', async (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-u13-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  const key = 'qui-and-que-after-a-noun';
  const stub = JSON.parse(readFileSync(join(root, 'modules', `${key}.json`), 'utf8'));
  assert.equal(stub.status, 'planned');
  const say = (id, situation, cue, answer, extra = {}) => ({ id, type: 'respond', situation, cue, answer, ...extra });
  const lesson = {
    schema: stub.schema, module_key: key, kind: 'lesson', status: 'written', title: stub.title,
    description: 'Join two ideas with {qui}.',
    teaches: { words: [], constructions: ['fr:cx:relative.qui'] },
    vocabulary: [{ word_id: 'chanter-fr', fr: 'chanter', gloss: 'to sing' }],
    items: [
      say('i-l-homme-qui-chante', 'Describe the man.', 'the man who sings', "l'homme qui chante", { mistakes: [{ answer: "l'homme que chante", feedback: 'Use {qui} before a verb.' }] }),
      say('i-qui-est-ce-qui-chante', 'Ask who is singing.', 'Who is singing?', 'qui est-ce qui chante?'),
      say('i-qui-est-ce-que-tu-vois', 'Ask who your friend sees.', 'Who do you see?', 'qui est-ce que tu vois?'),
      say('i-ne-chante-t-il-pas', "Ask, surprised, whether he isn't singing.", "Isn't he singing?", 'ne chante-t-il pas?'),
      say('i-j-aime-mieux-ne-pas-chanter', 'Say you would rather not sing.', 'I would rather not sing.', "j'aime mieux ne pas chanter"),
      say('i-il-chante-bien-n-est-ce-pas', 'Check that your friend agrees.', "He sings well, doesn't he?", "il chante bien, n'est-ce pas?"),
    ],
  };
  writeFileSync(join(root, 'modules', `${key}.json`), JSON.stringify(lesson, null, 2) + '\n');
  const outline = JSON.parse(readFileSync(join(root, 'course.json'), 'utf8'));
  Object.assign(outline.units.find((u) => u.unit_key === 'unit13'), { description: 'Join two ideas.', can_do: 'join two ideas', can_do_short: 'join ideas', can_do_example_fr: "L'homme qui parle." });
  writeFileSync(join(root, 'course.json'), JSON.stringify(outline, null, 2) + '\n');
  const graphDir = join(repoRoot, 'curriculum-graph', 'languages', 'fr');
  const partsOf = async (dir, planned = true) => {
    const content = loadCourse({ root: dir, graphDir, planned });
    const { issues } = await runCheck({ repoRoot, lang: 'fr', content });
    return countByPart(issues, (k) => content.modules.get(k)?.unit_key ?? null);
  };
  const [before, after] = [await partsOf(CONTENT_ROOT), await partsOf(root)];
  assert.deepEqual(after.legacy, before.legacy);
  assert.deepEqual(after.new, {}, 'the lesson is clean');
  // What graph:due lists for the stub with a window that closes at its place: each one is a miss when nothing reuses it.
  const closingAt = async (dir) => {
    const { ctx } = await runCheck({ repoRoot, lang: 'fr', content: loadCourse({ root: dir, graphDir }) });
    const found = dueFor(ctx, key);
    return found.due.filter((d) => d.windowEnd <= found.position).length;
  };
  const misses = (n) => (n ? { 'reuse-missed': n } : {});
  const writeLesson = (mod) => writeFileSync(join(root, 'modules', `${key}.json`), JSON.stringify(mod, null, 2) + '\n');
  // Without those reuses, the misses are the lesson's own, in Unit 13.
  writeLesson({ ...lesson, items: lesson.items.slice(0, 1) });
  const bare = await partsOf(root);
  assert.deepEqual(bare.legacy, before.legacy);
  assert.deepEqual(bare.new, misses(await closingAt(CONTENT_ROOT)));
  // With Unit 12's reading, practice set and exam back to stubs, the constructions its last lessons taught come due in
  // the bare lesson, and its misses count in Unit 13.
  const unit12End = [['unit12-reading', 'reading'], ['unit12-practice', 'practice'], ['unit12-exam', 'unit_exam']];
  for (const [stubKey, kind] of unit12End) {
    const { title } = JSON.parse(readFileSync(join(CONTENT_ROOT, 'modules', `${stubKey}.json`), 'utf8'));
    const planned = { schema: stub.schema, module_key: stubKey, kind, status: 'planned', ...(title ? { title } : {}), plan: { words: [], constructions: [], source: 'plan.json' } };
    writeFileSync(join(root, 'modules', `${stubKey}.json`), JSON.stringify(planned, null, 2) + '\n');
  }
  writeLesson(stub);
  const dueBeforeUnit12 = await closingAt(root);
  assert.ok(dueBeforeUnit12 > 0, 'with Unit 12 unfinished, its last lessons leave reuses due in Unit 13');
  writeLesson({ ...lesson, items: lesson.items.slice(0, 1) });
  assert.deepEqual((await partsOf(root)).new, misses(dueBeforeUnit12));
  for (const [stubKey] of unit12End) cpSync(join(CONTENT_ROOT, 'modules', `${stubKey}.json`), join(root, 'modules', `${stubKey}.json`));
  writeFileSync(join(root, 'modules', `${key}.json`), JSON.stringify(lesson, null, 2) + '\n');
  // The stubs change nothing: the same counts with them left out of the load (scripts/plan/test/stubs.test.mjs, checker ignores planned).
  assert.deepEqual(await partsOf(root, false), after);
});
