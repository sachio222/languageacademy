import { issue } from '../issues.mjs';
import { taughtNodeIds } from './teaches.mjs';

const ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const rank = (c) => ORDER.indexOf(c);
const LABEL = /\b(A1|A2|B1|B2|C1|C2)\+?/g;

const maxLevel = (levels) => levels.reduce((best, c) => (best === null || rank(c) > rank(best) ? c : best), null);

// Highest CEFR label found in the texts, or null.
function labelLevel(texts) {
  return maxLevel(texts.flatMap((t) => [...String(t).matchAll(LABEL)].map((m) => m[1])));
}

export function ruleLevels(ctx) {
  const issues = [];
  const computed = new Map(); // position -> level | null
  let missing = 0;
  const seen = new Set();
  for (const m of ctx.course) {
    const levels = [];
    for (const id of taughtNodeIds(ctx.graph.courseMap?.[m.moduleKey])) {
      const cefr = ctx.graph.nodes.get(id)?.cefr;
      if (rank(cefr) >= 0) levels.push(cefr);
      else if (!seen.has(id)) { seen.add(id); missing += 1; }
    }
    computed.set(m.position, maxLevel(levels));
  }

  const unitMax = new Map();
  for (const m of ctx.course) {
    const c = computed.get(m.position);
    unitMax.set(m.unitId, maxLevel([unitMax.get(m.unitId), c].filter(Boolean)));
  }

  const flagged = new Set();
  for (const m of ctx.course) {
    const level = computed.get(m.position);
    const label = labelLevel([m.title, ...(m.conceptTerms ?? [])]);
    if (level && label && rank(label) > rank(level)) {
      issues.push(issue({
        rule: 'level-label',
        severity: 'warning',
        moduleKey: m.moduleKey,
        position: m.position,
        message: `${m.moduleKey} is labelled ${label} but teaches at most ${level}`,
      }));
    }
    const unitLevel = unitMax.get(m.unitId);
    const unitLabel = labelLevel([m.unitTitle]);
    if (unitLevel && unitLabel && rank(unitLabel) > rank(unitLevel) && !flagged.has(m.unitId)) {
      flagged.add(m.unitId);
      issues.push(issue({
        rule: 'level-label',
        severity: 'warning',
        moduleKey: m.moduleKey,
        position: m.position,
        message: `unit ${m.unitId} "${m.unitTitle}" is labelled ${unitLabel} but its modules teach at most ${unitLevel}`,
      }));
    }
  }

  if (missing > 0) {
    issues.push(issue({
      rule: 'level-data-missing',
      severity: 'warning',
      message: `${missing} taught word or construction nodes have no cefr level`,
    }));
  }
  return issues;
}
