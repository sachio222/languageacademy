// A stable identity for every checker issue (design §17 item 2, §4.1 finding.fingerprint).
//
// An issue's message names course positions ("taught at position 124"), and positions move whenever a module is
// added or edited ahead of it. The fingerprint names what the issue is about instead: its rule, the module it sits
// in, the module the issue budget charges it to, the graph node, the item inside the module and the surface word.
// It never reads message, position, severity or any *At field, so the same issue keeps its fingerprint when the
// course around it moves. Two issues alike in all six fields share a fingerprint; fingerprintCounts keeps them as a
// multiset, so a second copy counts as one more issue (plan Review Focus 3).
//
// Extra fields by rule (controller's ruling, 2026-11-25): a rule whose stable detail sits outside the six base fields
// adds it, so the pipeline sees a change inside an existing issue. Extras are module keys, unit keys or graph ids
// only, never positions or a unit's index, which moves when a unit is inserted ahead; every rule not listed keeps the
// base tuple.
//   level-order         nodes: the sorted node ids it reports (issue.nodes), so a changed node list is a new fingerprint.
//   taught-twice        teaching_module_keys: the sorted keys of every module that teaches the node or its twins
//                       (issue.teachingModuleKeys), so a third teaching is a new fingerprint.
//   level-label         level_label: issue.levelLabel, { of: 'module' | 'unit:<unit_key>' (unit:<index> for a course
//                       read without unit keys), label as written,
//                       against: 'computed' | 'reached', value: the level compared with }, so a module's up to three
//                       labels never share a fingerprint and a changed label is a new one.
//   level-data-missing  nodes: the sorted ids of taught nodes with no level (issue.nodes), never the message's count.
import { createHash } from 'node:crypto';
import { canonicalJson } from '../content/bundle.mjs';

const sortedIds = (ids) => (Array.isArray(ids) ? [...ids].sort() : []);

// rule -> (issue) -> extra identity fields.
const EXTRA = {
  'level-order': (issue) => ({ nodes: sortedIds(issue.nodes) }),
  'taught-twice': (issue) => ({ teaching_module_keys: sortedIds(issue.teachingModuleKeys) }),
  'level-label': (issue) => ({ level_label: issue.levelLabel ?? null }),
  'level-data-missing': (issue) => ({ nodes: sortedIds(issue.nodes) }),
};

// "<module_key>#<item path>" -> "<item path>"; null without a ref or a '#'.
const itemIdOf = (itemRef) => {
  if (typeof itemRef !== 'string') return null;
  const at = itemRef.indexOf('#');
  return at === -1 ? null : itemRef.slice(at + 1);
};

/** SHA-256 hex of the canonical JSON of the issue's identity fields. Reads the issue, never changes it. */
export function issueFingerprint(issue) {
  const identity = {
    rule: issue.rule,
    module_key: issue.moduleKey ?? null,
    charged_module_key: issue.budgetModuleKey ?? issue.moduleKey ?? null,
    node_id: issue.nodeId ?? null,
    item_id: itemIdOf(issue.itemRef),
    surface: issue.surface ?? null,
    ...(Object.hasOwn(EXTRA, issue.rule) ? EXTRA[issue.rule](issue) : {}),
  };
  return createHash('sha256').update(canonicalJson(identity)).digest('hex');
}

/** Fingerprint -> how many of the issues carry it (a multiset). */
export function fingerprintCounts(issues) {
  const counts = new Map();
  for (const issue of issues) {
    const fp = issueFingerprint(issue);
    counts.set(fp, (counts.get(fp) ?? 0) + 1);
  }
  return counts;
}
