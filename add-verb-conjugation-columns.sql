-- Add tense, mood, and person columns to dictionary_words for verb conjugation data
-- These are needed for dynamic conjugation relationship generation

ALTER TABLE dictionary_words 
ADD COLUMN IF NOT EXISTS tense TEXT,
ADD COLUMN IF NOT EXISTS mood TEXT,
ADD COLUMN IF NOT EXISTS person TEXT;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_dictionary_words_tense ON dictionary_words(tense);
CREATE INDEX IF NOT EXISTS idx_dictionary_words_person ON dictionary_words(person);

-- Add comments
COMMENT ON COLUMN dictionary_words.tense IS 'Verb tense: present, past, future, infinitive, etc.';
COMMENT ON COLUMN dictionary_words.mood IS 'Verb mood: indicative, subjunctive, imperative, infinitive, participle';
COMMENT ON COLUMN dictionary_words.person IS 'Grammatical person: je, tu, il, nous, vous, ils';

