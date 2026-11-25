// Run with: node --test src/utils/helpUnderstanding.test.mjs (the app has no test runner; graph:test covers scripts/graph).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LEGACY_HELP_TERMS, loadUnderstoodByTerm, clearLegacyTerm, clearLegacyTerms } from './helpUnderstanding.js';

// A stand-in for the Supabase query builder over one in-memory table.
function fakeClient(rows) {
  const calls = [];
  const query = (op) => {
    const filters = [];
    const q = {
      select: () => q,
      eq: (col, v) => { filters.push((r) => String(r[col]) === String(v)); return q; },
      neq: (col, v) => { filters.push((r) => String(r[col]) !== String(v)); return q; },
      like: (col, pattern) => {
        const re = new RegExp(`^${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.')}$`);
        filters.push((r) => re.test(r[col]));
        return q;
      },
      then: (resolve) => {
        const hit = rows.filter((r) => filters.every((f) => f(r)));
        calls.push(op);
        if (op === 'delete') for (const r of hit) rows.splice(rows.indexOf(r), 1);
        resolve({ data: op === 'select' ? hit : null, error: null });
      },
    };
    return q;
  };
  return { calls, from: () => ({ select: () => query('select'), delete: () => query('delete') }) };
}

const QH = '2024-01-19-questions-help';

test('the two help screens that moved keep their term prefixes', () => {
  assert.deepEqual(LEGACY_HELP_TERMS, { [QH]: 'questions-help-', '2024-01-28-verb-pattern-help': 'verb-pattern-' });
});

test('ticks saved under an old position number and under the moduleKey both load', async () => {
  const rows = [
    { user_id: 'u1', module_key: '21', concept_index: 0, concept_term: 'questions-help-three-methods' },
    { user_id: 'u1', module_key: '20', concept_index: 1, concept_term: 'questions-help-method-1-est-ce-que' },
    { user_id: 'u1', module_key: QH, concept_index: 2, concept_term: 'questions-help-method-2-intonation' },
    // another screen's tick under the same old number, and another learner's tick, are not this screen's
    { user_id: 'u1', module_key: '21', concept_index: 3, concept_term: 'stressed-pronouns' },
    { user_id: 'u2', module_key: '21', concept_index: 4, concept_term: 'questions-help-inversion' },
  ];
  const got = await loadUnderstoodByTerm(fakeClient(rows), 'u1', 'questions-help-');
  assert.deepEqual([...got].sort(), [0, 1, 2]);
});

test('unticking removes the legacy copy of that card so it does not come back', async () => {
  const rows = [
    { user_id: 'u1', module_key: '21', concept_index: 0, concept_term: 'questions-help-three-methods' },
    { user_id: 'u1', module_key: '21', concept_index: 1, concept_term: 'questions-help-method-1-est-ce-que' },
  ];
  const client = fakeClient(rows);
  await clearLegacyTerm(client, 'u1', QH, 'questions-help-three-methods');
  assert.deepEqual(rows.map((r) => r.concept_term), ['questions-help-method-1-est-ce-que']);
  assert.deepEqual([...await loadUnderstoodByTerm(client, 'u1', 'questions-help-')], [1]);
});

test('Reset clears the old-number ticks of that screen only', async () => {
  const rows = [
    { user_id: 'u1', module_key: '21', concept_index: 0, concept_term: 'questions-help-three-methods' },
    { user_id: 'u1', module_key: '21', concept_index: 3, concept_term: 'stressed-pronouns' },
    { user_id: 'u1', module_key: '31', concept_index: 0, concept_term: 'verb-pattern-verb-groups-origins' },
  ];
  await clearLegacyTerms(fakeClient(rows), 'u1', QH);
  assert.deepEqual(rows.map((r) => r.concept_term), ['stressed-pronouns', 'verb-pattern-verb-groups-origins']);
  // a module with no legacy prefix touches nothing
  const client = fakeClient(rows);
  await clearLegacyTerms(client, 'u1', '2026-11-24-negation-guide');
  assert.deepEqual(client.calls, []);
});
