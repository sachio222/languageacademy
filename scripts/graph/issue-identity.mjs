// A stable identity for every checker issue (design §17 item 2, §4.1 finding.fingerprint).
//
// An issue's message names course positions ("taught at position 124"), and positions move whenever a module is
// added or edited ahead of it. The fingerprint names what the issue is about instead: its rule, the module it sits
// in, the module the issue budget charges it to, the graph node, the item inside the module and the surface word.
// It never reads message, position, severity or any *At field, so the same issue keeps its fingerprint when the
// course around it moves. Two issues alike in all six fields share a fingerprint; fingerprintCounts keeps them as a
// multiset, so a second copy counts as one more issue (plan Review Focus 3).
import { createHash } from 'node:crypto';
import { canonicalJson } from '../content/bundle.mjs';

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
