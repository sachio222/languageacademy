// The bundle for L's catalog release (la-bundle@1, Task 11): built from the real course, checked against L's schema
// and L's own checker (vendored in scripts/content/vendor/la-bundle), and stable under reordering and rebuilds.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCourse, readContent, CONTENT_ROOT, REPO_ROOT } from '../load.mjs';
import { assembleCourse } from '../assemble.mjs';
import { defaultCheckAnswer } from '../passable.mjs';
import { buildBundle, buildBundleWithReport, bundleHash, canonicalJson, splitBlankMistakes, ipaMismatch } from '../bundle.mjs';
import { releaseProblems } from '../release-checks.mjs';
import { loadBundleSources, frenchIpa } from '../bundle-sources.mjs';
import { runChecker, sourceCommitField, DEFAULT_OUT } from '../bundle-cli.mjs';
import { schemaValidator } from './json-schema.mjs';

const VENDOR = fileURLToPath(new URL('../vendor/la-bundle/', import.meta.url));
const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const BUILD = { source_commit: 'e059c59', built_at: '2026-11-25T00:00:00Z' };

const sources = await loadBundleSources();
const course = loadCourse();
const { bundle, report } = buildBundleWithReport(course, { ...sources, build: BUILD });
const unit1 = buildBundle(course, { ...sources, build: BUILD, units: ['unit1'] });

const contentOf = (b, key) => b.content.find((c) => c.module_key === key);
const entryOf = (b, key) => b.entries.find((e) => e.module_key === key);
const itemOf = (b, key, id) => contentOf(b, key).items.find((i) => i.item_id === id);
const sourceItem = (key, id) => course.modules.get(key).items.find((i) => i.id === id);
const tempDir = (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'la-bundle-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
};
const mtime = (f) => (existsSync(f) ? statSync(f).mtimeMs : null);

test('bundle validates against its schema', () => {
  const v = schemaValidator(join(VENDOR, 'contracts'), 'curriculum.bundle.schema.json');
  assert.deepEqual(v.validate(bundle).slice(0, 20), []);
  assert.deepEqual(v.validate(unit1).slice(0, 20), []);
  assert.equal(bundle.schema, 'la-bundle@1');
});

test("L's checker passes the full bundle and the Unit 1 sample", () => {
  for (const [name, b] of [['full', bundle], ['unit1', unit1]]) {
    const r = runChecker(b);
    assert.equal(r.error, undefined, `${name}: ${r.error}`);
    const errors = r.problems.filter((p) => p.severity === 'error');
    assert.deepEqual(errors.slice(0, 10), [], `${name}: ${errors.length} errors`);
    assert.equal(r.status, 0, name);
    assert.equal(r.ok, true, name);
  }
});

test('a checker that prints no report is an error, not a crash', (t) => {
  const dir = tempDir(t);
  for (const [name, body] of [['silent', 'import sys; sys.stderr.write("boom"); sys.exit(1)'], ['garbled', 'print("not json")']]) {
    const stub = join(dir, `${name}.py`);
    writeFileSync(stub, body + '\n');
    const r = runChecker(unit1, stub);
    assert.match(r.error, /the checker gave no report \(exit [01]\b/, name);
    if (name === 'silent') assert.match(r.error, /boom/);
  }
});

test('multi-blank mistakes that can match travel as item-level mistakes; the rest are reported', () => {
  const key = '2024-06-03-past-tense-composition';
  const k = itemOf(bundle, key, 'i-faisait-donc').answer_key;
  assert.deepEqual(k.mistakes, sourceItem(key, 'i-faisait-donc').mistakes.map(({ answer, feedback }) => ({ answer, feedback })));
  assert.ok(k.blanks.every((b) => !b.mistakes), 'an item-level mistake is not copied onto a blank');
  // "pas" is fixed sentence text, so "ai pas aimer" can never be typed into "Je n'___ pas ___".
  const aime = itemOf(bundle, '2024-05-30-passe-compose-er', 'i-ai-aime').answer_key;
  assert.equal(aime.mistakes, undefined);
  const rewrite = report.notes.filter((n) => n.code === 'mistake_needs_rewrite');
  assert.ok(rewrite.some((n) => n.detail.includes('i-ai-aime') && n.detail.includes('"ai pas aimer"')));
  // Every source mistake on a multi-blank gap-fill is emitted or reported, none both.
  const multi = [...course.modules.values()].flatMap((m) =>
    (m.items || []).filter((i) => i.type === 'gapfill' && i.blanks.length > 1 && i.mistakes?.length).map((i) => [m.module_key, i]),
  );
  const emitted = multi.reduce((n, [mk, i]) => n + (itemOf(bundle, mk, i.id).answer_key.mistakes?.length || 0), 0);
  const total = multi.reduce((n, [, i]) => n + i.mistakes.length, 0);
  assert.equal(emitted + rewrite.length, total);
  assert.equal(emitted, 14);
  // The rule on its own: one word for two blanks, the right answer itself, or a fixed word, never match.
  const { matchable, unmatchable } = splitBlankMistakes({
    text: 'Il ___ beau ___ je suis sorti',
    blanks: [{ answer: 'faisait' }, { answer: 'donc' }],
    mistakes: [
      { answer: 'a fait donc', feedback: 'f' },
      { answer: 'faisait', feedback: 'f' },
      { answer: 'Faisait donc', feedback: 'f' },
      { answer: 'faisait beau donc', feedback: 'f' },
    ],
  });
  assert.deepEqual(matchable.map((m) => m.answer), ['a fait donc']);
  assert.deepEqual(unmatchable.map((m) => m.answer), ['faisait', 'Faisait donc', 'faisait beau donc']);
});

test('IPA with English-only symbols is refused and reported with its file and line', () => {
  assert.deepEqual(frenchIpa('/ˈɜːθ ˌtəʊn/').ipa, null);
  assert.match(frenchIpa('/ˈɜːθ ˌtəʊn/').refused, /ɜ/);
  assert.deepEqual(frenchIpa('/ʒə sɥi/'), { ipa: 'ʒə sɥi', refused: null });
  for (const s of ['θ', 'ð', 'ʌ', 'æ', 'təʊ']) assert.equal(frenchIpa(s).ipa, null, s);
  assert.deepEqual(frenchIpa(''), { ipa: null, refused: null });
  // Stress marks are stripped, not refused: ˈ, ˌ and the ASCII apostrophe used as one.
  assert.deepEqual(frenchIpa('ˈɥi(t)'), { ipa: 'ɥi(t)', refused: null });
  assert.deepEqual(frenchIpa("'wi"), { ipa: 'wi', refused: null });
  assert.deepEqual(frenchIpa('ˌbɔ̃ˈʒuʀ'), { ipa: 'bɔ̃ʒuʀ', refused: null });
  assert.ok(!sources.dictionary.refused.some((r) => r.id === 'huit-fr'), 'huit is back');
  const ph = (key, wordId) => contentOf(bundle, key).phrases.find((p) => p.word_id === wordId);
  assert.equal(ph('2024-01-01-famous-words', 'oui-fr').sounds, 'wi');
  const elles = sources.dictionary.refused.find((r) => r.id === 'elles-fr');
  assert.ok(elles, 'elles carries "earth tone"');
  assert.equal(elles.file, 'src/data/dictionary/words/cambridge/pronouns.js');
  assert.equal(readFileSync(join(REPO_ROOT, elles.file), 'utf8').split('\n')[elles.line - 1].includes(elles.phonetic), true);
  // Nothing refused, and no slash, reaches a phrase.
  for (const p of bundle.content.flatMap((c) => c.phrases))
    if (p.sounds) assert.deepEqual(frenchIpa(p.sounds), { ipa: p.sounds, refused: null }, p.phrase_id);
});

test('IPA that belongs to another word is suspect and not emitted', () => {
  // va's own dictionary entry carries aller's "ale" (verbs.js:3200); livres carries demi-livre's.
  for (const [key, wordId] of [['2024-02-09-directions-navigation', 'va-fr'], ['2024-05-18-irregular-commands', 'va-fr'], ['2024-01-07-plurals', 'livres-fr']]) {
    const p = contentOf(bundle, key).phrases.find((x) => x.word_id === wordId);
    assert.equal(p.sounds, null, `${key}.${wordId}`);
    const n = report.notes.find((x) => x.code === 'ipa_suspect' && x.detail.startsWith(`${key}.${wordId}:`));
    assert.ok(n, `${key}.${wordId} is reported`);
  }
  assert.match(report.notes.find((x) => x.detail.startsWith('2024-02-09-directions-navigation.va-fr:')).detail, /verbs\.js:3200\)$/);
  // The rule on its own: the headword must be the phrase's French, and the IPA must be able to start it.
  assert.match(ipaMismatch('va', { word: 'va', ipa: 'ale' }), /cannot start/);
  assert.match(ipaMismatch('le chat', { word: 'chat', ipa: 'ʃa' }), /entry is "chat"/);
  assert.equal(ipaMismatch('Va!', { word: 'va', ipa: 'va' }), null);
  assert.equal(ipaMismatch('huit', { word: 'huit', ipa: 'ɥi(t)' }), null);
  assert.equal(ipaMismatch('être', { word: 'être', ipa: 'ɛtʀ' }), null);
  assert.equal(ipaMismatch('oui', { word: 'oui', ipa: 'wi' }), null);
  assert.equal(ipaMismatch('x', null), null);
});

test('a dirty tree gives <hash>-dirty, which passes L checker; the hash ignores the build', (t) => {
  assert.deepEqual(sourceCommitField({ commit: 'abc1234', dirty: false }), { value: 'abc1234', warning: null });
  // la-bundle@1 (L 683ae82) takes the mark, so a dirty tree is marked and nothing warns.
  const commit = 'e059c5900000000000000000000000000000abcd';
  const dirty = sourceCommitField({ commit, dirty: true });
  assert.deepEqual(dirty, { value: `${commit}-dirty`, warning: null });
  const b = buildBundle(course, { ...sources, units: ['unit1'], build: { source_commit: dirty.value, built_at: BUILD.built_at } });
  assert.equal(b.build.source_commit, `${commit}-dirty`);
  const r = runChecker(b);
  assert.equal(r.error, undefined, r.error);
  assert.deepEqual(r.problems.filter((p) => p.severity === 'error'), []);
  assert.equal(r.status, 0);
  // A schema that refuses the mark keeps the bare hash and warns.
  const schema = JSON.parse(readFileSync(join(VENDOR, 'contracts', 'curriculum.bundle.schema.json'), 'utf8'));
  schema.properties.build.properties.source_commit.pattern = '^[0-9a-f]{7,40}$';
  const file = join(tempDir(t), 'schema.json');
  writeFileSync(file, JSON.stringify(schema));
  const strict = sourceCommitField({ commit, dirty: true }, file);
  assert.equal(strict.value, commit);
  assert.match(strict.warning, /uncommitted changes/);
  // The hash names the content only.
  assert.equal(bundleHash({ ...bundle, build: { source_commit: 'fff0000', built_at: '2030-01-01T00:00:00Z' } }), bundleHash(bundle));
  const { build, ...noBuild } = bundle;
  assert.equal(bundleHash(noBuild), bundleHash(bundle));
});

test("entries match L's CatalogLesson", () => {
  const api = JSON.parse(readFileSync(join(VENDOR, 'contracts', 'curriculum.openapi.json'), 'utf8')).components.schemas;
  const computed = ['position_key', 'content_revision', 'display_number', 'minutes', 'word_count'];
  const want = new Set([...api.CatalogLesson.required.filter((k) => !computed.includes(k)), 'can_do', 'topic', 'guide_after_module_key']);
  const optional = new Set(['short_title', 'can_do_examples']);
  for (const e of bundle.entries) {
    const keys = Object.keys(e);
    for (const k of want) assert.ok(keys.includes(k), `${e.module_key} lacks ${k}`);
    for (const k of keys) assert.ok(want.has(k) || optional.has(k), `${e.module_key} has ${k}`);
    for (const k of computed) assert.ok(!(k in e), `${e.module_key} carries computed ${k}`);
  }
  // The bundle leaves out what curriculum computes, at the top level too.
  for (const k of ['steps', 'entry_words', 'minutes', 'word_count']) assert.ok(!(k in bundle), `bundle has top-level ${k}`);
});

test('access rule', () => {
  for (const e of bundle.entries)
    for (const s of e.steps) {
      const want = e.unit_key === 'unit1' || s.section_id === 'vocabulary-intro' ? 'free' : 'premium';
      assert.equal(s.access_tier, want, `${e.module_key} ${s.section_id}`);
    }
  // A guide in unit2: Premium, with its first part as the free preview.
  const guide = bundle.entries.find((e) => e.kind === 'guide' && e.unit_key === 'unit2');
  assert.ok(guide, 'a guide in unit2');
  assert.equal(guide.steps[0].section_id, 'interactive-help');
  assert.equal(guide.steps[0].access_tier, 'premium');
  const help = contentOf(bundle, guide.module_key).steps.find((s) => s.section_id === 'interactive-help');
  assert.deepEqual(help.preview, help.body.parts[0]);
  // A Unit 1 guide is free, so it carries no preview.
  const free = bundle.entries.find((e) => e.kind === 'guide' && e.unit_key === 'unit1');
  assert.equal(contentOf(bundle, free.module_key).steps[0].preview, null);
  // A reading outside Unit 1 previews its preview blocks, in passage order.
  const reading = bundle.entries.find((e) => e.kind === 'reading' && e.unit_key === 'unit2');
  const step = contentOf(bundle, reading.module_key).steps[0];
  assert.equal(step.preview.story_id, reading.story_id);
  const inPreview = step.body.passage.filter((b) => step.body.preview_blocks.includes(b.id)).map((b) => b.id);
  assert.deepEqual(step.preview.passage.map((b) => b.id), inPreview);
  assert.equal(inPreview.length, step.body.preview_blocks.length);
  assert.ok(step.preview.passage.some((b) => b.img), 'the preview shows the first picture');
});

test('step registry', () => {
  const etre = entryOf(bundle, '2024-01-02-etre');
  assert.deepEqual(etre.steps.map((s) => [s.section_id, s.ordinal, s.estimate_minutes, s.counted, s.soon, s.pass_pct]), [
    ['vocabulary-intro', 1, 2, true, false, null],
    ['pronunciation', 2, 3, true, false, null],
    ['flash-cards', 3, 2, true, false, null],
    ['speed-match', 4, 1, true, false, null],
    ['writing', 5, 2, true, false, null],
    ['conversation', 6, 4, false, true, null],
    ['lesson-exam', 7, 3, true, false, 80],
  ]);
  const one = (kind) => bundle.entries.find((e) => e.kind === kind).steps.map((s) => [s.section_id, s.estimate_minutes, s.pass_pct]);
  assert.deepEqual(one('reading'), [['reading-passage', 10, null]]);
  assert.deepEqual(one('practice'), [['practice-exercises', 5, null]]);
  assert.deepEqual(one('unit_exam'), [['exam-questions', 12, 80]]);
  // A guide's estimate is its own minutes.
  assert.equal(entryOf(bundle, '2024-01-28-verb-pattern-help').steps[0].estimate_minutes, 6);
  assert.equal(entryOf(bundle, '2024-10-21-cognates-help').guide_after_module_key, '2024-01-05-articles');
});

test('items keep one id across writing and the lesson exam', () => {
  const c = contentOf(bundle, '2024-01-02-etre');
  const ids = c.items.map((i) => i.item_id);
  assert.equal(new Set(ids).size, ids.length);
  const placed = (sid) => c.steps.find((s) => s.section_id === sid).item_ids;
  const both = placed('writing').filter((id) => placed('lesson-exam').includes(id));
  assert.ok(both.length > 0, 'an item asked in writing is asked again in the lesson exam under its own id');
  // Speed Match: one pair item from the first six words.
  const [pairId] = placed('speed-match');
  const pair = c.items.find((i) => i.item_id === pairId);
  assert.equal(pair.kind, 'pair');
  assert.equal(pair.answer_key.pairs.length, 6);
  assert.deepEqual(pair.word_ids, c.words.slice(0, 6).map((w) => w.word_id));
  // Phrases: one per word, keyed <module_key>.<word_id>, no reviewed tips.
  assert.equal(c.phrases.length, c.words.length);
  assert.equal(c.phrases[0].phrase_id, `2024-01-02-etre.${c.words[0].word_id}`);
  assert.ok(c.phrases.every((p) => p.parts.length === 0 && p.general_tip === null));
});

test('item kinds and answer keys', () => {
  const all = bundle.content.flatMap((c) => c.items.map((i) => ({ ...i, module_key: c.module_key })));
  const kinds = new Set(all.map((i) => i.kind));
  for (const k of ['typed', 'pair', 'guide_check', 'story_question', 'choice']) assert.ok(kinds.has(k), k);
  const gap = all.find((i) => i.kind === 'typed' && i.answer_key.blanks);
  assert.match(gap.prompt.text, /^\{.*_{3,}.*\}$/);
  assert.equal(gap.prompt.text.match(/_{3,}/g).length, gap.answer_key.blanks.length);
  const meaning = all.find((i) => i.kind === 'typed' && i.answer_key.language === 'en');
  assert.ok(meaning, 'a meaning item answers in English');
  const check = all.find((i) => i.kind === 'guide_check');
  assert.ok(check.choices.some((ch) => ch.choice_id === check.answer_key.correct_choice_id));
  assert.match(check.choices[0].choice_id, new RegExp(`^${check.item_id}\\.c1$`));
});

test('a respond cue is the English to say, not a scene line', () => {
  const sources = course.units.flatMap((u) => u.modules).flatMap((m) => (m.items || []).map((i) => [m.module_key, i]));
  const withCue = sources.filter(([, i]) => i.type === 'respond' && i.cue !== undefined);
  assert.ok(withCue.length > 0);
  for (const [key, src] of withCue) {
    const item = contentOf(bundle, key).items.find((i) => i.item_id === src.id);
    assert.equal(item.prompt.text, src.situation, `${key}/${src.id}`);
    assert.equal(item.prompt.en, src.cue, `${key}/${src.id}`);
    assert.ok(!('context' in item.prompt), `${key}/${src.id} has a context`);
  }
  // No item mapping writes a scene line: no source field sets one today.
  assert.ok(bundle.content.every((c) => c.items.every((i) => !('context' in i.prompt))));
});

test('bundles are written outside the site build', () => {
  // Vercel serves dist/, and a bundle holds every answer key and all Premium text: the site build never writes one,
  // and the bundles go to dist-content/, which git ignores.
  const pkg = JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts.build, 'pnpm content:validate && ./prepare-historical-css.sh');
  assert.equal(relative(REPO_ROOT, DEFAULT_OUT), join('dist-content', 'bundle.json'));
  for (const f of ['dist-content/bundle.json', 'dist-content/bundle-unit1.json'])
    assert.equal(spawnSync('git', ['check-ignore', '-q', f], { cwd: REPO_ROOT }).status, 0, `${f} is gitignored`);
  const ci = readFileSync(join(REPO_ROOT, '.github/workflows/content.yml'), 'utf8');
  for (const f of ['dist-content/bundle.json', 'dist-content/bundle-unit1.json']) assert.ok(ci.includes(`check_bundle.py ${f}`), f);
  assert.ok(!/dist\/content/.test(ci), 'CI names no bundle under dist/');
});

test('topic defaults are reported', () => {
  // An entry whose module has no topic takes its unit's name, and the report lists exactly those entries.
  const unitName = new Map(course.units.map((u) => [u.unit_key, u.name]));
  const missing = bundle.entries.filter((e) => typeof course.modules.get(e.module_key).topic !== 'string' || !course.modules.get(e.module_key).topic.trim());
  assert.deepEqual(report.topic_defaulted.map((d) => d.module_key), missing.map((e) => e.module_key));
  for (const e of bundle.entries) {
    const own = course.modules.get(e.module_key).topic;
    assert.equal(e.topic, missing.includes(e) ? unitName.get(e.unit_key) : own, e.module_key);
  }
  // A module that gains a topic keeps it and leaves the report.
  const { outlineText, files } = readContent(CONTENT_ROOT);
  const key = '2024-01-02-etre';
  const withTopic = files.map((f) => (f.file.endsWith(`/${key}.json`) ? { file: f.file, json: { ...JSON.parse(f.text), topic: 'être' } } : f));
  const r = buildBundleWithReport(assembleCourse(JSON.parse(outlineText), withTopic, { checkAnswer: defaultCheckAnswer }), { ...sources, build: BUILD });
  assert.equal(entryOf(r.bundle, key).topic, 'être');
  assert.ok(!r.report.topic_defaulted.some((d) => d.module_key === key));
  assert.equal(r.report.topic_defaulted.length, report.topic_defaulted.length - 1);
});

test('same input same hash', async () => {
  const again = buildBundle(loadCourse(), { ...(await loadBundleSources()), build: { ...BUILD, built_at: '2027-01-01T00:00:00Z' } });
  assert.equal(bundleHash(again), bundleHash(bundle));
  assert.equal(canonicalJson({ ...again, build: BUILD }), canonicalJson(bundle));
  assert.match(bundleHash(bundle), /^[0-9a-f]{64}$/);
});

test('reorder changes no key', () => {
  const { outlineText, files } = readContent(CONTENT_ROOT);
  const outline = JSON.parse(outlineText);
  const u2 = outline.units[1].entries;
  const [a, b] = [u2.indexOf('2024-01-12-demonstratives'), u2.indexOf('2024-01-13-ca-survival')];
  [u2[a], u2[b]] = [u2[b], u2[a]];
  const swapped = buildBundle(assembleCourse(outline, files, { checkAnswer: defaultCheckAnswer }), { ...sources, build: BUILD });
  const keys = (x) => ({
    modules: x.entries.map((e) => e.module_key).sort(),
    items: x.content.flatMap((c) => c.items.map((i) => `${c.module_key}/${i.item_id}`)).sort(),
    words: x.words.map((w) => w.word_id).sort(),
  });
  assert.deepEqual(keys(swapped), keys(bundle));
  const pos = (x) => Object.fromEntries(x.entries.map((e) => [e.module_key, e.position]));
  const [before, after] = [pos(bundle), pos(swapped)];
  const moved = Object.keys(before).filter((k) => before[k] !== after[k]).sort();
  assert.deepEqual(moved, ['2024-01-12-demonstratives', '2024-01-13-ca-survival']);
});

test('retired key reused', () => {
  const K = '2024-01-02-etre';
  const previous = { ...bundle, retired: [{ module_key: K, reason: 'merged', replaced_by: null }] };
  const codes = releaseProblems(bundle, previous).map((p) => [p.code, p.module_key]);
  assert.deepEqual(codes.filter(([c]) => c === 'module_key_reused'), [['module_key_reused', K]]);
  // The builder carries every key the previous bundle retired, so L's checker finds it too.
  const next = buildBundle(course, { ...sources, build: BUILD, previous });
  assert.ok(next.retired.some((r) => r.module_key === K));
});

test('release checks against a previous bundle', () => {
  assert.deepEqual(releaseProblems(bundle, null), []);
  assert.deepEqual(releaseProblems(bundle, bundle), []);
  // A published key this bundle drops without retiring it.
  const previous = structuredClone(bundle);
  previous.entries.push({ ...previous.entries[0], module_key: '2020-01-01-gone', position: 99 });
  assert.deepEqual(releaseProblems(bundle, previous).map((p) => [p.code, p.module_key]), [['module_key_missing', '2020-01-01-gone']]);
  // Same item id, a new answer that shares nothing with the old one.
  const changed = structuredClone(bundle);
  const item = contentOf(changed, '2024-01-02-etre').items.find((i) => i.answer_key.accept);
  item.answer_key.accept = ['quelque chose de nouveau'];
  assert.deepEqual(releaseProblems(changed, bundle).map((p) => [p.code, p.module_key]), [['item_id_reused', '2024-01-02-etre']]);
  // A broken access tier and a duplicate position, without a previous bundle.
  const bad = structuredClone(bundle);
  bad.entries[0].steps[1].access_tier = 'premium';
  bad.entries[1].position = bad.entries[0].position;
  const codes = new Set(releaseProblems(bad, null).map((p) => p.code));
  assert.ok(codes.has('access_rule_broken') && codes.has('position_duplicate'), [...codes].join(', '));
});

test('bundle fails on a bad module', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-content-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  const file = join(root, 'modules', '2024-01-02-etre.json');
  const m = JSON.parse(readFileSync(file, 'utf8'));
  m.surprise = 'not a field';
  writeFileSync(file, JSON.stringify(m));
  const out = join(root, 'out', 'bundle.json');
  const r = spawnSync(process.execPath, [CLI, 'bundle', '--root', root, '--out', out], { encoding: 'utf8' });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /2024-01-02-etre\.json:surprise field_unknown/);
  assert.equal(existsSync(out), false);
});

test('the CLI writes the bundle and prints its hash, size and entry count', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'la-bundle-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const out = join(dir, 'bundle.json');
  const r = spawnSync(process.execPath, [CLI, 'bundle', '--out', out], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  const written = JSON.parse(readFileSync(out, 'utf8'));
  assert.match(r.stdout, new RegExp(`^hash ${bundleHash(written)}$`, 'm'));
  assert.match(r.stdout, new RegExp(`^bytes ${readFileSync(out).length}$`, 'm'));
  assert.match(r.stdout, new RegExp(`^entries ${bundle.entries.length}\\b`, 'm'));
  // Against a previous bundle: the keys added, retired, moved and changed.
  const prev = structuredClone(written);
  prev.entries = prev.entries.filter((e) => e.module_key !== '2024-01-11-unit1-exam');
  entryOf(prev, '2024-01-02-etre').position = 40;
  const prevFile = join(dir, 'prev.json');
  writeFileSync(prevFile, JSON.stringify(prev));
  const r2 = spawnSync(process.execPath, [CLI, 'bundle', '--out', join(dir, 'b2.json'), '--previous', prevFile], { encoding: 'utf8' });
  assert.equal(r2.status, 0, r2.stderr);
  assert.match(r2.stdout, /^added 1: 2024-01-11-unit1-exam$/m);
  assert.match(r2.stdout, /^moved 1: 2024-01-02-etre$/m);
  assert.match(r2.stdout, /^retired 0$/m);
});

test('the --check run builds, checks and writes nothing', (t) => {
  const out = join(tempDir(t), 'bundle.json');
  const defaults = [DEFAULT_OUT, join(REPO_ROOT, 'dist-content', 'bundle-unit1.json')];
  const before = defaults.map(mtime);
  const r = spawnSync(process.execPath, [CLI, 'bundle', '--check', '--out', out], { encoding: 'utf8', maxBuffer: 64 << 20 });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /checker ok/);
  assert.doesNotMatch(r.stdout, /^wrote /m);
  assert.equal(existsSync(out), false, '--check wrote --out');
  assert.deepEqual(defaults.map(mtime), before, '--check touched a default bundle');
});

test('a --previous file that is not a bundle is a clean error', (t) => {
  const dir = tempDir(t);
  for (const [name, value] of [['empty', {}], ['no-content', { entries: [], shelf: { pages: [] }, retired: [] }], ['array', []]]) {
    const file = join(dir, `${name}.json`);
    writeFileSync(file, JSON.stringify(value));
    const out = join(dir, `${name}-out.json`);
    const r = spawnSync(process.execPath, [CLI, 'bundle', '--previous', file, '--out', out], { encoding: 'utf8' });
    assert.equal(r.status, 1, name);
    assert.match(r.stderr, /not a la-bundle@1 bundle \(/, name);
    assert.doesNotMatch(r.stderr, /TypeError|at .*\.mjs:/, name);
    assert.equal(existsSync(out), false, name);
  }
});
