-- Fix ONLY module_progress table to match ACTUAL module file definitions
-- Fix ALL 22 database keys that don't exist in module files

UPDATE module_progress SET module_key = '2024-10-21-cognates-help' WHERE module_key = '2024-01-06-cognates-help';
UPDATE module_progress SET module_key = '2024-10-20-liaison-help' WHERE module_key = '2024-01-07-liaison-help';
UPDATE module_progress SET module_key = '2024-01-15-vouloir' WHERE module_key = '2024-01-14-vouloir';
UPDATE module_progress SET module_key = '2024-01-17-voir' WHERE module_key = '2024-01-16-voir';
UPDATE module_progress SET module_key = '2024-01-18-questions' WHERE module_key = '2024-01-17-questions';
UPDATE module_progress SET module_key = '2024-01-19-questions-help' WHERE module_key = '2024-01-18-questions-help';
UPDATE module_progress SET module_key = '2024-01-19-stressed-pronouns' WHERE module_key = '2024-01-18-stressed-pronouns';
UPDATE module_progress SET module_key = '2024-01-20-prepositions' WHERE module_key = '2024-01-19-prepositions';
UPDATE module_progress SET module_key = '2024-01-21-adjectives' WHERE module_key = '2024-01-20-adjectives';
UPDATE module_progress SET module_key = '2024-01-22-reading2' WHERE module_key = '2024-01-21-reading2';
UPDATE module_progress SET module_key = '2024-01-23-unit2-practice' WHERE module_key = '2024-01-22-unit2-practice';
UPDATE module_progress SET module_key = '2024-01-24-unit2-exam' WHERE module_key = '2024-01-23-unit2-exam';
UPDATE module_progress SET module_key = '2024-01-25-contractions' WHERE module_key = '2024-01-24-contractions';
UPDATE module_progress SET module_key = '2024-01-26-venir' WHERE module_key = '2024-01-25-venir';
UPDATE module_progress SET module_key = '2024-01-27-aller' WHERE module_key = '2024-01-26-aller';
UPDATE module_progress SET module_key = '2024-01-28-verb-pattern-help' WHERE module_key = '2024-01-27-verb-pattern-help';
UPDATE module_progress SET module_key = '2024-01-29-partir' WHERE module_key = '2024-01-28-partir';
UPDATE module_progress SET module_key = '2024-02-02-combining' WHERE module_key = '2024-01-31-combining';
UPDATE module_progress SET module_key = '2024-02-03-reading3' WHERE module_key = '2024-02-01-reading3';
UPDATE module_progress SET module_key = '2024-02-04-unit3-practice' WHERE module_key = '2024-02-02-unit3-practice';
UPDATE module_progress SET module_key = '2024-02-05-unit3-exam' WHERE module_key = '2024-02-03-unit3-exam';
UPDATE module_progress SET module_key = '2024-03-31-survival-phrases' WHERE module_key = '2024-02-04-survival-phrases';

-- Refresh the materialized view
REFRESH MATERIALIZED VIEW mv_student_progress_summary;

-- Verify the fix
SELECT 
  'Fixed module keys to match actual module files' as status,
  COUNT(DISTINCT module_key) as unique_keys,
  COUNT(*) as total_records
FROM module_progress;
