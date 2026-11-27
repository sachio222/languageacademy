// One projection for the brief and the unit card (unit-prep plan Task 3): a course plan stub counted as written from
// its plan block, and the forms of known words that need a gloss.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { glossableForms, graphLookups, projectContext } from '../projection.mjs';
import { miniCourse, checkMini } from './content-helpers.mjs';

const STUB = {
  schema: 'la-module@1', module_key: 'stub-avoir', kind: 'lesson', status: 'planned', title: 'avoir',
  plan: { words: ['fr:lex:avoir'], constructions: ['fr:cx:neg.ne-pas'], source: 'plan.json' },
};

const withStub = () => miniCourse((modules, outline) => {
  modules.set(STUB.module_key, structuredClone(STUB));
  outline.units[2].entries.push(STUB.module_key);
});

const stubsOf = (content) => content.units.flatMap((u) => u.modules.filter((m) => m.status === 'planned').map((m) => ({
  module_key: m.module_key, kind: m.kind, title: m.title, position: m.position, unit_key: u.unit_key, unit_index: u.index, unit_name: u.name, plan: m.plan,
})));

test('projection: a stub counted from its plan teaches its words and constructions at its position', async () => {
  const content = withStub();
  const { ctx } = await checkMini(content);
  const stubs = stubsOf(content);
  assert.equal(stubs.length, 1);
  const projected = projectContext(ctx, stubs);
  assert.notEqual(projected, ctx);
  assert.ok(projected.timeline.taughtAt.get('fr:lex:avoir') <= stubs[0].position);
  assert.equal(projected.timeline.taughtAt.get('fr:cx:neg.ne-pas') <= stubs[0].position, true);
  assert.ok(projected.course.some((m) => m.moduleKey === STUB.module_key && m.items.length === 0));
  assert.equal(projectContext(ctx, []), ctx, 'no stubs, no change');
});

test('glossableForms lists a form of a taught verb the checker does not credit', async () => {
  const { ctx } = await checkMini(miniCourse());
  const g = graphLookups(ctx);
  assert.ok(g.headwords.has('fr:lex:etre'));
  const last = Math.max(...ctx.course.map((m) => m.position));
  const forms = glossableForms(ctx, last + 1, 'lesson', { words: [], constructions: [] });
  const etre = forms.find((f) => f.word === 'fr:lex:etre');
  assert.ok(etre, 'être is taught in the mini course, so its other forms are glossable');
  assert.equal(etre.lemma, 'être');
  assert.ok(etre.forms.includes('étais'), 'the imperfect is not credited by the present lesson');
  assert.ok(!etre.forms.includes('suis'), 'a taught form is credited, so it needs no gloss');
});
