import { issue } from './issues.mjs';

const TEACHING = new Set(['lesson', 'help']);
const TEACH_FIELDS = ['teachesWords', 'teachesWordsManual', 'teachesConstructions'];

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
    if (TEACHING.has(m.kind)) {
      for (const f of TEACH_FIELDS) for (const id of entry[f] ?? []) teach(id, m.position);
    } else {
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
      if (m.kind === 'reading') for (const id of entry.preTeach ?? []) teach(id, m.position);
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
