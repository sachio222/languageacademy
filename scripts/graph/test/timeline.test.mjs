import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { buildFormIndex } from '../fr/forms.mjs';
import { makeModule, makeCtx } from './helpers.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const base = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');
const withMap = (courseMap) => ({ ...base, courseMap });
const reading = (word) => buildFormIndex(base).get(word)[0];

test('fixture still validates', () => {
  assert.deepEqual(validateGraph(base), []);
});

test('generated reading needs headword, then form or paradigm', () => {
  const graph = withMap({
    m1: { teachesWords: ['fr:lex:parler'] },
    m2: { teachesConstructions: ['fr:cx:verb.er.present'] },
  });
  const course = [makeModule({ position: 1 }), makeModule({ position: 2 })];
  const { timeline } = makeCtx({ graph, course });
  const r = reading('parlons');
  assert.equal(timeline.isReadingAvailable(r, 1), false);
  assert.equal(timeline.isReadingAvailable(r, 2), true);
});

test('irregular reading needs its form id, not just the headword', () => {
  const graph = withMap({
    m1: { teachesWords: ['fr:lex:aller'] },
    m2: { teachesWords: ['fr:form:aller.prs.1sg'] },
  });
  const course = [makeModule({ position: 1 }), makeModule({ position: 2 })];
  const { timeline } = makeCtx({ graph, course });
  const r = reading('vais');
  assert.equal(timeline.isReadingAvailable(r, 1), false);
  assert.equal(timeline.isReadingAvailable(r, 2), true);
});

test('lemma reading needs only the headword', () => {
  const graph = withMap({ m1: { teachesWords: ['fr:lex:parler'] } });
  const { timeline } = makeCtx({ graph, course: [makeModule({ position: 1 })] });
  const r = buildFormIndex(base).get('parler').find((x) => x.via === 'lemma');
  assert.equal(timeline.isReadingAvailable(r, 1), true);
});

test('a node taught in module 3 is available to module 3 and not before', () => {
  const graph = withMap({ m3: { teachesWords: ['fr:lex:parler'] } });
  const course = [1, 2, 3].map((position) => makeModule({ position }));
  const { timeline } = makeCtx({ graph, course });
  assert.equal(timeline.taughtAt.get('fr:lex:parler'), 3);
  assert.equal(timeline.isAvailable('fr:lex:parler', 2), false);
  assert.equal(timeline.isAvailable('fr:lex:parler', 3), true);
  assert.equal(timeline.isAvailable('fr:lex:never', 3), false);
});

test('taughtAt keeps the first position; manual words and constructions count', () => {
  const graph = withMap({
    m1: { teachesWordsManual: ['fr:lex:aller'], teachesConstructions: ['fr:cx:verb.er.present'] },
    m2: { teachesWords: ['fr:lex:aller'] },
  });
  const course = [makeModule({ position: 1 }), makeModule({ position: 2 })];
  const { timeline } = makeCtx({ graph, course });
  assert.equal(timeline.taughtAt.get('fr:lex:aller'), 1);
  assert.equal(timeline.taughtAt.get('fr:cx:verb.er.present'), 1);
});

test('help teaches; a reading teaches the words of its own table', () => {
  const graph = withMap({
    m1: { teachesWords: ['fr:lex:parler'] },
    m2: { teachesWords: ['fr:lex:aller'] },
  });
  const course = [makeModule({ position: 1, kind: 'help' }), makeModule({ position: 2, kind: 'reading' })];
  const { timeline, } = makeCtx({ graph, course });
  assert.equal(timeline.taughtAt.get('fr:lex:parler'), 1);
  assert.equal(timeline.taughtAt.get('fr:lex:aller'), 2);
  assert.deepEqual(timeline.issues, []);
});

test('teaches entries on exam and practice modules, and constructions on a reading, are errors and are ignored', () => {
  const graph = withMap({
    m1: { teachesWords: ['fr:lex:parler'] },
    m2: { teachesConstructions: ['fr:cx:verb.er.present'], teachesWordsManual: ['fr:lex:aller'] },
    m3: { teachesWords: ['fr:lex:cafe'], teachesWordsManual: ['fr:lex:aller'], teachesConstructions: ['fr:cx:passe-compose.avoir'] },
  });
  const course = [
    makeModule({ position: 1, kind: 'exam' }),
    makeModule({ position: 2, kind: 'practice' }),
    makeModule({ position: 3, kind: 'reading' }),
  ];
  const { timeline } = makeCtx({ graph, course });
  assert.equal(timeline.issues.length, 3);
  for (const i of timeline.issues) {
    assert.equal(i.rule, 'teaches-in-non-teaching-module');
    assert.equal(i.severity, 'error');
  }
  assert.equal(timeline.issues[0].moduleKey, 'm1');
  assert.equal(timeline.issues[0].position, 1);
  assert.match(timeline.issues[0].message, /fr:lex:parler/);
  assert.match(timeline.issues[1].message, /fr:cx:verb\.er\.present/);
  assert.match(timeline.issues[1].message, /fr:lex:aller/);
  assert.match(timeline.issues[2].message, /fr:cx:passe-compose\.avoir/);
  assert.doesNotMatch(timeline.issues[2].message, /fr:lex:cafe/);
  assert.equal(timeline.isAvailable('fr:lex:parler', 160), false);
  assert.equal(timeline.isAvailable('fr:cx:passe-compose.avoir', 160), false);
  // the reading's own table words are taught there
  assert.equal(timeline.taughtAt.get('fr:lex:cafe'), 3);
  assert.equal(timeline.taughtAt.get('fr:lex:aller'), 3);
});

test('course-map entries for modules outside the course are ignored', () => {
  const graph = withMap({ ghost: { teachesWords: ['fr:lex:parler'] } });
  const { timeline } = makeCtx({ graph, course: [makeModule({ position: 1 })] });
  assert.equal(timeline.taughtAt.size, 0);
  assert.deepEqual(timeline.issues, []);
});

test('the Reference unit opens its nodes from openFrom on, kept apart from lesson teaching', () => {
  const graph = withMap({ m1: { teachesWords: ['fr:lex:je'] }, m3: { teachesWords: ['fr:lex:parler'] } });
  const course = [1, 2, 3].map((position) => makeModule({ position }));
  const reference = new Set(['fr:lex:vous', 'fr:lex:parler', 'fr:lex:je']);
  const { timeline } = makeCtx({ graph, course, reference, openFrom: 2 });
  // taughtAt keeps lesson teaching only.
  assert.deepEqual([...timeline.taughtAt], [['fr:lex:je', 1], ['fr:lex:parler', 3]]);
  assert.equal(timeline.isAvailable('fr:lex:vous', 1), false);
  assert.equal(timeline.isAvailable('fr:lex:vous', 2), true);
  // A lesson taught je earlier, so it wins; parler is open from 2 although a lesson teaches it at 3.
  assert.equal(timeline.availableAt.get('fr:lex:je'), 1);
  assert.equal(timeline.availableAt.get('fr:lex:parler'), 2);
  assert.equal(timeline.isAvailable('fr:lex:parler', 2), true);
  assert.deepEqual([...timeline.openByReference].sort(), ['fr:lex:parler', 'fr:lex:vous']);
  assert.equal(timeline.openFrom, 2);
});

test('a form the Reference unit lists is readable from openFrom on', () => {
  const graph = withMap({});
  const course = [makeModule({ position: 1 })];
  const reference = new Set(['fr:lex:aller', 'fr:form:aller.prs.1sg']);
  const { timeline } = makeCtx({ graph, course, reference });
  assert.equal(timeline.isReadingAvailable(reading('vais'), 1), true);
});

test('buildTimeline with no reference opens nothing', () => {
  const graph = withMap({ m1: { teachesWords: ['fr:lex:je'] } });
  const { timeline } = makeCtx({ graph, course: [makeModule({ position: 1 })] });
  assert.equal(timeline.openByReference.size, 0);
  assert.equal(timeline.openFrom, null);
  assert.deepEqual([...timeline.availableAt], [['fr:lex:je', 1]]);
});

test('a reading open only through the Reference counts for a token only when the token has no reading of another word', () => {
  const graph = withMap({ m2: { teachesWords: ['fr:lex:parler'] } });
  const course = [1, 2].map((position) => makeModule({ position }));
  const reference = new Set(['fr:lex:cafe', 'fr:lex:x', 'fr:form:x.a', 'fr:form:x.b']);
  const { timeline } = makeCtx({ graph, course, reference });
  const lemma = (headwordId) => ({ nodeId: headwordId, headwordId, via: 'lemma', pos: 'noun' });
  const form = (headwordId, nodeId) => ({ nodeId, headwordId, via: 'irregular', pos: 'noun' });
  // One reading: the Reference opens it.
  assert.equal(timeline.isTokenAvailable([lemma('fr:lex:cafe')], 1), true);
  // Two readings of one word, both open: still one word.
  assert.equal(timeline.isTokenAvailable([form('fr:lex:x', 'fr:form:x.a'), form('fr:lex:x', 'fr:form:x.b')], 1), true);
  // A Reference noun spelled like another word does not hide it.
  assert.equal(timeline.isTokenAvailable([lemma('fr:lex:cafe'), lemma('fr:lex:parler')], 1), false);
  // Once a lesson teaches the other word, the token is available through that lesson.
  assert.equal(timeline.isTokenAvailable([lemma('fr:lex:cafe'), lemma('fr:lex:parler')], 2), true);
  // A word a lesson teaches counts whatever its homographs.
  assert.equal(timeline.isTokenAvailable([lemma('fr:lex:parler'), lemma('fr:lex:cafe')], 2), true);
  assert.equal(timeline.isTokenAvailable([], 2), false);
});

test('a headword of several words is taught where its fixed-phrase twin is (en fait, chunk.en-fait); Mme is known with madame', async () => {
  const { chunkTwins, buildTimeline: bt } = await import('../timeline.mjs');
  const g = {
    headwords: [{ id: 'fr:lex:en-fait', lemma: 'en fait', pos: 'adverb' }, { id: 'fr:lex:madame', lemma: 'madame', pos: 'noun' }],
    constructions: [{ id: 'fr:cx:chunk.en-fait' }],
    courseMap: { a: { teachesConstructions: ['fr:cx:chunk.en-fait'], teachesWordsManual: ['fr:lex:madame'] } },
  };
  assert.deepEqual(chunkTwins(g), [['fr:lex:en-fait', 'fr:cx:chunk.en-fait']]);
  const t = bt(g, [{ position: 3, moduleKey: 'a', kind: 'lesson' }]);
  assert.equal(t.taughtAt.get('fr:lex:en-fait'), 3);
  assert.ok(t.isReadingAvailable({ headwordId: 'fr:lex:madame', nodeId: 'fr:form:madame.abbr', via: 'irregular', cell: 'abbr' }, 3));
  assert.ok(!t.isReadingAvailable({ headwordId: 'fr:lex:madame', nodeId: 'fr:form:madame.abbr', via: 'irregular', cell: 'abbr' }, 2));
});
