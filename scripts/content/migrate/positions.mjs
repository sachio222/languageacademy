// Live positions (spec 8.4): the `id` src/lessons/lessonData.js gives each lesson, which is its 1-based index
// in getModuleConfigs(), the unit configs' modules flattened in array order, the Reference config included
// (last today, so its pages and the three guides it repeats take the numbers after Unit 12). Pure.
export function frozenPositions(unitConfigs) {
  const table = {};
  let position = 0;
  for (const cfg of unitConfigs) {
    for (const m of cfg.modules) {
      position += 1;
      if (!m || typeof m.moduleKey !== 'string' || m.moduleKey === '') throw new Error(`position ${position} has no moduleKey`);
      table[String(position)] = m.moduleKey;
    }
  }
  return table;
}

// Throws unless the table gives every built lesson its moduleKey at its id, and nothing more.
export function checkAgainstLessons(table, lessons) {
  const wrong = lessons.filter((l) => table[String(l.id)] !== l.moduleKey).map((l) => `${l.id}: ${l.moduleKey} != ${table[String(l.id)]}`);
  if (wrong.length || Object.keys(table).length !== lessons.length)
    throw new Error(`positions disagree with lessonData.js (${Object.keys(table).length} vs ${lessons.length} lessons): ${wrong.slice(0, 5).join('; ')}`);
}
