// Review rows (design §1 "Review row", §17 item 11): a lesson vocabulary row marked review: true shows a word the
// learner was taught earlier, as an example. The checker credits no teaching from it and never reports taught-twice
// for it, but its French is read like any French the learner sees: the taught-before rule checks it, and it counts
// as a use of its word for the reuse windows (controller's call, 2026-11-25).
//
// Each test copies the real course to a temp root and adds one review row to a Unit 3 lesson, well after the word's
// first teaching (un livre, 2024-01-06-basic-nouns in Unit 1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadCourse, CONTENT_ROOT } from '../../content/load.mjs';
import { runCheck } from '../check.mjs';
import { usesByNode } from '../rules/reuse.mjs';
import { repoRoot } from './content-helpers.mjs';

const LESSON = '2024-01-27-aller';
const LIVRE = 'fr:lex:livre';
const ABRI = 'fr:lex:abri';
const graphDir = join(repoRoot, 'curriculum-graph', 'languages', 'fr');

// The real course with rows appended to LESSON's vocabulary table, checked.
async function checkWith(t, rows) {
  const root = mkdtempSync(join(tmpdir(), 'la-review-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  const file = join(root, 'modules', `${LESSON}.json`);
  const mod = JSON.parse(readFileSync(file, 'utf8'));
  mod.vocabulary.push(...rows);
  writeFileSync(file, JSON.stringify(mod, null, 2) + '\n');
  const content = loadCourse({ root, graphDir });
  return runCheck({ repoRoot, lang: 'fr', content });
}

const positionOf = (ctx, key) => ctx.course.find((m) => m.moduleKey === key).position;

let real;
const realCheck = async () => (real ??= await runCheck({ repoRoot, lang: 'fr', content: loadCourse({ graphDir }) }));

test('a review row teaches nothing and raises no taught-twice', async (t) => {
  const before = await realCheck();
  const taughtAt = before.ctx.timeline.taughtAt.get(LIVRE);
  assert.ok(taughtAt < positionOf(before.ctx, LESSON), 'livre is taught before the lesson');
  const { ctx, issues } = await checkWith(t, [{ word_id: 'un-livre-fr', fr: 'le livre', gloss: 'the book', review: true }]);
  assert.equal(ctx.timeline.taughtAt.get(LIVRE), taughtAt);
  assert.ok(!ctx.graph.courseMap[LESSON]?.teachesWords?.includes(LIVRE), 'the lesson is not credited with livre');
  const twice = (list) => list.filter((i) => i.rule === 'taught-twice');
  assert.ok(!twice(issues).some((i) => i.nodeId === LIVRE && i.teachingModuleKeys.includes(LESSON)), 'no taught-twice names the lesson for livre');
  // The lesson already shares other words' taught-twice issues (aller); the review row adds or changes none.
  assert.deepEqual(twice(issues), twice(before.issues));
});

test('a review row naming an untaught word is an untaught-word issue at that module', async (t) => {
  const before = await realCheck();
  assert.ok(!before.ctx.timeline.taughtAt.has(ABRI), 'abri is never taught');
  const { ctx, issues } = await checkWith(t, [{ word_id: 'un-abri-fr', fr: "l'abri", gloss: 'the shelter', review: true }]);
  assert.ok(!ctx.timeline.taughtAt.has(ABRI), 'the review row does not teach abri');
  const found = issues.filter((i) => i.rule === 'untaught-word' && i.nodeId === ABRI);
  assert.equal(found.length, 1);
  assert.equal(found[0].moduleKey, LESSON);
  assert.equal(found[0].itemRef, `${LESSON}#vocabulary/un-abri-fr/fr`);
});

test('a review row counts as a use of its word', async (t) => {
  const before = await realCheck();
  const at = positionOf(before.ctx, LESSON);
  assert.ok(!(usesByNode(before.ctx).get(LIVRE) ?? []).includes(at), 'the lesson does not use livre today');
  const { ctx } = await checkWith(t, [{ word_id: 'un-livre-fr', fr: 'le livre', gloss: 'the book', review: true }]);
  assert.ok(usesByNode(ctx).get(LIVRE).includes(at));
  const item = ctx.course.find((m) => m.moduleKey === LESSON).items.find((it) => it.ref === `${LESSON}#vocabulary/un-livre-fr/fr`);
  assert.equal(item.source, 'vocab-review');
  assert.deepEqual(item.shown, ['le livre']);
});
