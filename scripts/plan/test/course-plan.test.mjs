// The committed plan of every language that has one: it keeps every rule, and each tool renders it. Add a language by
// adding its content/<lang>/course-plan.json; nothing here names one.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { briefsFor, templatesFor } from '../brief.mjs';
import { loadChecked } from '../cli.mjs';
import { renderMd } from '../md.mjs';
import { renderPage } from '../page.mjs';
import { PLAN_FILE, REPO_ROOT, planModules } from '../plan.mjs';

const languages = readdirSync(join(REPO_ROOT, 'content')).filter((lang) => existsSync(join(REPO_ROOT, 'content', lang, PLAN_FILE)));

test('at least one language has a course plan', () => {
  assert.ok(languages.length > 0);
});

for (const lang of languages) {
  const checked = await loadChecked({ lang });
  const { plan, problems, report, context } = checked;

  test(`${lang}: the plan keeps every rule`, () => {
    assert.deepEqual(problems.map((p) => `${p.where}: ${p.code} ${p.message}`), []);
  });

  test(`${lang}: the plan follows the written course without a gap, and every level it names is reached in time`, () => {
    const last = Math.max(...context.base.course.map((m) => m.position));
    assert.equal(report.first_position, last + 1);
    assert.equal(report.last_position, last + report.modules);
    const order = new Map(plan.units.map((u, i) => [u.unit_key, i]));
    for (const [level, by] of Object.entries(plan.levels ?? {})) {
      const got = report.levels[level];
      assert.ok(got.reached, `${level} is reached`);
      if (!got.in_written_course) assert.ok(order.get(got.unit_key) <= order.get(by), `${level} is reached by ${by}`);
    }
  });

  test(`${lang}: the report counts each planned word once`, () => {
    const words = planModules(plan).flatMap(({ module }) => module.teaches.words);
    assert.equal(new Set(words).size, words.length);
    // A written module is done and leaves the report: it counts the words the plan's open modules teach.
    const open = planModules(plan).filter(({ module }) => !context.written.has(module.module_key)).flatMap(({ module }) => module.teaches.words);
    assert.equal(report.words, open.length);
  });

  test(`${lang}: the readable plan names every unit and module`, () => {
    const md = renderMd({ ...checked, lang });
    for (const { unit, module } of planModules(plan)) {
      assert.ok(md.includes(`## ${unit.unit_key}: `), unit.unit_key);
      assert.ok(md.includes(`\`${module.module_key}\``), module.module_key);
    }
  });

  test(`${lang}: the course page gives every planned word its meaning, and carries no frequency value`, () => {
    const page = renderPage({ ...checked, lang, repoRoot: REPO_ROOT, trend: [{ unit_key: plan.units[0].unit_key, band: 'the 1,000 most common words', band_index: 0 }] });
    assert.ok(!/have no English here yet/.test(page), 'a planned word has no meaning in the graph, the pair glosses or words_to_add');
    assert.equal((page.match(/<details class="unit"/g) ?? []).length, new Set(context.base.course.map((m) => m.unitKey)).size + plan.units.length);
    assert.ok(page.includes('Common words first'));
    assert.ok(!renderPage({ ...checked, lang, repoRoot: REPO_ROOT, trend: null }).includes('Common words first'), 'no frequency file, no trend section');
  });

  test(`${lang}: a unit's briefs hold one file a module, the same on every run`, () => {
    // The first unit with modules left to write: a written module gets no brief.
    const unit = plan.units.find((u) => u.modules.filter((m) => !context.written.has(m.module_key)).length >= 2);
    const modules = unit.modules.filter((m) => !context.written.has(m.module_key));
    const make = () => briefsFor({ ...checked, lang, repoRoot: REPO_ROOT, target: unit.unit_key });
    const briefs = make();
    assert.deepEqual(briefs.map((b) => b.module_key), modules.map((m) => m.module_key));
    assert.deepEqual(briefs.map((b) => b.text), make().map((b) => b.text));
    for (const [i, b] of briefs.entries()) {
      const m = modules[i];
      for (const heading of ['## What to write', '## This module', '## The unit', '## Sizes', '## What the learner knows by now', '## Rules of every module']) assert.ok(b.text.includes(heading), `${m.module_key}: ${heading}`);
      if (m.goal) assert.ok(b.text.includes(m.goal), `${m.module_key}: its goal`);
      // One world: every brief of a unit prints the unit's cast facts, so all its writers agree (Jake, 2026-11-27).
      assert.ok(unit.setting.facts?.length, `${unit.unit_key}: the plan gives its cast facts`);
      assert.ok(b.text.includes('**Cast facts.**') && unit.setting.facts.every((f) => b.text.includes(f)), `${m.module_key}: its unit's cast facts`);
      assert.ok(templatesFor(m).length > 0);
    }
    const one = briefsFor({ ...checked, lang, repoRoot: REPO_ROOT, target: modules[1].module_key });
    assert.equal(one.length, 1);
    assert.equal(one[0].text, briefs[1].text);
    assert.throws(() => briefsFor({ ...checked, lang, repoRoot: REPO_ROOT, target: 'no-such-key' }), /no unit or planned module/);
  });

  test(`${lang}: a brief lists what earlier planned modules teach as known`, () => {
    const withWords = planModules(plan).filter(({ module }) => module.kind === 'lesson' && module.teaches.words.length);
    const [first, later] = [withWords[0], withWords.find(({ unit }) => unit.unit_key !== withWords[0].unit.unit_key)];
    if (!later) return;
    const lemma = context.lookups.headwords.get(first.module.teaches.words.find((id) => context.lookups.headwords.has(id)))?.lemma;
    const [brief] = briefsFor({ ...checked, lang, repoRoot: REPO_ROOT, target: later.module.module_key });
    const known = brief.text.slice(brief.text.indexOf('## What the learner knows by now'), brief.text.indexOf('## Rules of every module'));
    assert.ok(known.includes(`- ${first.unit.unit_key}: `) && known.includes(lemma), `${lemma} from ${first.unit.unit_key} is known by ${later.module.module_key}`);
  });
}

test('each kind of module has its method template', () => {
  const m = (kind, more = {}) => ({ kind, teaches: { words: [], constructions: [] }, ...more });
  assert.deepEqual(templatesFor(m('lesson', { teaches: { words: [], constructions: ['x'] } })), ['lesson-grammar']);
  assert.deepEqual(templatesFor(m('lesson')), ['lesson-words']);
  assert.deepEqual(templatesFor(m('guide')), ['guide']);
  assert.deepEqual(templatesFor(m('practice')), ['practice']);
  assert.deepEqual(templatesFor(m('unit_exam')), ['unit_exam']);
  assert.deepEqual(templatesFor(m('reading', { reading: { parts: [{ kind: 'story' }, { kind: 'article' }, { kind: 'story' }] } })), ['reading-story', 'reading-article']);
  for (const name of ['lesson-grammar', 'lesson-words', 'guide', 'practice', 'unit_exam', 'reading-story', 'reading-article', 'reading-exposition', 'reading-learning-alongside', 'house']) {
    assert.ok(existsSync(join(REPO_ROOT, 'scripts/plan/templates', `${name}.md`)), name);
  }
});
