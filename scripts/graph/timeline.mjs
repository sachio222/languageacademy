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

// Availability timeline: which node is taught at which course position, and which the Reference unit opens.
//
// opts.reference: node IDs the Reference unit's vocabulary tables list (check.mjs referenceNodes). The unit has no
// position, and learners can open it at any time, so its nodes count as available from opts.openFrom on
// (settings.reference.openFrom). With no reference, or openFrom null, nothing is open.
//
// Returns { taughtAt, availableAt, openByReference, openFrom, isTaught, isAvailable, isReadingAvailable,
// isTokenAvailable, issues }:
//   taughtAt: Map<nodeId, position>, lesson teaching only, the first position that teaches each node.
//   availableAt: Map<nodeId, position>, the earlier of taughtAt and openFrom for a Reference node; a lesson that
//     teaches a node at or before openFrom wins.
//   openByReference: Set of the nodes the Reference unit opens before any lesson teaches them.
//   isAvailable and isReadingAvailable read availableAt; isTaught reads taughtAt.
//   isTokenAvailable(readings, position): whether a token of lesson text counts as available. A reading a lesson has
//     taught always counts. A reading open only through the Reference counts only when every reading of the token
//     belongs to the same word, so the letter y never hides the pronoun y and the season été never hides the past
//     participle of être.
export function buildTimeline(graph, course, opts = {}) {
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

  const openFrom = opts.reference && Number.isInteger(opts.openFrom) ? opts.openFrom : null;
  const availableAt = new Map(taughtAt);
  const openByReference = new Set();
  if (openFrom !== null) {
    for (const id of opts.reference) {
      if (taughtAt.has(id) && taughtAt.get(id) <= openFrom) continue;
      availableAt.set(id, openFrom);
      openByReference.add(id);
    }
  }

  const within = (at) => (nodeId, position) => {
    const p = at.get(nodeId);
    return p !== undefined && p <= position;
  };
  const isAvailable = within(availableAt);
  const isTaught = within(taughtAt);

  // A regular form needs its headword and either the form or its paradigm; an irregular form needs itself too.
  const readingIn = (has) => (reading, position) => {
    if (!has(reading.headwordId, position)) return false;
    if (reading.via === 'lemma') return true;
    if (reading.via === 'irregular') return has(reading.nodeId, position);
    if (reading.via === 'generated') {
      return has(reading.nodeId, position) || (reading.paradigmId != null && has(reading.paradigmId, position));
    }
    return false;
  };
  const isReadingAvailable = readingIn(isAvailable);
  const isReadingTaught = readingIn(isTaught);

  const isTokenAvailable = (readings, position) => readings.some((r) => isReadingTaught(r, position)
    || (isReadingAvailable(r, position) && readings.every((o) => o.headwordId === r.headwordId)));

  return {
    taughtAt, availableAt, openByReference, openFrom, isTaught, isAvailable, isReadingAvailable, isTokenAvailable, issues,
  };
}
