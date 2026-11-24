import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { loadPair, checkPairShape, COGNATE_KINDS } from '../pairs.mjs';
import { makeModule } from './helpers.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, 'fixtures', 'graph-mini');
const repoRoot = resolve(here, '../../..');
const base = loadGraph(fixtureDir, 'fr');

// Copy the fixture, let the caller edit one file under it, load the result.
function loadEdited(file, edit, opts) {
  const dir = mkdtempSync(join(tmpdir(), 'graph-mini-'));
  try {
    cpSync(fixtureDir, dir, { recursive: true });
    const path = join(dir, file);
    writeFileSync(path, JSON.stringify(edit(JSON.parse(readFileSync(path, 'utf8')))));
    return loadGraph(dir, 'fr', opts);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('loadGraph loads the pair for the default native language from settings', () => {
  assert.equal(base.native, 'en');
  assert.equal(base.settings.defaultNative, 'en');
  assert.deepEqual(base.settings.cognates, { allowIn: 'shown' });
  assert.equal(base.pair.lesson, 'm3');
  assert.deepEqual(base.pair.words.map((w) => w.id), ['fr:lex:cafe', 'fr:lex:parc']);
  assert.deepEqual(base.pair.falseFriends.map((w) => w.id), ['fr:lex:librairie']);
});

test('a native language with no pair file has no cognates and no cognates lesson', () => {
  const ja = loadGraph(fixtureDir, 'fr', { native: 'ja' });
  assert.equal(ja.native, 'ja');
  assert.deepEqual({ lesson: ja.pair.lesson, words: ja.pair.words, falseFriends: ja.pair.falseFriends },
    { lesson: null, words: [], falseFriends: [] });
  assert.deepEqual(loadPair(fixtureDir, 'ja', 'fr').words, []);
});

test('a pair file with a bad shape fails to load and names the file', () => {
  assert.throws(
    () => loadEdited('pairs/en-fr/cognates.json', (d) => ({ ...d, words: [{ id: 'fr:lex:cafe', native: 'café', kind: 'fuzzy' }] })),
    /cognates\.json.*kind/s,
  );
});

test('checkPairShape lists every problem', () => {
  assert.deepEqual(checkPairShape({ lesson: 'x', words: [], falseFriends: [] }), []);
  assert.deepEqual(checkPairShape({ lesson: null, words: [], falseFriends: [] }), []);
  const problems = checkPairShape({
    lesson: 3,
    words: [{ id: 'fr:lex:a', native: '', kind: 'exact' }, { id: 'fr:lex:b', native: 'b', kind: 'nope' }, { id: 'fr:lex:b', native: 'b', kind: 'exact' }],
    falseFriends: [{ id: 'fr:lex:c', native: 'c' }],
  });
  assert.equal(problems.length, 5);
  assert.ok(problems.some((p) => /lesson/.test(p)));
  assert.ok(problems.some((p) => /words\[1\].*kind/.test(p)));
  assert.ok(problems.some((p) => /fr:lex:b.*twice/.test(p)));
  assert.ok(problems.some((p) => /falseFriends\[0\].*means/.test(p)));
  assert.deepEqual(COGNATE_KINDS, ['exact', 'accent', 'ending', 'close']);
});

test('a bad cognates.allowIn setting fails to load', () => {
  assert.throws(() => loadEdited('core/settings.json', (s) => ({ ...s, cognates: { allowIn: 'typed' } })), /allowIn/);
});

test('validateGraph reports a pair word or false friend missing from the graph as dangling-ref', () => {
  const pair = {
    ...base.pair,
    words: [...base.pair.words, { id: 'fr:lex:restaurant', native: 'restaurant', kind: 'exact' }],
    falseFriends: [...base.pair.falseFriends, { id: 'fr:lex:coin', native: 'coin', means: 'corner' }],
  };
  const issues = validateGraph({ ...base, pair });
  assert.deepEqual(issues.map((i) => [i.rule, i.nodeId]), [['dangling-ref', 'pair:en-fr'], ['dangling-ref', 'pair:en-fr']]);
  assert.match(issues[0].message, /fr:lex:restaurant/);
  assert.match(issues[1].message, /fr:lex:coin/);
});

test('validateGraph reports a cognates lesson that is not in the course', () => {
  const course = [makeModule({ position: 1 }), makeModule({ position: 3 })];
  assert.deepEqual(validateGraph(base, { course }), []);
  const issues = validateGraph(base, { course: [makeModule({ position: 1 })] });
  assert.deepEqual(issues.map((i) => i.rule), ['dangling-ref']);
  assert.match(issues[0].message, /lesson m3/);
});

test('validateGraph reports an id listed as both a cognate and a false friend', () => {
  const pair = { ...base.pair, falseFriends: [...base.pair.falseFriends, { id: 'fr:lex:parc', native: 'park', means: 'park' }] };
  const issues = validateGraph({ ...base, pair });
  assert.deepEqual(issues.map((i) => [i.rule, i.severity, i.nodeId]), [['cognate-conflict', 'error', 'fr:lex:parc']]);
});

test('the English-French pair loads and every id in it is a French headword', () => {
  const g = loadGraph(join(repoRoot, 'curriculum-graph'), 'fr');
  assert.equal(g.pair.lesson, '2024-10-21-cognates-help');
  assert.ok(g.pair.words.length >= 42);
  for (const w of [...g.pair.words, ...g.pair.falseFriends]) assert.equal(g.nodes.get(w.id)?.id, w.id);
});
