// Smoke test on the committed French graph and course: the data must stay readable and consistent.
import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { runCheck } from '../check.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

test('the French graph validates', () => {
  assert.deepEqual(validateGraph(loadGraph(join(repoRoot, 'curriculum-graph'), 'fr')), []);
});

test('the French check has no dangling refs, unread items or unknown course-map items', async () => {
  const { issues } = await runCheck({ repoRoot, lang: 'fr' });
  const bad = issues.filter((i) => ['dangling-ref', 'unread-items', 'course-map-unknown-item', 'course-map-unknown-module'].includes(i.rule));
  assert.deepEqual(bad.map((i) => i.message), []);
});

test('the real check opens Reference words from the lookup modules only', async () => {
  const { ctx } = await runCheck({ repoRoot, lang: 'fr' });
  const open = ctx.timeline.openByReference;
  for (const id of ['fr:lex:huit', 'fr:lex:lundi', 'fr:lex:ete', 'fr:lex:rouge', 'fr:lex:noel', 'fr:lex:b', 'fr:form:vif.f']) assert.ok(open.has(id), id);
  for (const id of ['fr:lex:je', 'fr:lex:tu', 'fr:form:etre.prs.1sg', 'fr:form:etre.ptcp', 'fr:lex:le', 'fr:lex:de', 'fr:form:vivre.sbjv.1sg',
    'fr:lex:etre', 'fr:lex:avoir', 'fr:lex:voir', 'fr:lex:parler', 'fr:lex:rire', 'fr:lex:epeler']) {
    assert.ok(!open.has(id), id);
  }
  // The label set still covers every Reference module.
  assert.ok(ctx.reference.size >= open.size);
});

test('the letter y the Reference opens does not hide the pronoun y at position 25', async () => {
  const { issues } = await runCheck({ repoRoot, lang: 'fr' });
  const y = issues.filter((i) => i.rule === 'untaught-word' && i.position === 25 && i.surface.toLowerCase() === 'y');
  assert.equal(y.length, 1);
  assert.equal(y[0].nodeId, 'fr:lex:y.pronoun');
});

test('the real settings count cognates as known in typed and shown French', () => {
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), 'fr');
  assert.equal(graph.settings.cognates.allowIn, 'all');
});
