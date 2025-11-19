-- ============================================================================
-- Backup Script: Before renaming module_id to module_key
-- ============================================================================
-- Run this BEFORE running the rename migration
-- This creates backup tables with all current data
-- ============================================================================

-- Backup module_progress table
CREATE TABLE IF NOT EXISTS module_progress_backup_20250122 AS 
SELECT * FROM module_progress;

-- Backup exercise_completions table
CREATE TABLE IF NOT EXISTS exercise_completions_backup_20250122 AS 
SELECT * FROM exercise_completions;

-- Backup concept_understanding table
CREATE TABLE IF NOT EXISTS concept_understanding_backup_20250122 AS 
SELECT * FROM concept_understanding;

-- Backup text_entries table (if exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'text_entries'
  ) THEN
    EXECUTE 'CREATE TABLE IF NOT EXISTS text_entries_backup_20250122 AS SELECT * FROM text_entries';
  END IF;
END $$;

-- Verify backups were created
DO $$
DECLARE
  module_progress_count INTEGER;
  exercise_completions_count INTEGER;
  concept_understanding_count INTEGER;
  backup_module_progress_count INTEGER;
  backup_exercise_completions_count INTEGER;
  backup_concept_understanding_count INTEGER;
BEGIN
  -- Count original tables
  SELECT COUNT(*) INTO module_progress_count FROM module_progress;
  SELECT COUNT(*) INTO exercise_completions_count FROM exercise_completions;
  SELECT COUNT(*) INTO concept_understanding_count FROM concept_understanding;
  
  -- Count backup tables
  SELECT COUNT(*) INTO backup_module_progress_count FROM module_progress_backup_20250122;
  SELECT COUNT(*) INTO backup_exercise_completions_count FROM exercise_completions_backup_20250122;
  SELECT COUNT(*) INTO backup_concept_understanding_count FROM concept_understanding_backup_20250122;
  
  -- Verify counts match
  IF module_progress_count != backup_module_progress_count THEN
    RAISE EXCEPTION 'Backup failed: module_progress count mismatch (original: %, backup: %)', 
      module_progress_count, backup_module_progress_count;
  END IF;
  
  IF exercise_completions_count != backup_exercise_completions_count THEN
    RAISE EXCEPTION 'Backup failed: exercise_completions count mismatch (original: %, backup: %)', 
      exercise_completions_count, backup_exercise_completions_count;
  END IF;
  
  IF concept_understanding_count != backup_concept_understanding_count THEN
    RAISE EXCEPTION 'Backup failed: concept_understanding count mismatch (original: %, backup: %)', 
      concept_understanding_count, backup_concept_understanding_count;
  END IF;
  
  RAISE NOTICE 'Backup completed successfully!';
  RAISE NOTICE 'Backed up tables:';
  RAISE NOTICE '  module_progress: % rows', module_progress_count;
  RAISE NOTICE '  exercise_completions: % rows', exercise_completions_count;
  RAISE NOTICE '  concept_understanding: % rows', concept_understanding_count;
END $$;

