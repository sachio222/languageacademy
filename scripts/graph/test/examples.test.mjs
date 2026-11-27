import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { buildFormIndex, lookupToken } from '../fr/forms.mjs';
import { tokenize } from '../fr/tokenize.mjs';
import { matchPattern } from '../detect.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const graph = loadGraph(join(here, '..', '..', '..', 'curriculum-graph'), 'fr');
const index = buildFormIndex(graph);

function matches(detect, text) {
  const tokens = tokenize(text, { isWord: (f) => index.has(f) });
  const readings = tokens.map((t) => lookupToken(index, t));
  return matchPattern(tokens, readings, detect, graph.names);
}

test('construction examples', async (t) => {
  for (const c of graph.constructions.filter((x) => x.detect)) {
    await t.test(c.id, () => {
      for (const s of c.examples.match) assert.equal(matches(c.detect, s), true, `should match: ${s}`);
      for (const s of c.examples.noMatch ?? []) assert.equal(matches(c.detect, s), false, `should not match: ${s}`);
    });
  }
});

// The frames a lesson teaches and the method check counts (2026-11-27) need a detector, so the checker can see
// whether a written lesson uses them.
test('the verb and adjective frames and celui have detectors', () => {
  const ids = ['frame.verb-infinitive', 'frame.verb-de-infinitive', 'frame.verb-a-infinitive', 'frame.saying-que-clause',
    'frame.il-est-adjective-de-infinitive', 'demonstrative.pronoun'].map((k) => `fr:cx:${k}`);
  for (const id of ids) assert.ok(graph.constructions.find((c) => c.id === id)?.detect, `${id} has no detector`);
});
