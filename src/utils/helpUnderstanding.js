/**
 * Understood ticks of the help screens that used to save them under the module's position number.
 *
 * QuestionsHelp and VerbPatternHelp wrote concept_understanding rows with module_key set to the module's position
 * (lesson.id, e.g. "21"). Inserting a module before them changes that number, so the ticks would no longer load.
 * They now save under the moduleKey. Until supabase/migrations/20261124000000_help_understood_by_module_key.sql has
 * moved the old rows, they read by the screen's concept_term prefix, which only that screen writes, so a tick saved
 * under any old number still loads.
 */

// moduleKey -> concept_term prefix the screen writes
export const LEGACY_HELP_TERMS = {
  '2024-01-19-questions-help': 'questions-help-',
  '2024-01-28-verb-pattern-help': 'verb-pattern-',
};

// The concept_index of every tick this learner saved with the screen's prefix, under any module_key.
export async function loadUnderstoodByTerm(client, userId, termPrefix) {
  const { data, error } = await client
    .from('concept_understanding')
    .select('concept_index, concept_term')
    .eq('user_id', userId)
    .like('concept_term', `${termPrefix}%`);
  if (error) throw error;
  return new Set((data ?? []).map((row) => row.concept_index));
}

// Deletes the copies of one card's tick saved under an old position number, so an unticked card stays unticked.
export async function clearLegacyTerm(client, userId, moduleKey, conceptTerm) {
  const { error } = await client
    .from('concept_understanding')
    .delete()
    .eq('user_id', userId)
    .eq('concept_term', conceptTerm)
    .neq('module_key', moduleKey);
  if (error) throw error;
}

// Deletes every tick of one of these screens under an old position number (the module's Reset).
export async function clearLegacyTerms(client, userId, moduleKey) {
  const prefix = LEGACY_HELP_TERMS[moduleKey];
  if (!prefix) return;
  const { error } = await client
    .from('concept_understanding')
    .delete()
    .eq('user_id', userId)
    .like('concept_term', `${prefix}%`)
    .neq('module_key', moduleKey);
  if (error) throw error;
}
