-- Data Migration: Convert numeric module_key values to proper permanent keys
-- This fixes legacy data where module IDs were stored instead of module keys

-- Step 1: Create a temporary mapping table from the moduleIdMapping
CREATE TEMP TABLE module_id_key_mapping (
  old_id TEXT,
  module_key TEXT
);

-- Insert all known mappings (from moduleIdMapping.js)
INSERT INTO module_id_key_mapping (old_id, module_key) VALUES
  -- Unit 1
  ('1', '2024-01-01-famous-words'),
  ('2', '2024-01-01-pronouns'),
  ('3', '2024-01-02-etre'),
  ('4', '2024-01-03-avoir'),
  ('5', '2024-01-04-articles'),
  ('6', '2024-01-06-cognates-help'),
  ('7', '2024-01-05-basic-nouns'),
  ('8', '2024-01-06-plurals'),
  ('9', '2024-01-07-liaison-help'),
  ('10', '2024-01-07-connectors'),
  ('11', '2024-01-08-reading1'),
  ('12', '2024-01-09-unit1-practice'),
  ('13', '2024-01-10-unit1-exam'),
  
  -- Unit 2
  ('14', '2024-01-11-demonstratives'),
  ('15', '2024-01-12-ca-survival'),
  ('16', '2024-01-13-determiners-nouns'),
  ('17', '2024-01-14-vouloir'),
  ('18', '2024-01-15-pouvoir'),
  ('19', '2024-01-16-voir'),
  ('20', '2024-01-17-questions'),
  ('21', '2024-01-18-stressed-pronouns'),
  ('22', '2024-01-19-prepositions'),
  ('23', '2024-01-20-adjectives'),
  ('24', '2024-01-21-reading2'),
  ('25', '2024-01-22-unit2-practice'),
  ('26', '2024-01-23-unit2-exam'),
  
  -- Unit 3
  ('27', '2024-01-24-contractions'),
  ('28', '2024-01-25-venir'),
  ('29', '2024-01-26-aller'),
  ('30', '2024-01-27-verb-pattern-help'),
  ('31', '2024-01-28-partir'),
  ('32', '2024-01-29-object-pronouns'),
  ('33', '2024-01-30-possessive-adjectives'),
  ('34', '2024-01-31-possessive-pronouns'),
  ('35', '2024-02-01-combining'),
  ('36', '2024-02-02-reading3'),
  ('37', '2024-02-03-unit3-practice'),
  ('38', '2024-02-04-unit3-exam'),
  
  -- Unit 4
  ('39', '2024-02-05-survival-phrases'),
  ('40', '2024-02-06-faire'),
  ('41', '2024-02-07-devoir'),
  ('42', '2024-02-08-parler'),
  ('43', '2024-02-09-chercher-trouver'),
  ('44', '2024-02-10-negation'),
  ('45', '2024-02-11-time-frequency'),
  ('46', '2024-02-12-location'),
  ('47', '2024-02-13-reading4'),
  ('48', '2024-02-14-unit4-practice'),
  ('49', '2024-02-15-unit4-exam'),
  
  -- Unit 5
  ('50', '2024-02-16-comparisons'),
  ('51', '2024-02-17-slang'),
  ('52', '2024-02-18-conditionals-should-could'),
  ('53', '2024-02-19-conditionals-would'),
  ('54', '2024-02-20-past-etre'),
  ('55', '2024-02-21-past-avoir'),
  ('56', '2024-02-22-aimer'),
  ('57', '2024-02-23-manger'),
  ('58', '2024-02-24-boire'),
  ('59', '2024-02-25-food'),
  ('60', '2024-02-26-reading5'),
  ('61', '2024-02-27-unit5-practice'),
  ('62', '2024-02-28-unit5-exam'),
  
  -- Unit 6
  ('63', '2024-03-01-progressive-tenses'),
  ('64', '2024-03-02-near-future'),
  ('65', '2024-03-03-future-tense'),
  ('66', '2024-03-04-dire'),
  ('67', '2024-03-05-prendre'),
  ('68', '2024-03-06-donner'),
  ('69', '2024-03-07-mettre'),
  ('70', '2024-03-08-demander'),
  ('71', '2024-03-09-commander'),
  ('72', '2024-03-10-avoir-besoin'),
  ('73', '2024-03-11-nouns-family'),
  ('74', '2024-03-12-nouns-time'),
  ('75', '2024-03-13-reading6'),
  ('76', '2024-03-14-unit6-practice'),
  ('77', '2024-03-15-unit6-exam'),
  
  -- Unit 7
  ('78', '2024-03-16-pronoun-on'),
  ('79', '2024-03-17-comprendre'),
  ('80', '2024-03-18-savoir'),
  ('81', '2024-03-19-connaitre'),
  ('82', '2024-03-20-penser'),
  ('83', '2024-03-21-croire'),
  ('84', '2024-03-22-learning-verbs'),
  ('85', '2024-03-23-knowledge-nouns'),
  ('86', '2024-03-24-discourse-markers'),
  ('87', '2024-03-25-modifiers'),
  ('88', '2024-03-26-reading7'),
  ('89', '2024-03-27-unit7-practice'),
  ('90', '2024-03-28-unit7-exam'),
  
  -- Unit 8
  ('91', '2024-03-29-temporal-sequential'),
  ('92', '2024-03-30-reflexive-pronouns'),
  ('93', '2024-03-31-sappeler'),
  ('94', '2024-04-01-morning-routine'),
  ('95', '2024-04-02-daily-reflexive'),
  ('96', '2024-04-03-reflexive-past'),
  ('97', '2024-04-04-reciprocal'),
  ('98', '2024-04-05-commands'),
  ('99', '2024-04-06-reading8'),
  ('100', '2024-04-07-unit8-practice'),
  ('101', '2024-04-08-unit8-exam'),
  
  -- Unit 9
  ('102', '2024-04-09-causal-reason'),
  ('103', '2024-04-10-spatial-prepositions'),
  ('104', '2024-04-11-passe-compose-regular'),
  ('105', '2024-04-12-passe-compose-irregular'),
  ('106', '2024-04-13-passe-compose-etre'),
  ('107', '2024-04-14-imparfait'),
  ('108', '2024-04-15-pc-vs-imparfait'),
  ('109', '2024-04-16-reading9'),
  ('110', '2024-04-17-unit9-practice'),
  ('111', '2024-04-18-unit9-exam'),
  
  -- Unit 10
  ('112', '2024-05-01-special-forms'),
  ('113', '2024-05-02-necessity-phrases'),
  ('114', '2024-05-03-wish-phrases'),
  ('115', '2024-05-04-emotion-phrases'),
  ('116', '2024-05-05-hypothetical-phrases'),
  ('117', '2024-05-06-past-regret-phrases'),
  ('118', '2024-05-07-pluperfect'),
  ('119', '2024-05-08-temporal-purpose'),
  ('120', '2024-05-09-advanced-combinations'),
  ('121', '2024-05-10-reading10'),
  ('122', '2024-05-11-unit10-practice'),
  ('123', '2024-05-12-unit10-exam'),
  
  -- Unit 11
  ('124', '2024-06-01-age-expressions'),
  ('125', '2024-06-02-donner-rank24'),
  ('126', '2024-06-03-daily-life-verbs'),
  ('127', '2024-06-04-search-find'),
  ('128', '2024-06-05-perception-verbs'),
  ('129', '2024-06-06-social-situations'),
  ('130', '2024-06-07-directions-navigation'),
  ('131', '2024-06-08-reading11'),
  ('132', '2024-06-09-unit11-practice'),
  ('133', '2024-06-10-unit11-exam'),
  
  -- Unit 12
  ('134', '2024-07-01-nature-environment'),
  ('135', '2024-03-15-questce-qui-que'),
  ('136', '2024-03-16-quiest-qui-que'),
  ('137', '2024-03-17-pourquoi-complex'),
  ('138', '2024-07-05-comment-complex'),
  ('139', '2024-07-06-formal-inversion'),
  ('140', '2024-07-07-embedded-questions'),
  ('141', '2024-07-08-complex-interrogatives'),
  ('142', '2024-07-09-reading12'),
  ('143', '2024-07-10-unit12-practice'),
  
  -- Reference
  ('144', '2024-08-01-alphabet'),
  ('145', '2024-08-02-numbers'),
  ('146', '2024-08-03-dates'),
  ('147', '2024-08-04-holidays'),
  ('148', '2024-08-05-countries'),
  ('149', '2024-08-06-language-facts'),
  ('150', '2024-08-07-colors'),
  ('151', '2024-08-08-spelling-patterns'),
  
  -- Additional mappings for any other IDs found
  ('171', '2024-01-19-questions-help'),
  ('172', '2024-02-29-reading4');

-- Step 2: Merge and clean module_progress table
DO $$
DECLARE
  merged_count INTEGER := 0;
  updated_count INTEGER := 0;
  deleted_count INTEGER := 0;
BEGIN
  -- First, merge duplicate data where BOTH numeric and proper key exist
  WITH duplicates AS (
    SELECT 
      mp_old.id as old_id,
      mp_old.user_id,
      mp_old.module_key as old_key,
      m.module_key as new_key,
      mp_new.id as new_id
    FROM module_progress mp_old
    JOIN module_id_key_mapping m ON mp_old.module_key = m.old_id
    JOIN module_progress mp_new ON mp_new.user_id = mp_old.user_id 
      AND mp_new.module_key = m.module_key
    WHERE mp_old.module_key ~ '^\d+$'
  ),
  merge_data AS (
    -- Update the proper key row with merged data
    UPDATE module_progress mp_new
    SET
      -- Take the earliest start time
      started_at = LEAST(mp_new.started_at, mp_old.started_at),
      -- Take the latest completion time (if any)
      completed_at = GREATEST(mp_new.completed_at, mp_old.completed_at),
      -- Sum the time spent
      time_spent_seconds = COALESCE(mp_new.time_spent_seconds, 0) + COALESCE(mp_old.time_spent_seconds, 0),
      -- Take the max exercises
      total_exercises = GREATEST(COALESCE(mp_new.total_exercises, 0), COALESCE(mp_old.total_exercises, 0)),
      completed_exercises = GREATEST(COALESCE(mp_new.completed_exercises, 0), COALESCE(mp_old.completed_exercises, 0)),
      -- Keep study mode completed if either is true
      study_mode_completed = COALESCE(mp_new.study_mode_completed, false) OR COALESCE(mp_old.study_mode_completed, false),
      -- Keep the best exam score
      exam_score = GREATEST(mp_new.exam_score, mp_old.exam_score),
      -- Sum attempts
      attempts_count = COALESCE(mp_new.attempts_count, 0) + COALESCE(mp_old.attempts_count, 0)
    FROM duplicates d
    JOIN module_progress mp_old ON mp_old.id = d.old_id
    WHERE mp_new.id = d.new_id
    RETURNING mp_new.id
  ),
  delete_old AS (
    -- Delete the old numeric key rows
    DELETE FROM module_progress
    WHERE id IN (SELECT old_id FROM duplicates)
    RETURNING id
  )
  SELECT 
    (SELECT COUNT(*) FROM merge_data),
    (SELECT COUNT(*) FROM delete_old)
  INTO merged_count, deleted_count;
  
  RAISE NOTICE 'Merged % duplicate rows (deleted % old numeric entries)', merged_count, deleted_count;
  
  -- Now update remaining numeric keys that don't have conflicts
  WITH updates AS (
    UPDATE module_progress mp
    SET module_key = m.module_key
    FROM module_id_key_mapping m
    WHERE mp.module_key = m.old_id
      AND mp.module_key ~ '^\d+$'  -- Only numeric values
      AND NOT EXISTS (
        -- Skip if proper key already exists for this user
        SELECT 1 FROM module_progress mp2 
        WHERE mp2.user_id = mp.user_id 
        AND mp2.module_key = m.module_key
      )
    RETURNING mp.id
  )
  SELECT COUNT(*) INTO updated_count FROM updates;
  
  RAISE NOTICE 'Updated % rows without conflicts', updated_count;
END $$;

-- Step 3: Update exercise_completions table (if it uses module_id)
DO $$
DECLARE
  updated_count INTEGER := 0;
BEGIN
  -- Check if column exists and is numeric
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'exercise_completions' 
    AND column_name = 'module_id'
  ) THEN
    WITH updates AS (
      UPDATE exercise_completions ec
      SET module_id = m.module_key
      FROM module_id_key_mapping m
      WHERE ec.module_id = m.old_id
        AND ec.module_id ~ '^\d+$'
      RETURNING ec.id
    )
    SELECT COUNT(*) INTO updated_count FROM updates;
    
    RAISE NOTICE 'Updated % rows in exercise_completions', updated_count;
  END IF;
END $$;

-- Step 4: Update concept_understanding table (if it uses module_id)
DO $$
DECLARE
  updated_count INTEGER := 0;
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'concept_understanding' 
    AND column_name = 'module_id'
  ) THEN
    WITH updates AS (
      UPDATE concept_understanding cu
      SET module_id = m.module_key
      FROM module_id_key_mapping m
      WHERE cu.module_id = m.old_id
        AND cu.module_id ~ '^\d+$'
      RETURNING cu.id
    )
    SELECT COUNT(*) INTO updated_count FROM updates;
    
    RAISE NOTICE 'Updated % rows in concept_understanding', updated_count;
  END IF;
END $$;

-- Step 5: Refresh the materialized view with cleaned data
REFRESH MATERIALIZED VIEW mv_student_progress_summary;

-- Step 6: Verify the fix
DO $$
DECLARE
  remaining_numeric INTEGER;
BEGIN
  SELECT COUNT(*) INTO remaining_numeric
  FROM module_progress
  WHERE module_key ~ '^\d+$';
  
  IF remaining_numeric > 0 THEN
    RAISE WARNING 'Still have % numeric module_key values that were not mapped', remaining_numeric;
  ELSE
    RAISE NOTICE 'SUCCESS: All numeric module_key values have been converted!';
  END IF;
END $$;

-- Cleanup
DROP TABLE module_id_key_mapping;

