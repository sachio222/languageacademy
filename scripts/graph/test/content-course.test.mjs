// readCourseFromContent: the checker reads the loaded content course (scripts/content) in the shape readCourse gives.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readModule } from '../fr/live-course.mjs';
import { readCourseFromContent } from '../content-course.mjs';
import { runCheck } from '../check.mjs';
import { miniCourse, checkMini, ofRule, repoRoot } from './content-helpers.mjs';

const typeOf = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v);
// A field readCourse leaves null when there is nothing to say may hold a string here, and the other way round.
const sameType = (a, b) => typeOf(a) === typeOf(b) || (['null', 'string'].includes(typeOf(a)) && ['null', 'string'].includes(typeOf(b)));

// One module in today's shape, with an item, a hint and a concept card, read the way readCourse reads each module.
const legacy = readModule({
  moduleKey: 'legacy', title: 'Être', description: 'Say {who} you are',
  concepts: [{ term: 'être', definition: 'to be', example: 'je suis' }],
  vocabularyReference: [{ french: 'je suis', english: 'I am', note: 'first person' }],
  exerciseConfig: { items: [{ instruction: 'Say it', prompt: 'I am', expectedAnswer: 'je suis', acceptableAnswers: ['Je suis'], hint: "use 'je'" }] },
}, 1, 1, 'Unit 1', { unitDescription: 'Essentials' });

test('same shape as readCourse', () => {
  const course = readCourseFromContent(miniCourse());
  const lesson = course.find((m) => m.moduleKey === '2024-01-02-etre');
  for (const [k, v] of Object.entries(legacy)) {
    assert.ok(k in lesson, `module key ${k}`);
    assert.ok(sameType(v, lesson[k]), `module key ${k}: ${typeOf(v)} here, ${typeOf(lesson[k])} from content`);
  }
  const want = legacy.items.find((it) => it.source === 'items');
  for (const m of course) {
    assert.deepEqual(m.unreadShapes, [], m.moduleKey);
    assert.deepEqual(m.blankProblems, [], m.moduleKey);
    for (const it of m.items) {
      for (const [k, v] of Object.entries(want)) {
        assert.ok(k in it, `${it.ref}: item key ${k}`);
        assert.ok(sameType(v, it[k]), `${it.ref}: item key ${k}`);
      }
      assert.ok(it.ref.startsWith(`${m.moduleKey}#`), it.ref);
    }
  }
  // Kinds as readCourse names them; positions follow the outline across units.
  assert.deepEqual(course.map((m) => [m.position, m.kind, m.unitId]), [
    [1, 'lesson', 1], [2, 'reading', 1], [3, 'help', 2], [4, 'practice', 2], [5, 'exam', 3],
  ]);
  assert.equal(course[2].guide, true);
  assert.equal(lesson.unitTitle, 'Essentials');
  assert.deepEqual(lesson.vocab, ['je suis', 'tu es', 'il est', 'elle est', 'nous sommes', 'vous êtes']);
});

test('item roles come from the item type', () => {
  const course = readCourseFromContent(miniCourse());
  const items = new Map(course.flatMap((m) => m.items.map((it) => [it.ref, it])));
  const at = (ref) => items.get(ref) ?? assert.fail(`no item ${ref}`);
  // translate: the answer is typed French, the English prompt is not French
  assert.deepEqual(at('2024-01-02-etre#i-je-suis').french, ['je suis']);
  assert.deepEqual(at('2024-01-02-etre#i-je-suis').shown, []);
  assert.equal(at('2024-01-02-etre#i-je-suis').type, 'translate');
  // respond: accept is lenient; the hint is its own ref
  assert.deepEqual(at('2024-01-02-etre#i-paul').lenient, ['Je suis Paul.']);
  assert.deepEqual(at('2024-01-02-etre#i-paul/hint').shown, ['je suis']);
  assert.equal(at('2024-01-02-etre#i-paul/hint').source, 'hint');
  // gapfill: the filled sentence, with the blank answers typed
  assert.deepEqual(at('2024-01-02-etre#i-tu-es').french, ['Tu es Paul ?']);
  assert.deepEqual(at('2024-01-02-etre#i-tu-es').blankAnswers, ['es']);
  assert.deepEqual(at('practice-etre#p-nous-vous').french, ['Nous sommes là et vous êtes ici.']);
  // meaning: the French is shown and the English answer is not French
  assert.deepEqual(at('2024-01-02-etre#i-il-est').shown, ['il est']);
  assert.deepEqual(at('2024-01-02-etre#i-il-est').french, []);
  // transform: the instruction's span is read apart from the item
  assert.deepEqual(at('2024-01-02-etre#i-plural').shown, ['je suis']);
  assert.deepEqual(at('2024-01-02-etre#i-plural/instruction').shown, ['nous']);
  // choice: French options are shown
  assert.deepEqual(at('2024-01-02-etre#i-which').shown, ['tu es', 'il est']);
  // mistakes: the wrong answer is never read; its feedback is
  assert.deepEqual(at('2024-01-02-etre#i-je-suis/mistakes/0/feedback').shown, ['je', 'suis']);
  assert.ok(![...items.values()].some((it) => [...it.french, ...it.shown, ...it.lenient].includes('je es')));
  // module texts: concept cards, tables, phrases, notes and the passage
  assert.deepEqual(at('2024-01-02-etre#concepts/c-etre-forms/examples/0/fr').shown, ['Je suis Paul.']);
  assert.deepEqual(at('2024-01-02-etre#tables/t-etre-present/rows/2/fr').shown, ['il est']);
  assert.deepEqual(at('2024-01-02-etre#vocabulary/je-suis-fr/example_fr').shown, ['Je suis Paul.']);
  assert.ok(items.has('2024-01-02-etre#vocabulary/tu-es-fr/note'));
  assert.deepEqual(at('reading-cafe#passage/b3/fr').shown, ['Je suis au café.']);
  assert.deepEqual(at('reading-cafe#q-where').shown, ['au café', 'à la gare']);
});

test('role from type', async () => {
  const course = miniCourse((modules) => {
    modules.get('practice-etre').items.push(
      { id: 'p-translate-word', type: 'transform', instruction: 'Translate this into the plural.', shown: 'je suis', answer: 'nous sommes' },
    );
    const exam = modules.get('exam-places');
    exam.items.push({ id: 'e-framed', type: 'respond', situation: 'Translate: I am at the café.', answer: 'je suis au café' });
    exam.items.push({ id: 'e-bare', type: 'translate', prompt: 'We are here.', answer: 'nous sommes là' });
  });
  const { issues } = await checkMini(course);
  const refs = ofRule(issues, 'translate-item').map((i) => i.itemRef);
  assert.ok(!refs.includes('exam-places#e-framed'), 'a respond item is never a translation, whatever its wording');
  assert.ok(!refs.includes('practice-etre#p-translate-word'));
  assert.ok(refs.includes('exam-places#e-bare'), 'a translate item outside Unit 1 is');
  assert.ok(!refs.some((r) => r.startsWith('2024-01-02-etre#')), 'Unit 1 may translate');
});

test('reading table teaches', async () => {
  const { ctx, issues } = await runCheck({ repoRoot, lang: 'fr' });
  const r6 = ctx.course.find((m) => m.moduleKey === '2024-04-24-reading-6');
  assert.equal(r6.kind, 'reading');
  // semaine: no lesson teaches it before Reading 6, whose table does (beaucoup was the example until Survival
  // Phrases taught it for merci beaucoup, C4)
  assert.equal(ctx.timeline.taughtAt.get('fr:lex:semaine'), r6.position);
  assert.ok(!issues.some((i) => i.rule === 'untaught-word' && i.moduleKey === r6.moduleKey && i.nodeId === 'fr:lex:semaine'));

  // In the mini reading: vélo is in the passage, in no table and taught nowhere earlier; chat is in the table.
  const mini = miniCourse((modules) => {
    const r = modules.get('reading-cafe');
    r.passage.push({ id: 'b4', fr: 'Paul a un chat et un vélo.', en: 'Paul has a cat and a bike.' });
    r.vocabulary.push({ word_id: 'chat-fr', fr: 'un chat', gloss: 'a cat' }, { word_id: 'avoir-fr', fr: 'a', gloss: 'has' }, { word_id: 'et-fr', fr: 'et', gloss: 'and' });
  });
  const { issues: mi } = await checkMini(mini);
  const words = ofRule(mi, 'untaught-word').filter((i) => i.moduleKey === 'reading-cafe').map((i) => i.surface);
  assert.ok(words.includes('vélo'), words.join(', '));
  assert.ok(!words.includes('chat'), words.join(', '));
});

test('French prompts are checked: shown French and respond situation spans; hints are outside the taught-before rule', async () => {
  const course = miniCourse((modules) => {
    const l = modules.get('2024-01-02-etre');
    l.items.push({ id: 'i-span', type: 'respond', situation: 'Someone says {merci}. Say you are Paul.', answer: 'je suis Paul', hint: 'Not {pardon}.' });
    l.items.push({ id: 'i-shown', type: 'meaning', shown: 'bonsoir', answer: 'good evening' });
  });
  const { issues } = await checkMini(course);
  const untaught = ofRule(issues, 'untaught-word').filter((i) => i.moduleKey === '2024-01-02-etre');
  assert.ok(untaught.some((i) => i.surface === 'merci' && i.itemRef === '2024-01-02-etre#i-span'), 'situation span');
  assert.ok(untaught.some((i) => i.surface === 'bonsoir' && i.itemRef === '2024-01-02-etre#i-shown'), 'shown French');
  assert.ok(!untaught.some((i) => i.surface === 'pardon'), 'a hint stays outside the rule');
});

test('{name} in a unit can-do example is the learner name, never an untaught word', async () => {
  const { issues } = await checkMini(miniCourse());
  assert.ok(!issues.some((i) => i.rule === 'untaught-word' && /name/i.test(i.surface ?? '')));
  assert.ok(!issues.some((i) => i.rule === 'unknown-word' && /name/i.test(i.surface ?? '')));
});

test('corrections follow item ids', async () => {
  const untaughtIn = (issues, ref) => ofRule(issues, 'untaught-word').filter((i) => i.itemRef === ref && i.surface === 'merci');
  const ref = '2024-01-02-etre#i-merci';
  const corrections = { '2024-01-02-etre': { overrides: { [ref]: { ignore: ['merci'] } } } };
  const course = (atEnd) => miniCourse((modules) => {
    const items = modules.get('2024-01-02-etre').items;
    const item = { id: 'i-merci', type: 'respond', situation: 'Someone helps you. Thank them.', answer: 'merci' };
    if (atEnd) items.push(item);
    else items.unshift(item);
  });
  // Without the override the word is reported, so the override is what silences it.
  assert.equal(untaughtIn((await checkMini(course(false))).issues, ref).length, 1);
  for (const atEnd of [false, true]) {
    const { issues } = await checkMini(course(atEnd), { corrections });
    assert.deepEqual(untaughtIn(issues, ref), [], atEnd ? 'moved to the end' : 'first');
    assert.deepEqual(ofRule(issues, 'course-map-unknown-item'), []);
  }
  // An override whose item is gone is reported.
  const { issues } = await checkMini(miniCourse(), { corrections });
  assert.deepEqual(ofRule(issues, 'course-map-unknown-item').map((i) => i.itemRef), [ref]);
});

test('every committed override names a ref of its module', async () => {
  const corrections = JSON.parse(readFileSync(join(repoRoot, 'curriculum-graph/languages/fr/course-map.json'), 'utf8'));
  const keys = Object.values(corrections).flatMap((e) => Object.keys(e.overrides ?? {}));
  // 35, then 10 for the proper names Readings 3 and 4 use (Café de la Paix, Le Comte de Monte-Cristo, Vingt mille
  // lieues sous les mers, Les Éditeurs, carrefour de l'Odéon), which the checker reads as words, less the 2 on Units 1 to
  // 3 concept examples (être, stressed pronouns) that the examples lists replaced: their words are gone from the card.
  // Survival Phrases' polite-request card: its one override on the old string is now on the two examples with je voudrais.
  // The Unit 1 greetings card's s'il vous plaît carries the override its item has. Irregular Commands' two overrides
  // on its old strings are gone: the examples with y that replaced them need none.
  assert.equal(keys.length, 43);
  const { ctx, issues } = await runCheck({ repoRoot, lang: 'fr' });
  const refs = new Set(ctx.course.flatMap((m) => m.items.map((it) => it.ref)));
  assert.deepEqual(keys.filter((k) => !refs.has(k)), []);
  assert.deepEqual(ofRule(issues, 'course-map-unknown-item'), []);
});

test('the committed course map holds corrections only', () => {
  const corrections = JSON.parse(readFileSync(join(repoRoot, 'curriculum-graph/languages/fr/course-map.json'), 'utf8'));
  const fields = new Set(Object.values(corrections).flatMap((e) => Object.keys(e)));
  for (const f of fields) assert.ok(['excludeWords', 'overrides', 'itemKinds', 'contentNotes'].includes(f), f);
});

test('guide block cells: French cells are shown French, sound cells are neither', () => {
  const course = readCourseFromContent(miniCourse((modules) => {
    const g = modules.get('questions-help');
    g.parts[0].blocks.push(
      { pairs: [['les amis', 'the friends', 'lay za-mee']] },
      { cmp: { left: 'No link', right: 'A link', rows: [[{ fr: 'ils sont', say: 'ils sont', en: 'they are' }, { fr: 'ils ont', en: 'they have', sub: '{ont} starts with a vowel' }]] } },
    );
  }));
  const g = course.find((m) => m.moduleKey === 'questions-help');
  const shown = new Map(g.items.map((it) => [it.ref, it.shown]));
  const p = 'questions-help#parts/p-three-ways-to-ask/blocks';
  assert.deepEqual(shown.get(`${p}/1/pairs/0/0`), ['les amis']);
  assert.deepEqual(shown.get(`${p}/1/pairs/0/1`) ?? [], []);
  assert.deepEqual(shown.get(`${p}/1/pairs/0/2`) ?? [], [], 'the sound respelling is not French');
  assert.deepEqual(shown.get(`${p}/2/cmp/rows/0/0/say`), ['ils sont']);
  assert.deepEqual(shown.get(`${p}/2/cmp/rows/0/1/sub`), ['ont']);
  assert.deepEqual(shown.get(`${p}/0/ways/0/fr`), ['Est-ce que']);
});

test('every learner-facing string of the real course has a ref, and only deliberate ones are left out', async () => {
  const { loadCourse } = await import('../../content/load.mjs');
  const { moduleTexts } = await import('../../content/schema/module.mjs');
  const { refPath, blockCellRole } = await import('../content-course.mjs');
  const loaded = loadCourse();
  const refs = new Set(readCourseFromContent(loaded).flatMap((m) => m.items.map((it) => it.ref)));
  const left = new Map();
  for (const unit of loaded.units) {
    for (const mod of unit.modules) {
      for (const t of moduleTexts(mod)) {
        // An item's fields sit on the item's own ref; a mistake's answer is deliberately wrong and never read.
        const ref = t.path.startsWith('items[')
          ? `${mod.module_key}#${refPath(mod, t.path.replace(/\.(answer|accept\[\d+\]|prompt|situation|cue|question|shown|text|options\[\d+\]\.text|blanks\[\d+\]\..*)$/, ''))}`
          : `${mod.module_key}#${refPath(mod, t.path)}`;
        if (refs.has(ref) || /\.mistakes\[\d+\]\.answer$/.test(t.path)) continue;
        const why = mod.status === 'planned' ? 'planned stub (not written, so not read)'
          : /^vocabulary\[\d+\]\.fr$/.test(t.path) ? 'vocabulary word (taught)'
          : /^vocabulary\[\d+\]\.info_card\./.test(t.path) ? 'info card (native)'
            : /^glossary\[/.test(t.path) ? 'glossary (pop-up source)'
            : /^glosses\[/.test(t.path) ? 'gloss (pop-up source; it covers forms in the module\'s French)'
              : /^checks\[\d+\]\.sound$/.test(t.path) ? 'check sound (respelling)'
                : t.role === 'block' && blockCellRole(t.path) === 'none' ? 'block cell, neither French nor native'
                  : `UNREAD ${t.path}`;
        left.set(why, (left.get(why) ?? 0) + 1);
      }
    }
  }
  assert.deepEqual([...left.keys()].filter((k) => k.startsWith('UNREAD')), []);
});

test('a course map field that is not a correction is kept for the migration and reported by graph:check', async () => {
  const { mkdtempSync, cpSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { loadGraph } = await import('../load.mjs');
  const dir = mkdtempSync(join(tmpdir(), 'la-graph-'));
  try {
    cpSync(join(repoRoot, 'scripts/graph/test/fixtures/graph-mini'), dir, { recursive: true });
    writeFileSync(join(dir, 'languages/fr/course-map.json'), JSON.stringify({
      a: { teachesConstructions: ['fr:cx:x'], excludeWords: ['fr:lex:je'], overrides: { 'a#i-1': { ignore: ['je'] }, 'b#i-2': { ignore: ['tu'] } } },
    }));
    const graph = loadGraph(dir, 'fr');
    assert.deepEqual(graph.corrections, { a: { excludeWords: ['fr:lex:je'], overrides: { 'a#i-1': { ignore: ['je'] } } } });
    assert.deepEqual(graph.courseMap.a.teachesConstructions, ['fr:cx:x'], 'the file is kept whole');
    assert.equal(graph.courseMapProblems.length, 2);
    assert.match(graph.courseMapProblems[0].message, /teachesConstructions is not a correction/);
    assert.match(graph.courseMapProblems[1].message, /b#i-2 must start with "a#"/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  const { issues } = await runCheck({ repoRoot, lang: 'fr' });
  assert.deepEqual(ofRule(issues, 'course-map-field'), []);
});

test('the Reference pages that open come from the outline shelf, and settings name the same ones', async () => {
  const { issues: real } = await runCheck({ repoRoot, lang: 'fr' });
  assert.deepEqual(ofRule(real, 'reference-modules-differ'), []);
  const { ctx, issues } = await checkMini(miniCourse());
  assert.equal(ofRule(issues, 'reference-modules-differ').length, 1, 'the mini shelf opens the alphabet only');
  assert.deepEqual(ctx.referenceOpenTitles.length, 1);
});

test('French in a vocabulary note is checked', async () => {
  const course = miniCourse((modules) => {
    modules.get('2024-01-02-etre').vocabulary.push({ word_id: 'je-suis-la-fr', fr: 'je suis là', gloss: 'I am here', note: 'Answer {merci} with this.' });
  });
  const { issues } = await checkMini(course);
  const hit = ofRule(issues, 'untaught-word').filter((i) => i.surface === 'merci');
  assert.deepEqual(hit.map((i) => i.itemRef), ['2024-01-02-etre#vocabulary/je-suis-la-fr/note']);
});

test('each committed override on a vocabulary note silences a real issue', async () => {
  const corrections = JSON.parse(readFileSync(join(repoRoot, 'curriculum-graph/languages/fr/course-map.json'), 'utf8'));
  const refs = Object.entries(corrections).flatMap(([k, e]) => Object.keys(e.overrides ?? {}).filter((r) => r.endsWith('/note')).map((r) => [k, r]));
  assert.equal(refs.length, 3);
  const { ctx } = await runCheck({ repoRoot, lang: 'fr' });
  for (const [key, ref] of refs) {
    const without = structuredClone(corrections);
    delete without[key].overrides[ref];
    const { issues } = await runCheck({ repoRoot, lang: 'fr', corrections: without, dictionaryForms: ctx.dictionaryForms });
    assert.ok(issues.some((i) => i.itemRef === ref && i.rule.startsWith('untaught-')), `${ref} silences nothing`);
  }
});

test('a unit can-do example is read: a planted untaught word in it is reported', async () => {
  const course = miniCourse((modules, outline) => {
    outline.units[0].can_do_example_fr = 'Je suis {name}. Merci !';
  });
  const { ctx, issues } = await checkMini(course);
  const ref = 'reading-cafe#unit/can_do_example_fr';
  assert.deepEqual(ctx.course.flatMap((m) => m.items).find((it) => it.ref === ref)?.shown, ['Je suis Paul. Merci !']);
  const hits = ofRule(issues, 'untaught-word').filter((i) => i.itemRef === ref).map((i) => i.surface);
  assert.deepEqual(hits, ['Merci']);
});

test('a unit can-do line and description are read for their spans at the unit\'s last module', () => {
  const course = readCourseFromContent(miniCourse((modules, outline) => {
    outline.units[0].can_do = 'say who you are and join ideas with {et}';
  }));
  const items = new Map(course.flatMap((m) => m.items.map((it) => [it.ref, it])));
  assert.deepEqual(items.get('reading-cafe#unit/can_do').shown, ['et']);
  assert.equal(items.get('reading-cafe#unit/can_do').source, 'unit-can-do');
  assert.ok(items.has('reading-cafe#unit/description'));
});

// A planned module (status planned, a course plan stub) is not written yet: the checker reads the written course only,
// so a stub teaches and tests nothing, its title's level label claims nothing, and its place does not lengthen the
// course the reuse windows run over (plan Task 17).
const plantStubs = (modules, outline) => {
  const stub = (key, title) => ({
    schema: 'la-module@1', module_key: key, kind: 'lesson', status: 'planned', title,
    teaches: { constructions: ['fr:cx:q.est-ce-que'], words: ['fr:lex:merci'] },
    plan: { words: ['fr:lex:merci'], constructions: ['fr:cx:q.est-ce-que'], source: 'plan.json' },
  });
  modules.set('2024-01-09-planned', stub('2024-01-09-planned', 'Planned (B1)'));
  outline.units[2].entries.push('2024-01-09-planned');
  for (let i = 1; i <= 40; i++) modules.set(`later-${i}`, stub(`later-${i}`, `Later (B1)`));
  outline.units.push({ unit_key: 'unit4', name: 'Later', entries: Array.from({ length: 40 }, (_, i) => `later-${i + 1}`) });
};

test('a planned module is not read: it teaches and tests nothing, and the unit lines stay on its last written module', () => {
  const course = readCourseFromContent(miniCourse(plantStubs));
  assert.equal(course.some((m) => m.moduleKey === '2024-01-09-planned' || m.moduleKey.startsWith('later-')), false);
  const items = new Map(course.flatMap((m) => m.items.map((it) => [it.ref, it])));
  assert.ok(items.has('exam-places#unit/can_do'), "unit3's can-do line is read at its last written module");
});

test('planned modules change no checker count', async () => {
  const a = await checkMini(miniCourse());
  const b = await checkMini(miniCourse(plantStubs));
  const byRule = (issues) => issues.reduce((o, i) => ({ ...o, [i.rule]: (o[i.rule] ?? 0) + 1 }), {});
  assert.deepEqual(byRule(b.issues), byRule(a.issues));
  assert.deepEqual(b.stats, a.stats);
});

test('a reading table that lists a noun spelled like a verb form credits the noun once the verb is excluded', async () => {
  const { ctx } = await runCheck({ repoRoot, lang: 'fr' });
  const r9 = ctx.graph.courseMap['2024-06-05-reading-9'].teachesWords;
  for (const id of ['fr:lex:cuisine', 'fr:lex:rencontre', 'fr:lex:sortie']) assert.ok(r9.includes(id), id);
  for (const id of ['fr:lex:cuisiner', 'fr:lex:rencontrer', 'fr:form:sortir.ptcp.f']) assert.ok(!r9.includes(id), id);
  assert.ok(ctx.graph.courseMap['2024-05-20-reading-8'].teachesWords.includes('fr:lex:cuisine'));
});

test("a lesson's conjugation teaches each person's form, the way a table row does", async () => {
  const { conjugationForms } = await import('../content-course.mjs');
  assert.deepEqual(
    conjugationForms({
      rows: [
        { person: 'je', form: 'veux' },
        { person: "j'", form: 'ouvre' },
        { person: 'il/elle/on', form: 'veut' },
        { person: 'ils/elles', form: 'veulent' },
      ],
    }),
    ['je veux', "j'ouvre", 'il veut', 'elle veut', 'on veut', 'ils veulent', 'elles veulent'],
  );
  assert.deepEqual(conjugationForms(undefined), []);
});
