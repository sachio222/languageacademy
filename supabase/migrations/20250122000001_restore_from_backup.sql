-- ============================================================================
-- Restore Script: Restore from backup if migration fails
-- ============================================================================
-- ONLY RUN THIS IF YOU NEED TO ROLLBACK THE MIGRATION
-- This will restore the original module_id column structure
-- ============================================================================

-- WARNING: This will delete current data and restore from backup!
-- Only use if the migration failed and you need to rollback

DO $$
BEGIN
  RAISE NOTICE 'WARNING: This will restore from backup and delete current data!';
  RAISE NOTICE 'Make sure you want to do this before proceeding.';
END $$;

-- Drop current tables (if migration partially completed)
-- Note: This is destructive - only run if you need to rollback

-- Restore module_progress
DROP TABLE IF EXISTS module_progress CASCADE;
CREATE TABLE module_progress AS SELECT * FROM module_progress_backup_20250122;
ALTER TABLE module_progress ADD PRIMARY KEY (id);
ALTER TABLE module_progress ADD CONSTRAINT module_progress_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE module_progress ADD CONSTRAINT module_progress_user_id_module_id_key 
  UNIQUE(user_id, module_id);

-- Restore exercise_completions
DROP TABLE IF EXISTS exercise_completions CASCADE;
CREATE TABLE exercise_completions AS SELECT * FROM exercise_completions_backup_20250122;
ALTER TABLE exercise_completions ADD PRIMARY KEY (id);
ALTER TABLE exercise_completions ADD CONSTRAINT exercise_completions_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
CREATE INDEX idx_exercise_completions_user_module ON exercise_completions(user_id, module_id);

-- Restore concept_understanding
DROP TABLE IF EXISTS concept_understanding CASCADE;
CREATE TABLE concept_understanding AS SELECT * FROM concept_understanding_backup_20250122;
ALTER TABLE concept_understanding ADD PRIMARY KEY (id);
ALTER TABLE concept_understanding ADD CONSTRAINT concept_understanding_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE concept_understanding ADD CONSTRAINT concept_understanding_user_id_module_id_concept_index_key 
  UNIQUE(user_id, module_id, concept_index);

-- Restore text_entries (if exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'text_entries_backup_20250122'
  ) THEN
    DROP TABLE IF EXISTS text_entries CASCADE;
    EXECUTE 'CREATE TABLE text_entries AS SELECT * FROM text_entries_backup_20250122';
  END IF;
END $$;

RAISE NOTICE 'Restore completed. Original module_id structure restored.';

