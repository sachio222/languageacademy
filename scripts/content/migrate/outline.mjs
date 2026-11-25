// The course outline (spec 5.1) written from today's unit configs (src/lessons/modules/*/unit-config.js).
// Pure: takes the evaluated unitConfigs array, reads no files. run.mjs writes the result to content/fr/course.json.
import { OUTLINE_SCHEMA } from '../outline.mjs';

// Can-do lines per unit, copied once from prototype L (prototypes/l/j-plan.js, `var CAN_DO`, line 15 on
// 2026-11-25; the L build spec cites it as line 27). L's `NAME` (the prototype learner) is written as {name},
// the bundle's marker for the learner's preferred name. `can` + `more` is L's full sentence (j-plan.js reads
// `lower + more`); `head` is the short form; `fr` the French example. Never imported from the vault at run time:
// migrate-outline.test.mjs compares this copy with j-plan.js when the vault is on the machine.
export const CAN_DO = {
  1: { can: 'introduce yourself, say who has what and join two ideas', more: ' with {et} and {mais}', head: 'introduce yourself', fr: 'Je suis {name}. J’ai un chat. Je suis fatiguée, mais contente.' },
  2: { can: 'ask simple questions, point at things and say what you want and can do', head: 'ask simple questions', fr: 'Qu’est-ce que c’est ? Je veux ça. Je peux venir.' },
  3: { can: 'say where you are going and coming from, and whose things are whose', head: 'say where you are going', fr: 'Je viens de Denver. C’est le mien.' },
  4: { can: 'ask the price, say what you do and do not do, and say when and where', head: 'ask the price', fr: 'C’est combien ? Je ne parle pas bien.' },
  5: { can: 'order a coffee, say what food you like and what you ate', head: 'order a coffee', fr: 'Je voudrais un café, s’il vous plaît. J’aime le fromage.' },
  6: { can: 'order a meal, ask for the bill and say what you need', head: 'order a meal', fr: 'Je prends le poulet. L’addition, s’il vous plaît. J’ai besoin de…' },
  7: { can: 'say what you know, understand, think and believe', head: 'say what you think', fr: 'Je sais. Je comprends. Je pense que oui.' },
  8: { can: 'describe your day and tell people what to do', head: 'describe your day', fr: 'Je me lève à sept heures. Venez !' },
  9: { can: 'tell someone what you did last weekend', head: 'tell someone about your weekend', fr: 'Samedi, je suis allé au marché. Il faisait beau.' },
  10: { can: 'say what has to happen, what you hope and what you regret', head: 'say what you hope and regret', fr: 'Il faut que je parte. Si j’avais su…' },
  11: { can: 'give your age, ask the way and follow directions', head: 'ask the way', fr: 'J’ai trente-cinq ans. Où est la gare ? Tournez à gauche.' },
  12: { can: 'ask any question, casual or formal, including polite indirect ones', head: 'ask any question', fr: 'Je me demande pourquoi. Peux-tu me dire où… ?' },
};

// "Unit 1: Essential Grammar" -> "Essential Grammar". The outline never names a position (position_word).
const UNIT_PREFIX = /^Unit\s+\d+\s*:\s*/;

const keyOf = (m, where) => {
  if (!m || typeof m.moduleKey !== 'string' || m.moduleKey === '') throw new Error(`${where}: a module has no moduleKey`);
  return m.moduleKey;
};

// unitConfigs: today's array from src/lessons/unitConfigLoader.js, numbered units then the Reference config.
// opensWords: the Reference pages whose words the checker treats as known (curriculum-graph/core/settings.json
// reference.modules today). Returns { outline, report }; report lines name every change from today's configs.
export function outlineFromUnitConfigs(unitConfigs, { opensWords = [] } = {}) {
  const report = [];
  const units = [];
  const unitOfKey = new Map(); // module_key -> unit_key
  let reference = null;

  for (const cfg of unitConfigs) {
    const meta = cfg.metadata || {};
    if (meta.isReference) {
      if (reference) throw new Error('two unit configs are marked isReference');
      reference = cfg;
      continue;
    }
    if (!Number.isInteger(meta.id) || meta.id < 1) throw new Error(`unit config "${meta.title}" has no numeric metadata.id`);
    const unit_key = `unit${meta.id}`;
    if (units.some((u) => u.unit_key === unit_key)) throw new Error(`${unit_key} appears twice`);
    const can = CAN_DO[meta.id];
    if (!can) throw new Error(`${unit_key} has no can-do line in CAN_DO`);
    const name = String(meta.title || '').replace(UNIT_PREFIX, '');
    if (name !== meta.title) report.push(`${unit_key}: name "${name}" from title "${meta.title}" (position prefix dropped)`);
    const entries = cfg.modules.map((m, i) => keyOf(m, `${unit_key} module ${i + 1}`));
    for (const key of entries) {
      if (unitOfKey.has(key)) throw new Error(`${key} is listed in ${unitOfKey.get(key)} and ${unit_key}`);
      unitOfKey.set(key, unit_key);
    }
    units.push({
      unit_key,
      name,
      description: meta.description,
      can_do: can.can + (can.more || ''),
      can_do_short: can.head,
      can_do_example_fr: can.fr,
      theme: { icon: meta.icon, color: meta.color },
      entries,
    });
  }
  if (!reference) throw new Error('no unit config is marked isReference');

  // The Reference unit becomes the shelf. Guides it lists are linked on the shelf automatically (spec 5.1, 6),
  // so they leave shelf.pages and stay in the unit that teaches them.
  const pages = [];
  for (const [i, m] of reference.modules.entries()) {
    const key = keyOf(m, `Reference module ${i + 1}`);
    if (m.isHelpModule) {
      if (!unitOfKey.has(key)) throw new Error(`guide ${key} is on the Reference shelf but in no unit; it needs a unit`);
      report.push(`shelf: guide ${key} taken off the shelf list (taught in ${unitOfKey.get(key)}; guides are linked on the shelf automatically)`);
      continue;
    }
    if (unitOfKey.has(key)) throw new Error(`Reference page ${key} is also listed in ${unitOfKey.get(key)}`);
    if (pages.includes(key)) throw new Error(`Reference page ${key} is listed twice`);
    pages.push(key);
  }
  const rm = reference.metadata;
  report.push(`shelf: the Reference unit's title "${rm.title}", description, icon ${rm.icon} and color ${rm.color} have no place in the outline and were dropped`);
  for (const key of opensWords) if (!pages.includes(key)) throw new Error(`opens_words: ${key} is not a shelf page`);

  return {
    outline: {
      schema: OUTLINE_SCHEMA,
      language: 'fr',
      native: 'en',
      units,
      shelf: { pages, opens_words: [...opensWords] },
      retired: [],
    },
    report,
  };
}

// Where each key sits in an outline: 'unit3', 'shelf' or 'retired', one place per listing.
function placesOf(outline) {
  const at = new Map();
  const add = (key, where) => at.set(key, [...(at.get(key) || []), where]);
  for (const u of outline.units || []) for (const k of u.entries || []) add(k, u.unit_key);
  for (const k of outline.shelf?.pages || []) add(k, 'shelf');
  for (const r of outline.retired || []) add(r.module_key, 'retired');
  return at;
}

// The written outline against today's configs (spec 8.2 item 2). `generated` is outlineFromUnitConfigs' outline.
// A problem is a config key that the outline lacks, lists more than once, or puts in a different unit (or on
// or off the shelf) from its config. A retired key counts as placed. Units, entries and shelf pages that are
// not in the configs (new guides, unit13 onward) are hand edits and never a problem.
export function checkOutline(existing, generated) {
  const at = placesOf(existing);
  const problems = [];
  for (const [key, want] of placesOf(generated)) {
    const got = at.get(key) || [];
    if (got.length === 0) problems.push({ code: 'config_key_missing', key, detail: `${key} (${want[0]} in today's configs) is not in the outline` });
    else if (got.length > 1) problems.push({ code: 'config_key_twice', key, detail: `${key} is listed ${got.length} times (${got.join(', ')})` });
    else if (got[0] !== want[0] && got[0] !== 'retired')
      problems.push({ code: 'config_key_moved', key, detail: `${key} is in ${got[0]} but today's configs put it in ${want[0]}` });
  }
  return problems;
}

// Keeps every hand edit in `existing` and adds only what is missing: a config key the outline lacks goes after
// its nearest config neighbour already in that list (else before the next one, else first), and a unit the
// outline lacks goes after the unit before it in the configs. Moved and doubled keys are left as they are;
// checkOutline reports them. Returns { outline, report }.
export function mergeOutline(existing, generated) {
  const out = JSON.parse(JSON.stringify(existing));
  const report = [];
  const at = placesOf(out);
  const insert = (list, want, key, label) => {
    const i = want.indexOf(key);
    const before = want.slice(0, i).reverse().find((k) => list.includes(k));
    const after = want.slice(i + 1).find((k) => list.includes(k));
    const pos = before !== undefined ? list.indexOf(before) + 1 : after !== undefined ? list.indexOf(after) : 0;
    list.splice(pos, 0, key);
    report.push(`${label}: inserted ${key} ${before !== undefined ? `after ${before}` : after !== undefined ? `before ${after}` : 'first'}`);
  };
  out.units = out.units || [];
  generated.units.forEach((g, gi) => {
    const missing = g.entries.filter((k) => !at.has(k));
    let unit = out.units.find((u) => u.unit_key === g.unit_key);
    if (!unit) {
      if (missing.length === 0) return;
      unit = { ...g, entries: [...missing] };
      const prev = generated.units.slice(0, gi).reverse().map((p) => out.units.findIndex((u) => u.unit_key === p.unit_key)).find((i) => i !== -1);
      out.units.splice(prev === undefined ? 0 : prev + 1, 0, unit);
      report.push(`${g.unit_key}: unit added from today's configs with ${missing.length} entries`);
      return;
    }
    unit.entries = unit.entries || [];
    for (const k of missing) insert(unit.entries, g.entries, k, g.unit_key);
  });
  out.shelf = out.shelf || { pages: [], opens_words: [] };
  out.shelf.pages = out.shelf.pages || [];
  for (const k of generated.shelf.pages) if (!at.has(k)) insert(out.shelf.pages, generated.shelf.pages, k, 'shelf');
  return { outline: out, report };
}
