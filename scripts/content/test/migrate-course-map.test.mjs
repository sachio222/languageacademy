// Task 9: what a module teaches and tests moves from curriculum-graph/languages/fr/course-map.json into the module
// file (spec 5.2), and the course map keeps only the checker's corrections, keyed by module key and item id.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitCourseMap, correctionsOf, preTeachRows, isSplit, resplitProblem, TEACHING_FIELDS } from '../migrate/course-map.mjs';
import { convertModule } from '../migrate/module.mjs';
import { loadCourse, graphIds } from '../load.mjs';
import { todaysModules, readLSources } from '../migrate/sources.mjs';
import { readingFrom } from '../migrate/reading.mjs';
import { unmark } from '../migrate/mark-french.mjs';

const REPO = fileURLToPath(new URL('../../../', import.meta.url));
const readJson = (p) => JSON.parse(readFileSync(join(REPO, p), 'utf8'));
const LIVE_IDS = readJson('content/fr/legacy/live-ids.json');
// The course map as it was before the split (Task 10 renamed the corrections over it), kept as a frozen input.
const COURSE_MAP = readJson('scripts/content/test/fixtures/course-map-before-split.json');
const course = loadCourse();
const { configs } = await todaysModules();
const RECORDS = readJson('content/fr/legacy/migration-sources.json');
const split = (courseMap) => splitCourseMap(courseMap, course, { liveIds: LIVE_IDS, sources: configs, records: RECORDS });
const codes = (report) => report.map((l) => l.detail.split(':')[0]);

// Every key anywhere in a value, for "no teaching field is left at any depth".
function keysOf(v, out = new Set()) {
  if (Array.isArray(v)) v.forEach((x) => keysOf(x, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) keysOf(x, out.add(k));
  return out;
}

test('teaches move into module', () => {
  const { declarations } = split({ '2024-01-02-etre': { teachesConstructions: ['fr:cx:etre.present'] } });
  assert.deepEqual(declarations['2024-01-02-etre'].teaches.constructions, ['fr:cx:etre.present']);
});

test('corrections by item id', () => {
  const key = '2024-01-01-famous-words';
  const override = { ignore: ['fr:cx:elision', 'fr:cx:pronoun.subject'] };
  const { corrections } = split({ [key]: { overrides: { [`${key}#exerciseConfig.items[5]`]: override } } });
  const sixth = LIVE_IDS[key].items[`${key}.6`];
  assert.ok(sixth, 'live-ids.json names the sixth live exercise');
  assert.deepEqual(corrections[key].overrides, { [`${key}#${sixth}`]: override });
});

test('no teaching left', () => {
  const synthetic = {
    '2024-01-09-reading1': { preTeach: ['fr:lex:bonjour'] },
    '2024-01-19-questions-help': { screen: 'src/components/QuestionsHelp.jsx', teachesConstructions: ['fr:cx:q.est-ce-que'] },
  };
  for (const courseMap of [COURSE_MAP, synthetic]) {
    const { corrections } = split(courseMap);
    const keys = keysOf(corrections);
    for (const f of ['teachesConstructions', 'teachesWords', 'teachesWordsManual', 'tests', 'preTeach', 'screen'])
      assert.ok(!keys.has(f), `corrections hold no ${f}`);
  }
  assert.deepEqual(TEACHING_FIELDS, ['teachesConstructions', 'teachesWords', 'teachesWordsManual', 'tests', 'preTeach']);
});

test('what each kind declares', () => {
  const { declarations, report } = split({
    '2024-01-20-prepositions': { teachesWords: ['fr:lex:a.preposition'], teachesWordsManual: ['fr:lex:devant'], excludeWords: ['fr:form:devoir.prs.1sg'] },
    '2026-11-24-negation-guide': { teachesConstructions: ['fr:cx:neg.ne-pas'], teachesWords: [], teachesWordsManual: ['fr:lex:ne'] },
    '2024-01-10-unit1-practice': { tests: ['fr:cx:elision'] },
    '2024-01-11-unit1-exam': { tests: ['fr:cx:elision', 'fr:cx:pronoun.subject'] },
    '2024-01-23-unit2-practice': {},
  });
  // Extracted words are the module's own vocabulary table, so they are never written (spec 5.2).
  assert.deepEqual(declarations['2024-01-20-prepositions'], { teaches: { constructions: [], words: ['fr:lex:devant'] } });
  assert.deepEqual(declarations['2026-11-24-negation-guide'], { teaches: { constructions: ['fr:cx:neg.ne-pas'], words: ['fr:lex:ne'] } });
  assert.deepEqual(declarations['2024-01-10-unit1-practice'], { tests: { constructions: ['fr:cx:elision'] } });
  assert.deepEqual(declarations['2024-01-11-unit1-exam'].tests.constructions, ['fr:cx:elision', 'fr:cx:pronoun.subject']);
  // A practice set or exam always declares what it tests, empty when the course map lists nothing.
  assert.deepEqual(declarations['2024-01-23-unit2-practice'], { tests: { constructions: [] } });
  assert.ok(codes(report).includes('teaches_words_derived'));
});

test('teaching on a kind that cannot hold it is reported, not written', () => {
  const { declarations, report } = split({
    '2024-01-10-unit1-practice': { teachesConstructions: ['fr:cx:elision'], tests: ['fr:cx:elision'] },
    '2024-01-02-etre': { tests: ['fr:cx:elision'] },
  });
  assert.deepEqual(declarations['2024-01-10-unit1-practice'], { tests: { constructions: ['fr:cx:elision'] } });
  assert.equal(declarations['2024-01-02-etre'], undefined);
  assert.deepEqual(codes(report).filter((c) => c === 'misplaced').length, 2);
});

test('screens are dropped with a line each; excludeWords and contentNotes stay with the module', () => {
  const { corrections, report } = split({
    '2024-01-19-questions-help': { screen: 'src/components/QuestionsHelp.jsx' },
    '2024-01-05-articles': { excludeWords: ['fr:lex:le.pronoun'], contentNotes: ['A note.'] },
  });
  assert.deepEqual(corrections, { '2024-01-05-articles': { contentNotes: ['A note.'], excludeWords: ['fr:lex:le.pronoun'] } });
  const screen = report.filter((l) => l.detail.startsWith('screen_dropped'));
  assert.equal(screen.length, 1);
  assert.equal(screen[0].module_key, '2024-01-19-questions-help');
  assert.match(screen[0].detail, /QuestionsHelp\.jsx/);
});

test('text inside an item, concept cards and module fields keep their correction under ids', () => {
  const ig = (x) => ({ ignore: [x] });
  const { corrections } = split({
    '2024-01-13-ca-survival': { overrides: { '2024-01-13-ca-survival#exerciseConfig.items[4].hint': ig('fr:lex:combiner') } },
    '2024-02-02-combining': { overrides: { '2024-02-02-combining#exerciseConfig.items[11].wrongAnswers[0].feedback': ig('fr:cx:imperative.irregular') } },
    '2024-03-31-survival-phrases': { overrides: { '2024-03-31-survival-phrases#concepts[0].example': ig('fr:lex:express') } },
    '2024-02-02-service-phrases': { overrides: { '2024-02-02-service-phrases#title': ig('fr:lex:service') } },
    '2024-05-18-irregular-commands': { itemKinds: { '2024-05-18-irregular-commands#exercises[3]': 'translate' } },
  });
  const item = (key, n) => LIVE_IDS[key].items[`${key}.${n}`];
  const concept = (key, i) => LIVE_IDS[key].concepts[String(i)];
  assert.deepEqual(Object.keys(corrections['2024-01-13-ca-survival'].overrides), [`2024-01-13-ca-survival#${item('2024-01-13-ca-survival', 5)}/hint`]);
  // wrongAnswers[0] is the item's mistake with the same answer.
  const combining = course.modules.get('2024-02-02-combining').items.find((it) => it.id === item('2024-02-02-combining', 12));
  const k = combining.mistakes.findIndex((m) => m.answer === configs.get('2024-02-02-combining').exerciseConfig.items[11].wrongAnswers[0].answer);
  assert.ok(k >= 0);
  assert.deepEqual(Object.keys(corrections['2024-02-02-combining'].overrides), [`2024-02-02-combining#${combining.id}/mistakes/${k}/feedback`]);
  assert.deepEqual(Object.keys(corrections['2024-03-31-survival-phrases'].overrides), [`2024-03-31-survival-phrases#concepts/${concept('2024-03-31-survival-phrases', 0)}/example`]);
  assert.deepEqual(Object.keys(corrections['2024-02-02-service-phrases'].overrides), ['2024-02-02-service-phrases#title']);
  assert.deepEqual(corrections['2024-05-18-irregular-commands'].itemKinds, { [`2024-05-18-irregular-commands#${item('2024-05-18-irregular-commands', 4)}`]: 'translate' });
});

// The nine course-map corrections at places the live app has no id for. Each is keyed through the migration record by
// the id it has in the converted module, except the exam's concept card, whose text no module file holds.
test('corrections at places with no live id come through by the id the migration record gives', () => {
  const NINE = [
    ['2024-04-03-unit-4-practice', 'sentences[0]', 'i-je-voudrais'],
    ['2024-05-11-unit-7-practice', 'sentences[1]', 'i-on-2'],
    ['2024-01-13-ca-survival', 'vocabularyReference[2].note', 'vocabulary/ca-va-fr/note'],
    ['2024-04-24-reading-6', 'vocabularyReference[32].note', 'vocabulary/qu-est-ce-que-fr/note'],
    ['2024-05-05-on-and-people', 'vocabularyReference[3].note', 'vocabulary/on-va-fr/note'],
    ['2026-11-24-negation-guide', 'guide.sections[1].heading', 'parts/p-not-any-pas-de/heading'],
    ['2026-11-24-negation-guide', 'guide.sections[1].rule', 'parts/p-not-any-pas-de/text/0'],
    ['2026-11-24-negation-guide', 'guide.sections[2].examples[0].french', 'parts/p-no-more-nothing-never/blocks/1/lines/0/0'],
    ['2024-01-11-unit1-exam', 'concepts[2].example', null],
  ];
  // Every one of them is in the committed course map, with the override it carries there.
  for (const [key, at] of NINE) assert.ok(COURSE_MAP[key].overrides[`${key}#${at}`], `${key}#${at} is in course-map.json`);
  const { corrections, report } = split(COURSE_MAP);
  for (const [key, at, now] of NINE) {
    const was = COURSE_MAP[key].overrides[`${key}#${at}`];
    if (now) assert.deepEqual(corrections[key].overrides[`${key}#${now}`], was, `${key}#${at} -> ${now}`);
    else assert.match(report.find((l) => l.path === `${key}#${at}`).detail, /^text_dropped: a unit_exam holds no concept cards/);
  }
  // Each new key names text that is there, and the text the old place held.
  const mod = (k) => course.modules.get(k);
  // A note's French is marked as a span (native_fr); without the braces it is today's note.
  assert.equal(unmark(mod('2024-01-13-ca-survival').vocabulary.find((w) => w.word_id === 'ca-va-fr').note), configs.get('2024-01-13-ca-survival').vocabularyReference[2].note);
  const negation = mod('2026-11-24-negation-guide').parts.find((p) => p.id === 'p-no-more-nothing-never');
  assert.equal(negation.blocks[1].lines[0][0], configs.get('2026-11-24-negation-guide').guide.sections[2].examples[0].french);
  assert.ok(mod('2024-04-03-unit-4-practice').items.some((it) => it.id === 'i-je-voudrais'));
  // Nothing in the committed course map is lost: every override is keyed, except the one about dropped text and the two
  // on Units 1 to 3 concept examples, whose old example strings the examples lists replaced (plan
  // 2026-11-27-concept-cards-structured): the words they ignored are gone from the cards.
  const before = Object.values(COURSE_MAP).reduce((n, e) => n + Object.keys(e.overrides ?? {}).length, 0);
  const after = Object.values(corrections).reduce((n, e) => n + Object.keys(e.overrides ?? {}).length, 0);
  assert.equal(after, before - 3);
  const gone = ['2024-01-02-etre#concepts[0].example', '2024-01-19-stressed-pronouns#concepts[1].example'];
  assert.deepEqual(report.filter((l) => /^(no_item_id|no_target)/.test(l.detail)).map((l) => [l.path, l.detail.split(':')[0]]), gone.map((g) => [g, 'no_target']));
});

test('a correction at a place no id names is reported and kept nowhere', () => {
  const ig = { ignore: ['fr:cx:conditionnel-present'] };
  const { corrections, report } = split({
    '2024-04-03-unit-4-practice': { overrides: { '2024-04-03-unit-4-practice#sentences[99]': ig } },
    '2024-01-13-ca-survival': { overrides: { '2024-01-13-ca-survival#readingPassage.title': ig } },
  });
  assert.deepEqual(corrections, {});
  // Lines come in course order.
  assert.deepEqual(report.filter((l) => l.detail.startsWith('no_item_id')).map((l) => [l.module_key, l.path]), [
    ['2024-01-13-ca-survival', '2024-01-13-ca-survival#readingPassage.title'],
    ['2024-04-03-unit-4-practice', '2024-04-03-unit-4-practice#sentences[99]'],
  ]);
});

test('splitCourseMap: one preTeach word in the passage gets a row, one outside it gets a line', () => {
  const key = '2024-01-09-reading1';
  const reading = course.modules.get(key);
  const inPassage = { fr: 'chien', gloss: 'dog' };
  const outside = { fr: 'ordinateur', gloss: 'computer' };
  assert.ok(reading.passage.some((b) => /\bchien\b/.test(b.fr ?? '')) && !reading.vocabulary.some((w) => w.fr === 'chien'));
  const run = (id, w) => splitCourseMap({ [key]: { preTeach: [id] } }, course, { liveIds: LIVE_IDS, sources: configs, records: RECORDS, wordOf: (x) => (x === id ? w : null) });
  const a = run('fr:lex:chien', inPassage);
  assert.deepEqual(a.declarations[key], { vocabulary: [{ fr: 'chien', gloss: 'dog', node_id: 'fr:lex:chien' }] });
  assert.deepEqual(codes(a.report.filter((l) => l.module_key === key)), ['pre_teach_row']);
  const b = run('fr:lex:ordinateur', outside);
  assert.equal(b.declarations[key], undefined);
  assert.deepEqual(codes(b.report.filter((l) => l.module_key === key)), ['pre_teach_not_in_passage']);
});

test('preTeach: a passage word becomes a vocabulary row, a table word needs none, any other word is a line', () => {
  const reading = {
    kind: 'reading',
    passage: [{ id: 'b0', fr: 'Bonjour ! Le chat dort.', en: 'Hello! The cat sleeps.' }],
    vocabulary: [{ word_id: 'chat-fr', fr: 'chat', gloss: 'cat' }],
  };
  const words = new Map([
    ['fr:lex:bonjour', { fr: 'bonjour', gloss: 'hello' }],
    ['fr:lex:chat', { fr: 'chat', gloss: 'cat' }],
    ['fr:lex:maison', { fr: 'maison', gloss: 'house' }],
    ['fr:lex:dormir', { fr: 'dormir', gloss: null }],
  ]);
  const { rows, report } = preTeachRows('r', ['fr:lex:bonjour', 'fr:lex:chat', 'fr:lex:maison', 'fr:lex:nope'], reading, { wordOf: (id) => words.get(id) ?? null });
  assert.deepEqual(rows, [{ fr: 'bonjour', gloss: 'hello', node_id: 'fr:lex:bonjour' }]);
  assert.deepEqual(codes(report), ['pre_teach_row', 'already_in_table', 'pre_teach_not_in_passage', 'pre_teach_unknown']);

  const { declarations } = splitCourseMap({ r: { preTeach: ['fr:lex:bonjour'] } }, new Map([['r', reading]]), { liveIds: {}, wordOf: (id) => words.get(id) ?? null });
  assert.deepEqual(declarations.r, { vocabulary: [{ fr: 'bonjour', gloss: 'hello', node_id: 'fr:lex:bonjour' }] });
});

/* ---------- the committed files ---------- */

// Teaching a writer added by hand after the split (content Task C2): a lesson that first uses pas de, ne … rien, y or
// en now teaches it, and the Unit 8 practice set and exam test y and en. Content Task C3: Natural Phenomena teaches
// ne … plus, which Reading 12 uses and only the negation guide taught before. Each id must be in the file, after what
// the split declared.
const TEACHING_ADDED_AFTER_SPLIT = {
  '2024-03-24-everyday-nouns': { teaches: ['fr:cx:neg.de'] },
  '2024-10-22-donner': { teaches: ['fr:cx:neg.ne-rien'] },
  '2024-05-18-irregular-commands': { teaches: ['fr:cx:pronoun.y'] },
  '2024-05-12-commands-pronouns': { teaches: ['fr:cx:pronoun.en'] },
  '2024-05-24-unit-8-exam': { tests: ['fr:cx:pronoun.y', 'fr:cx:pronoun.en'] },
  '2024-05-25-unit-8-practice': { tests: ['fr:cx:pronoun.y', 'fr:cx:pronoun.en'] },
  '2024-03-17-natural-phenomena': { teaches: ['fr:cx:neg.ne-plus'] },
  // Content Task C4b: Basic Nouns teaches c'est, which it already shows in its table and items.
  '2024-01-06-basic-nouns': { teaches: ['fr:cx:cest'] },
  // Units 1 to 12 settled for the B2 grammar: donner teaches two pronouns together (je te le donne), which the
  // pronoun order guide after it explains and only that guide used before.
  '2024-02-10-donner': { teaches: ['fr:cx:pronoun.double'] },
  // course-main, 2026-11-27: the verb frames the checker can now see are taught where Units 1 to 12 first use them:
  // décider de and commencer à in the past-tense composition lesson, content de + infinitive with the emotion phrases.
  '2024-06-03-past-tense-composition': { teaches: ['fr:cx:frame.verb-de-infinitive', 'fr:cx:frame.verb-a-infinitive'] },
  '2024-01-25-emotion-phrases': { teaches: ['fr:cx:frame.il-est-adjective-de-infinitive'] },
  // vouloir-b, 2026-11-28: the vouloir lesson teaches the phrases that fill its frame (je voudrais, s'il te plaît,
  // quelque chose), which Survival Phrases and Everyday Nouns taught before.
  '2024-01-15-vouloir': { teaches: ['fr:cx:chunk.je-voudrais', 'fr:cx:chunk.sil-te-plait', 'fr:cx:chunk.quelque-chose'] },
};
// Teaching a writer moved to an earlier lesson after the split (content Task C4b): the ça lesson no longer teaches
// c'est, which Basic Nouns now teaches. Each id was in what the split declared and is gone from the file.
const TEACHING_MOVED_EARLIER_AFTER_SPLIT = {
  '2024-01-13-ca-survival': { teaches: ['fr:cx:cest'] },
  // vouloir-b, 2026-11-28: these phrases are taught in the vouloir lesson now.
  '2024-03-31-survival-phrases': { teaches: ['fr:cx:chunk.je-voudrais', 'fr:cx:chunk.sil-te-plait'] },
  '2024-03-24-everyday-nouns': { teaches: ['fr:cx:chunk.quelque-chose'] },
};
function withoutMovedTeaching(key, field, expected) {
  const moved = TEACHING_MOVED_EARLIER_AFTER_SPLIT[key]?.[field];
  if (!moved) return expected;
  for (const id of moved) assert.ok(expected.constructions.includes(id), `${key} ${field} declared ${id} at the split`);
  return { ...expected, constructions: expected.constructions.filter((id) => !moved.includes(id)) };
}
function withoutAddedTeaching(key, field, declared) {
  const added = TEACHING_ADDED_AFTER_SPLIT[key]?.[field];
  if (!added) return declared;
  const ids = declared.constructions;
  assert.deepEqual(ids.slice(-added.length), added, `${key} ${field} ends with the ids added after the split`);
  return { ...declared, constructions: ids.slice(0, -added.length) };
}

test('every module file declares what the course map says it teaches and tests', () => {
  const { declarations } = split(COURSE_MAP);
  let n = 0;
  for (const [key, mod] of course.modules) {
    // Only modules converted from the live app were ever in the course map: not a plan stub (Task 17), nor a module
    // written in content/ since.
    if (mod.status === 'planned' || !(key in RECORDS)) continue;
    const d = declarations[key] ?? {};
    assert.deepEqual(withoutAddedTeaching(key, 'teaches', mod.teaches), withoutMovedTeaching(key, 'teaches', d.teaches), `${key} teaches`);
    assert.deepEqual(withoutAddedTeaching(key, 'tests', mod.tests), d.tests, `${key} tests`);
    if (d.teaches || d.tests) n++;
  }
  // 102 lessons and guides teach, and the 11 practice sets and 11 unit exams test.
  assert.equal(n, 124);
});

// Corrections added by hand after the split (Task 10 fix round 1): reading tables that list a noun spelled like a
// verb form exclude the verb, so the noun is credited. C4: two tables before Object Pronouns that now list a la + noun
// phrase exclude the object pronoun le, so the article does not teach it.
const LE_PRONOUN = ['fr:lex:le.pronoun', 'fr:form:le.pronoun.f', 'fr:form:le.pronoun.pl', 'fr:form:le.pronoun.elided'];
const ADDED_AFTER_SPLIT = {
  '2024-01-20-prepositions': LE_PRONOUN,
  '2024-01-22-reading2': LE_PRONOUN,
  '2024-05-20-reading-8': ['fr:lex:cuisiner'],
  '2024-06-05-reading-9': ['fr:lex:cuisiner', 'fr:lex:rencontrer', 'fr:lex:sortir'],
  // C4b: Reading 7's table lists the noun étudiant, which the checker would read as the present participle of étudier
  // (a lesson teaches étudier at 85); the agreement table lists "nous sommes partis", the verb, not the noun parti.
  '2024-05-07-reading-7': ['fr:lex:etudier'],
  '2024-05-29-passe-compose-agreement': ['fr:lex:parti'],
};
// Overrides added after the split: the proper names Readings 3 and 4 use (a café, two book titles, a café and a
// square) are read as words, so each item that holds one ignores that word.
const NAME_OVERRIDES_AFTER_SPLIT = {
  '2024-02-03-reading3': ['i-cafe-de-la-paix', 'i-le-comte-de-monte', 'passage/b-bonjour-marc-tu-viens/fr',
    'passage/b-oui-je-vais-au/fr', 'passage/b-non-merci-j-ai/fr', 'passage/img-cafe/fr'],
  '2024-03-30-reading-4': ['i-les-editeurs', 'i-carrefour-de-l-odeon', 'passage/b-les-editeurs-il-est/fr', 'passage/img-cafe/fr'],
};
// Content notes settled after the split (C4b): the être-verbs gap-fill now reads "Elle n'___ pas ___".
const NOTES_SETTLED_AFTER_SPLIT = ['2024-05-31-passe-compose-etre'];

test('the committed course-map.json is the split of the course map before the split, plus later exclusions', () => {
  const { corrections } = split(COURSE_MAP);
  for (const key of NOTES_SETTLED_AFTER_SPLIT) {
    assert.ok(corrections[key]?.contentNotes?.length, `${key} had a content note at the split`);
    delete corrections[key].contentNotes;
    if (!Object.keys(corrections[key]).length) delete corrections[key];
  }
  const committed = readJson('curriculum-graph/languages/fr/course-map.json');
  for (const [key, ids] of Object.entries(ADDED_AFTER_SPLIT)) {
    assert.deepEqual(committed[key].excludeWords.filter((id) => ids.includes(id)), ids, key);
    committed[key].excludeWords = committed[key].excludeWords.filter((id) => !ids.includes(id));
    if (!committed[key].excludeWords.length) delete committed[key].excludeWords;
    if (!Object.keys(committed[key]).length) delete committed[key];
  }
  for (const [key, refs] of Object.entries(NAME_OVERRIDES_AFTER_SPLIT)) {
    for (const ref of refs) {
      assert.ok(committed[key]?.overrides?.[`${key}#${ref}`], `${key}#${ref}`);
      delete committed[key].overrides[`${key}#${ref}`];
    }
    if (!Object.keys(committed[key].overrides).length) delete committed[key].overrides;
    if (!Object.keys(committed[key]).length) delete committed[key];
  }
  assert.deepEqual(committed, corrections);
});

test('taught constructions may be the graph\u2019s regular patterns', () => {
  // The course map lists paradigms (paradigms.json) among taught constructions; they share the fr:cx: ids.
  assert.ok(graphIds().constructions.has('fr:cx:noun.plural'));
  assert.ok(graphIds().constructions.has('fr:cx:q.est-ce-que'));
  assert.ok(graphIds().words.has('fr:form:ne.elided') && graphIds().words.has('fr:lex:ne'));
  assert.ok(!graphIds().words.has('fr:cx:noun.plural'));
});

/* ---------- declarations go through the three-way merge ---------- */

const U1 = { unitKey: 'unit1', unitIndex: 1 };
const lessonSource = {
  moduleKey: '2024-01-02-test',
  title: 'Test Lesson',
  description: 'A lesson for the tests.',
  concepts: [],
  vocabularyReference: [{ french: 'je suis', english: 'I am', note: '' }],
  exerciseConfig: { type: 'custom', items: [{ instruction: 'Translate:', prompt: 'I am', expectedAnswer: 'je suis' }] },
};
const practiceSource = {
  moduleKey: '2024-01-10-test-practice',
  title: 'Practice',
  description: 'Practice set.',
  isFillInTheBlank: true,
  concepts: [],
  vocabularyReference: [],
  exercises: [],
  sentences: [{ text: 'Je  fatigué.', instruction: "Complete: 'I am tired'", blanks: [{ position: 3, answer: 'suis' }] }],
};
// A file and record as a run before Task 9 left them: teaches and tests written without a base.
const before = (old) => {
  const r = convertModule(old, U1);
  const record = structuredClone(r.record);
  delete record.fields.teaches;
  delete record.fields.tests;
  return { existing: r.mod, record };
};

test('a declaration reaches the file, and a hand edit to it survives a rerun', () => {
  const decl = { teaches: { constructions: ['fr:cx:elision'] } };
  const r1 = convertModule(lessonSource, { ...U1, ...before(lessonSource), declaration: decl });
  assert.deepEqual(r1.mod.teaches, decl.teaches);
  assert.deepEqual(r1.handFixes, {});

  // A rerun with nothing changed changes nothing.
  const again = convertModule(lessonSource, { ...U1, existing: r1.mod, record: r1.record, declaration: decl });
  assert.deepEqual(again.mod, r1.mod);
  assert.deepEqual(again.record, r1.record);

  // A changed declaration reaches a file nobody edited.
  const decl2 = { teaches: { constructions: ['fr:cx:q.est-ce-que'] } };
  assert.deepEqual(convertModule(lessonSource, { ...U1, existing: r1.mod, record: r1.record, declaration: decl2 }).mod.teaches, decl2.teaches);

  // A hand edit stays, is a hand fix, and comes back on --force.
  const edited = { ...r1.mod, teaches: { constructions: ['fr:cx:pronoun.subject'], words: ['fr:lex:ne'] } };
  const r2 = convertModule(lessonSource, { ...U1, existing: edited, record: r1.record, declaration: decl });
  assert.deepEqual(r2.mod.teaches, edited.teaches);
  assert.deepEqual(r2.handFixes.teaches, edited.teaches);
  assert.deepEqual(convertModule(lessonSource, { ...U1, handFixes: r2.handFixes, declaration: decl }).mod.teaches, edited.teaches);
});

test('a practice set’s empty tests from earlier runs take the declaration; one edited by hand stays', () => {
  const decl = { tests: { constructions: ['fr:cx:elision'] } };
  const b = before(practiceSource);
  assert.deepEqual(b.existing.tests, { constructions: [] });
  assert.deepEqual(convertModule(practiceSource, { ...U1, ...b, declaration: decl }).mod.tests, decl.tests);
  const edited = { ...b.existing, tests: { constructions: ['fr:cx:pronoun.subject'] } };
  const r = convertModule(practiceSource, { ...U1, existing: edited, record: b.record, declaration: decl });
  assert.deepEqual(r.mod.tests, edited.tests);
  assert.deepEqual(r.handFixes.tests, edited.tests);
});

test('once the course map is split, files keep what they declare', () => {
  const decl = { teaches: { constructions: ['fr:cx:elision'] } };
  const r1 = convertModule(lessonSource, { ...U1, ...before(lessonSource), declaration: decl });
  const kept = convertModule(lessonSource, { ...U1, existing: r1.mod, record: r1.record, declaration: undefined });
  assert.deepEqual(kept.mod, r1.mod);
  assert.deepEqual(kept.record, r1.record);
  assert.equal(isSplit({ a: { excludeWords: ['fr:lex:le'], overrides: { 'a#i-x': { ignore: ['fr:lex:le'] } } } }), true);
  assert.equal(isSplit(COURSE_MAP), false);
});

test('a reading’s preTeach words in its passage join its table as cards, and a rerun keeps them', () => {
  const old = configs.get('2024-01-09-reading1');
  const story = readLSources().stories.find((s) => s.unit === 1);
  const words = new Map([
    ['fr:lex:chien', { fr: 'chien', gloss: 'dog' }],
    ['fr:lex:ordinateur', { fr: 'ordinateur', gloss: 'computer' }],
  ]);
  const opts = { unitIndex: 1, declaration: { pre_teach: ['fr:lex:chien', 'fr:lex:ordinateur'] }, wordOf: (id) => words.get(id) ?? null };
  const r = readingFrom(old, story, opts);
  const card = r.mod.vocabulary.find((w) => w.fr === 'chien');
  assert.ok(card && card.gloss === 'dog' && card.word_id, 'chien is a card');
  assert.ok(!r.mod.vocabulary.some((w) => w.fr === 'ordinateur'));
  assert.deepEqual(codes(r.report.filter((l) => l.kind === 'course_map')), ['pre_teach_row', 'pre_teach_not_in_passage']);
  const again = readingFrom(old, story, { ...opts, existing: r.mod, record: r.record });
  assert.deepEqual(again.mod, r.mod);
  assert.deepEqual(again.record, r.record);
});

test('a live number the migration record places elsewhere in the source is reported, not guessed', () => {
  const key = '2024-01-01-famous-words';
  const id = LIVE_IDS[key].items[`${key}.6`];
  const records = structuredClone(RECORDS);
  records[key].items[id].ref = 'exerciseConfig.items[9]';
  const ref = `${key}#exerciseConfig.items[5]`;
  const { corrections, report } = splitCourseMap({ [key]: { overrides: { [ref]: { ignore: ['fr:lex:merci'] } } } }, course, { liveIds: LIVE_IDS, sources: configs, records });
  assert.deepEqual(corrections, {});
  assert.match(report.find((l) => l.path === ref).detail, /^no_target: live exercise .* made from exerciseConfig\.items\[9\]/);
});

/* ---------- fix round 2: a course map split before is never split again ---------- */

const CORRECTIONS = readJson('curriculum-graph/languages/fr/course-map.json');

test('teachesWords alone does not make a course map unsplit', () => {
  const withWords = structuredClone(CORRECTIONS);
  withWords['2024-01-01-famous-words'].teachesWords = ['fr:lex:bonjour'];
  assert.equal(isSplit(CORRECTIONS), true);
  assert.equal(isSplit(withWords), true);
  assert.equal(isSplit({ ...withWords, '2024-01-19-questions-help': { screen: 'src/components/QuestionsHelp.jsx' } }), false);
});

test('keys already in the id shape pass through unchanged', () => {
  const { corrections, report } = split(CORRECTIONS);
  assert.deepEqual(corrections, CORRECTIONS);
  assert.deepEqual(report.filter((l) => /^(no_item_id|no_target|text_dropped|rekeyed)/.test(l.detail)), []);
  const c = correctionsOf(CORRECTIONS, course.modules, { liveIds: LIVE_IDS, sources: configs, records: RECORDS }).counts;
  // 35 overrides, then 10 for the proper names in Readings 3 and 4 (NAME_OVERRIDES_AFTER_SPLIT), less the 2 on Units 1
  // to 3 concept examples that the examples lists replaced (plan 2026-11-27-concept-cards-structured).
  assert.deepEqual(c, { rekeyed: 0, kept: 43, dropped: 0, textDropped: 0 });
  // An old dotted path is not an id key.
  const odd = correctionsOf({ '2024-01-13-ca-survival': { overrides: { '2024-01-13-ca-survival#readingPassage.title': { ignore: ['x'] } } } }, course.modules, { liveIds: LIVE_IDS }).counts;
  assert.equal(odd.dropped, 1);
});

test('a course map with no teaching of its own is not split over files that declare teaching', () => {
  const written = [...course.modules.values()];
  const screenOnly = { ...CORRECTIONS, '2024-01-19-questions-help': { screen: 'src/components/QuestionsHelp.jsx' } };
  const declaring = written.filter((m) => m.teaches || m.tests).length;
  assert.match(resplitProblem(screenOnly, written), new RegExp(`no teachesConstructions or tests, while ${declaring} module files already declare`));
  assert.equal(resplitProblem(COURSE_MAP, written), null);
  assert.equal(resplitProblem(screenOnly, written.map((m) => ({ ...m, teaches: undefined, tests: undefined }))), null);
});

test('two places that are one place now merge every field of their overrides', () => {
  const key = '2024-01-01-famous-words';
  const id = LIVE_IDS[key].items[`${key}.6`];
  const { corrections, counts } = correctionsOf(
    { [key]: { overrides: { [`${key}#exerciseConfig.items[5]`]: { ignore: ['fr:cx:elision'], note: 'a' }, [`${key}#${id}`]: { ignore: ['fr:lex:merci'], why: 'b' } } } },
    course.modules,
    { liveIds: LIVE_IDS, sources: configs, records: RECORDS },
  );
  assert.deepEqual(corrections[key].overrides, { [`${key}#${id}`]: { ignore: ['fr:cx:elision', 'fr:lex:merci'], note: 'a', why: 'b' } });
  assert.deepEqual(counts, { rekeyed: 1, kept: 1, dropped: 0, textDropped: 0 });
});
