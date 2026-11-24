// Construction detectors: match a step pattern against a tokenized sentence.
// Note: surface regexes and form lookups run on accent-folded text, so "mange" and "mangé" share readings.
//
// A detect is null, a pattern (Step[]), or a list of alternative patterns (Step[][]).
// Step = { surface?, headword?, cell?, pos?, via?, clitic?, name?, start?, any?, skip?, optional? }
//  - absent key: no constraint
//  - surface: regex source tested (anchored) against token.fold
//  - headword / cell / pos / via: some single reading must satisfy all that are present; null
//    means "any value", so the token only needs at least one reading. cell is a glob (* = any run).
//    pos is the headword's part of speech; via is 'lemma' | 'irregular' | 'generated'
//    ({pos:'verb', via:'lemma'} is an infinitive).
//  - name: true: the token's folded surface is in the names list (graph.names) passed to the matcher
//  - start: the token must be token index 0 of the text
//  - any: the token must also match at least one of the listed sub-steps (same keys, no skip/optional)
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

const NO_NAMES = new Set();

// index: position of the token in the text (needed for the start anchor). names: Set of folded names.
function stepMatchesToken(step, token, readings, index, names) {
  if (step.start && index !== 0) return false;
  if (step.name && !names.has(token.fold)) return false;
  if (step.surface != null && !surfaceRegExp(step.surface).test(token.fold)) return false;
  if (step.clitic !== undefined && Boolean(token.clitic) !== step.clitic) return false;
  const wantsReading = step.headword !== undefined || step.cell !== undefined
    || step.pos !== undefined || step.via !== undefined;
  if (wantsReading) {
    const cellRe = typeof step.cell === 'string' ? globToRegExp(step.cell) : null;
    const ok = readings.some((r) =>
      (typeof step.headword !== 'string' || r.headwordId === step.headword)
      && (!cellRe || (typeof r.cell === 'string' && cellRe.test(r.cell)))
      && (typeof step.pos !== 'string' || r.pos === step.pos)
      && (typeof step.via !== 'string' || r.via === step.via));
    if (!ok) return false;
  }
  if (step.any && !step.any.some((sub) => stepMatchesToken(sub, token, readings, index, names))) return false;
  return true;
}

export function matchPattern(tokens, readings, pattern, names = NO_NAMES) {
  // A list of patterns (first element is an array) matches when any one of them matches.
  if (Array.isArray(pattern[0])) return pattern.some((alt) => matchPattern(tokens, readings, alt, names));
  // last: index of the previously matched token, or -1 when nothing matched yet.
  const attempt = (si, last) => {
    if (si === pattern.length) return true;
    const step = pattern[si];
    const first = last < 0;
    const from = first ? 0 : last + 1;
    const to = first ? tokens.length - 1 : Math.min(tokens.length - 1, last + 1 + (step.skip ?? 0));
    for (let p = from; p <= to; p++) {
      if (stepMatchesToken(step, tokens[p], readings[p] ?? [], p, names) && attempt(si + 1, p)) return true;
    }
    return step.optional ? attempt(si + 1, last) : false;
  };
  return pattern.length === 0 ? false : attempt(0, -1);
}

export function detectConstructions(tokens, readings, constructions, names = NO_NAMES) {
  const found = [];
  for (const c of constructions) {
    if (c.detect && matchPattern(tokens, readings, c.detect, names)) found.push(c.id);
  }
  return found;
}
