import { z } from "zod";

/**
 * Word of the Day Schema
 * Optimized for LLM generation and authoritative display
 * 
 * Simpler than full dictionary schema, focused on daily learning
 */

// Definition with sense numbering
const DefinitionSchema = z.object({
  sense: z.string(), // "1", "2", "3"
  text: z.string().min(1),
  register: z.enum(["universal", "common", "grammatical", "formal", "informal"]),
  example: z.string().min(1), // Short inline example
});

// Contextual example with level
const ExampleSchema = z.object({
  french: z.string().min(1),
  english: z.string().min(1),
  context: z.string(), // e.g., "Movement · A1"
  note: z.string().optional(), // Additional context
});

// Etymology information
const EtymologySchema = z.object({
  origin: z.string(), // e.g., "Latin ambulāre"
  period: z.string(), // e.g., "9th century"
  evolution: z.string(), // Full evolution chain
  note: z.string().optional(), // Linguistic notes
});

// Idiom or expression
const IdiomSchema = z.object({
  expression: z.string().min(1),
  meaning: z.string().min(1),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
});

// Related word
const RelatedWordSchema = z.object({
  word: z.string().min(1),
  translation: z.string().min(1),
  relationship: z.enum(["synonym", "antonym", "motion", "related", "opposite"]).optional(),
});

// Main WOTD Schema
export const WOTDSchema = z.object({
  // Core identification
  id: z.string().min(1), // e.g., "aller-fr"
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  
  // Word basics
  word: z.string().min(1),
  phonetic: z.string().min(1), // IPA pronunciation
  part_of_speech: z.enum([
    "verb",
    "noun",
    "adjective",
    "adverb",
    "pronoun",
    "preposition",
    "conjunction",
    "expression",
  ]),
  
  // Quick answer
  translation: z.string().min(1), // Primary English translation
  
  // Detailed definitions (2-3 numbered senses)
  definitions: z.array(DefinitionSchema).min(1).max(5),
  
  // Contextual examples (4-5 examples)
  examples: z.array(ExampleSchema).min(3).max(7),
  
  // Grammar information
  grammar: z.array(z.string()).optional(), // Grammar notes as strings
  
  // Common combinations
  collocations: z.array(z.string()).optional(), // e.g., "aller à pied"
  
  // Idioms (2-4 idiomatic expressions)
  idioms: z.array(IdiomSchema).optional(),
  
  // Etymology
  etymology: EtymologySchema.optional(),
  
  // Related words
  related_words: z.array(RelatedWordSchema).optional(),
  
  // Learning metadata
  difficulty_level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  difficulty_label: z.string(), // e.g., "A1-C2 · Essential"
  
  // Frequency data
  frequency_rank: z.string().optional(), // e.g., "#8"
  frequency_note: z.string().optional(), // e.g., "8th most common word"
  
  // Usage notes
  usage_notes: z.string().optional(),
  
  // Quiz data (for email)
  correct_answer: z.string().min(1),
  wrong_options: z.array(z.string()).length(3), // Exactly 3 wrong answers
  
  // Generation metadata
  generated_by: z.enum(["llm", "manual", "hybrid"]).optional(),
  llm_model: z.string().optional(), // e.g., "gpt-4", "claude-3"
  generated_at: z.string().datetime().optional(),
  reviewed: z.boolean().optional().default(false),
  
  // Social/marketing
  social_hook: z.string().optional(), // For social media posts
});

// Validation helper
export const validateWOTD = (data) => {
  try {
    return {
      success: true,
      data: WOTDSchema.parse(data),
      errors: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: error.errors || [error.message],
    };
  }
};

// LLM Prompt Template for generating WOTD
export const generateLLMPrompt = (word, targetDate) => {
  return `Generate a comprehensive Word of the Day entry for the French word "${word}" for ${targetDate}.

Return a JSON object with this exact structure:

{
  "id": "${word}-fr",
  "date": "${targetDate}",
  "word": "${word}",
  "phonetic": "IPA pronunciation",
  "part_of_speech": "verb|noun|adjective|etc",
  "translation": "primary English translation",
  "definitions": [
    {
      "sense": "1",
      "text": "First definition",
      "register": "universal|common|grammatical",
      "example": "Brief inline example"
    }
  ],
  "examples": [
    {
      "french": "French sentence",
      "english": "English translation",
      "context": "Context · Level",
      "note": "Optional usage note"
    }
  ],
  "grammar": ["Grammar note 1", "Grammar note 2"],
  "collocations": ["phrase 1", "phrase 2"],
  "idioms": [
    {
      "expression": "Idiomatic expression",
      "meaning": "English meaning",
      "level": "A1-C2"
    }
  ],
  "etymology": {
    "origin": "Latin word",
    "period": "Century",
    "evolution": "Full evolution chain",
    "note": "Linguistic note"
  },
  "related_words": [
    {
      "word": "related word",
      "translation": "English",
      "relationship": "synonym|antonym|etc"
    }
  ],
  "difficulty_level": "A1-C2",
  "difficulty_label": "A1-C2 · Essential|Common|Advanced",
  "frequency_rank": "#number or null",
  "frequency_note": "Description or null",
  "usage_notes": "Comprehensive usage information",
  "correct_answer": "primary translation",
  "wrong_options": ["wrong 1", "wrong 2", "wrong 3"],
  "social_hook": "Engaging social media hook"
}

Requirements:
- 2-3 numbered definitions with different senses
- 4-5 contextual examples across proficiency levels
- Grammar notes for verbs/adjectives
- 3-5 collocations
- 2-4 idioms
- Complete etymology with evolution chain
- 3 plausible wrong answers for quiz
- Authoritative, accurate, comprehensive`;
};

export default WOTDSchema;

