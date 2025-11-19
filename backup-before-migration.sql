-- ============================================================================
-- BACKUP SCRIPT - Run this BEFORE migrate-module-ids-to-modulekeys.sql
-- ============================================================================
-- This creates backup tables with timestamp so you can restore if needed
-- ============================================================================

BEGIN;

-- Create timestamp suffix
DO $$
DECLARE
  backup_suffix TEXT;
BEGIN
  backup_suffix := '_backup_' || to_char(now(), 'YYYYMMDD_HH24MISS');
  
  -- Create backups
  EXECUTE format('CREATE TABLE module_progress%s AS SELECT * FROM module_progress', backup_suffix);
  EXECUTE format('CREATE TABLE exercise_completions%s AS SELECT * FROM exercise_completions', backup_suffix);
  EXECUTE format('CREATE TABLE concept_understanding%s AS SELECT * FROM concept_understanding', backup_suffix);
  
  -- Backup text_entries if it exists
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'text_entries') THEN
    EXECUTE format('CREATE TABLE text_entries%s AS SELECT * FROM text_entries', backup_suffix);
  END IF;
  
  RAISE NOTICE 'Backups created with suffix: %', backup_suffix;
  RAISE NOTICE 'Backup tables:';
  RAISE NOTICE '  - module_progress%', backup_suffix;
  RAISE NOTICE '  - exercise_completions%', backup_suffix;
  RAISE NOTICE '  - concept_understanding%', backup_suffix;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'text_entries') THEN
    RAISE NOTICE '  - text_entries%', backup_suffix;
  END IF;
END $$;

COMMIT;

-- ============================================================================
-- RESTORE INSTRUCTIONS (if needed)
-- ============================================================================
-- If something goes wrong, restore from backup:
-- 
-- TRUNCATE module_progress;
-- INSERT INTO module_progress SELECT * FROM module_progress_backup_YYYYMMDD_HH24MISS;
-- 
-- (Repeat for other tables)
-- ============================================================================


