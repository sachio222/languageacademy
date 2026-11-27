import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { makeModule, makeCtx } from './helpers.mjs';
import { ruleTaughtBefore, analyzeItems, firstUse, cognatesAllowed } from '../rules/taught-before.mjs';
import { ruleGuideOnlyTeaching } from '../rules/content.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, 'fixtures', 'graph-mini');
const base = loadGraph(fixtureDir, 'fr');

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

test('a form gap on a taught word fixes at the first use of the form, not of the word', () => {
  const course = [mod(1, [item('je vais')]), mod(2, [item('tu vas')]), mod(3, [item('tu vas')])];
  const ctx = setup({ m1: { teachesWords: ['fr:lex:je', 'fr:lex:tu', 'fr:lex:aller', 'fr:form:aller.prs.1sg'] } }, course);
  const hits = ruleTaughtBefore(ctx).filter((i) => i.surface === 'vas');
  assert.deepEqual(hits.map((i) => [i.moduleKey, i.fix.moduleKey]), [['m2', 'm2'], ['m3', 'm2']]);
  assert.match(hits[0].message, /this form is not/);
});

test('a homograph names the reading that is taught later, not the first one in the index', () => {
  const hw = (id, lemma, pos, paradigms) => ({ id, lemma, pos, paradigms, senses: [], dictionaryId: null, cefr: null, cefrSource: null });
  // the noun comes first in the index, as fr:lex:marche does in the French graph
  const headwords = [...base.headwords, hw('fr:lex:marche', 'marché', 'noun', []), hw('fr:lex:marcher', 'marcher', 'verb', ['fr:cx:ptcp.er'])];
  const ctx = setup({ m5: { teachesWords: ['fr:lex:marcher'], teachesConstructions: ['fr:cx:ptcp.er'] } },
    [mod(1, [item('marché')]), mod(5, [])], { headwords });
  const [hit] = ruleTaughtBefore(ctx).filter((i) => i.surface === 'marché');
  assert.equal(hit.nodeId, 'fr:lex:marcher');
  assert.match(hit.message, /taught later at position 5/);
});

test('lenient text reads a lone elided letter as its elided form; strict text is left as written', () => {
  const ctx = setup({ m1: { teachesWords: ['fr:lex:je', 'fr:form:je.elided', 'fr:lex:aller', 'fr:form:aller.prs.1sg', 'fr:lex:etre', 'fr:form:etre.prs.3sg'] } },
    [mod(1, [item(["j'est"], { lenient: ['j est'] }), item(['j est'])])]);
  const a = analyzeItems(ctx);
  assert.deepEqual(a.get('m1#1')[1].tokens.map((t) => t.surface), ["j'", 'est']);
  assert.deepEqual(a.get('m1#2')[0].tokens.map((t) => t.surface), ['j', 'est']);
});

test('an untaught word is never named by its letter-of-the-alphabet reading when it has a word reading', () => {
  const hw = (id, lemma, pos) => ({ id, lemma, pos, paradigms: [], senses: [], dictionaryId: null, cefr: null, cefrSource: null });
  const headwords = [...base.headwords, hw('fr:lex:y', 'y', 'alphabet'), hw('fr:lex:y.pronoun', 'y', 'pronoun')];
  const ctx = setup({}, [mod(1, [item('y')])], { headwords });
  const [hit] = ruleTaughtBefore(ctx).filter((i) => i.surface === 'y');
  assert.equal(hit.nodeId, 'fr:lex:y.pronoun');
  // both readings credited by the same later vocabulary entry ("on y va")
  const later = setup({ m5: { teachesWords: ['fr:lex:y', 'fr:lex:y.pronoun'] } }, [mod(1, [item('y')]), mod(5, [])], { headwords });
  const [hit5] = ruleTaughtBefore(later).filter((i) => i.surface === 'y');
  assert.equal(hit5.nodeId, 'fr:lex:y.pronoun');
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

test('shown text is checked strictly, like typed text', () => {
  const ok = setup({ m1: { teachesWords: ['fr:lex:ou'] } }, [mod(1, [item([], { shown: ['ou'] })])]);
  assert.deepEqual(ruleTaughtBefore(ok), []);
  const accent = setup({ m1: { teachesWords: ['fr:lex:ou'] } }, [mod(1, [item([], { shown: ['où'] })])]);
  assert.deepEqual(ruleTaughtBefore(accent).map((i) => [i.rule, i.surface]), [['unknown-word', 'où']]);
  const later = setup({ m5: { teachesWords: ['fr:lex:je', 'fr:lex:parler'], teachesConstructions: ['fr:cx:verb.er.present'] } },
    [mod(1, [item([], { shown: ['Je parle'] })]), mod(5, [])]);
  assert.deepEqual(ruleTaughtBefore(later).map((i) => [i.rule, i.surface, i.reason]),
    [['untaught-word', 'Je', 'later'], ['untaught-word', 'parle', 'later']]);
  assert.deepEqual(analyzeItems(later).get('m1#1').map((a) => [a.text, a.strict]), [['Je parle', true]]);
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
  assert.deepEqual(Object.keys(entries[0]).sort(), ['constructions', 'licenses', 'readings', 'strict', 'text', 'tokens']);
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

test('taught-before issues carry the reason, the later position and the sentence', () => {
  const course = [
    mod(1, [item('Je parle.'), item('Je vais au marché et je mange du pain.')]),
    mod(2, [item('tu vas')]),
    mod(5, [item('travailler')]),
  ];
  const ctx = setup({
    m1: { teachesWords: ['fr:lex:je', 'fr:lex:parler', 'fr:lex:aller', 'fr:form:aller.prs.1sg'], teachesConstructions: ['fr:cx:verb.er.present'] },
    m5: { teachesWords: ['fr:lex:tu'] },
  }, course);
  const issues = ruleTaughtBefore(ctx);
  const tu = issues.find((i) => i.surface === 'tu');
  assert.equal(tu.reason, 'later');
  assert.deepEqual(tu.taughtLaterAt, { position: 5, title: 'Module 5' });
  assert.equal(tu.text, 'tu vas');
  const vas = issues.find((i) => i.surface === 'vas');
  assert.equal(vas.reason, 'form');
  assert.equal(vas.taughtLaterAt, null);
  assert.deepEqual(vas.taughtEarlierAt, { position: 1, title: 'Module 1' });
  assert.equal(vas.lemma, 'aller');
  const nowhere = issues.find((i) => i.rule === 'untaught-word' && i.reason === 'nowhere');
  assert.ok(nowhere, 'a word taught nowhere has reason nowhere');
  assert.equal(nowhere.taughtLaterAt, null);
  assert.equal(nowhere.text, 'Je vais au marché et je mange du pain.');
});

test('strict text keeps où and ou apart when deduping a module', () => {
  const hw = (id, lemma, pos) => ({ id, lemma, pos, paradigms: [], senses: [], dictionaryId: null, cefr: null, cefrSource: null });
  const headwords = [...base.headwords, hw('fr:lex:ou.adverb', 'où', 'adverb')];
  const ctx = setup({ m5: { teachesWords: ['fr:lex:ou', 'fr:lex:ou.adverb'] } },
    [mod(1, [item('où'), item('ou')]), mod(5, [])], { headwords });
  const hits = ruleTaughtBefore(ctx).filter((i) => i.rule === 'untaught-word');
  assert.deepEqual(hits.map((i) => i.surface).sort(), ['ou', 'où']);
});

test('an accepted answer typed without accents is the same word as the accented text', () => {
  const ctx = setup({ m5: { teachesWords: ['fr:lex:cafe'] } },
    [mod(1, [item(['café'], { lenient: ['cafe'] }), item(['café'])]), mod(5, [])]);
  const hits = ruleTaughtBefore(ctx).filter((i) => i.rule === 'untaught-word');
  assert.deepEqual(hits.map((i) => i.surface), ['café']);
});

// Cognates. The fixture pair (pairs/en-fr/cognates.json) lists café and parc, with librairie as a false friend, and
// names m3 as the cognates lesson. Nothing in these courses teaches café, parc or librairie.
const cognateCourse = (...later) => [mod(1, [item('Je parle.')]), mod(3, [], { kind: 'help' }), ...later];
const cognateMap = { m1: { teachesWords: ['fr:lex:je', 'fr:lex:parler'], teachesConstructions: ['fr:cx:verb.er.present'] } };
const untaught = (ctx, surface) => ruleTaughtBefore(ctx).filter((i) => i.rule === 'untaught-word' && i.surface === surface);

test('a cognate in shown text after the cognates lesson gives no issue and counts as allowed', () => {
  const ctx = setup(cognateMap, cognateCourse(mod(5, [item([], { shown: ['café'] })])));
  assert.deepEqual(untaught(ctx, 'café'), []);
  assert.equal(cognatesAllowed(ctx), 1);
});

test('a cognate the learner types keeps its issue, with reason cognate', () => {
  const ctx = setup(cognateMap, cognateCourse(mod(5, [item('café')])));
  const [hit, ...rest] = untaught(ctx, 'café');
  assert.equal(rest.length, 0);
  assert.equal(hit.reason, 'cognate');
  assert.equal(hit.baseReason, 'nowhere');
  assert.match(hit.message, /café is a cognate, so English speakers may read it before it is taught, but they should not have to type it/);
  assert.equal(cognatesAllowed(ctx), 0);
});

test('in a blank sentence a cognate outside the blank is read, inside the blank it is typed', () => {
  const outside = setup(cognateMap, cognateCourse(mod(5, [item('Je parle café.', { blankAnswers: ['parle'] })])));
  assert.deepEqual(untaught(outside, 'café'), []);
  assert.equal(cognatesAllowed(outside), 1);
  const inside = setup(cognateMap, cognateCourse(mod(5, [item('Je parle café.', { blankAnswers: ['café'] })])));
  assert.equal(untaught(inside, 'café')[0]?.reason, 'cognate');
});

test('a cognate before the cognates lesson is an ordinary untaught word', () => {
  const ctx = setup(cognateMap, cognateCourse(mod(2, [item([], { shown: ['café'] })])));
  const [hit] = untaught(ctx, 'café');
  assert.equal(hit.reason, 'nowhere');
  assert.equal(cognatesAllowed(ctx), 0);
});

test('with allowIn all, a typed cognate gives no issue', () => {
  const settings = { ...base.settings, cognates: { allowIn: 'all' } };
  const ctx = setup(cognateMap, cognateCourse(mod(5, [item('café'), item('Je parle café.', { blankAnswers: ['café'] })])), { settings });
  assert.deepEqual(untaught(ctx, 'café'), []);
  assert.equal(cognatesAllowed(ctx), 2);
});

test('for a native language with no pair file every cognate is an ordinary untaught word', () => {
  const ja = loadGraph(fixtureDir, 'fr', { native: 'ja' });
  const course = cognateCourse(mod(5, [item([], { shown: ['café'] }), item('parc'), item('Je parle café.', { blankAnswers: ['parle'] })]));
  const ctx = makeCtx({ graph: { ...ja, courseMap: cognateMap }, course });
  const hits = ruleTaughtBefore(ctx).filter((i) => i.rule === 'untaught-word');
  assert.deepEqual(hits.map((i) => [i.surface, i.reason]), [['café', 'nowhere'], ['parc', 'nowhere']]);
  assert.equal(cognatesAllowed(ctx), 0);
});

test('a false friend never gets the allowance, even when it is also listed as a cognate', () => {
  const ctx = setup(cognateMap, cognateCourse(mod(5, [item([], { shown: ['librairie'] })])));
  assert.equal(untaught(ctx, 'librairie')[0]?.reason, 'nowhere');
  const pair = { ...base.pair, words: [...base.pair.words, { id: 'fr:lex:librairie', native: 'library', kind: 'close' }] };
  const both = setup(cognateMap, cognateCourse(mod(5, [item([], { shown: ['librairie'] })])), { pair });
  assert.equal(untaught(both, 'librairie')[0]?.reason, 'nowhere');
  assert.equal(cognatesAllowed(both), 0);
});

test('a cognate verb covers its regular forms but not an irregular one', () => {
  const pair = { ...base.pair, words: [{ id: 'fr:lex:travailler', native: 'travail', kind: 'close' }, { id: 'fr:lex:aller', native: 'go', kind: 'close' }] };
  const ctx = setup({}, cognateCourse(mod(5, [item([], { shown: ['travaillons'] }), item([], { shown: ['vais'] })])), { pair });
  assert.deepEqual(untaught(ctx, 'travaillons'), []);
  assert.equal(untaught(ctx, 'vais').length, 1);
});

test('a typed cognate is fixed where the learner first types it, never where it is only read', () => {
  const ctx = setup(cognateMap, cognateCourse(
    mod(4, [item([], { shown: ['café'] })]),
    mod(5, [item('café')]),
    mod(7, [item('un café')]),
  ));
  const hits = untaught(ctx, 'café');
  assert.deepEqual(hits.map((i) => [i.moduleKey, i.reason, i.fix.moduleKey]), [['m5', 'cognate', 'm5'], ['m7', 'cognate', 'm5']]);
});

test('a cognate first read in a hint and typed much later is fixed in the module that types it', () => {
  // the hint reads like English ("Combine café + lait"), and the checker reads café in it before the cognates lesson
  const course = cognateCourse(
    mod(30, [item([], { source: 'hint', shown: ['café'] })]),
    mod(60, [item('Je parle.')]),
    mod(149, [item('café')]),
  );
  course.splice(1, 0, mod(2, [item([], { source: 'hint', shown: ['café'] })]));
  const ctx = setup(cognateMap, course);
  const typed = untaught(ctx, 'café').find((i) => i.moduleKey === 'm149');
  assert.equal(typed.reason, 'cognate');
  assert.equal(typed.fix.moduleKey, 'm149');
  // hints stay outside the taught-before rule (Jake), so the hint before the cognates lesson is not an issue, but it is
  // still a use of the word
  assert.equal(untaught(ctx, 'café').find((i) => i.moduleKey === 'm2'), undefined);
  assert.equal(firstUse(ctx).get('fr:lex:cafe')?.moduleKey, 'm2');
});

test('hints, feedback, instructions and titles stay outside the taught-before rule', () => {
  const course = cognateCourse(
    mod(2, ['hint', 'feedback', 'instruction', 'title', 'concept'].map((source) => item([], { source, shown: ['nous travaillons'] }))),
    mod(4, [item('nous travaillons')]),
  );
  const hits = ruleTaughtBefore(setup(cognateMap, course)).filter((i) => i.moduleKey === 'm2' && i.surface === 'travaillons');
  assert.deepEqual(hits.map((i) => i.itemRef), ['m2#5'], 'only the concept card');
});

test('a word or pattern an override ignores in an item is not a use of it there', () => {
  const course = [
    mod(1, [item('Je parle.')]),
    mod(2, [item([], { shown: ['nous travaillons'] })]),
    mod(4, [item('nous travaillons')]),
  ];
  const map = { ...cognateMap, m2: { overrides: { 'm2#1': { ignore: ['fr:lex:travailler', 'fr:cx:verb.er.present'] } } } };
  const ctx = setup(map, course);
  assert.equal(firstUse(ctx).get('fr:lex:travailler')?.moduleKey, 'm4');
  const hits = ruleTaughtBefore(ctx).filter((i) => i.surface === 'travaillons');
  assert.deepEqual(hits.map((i) => [i.moduleKey, i.fix.moduleKey]), [['m4', 'm4']]);
});

test('a word the Reference unit lists is not untaught from openFrom on, typed or shown', () => {
  const course = [mod(1, [item('vous')]), mod(2, [item('vous'), item([], { shown: ['vous'] })]), mod(3, [item([], { shown: ['vous'] })])];
  const graph = { ...base, courseMap: {} };
  const reference = new Set(['fr:lex:vous']);
  const open1 = makeCtx({ graph, course, reference, openFrom: 1 });
  assert.deepEqual(ruleTaughtBefore(open1), []);
  const open3 = makeCtx({ graph, course, reference, openFrom: 3 });
  assert.deepEqual(ruleTaughtBefore(open3).map((i) => [i.rule, i.moduleKey]), [['untaught-word', 'm1'], ['untaught-word', 'm2']]);
  const closed = makeCtx({ graph, course });
  assert.equal(ruleTaughtBefore(closed).length, 3);
});

test('a Reference noun spelled like a verb form does not hide the untaught verb form', () => {
  const hw = (id, lemma, pos, paradigms) => ({ id, lemma, pos, paradigms, senses: [], dictionaryId: null, cefr: null, cefrSource: null });
  const headwords = [...base.headwords, hw('fr:lex:marche', 'marché', 'noun', []), hw('fr:lex:marcher', 'marcher', 'verb', ['fr:cx:ptcp.er'])];
  const graph = { ...base, headwords, courseMap: {} };
  const course = [mod(1, [item('marché')]), mod(2, [item('café')])];
  const ctx = makeCtx({ graph, course, reference: new Set(['fr:lex:marche', 'fr:lex:cafe']) });
  // marché also reads as the past participle of marcher, which no lesson teaches; café has one reading.
  // The Reference does not count for an ambiguous token at all, so the reason is that no lesson teaches it.
  assert.deepEqual(ruleTaughtBefore(ctx).map((i) => [i.rule, i.surface, i.reason]), [['untaught-word', 'marché', 'nowhere']]);
});

// fr:cx:neg.de (je n'ai pas de café) licenses the de it matches: a module that teaches the construction teaches that
// de, and no other use of the preposition.
test('a taught construction licenses the words it lists only inside its own match', () => {
  const hw = (id, lemma, pos) => ({ id, lemma, pos, paradigms: [], senses: [], dictionaryId: null, cefr: null, cefrSource: null });
  const negDe = {
    id: 'fr:cx:neg.de', label: 'de after a negation', needs: [], contrastsWith: [], cefr: null,
    detect: [{ surface: "ne|n'" }, { skip: 4, surface: 'pas|plus|jamais' }, { surface: "de|d'" }],
    licenses: ['fr:lex:de'], examples: { match: ['Je ne parle pas de café.'], noMatch: ['Je parle de café.'] },
  };
  const graph = { ...base, headwords: [...base.headwords, hw('fr:lex:de', 'de', 'preposition')], constructions: [...base.constructions, negDe] };
  const course = [
    mod(1, [item([], { shown: ['Je ne parle pas de café.'] })]),
    mod(2, [item([], { shown: ['Je ne parle pas de café.'] }), item([], { shown: ['Je parle de café.'] })]),
  ];
  const courseMap = {
    m1: { teachesWords: ['fr:lex:je', 'fr:lex:parler', 'fr:lex:ne', 'fr:lex:pas', 'fr:lex:cafe'], teachesConstructions: ['fr:cx:verb.er.present'] },
    m2: { teachesConstructions: ['fr:cx:neg.de'] },
  };
  const ctx = makeCtx({ graph: { ...graph, courseMap }, course });
  const hits = ruleTaughtBefore(ctx).map((i) => [i.rule, i.itemRef, i.surface ?? i.nodeId]);
  assert.deepEqual(hits, [
    // before the construction is taught, its de is an ordinary untaught word
    ['untaught-word', 'm1#1', 'de'],
    ['untaught-construction', 'm1#1', 'fr:cx:neg.de'],
    // once it is taught, the de of "pas de" passes and the preposition de does not
    ['untaught-word', 'm2#2', 'de'],
  ]);
});

// A recognition-only construction (use: 'recognize', such as the passé simple) is reported where the learner reads or
// hears its literary form before it is taught, never where the learner types that form: not in a typed answer, and not
// in a gap-fill whose blank is the form. A blank elsewhere in the match (the subject il) leaves the form read. Where the
// learner must type the form, recognize-typed warns.
test('a recognition-only construction is never reported in French the learner types', () => {
  const pastSimple = {
    id: 'fr:cx:test.read-only', label: 'a literary form', needs: [], contrastsWith: [], cefr: 'B2', cefrSource: 'agent: judgment',
    use: 'recognize', detect: [{ surface: 'il' }, { surface: 'fut', form: true }], examples: { match: ['Il fut là.'], noMatch: ['Il est là.'] },
  };
  const productive = { ...pastSimple, id: 'fr:cx:test.productive', use: undefined, detect: [{ surface: 'il' }, { surface: 'parle' }] };
  const graph = { ...base, constructions: [...base.constructions, pastSimple, productive] };
  const ofTest = (issues, rule) => issues.filter((i) => i.rule === rule && i.nodeId.startsWith('fr:cx:test.')).map((i) => [i.itemRef, i.nodeId]);
  const run = (items, position = 1) => ruleTaughtBefore(makeCtx({ graph: { ...graph, courseMap: {} }, course: [mod(position, items)] }));
  // typed answers, a lenient answer and a gap-fill whose blank is the form: the learner types the form
  const typed = run([
    item(['Il fut content.']),
    item([], { lenient: ['il fut content'] }),
    item(['Il fut content.'], { blankAnswers: ['fut'] }),
    item(['Il parle.']),
  ]);
  assert.deepEqual(ofTest(typed, 'untaught-construction'), [['m1#4', 'fr:cx:test.productive']]);
  assert.deepEqual(ofTest(typed, 'recognize-typed'), [['m1#1', 'fr:cx:test.read-only']]);
  assert.ok(typed.filter((i) => i.rule === 'recognize-typed').every((i) => i.severity === 'warning'));
  // a shown text, a gap-fill whose blank lies outside the match, and one whose blank is inside the match but outside
  // the form: each is French the learner reads there
  for (const it of [item([], { shown: ['Il fut content.'] }), item(['Il fut content.'], { blankAnswers: ['content'] }),
    item(['Il fut content.'], { blankAnswers: ['il'] })]) {
    const read = run([it], 2);
    assert.deepEqual(ofTest(read, 'untaught-construction'), [['m2#1', 'fr:cx:test.read-only']]);
    assert.deepEqual(ofTest(read, 'recognize-typed'), []);
  }
  // a guide may teach it alone: guide_only_teaching leaves it out, and still reports a productive pattern
  const guided = makeCtx({
    graph: { ...graph, courseMap: { m1: { teachesConstructions: ['fr:cx:test.read-only', 'fr:cx:test.productive'] } } },
    course: [mod(1, [], { kind: 'help' }), mod(2, [item([], { shown: ['Il fut content.', 'Il parle.'] })])],
  });
  assert.deepEqual(ruleGuideOnlyTeaching(guided).map((i) => i.nodeId), ['fr:cx:test.productive']);
});

// A recognition-only word (use: 'recognize' on its headword, such as slang) is one the learner reads and hears but is
// never asked to produce: recognize-typed warns where the learner would have to type it, once per word and module.
test('a recognition-only word warns where the learner must type it, never where it is read', () => {
  const graph = { ...base, courseMap: {}, headwords: base.headwords.map((h) => (h.id === 'fr:lex:cafe' ? { ...h, register: 'slang', use: 'recognize' } : h)) };
  const run = (items) => ruleTaughtBefore(makeCtx({ graph, course: [mod(1, items)] })).filter((i) => i.rule === 'recognize-typed');
  const typed = run([
    item(['Je parle au café.']),
    item([], { lenient: ['je parle au cafe'] }),
    item(['Je parle au café.'], { blankAnswers: ['café'] }),
  ]);
  assert.deepEqual(typed.map((i) => [i.itemRef, i.nodeId, i.severity]), [['m1#1', 'fr:lex:cafe', 'warning']]);
  assert.match(typed[0].message, /only reads and hears/);
  assert.deepEqual(run([item([], { shown: ['Je parle au café.'] }), item(['Je parle au café.'], { blankAnswers: ['parle'] })]), []);
  // an ignore on the item silences it, as for any other word
  const ignored = { ...graph, courseMap: { m1: { overrides: { 'm1#1': { ignore: ['fr:lex:cafe'] } } } } };
  assert.deepEqual(ruleTaughtBefore(makeCtx({ graph: ignored, course: [mod(1, [item(['Je parle au café.'])])] })).filter((i) => i.rule === 'recognize-typed'), []);
});
