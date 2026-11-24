import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { functionAvailability, ruleFunctionExponents, GROUPS } from '../functions.mjs';
import { makeModule, makeCtx } from './helpers.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const base = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');
const course3 = [1, 2, 3].map((position) => makeModule({ position }));

function availability(courseMap, course = course3) {
  const graph = { ...base, courseMap };
  return functionAvailability(graph, makeCtx({ graph, course }).timeline);
}

test('loadGraph reads functions and exponents', () => {
  assert.equal(base.functions.length, 4);
  assert.equal(base.exponents.length, 4);
  assert.equal(base.nodes.get('fn:greet').group, 'socialising');
});

test('availability picks the earliest complete exponent', () => {
  const a = availability({
    m1: { teachesWords: ['fr:lex:je', 'fr:lex:travailler'] },
    m2: { teachesWords: ['fr:lex:parler'] },
    m3: { teachesConstructions: ['fr:cx:verb.er.present'] },
  });
  // Exponent 1 (je travaille) is complete at 3, exponent 2 (je parle) at 2.
  assert.deepEqual(a.get('fn:say-what-you-do'), { position: 2, exponent: 2 });
});

test('availability keeps the first exponent in file order on a tie', () => {
  const a = availability({
    m1: { teachesWords: ['fr:lex:je', 'fr:lex:travailler', 'fr:lex:parler'], teachesConstructions: ['fr:cx:verb.er.present'] },
  });
  assert.deepEqual(a.get('fn:say-what-you-do'), { position: 1, exponent: 1 });
});

test('a function whose only exponent has an untaught node is not available', () => {
  const a = availability({ m1: { teachesConstructions: ['fr:cx:q.inversion'] } });
  assert.deepEqual(a.get('fn:ask-a-question'), { position: null, exponent: null });
});

test('a function with no exponent is listed as not available', () => {
  const a = availability({ m1: { teachesWords: ['fr:lex:bonjour'] } });
  assert.deepEqual(a.get('fn:apologise'), { position: null, exponent: null });
  assert.deepEqual(a.get('fn:greet'), { position: 1, exponent: 0 });
  assert.deepEqual([...a.keys()], base.functions.map((f) => f.id));
});

test('a name in an exponent never delays it', () => {
  const graph = {
    ...base,
    exponents: [{ function: 'fn:greet', nodes: ['fr:lex:bonjour', 'fr:name:marie'], note: 'Bonjour, Marie !' }],
    courseMap: { m2: { teachesWords: ['fr:lex:bonjour'] } },
  };
  const a = functionAvailability(graph, makeCtx({ graph, course: course3 }).timeline);
  assert.deepEqual(a.get('fn:greet'), { position: 2, exponent: 0 });
});

test('an irregular form in an exponent also needs its headword, as a reading does', () => {
  const graph = {
    ...base,
    exponents: [{ function: 'fn:greet', nodes: ['fr:form:aller.prs.1sg'], note: 'Je vais bien.' }],
    courseMap: { m1: { teachesWords: ['fr:form:aller.prs.1sg'] }, m3: { teachesWords: ['fr:lex:aller'] } },
  };
  const a = functionAvailability(graph, makeCtx({ graph, course: course3 }).timeline);
  assert.deepEqual(a.get('fn:greet'), { position: 3, exponent: 0 });
});

test('check warns about a function with no exponent', () => {
  const issues = ruleFunctionExponents(makeCtx({ graph: base, course: course3 }));
  assert.deepEqual(issues.map((i) => [i.rule, i.severity, i.nodeId]), [['function-no-exponent', 'warning', 'fn:apologise']]);
});

test('validateGraph flags an exponent with an unknown node or function', () => {
  const g = {
    ...base,
    exponents: [
      ...base.exponents,
      { function: 'fn:greet', nodes: ['fr:lex:nope'], note: 'x' },
      { function: 'fn:nope', nodes: ['fr:lex:bonjour'], note: 'x' },
      { function: 'fn:greet', nodes: ['fn:apologise'], note: 'x' },
    ],
  };
  const dangling = validateGraph(g).filter((i) => i.rule === 'dangling-ref').map((i) => i.message);
  assert.equal(dangling.length, 3);
  assert.ok(dangling.some((m) => m.includes('fr:lex:nope')));
  assert.ok(dangling.some((m) => m.includes('fn:nope')));
  assert.ok(dangling.some((m) => m.includes('fn:apologise')));
});

test('validateGraph flags an exponent with no nodes', () => {
  const g = { ...base, exponents: [...base.exponents, { function: 'fn:greet', nodes: [], note: 'x' }] };
  assert.deepEqual(validateGraph(g).map((i) => i.rule), ['exponent-empty']);
});

test('validateGraph flags a function with an unknown group', () => {
  const bad = { id: 'fn:shout', group: 'shouting', label: 'Shout', canDo: 'Can shout.', cefr: 'A1' };
  const g = { ...base, functions: [...base.functions, bad], nodes: new Map([...base.nodes, [bad.id, bad]]) };
  const issues = validateGraph(g).filter((i) => i.rule === 'function-bad-group');
  assert.deepEqual(issues.map((i) => i.nodeId), ['fn:shout']);
});

test('the fixture still validates', () => {
  assert.deepEqual(validateGraph(base), []);
});

// The real data: the shared function list and the French exponents.
const real = loadGraph(join(repoRoot, 'curriculum-graph'), 'fr');

test('the real graph validates with its functions and exponents', () => {
  assert.deepEqual(validateGraph(real), []);
  assert.ok(real.functions.length > 0);
  assert.ok(real.exponents.length > 0);
});

test('every real function has a group, a level from A1 to B1, a label and a can-do line', () => {
  const ids = new Set();
  for (const f of real.functions) {
    assert.match(f.id, /^fn:[a-z0-9]+(-[a-z0-9]+)*$/, f.id);
    assert.ok(!ids.has(f.id), `duplicate ${f.id}`);
    ids.add(f.id);
    assert.ok(GROUPS.includes(f.group), `${f.id} group ${f.group}`);
    assert.ok(['A1', 'A2', 'B1'].includes(f.cefr), `${f.id} cefr ${f.cefr}`);
    assert.ok(typeof f.label === 'string' && f.label.length > 0, `${f.id} label`);
    assert.match(f.canDo, /^Can .+\.$/, `${f.id} canDo`);
  }
});

test('every real exponent has nodes and a French example', () => {
  for (const e of real.exponents) {
    assert.ok(Array.isArray(e.nodes) && e.nodes.length > 0, `${e.function} nodes`);
    assert.ok(typeof e.note === 'string' && e.note.length > 0, `${e.function} note`);
  }
});
