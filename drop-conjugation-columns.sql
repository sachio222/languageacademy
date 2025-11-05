-- Drop tense/mood/person columns since they're not being used
-- Relationships are stored in the relationships JSONB column instead

ALTER TABLE dictionary_words 
DROP COLUMN IF EXISTS tense,
DROP COLUMN IF EXISTS mood,
DROP COLUMN IF EXISTS person;

-- Drop the indexes too
DROP INDEX IF EXISTS idx_dictionary_words_tense;
DROP INDEX IF EXISTS idx_dictionary_words_person;

