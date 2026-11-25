import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { makeModule, makeCtx } from './helpers.mjs';
import { ruleReuse, usesByNode, dueAt, dueFor } from '../rules/reuse.mjs';

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

// Regression: a missed window used to keep a node due for the rest of the course, even right after a use.
test('after a miss, the schedule restarts from the next use', () => {
  const uses = [50];
  const ctx = makeCtx({
    graph: { ...base, courseMap: { m1: { teachesWords: [PARLER] } } },
    course: Array.from({ length: 60 }, (_, i) => {
      const position = i + 1;
      const items = uses.includes(position)
        ? [{ ref: `m${position}#1`, source: 'x', french: ['parler'], lenient: [], englishPrompt: '', instruction: '' }]
        : [];
      return makeModule({ position, items });
    }),
  });
  // The miss is still reported once.
  const issues = ruleReuse(ctx);
  assert.equal(issues.length, 1);
  assert.match(issues[0].message, /expected by position 3; last use at position 50/);
  // Due before the use at 50 …
  assert.deepEqual(dueAt(ctx, 40), [{ nodeId: PARLER, taughtAt: 1, lastUse: null, windowEnd: 3 }]);
  // … not right after it …
  assert.deepEqual(dueAt(ctx, 52), []);
  // … and due again once the next window after 50 (5 modules, to 55) runs out.
  assert.deepEqual(dueAt(ctx, 54), [{ nodeId: PARLER, taughtAt: 1, lastUse: 50, windowEnd: 55 }]);
  assert.deepEqual(dueAt(ctx, 58), [{ nodeId: PARLER, taughtAt: 1, lastUse: 50, windowEnd: 55 }]);
});

test('a use in shown text counts for reuse like a typed one', () => {
  const course = Array.from({ length: 3 }, (_, i) => makeModule({
    position: i + 1,
    items: i === 2 ? [{ ref: 'm3#1', source: 'concept', french: [], shown: ['parler'], lenient: [], englishPrompt: null, instruction: null }] : [],
  }));
  const ctx = makeCtx({ graph: { ...base, courseMap: { m1: { teachesWords: [PARLER] } } }, course });
  assert.deepEqual(usesByNode(ctx).get(PARLER), [3]);
});

// The budget counts a miss where its window closes (final re-review N2): writing the module there is what meets it.
test('a missed window names the module where it closes (budgetModuleKey)', () => {
  const issues = ruleReuse(ctxFor(1, []));
  assert.equal(issues[0].moduleKey, 'm1');
  assert.equal(issues[0].budgetModuleKey, 'm3');
  assert.equal(ruleReuse(ctxFor(1, [2, 6, 17]))[0].budgetModuleKey, 'm47');
});

// A course plan stub is not read (content-course.mjs) and holds no use, so windows count the written modules a learner
// meets. With stubs at 3 and 4, the two modules after m1 are m2 and m5: the window closes at m5, which can meet it.
const withPlanned = (course, planned) => ({
  units: [{ unit_key: 'unit1', modules: [...course.map((m) => ({ module_key: m.moduleKey, position: m.position, status: 'written' })), ...planned.map((p) => ({ module_key: `m${p}`, position: p, status: 'planned' }))] }],
});
test('reuse windows count written modules: a window past two stubs closes at the next written module', () => {
  const written = course50([]).filter((m) => ![3, 4].includes(m.position));
  const ctx = { ...makeCtx({ graph: { ...base, courseMap: { m1: { teachesWords: [PARLER] } } }, course: written }), content: withPlanned(written, [3, 4]) };
  const issues = ruleReuse(ctx);
  assert.deepEqual(issues.map((i) => [i.moduleKey, i.budgetModuleKey]), [['m1', 'm5']]);
  assert.match(issues[0].message, /expected by position 5; never used again/);
  // A use at m5 meets it.
  const used = written.map((m) => (m.position === 5 ? { ...m, items: [{ ref: 'm5#1', source: 'x', french: ['parler'], lenient: [], englishPrompt: '', instruction: '' }] } : m));
  assert.deepEqual(ruleReuse({ ...ctx, ...makeCtx({ graph: ctx.graph, course: used }) }).filter((i) => i.position === 1 && /position 5;/.test(i.message)), []);
});

test('dueFor finds a planned module by key, so a writer sees what it should reuse before writing it', () => {
  const written = course50([]).filter((m) => m.position !== 3);
  const ctx = { ...makeCtx({ graph: { ...base, courseMap: { m1: { teachesWords: [PARLER] } } }, course: written }), content: withPlanned(written, [3]) };
  // The stub at 3, once written, is the third module a learner meets: the window from m1 closes there.
  const parler = { nodeId: PARLER, taughtAt: 1, lastUse: null, windowEnd: 3 };
  assert.deepEqual(dueFor(ctx, 'm3'), { position: 3, due: [parler], ended: 0 });
  assert.deepEqual(dueFor(ctx, '3'), dueFor(ctx, 'm3'));
  // Seen from m2 today, the third written module is m4.
  assert.deepEqual(dueFor(ctx, 'm2'), { position: 2, due: [{ ...parler, windowEnd: 4 }], ended: 0 });
  assert.equal(dueFor(ctx, 'nowhere'), null);
  // Past its window, the miss is counted, not due: no use at 10 meets a window that closed at m4.
  assert.deepEqual(dueFor(ctx, 'm10'), { position: 10, due: [], ended: 1 });
});
