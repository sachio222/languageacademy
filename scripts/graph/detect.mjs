// Construction detectors: match a step pattern against a tokenized sentence.
// Note: surface regexes and form lookups run on accent-folded text, so "mange" and "mangé" share readings.
//
// A detect is null, a pattern (Step[]), or a list of alternative patterns (Step[][]).
// Step = { surface?, accented?, headword?, cell?, pos?, via?, clitic?, name?, start?, end?, any?, skip?, optional?, form? }
//  - absent key: no constraint
//  - surface: regex source tested (anchored) against token.fold
//  - accented: regex source tested (anchored) against token.norm, which keeps accents (lowercase), for forms that
//    only an accent tells apart (the subjonctif imparfait fût against the passé simple fut)
//  - headword / cell / pos / via: some single reading must satisfy all that are present; null
//    means "any value", so the token only needs at least one reading. cell is a glob (* = any run).
//    pos is the headword's part of speech; via is 'lemma' | 'irregular' | 'generated'
//    ({pos:'verb', via:'lemma'} is an infinitive).
//  - name: true: the token's folded surface is in the names list (graph.names) passed to the matcher
//  - start: true: the token must be the first token of its sentence (tokenize numbers sentences; text with no
//    sentence numbers is one sentence); start: 'text': the first token of the whole text
//  - end: the token must be the last token of its sentence
//  - form: true marks the token that carries a recognition-only form (the passé simple verb); matching ignores it
//  - every token of a match lies in one sentence: skip and adjacency never cross a sentence end
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

// A token's sentence (tokenize numbers them); a token built without one counts as in the same sentence as any other.
const sentenceOf = (token) => token?.sentence ?? 0;

// tokens: the whole text; index: the token to test. start and end are anchored to the token's sentence, which is the
// whole text when tokens carry no sentence numbers. names: Set of folded names.
function stepMatchesToken(step, tokens, readings, index, names) {
  const token = tokens[index];
  if (step.start === 'text' && index !== 0) return false;
  if (step.start === true && index > 0 && sentenceOf(tokens[index - 1]) === sentenceOf(token)) return false;
  if (step.end && index < tokens.length - 1 && sentenceOf(tokens[index + 1]) === sentenceOf(token)) return false;
  if (step.name && !names.has(token.fold)) return false;
  if (step.surface != null && !surfaceRegExp(step.surface).test(token.fold)) return false;
  if (step.accented != null && !surfaceRegExp(step.accented).test(token.norm ?? token.fold)) return false;
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
  if (step.any && !step.any.some((sub) => stepMatchesToken(sub, tokens, readings, index, names))) return false;
  return true;
}

// The last token a step may take after the token at `last`: skip allows up to n words between, and a match never
// crosses into the next sentence.
function lastReachable(tokens, last, step) {
  let to = Math.min(tokens.length - 1, last + 1 + (step.skip ?? 0));
  while (to > last && sentenceOf(tokens[to]) !== sentenceOf(tokens[last])) to -= 1;
  return to;
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
    const to = first ? tokens.length - 1 : lastReachable(tokens, last, step);
    for (let p = from; p <= to; p++) {
      if (stepMatchesToken(step, tokens, readings[p] ?? [], p, names) && attempt(si + 1, p)) return true;
    }
    return step.optional ? attempt(si + 1, last) : false;
  };
  return pattern.length === 0 ? false : attempt(0, -1);
}

// Every match of a pattern, as [step index, token index, the alternative's steps] triples, one for each step that matched a token (an optional
// step that matched nothing adds none): the first match from each start token, in order.
export function matchStepSpans(tokens, readings, pattern, names = NO_NAMES) {
  if (pattern.length === 0) return [];
  if (Array.isArray(pattern[0])) return pattern.flatMap((alt) => matchStepSpans(tokens, readings, alt, names));
  const attempt = (si, last, at) => {
    if (si === pattern.length) return at;
    const step = pattern[si];
    const to = lastReachable(tokens, last, step);
    for (let p = last + 1; p <= to; p++) {
      if (!stepMatchesToken(step, tokens, readings[p] ?? [], p, names)) continue;
      const done = attempt(si + 1, p, [...at, [si, p, pattern]]);
      if (done) return done;
    }
    return step.optional ? attempt(si + 1, last, at) : null;
  };
  const out = [];
  for (let start = 0; start < tokens.length; start++) {
    if (!stepMatchesToken(pattern[0], tokens, readings[start] ?? [], start, names)) continue;
    const span = attempt(1, start, [[0, start, pattern]]);
    if (span) out.push(span);
  }
  return out;
}

// Every match of a pattern, as the indices of the tokens its steps matched: "je ne parle pas, tu ne vas pas" gives
// two spans.
export function matchSpans(tokens, readings, pattern, names = NO_NAMES) {
  return matchStepSpans(tokens, readings, pattern, names).map((span) => span.map(([, p]) => p));
}

export function detectConstructions(tokens, readings, constructions, names = NO_NAMES) {
  const found = [];
  for (const c of constructions) {
    if (c.detect && matchPattern(tokens, readings, c.detect, names)) found.push(c.id);
  }
  return found;
}
