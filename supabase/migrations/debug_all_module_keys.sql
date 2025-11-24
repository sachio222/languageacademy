-- Find ALL module_keys currently in the database
-- This will show us what wrong mappings exist

SELECT DISTINCT module_key 
FROM module_progress 
ORDER BY module_key;
