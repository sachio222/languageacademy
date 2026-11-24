import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { makeModule, makeCtx } from './helpers.mjs';
import { ruleReuse, usesByNode, dueAt } from '../rules/reuse.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const base = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');

const PARLER = 'fr:lex:parler';
// 50 modules; `uses` lists positions whose item contains "parler"; taught at `taught`.
function course50(uses) {
  return Array.from({ length: 50 }, (_, i) => {
    const position = i + 1;
    const items = uses.includes(position)
      ? [{ ref: `m${position}#1`, source: 'x', french: ['parler'], lenient: [], englishPrompt: '', instruction: '' }]
      : [];
    return makeModule({ position, items });
  });
}
const ctxFor = (taught, uses) => makeCtx({
  graph: { ...base, courseMap: { [`m${taught}`]: { teachesWords: [PARLER] } } },
  course: course50(uses),
});

test('fixture still validates', () => {
  assert.deepEqual(validateGraph(base), []);
});

test('uses at 2, 6 and 17 leave the last window unmet', () => {
  const ctx = ctxFor(1, [2, 6, 17]);
  assert.deepEqual(usesByNode(ctx).get(PARLER), [2, 6, 17]);
  const issues = ruleReuse(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'reuse-missed');
  assert.equal(issues[0].severity, 'warning');
  assert.equal(issues[0].nodeId, PARLER);
  assert.equal(issues[0].moduleKey, 'm1');
  assert.equal(issues[0].position, 1);
  assert.match(issues[0].message, /expected by position 47/);
  assert.match(issues[0].message, /last use at position 17/);
});

test('never used is missed by position 3', () => {
  const issues = ruleReuse(ctxFor(1, []));
  assert.equal(issues.length, 1);
  assert.match(issues[0].message, /expected by position 3/);
  assert.match(issues[0].message, /never used again/);
});

test('window past the course end gives no issue', () => {
  assert.deepEqual(ruleReuse(ctxFor(49, [])), []);
});

test('fully reused node is settled', () => {
  assert.deepEqual(ruleReuse(ctxFor(1, [2, 6, 17, 40])), []);
});

test('a use at the taught position does not count', () => {
  const issues = ruleReuse(ctxFor(1, [1]));
  assert.match(issues[0].message, /expected by position 3/);
});

test('dueAt lists the never-used node taught at 1', () => {
  const due = dueAt(ctxFor(1, []), 3);
  assert.deepEqual(due, [{ nodeId: PARLER, taughtAt: 1, lastUse: null, windowEnd: 3 }]);
});

test('dueAt skips nodes whose window ends later and reports last use', () => {
  const ctx = ctxFor(1, [2]);
  assert.deepEqual(dueAt(ctx, 3), []);
  assert.deepEqual(dueAt(ctx, 6), [{ nodeId: PARLER, taughtAt: 1, lastUse: 2, windowEnd: 7 }]);
  assert.deepEqual(dueAt(ctx, 40), [{ nodeId: PARLER, taughtAt: 1, lastUse: 2, windowEnd: 7 }]);
});
