-- Fix ALL wrong module_keys by consolidating duplicates to the correct ones
-- Use the actual module definitions as source of truth

-- Create temp table with correct mappings (from actual module files)
CREATE TEMP TABLE correct_module_mappings (
  wrong_key TEXT,
  correct_key TEXT
);

-- Insert all the corrections needed
INSERT INTO correct_module_mappings (wrong_key, correct_key) VALUES
  -- Fix avoir duplicates → 2024-01-04-avoir (from avoir.js)
  ('2024-01-03-avoir', '2024-01-04-avoir'),
  
  -- Fix articles duplicates → 2024-01-05-articles (from articles.js)  
  ('2024-01-04-articles', '2024-01-05-articles'),
  
  -- Fix basic-nouns duplicates → 2024-01-06-basic-nouns (from basic-nouns.js)
  ('2024-01-05-basic-nouns', '2024-01-06-basic-nouns'),
  
  -- Fix plurals duplicates → 2024-01-07-plurals (from plurals.js)
  ('2024-01-06-plurals', '2024-01-07-plurals'),
  
  -- Fix connectors duplicates → 2024-01-08-connectors (from connectors.js)
  ('2024-01-07-connectors', '2024-01-08-connectors'),
  
  -- Fix reading1 duplicates → 2024-01-09-reading1 (from reading-1.js)
  ('2024-01-08-reading1', '2024-01-09-reading1'),
  
  -- Fix unit1-practice duplicates → 2024-01-10-unit1-practice
  ('2024-01-09-unit1-practice', '2024-01-10-unit1-practice'),
  
  -- Fix unit1-exam duplicates → 2024-01-11-unit1-exam
  ('2024-01-10-unit1-exam', '2024-01-11-unit1-exam'),
  
  -- Fix demonstratives duplicates → 2024-01-12-demonstratives
  ('2024-01-11-demonstratives', '2024-01-12-demonstratives'),
  
  -- Fix ca-survival duplicates → 2024-01-13-ca-survival
  ('2024-01-12-ca-survival', '2024-01-13-ca-survival'),
  
  -- Fix vouloir → 2024-01-14-vouloir (from vouloir.js)
  ('2024-01-15-vouloir', '2024-01-14-vouloir'),
  
  -- Fix pouvoir → 2024-01-15-pouvoir (from pouvoir.js)
  ('2024-01-15-pouvoir', '2024-01-15-pouvoir'), -- This one might be correct
  
  -- Fix voir → 2024-01-16-voir (from voir.js)
  ('2024-01-17-voir', '2024-01-16-voir'),
  
  -- Fix questions → 2024-01-17-questions (from questions.js)
  ('2024-01-18-questions', '2024-01-17-questions'),
  
  -- Fix questions-help → 2024-01-18-questions-help (from questions-help.js)
  ('2024-01-19-questions-help', '2024-01-18-questions-help'),
  
  -- Fix stressed-pronouns → 2024-01-18-stressed-pronouns (from stressed-pronouns.js)
  ('2024-01-19-stressed-pronouns', '2024-01-18-stressed-pronouns'),
  
  -- Fix prepositions → 2024-01-19-prepositions (from prepositions.js)
  ('2024-01-20-prepositions', '2024-01-19-prepositions'),
  
  -- Fix adjectives → 2024-01-20-adjectives (from adjectives.js)
  ('2024-01-21-adjectives', '2024-01-20-adjectives'),
  
  -- Fix reading2 → 2024-01-21-reading2 (from reading-2.js)
  ('2024-01-22-reading2', '2024-01-21-reading2'),
  
  -- Fix unit2-practice → 2024-01-22-unit2-practice
  ('2024-01-23-unit2-practice', '2024-01-22-unit2-practice'),
  
  -- Fix unit2-exam → 2024-01-23-unit2-exam
  ('2024-01-24-unit2-exam', '2024-01-23-unit2-exam'),
  
  -- Fix contractions → 2024-01-24-contractions (from contractions.js)
  ('2024-01-25-contractions', '2024-01-24-contractions'),
  
  -- Fix venir duplicates → 2024-01-25-venir (from venir.js)
  ('2024-01-25-venir', '2024-01-25-venir'), -- Keep this one
  ('2024-01-26-venir', '2024-01-25-venir'),
  
  -- Fix aller → 2024-01-26-aller (from aller.js)
  ('2024-01-27-aller', '2024-01-26-aller'),
  
  -- Fix verb-pattern-help duplicates → 2024-01-27-verb-pattern-help
  ('2024-01-27-verb-pattern-help', '2024-01-27-verb-pattern-help'), -- Keep this one
  ('2024-01-28-verb-pattern-help', '2024-01-27-verb-pattern-help'),
  
  -- Fix partir duplicates → 2024-01-28-partir (from partir.js)
  ('2024-01-28-partir', '2024-01-28-partir'), -- Keep this one
  ('2024-01-29-partir', '2024-01-28-partir'),
  
  -- Fix object-pronouns → 2024-01-29-object-pronouns (from object-pronouns.js)
  ('2024-01-29-object-pronouns', '2024-01-29-object-pronouns'), -- Keep this one
  
  -- Fix possessive-adjectives → 2024-01-30-possessive-adjectives
  ('2024-01-30-possessive-adjectives', '2024-01-30-possessive-adjectives'), -- Keep this one
  
  -- Fix combining duplicates → 2024-01-31-combining (from combining.js)
  ('2024-02-01-combining', '2024-01-31-combining'),
  ('2024-02-02-combining', '2024-01-31-combining'),
  
  -- Fix reading3 duplicates → 2024-02-01-reading3 (from reading-3.js)
  ('2024-02-02-reading3', '2024-02-01-reading3'),
  ('2024-02-03-reading3', '2024-02-01-reading3'),
  
  -- Fix unit3-practice duplicates → 2024-02-02-unit3-practice
  ('2024-02-04-unit3-practice', '2024-02-02-unit3-practice'),
  
  -- Fix unit3-exam duplicates → 2024-02-03-unit3-exam
  ('2024-02-04-unit3-exam', '2024-02-03-unit3-exam'),
  ('2024-02-05-unit3-exam', '2024-02-03-unit3-exam'),
  
  -- Fix survival-phrases → 2024-02-04-survival-phrases (from survival-phrases.js)
  ('2024-02-05-survival-phrases', '2024-02-04-survival-phrases'),
  
  -- Fix module 170 → 2024-01-07-liaison-help (Reference X: French Flow - Liaison Help)
  ('170', '2024-01-07-liaison-help'),
  
  -- Fix old liaison-help duplicates → 2024-01-07-liaison-help
  ('2024-10-20-liaison-help', '2024-01-07-liaison-help'),
  
  -- Fix old cognates-help duplicates → 2024-01-06-cognates-help
  ('2024-10-21-cognates-help', '2024-01-06-cognates-help');

-- Now apply all the fixes with merging for duplicates
DO $$
DECLARE
  mapping RECORD;
  merged_count INTEGER := 0;
  updated_count INTEGER := 0;
BEGIN
  FOR mapping IN SELECT wrong_key, correct_key FROM correct_module_mappings LOOP
    -- Check if we need to merge (both wrong and correct keys exist)
    IF EXISTS (
      SELECT 1 FROM module_progress 
      WHERE module_key = mapping.wrong_key
    ) AND EXISTS (
      SELECT 1 FROM module_progress 
      WHERE module_key = mapping.correct_key
    ) THEN
      -- Merge the data
      WITH old_data AS (
        SELECT * FROM module_progress WHERE module_key = mapping.wrong_key
      )
      UPDATE module_progress mp_new
      SET
        started_at = LEAST(mp_new.started_at, old.started_at),
        completed_at = GREATEST(mp_new.completed_at, old.completed_at),
        time_spent_seconds = COALESCE(mp_new.time_spent_seconds, 0) + COALESCE(old.time_spent_seconds, 0),
        total_exercises = GREATEST(COALESCE(mp_new.total_exercises, 0), COALESCE(old.total_exercises, 0)),
        completed_exercises = GREATEST(COALESCE(mp_new.completed_exercises, 0), COALESCE(old.completed_exercises, 0)),
        study_mode_completed = COALESCE(mp_new.study_mode_completed, false) OR COALESCE(old.study_mode_completed, false),
        exam_score = GREATEST(COALESCE(mp_new.exam_score, 0), COALESCE(old.exam_score, 0)),
        attempts_count = COALESCE(mp_new.attempts_count, 0) + COALESCE(old.attempts_count, 0)
      FROM old_data old
      WHERE mp_new.module_key = mapping.correct_key
        AND mp_new.user_id = old.user_id;
      
      -- Delete the old row
      DELETE FROM module_progress WHERE module_key = mapping.wrong_key;
      merged_count := merged_count + 1;
      
    ELSIF EXISTS (
      SELECT 1 FROM module_progress WHERE module_key = mapping.wrong_key
    ) THEN
      -- Simple update (no conflict)
      UPDATE module_progress 
      SET module_key = mapping.correct_key
      WHERE module_key = mapping.wrong_key;
      updated_count := updated_count + 1;
    END IF;
  END LOOP;
  
  RAISE NOTICE 'Merged % duplicate entries', merged_count;
  RAISE NOTICE 'Updated % non-conflicting entries', updated_count;
  
  -- Also fix other tables
  UPDATE exercise_completions 
  SET module_key = cm.correct_key
  FROM correct_module_mappings cm
  WHERE exercise_completions.module_key = cm.wrong_key;

  UPDATE section_progress 
  SET module_key = cm.correct_key
  FROM correct_module_mappings cm
  WHERE section_progress.module_key = cm.wrong_key;

  -- Refresh the materialized view
  REFRESH MATERIALIZED VIEW mv_student_progress_summary;

  RAISE NOTICE 'All module_key corrections applied and duplicates merged!';
END $$;

-- Final verification
SELECT 
  'After cleanup:' as status,
  COUNT(DISTINCT module_key) as unique_module_keys,
  COUNT(*) as total_progress_records
FROM module_progress;
