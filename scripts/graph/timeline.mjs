import { issue } from './issues.mjs';

const TEACHING = new Set(['lesson', 'help']);
const TEACH_FIELDS = ['teachesWords', 'teachesWordsManual', 'teachesConstructions'];

// Node IDs a module teaches: lessons and help pages through their teaches fields, readings through preTeach, other
// modules nothing. The timeline and the module levels both use this rule.
export function moduleTeaches(m, entry) {
  if (!entry) return [];
  const fields = TEACHING.has(m.kind) ? TEACH_FIELDS : m.kind === 'reading' ? ['preTeach'] : [];
  return [...new Set(fields.flatMap((f) => entry[f] ?? []))];
}

// Availability timeline: which node is taught at which course position.
export function buildTimeline(graph, course) {
  const taughtAt = new Map();
  const issues = [];
  const courseMap = graph.courseMap ?? {};

  const teach = (id, position) => {
    if (!taughtAt.has(id) || position < taughtAt.get(id)) taughtAt.set(id, position);
  };

  for (const m of course) {
    const entry = courseMap[m.moduleKey];
    if (!entry) continue;
    for (const id of moduleTeaches(m, entry)) teach(id, m.position);
    if (!TEACHING.has(m.kind)) {
      const offending = TEACH_FIELDS.flatMap((f) => entry[f] ?? []);
      if (offending.length) {
        issues.push(issue({
          rule: 'teaches-in-non-teaching-module',
          severity: 'error',
          moduleKey: m.moduleKey,
          position: m.position,
          message: `${m.kind} module ${m.moduleKey} (position ${m.position}) lists teaches entries, which are ignored: ${offending.join(', ')}`,
        }));
      }
    }
  }

  const isAvailable = (nodeId, position) => {
    const at = taughtAt.get(nodeId);
    return at !== undefined && at <= position;
  };

  const isReadingAvailable = (reading, position) => {
    if (!isAvailable(reading.headwordId, position)) return false;
    if (reading.via === 'lemma') return true;
    if (reading.via === 'irregular') return isAvailable(reading.nodeId, position);
    if (reading.via === 'generated') {
      return isAvailable(reading.nodeId, position)
        || (reading.paradigmId != null && isAvailable(reading.paradigmId, position));
    }
    return false;
  };

  return { taughtAt, isAvailable, isReadingAvailable, issues };
}
