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
