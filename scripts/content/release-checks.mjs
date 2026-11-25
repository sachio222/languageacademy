// L's release checks that need no database (domains/curriculum.md section 3), run on a built bundle and, where a
// check needs one, the last published bundle. A bundle L would refuse fails here first. Problems are L's
// ReleaseProblem objects: { code, severity, module_key, section_id, detail }.
import { STEPS_BY_KIND } from './schema/module.mjs';
import { accessTier, canonicalJson } from './bundle.mjs';

const problem = (code, module_key, section_id, detail, severity = 'error') => ({ code, severity, module_key: module_key ?? null, section_id: section_id ?? null, detail });
const keysOf = (b) => [...b.entries.map((e) => e.module_key), ...b.shelf.pages.map((p) => p.module_key)];

function duplicates(rows, keyOf, label, out, moduleKey = () => null) {
  const seen = new Map();
  for (const row of rows) {
    const k = keyOf(row);
    if (seen.has(k)) out.push(problem('position_duplicate', moduleKey(row), null, `${label(row)} is used twice`));
    else seen.set(k, row);
  }
}

// What a learner must type or pick to be right, per item: the strings that would still mark an old answer right.
function answersOf(item) {
  const k = item.answer_key || {};
  if (Array.isArray(k.accept)) return [k.accept];
  if (Array.isArray(k.blanks)) return k.blanks.map((b) => b.accept);
  const text = Object.fromEntries((item.choices || []).map((c) => [c.choice_id, c.text]));
  if (k.correct_choice_id) return [[text[k.correct_choice_id]]];
  if (Array.isArray(k.pairs)) return [k.pairs.map((p) => `${text[p.left_id]} = ${text[p.right_id]}`)];
  return [];
}
const fold = (s) => String(s).normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
/** Same item_id, but no part of the answer is still accepted: the id now names another question (C-ID-4). */
function answerChanged(now, before) {
  const [a, b] = [answersOf(now), answersOf(before)];
  if (a.length !== b.length) return true;
  return a.some((accept, i) => {
    const old = new Set(b[i].map(fold));
    return !accept.some((x) => old.has(fold(x)));
  });
}

/**
 * @param bundle    a la-bundle@1 bundle
 * @param previous  the last published bundle, or null (then module_key_missing and item_id_reused are not checked)
 * @param opts      { warnUnits: Set of unit_keys whose story_missing is a warning: units of the written course the real
 *                  bundle does not reach yet, so a reading waiting for its story art never fails CI (final review I7) }
 */
export function releaseProblems(bundle, previous = null, { warnUnits = new Set() } = {}) {
  const out = [];
  const retired = new Set([...bundle.retired, ...(previous?.retired || [])].map((r) => r.module_key));

  // module_key_reused, module_key_missing
  for (const key of keysOf(bundle)) if (retired.has(key)) out.push(problem('module_key_reused', key, null, `${key} was retired and is in this bundle again`));
  if (previous) {
    const now = new Set(keysOf(bundle));
    for (const key of keysOf(previous))
      if (!now.has(key) && !retired.has(key)) out.push(problem('module_key_missing', key, null, `${key} is published and this bundle drops it without retiring it`));
  }

  // position_duplicate, unit_empty
  duplicates(bundle.units, (u) => u.ordinal, (u) => `unit ordinal ${u.ordinal}`, out);
  duplicates(bundle.entries, (e) => `${e.unit_key}/${e.position}`, (e) => `position ${e.position} in ${e.unit_key}`, out, (e) => e.module_key);
  for (const e of bundle.entries) duplicates(e.steps, (s) => s.ordinal, (s) => `step ordinal ${s.ordinal} of ${e.module_key}`, out, () => e.module_key);
  duplicates(bundle.shelf.pages, (p) => p.ordinal, (p) => `shelf ordinal ${p.ordinal}`, out, (p) => p.module_key);
  const used = new Set(bundle.entries.map((e) => e.unit_key));
  for (const u of bundle.units) if (!used.has(u.unit_key)) out.push(problem('unit_empty', null, null, `${u.unit_key} has no entries`));

  // story_missing
  const stories = new Set(bundle.stories.map((s) => s.story_id));
  for (const e of bundle.entries)
    if (e.kind === 'reading' && (!e.story_id || !stories.has(e.story_id)))
      out.push(
        problem('story_missing', e.module_key, 'reading-passage', e.story_id ? `story ${e.story_id} has no row in stories` : 'the reading names no story', warnUnits.has(e.unit_key) ? 'warning' : 'error'),
      );

  // section_id_invalid, estimate_invalid, access_rule_broken
  for (const e of bundle.entries) {
    const ids = e.steps.map((s) => s.section_id);
    const fixed = STEPS_BY_KIND[e.kind] || [];
    if (ids.join() !== fixed.join()) out.push(problem('section_id_invalid', e.module_key, null, `a ${e.kind} runs ${fixed.join(', ')}; ${e.module_key} has ${ids.join(', ')}`));
    for (const s of e.steps) {
      if (s.counted && !(s.estimate_minutes > 0)) out.push(problem('estimate_invalid', e.module_key, s.section_id, `counted step with ${s.estimate_minutes} minutes`));
      if (s.counted && s.soon) out.push(problem('estimate_invalid', e.module_key, s.section_id, 'a Soon step is never counted'));
      const want = accessTier(e.unit_key, s.section_id);
      if (s.access_tier !== want) out.push(problem('access_rule_broken', e.module_key, s.section_id, `${s.section_id} in ${e.unit_key} is ${s.access_tier}; the rule makes it ${want}`));
    }
  }

  // item_id_reused
  if (previous) {
    const before = new Map(previous.content.flatMap((c) => c.items.map((i) => [`${c.module_key}\u0000${i.item_id}`, i])));
    for (const c of bundle.content)
      for (const item of c.items) {
        const old = before.get(`${c.module_key}\u0000${item.item_id}`);
        if (old && answerChanged(item, old))
          out.push(problem('item_id_reused', c.module_key, null, `${item.item_id} keeps its id but no answer it accepted before is accepted now`));
      }
  }
  return out;
}

/** Module keys added, retired, moved (unit or position) and changed (entry or content) since `previous`. */
export function diffBundles(bundle, previous) {
  const rows = (b) =>
    new Map([
      ...b.entries.map((e) => [e.module_key, { place: `${e.unit_key}/${e.position}`, entry: { ...e, unit_key: undefined, position: undefined } }]),
      ...b.shelf.pages.map((p) => [p.module_key, { place: `shelf/${p.ordinal}`, entry: { ...p, ordinal: undefined } }]),
    ]);
  const [now, before] = [rows(bundle), rows(previous)];
  const contentOf = (b) => new Map(b.content.map((c) => [c.module_key, canonicalJson(c)]));
  const [cNow, cBefore] = [contentOf(bundle), contentOf(previous)];
  const wasRetired = new Set(previous.retired.map((r) => r.module_key));
  const both = [...now.keys()].filter((k) => before.has(k));
  return {
    added: [...now.keys()].filter((k) => !before.has(k)),
    retired: bundle.retired.map((r) => r.module_key).filter((k) => !wasRetired.has(k)),
    moved: both.filter((k) => now.get(k).place !== before.get(k).place),
    changed: both.filter((k) => canonicalJson(now.get(k).entry) !== canonicalJson(before.get(k).entry) || cNow.get(k) !== cBefore.get(k)),
  };
}
