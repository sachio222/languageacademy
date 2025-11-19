-- ============================================================================
-- Migration: Convert module_id from numeric IDs to moduleKeys
-- ============================================================================
-- This migration converts all module_id values in the database from numeric
-- IDs (like "1", "2", "3") to stable moduleKeys (like "2024-01-01-famous-words")
--
-- IMPORTANT: This migration is idempotent - it can be run multiple times safely.
-- It only updates records where module_id is numeric (doesn't start with "2024-").
--
-- Tables affected:
--   - module_progress
--   - exercise_completions  
--   - concept_understanding
--   - text_entries (if exists)
--
-- STEP 1: Run the query below to see what numeric IDs exist in your database
-- STEP 2: Update the module_id_mapping CTE with complete mappings
-- STEP 3: Run the migration
-- ============================================================================

-- ============================================================================
-- STEP 1: PRE-MIGRATION ANALYSIS (Run this first to see what needs migrating)
-- ============================================================================
-- Uncomment and run this to see what numeric module_ids exist:
/*
SELECT 
  'module_progress' as table_name,
  module_id,
  COUNT(*) as record_count
FROM module_progress
WHERE module_id ~ '^[0-9]+$'
GROUP BY module_id
ORDER BY module_id::integer

UNION ALL

SELECT 
  'exercise_completions' as table_name,
  module_id,
  COUNT(*) as record_count
FROM exercise_completions
WHERE module_id ~ '^[0-9]+$'
GROUP BY module_id
ORDER BY module_id::integer

UNION ALL

SELECT 
  'concept_understanding' as table_name,
  module_id,
  COUNT(*) as record_count
FROM concept_understanding
WHERE module_id ~ '^[0-9]+$'
GROUP BY module_id
ORDER BY module_id::integer;
*/

-- ============================================================================
-- STEP 2: BACKUP TABLES (Run this first!)
-- ============================================================================
-- Uncomment and run this to create backups before migration:
/*
CREATE TABLE module_progress_backup AS SELECT * FROM module_progress;
CREATE TABLE exercise_completions_backup AS SELECT * FROM exercise_completions;
CREATE TABLE concept_understanding_backup AS SELECT * FROM concept_understanding;
-- If text_entries exists:
-- CREATE TABLE text_entries_backup AS SELECT * FROM text_entries;
*/

-- ============================================================================
-- STEP 3: MIGRATION (Update mappings below, then run)
-- ============================================================================

BEGIN;

-- Create temporary mapping table with all numeric ID -> moduleKey mappings
-- IMPORTANT: You need to populate this mapping based on your actual lessons.
-- 
-- To get the complete mapping, you can:
-- 1. Check your codebase: src/lessons/lessonData.js (lessons array)
-- 2. Or query your app's runtime (if you have a way to access lessons)
-- 3. Or manually check each module file's moduleKey property
--
-- The mapping should be: (current_numeric_id, 'module-key-string')
-- Example: (1, '2024-01-01-famous-words')
--
-- Create temporary table with module ID to moduleKey mapping
-- This persists for the entire transaction
CREATE TEMP TABLE module_id_mapping (
  numeric_id INTEGER,
  module_key TEXT
);

-- Insert all mappings
INSERT INTO module_id_mapping (numeric_id, module_key) VALUES
  (1, '2024-01-01-famous-words'),
  (2, '2024-01-01-pronouns'),
  (3, '2024-01-02-etre'),
  (4, '2024-01-04-avoir'),
  (5, '2024-01-05-articles'),
  (6, '2024-10-21-cognates-help'),
  (7, '2024-01-06-basic-nouns'),
  (8, '2024-01-07-plurals'),
  (9, '2024-10-20-liaison-help'),
  (10, '2024-01-08-connectors'),
  (11, '2024-01-09-reading1'),
  (12, '2024-01-10-unit1-practice'),
  (13, '2024-01-11-unit1-exam'),
  (14, '2024-01-12-demonstratives'),
  (15, '2024-01-13-ca-survival'),
  (16, '2024-01-14-determiners-nouns'),
  (17, '2024-01-15-vouloir'),
  (18, '2024-01-16-pouvoir'),
  (19, '2024-01-17-voir'),
  (20, '2024-01-18-questions'),
  (21, '2024-01-19-questions-help'),
  (22, '2024-01-19-stressed-pronouns'),
  (23, '2024-01-20-prepositions'),
  (24, '2024-01-21-adjectives'),
  (25, '2024-01-22-reading2'),
  (26, '2024-01-23-unit2-practice'),
  (27, '2024-01-24-unit2-exam'),
  (28, '2024-01-25-contractions'),
  (29, '2024-01-26-venir'),
  (30, '2024-01-27-aller'),
  (31, '2024-01-28-verb-pattern-help'),
  (32, '2024-01-29-partir'),
  (33, '2024-01-30-object-pronouns'),
  (34, '2024-01-31-possessive-adjectives'),
  (35, '2024-02-01-possessive-pronouns'),
  (36, '2024-02-02-combining'),
  (37, '2024-02-03-reading3'),
  (38, '2024-02-04-unit3-practice'),
  (39, '2024-02-05-unit3-exam'),
  (40, '2024-03-31-survival-phrases'),
  (41, '2024-03-25-faire'),
  (42, '2024-03-23-devoir'),
  (43, '2024-03-29-parler'),
  (44, '2024-10-22-search-find'),
  (45, '2024-03-28-negation'),
  (46, '2024-04-01-time-adverbs'),
  (47, '2024-03-27-negation-2'),
  (48, '2024-03-26-location-adverbs'),
  (49, '2024-03-24-everyday-nouns'),
  (50, '2024-03-30-reading-4'),
  (51, '2024-04-03-unit-4-practice'),
  (52, '2024-04-02-unit-4-exam'),
  (53, '2024-04-08-comparisons'),
  (54, '2024-04-07-comparisons-slang'),
  (55, '2024-04-09-conditionals'),
  (56, '2024-04-16-would-conditionals'),
  (57, '2024-04-04-aimer'),
  (58, '2024-04-10-etre-past'),
  (59, '2024-04-05-avoir-past'),
  (60, '2024-04-11-food-nouns'),
  (61, '2024-04-12-manger'),
  (62, '2024-04-06-boire'),
  (63, '2024-04-13-reading-5'),
  (64, '2024-04-15-unit-5-practice'),
  (65, '2024-04-14-unit-5-exam'),
  (66, '2024-04-23-progressive-tenses'),
  (67, '2024-04-20-dire'),
  (68, '2024-04-22-prendre'),
  (69, '2024-10-22-donner'),
  (70, '2024-04-21-mettre'),
  (71, '2024-04-19-demander'),
  (72, '2024-04-18-commander'),
  (73, '2024-04-17-besoin'),
  (74, '2024-04-25-top-200-nouns'),
  (75, '2024-04-24-reading-6'),
  (76, '2024-04-27-unit-6-practice'),
  (77, '2024-04-26-unit-6-exam'),
  (78, '2024-05-05-on-and-people'),
  (79, '2024-05-09-studying-verbs'),
  (80, '2024-05-04-learning-verbs'),
  (81, '2024-04-29-comprendre'),
  (82, '2024-05-08-savoir'),
  (83, '2024-04-30-connaitre'),
  (84, '2024-05-06-penser'),
  (85, '2024-05-01-croire'),
  (86, '2024-05-03-knowledge-nouns'),
  (87, '2024-05-02-discourse-markers'),
  (88, '2024-04-28-comparison-modifiers'),
  (89, '2024-05-07-reading-7'),
  (90, '2024-05-11-unit-7-practice'),
  (91, '2024-05-10-unit-7-exam'),
  (92, '2024-05-23-temporal-words'),
  (93, '2024-05-21-reflexive-pronouns'),
  (94, '2024-05-22-s-appeler'),
  (95, '2024-05-19-morning-routine'),
  (96, '2024-05-17-getting-ready'),
  (97, '2024-05-16-daily-reflexives'),
  (98, '2024-06-07-reflexive-past'),
  (99, '2024-06-06-reciprocal-reflexives'),
  (100, '2024-05-13-commands-tu'),
  (101, '2024-05-14-commands-vous'),
  (102, '2024-05-18-irregular-commands'),
  (103, '2024-05-12-commands-pronouns'),
  (104, '2024-05-20-reading-8'),
  (105, '2024-05-25-unit-8-practice'),
  (106, '2024-05-24-unit-8-exam'),
  (107, '2024-05-26-causal-words'),
  (108, '2024-06-08-spatial-prepositions'),
  (109, '2024-05-28-more-spatial-relations'),
  (110, '2024-05-30-passe-compose-er'),
  (111, '2024-06-01-passe-compose-irregular-1'),
  (112, '2024-06-02-passe-compose-irregular-2'),
  (113, '2024-05-31-passe-compose-etre'),
  (114, '2024-05-29-passe-compose-agreement'),
  (115, '2024-05-27-imparfait-all-verbs'),
  (116, '2024-06-04-pc-vs-imparfait'),
  (117, '2024-06-03-past-tense-composition'),
  (118, '2024-06-05-reading-9'),
  (119, '2024-06-10-unit-9-practice'),
  (120, '2024-06-09-unit-9-exam'),
  (121, '2024-01-23-common-special-forms-1'),
  (122, '2024-01-24-common-special-forms-2'),
  (123, '2024-01-28-necessity-phrases'),
  (124, '2024-02-07-wish-phrases'),
  (125, '2024-01-25-emotion-phrases'),
  (126, '2024-01-29-opinion-phrases'),
  (127, '2024-01-27-hypothetical-phrases'),
  (128, '2024-01-30-past-regret-phrases'),
  (129, '2024-01-26-had-already-phrases'),
  (130, '2024-01-22-common-adverbs'),
  (131, '2024-02-06-while-doing-phrases'),
  (132, '2024-02-02-service-phrases'),
  (133, '2024-01-21-before-phrases'),
  (134, '2024-02-03-so-that-phrases'),
  (135, '2024-01-20-although-phrases'),
  (136, '2024-01-31-possibility-phrases'),
  (137, '2024-02-01-reading-10'),
  (138, '2024-02-05-unit-10-practice'),
  (139, '2024-02-04-unit-10-exam'),
  (140, '2024-02-08-age-personal-info'),
  (141, '2024-02-10-donner'),
  (142, '2024-05-15-daily-actions-1'),
  (143, '2024-02-13-search-and-find'),
  (144, '2024-02-11-perception-verbs'),
  (145, '2024-02-14-social-situations'),
  (146, '2024-02-09-directions-navigation'),
  (147, '2024-02-12-reading-11'),
  (148, '2024-02-16-unit-11-practice'),
  (149, '2024-02-15-unit-11-exam'),
  (150, '2024-03-15-nature-animals'),
  (151, '2024-03-16-movement-verbs'),
  (152, '2024-03-17-natural-phenomena'),
  (153, '2024-03-15-questce-qui-que'),
  (154, '2024-03-19-pourquoi-complex'),
  (155, '2024-03-20-comment-complex'),
  (156, '2024-03-16-quiest-qui-que'),
  (157, '2024-03-22-inversion-questions'),
  (158, '2024-03-23-embedded-questions'),
  (159, '2024-03-24-rhetorical-negative'),
  (160, '2024-03-25-multi-clause-questions'),
  (161, '2024-04-01-alphabet'),
  (162, '2024-04-02-numbers'),
  (163, '2024-04-03-days-months'),
  (164, '2024-04-04-holidays'),
  (165, '2024-04-05-colors'),
  (166, '2024-04-06-french-countries'),
  (167, '2024-04-07-language-stats'),
  (168, '2024-04-08-spelling-patterns');

-- Create index for faster lookups
CREATE INDEX idx_module_id_mapping_numeric ON module_id_mapping(numeric_id);

-- Update module_progress table
-- SAFETY: Only updates records where module_id is numeric (not already migrated)
UPDATE module_progress mp
SET module_id = m.module_key
FROM module_id_mapping m
WHERE mp.module_id = m.numeric_id::text
  AND mp.module_id ~ '^[0-9]+$'  -- Only numeric IDs (safety check - won't touch existing moduleKeys)
RETURNING mp.id, mp.module_id;

-- Update exercise_completions table
-- SAFETY: Only updates records where module_id is numeric (not already migrated)
UPDATE exercise_completions ec
SET module_id = m.module_key
FROM module_id_mapping m
WHERE ec.module_id = m.numeric_id::text
  AND ec.module_id ~ '^[0-9]+$'  -- Only numeric IDs (safety check)
RETURNING ec.id, ec.module_id;

-- Update concept_understanding table
-- SAFETY: Only updates records where module_id is numeric (not already migrated)
UPDATE concept_understanding cu
SET module_id = m.module_key
FROM module_id_mapping m
WHERE cu.module_id = m.numeric_id::text
  AND cu.module_id ~ '^[0-9]+$'  -- Only numeric IDs (safety check)
RETURNING cu.id, cu.module_id;

-- Update text_entries table (if it exists)
-- SAFETY: Only updates records where module_id is numeric (not already migrated)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'text_entries') THEN
    UPDATE text_entries te
    SET module_id = m.module_key
    FROM module_id_mapping m
    WHERE te.module_id = m.numeric_id::text
      AND te.module_id ~ '^[0-9]+$';  -- Only numeric IDs (safety check)
  END IF;
END $$;

-- Show migration summary
DO $$
DECLARE
  module_progress_count INTEGER;
  exercise_completions_count INTEGER;
  concept_understanding_count INTEGER;
BEGIN
  -- Count remaining numeric IDs (should be 0 after migration)
  SELECT COUNT(*) INTO module_progress_count
  FROM module_progress
  WHERE module_id ~ '^[0-9]+$';
  
  SELECT COUNT(*) INTO exercise_completions_count
  FROM exercise_completions
  WHERE module_id ~ '^[0-9]+$';
  
  SELECT COUNT(*) INTO concept_understanding_count
  FROM concept_understanding
  WHERE module_id ~ '^[0-9]+$';
  
  RAISE NOTICE 'Migration Summary:';
  RAISE NOTICE '  module_progress records still using numeric IDs: %', module_progress_count;
  RAISE NOTICE '  exercise_completions records still using numeric IDs: %', exercise_completions_count;
  RAISE NOTICE '  concept_understanding records still using numeric IDs: %', concept_understanding_count;
  
  IF module_progress_count > 0 OR exercise_completions_count > 0 OR concept_understanding_count > 0 THEN
    RAISE WARNING 'Some records still use numeric IDs. You may need to add more mappings to the module_id_mapping CTE.';
  ELSE
    RAISE NOTICE '✓ All records successfully migrated to moduleKeys!';
  END IF;
END $$;

COMMIT;

-- ============================================================================
-- VERIFICATION QUERIES (Run these after migration to verify)
-- ============================================================================

-- Check for any remaining numeric module_ids
-- SELECT 'module_progress' as table_name, COUNT(*) as numeric_ids
-- FROM module_progress WHERE module_id ~ '^[0-9]+$'
-- UNION ALL
-- SELECT 'exercise_completions', COUNT(*)
-- FROM exercise_completions WHERE module_id ~ '^[0-9]+$'
-- UNION ALL
-- SELECT 'concept_understanding', COUNT(*)
-- FROM concept_understanding WHERE module_id ~ '^[0-9]+$';

-- Sample migrated records
-- SELECT module_id, COUNT(*) as count
-- FROM module_progress
-- GROUP BY module_id
-- ORDER BY module_id
-- LIMIT 20;

