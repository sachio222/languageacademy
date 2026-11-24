import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { makeModule, makeCtx } from './helpers.mjs';
import { ruleTaughtBefore, analyzeItems, firstUse } from '../rules/taught-before.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const base = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');

const item = (french, extra = {}) => ({
  ref: 'm1#1', source: 'x', french: Array.isArray(french) ? french : [french],
  lenient: [], englishPrompt: '', instruction: '', ...extra,
});
const mod = (position, items, extra = {}) =>
  makeModule({ position, items: items.map((it, i) => ({ ...it, ref: `m${position}#${i + 1}` })), ...extra });
const setup = (courseMap, course, extra = {}) =>
  makeCtx({ graph: { ...base, courseMap, ...extra }, course });

test('fixture still validates', () => {
  assert.deepEqual(validateGraph(base), []);
});

test('untaught word taught later names its position and fixes at first use', () => {
  const course = [
    mod(1, [item('Je parle.')]),
    mod(2, [item('nous travaillons')]),
    mod(5, [item('travailler')]),
  ];
  const ctx = setup({
    m1: { teachesWords: ['fr:lex:je', 'fr:lex:parler'], teachesConstructions: ['fr:cx:verb.er.present'] },
    m5: { teachesWords: ['fr:lex:travailler'] },
  }, course);
  const issues = ruleTaughtBefore(ctx);
  const hits = issues.filter((i) => i.rule === 'untaught-word' && i.surface === 'travaillons');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].severity, 'error');
  assert.equal(hits[0].moduleKey, 'm2');
  assert.deepEqual(hits[0].fix, { kind: 'teach-earlier', moduleKey: 'm2' });
  assert.match(hits[0].message, /position 5/);
  assert.match(hits[0].message, /Module 5/);
});

test('names are exempt', () => {
  const ctx = setup({ m1: { teachesWords: ['fr:lex:parler'], teachesConstructions: ['fr:cx:verb.er.present'] } },
    [mod(1, [item('Marie parle')])]);
  assert.deepEqual(ruleTaughtBefore(ctx), []);
});

test('capitalised untaught word is still an error', () => {
  const ctx = setup({ m1: { teachesWords: ['fr:lex:je'] } }, [mod(1, [item('Bonjour Marie')])]);
  const issues = ruleTaughtBefore(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'untaught-word');
  assert.equal(issues[0].surface, 'Bonjour');
  assert.match(issues[0].message, /not taught anywhere/);
});

test('word with no reading is unknown-word', () => {
  const ctx = setup({}, [mod(1, [item('zorglub')])]);
  const issues = ruleTaughtBefore(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'unknown-word');
  assert.equal(issues[0].severity, 'error');
  assert.equal(issues[0].surface, 'zorglub');
  assert.equal(issues[0].fix.kind, 'add-to-graph');
});

test('lenient text is checked and accent-folded', () => {
  const ok = setup({ m1: { teachesWords: ['fr:lex:cafe'] } }, [mod(1, [item('café', { lenient: ['cafe'] })])]);
  assert.deepEqual(ruleTaughtBefore(ok), []);
  const bad = setup({}, [mod(1, [item('zorglub', { french: [], lenient: ['zorglub'] })])]);
  assert.equal(ruleTaughtBefore(bad).length, 1);
});

test('untaught construction is reported with its id and fix', () => {
  const course = [mod(3, [item('Veux-tu ?')]), mod(12, [])];
  const ctx = setup({
    m3: { teachesWords: ['fr:lex:vouloir', 'fr:form:vouloir.prs.1sg', 'fr:lex:tu'] },
    m12: { teachesConstructions: ['fr:cx:q.inversion'] },
  }, course);
  const all = ruleTaughtBefore(ctx);
  assert.deepEqual(all.map((i) => i.rule), ['untaught-construction']);
  const issues = all;
  assert.equal(issues[0].nodeId, 'fr:cx:q.inversion');
  assert.equal(issues[0].severity, 'error');
  assert.deepEqual(issues[0].fix, { kind: 'teach-earlier', moduleKey: 'm3' });
  assert.match(issues[0].message, /position 12/);
});

test('same untaught word twice in a module gives one issue', () => {
  const ctx = setup({}, [mod(1, [item('zorglub zorglub'), item('zorglub')])]);
  assert.equal(ruleTaughtBefore(ctx).length, 1);
});

test('same word in two modules gives one issue per module, fixed at the first', () => {
  const ctx = setup({}, [mod(1, [item('zorglub')]), mod(2, [item('zorglub')])]);
  const issues = ruleTaughtBefore(ctx);
  assert.equal(issues.length, 2);
  assert.ok(issues.every((i) => i.fix.moduleKey === 'm1'));
});

test('override ignore suppresses by fold, surface or construction id', () => {
  const course = [mod(2, [item('nous travaillons')])];
  const ctx = setup({ m2: { teachesWords: ['fr:lex:nous'], overrides: { 'm2#1': { ignore: ['travaillons'] } } } }, course);
  assert.deepEqual(ruleTaughtBefore(ctx), []);
  const cx = setup({ m3: { teachesWords: ['fr:lex:vouloir', 'fr:form:vouloir.prs.1sg', 'fr:lex:tu'],
    overrides: { 'm3#1': { ignore: ['fr:cx:q.inversion'] } } } }, [mod(3, [item('Veux-tu ?')])]);
  assert.deepEqual(ruleTaughtBefore(cx), []);
});

test('analyzeItems is memoized per ctx and keyed by item ref', () => {
  const ctx = setup({}, [mod(1, [item('Je parle', { lenient: ['je parle'] })])]);
  const a = analyzeItems(ctx);
  assert.equal(analyzeItems(ctx), a);
  const entries = a.get('m1#1');
  assert.equal(entries.length, 2);
  assert.deepEqual(Object.keys(entries[0]).sort(), ['constructions', 'readings', 'strict', 'text', 'tokens']);
});

test('firstUse maps headwords, unreadable folds and constructions to first module', () => {
  const ctx = setup({}, [mod(1, [item('zorglub')]), mod(2, [item('Je parle')]), mod(3, [item('Veux-tu ?')])]);
  const f = firstUse(ctx);
  assert.deepEqual(f.get('zorglub'), { moduleKey: 'm1', position: 1 });
  assert.deepEqual(f.get('fr:lex:parler'), { moduleKey: 'm2', position: 2 });
  assert.deepEqual(f.get('fr:cx:q.inversion'), { moduleKey: 'm3', position: 3 });
});

test('a word and its clitic form give one issue, and ignore on the plain word covers both', () => {
  const courseMap = { m1: { teachesWords: ['fr:lex:vouloir', 'fr:form:vouloir.prs.1sg', 'fr:lex:je'],
    teachesConstructions: ['fr:cx:q.inversion'] } };
  const ctx = setup(courseMap, [mod(1, [item('Tu veux.'), item('Veux-tu ?')])]);
  const words = ruleTaughtBefore(ctx).filter((i) => i.rule === 'untaught-word');
  assert.equal(words.length, 1);
  const ign = setup({ m1: { ...courseMap.m1, overrides: { 'm1#2': { ignore: ['tu'] }, 'm1#1': { ignore: ['tu'] } } } },
    [mod(1, [item('Tu veux.'), item('Veux-tu ?')])]);
  assert.deepEqual(ruleTaughtBefore(ign).filter((i) => i.rule === 'untaught-word'), []);
  const onlyClitic = setup({ m1: { ...courseMap.m1, overrides: { 'm1#1': { ignore: ['tu'] } } } },
    [mod(1, [item('Veux-tu ?')])]);
  assert.deepEqual(ruleTaughtBefore(onlyClitic), []);
});

test('ignore accepts a headword id for word issues', () => {
  const ctx = setup({ m2: { teachesWords: ['fr:lex:nous'], overrides: { 'm2#1': { ignore: ['fr:lex:travailler'] } } } },
    [mod(2, [item('nous travaillons')])]);
  assert.deepEqual(ruleTaughtBefore(ctx), []);
});

test('strict text: a with avoir taught does not pass for a (preposition)', () => {
  const ctx = setup({ m1: { teachesWords: ['fr:lex:avoir', 'fr:form:avoir.prs.3sg', 'fr:lex:il', 'fr:lex:aller'] } },
    [mod(1, [item('Il va à Paris')])]);
  const hits = ruleTaughtBefore(ctx).filter((i) => i.surface === 'à');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].rule, 'untaught-word');
});

test('strict text: Où with ou taught and no où headword is unknown', () => {
  const ctx = setup({ m1: { teachesWords: ['fr:lex:ou', 'fr:lex:tu', 'fr:lex:aller'] } },
    [mod(1, [item('Où vas-tu ?')])]);
  const hits = ruleTaughtBefore(ctx).filter((i) => i.surface === 'Où');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].rule, 'unknown-word');
});

test('lenient text accepts missing accents', () => {
  const cafe = setup({ m1: { teachesWords: ['fr:lex:cafe'] } },
    [mod(1, [item([], { lenient: ['cafe'] })])]);
  assert.deepEqual(ruleTaughtBefore(cafe), []);
  const ou = setup({ m1: { teachesWords: ['fr:lex:ou', 'fr:lex:tu', 'fr:lex:aller'] } },
    [mod(1, [item([], { lenient: ['ou vas-tu'] })])]);
  assert.deepEqual(ruleTaughtBefore(ou).filter((i) => i.surface === 'ou'), []);
});

test('analyzeItems marks strict entries and firstUse uses the same readings', () => {
  const ctx = setup({}, [mod(1, [item('où', { lenient: ['ou'] })])]);
  const entries = analyzeItems(ctx).get('m1#1');
  assert.deepEqual(entries.map((e) => [e.text, e.strict]), [['où', true], ['ou', false]]);
  assert.deepEqual(entries[0].readings, [[]]);
  assert.equal(entries[1].readings[0].length > 0, true);
  const first = firstUse(ctx);
  assert.equal(first.get('ou').moduleKey, 'm1');
  assert.equal(first.get('fr:lex:ou').moduleKey, 'm1');
});

test('items at the same config path in two modules are analyzed and attributed separately', () => {
  const at = (key, french) => ({
    ref: `${key}#exerciseConfig.items[0]`, source: 'items', french: [french],
    lenient: [], englishPrompt: '', instruction: '',
  });
  const course = [
    makeModule({ position: 1, moduleKey: 'm1', items: [at('m1', 'Je parle.')] }),
    makeModule({ position: 2, moduleKey: 'm2', items: [at('m2', 'nous travaillons')] }),
  ];
  const ctx = setup({ m1: { teachesWords: ['fr:lex:je', 'fr:lex:parler'], teachesConstructions: ['fr:cx:verb.er.present'] } }, course);
  assert.equal(analyzeItems(ctx).size, 2);
  const hits = ruleTaughtBefore(ctx).filter((i) => i.rule === 'untaught-word' && i.surface === 'travaillons');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].moduleKey, 'm2');
});
