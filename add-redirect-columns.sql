-- Add redirect columns to dictionary_words table
-- These are needed for pointer/redirect entries (e.g., belle-fr → beau-fr)

ALTER TABLE dictionary_words
ADD COLUMN IF NOT EXISTS redirect_to TEXT,
ADD COLUMN IF NOT EXISTS redirect_type TEXT,
ADD COLUMN IF NOT EXISTS base_word TEXT;

-- Add index for redirect lookups
CREATE INDEX IF NOT EXISTS idx_dictionary_words_redirect_to 
  ON dictionary_words(redirect_to) 
  WHERE redirect_to IS NOT NULL;

-- Add comment explaining the columns
COMMENT ON COLUMN dictionary_words.redirect_to IS 'ID of the main entry this word redirects to (e.g., belle-fr redirects to beau-fr)';
COMMENT ON COLUMN dictionary_words.redirect_type IS 'Type of redirect (e.g., feminine_form, masculine_plural, etc.)';
COMMENT ON COLUMN dictionary_words.base_word IS 'Base word form (e.g., "beau" for belle-fr)';
