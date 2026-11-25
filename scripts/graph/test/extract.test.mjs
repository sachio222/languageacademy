import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { buildFormIndex } from '../fr/forms.mjs';
import { extractTeaches } from '../extract-teaches.mjs';
import { seedHeadwords, headwordKey } from '../fr/seed-headwords.mjs';
import { importConjugations } from '../fr/import-conjugations.mjs';
import { makeModule } from './helpers.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const graph = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');
const index = buildFormIndex(graph);
const withMap = (courseMap) => ({ ...graph, courseMap });

test('fixture still validates', () => {
  assert.deepEqual(validateGraph(graph), []);
});

test('extractTeaches records headwords and irregular or generated forms', () => {
  const course = [makeModule({ position: 1, moduleKey: 'a', vocab: ['je vais', 'nous parlons'] })];
  const { courseMap, unknown } = extractTeaches(graph, course, index);
  const words = courseMap.a.teachesWords;
  for (const id of ['fr:lex:je', 'fr:lex:aller', 'fr:form:aller.prs.1sg', 'fr:lex:parler', 'fr:form:parler.prs.1pl']) {
    assert.ok(words.includes(id), id);
  }
  assert.ok(!unknown.some((u) => u.surface === 'vais'));
});

test('extractTeaches keeps other course-map fields and reports unknown tokens', () => {
  const g = withMap({ a: { teachesConstructions: ['fr:cx:x'], teachesWords: ['stale'] } });
  const course = [makeModule({ position: 1, moduleKey: 'a', vocab: ['je zorglub'] })];
  const { courseMap, unknown } = extractTeaches(g, course, index);
  assert.deepEqual(courseMap.a.teachesConstructions, ['fr:cx:x']);
  assert.ok(!courseMap.a.teachesWords.includes('stale'));
  assert.deepEqual(unknown, [{ moduleKey: 'a', surface: 'zorglub' }]);
  assert.deepEqual(g.courseMap.a.teachesWords, ['stale'], 'input is not mutated');
});

test('extractTeaches keeps every reading tied at the best rank', () => {
  // "va" is both aller.prs.3sg (irregular) and vouloir.sbjv.3sg (irregular): both kept.
  const course = [makeModule({ position: 1, moduleKey: 'a', vocab: ['va'] })];
  const { courseMap } = extractTeaches(graph, course, index);
  assert.ok(courseMap.a.teachesWords.includes('fr:form:aller.prs.3sg'));
  assert.ok(courseMap.a.teachesWords.includes('fr:form:vouloir.sbjv.3sg'));
});

test('extractTeaches ranks irregular above generated above lemma', () => {
  const mk = (via, id) => ({ nodeId: id, headwordId: 'h:' + id, cell: 'c', via, paradigmId: null });
  const fake = new Map([['x', [mk('lemma', 'L'), mk('generated', 'G'), mk('irregular', 'I')]]]);
  const course = [makeModule({ position: 1, moduleKey: 'a', vocab: ['x'] })];
  const { courseMap } = extractTeaches(graph, course, fake);
  assert.deepEqual(courseMap.a.teachesWords, ['h:I', 'I']);
});

test('extractTeaches ignores exam and practice modules; a reading teaches its own table', () => {
  const course = [
    makeModule({ position: 1, moduleKey: 'e', kind: 'exam', vocab: ['je'] }),
    makeModule({ position: 2, moduleKey: 'p', kind: 'practice', vocab: ['je'] }),
    makeModule({ position: 3, moduleKey: 'h', kind: 'help', vocab: ['je'] }),
    makeModule({ position: 4, moduleKey: 'r', kind: 'reading', vocab: ['je'] }),
  ];
  const { courseMap } = extractTeaches(graph, course, index);
  assert.equal(courseMap.e, undefined);
  assert.equal(courseMap.p, undefined);
  assert.deepEqual(courseMap.h.teachesWords, ['fr:lex:je']);
  assert.deepEqual(courseMap.r.teachesWords, ['fr:lex:je']);
});

test('seedHeadwords keeps lemmas and skips conjugated-form entries', () => {
  const entries = [
    { id: 'croire-fr', word: 'croire', partOfSpeech: 'verb', relationships: [
      { type: 'conjugation_pair', targetId: 'croire-fr', note: 'infinitive form' },
      { type: 'conjugation_pair', targetId: 'croit-fr', note: 'conjugated form' },
    ] },
    { id: 'croit-fr', word: 'croit', partOfSpeech: 'verb', relationships: [
      { type: 'conjugation_pair', targetId: 'croire-fr', note: 'infinitive form' },
    ] },
  ];
  const nodes = seedHeadwords(entries, []);
  assert.equal(nodes.length, 1);
  assert.equal(nodes[0].id, 'fr:lex:croire');
  assert.equal(nodes[0].lemma, 'croire');
  assert.equal(nodes[0].pos, 'verb');
  assert.equal(nodes[0].dictionaryId, 'croire-fr');
  assert.deepEqual(nodes[0].paradigms, ['fr:cx:verb.re.present', 'fr:cx:ptcp.re']);
});

test('seedHeadwords skips an entry whose own conjugated-form pair points at itself', () => {
  const entries = [{ id: 'x-fr', word: 'x', partOfSpeech: 'verb', relationships: [
    { type: 'conjugation_pair', targetId: 'x-fr', note: 'conjugated form' },
  ] }];
  assert.deepEqual(seedHeadwords(entries, []), []);
});

test('seedHeadwords keeps an existing node unchanged and infers -er paradigms', () => {
  const existing = graph.headwords.find((h) => h.id === 'fr:lex:parler');
  const edited = { ...existing, cefr: 'A1' };
  const entries = [
    { id: 'parler-fr', word: 'parler', partOfSpeech: 'verb', relationships: [] },
    { id: 'aimer-fr', word: 'aimer', partOfSpeech: 'verb', relationships: [] },
    { id: 'table-fr', word: 'table', partOfSpeech: 'noun', gender: 'f', relationships: [] },
  ];
  const nodes = seedHeadwords(entries, [edited]);
  assert.deepEqual(nodes.find((n) => n.id === 'fr:lex:parler'), edited);
  assert.deepEqual(nodes.find((n) => n.id === 'fr:lex:aimer').paradigms, ['fr:cx:verb.er.present', 'fr:cx:ptcp.er']);
  assert.deepEqual(nodes.find((n) => n.id === 'fr:lex:table').paradigms, []);
  assert.equal(nodes.filter((n) => n.id === 'fr:lex:parler').length, 1);
});

test('seedHeadwords adds .pos when a key is already taken', () => {
  const entries = [
    { id: 'est-fr', word: 'est', partOfSpeech: 'noun', relationships: [] },
    { id: 'été-fr', word: 'été', partOfSpeech: 'noun', relationships: [] },
    { id: 'ete-fr', word: 'ete', partOfSpeech: 'adverb', relationships: [] },
  ];
  const existing = [{ id: 'fr:lex:est', lemma: 'est', pos: 'verb', paradigms: [], senses: [], dictionaryId: 'est-v', cefr: null, cefrSource: null }];
  const ids = seedHeadwords(entries, existing).map((n) => n.id).sort();
  assert.deepEqual(ids, ['fr:lex:ete', 'fr:lex:ete.adverb', 'fr:lex:est', 'fr:lex:est.noun'].sort());
});

test('headwordKey folds diacritics and joins spaces and apostrophes', () => {
  assert.equal(headwordKey('café', 'noun', new Set()), 'cafe');
  assert.equal(headwordKey("s'appeler", 'verb', new Set()), 's-appeler');
  assert.equal(headwordKey('il y a', 'expression', new Set()), 'il-y-a');
  assert.equal(headwordKey("  l'  eau ", 'noun', new Set()), 'l-eau');
  assert.equal(headwordKey('est', 'noun', new Set(['est'])), 'est.noun');
  assert.equal(headwordKey('est', 'Proper Noun', new Set(['est'])), 'est.proper-noun');
});

test('importConjugations adds only cells whose surface differs from the generated form', () => {
  const tables = {
    parlerConjugations: {
      je: { conjugation: 'parle' }, tu: { conjugation: 'parles' }, il: { conjugation: 'parle' },
      elle: { conjugation: 'parle' }, nous: { conjugation: 'parlâmes' }, vous: { conjugation: 'parlez' },
      ils: { conjugation: 'parlent' }, elles: { conjugation: 'parlent' },
    },
    allerConditionalConjugations: {
      je: { conjugation: 'irais' }, il: { conjugation: 'irait' }, elle: { conjugation: 'irait' },
    },
    allerConjugations: { je: { conjugation: 'vais' } },
    inconnuConjugations: { je: { conjugation: 'x' } },
  };
  const { forms: nodes } = importConjugations(tables, graph);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  assert.deepEqual(Object.keys(byId).sort(), [
    'fr:form:aller.cond.1sg', 'fr:form:aller.cond.3sg', 'fr:form:parler.prs.1pl',
  ]);
  assert.deepEqual(byId['fr:form:aller.cond.1sg'], {
    id: 'fr:form:aller.cond.1sg', of: 'fr:lex:aller', cell: 'cond.1sg', surface: 'irais',
  });
  assert.equal(byId['fr:form:parler.prs.1pl'].surface, 'parlâmes');
});

test('importConjugations reports skipped tables with a reason', () => {
  const { forms, skipped } = importConjugations({
    inconnuConjugations: { je: { conjugation: 'x' } },
    parlerSubjonctif: { je: { conjugation: 'x' } },
    parlerConjugations: { je: { conjugation: 'parle' } },
  }, graph);
  assert.deepEqual(forms, []);
  assert.deepEqual(skipped, [
    { exportName: 'inconnuConjugations', reason: 'no-headword' },
    { exportName: 'parlerSubjonctif', reason: 'unknown-suffix' },
  ]);
});

test('importConjugations reads imperfect and participle tables', () => {
  const tables = {
    etrePastConjugations: { je: { conjugation: 'étais' } },
    parlerPasseComposeConjugations: { je: { pastParticiple: 'parlé', auxiliary: 'ai' } },
  };
  const { forms: nodes } = importConjugations(tables, graph);
  // the fixture's parler has no participle paradigm, so its participle is not generated
  assert.deepEqual(nodes.map((n) => n.id), ['fr:form:etre.impf.1sg', 'fr:form:parler.ptcp']);
  assert.equal(nodes[1].surface, 'parlé');
});

test('extractTeaches drops excludeWords and keeps the field', () => {
  const course = [makeModule({ position: 1, moduleKey: 'a', vocab: ['il est'] })];
  const before = extractTeaches(graph, course, index).courseMap.a.teachesWords;
  assert.ok(before.includes('fr:form:etre.prs.3sg'), 'credited without the exclusion');
  const g = withMap({ a: { excludeWords: ['fr:form:etre.prs.3sg'] } });
  const { courseMap } = extractTeaches(g, course, index);
  assert.ok(!courseMap.a.teachesWords.includes('fr:form:etre.prs.3sg'));
  assert.ok(courseMap.a.teachesWords.includes('fr:lex:etre'));
  assert.ok(courseMap.a.teachesWords.includes('fr:lex:il'));
  assert.deepEqual(courseMap.a.excludeWords, ['fr:form:etre.prs.3sg']);
});

test('extractTeaches matches accents first so the preposition beats the avoir form', () => {
  const run = (vocab) => extractTeaches(graph, [makeModule({ position: 1, moduleKey: 'a', vocab })], index).courseMap.a.teachesWords;
  const prep = run(['à']);
  assert.ok(prep.includes('fr:lex:a'));
  assert.ok(!prep.includes('fr:form:avoir.prs.3sg'));
  assert.ok(run(['il a']).includes('fr:form:avoir.prs.3sg'));
});

test('an excluded headword is dropped before ranking, so the noun spelled like its form is credited', () => {
  const course = [makeModule({ position: 1, moduleKey: 'a', vocab: ['il est'] })];
  const g = withMap({ a: { excludeWords: ['fr:lex:etre'] } });
  const words = extractTeaches(g, course, index).courseMap.a.teachesWords;
  assert.ok(!words.some((id) => id.startsWith('fr:lex:etre') || id.startsWith('fr:form:etre')), words.join(' '));
  assert.ok(words.includes('fr:lex:il'));
});
