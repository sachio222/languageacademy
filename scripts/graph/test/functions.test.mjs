import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { functionAvailability, ruleFunctionExponents, ruleFunctionUnreachable, functionReport, GROUPS } from '../functions.mjs';
import { runCheck } from '../check.mjs';
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

test('validateGraph flags a function with an unknown or missing level', () => {
  const bad = [
    { id: 'fn:shout', group: 'socialising', label: 'Shout', canDo: 'Can shout.', cefr: 'D1' },
    { id: 'fn:mumble', group: 'socialising', label: 'Mumble', canDo: 'Can mumble.' },
  ];
  const g = { ...base, functions: [...base.functions, ...bad], nodes: new Map([...base.nodes, ...bad.map((f) => [f.id, f])]) };
  const issues = validateGraph(g).filter((i) => i.rule === 'function-bad-level');
  assert.deepEqual(issues.map((i) => i.nodeId), ['fn:shout', 'fn:mumble']);
  assert.ok(issues.every((i) => i.severity === 'error'));
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

test('the real course gives credit for asking the way before it teaches directions', async () => {
  const { ctx } = await runCheck({ repoRoot, lang: 'fr' });
  const a = functionAvailability(ctx.graph, ctx.timeline);
  const directions = ctx.course.find((m) => m.title.startsWith('Directions')).position;
  assert.ok(a.get('fn:ask-the-way').position < directions, `ask-the-way at ${a.get('fn:ask-the-way').position}`);
});

test('the real function list has the staple A1 functions and distinct repair acts', () => {
  const ids = new Set(real.functions.map((f) => f.id));
  for (const id of ['fn:talk-about-the-weather', 'fn:say-what-you-prefer', 'fn:ask-permission', 'fn:ask-how-to-say', 'fn:talk-about-your-family']) {
    assert.ok(ids.has(id), id);
    assert.ok(real.exponents.some((e) => e.function === id), `${id} has an exponent`);
  }
  assert.ok(!ids.has('fn:interrupt-politely'));
  assert.ok(!ids.has('fn:ask-for-clarification'));
});

test('every real function has at least one French exponent, including asking how a word is spelled', () => {
  const covered = new Set(real.exponents.map((e) => e.function));
  assert.deepEqual(real.functions.filter((f) => !covered.has(f.id)).map((f) => f.id), []);
  const spell = real.exponents.filter((e) => e.function === 'fn:ask-how-to-spell');
  assert.ok(spell.some((e) => e.nodes.includes('fr:lex:epeler')), 'an exponent with épeler');
});

test('no two exponents of a real function list the same nodes', () => {
  const seen = new Set();
  for (const e of real.exponents) {
    const key = `${e.function} ${[...e.nodes].sort().join(' ')}`;
    assert.ok(!seen.has(key), key);
    seen.add(key);
  }
});

// Function coverage in the report data.
function coverageCtx(courseMap, extra = {}) {
  const graph = { ...base, courseMap, ...extra };
  return makeCtx({ graph, course: course3 });
}

test('functionReport gives each function its position, exponent count and, when never possible, what its closest exponent lacks', () => {
  const ctx = coverageCtx({ m1: { teachesWords: ['fr:lex:je', 'fr:lex:bonjour'] }, m2: { teachesConstructions: ['fr:cx:q.inversion'] } });
  ctx.reference = new Set(['fr:lex:vous']);
  const { functions } = functionReport(ctx);
  // Sorted by level, then group in GROUPS order, then ID.
  assert.deepEqual(functions.map((f) => f.id), ['fn:ask-a-question', 'fn:say-what-you-do', 'fn:apologise', 'fn:greet']);
  const byId = Object.fromEntries(functions.map((f) => [f.id, f]));
  assert.deepEqual(byId['fn:greet'], {
    id: 'fn:greet', group: 'socialising', cefr: 'A1', label: 'Greet someone', position: 1, exponentCount: 1, missing: [], referenceOnly: [],
  });
  // je parle lacks one node, je travaille two: the closest exponent is je parle.
  assert.deepEqual(byId['fn:say-what-you-do'].missing, ['fr:lex:parler']);
  assert.equal(byId['fn:say-what-you-do'].exponentCount, 2);
  assert.equal(byId['fn:say-what-you-do'].position, null);
  // A missing node that the Reference unit lists is named as such.
  assert.deepEqual(byId['fn:ask-a-question'].missing, ['fr:lex:vous']);
  assert.deepEqual(byId['fn:ask-a-question'].referenceOnly, ['fr:lex:vous']);
  assert.deepEqual(byId['fn:apologise'], {
    id: 'fn:apologise', group: 'socialising', cefr: 'A1', label: 'Apologise', position: null, exponentCount: 0, missing: [], referenceOnly: [],
  });
});

test('function-unreachable warns for an A1 or A2 function no exponent reaches, naming what is missing', () => {
  const ctx = coverageCtx({ m1: { teachesWords: ['fr:lex:je', 'fr:lex:bonjour'] } });
  const issues = ruleFunctionUnreachable(ctx);
  // fn:apologise has no exponent at all, which function-no-exponent already reports.
  assert.deepEqual(issues.map((i) => [i.rule, i.severity, i.nodeId]), [
    ['function-unreachable', 'warning', 'fn:ask-a-question'],
    ['function-unreachable', 'warning', 'fn:say-what-you-do'],
  ]);
  assert.match(issues[1].message, /fr:lex:parler/);
  const ref = coverageCtx({ m1: { teachesWords: ['fr:lex:je', 'fr:lex:bonjour'] } });
  ref.reference = new Set(['fr:lex:vous']);
  const askMessage = ruleFunctionUnreachable(ref).find((i) => i.nodeId === 'fn:ask-a-question').message;
  assert.match(askMessage, /fr:lex:vous \(no lesson teaches it; only the Reference unit lists it\)/);
  assert.doesNotMatch(askMessage, /shown only/);
  const b1 = coverageCtx({}, { functions: base.functions.map((f) => ({ ...f, cefr: 'B1' })) });
  assert.deepEqual(ruleFunctionUnreachable(b1), []);
});
