import { tokenize, fold, restoreElisions } from '../fr/tokenize.mjs';
import { lookupToken, lookupTokenStrict, lookupKey, strictKey } from '../fr/forms.mjs';
import { detectConstructions } from '../fr/detect.mjs';
import { issue } from '../issues.mjs';

const memo = new WeakMap();

// Per item: one entry for each text in french (typed) and shown (read or heard), both strict (accent-sensitive),
// then lenient (fold-based).
// Returns Map<itemRef, Array<{ text, strict, tokens, readings, constructions }>>.
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
        return { text, strict, tokens, readings, constructions };
      }));
    }
  }
  memo.set(ctx, out);
  return out;
}

// Map<headwordId | form nodeId | fold | constructionId, { moduleKey, position }>: the first module that uses it.
export function firstUse(ctx) {
  const analysis = analyzeItems(ctx);
  const first = new Map();
  const note = (key, m) => {
    if (!first.has(key) || m.position < first.get(key).position) {
      first.set(key, { moduleKey: m.moduleKey, position: m.position });
    }
  };
  for (const m of ctx.course) {
    for (const it of m.items) {
      for (const a of analysis.get(it.ref) ?? []) {
        a.tokens.forEach((t, i) => {
          if (ctx.graph.names.has(t.fold)) return;
          const rs = a.readings[i];
          if (rs.length === 0) note(lookupKey(t), m);
          else {
            for (const r of rs) {
              note(r.headwordId, m);
              if (r.via !== 'lemma') note(r.nodeId, m);
            }
          }
        });
        for (const id of a.constructions) note(id, m);
      }
    }
  }
  return first;
}

const suppressions = (ctx, moduleKey, itemRef) => {
  const list = ctx.graph.courseMap?.[moduleKey]?.overrides?.[itemRef]?.ignore ?? [];
  return new Set(list.map((x) => (String(x).includes(':') ? String(x) : fold(String(x)))));
};

export function ruleTaughtBefore(ctx) {
  const { graph, timeline } = ctx;
  const analysis = analyzeItems(ctx);
  const first = firstUse(ctx);
  const titleAt = new Map(ctx.course.map((m) => [m.position, m.title]));
  const issues = [];

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
    for (const it of m.items) {
      const ignore = suppressions(ctx, m.moduleKey, it.ref);
      for (const a of analysis.get(it.ref) ?? []) {
        a.tokens.forEach((t, i) => {
          const lk = lookupKey(t);
          if (graph.names.has(t.fold) || graph.names.has(lk)) return;
          const rs = a.readings[i];
          if (ignore.has(lk) || ignore.has(t.fold)
            || rs.some((r) => ignore.has(r.headwordId) || ignore.has(r.nodeId))) return;
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
          if (rs.some((r) => timeline.isReadingAvailable(r, m.position))) return;
          markWord(a, t, lk);
          const heads = [...new Set(rs.map((r) => r.headwordId))];
          const laters = heads.map((h) => laterNote(h, m.position)).filter((x) => x !== null);
          const taughtEarlier = heads.some((h) => timeline.isAvailable(h, m.position));
          // Name the reading the message is about: the one taught soonest after this module, else the one taught earlier.
          // A letter of the alphabet is named only when the token has no word reading.
          const letters = new Set(rs.filter((r) => r.pos === 'alphabet').map((r) => r.headwordId));
          const pick = (list) => list.find((h) => !letters.has(h)) ?? list[0];
          const soonest = heads.filter((h) => laters.length && laterNote(h, m.position) === Math.min(...laters));
          const earlier = heads.filter((h) => timeline.isAvailable(h, m.position));
          const named = pick(soonest.length ? soonest : earlier.length ? earlier : heads);
          // reason: 'later' (taught after this module), 'form' (the word is taught earlier, this form is not), 'nowhere'
          const reason = laters.length ? 'later' : taughtEarlier ? 'form' : 'nowhere';
          let tail = 'it is not taught anywhere in the course';
          if (reason === 'later') tail = taughtClause(Math.min(...laters));
          else if (reason === 'form') tail = 'the word is taught earlier, but this form is not';
          // A form gap on a word taught earlier is fixed where that form is first used, not the word.
          const formGap = !laters.length && taughtEarlier;
          const keys = formGap ? rs.filter((r) => r.via !== 'lemma').map((r) => r.nodeId) : heads;
          const useAt = keys.map((k) => first.get(k)).filter(Boolean)
            .sort((x, y) => x.position - y.position)[0];
          issues.push(issue({
            ...base, rule: 'untaught-word', nodeId: named,
            reason,
            taughtLaterAt: reason === 'later' ? at(Math.min(...laters)) : null,
            taughtEarlierAt: reason === 'form' ? at(timeline.taughtAt.get(named)) : null,
            lemma: graph.nodes.get(named)?.lemma ?? null,
            text: a.text,
            message: `"${t.surface}" is used before it is taught (${it.ref}: ${a.text}); ${tail}`,
            fix: { kind: 'teach-earlier', moduleKey: useAt?.moduleKey ?? m.moduleKey },
          }));
        });
        for (const id of a.constructions) {
          if (seenCx.has(id) || ignore.has(id) || timeline.isAvailable(id, m.position)) continue;
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
  return issues;
}
