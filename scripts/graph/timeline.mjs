import { issue } from './issues.mjs';

const TEACHING = new Set(['lesson', 'help']);
const TEACH_FIELDS = ['teachesWords', 'teachesWordsManual', 'teachesConstructions'];
// A reading teaches the words of its own vocabulary table at its own position (Jake's ruling, spec 5.7), never a
// construction.
const READING_FIELDS = ['teachesWords', 'teachesWordsManual'];

// The teaching fields a module of this kind may hold: lessons and help pages all three, readings their words, other
// modules none.
const fieldsFor = (kind) => (TEACHING.has(kind) ? TEACH_FIELDS : kind === 'reading' ? READING_FIELDS : []);

// Node IDs a module teaches, from its entry (graph.courseMap, built from the module file by courseMapFromContent).
// The timeline and the module levels both use this rule.
export function moduleTeaches(m, entry) {
  if (!entry) return [];
  return [...new Set(fieldsFor(m.kind).flatMap((f) => entry[f] ?? []))];
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
// [lexId, chunkId] for each headword of several words whose fixed-phrase pattern the graph also holds.
export function chunkTwins(graph) {
  const cx = new Set((graph.constructions ?? []).map((c) => c.id));
  return (graph.headwords ?? []).filter((h) => / /.test(h.lemma))
    .map((h) => [h.id, h.id.replace(':lex:', ':cx:chunk.')]).filter(([, c]) => cx.has(c));
}

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
    const allowed = fieldsFor(m.kind);
    if (allowed.length < TEACH_FIELDS.length) {
      const offending = TEACH_FIELDS.filter((f) => !allowed.includes(f)).flatMap((f) => entry[f] ?? []);
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

  // A headword of several words that the graph also holds as a fixed-phrase pattern (fr:lex:en-fait and
  // fr:cx:chunk.en-fait) is one phrase: it is taught where its pattern is.
  for (const [lexId, chunkId] of chunkTwins(graph)) if (taughtAt.has(chunkId)) teach(lexId, taughtAt.get(chunkId));

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

  // A regular form needs its headword and either the form or its paradigm; an irregular form needs itself too. A
  // written short form (Mme for madame, cell abbr) is known with its headword.
  const readingIn = (has) => (reading, position) => {
    if (!has(reading.headwordId, position)) return false;
    if (reading.via === 'lemma' || reading.cell === 'abbr') return true;
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

// Where each cognate of the active language pair (graph.pair) counts as known: Map<headwordId, position of the
// cognates lesson>. Empty unless settings.cognates.allowIn is 'all' and the pair's cognates lesson is in the course,
// because only then does a cognate count as known in French the learner types as well as reads. A false friend never
// counts. The level and function reports read this; taught-before applies the same allowance token by token.
export function cognateOpening(graph, course) {
  const pair = graph.pair;
  if (graph.settings?.cognates?.allowIn !== 'all' || !pair?.lesson) return new Map();
  const at = course.find((m) => m.moduleKey === pair.lesson)?.position;
  if (at === undefined) return new Map();
  const falseFriends = new Set((pair.falseFriends ?? []).map((w) => w.id));
  return new Map((pair.words ?? []).filter((w) => !falseFriends.has(w.id)).map((w) => [w.id, at]));
}
