# LLM Prompt for Word of the Day Generation

## Copy this entire prompt to Claude/GPT:

---

You are a French linguistics expert creating authoritative Word of the Day entries for Language Academy - the most comprehensive French learning platform.

Generate a complete Word of the Day entry for the French word **"[WORD]"** for date **[DATE]**.

## Requirements:

1. **Multiple definitions** (2-3 numbered senses with different meanings)
2. **5 contextual examples** spanning A1 to B1/B2 levels
3. **Grammar notes** (especially for verbs - conjugation patterns, auxiliary verbs)
4. **5 common collocations** (real usage combinations)
5. **3-4 idioms** with literal and actual meanings
6. **Complete etymology** with Latin/Greek roots and evolution chain
7. **3 related words** with relationship types
8. **3 plausible wrong answers** for multiple choice quiz
9. **Frequency data** if it's a common word (top 1000)

## Output Format:

Return ONLY valid JSON (no markdown, no explanation) in this EXACT structure:

```json
{
  "date": "YYYY-MM-DD",
  "word_id": "word-fr",
  "word": "word",
  "phonetic": "IPA.pronunciation",
  "part_of_speech": "verb|noun|adjective|adverb|pronoun|preposition|conjunction|expression",
  "translation": "primary English translation",
  "definitions": [
    {
      "sense": "1",
      "text": "First definition - be specific and clear",
      "register": "universal|common|grammatical|formal|informal",
      "example": "Brief inline example in French"
    },
    {
      "sense": "2",
      "text": "Second definition - different meaning or usage",
      "register": "universal|common|grammatical",
      "example": "Different brief example"
    }
  ],
  "examples": [
    {
      "french": "Complete French sentence.",
      "english": "English translation.",
      "context": "Context · A1",
      "note": "Usage note or explanation"
    },
    {
      "french": "Another French sentence with different context.",
      "english": "English translation.",
      "context": "Different context · A2",
      "note": "Different usage note"
    },
    {
      "french": "Third example showing advanced usage.",
      "english": "English translation.",
      "context": "Advanced context · B1",
      "note": "Explanation of advanced usage"
    }
  ],
  "grammar": [
    "Grammar note 1 (e.g., irregular patterns)",
    "Grammar note 2 (e.g., auxiliary verb)",
    "Grammar note 3 (e.g., construction patterns)"
  ],
  "collocations": [
    "phrase 1 (translation)",
    "phrase 2 (translation)",
    "phrase 3 (translation)",
    "phrase 4 (translation)",
    "phrase 5 (translation)"
  ],
  "idioms": [
    {
      "expression": "French idiomatic expression",
      "meaning": "English meaning (not literal translation)",
      "level": "A1|A2|B1|B2|C1|C2"
    },
    {
      "expression": "Another idiom",
      "meaning": "English meaning",
      "level": "A2"
    }
  ],
  "etymology": {
    "origin": "Latin/Greek word",
    "period": "Century of attestation",
    "evolution": "Full evolution chain: Latin → Vulgar Latin → Old French → Modern French",
    "note": "Linguistic note about irregularity or interesting history"
  },
  "related_words": [
    {
      "word": "related French word",
      "translation": "English translation",
      "relationship": "synonym|antonym|motion|related|opposite"
    },
    {
      "word": "another related word",
      "translation": "English",
      "relationship": "relationship type"
    }
  ],
  "difficulty_level": "A1|A2|B1|B2|C1|C2",
  "difficulty_label": "A1-C2 · Essential|Common|Advanced",
  "frequency_rank": "#8",
  "frequency_note": "8th most common word in French",
  "usage_notes": "Comprehensive paragraph about frequency, importance, usage across contexts, and learning considerations.",
  "correct_answer": "primary English translation (must match 'translation' field)",
  "wrong_options": [
    "plausible wrong answer 1",
    "plausible wrong answer 2",
    "plausible wrong answer 3"
  ],
  "social_hook": "Engaging question or hook for social media"
}
```

## Example Output for "aller":

```json
{
  "date": "2025-11-11",
  "word_id": "aller-fr",
  "word": "aller",
  "phonetic": "a.le",
  "part_of_speech": "verb",
  "translation": "to go",
  "definitions": [
    {
      "sense": "1",
      "text": "To move or travel to a place",
      "register": "universal",
      "example": "Je vais à Paris"
    },
    {
      "sense": "2",
      "text": "To express state of health or well-being",
      "register": "common",
      "example": "Comment allez-vous ?"
    },
    {
      "sense": "3",
      "text": "To form the immediate future (auxiliary)",
      "register": "grammatical",
      "example": "Je vais partir"
    }
  ],
  "examples": [
    {
      "french": "Je vais au cinéma ce soir.",
      "english": "I'm going to the cinema tonight.",
      "context": "Movement · A1",
      "note": "Basic directional usage"
    },
    {
      "french": "Comment allez-vous ?",
      "english": "How are you?",
      "context": "Well-being · A1",
      "note": "Formal register"
    },
    {
      "french": "Nous allons partir demain.",
      "english": "We're going to leave tomorrow.",
      "context": "Near future · A2",
      "note": "Futur proche construction"
    },
    {
      "french": "Ça va bien, merci.",
      "english": "It's going well, thanks.",
      "context": "Expression · A1",
      "note": "Most common greeting response"
    },
    {
      "french": "Cette robe vous va parfaitement.",
      "english": "This dress suits you perfectly.",
      "context": "Fit/suitability · B1",
      "note": "Extended meaning"
    }
  ],
  "grammar": [
    "Irregular verb · Three stems: all-, v-, ir-",
    "Auxiliary: être (in compound tenses)",
    "Forms futur proche: aller + infinitive"
  ],
  "collocations": [
    "aller à pied (walk)",
    "aller en voiture (drive)",
    "aller voir (go see)",
    "aller chercher (fetch)",
    "aller de soi (go without saying)"
  ],
  "idioms": [
    {
      "expression": "Allez-y !",
      "meaning": "Go ahead! Help yourself!",
      "level": "A2"
    },
    {
      "expression": "Allons-y !",
      "meaning": "Let's go! Come on!",
      "level": "A2"
    },
    {
      "expression": "Aller droit au but",
      "meaning": "Get straight to the point",
      "level": "B1"
    },
    {
      "expression": "Ça va de soi",
      "meaning": "That goes without saying",
      "level": "B2"
    }
  ],
  "etymology": {
    "origin": "Latin ambulāre",
    "period": "9th century",
    "evolution": "From Latin \"ambulāre\" (to walk) → Vulgar Latin \"*alāre\" → Old French \"aler\" → Modern French \"aller\"",
    "note": "Highly irregular due to multiple Latin roots preserved in conjugation"
  },
  "related_words": [
    {
      "word": "venir",
      "translation": "to come",
      "relationship": "antonym"
    },
    {
      "word": "partir",
      "translation": "to leave",
      "relationship": "motion"
    },
    {
      "word": "arriver",
      "translation": "to arrive",
      "relationship": "motion"
    }
  ],
  "difficulty_level": "A1",
  "difficulty_label": "A1-C2 · Essential",
  "frequency_rank": "#8",
  "frequency_note": "8th most common word in French",
  "usage_notes": "Essential high-frequency verb ranked 8th in all French text. Appears in the top 100 most common words across spoken and written French. Critical for expressing movement, well-being, and future actions. Highly irregular conjugation requires dedicated study at all proficiency levels.",
  "correct_answer": "to go",
  "wrong_options": ["to have", "to want", "to make"],
  "social_hook": "Can you guess this essential French verb?"
}
```

## Quality Guidelines:

- **Accuracy:** All French text must have proper accents and be grammatically correct
- **Authority:** Use linguistic terminology (register, conjugation, auxiliary)
- **Comprehensiveness:** More detail than Oxford/Cambridge dictionaries
- **Pedagogical:** Examples should span proficiency levels (A1 → B2)
- **Cultural:** Include real idioms and expressions
- **Historical:** Accurate etymology with evolution chain
- **Quiz:** Wrong answers should be plausible (other common verbs/words, not random)

Return ONLY the JSON object, no additional text.

---

## **To Use:**

1. Replace `[WORD]` with target word (e.g., "faire")
2. Replace `[DATE]` with target date (e.g., "2025-11-12")
3. Paste into Claude/GPT
4. Copy JSON output
5. Run through validation: `validateWOTD(data)`
6. Insert via endpoint or script
