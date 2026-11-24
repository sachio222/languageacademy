// Construction detectors: match a step pattern against a tokenized sentence.
//
// Step = { surface?, headword?, cell?, clitic?, skip?, optional? }
//  - absent key: no constraint
//  - surface: regex source tested (anchored) against token.fold
//  - headword / cell: some single reading must satisfy both; null means "any value",
//    so the token only needs at least one reading. cell is a glob (* = any run).
//  - skip: allow 0..n arbitrary tokens between the previous matched token and this one
//    (no effect before the first matched token)
//  - optional: the step may match nothing

const globCache = new Map();
function globToRegExp(glob) {
  let re = globCache.get(glob);
  if (!re) {
    const body = glob.split('*').map((p) => p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*');
    re = new RegExp(`^${body}$`);
    globCache.set(glob, re);
  }
  return re;
}

const surfaceCache = new Map();
function surfaceRegExp(source) {
  let re = surfaceCache.get(source);
  if (!re) {
    re = new RegExp(`^(?:${source})$`);
    surfaceCache.set(source, re);
  }
  return re;
}

function stepMatchesToken(step, token, readings) {
  if (step.surface != null && !surfaceRegExp(step.surface).test(token.fold)) return false;
  if (step.clitic !== undefined && Boolean(token.clitic) !== step.clitic) return false;
  const wantsHeadword = step.headword !== undefined;
  const wantsCell = step.cell !== undefined;
  if (wantsHeadword || wantsCell) {
    const cellRe = typeof step.cell === 'string' ? globToRegExp(step.cell) : null;
    const ok = readings.some((r) =>
      (typeof step.headword !== 'string' || r.headwordId === step.headword)
      && (!cellRe || (typeof r.cell === 'string' && cellRe.test(r.cell))));
    if (!ok) return false;
  }
  return true;
}

export function matchPattern(tokens, readings, pattern) {
  // last: index of the previously matched token, or -1 when nothing matched yet.
  const attempt = (si, last) => {
    if (si === pattern.length) return true;
    const step = pattern[si];
    const first = last < 0;
    const from = first ? 0 : last + 1;
    const to = first ? tokens.length - 1 : Math.min(tokens.length - 1, last + 1 + (step.skip ?? 0));
    for (let p = from; p <= to; p++) {
      if (stepMatchesToken(step, tokens[p], readings[p] ?? []) && attempt(si + 1, p)) return true;
    }
    return step.optional ? attempt(si + 1, last) : false;
  };
  return pattern.length === 0 ? false : attempt(0, -1);
}

export function detectConstructions(tokens, readings, constructions) {
  const found = [];
  for (const c of constructions) {
    if (c.detect && matchPattern(tokens, readings, c.detect)) found.push(c.id);
  }
  return found;
}
