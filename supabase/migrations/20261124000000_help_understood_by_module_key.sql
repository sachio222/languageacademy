-- Data Migration: move help-screen "Understood" ticks from position numbers to permanent module keys
--
-- QuestionsHelp and VerbPatternHelp saved concept_understanding rows with module_key set to the module's position
-- in the course (e.g. '21', '31'), not its moduleKey. Inserting a module before them (the negation guide at 14)
-- changes those numbers, so the screens now save and read under the moduleKey. Each screen writes its own
-- concept_term prefix, so the prefix finds its rows under any old number:
--   questions-help-%  ->  2024-01-19-questions-help
--   verb-pattern-%    ->  2024-01-28-verb-pattern-help
-- Until this runs, the app reads these ticks by prefix (src/utils/helpUnderstanding.js), so nothing is lost.
-- Safe to run more than once. Not yet run against any database.

BEGIN;

CREATE TEMP TABLE help_term_key_mapping (
  term_prefix TEXT,
  module_key TEXT
) ON COMMIT DROP;

INSERT INTO help_term_key_mapping (term_prefix, module_key) VALUES
  ('questions-help-', '2024-01-19-questions-help'),
  ('verb-pattern-', '2024-01-28-verb-pattern-help');

-- Step 1: copy each old tick to the moduleKey. A tick already saved there wins.
INSERT INTO concept_understanding (user_id, module_key, concept_index, concept_term, understood_at)
SELECT DISTINCT ON (cu.user_id, m.module_key, cu.concept_index)
  cu.user_id, m.module_key, cu.concept_index, cu.concept_term, cu.understood_at
FROM concept_understanding cu
JOIN help_term_key_mapping m ON cu.concept_term LIKE m.term_prefix || '%'
WHERE cu.module_key <> m.module_key
ORDER BY cu.user_id, m.module_key, cu.concept_index, cu.understood_at DESC
ON CONFLICT (user_id, module_key, concept_index) DO NOTHING;

-- Step 2: remove the old copies.
DELETE FROM concept_understanding cu
USING help_term_key_mapping m
WHERE cu.concept_term LIKE m.term_prefix || '%'
  AND cu.module_key <> m.module_key;

COMMIT;

-- Verify: every tick of these two screens sits under its moduleKey
SELECT
  m.module_key,
  COUNT(*) FILTER (WHERE cu.module_key = m.module_key) AS under_module_key,
  COUNT(*) FILTER (WHERE cu.module_key <> m.module_key) AS still_under_old_number
FROM (VALUES ('questions-help-', '2024-01-19-questions-help'), ('verb-pattern-', '2024-01-28-verb-pattern-help'))
  AS m(term_prefix, module_key)
LEFT JOIN concept_understanding cu ON cu.concept_term LIKE m.term_prefix || '%'
GROUP BY m.module_key;
