import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { buildFormIndex, lookupToken } from '../fr/forms.mjs';
import { tokenize } from '../fr/tokenize.mjs';
import { matchPattern } from '../fr/detect.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const graph = loadGraph(join(here, '..', '..', '..', 'curriculum-graph'), 'fr');
const index = buildFormIndex(graph);

function matches(detect, text) {
  const tokens = tokenize(text, { isWord: (f) => index.has(f) });
  const readings = tokens.map((t) => lookupToken(index, t));
  return matchPattern(tokens, readings, detect);
}

test('construction examples', async (t) => {
  for (const c of graph.constructions.filter((x) => x.detect)) {
    await t.test(c.id, () => {
      for (const s of c.examples.match) assert.equal(matches(c.detect, s), true, `should match: ${s}`);
      for (const s of c.examples.noMatch ?? []) assert.equal(matches(c.detect, s), false, `should not match: ${s}`);
    });
  }
});
