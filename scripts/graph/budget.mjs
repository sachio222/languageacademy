// The issue budget (curriculum-graph/reports/issue-budget.json): the most issues of each rule the course may have.
// `graph:check --budget` fails when any rule's count rises above its budget; a rule the budget does not name has a
// budget of 0. `--lower-budget` writes each lower count back, never a higher one.
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

/* ---------- two parts: legacy units and new units ---------- */

// The budget file holds { about, legacy: { rule: n }, new: { rule: n } }. Legacy is Units 1 to 12, the Reference
// shelf and course-wide issues, at the counts the conversion left (a count above them fails; --lower-budget keeps a
// fall); new is Unit 13 onward, at zero, so a module written in a new unit can never hide behind the old units'
// headroom (ledger ruling 2026-11-25).
export const BUDGET_PARTS = ['legacy', 'new'];
export const LAST_LEGACY_UNIT = 12;

/** 'legacy' or 'new' for a module's unit_key (null: the shelf, or an issue of the whole course). */
export function budgetPartOf(unitKey) {
  const m = /^unit(\d+)$/.exec(unitKey ?? '');
  return m && Number(m[1]) > LAST_LEGACY_UNIT ? 'new' : 'legacy';
}

/**
 * { legacy: { rule: count }, new: { rule: count } } of the issues; unitOf(moduleKey) gives a module's unit_key. An issue
 * counts in the part of the module it is charged to: its budgetModuleKey when it names one (a reuse miss, where its
 * window closes), else its moduleKey.
 */
export function countByPart(issues, unitOf) {
  const out = Object.fromEntries(BUDGET_PARTS.map((p) => [p, {}]));
  for (const i of issues) {
    const key = i.budgetModuleKey ?? i.moduleKey;
    const part = budgetPartOf(key ? unitOf(key) : null);
    out[part][i.rule] = (out[part][i.rule] ?? 0) + 1;
  }
  return out;
}

/** compareBudget for each part: { legacy: { over, under }, new: { over, under }, counts }. */
export function checkBudgetParts(issues, unitOf, budget) {
  const counts = countByPart(issues, unitOf);
  const out = { counts };
  for (const p of BUDGET_PARTS) out[p] = compareBudget(counts[p], budget[p] ?? {});
  return out;
}

/** The two-part budget with every count that fell written down (lowered, per part); `about` kept. */
export function loweredParts(counts, budget) {
  const out = { ...(budget.about ? { about: budget.about } : {}) };
  for (const p of BUDGET_PARTS) out[p] = lowered(counts[p] ?? {}, budget[p] ?? {});
  return out;
}
