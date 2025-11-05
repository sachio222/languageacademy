-- Cambridge Dictionary Database Schema for Supabase
-- Optimized for 2,396 Cambridge dictionary entries
-- Designed for fast lookups, flexible nested data, and curriculum integration

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search

-- Main dictionary words table
CREATE TABLE dictionary_words (
  -- Core identification
  id TEXT PRIMARY KEY, -- e.g., "lundi-fr", "chat-fr"
  lang TEXT NOT NULL DEFAULT 'fr', -- ISO language code
  word TEXT NOT NULL, -- The actual word/phrase
  part_of_speech TEXT NOT NULL, -- noun, verb, adjective, etc.
  
  -- Language-specific metadata (direct columns for fast queries)
  gender TEXT, -- masculine, feminine, neutral, none
  phonetic TEXT, -- IPA pronunciation
  definition TEXT, -- French definition if available
  
  -- Curriculum tracking (direct columns for fast filtering)
  unit TEXT, -- e.g., "unit1", "unit13"
  module TEXT, -- e.g., "2024-04-03-days-months", "reading"
  lesson TEXT, -- lesson identifier
  cefr_level TEXT, -- A1, A2, B1, B2, C1, C2
  difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 5),
  
  -- Verb-specific fields (direct columns for common queries)
  infinitive TEXT, -- For conjugated forms
  conjugation_group TEXT, -- er, ir, re, irregular, none
  
  -- Adjective-specific fields
  adjective_position TEXT, -- before_noun, after_noun, either
  
  -- Nested data as JSONB (flexible structure)
  translations JSONB DEFAULT '[]'::jsonb, -- Array of translation objects
  relationships JSONB DEFAULT '[]'::jsonb, -- Array of word relationships
  examples JSONB DEFAULT '[]'::jsonb, -- Array of usage examples
  tags JSONB DEFAULT '[]'::jsonb, -- Array of string tags
  
  -- Verb-specific nested data
  verb_phrases JSONB DEFAULT '[]'::jsonb, -- Common verb phrases
  conjugation JSONB, -- Full conjugation tables
  
  -- Noun-specific nested data
  noun_phrases JSONB DEFAULT '[]'::jsonb, -- Common noun phrases
  noun_articles JSONB, -- Article associations
  
  -- Adjective-specific nested data
  adjective_phrases JSONB DEFAULT '[]'::jsonb, -- Common adjective phrases
  adjective_forms JSONB, -- Gender/number agreement forms
  
  -- Additional metadata
  etymology TEXT,
  usage_notes TEXT,
  register JSONB DEFAULT '[]'::jsonb, -- formal, informal, etc.
  regional_variants JSONB DEFAULT '[]'::jsonb,
  
  -- Frequency and learning data
  frequency JSONB, -- Frequency statistics object
  
  -- Cambridge-specific data
  cambridge_data JSONB, -- Scraping metadata, confidence scores, etc.
  
  -- Source and verification
  sources JSONB DEFAULT '["cambridge"]'::jsonb,
  verified BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes for common queries
CREATE INDEX idx_dictionary_words_word ON dictionary_words(word);
CREATE INDEX idx_dictionary_words_lang_pos ON dictionary_words(lang, part_of_speech);
CREATE INDEX idx_dictionary_words_unit_module ON dictionary_words(unit, module) WHERE unit IS NOT NULL;
CREATE INDEX idx_dictionary_words_cefr ON dictionary_words(cefr_level) WHERE cefr_level IS NOT NULL;
CREATE INDEX idx_dictionary_words_infinitive ON dictionary_words(infinitive) WHERE infinitive IS NOT NULL;

-- JSONB indexes for nested data queries
CREATE INDEX idx_dictionary_words_translations ON dictionary_words USING GIN(translations);
CREATE INDEX idx_dictionary_words_relationships ON dictionary_words USING GIN(relationships);
CREATE INDEX idx_dictionary_words_examples ON dictionary_words USING GIN(examples);
CREATE INDEX idx_dictionary_words_tags ON dictionary_words USING GIN(tags);
CREATE INDEX idx_dictionary_words_cambridge ON dictionary_words USING GIN(cambridge_data);

-- Full-text search index for word content
CREATE INDEX idx_dictionary_words_search ON dictionary_words USING GIN(word gin_trgm_ops);
CREATE INDEX idx_dictionary_words_definition_search ON dictionary_words USING GIN(definition gin_trgm_ops) WHERE definition IS NOT NULL;

-- Composite indexes for common query patterns
CREATE INDEX idx_dictionary_words_curriculum ON dictionary_words(unit, module, lesson) WHERE unit IS NOT NULL;
CREATE INDEX idx_dictionary_words_pos_gender ON dictionary_words(part_of_speech, gender) WHERE gender IS NOT NULL;

-- Row Level Security (RLS) - Dictionary is read-only for users
ALTER TABLE dictionary_words ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read dictionary
CREATE POLICY "Dictionary is readable by all authenticated users" 
  ON dictionary_words FOR SELECT 
  TO authenticated 
  USING (true);

-- Only admins can modify dictionary (using Clerk metadata)
CREATE POLICY "Dictionary is writable by admins only" 
  ON dictionary_words FOR ALL 
  TO authenticated 
  USING (
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
  );

-- Trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_dictionary_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_dictionary_words_updated_at 
  BEFORE UPDATE ON dictionary_words 
  FOR EACH ROW 
  EXECUTE FUNCTION update_dictionary_updated_at();

-- Useful views for common queries

-- View for basic word lookups
CREATE VIEW dictionary_basic AS
SELECT 
  id,
  word,
  part_of_speech,
  gender,
  phonetic,
  unit,
  module,
  translations,
  examples
FROM dictionary_words;

-- View for curriculum-organized words
CREATE VIEW dictionary_curriculum AS
SELECT 
  unit,
  module,
  lesson,
  part_of_speech,
  COUNT(*) as word_count,
  array_agg(word ORDER BY word) as words
FROM dictionary_words 
WHERE unit IS NOT NULL
GROUP BY unit, module, lesson, part_of_speech
ORDER BY unit, module, lesson, part_of_speech;

-- View for word relationships (for graph queries)
CREATE VIEW dictionary_relationships AS
SELECT 
  w.id,
  w.word,
  w.part_of_speech,
  rel.value ->> 'type' as relationship_type,
  rel.value ->> 'targetId' as target_id,
  rel.value ->> 'targetWord' as target_word,
  (rel.value ->> 'strength')::numeric as strength
FROM dictionary_words w,
     jsonb_array_elements(w.relationships) as rel(value)
WHERE jsonb_array_length(w.relationships) > 0;

-- Comments for documentation
COMMENT ON TABLE dictionary_words IS 'Cambridge Dictionary entries with JSONB for flexible nested data';
COMMENT ON COLUMN dictionary_words.id IS 'Unique word identifier (word-lang format)';
COMMENT ON COLUMN dictionary_words.translations IS 'Array of translation objects with lang, text, confidence';
COMMENT ON COLUMN dictionary_words.relationships IS 'Array of word relationships (synonyms, conjugations, etc.)';
COMMENT ON COLUMN dictionary_words.examples IS 'Array of usage examples with text and translations';
COMMENT ON COLUMN dictionary_words.cambridge_data IS 'Cambridge scraping metadata and confidence scores';

-- Sample queries for testing

-- Find all nouns in unit1
-- SELECT word, gender, translations FROM dictionary_words WHERE part_of_speech = 'noun' AND unit = 'unit1';

-- Search for words containing 'chat'
-- SELECT word, part_of_speech, translations FROM dictionary_words WHERE word ILIKE '%chat%';

-- Find all conjugation relationships for 'être'
-- SELECT * FROM dictionary_relationships WHERE word = 'être' AND relationship_type = 'conjugation_pair';

-- Get words by CEFR level
-- SELECT word, part_of_speech, cefr_level FROM dictionary_words WHERE cefr_level = 'A1' ORDER BY word;
