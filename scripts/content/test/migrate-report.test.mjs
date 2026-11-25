// Task 7: live ids with no converted item are grouped by reason in the migration report, real misses first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderReport } from '../migrate/report.mjs';

const line = (module_key, path, reason, detail) => ({ module_key, path, kind: 'live_unmatched', reason, detail });

test('live ids with no converted item are grouped by reason, real misses first', () => {
  const md = renderReport(
    [
      line('2024-04-01-alphabet', '2024-04-01-alphabet.1', 'reference_words', 'exercise "A (letter)" → "a"'),
      line('2024-04-01-alphabet', '2024-04-01-alphabet.2', 'reference_words', 'exercise "B (letter)" → "b"'),
      line('2024-01-10-unit1-practice', 'concepts[0]', 'no_concepts', 'concept "Practice"'),
      line('2024-01-02-etre', '2024-01-02-etre.4', 'miss', 'exercise "I am" → "je suis"'),
    ],
    { modules: 1, items: 1, held: 0 },
  );
  const section = md.split('## Live ids with no converted item')[1].split('\n## ')[0];
  const at = (s) => section.indexOf(s);
  assert.ok(at('### Real misses') !== -1 && at('### Real misses') < at('### Reference word lists') && at('### Reference word lists') < at('### Concept cards'), section);
  assert.match(section, /2024-01-02-etre\.4. exercise "I am" → "je suis"/);
  // Expected lines are counted per module, not listed one by one.
  assert.match(section, /\*\*2024-04-01-alphabet\*\*: 2 exercises/);
  assert.match(md, /\| Live ids with no converted item \| 4 \(1 real miss\) \|/);
});
