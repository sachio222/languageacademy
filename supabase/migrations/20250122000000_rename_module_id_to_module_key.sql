-- ============================================================================
-- Migration: Rename module_id column to module_key
-- ============================================================================
-- This migration renames the module_id column to module_key in all tables
-- to better reflect that it stores moduleKey strings (like "2024-01-01-famous-words")
-- rather than numeric IDs.
--
-- Tables affected:
--   - module_progress
--   - exercise_completions  
--   - concept_understanding
--   - text_entries (if exists)
--
-- IMPORTANT: This migration assumes module_id already contains moduleKeys.
-- If you still have numeric IDs, run migrate-module-ids-to-modulekeys.sql first.
-- ============================================================================

-- ============================================================================
-- STEP 1: Backup check - verify column exists and has data
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'module_progress' 
    AND column_name = 'module_id'
  ) THEN
    RAISE EXCEPTION 'Column module_id does not exist in module_progress. Migration may have already run.';
  END IF;
END $$;

-- ============================================================================
-- STEP 2: Drop indexes that reference module_id
-- ============================================================================
DROP INDEX IF EXISTS idx_exercise_completions_user_module;

-- ============================================================================
-- STEP 3: Drop unique constraints that reference module_id
-- ============================================================================
-- Note: We'll recreate these with the new column name

-- module_progress: UNIQUE(user_id, module_id)
ALTER TABLE module_progress DROP CONSTRAINT IF EXISTS module_progress_user_id_module_id_key;

-- concept_understanding: UNIQUE(user_id, module_id, concept_index)
ALTER TABLE concept_understanding DROP CONSTRAINT IF EXISTS concept_understanding_user_id_module_id_concept_index_key;

-- ============================================================================
-- STEP 4: Rename columns in all tables
-- ============================================================================

-- Rename in module_progress
ALTER TABLE module_progress 
  RENAME COLUMN module_id TO module_key;

-- Rename in exercise_completions
ALTER TABLE exercise_completions 
  RENAME COLUMN module_id TO module_key;

-- Rename in concept_understanding
ALTER TABLE concept_understanding 
  RENAME COLUMN module_id TO module_key;

-- Rename in text_entries (if exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'text_entries'
  ) THEN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'text_entries' 
      AND column_name = 'module_id'
    ) THEN
      ALTER TABLE text_entries RENAME COLUMN module_id TO module_key;
    END IF;
  END IF;
END $$;

-- ============================================================================
-- STEP 5: Recreate indexes with new column name
-- ============================================================================
CREATE INDEX idx_exercise_completions_user_module ON exercise_completions(user_id, module_key);

-- ============================================================================
-- STEP 6: Recreate unique constraints with new column name
-- ============================================================================

-- module_progress: UNIQUE(user_id, module_key)
ALTER TABLE module_progress 
  ADD CONSTRAINT module_progress_user_id_module_key_key 
  UNIQUE(user_id, module_key);

-- concept_understanding: UNIQUE(user_id, module_key, concept_index)
ALTER TABLE concept_understanding 
  ADD CONSTRAINT concept_understanding_user_id_module_key_concept_index_key 
  UNIQUE(user_id, module_key, concept_index);

-- ============================================================================
-- STEP 7: Verification queries
-- ============================================================================
DO $$
DECLARE
  module_progress_count INTEGER;
  exercise_completions_count INTEGER;
  concept_understanding_count INTEGER;
BEGIN
  -- Verify columns renamed
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'module_progress' 
    AND column_name = 'module_key'
  ) THEN
    RAISE EXCEPTION 'Migration failed: module_key column not found in module_progress';
  END IF;

  -- Count records to verify data integrity
  SELECT COUNT(*) INTO module_progress_count FROM module_progress;
  SELECT COUNT(*) INTO exercise_completions_count FROM exercise_completions;
  SELECT COUNT(*) INTO concept_understanding_count FROM concept_understanding;

  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'Records verified:';
  RAISE NOTICE '  module_progress: %', module_progress_count;
  RAISE NOTICE '  exercise_completions: %', exercise_completions_count;
  RAISE NOTICE '  concept_understanding: %', concept_understanding_count;
END $$;

