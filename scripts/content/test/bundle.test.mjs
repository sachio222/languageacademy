// The bundle for L's catalog release (la-bundle@1, Task 11): built from the real course, checked against L's schema
// and L's own checker (vendored in scripts/content/vendor/la-bundle), and stable under reordering and rebuilds.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCourse, readContent, CONTENT_ROOT } from '../load.mjs';
import { assembleCourse } from '../assemble.mjs';
import { defaultCheckAnswer } from '../passable.mjs';
import { buildBundle, buildBundleWithReport, bundleHash, canonicalJson } from '../bundle.mjs';
import { releaseProblems } from '../release-checks.mjs';
import { loadBundleSources } from '../bundle-sources.mjs';
import { schemaValidator } from './json-schema.mjs';

const VENDOR = fileURLToPath(new URL('../vendor/la-bundle/', import.meta.url));
const CHECKER = join(VENDOR, 'check', 'check_bundle.py');
const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const BUILD = { source_commit: 'e059c59', built_at: '2026-11-25T00:00:00Z' };

const sources = await loadBundleSources();
const course = loadCourse();
const { bundle, report } = buildBundleWithReport(course, { ...sources, build: BUILD });
const unit1 = buildBundle(course, { ...sources, build: BUILD, units: ['unit1'] });

const contentOf = (b, key) => b.content.find((c) => c.module_key === key);
const entryOf = (b, key) => b.entries.find((e) => e.module_key === key);

function runChecker(t, b) {
  const dir = mkdtempSync(join(tmpdir(), 'la-bundle-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const file = join(dir, 'bundle.json');
  writeFileSync(file, canonicalJson(b));
  const r = spawnSync('python3', [CHECKER, file, '--json'], { encoding: 'utf8', maxBuffer: 64 << 20 });
  assert.notEqual(r.status, 2, r.stderr);
  return { status: r.status, report: JSON.parse(r.stdout) };
}

test('bundle validates against its schema', () => {
  const v = schemaValidator(join(VENDOR, 'contracts'), 'curriculum.bundle.schema.json');
  assert.deepEqual(v.validate(bundle).slice(0, 20), []);
  assert.deepEqual(v.validate(unit1).slice(0, 20), []);
  assert.equal(bundle.schema, 'la-bundle@1');
});

test("L's checker passes the full bundle and the Unit 1 sample", (t) => {
  for (const [name, b] of [['full', bundle], ['unit1', unit1]]) {
    const { status, report: r } = runChecker(t, b);
    const errors = r.problems.filter((p) => p.severity === 'error');
    assert.deepEqual(errors.slice(0, 10), [], `${name}: ${errors.length} errors`);
    assert.equal(status, 0, name);
    assert.equal(r.ok, true, name);
  }
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

test('a build leaves both bundles in place', () => {
  // Vite empties dist/ on every build, so the build script writes the bundles L's adapter reads after it.
  const pkg = JSON.parse(readFileSync(fileURLToPath(new URL('../../../package.json', import.meta.url)), 'utf8'));
  assert.match(pkg.scripts.build, /prepare-historical-css\.sh && pnpm content:bundle && pnpm content:bundle --units unit1$/);
});

test('topic defaults are reported', () => {
  // No module writes a topic yet, so each entry takes its unit's name and the report lists it.
  assert.equal(report.topic_defaulted.length, bundle.entries.length);
  const e = bundle.entries[0];
  assert.equal(e.topic, course.units[0].name);
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

test('the --check run builds, checks and writes nothing', () => {
  const r = spawnSync(process.execPath, [CLI, 'bundle', '--check'], { encoding: 'utf8', maxBuffer: 64 << 20 });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /checker ok/);
});
