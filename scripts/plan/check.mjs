// plan:check, the whole-course check of a course plan. A pure function over the plan and what it is checked against,
// so the same rules hold for every language.
//
// checkPlan({ plan, limits, lookups, taughtAt, isAvailable, position, written, reached, previous }) -> { problems, report }
//   limits      the sizes a module may have (limits.mjs), read from the language's recipes
//   lookups     { headwords, forms, constructions }: Map<id, node> of the language's graph
//   taughtAt    Map<id, position>: what the written course teaches (the base timeline), words and constructions
//   isAvailable (id, position) => boolean on the projected timeline: known at or before that position
//   position    Map<module_key, position> of the plan's modules; a module with no position is written and is skipped
//   written     Set<module_key> of written modules
//   reached     { level: position | null }: where the course with the plan reaches each level
//   previous    an earlier version of the plan, or null: nothing it taught may be missing now
// problems: [{ code, where, message }], empty when the plan holds. report: what the plan amounts to (counts, where each
// level is reached, each unit's size).
//
// Rules:
//   key_repeated, unit_repeated        a module_key or unit_key appears twice
//   teaches_in_test                    a practice set or unit exam lists what it teaches; a reading lists constructions
//   word_twice                         a word is taught by two modules
//   word_already_taught                a word the written course already teaches
//   word_unknown, construction_unknown an id that is not in the graph (a word may be in words_to_add instead)
//   word_to_add_unplaced               a words_to_add entry its module does not teach
//   word_to_add_exists                 a words_to_add entry that is a headword now and should leave the list
//   construction_order                 a pattern taught, practised or required before what it needs is known
//   lesson_words_over, table_words_over, minutes_over, exam_items_over, exam_minutes_over, guides_over   sizes
//   level_late                         a level reached after the unit the plan names, or never
//   word_dropped                       a word the previous plan taught that no module teaches now
import { planModules, schemaProblems, TEACHES } from './plan.mjs';

const problem = (code, where, message) => ({ code, where, message });

export function checkPlan({ plan, limits, lookups, taughtAt, isAvailable, position, written = new Set(), reached = {}, previous = null }) {
  const problems = schemaProblems(plan).map((m) => problem('schema', 'course-plan.json', m));
  if (problems.length) return { problems, report: null };

  const all = planModules(plan);
  const open = all.filter(({ module }) => !written.has(module.module_key));
  const lemma = (id) => lookups.headwords.get(id)?.lemma ?? toAdd.get(id)?.lemma ?? id;
  const toAdd = new Map((plan.words_to_add ?? []).map((w) => [w.id, w]));

  // keys
  const seenKeys = new Set();
  for (const { module } of all) {
    if (seenKeys.has(module.module_key)) problems.push(problem('key_repeated', module.module_key, 'this module_key appears twice'));
    seenKeys.add(module.module_key);
  }
  const seenUnits = new Set();
  for (const unit of plan.units) {
    if (seenUnits.has(unit.unit_key)) problems.push(problem('unit_repeated', unit.unit_key, 'this unit_key appears twice'));
    seenUnits.add(unit.unit_key);
  }

  // every word once
  const taughtBy = new Map();
  for (const { unit, module } of open) {
    const key = module.module_key;
    const may = TEACHES[module.kind];
    for (const field of ['words', 'constructions']) {
      if (!may.includes(field) && module.teaches[field].length) {
        problems.push(problem('teaches_in_test', key, `a ${module.kind} teaches no ${field}, and this one lists ${module.teaches[field].length}`));
      }
    }
    for (const id of module.teaches.words) {
      if (taughtBy.has(id)) problems.push(problem('word_twice', key, `${lemma(id)} (${id}) is already taught by ${taughtBy.get(id)}`));
      else taughtBy.set(id, key);
      if (taughtAt.has(id)) problems.push(problem('word_already_taught', key, `${lemma(id)} (${id}) is taught by the written course, at position ${taughtAt.get(id)}`));
      if (!lookups.headwords.has(id) && !lookups.forms.has(id) && !toAdd.has(id)) {
        problems.push(problem('word_unknown', key, `${id} is not in the graph and not in words_to_add`));
      }
    }
    const at = position.get(key);
    const known = (id) => isAvailable(id, at);
    for (const id of module.teaches.constructions) {
      const cx = lookups.constructions.get(id);
      if (!cx) {
        problems.push(problem('construction_unknown', key, `${id} is not in the graph`));
        continue;
      }
      for (const need of cx.needs ?? []) {
        if (!known(need)) problems.push(problem('construction_order', key, `${id} needs ${need}, which nothing teaches by then`));
      }
    }
    for (const [field, ids] of [['practises', module.practises ?? []], ['reading.must_use', module.reading?.must_use ?? []]]) {
      for (const id of ids) {
        if (!lookups.constructions.has(id)) problems.push(problem('construction_unknown', key, `${field}: ${id} is not in the graph`));
        else if (!known(id)) problems.push(problem('construction_order', key, `${field}: ${id} is not taught by then`));
      }
    }
    // sizes
    const words = module.teaches.words.length;
    if (module.kind === 'lesson' && words > limits.lesson_words) {
      problems.push(problem('lesson_words_over', key, `${words} new words; a lesson holds at most ${limits.lesson_words}`));
    }
    if (module.kind === 'reading' && words > limits.table_words) {
      problems.push(problem('table_words_over', key, `${words} table words; a reading's table holds at most ${limits.table_words}`));
    }
    const maxMinutes = module.kind === 'unit_exam' ? limits.exam_minutes : limits.minutes;
    if (module.minutes > maxMinutes) {
      problems.push(problem(module.kind === 'unit_exam' ? 'exam_minutes_over' : 'minutes_over', key, `${module.minutes} minutes; the limit is ${maxMinutes}`));
    }
    if (module.kind === 'unit_exam' && module.exam.items > limits.exam_items) {
      problems.push(problem('exam_items_over', key, `${module.exam.items} items; a unit exam holds at most ${limits.exam_items}`));
    }
    void unit;
  }
  for (const unit of plan.units) {
    const guides = unit.modules.filter((m) => m.kind === 'guide').length;
    if (guides > limits.guides) problems.push(problem('guides_over', unit.unit_key, `${guides} guides; a unit holds at most ${limits.guides}`));
  }

  // words to add
  for (const w of toAdd.values()) {
    if (taughtBy.get(w.id) !== w.module_key && !written.has(w.module_key)) {
      problems.push(problem('word_to_add_unplaced', w.module_key, `${w.lemma} (${w.id}) is in words_to_add for this module, which does not teach it`));
    }
    if (lookups.headwords.has(w.id)) problems.push(problem('word_to_add_exists', w.module_key, `${w.lemma} (${w.id}) is a headword now; take it out of words_to_add`));
  }

  // levels
  const unitOf = new Map(all.map(({ unit, module }) => [module.module_key, unit.unit_key]));
  const keyAt = new Map([...position].map(([key, p]) => [p, key]));
  const unitOrder = new Map(plan.units.map((u, i) => [u.unit_key, i]));
  const levels = {};
  for (const [level, at] of Object.entries(reached)) {
    const key = at == null ? null : keyAt.get(at) ?? null;
    const unit = key ? plan.units.find((u) => u.unit_key === unitOf.get(key)) : null;
    const teaching = unit ? unit.modules.filter((m) => m.kind === 'lesson' || m.kind === 'guide').map((m) => m.module_key) : [];
    levels[level] = at == null
      ? { reached: false }
      : { reached: true, position: at, unit_key: unit?.unit_key ?? null, module_key: key, in_written_course: key === null,
          teaching_module: key && teaching.includes(key) ? teaching.indexOf(key) + 1 : null, of: teaching.length };
  }
  for (const [level, by] of Object.entries(plan.levels ?? {})) {
    const got = levels[level];
    if (!unitOrder.has(by)) problems.push(problem('level_late', by, `levels.${level} names ${by}, which is not a unit of the plan`));
    else if (!got?.reached) problems.push(problem('level_late', by, `${level} is not reached by the end of the plan`));
    else if (!got.in_written_course && unitOrder.get(got.unit_key) > unitOrder.get(by)) {
      problems.push(problem('level_late', by, `${level} is reached in ${got.unit_key}, after ${by}`));
    }
  }

  // nothing dropped
  if (previous) {
    const before = new Set(planModules(previous).flatMap(({ module }) => module.teaches.words));
    for (const id of before) {
      if (!taughtBy.has(id) && !taughtAt.has(id)) problems.push(problem('word_dropped', 'course-plan.json', `${lemma(id)} (${id}) was in the plan before and no module teaches it now`));
    }
  }

  const count = (kind) => open.filter(({ module }) => module.kind === kind).length;
  const report = {
    units: plan.units.length,
    modules: open.length,
    by_kind: Object.fromEntries(Object.keys(TEACHES).map((k) => [k, count(k)])),
    words: taughtBy.size,
    words_to_add: toAdd.size,
    first_position: open.length ? Math.min(...open.map(({ module }) => position.get(module.module_key))) : null,
    last_position: open.length ? Math.max(...open.map(({ module }) => position.get(module.module_key))) : null,
    levels,
    by_unit: plan.units.map((u) => ({
      unit_key: u.unit_key,
      lessons: u.modules.filter((m) => m.kind === 'lesson').length,
      guides: u.modules.filter((m) => m.kind === 'guide').length,
      words: u.modules.reduce((n, m) => n + m.teaches.words.length, 0),
    })),
  };
  return { problems, report };
}
