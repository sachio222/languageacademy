// The issue budget (curriculum-graph/reports/issue-budget.json): the most issues of each rule the course may have.
// `graph:check --budget` fails when any rule's count rises above its budget, so counts can only go down; a rule the
// budget does not name has a budget of 0. `--lower-budget` writes each lower count back, never a higher one.
import { existsSync, readFileSync } from 'node:fs';
import { writeSortedJson } from './write-json.mjs';

const byName = (a, b) => (a.rule < b.rule ? -1 : a.rule > b.rule ? 1 : 0);

// byRule: { rule: count } from summarize. Returns { over, under }, each [{ rule, count, budget }] sorted by rule.
export function compareBudget(byRule, budget) {
  const over = [];
  const under = [];
  for (const rule of new Set([...Object.keys(byRule), ...Object.keys(budget)])) {
    const count = byRule[rule] ?? 0;
    const limit = budget[rule] ?? 0;
    if (count > limit) over.push({ rule, count, budget: limit });
    else if (count < limit) under.push({ rule, count, budget: limit });
  }
  return { over: over.sort(byName), under: under.sort(byName) };
}

export function readBudget(file) {
  if (!existsSync(file)) throw new Error(`${file} is missing`);
  return JSON.parse(readFileSync(file, 'utf8'));
}

// The budget with every count that fell written down, and every rule at 0 dropped.
export function lowered(byRule, budget) {
  const out = {};
  for (const [rule, limit] of Object.entries(budget)) {
    const next = Math.min(limit, byRule[rule] ?? 0);
    if (next > 0) out[rule] = next;
  }
  return out;
}

export function writeBudget(file, budget) {
  writeSortedJson(file, budget);
}
