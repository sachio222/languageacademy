import { tokenize, fold, restoreElisions } from '../fr/tokenize.mjs';
import { lookupToken, lookupTokenStrict, lookupKey, strictKey } from '../fr/forms.mjs';
import { detectConstructions, matchSpans, matchStepSpans } from '../fr/detect.mjs';
import { issue } from '../issues.mjs';
import { languageName } from '../pairs.mjs';
import { OUTSIDE } from '../content-course.mjs';

const memo = new WeakMap();

// Per item: one entry for each text in french (typed) and shown (read or heard), both strict (accent-sensitive),
// then lenient (fold-based).
// licenses: for each construction that lists `licenses` and matches the text, the headword IDs it licenses and the
// token indices of each match ([{ id, heads, at: Set }]). fr:cx:neg.de licenses the de of "pas de" only.
// Returns Map<itemRef, Array<{ text, strict, tokens, readings, constructions, licenses }>>.
export function analyzeItems(ctx) {
  const cached = memo.get(ctx);
  if (cached) return cached;
  const { graph, index } = ctx;
  const isWord = (f) => index.has(f) || graph.names.has(f);
  const out = new Map();
  for (const m of ctx.course) {
    for (const it of m.items) {
      const strictTexts = new Set([...(it.french ?? []), ...(it.shown ?? [])]);
      const texts = [...new Set([...strictTexts, ...(it.lenient ?? [])])];
      out.set(it.ref, texts.map((text) => {
        const strict = strictTexts.has(text);
        const tokens = tokenize(strict ? text : restoreElisions(text), { isWord });
        const readings = tokens.map((t) => (strict ? lookupTokenStrict(index, t) : lookupToken(index, t)));
        const constructions = detectConstructions(tokens, readings, graph.constructions ?? [], graph.names);
        const licenses = (graph.constructions ?? [])
          .filter((c) => c.detect && Array.isArray(c.licenses) && c.licenses.length && constructions.includes(c.id))
          .flatMap((c) => matchSpans(tokens, readings, c.detect, graph.names)
            .map((span) => ({ id: c.id, heads: new Set(c.licenses), at: new Set(span) })));
        return { text, strict, tokens, readings, constructions, licenses };
      }));
    }
  }
  memo.set(ctx, out);
  return out;
}

// Map<headwordId | form nodeId | fold | constructionId, { moduleKey, position }>: the first module that uses it.
// A word or pattern that a course-map override ignores in an item is not a use of it there.
export function firstUse(ctx) {
  return uses(ctx).first;
}

// The same map for French the learner types: a typed cognate is fixed where the learner first types it.
export function firstTypedUse(ctx) {
  return uses(ctx).typed;
}

const usesMemo = new WeakMap();

function uses(ctx) {
  const done = usesMemo.get(ctx);
  if (done) return done;
  const analysis = analyzeItems(ctx);
  const isWord = (f) => ctx.index.has(f) || ctx.graph.names.has(f);
  const first = new Map();
  const typed = new Map();
  const note = (map, key, m) => {
    if (!map.has(key) || m.position < map.get(key).position) {
      map.set(key, { moduleKey: m.moduleKey, position: m.position });
    }
  };
  for (const m of ctx.course) {
    for (const it of m.items) {
      const ignore = suppressions(ctx, m.moduleKey, it.ref);
      for (const a of analysis.get(it.ref) ?? []) {
        const typedAt = typedTest(it, a, isWord);
        a.tokens.forEach((t, i) => {
          if (ctx.graph.names.has(t.fold)) return;
          const lk = lookupKey(t);
          const rs = a.readings[i];
          if (ignore.has(lk) || ignore.has(t.fold) || rs.some((r) => ignore.has(r.headwordId) || ignore.has(r.nodeId))) return;
          const maps = typedAt(i) ? [first, typed] : [first];
          for (const map of maps) {
            if (rs.length === 0) note(map, lk, m);
            for (const r of rs) {
              note(map, r.headwordId, m);
              if (r.via !== 'lemma') note(map, r.nodeId, m);
            }
          }
        });
        for (const id of a.constructions) if (!ignore.has(id)) note(first, id, m);
      }
    }
  }
  const out = { first, typed };
  usesMemo.set(ctx, out);
  return out;
}

// The words and patterns a course-map override tells the checker to ignore in one item (graph ids or folded words).
export const suppressions = (ctx, moduleKey, itemRef) => {
  const list = ctx.graph.courseMap?.[moduleKey]?.overrides?.[itemRef]?.ignore ?? [];
  return new Set(list.map((x) => (String(x).includes(':') ? String(x) : fold(String(x)))));
};

// The cognate allowance from the language pair (graph.pair). From the cognates lesson on, a cognate may appear before
// it is taught in French the learner reads or hears. In French the learner types it keeps its issue, with reason
// 'cognate', unless settings.cognates.allowIn is 'all'. A false friend never gets the allowance; an irregular form of
// a cognate does not either, only the headword and its regular forms.
function cognateTest(ctx) {
  const { graph } = ctx;
  const pair = graph.pair ?? { words: [], falseFriends: [], lesson: null };
  const cognates = new Set(pair.words.map((w) => w.id));
  const falseFriends = new Set(pair.falseFriends.map((w) => w.id));
  const lessonAt = pair.lesson ? ctx.course.find((m) => m.moduleKey === pair.lesson)?.position ?? null : null;
  return {
    allowTyped: graph.settings?.cognates?.allowIn === 'all',
    speakers: `${languageName(pair.native ?? graph.native)} speakers`,
    isCognate: (readings, position) => lessonAt !== null && position >= lessonAt
      && !readings.some((r) => falseFriends.has(r.headwordId))
      && readings.some((r) => cognates.has(r.headwordId) && r.via !== 'irregular'),
  };
}

// For one analyzed text of an item: is the token at index i French the learner types? `french` and `lenient` are
// typed and `shown` is not. In a blank sentence (an item with blankAnswers) only the words of the answers are typed:
// the learner reads the rest of the sentence.
function typedTest(it, a, isWord) {
  const typed = new Set([...(it.french ?? []), ...(it.lenient ?? [])]);
  if (!typed.has(a.text)) return () => false;
  if (!Array.isArray(it.blankAnswers) || !(it.french ?? []).includes(a.text)) return () => true;
  const folds = a.tokens.map((t) => t.fold);
  const mask = folds.map(() => false);
  for (const answer of it.blankAnswers) {
    const want = tokenize(String(answer), { isWord }).map((t) => t.fold);
    if (!want.length) continue;
    // the answer's words where they sit in the sentence; if the filled sentence spells them differently, every token
    // that matches one of them
    const at = folds.findIndex((_, j) => want.every((f, k) => folds[j + k] === f && !mask[j + k]));
    if (at >= 0) want.forEach((_, k) => { mask[at + k] = true; });
    else folds.forEach((f, j) => { if (want.includes(f)) mask[j] = true; });
  }
  return (i) => mask[i];
}

const results = new WeakMap();

// For one analyzed text of an item in module m: Map<token index, gloss fr> of the tokens a gloss row of m covers, the
// way L's tap-a-word matcher reads the text (whole words, case and apostrophes ignored, accents kept; a longer gloss
// wins). Only French L glosses is covered: the item's `glossable` texts, and in a gap-fill the words around the blanks.
function glossCover(m, it, a, typedAt, glossTokens) {
  const out = new Map();
  if (!glossTokens.length || !(it.glossable ?? []).includes(a.text)) return out;
  const keys = a.tokens.map((t) => t.norm);
  for (const { fr, seq } of glossTokens) {
    for (let j = 0; j + seq.length <= keys.length; j++) {
      if (!seq.every((k, n) => keys[j + n] === k)) continue;
      for (let n = 0; n < seq.length; n++) if (!typedAt(j + n) && !out.has(j + n)) out.set(j + n, fr);
    }
  }
  return out;
}

export function ruleTaughtBefore(ctx) {
  return run(ctx).issues;
}

// How many tokens the cognate allowance let through: cognates read or heard (or typed, with allowIn 'all') before
// they are taught.
export function cognatesAllowed(ctx) {
  return run(ctx).cognatesAllowed;
}

function run(ctx) {
  const done = results.get(ctx);
  if (done) return done;
  const { graph, timeline, index } = ctx;
  const analysis = analyzeItems(ctx);
  const cognate = cognateTest(ctx);
  const isWord = (f) => index.has(f) || graph.names.has(f);
  let allowed = 0;
  const first = firstUse(ctx);
  const firstTyped = firstTypedUse(ctx);
  const titleAt = new Map(ctx.course.map((m) => [m.position, m.title]));
  const issues = [];
  // A recognition-only pattern (use: 'recognize', such as the passé simple) is one the learner reads and hears but never
  // types. What counts is the literary form itself, the tokens its detector marks with form: true (all of the match when
  // none is marked): untaught-construction is reported only where some match has its form in French the learner reads
  // or hears, and recognize-typed warns where the learner would have to type the form.
  const recognize = new Map((graph.constructions ?? []).filter((c) => c.use === 'recognize' && c.detect).map((c) => [c.id, c]));
  const formTokens = (span) => {
    const marked = span.filter(([si, , steps]) => steps[si]?.form);
    return (marked.length ? marked : span).map(([, p]) => p);
  };
  const recognizeSpans = (id, a) => matchStepSpans(a.tokens, a.readings, recognize.get(id).detect, graph.names).map(formTokens);
  const readOnlyMatch = (id, a, typedAt) => recognizeSpans(id, a).some((form) => form.every((i) => !typedAt(i)));
  const typedFormMatch = (id, a, typedAt) => recognizeSpans(id, a).some((form) => form.some((i) => typedAt(i)));

  const laterNote = (id, position) => {
    const at = timeline.taughtAt.get(id);
    return at !== undefined && at > position ? at : null;
  };
  const taughtClause = (at) => `taught later at position ${at} (${titleAt.get(at) ?? 'unknown module'})`;
  const at = (position) => (position == null ? null : { position, title: titleAt.get(position) ?? 'unknown module' });

  for (const m of ctx.course) {
    // One line per word per module. Strict text keeps accents, so où and ou are two words; a lenient answer
    // (often typed without accents) is the same word as any text with the same letters.
    const seenStrict = new Set();
    const seenLenient = new Set();
    const seenFold = new Set();
    const seenWord = (a, t, lk) => (a.strict ? seenStrict.has(strictKey(t)) || seenLenient.has(lk) : seenFold.has(lk));
    const markWord = (a, t, lk) => {
      seenFold.add(lk);
      if (a.strict) seenStrict.add(strictKey(t));
      else seenLenient.add(lk);
    };
    const seenCx = new Set();
    // The module's glosses as token sequences, longest first; each gloss over a word not taught yet is reported once.
    const glossTokens = (m.glosses ?? [])
      .map((fr) => ({ fr, seq: tokenize(fr, { isWord }).map((t) => t.norm) }))
      .filter((g) => g.seq.length)
      .sort((x, y) => y.seq.length - x.seq.length);
    const seenGloss = new Set();
    const seenTyped = new Set();
    for (const it of m.items) {
      // Hints, feedback, instructions and titles stay outside this rule (Jake); their French still counts for reuse.
      if (OUTSIDE.has(it.source)) continue;
      const ignore = suppressions(ctx, m.moduleKey, it.ref);
      for (const a of analysis.get(it.ref) ?? []) {
        const typedAt = typedTest(it, a, isWord);
        const glossed = glossCover(m, it, a, typedAt, glossTokens);
        a.tokens.forEach((t, i) => {
          const lk = lookupKey(t);
          if (graph.names.has(t.fold) || graph.names.has(lk)) return;
          const rs = a.readings[i];
          if (ignore.has(lk) || ignore.has(t.fold)
            || rs.some((r) => ignore.has(r.headwordId) || ignore.has(r.nodeId))) return;
          const untaughtCognate = rs.length > 0 && !timeline.isTokenAvailable(rs, m.position)
            && cognate.isCognate(rs, m.position);
          if (untaughtCognate && (cognate.allowTyped || !typedAt(i))) {
            allowed += 1;
            return;
          }
          if (seenWord(a, t, lk)) return;
          const base = { moduleKey: m.moduleKey, position: m.position, itemRef: it.ref, surface: t.surface };
          if (rs.length === 0) {
            markWord(a, t, lk);
            issues.push(issue({
              ...base, rule: 'unknown-word',
              message: `"${t.surface}" is not in the graph (${it.ref}: ${a.text})`,
              fix: { kind: 'add-to-graph', moduleKey: first.get(lk)?.moduleKey ?? m.moduleKey },
            }));
            return;
          }
          if (timeline.isTokenAvailable(rs, m.position)) return;
          // a word a taught construction licenses inside its own match (the de of "pas de")
          if ((a.licenses ?? []).some((l) => l.at.has(i) && timeline.isAvailable(l.id, m.position)
            && rs.some((r) => l.heads.has(r.headwordId)))) return;
          const heads = [...new Set(rs.map((r) => r.headwordId))];
          // A form a gloss covers is allowed, neither untaught nor taught, when its word is taught at or before this
          // module (Jake, 2026-11-25). A gloss over a word not taught yet would skip its teaching: gloss_of_untaught,
          // once per gloss row. A reading keeps its glossary rules: there the word stays an untaught-word issue.
          const gloss = glossed.get(i);
          if (gloss !== undefined) {
            const known = heads.some((h) => timeline.isTaught(h, m.position) || (heads.length === 1 && timeline.isAvailable(h, m.position)));
            if (known) return;
            if (m.kind !== 'reading') {
              if (!seenGloss.has(gloss)) {
                seenGloss.add(gloss);
                const laters = heads.map((h) => laterNote(h, m.position)).filter((x) => x !== null);
                const named = laters.length ? heads.find((h) => laterNote(h, m.position) === Math.min(...laters)) : heads[0];
                issues.push(issue({
                  moduleKey: m.moduleKey, position: m.position, itemRef: it.ref, surface: t.surface,
                  rule: 'gloss_of_untaught', nodeId: named,
                  reason: laters.length ? 'later' : 'nowhere',
                  taughtLaterAt: laters.length ? at(Math.min(...laters)) : null,
                  lemma: graph.nodes.get(named)?.lemma ?? null,
                  text: a.text,
                  message: `the gloss "${gloss}" of ${m.moduleKey} covers "${t.surface}", whose word is not taught yet (${it.ref}: ${a.text}); ${laters.length ? taughtClause(Math.min(...laters)) : 'it is not taught anywhere in the course'}. A gloss is for a form of a word already taught: teach the word as a card here or earlier, or drop the gloss`,
                  fix: { kind: 'teach-earlier', moduleKey: m.moduleKey },
                }));
              }
              return;
            }
          }
          markWord(a, t, lk);
          const laters = heads.map((h) => laterNote(h, m.position)).filter((x) => x !== null);
          // A headword open only through the Reference counts as taught earlier only when the token reads as no other
          // word, as in timeline.isTokenAvailable.
          const headEarlier = (h) => timeline.isTaught(h, m.position) || (heads.length === 1 && timeline.isAvailable(h, m.position));
          const taughtEarlier = heads.some(headEarlier);
          // Name the reading the message is about: the one taught soonest after this module, else the one taught earlier.
          // A letter of the alphabet is named only when the token has no word reading.
          const letters = new Set(rs.filter((r) => r.pos === 'alphabet').map((r) => r.headwordId));
          const pick = (list) => list.find((h) => !letters.has(h)) ?? list[0];
          const soonest = heads.filter((h) => laters.length && laterNote(h, m.position) === Math.min(...laters));
          const earlier = heads.filter(headEarlier);
          const named = pick(soonest.length ? soonest : earlier.length ? earlier : heads);
          // reason: 'later' (taught after this module), 'form' (the word is taught earlier, this form is not), 'nowhere',
          // or 'cognate' (a cognate the learner types), which keeps the other reason as baseReason.
          const baseReason = laters.length ? 'later' : taughtEarlier ? 'form' : 'nowhere';
          const reason = untaughtCognate ? 'cognate' : baseReason;
          let tail = 'it is not taught anywhere in the course';
          if (baseReason === 'later') tail = taughtClause(Math.min(...laters));
          else if (baseReason === 'form') tail = 'the word is taught earlier, but this form is not';
          if (untaughtCognate) {
            tail += `; ${t.surface} is a cognate, so ${cognate.speakers} may read it before it is taught, but they should not have to type it`;
          }
          // A form gap on a word taught earlier is fixed where that form is first used, not the word.
          const formGap = !laters.length && taughtEarlier;
          const keys = formGap ? rs.filter((r) => r.via !== 'lemma').map((r) => r.nodeId) : heads;
          // A typed cognate is fixed where the learner first types it: a module that only reads it cannot act.
          const from = untaughtCognate ? firstTyped : first;
          const useAt = keys.map((k) => from.get(k)).filter(Boolean)
            .sort((x, y) => x.position - y.position)[0];
          issues.push(issue({
            ...base, rule: 'untaught-word', nodeId: named,
            reason,
            ...(untaughtCognate ? { baseReason } : {}),
            taughtLaterAt: baseReason === 'later' ? at(Math.min(...laters)) : null,
            taughtEarlierAt: baseReason === 'form' ? at(timeline.taughtAt.get(named)) : null,
            lemma: graph.nodes.get(named)?.lemma ?? null,
            text: a.text,
            message: `"${t.surface}" is used before it is taught (${it.ref}: ${a.text}); ${tail}`,
            fix: { kind: 'teach-earlier', moduleKey: useAt?.moduleKey ?? m.moduleKey },
          }));
        });
        for (const id of a.constructions) {
          if (recognize.has(id) && !ignore.has(id) && !seenTyped.has(id) && typedFormMatch(id, a, typedAt)) {
            seenTyped.add(id);
            issues.push(issue({
              rule: 'recognize-typed', severity: 'warning', moduleKey: m.moduleKey, position: m.position,
              itemRef: it.ref, nodeId: id, text: a.text,
              message: `${id} is a pattern the learner only reads, but ${it.ref} asks the learner to type it (${a.text}); make it French the learner reads, or change the answer`,
              fix: { kind: 'rewrite-item', moduleKey: m.moduleKey },
            }));
          }
          if (seenCx.has(id) || ignore.has(id) || timeline.isAvailable(id, m.position)) continue;
          if (recognize.has(id) && !readOnlyMatch(id, a, typedAt)) continue;
          seenCx.add(id);
          const later = laterNote(id, m.position);
          issues.push(issue({
            rule: 'untaught-construction', moduleKey: m.moduleKey, position: m.position,
            itemRef: it.ref, nodeId: id,
            reason: later ? 'later' : 'nowhere',
            taughtLaterAt: at(later),
            text: a.text,
            message: `${id} is used before it is taught (${it.ref}: ${a.text}); ${later ? taughtClause(later) : 'it is not taught anywhere in the course'}`,
            fix: { kind: 'teach-earlier', moduleKey: first.get(id)?.moduleKey ?? m.moduleKey },
          }));
        }
      }
    }
  }
  const out = { issues, cognatesAllowed: allowed };
  results.set(ctx, out);
  return out;
}

// The forms content:glosses glosses (Jake, 2026-11-25): in each lesson and reading, every token of French L glosses
// (an item's `glossable` texts, never a typed word) that the taught-before rule would report because the form is not
// taught, while its word is taught at or before the module. Elided tokens (j', l') and clitics (-il) are left out, since
// L's matcher cannot tap them. Existing glosses are not read, so the answer is the same however often it is asked.
// Returns Map<moduleKey, Array<{ surface, key, reading, lemma, itemRef }>>, each module's forms in order of first use,
// once per key (the form lower-cased, apostrophes straight).
export function glossCandidates(ctx, kinds = ['lesson', 'reading']) {
  const { graph, timeline, index } = ctx;
  const analysis = analyzeItems(ctx);
  const cognate = cognateTest(ctx);
  const isWord = (f) => index.has(f) || graph.names.has(f);
  const out = new Map();
  for (const m of ctx.course) {
    if (!kinds.includes(m.kind)) continue;
    const found = new Map();
    for (const it of m.items) {
      if (OUTSIDE.has(it.source) || !(it.glossable ?? []).length) continue;
      const ignore = suppressions(ctx, m.moduleKey, it.ref);
      for (const a of analysis.get(it.ref) ?? []) {
        if (!it.glossable.includes(a.text)) continue;
        const typedAt = typedTest(it, a, isWord);
        a.tokens.forEach((t, i) => {
          if (typedAt(i)) return;
          const lk = lookupKey(t);
          if (graph.names.has(t.fold) || graph.names.has(lk)) return;
          if (/['’]$/.test(t.surface) || t.surface.startsWith('-')) return;
          const rs = a.readings[i];
          if (!rs.length || ignore.has(lk) || ignore.has(t.fold) || rs.some((r) => ignore.has(r.headwordId) || ignore.has(r.nodeId))) return;
          if (timeline.isTokenAvailable(rs, m.position) || cognate.isCognate(rs, m.position)) return;
          if ((a.licenses ?? []).some((l) => l.at.has(i) && timeline.isAvailable(l.id, m.position) && rs.some((r) => l.heads.has(r.headwordId)))) return;
          const heads = [...new Set(rs.map((r) => r.headwordId))];
          const known = (h) => timeline.isTaught(h, m.position) || (heads.length === 1 && timeline.isAvailable(h, m.position));
          const reading = rs.find((r) => known(r.headwordId) && r.via !== 'lemma') ?? rs.find((r) => known(r.headwordId));
          if (!reading) return;
          const key = t.norm;
          if (!found.has(key))
            found.set(key, { surface: t.surface, key, reading, lemma: graph.nodes.get(reading.headwordId)?.lemma ?? null, itemRef: it.ref });
        });
      }
    }
    if (found.size) out.set(m.moduleKey, [...found.values()]);
  }
  return out;
}
