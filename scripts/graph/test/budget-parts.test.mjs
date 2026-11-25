// The issue budget in two parts (final review triage, ledger ruling 2026-11-25): legacy (Units 1 to 12 and the shelf,
// today's counts, which can only go down) and new (Unit 13 onward, every rule at zero), so a module written in a new
// unit can never hide behind the old units' headroom.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { budgetPartOf, checkBudgetParts, BUDGET_PARTS } from '../budget.mjs';

const issue = (rule, moduleKey) => ({ rule, moduleKey, severity: 'error' });
const units = new Map([['a', 'unit3'], ['b', 'unit12'], ['c', 'unit13'], ['d', null]]);
const unitOf = (key) => units.get(key) ?? null;

test('Units 1 to 12, the shelf and course-wide issues are legacy; Unit 13 onward is new', () => {
  assert.deepEqual(BUDGET_PARTS, ['legacy', 'new']);
  assert.equal(budgetPartOf('unit1'), 'legacy');
  assert.equal(budgetPartOf('unit12'), 'legacy');
  assert.equal(budgetPartOf(null), 'legacy');
  assert.equal(budgetPartOf('unit13'), 'new');
  assert.equal(budgetPartOf('unit29'), 'new');
});

test('a new-unit issue is over budget however much headroom the legacy units have', () => {
  const budget = { legacy: { 'untaught-word': 10 }, new: {} };
  const r = checkBudgetParts([issue('untaught-word', 'a'), issue('untaught-word', 'c')], unitOf, budget);
  assert.deepEqual(r.legacy.over, []);
  assert.deepEqual(r.new.over, [{ rule: 'untaught-word', count: 1, budget: 0 }]);
  // The same issue in a legacy unit passes.
  assert.deepEqual(checkBudgetParts([issue('untaught-word', 'a'), issue('untaught-word', 'b'), issue('untaught-word', 'd')], unitOf, budget).new.over, []);
});

test('the committed budget is in two parts, the new units at zero', () => {
  const file = fileURLToPath(new URL('../../../curriculum-graph/reports/issue-budget.json', import.meta.url));
  const budget = JSON.parse(readFileSync(file, 'utf8'));
  assert.deepEqual(Object.keys(budget).sort(), ['about', 'legacy', 'new']);
  assert.deepEqual(budget.new, {});
  assert.ok(Object.values(budget.legacy).every((n) => Number.isInteger(n) && n > 0));
});
