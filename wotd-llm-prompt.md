# LLM Prompt for Word of the Day Generation

## Copy this entire prompt to Claude/GPT:

---

You are a French linguistics expert creating authoritative Word of the Day entries for Language Academy - the most comprehensive French learning platform.

Generate a complete Word of the Day entry for the French word **"[WORD]"** for date **[DATE]**.

**IMPORTANT FOR ENGAGEMENT SLIDE (Requirement #10):** Analyze the word type and choose the BEST engagement format. Don't default to "challenge" for everything! Verbs should get "quiz" with conjugation, confusing words should get "opinion" or "mistake", cognates should get "mnemonic".

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
10. **Engagement slide** - ANALYZE word type! Verbs→quiz, nouns→challenge/mnemonic, confusing pairs→opinion/mistake

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
  "social_hook": "Engaging question or hook for social media",
  "engagement_slide": {
    "type": "quiz|challenge|opinion|mnemonic|mistake",
    "content": {
      // Type-specific content (see section 10 below)
    }
  }
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
  "social_hook": "Can you guess this essential French verb?",
  "engagement_slide": {
    "type": "quiz",
    "content": {
      "question": "Je _____ au cinéma ce soir.",
      "options": ["vais", "vas", "va"],
      "correct": "vais"
    }
  }
}
```

## More Examples Showing Type Variety:

**Verb (piloter) → QUIZ:**

```json
{
  "word": "piloter",
  "part_of_speech": "verb",
  ...
  "engagement_slide": {
    "type": "quiz",
    "content": {
      "question": "Il _____ un avion depuis 10 ans.",
      "options": ["pilote", "pilotes", "pilotent"],
      "correct": "pilote"
    }
  }
}
```

**Cognate (décider) → MNEMONIC:**

```json
{
  "word": "décider",
  "part_of_speech": "verb",
  ...
  "engagement_slide": {
    "type": "mnemonic",
    "content": {
      "hook": "'Décider' looks like 'decide'",
      "connection": "It means the same thing!",
      "reinforcement": "décider = to decide"
    }
  }
}
```

**Confusing pair (à/a) → OPINION:**

```json
{
  "word": "à",
  "part_of_speech": "preposition",
  ...
  "engagement_slide": {
    "type": "opinion",
    "content": {
      "question": "Tell us your experience",
      "option_a": "à (with accent)",
      "option_b": "a (no accent)"
    }
  }
}
```

---

## 10. Engagement Slide (Instagram Comment Driver)

Generate ONE slide designed to drive Instagram comments.

**⚠️ CRITICAL:** Vary your selection! Don't default to "challenge" for every word. Analyze the word's characteristics and choose the type that creates the BEST learning opportunity.

**Selection Guide (CHOOSE THE BEST FIT - VARY YOUR CHOICES!):**

- **quiz** → Verbs with conjugation patterns, words with multiple meanings, true/false grammar concepts
  - Example: Fill-in-blank conjugation, multiple choice meanings, true/false about usage
  - BEST FOR: Verbs (être, avoir, aller, faire), words with multiple senses
- **challenge** → Common A1-A2 words that beginners can easily practice with
  - Example: Sentence creation with everyday words
  - BEST FOR: Simple common words (manger, dormir, aimer, habiter)
- **opinion** → Words with confusing similar forms or homophones
  - Example: infinitive vs participle, homophones (à/a, ou/où)
  - BEST FOR: Words with tricky variations, false friends
- **mnemonic** → Words that sound like English words or have memorable associations
  - Example: Sound-alike tricks, visual mnemonics
  - BEST FOR: Words with English cognates or funny sound similarities
- **mistake** → Words that have well-documented common learner errors
  - Example: Article usage, preposition errors, false friends
  - BEST FOR: Words where learners make predictable mistakes
  - Keep explanatin concie, not thorough

**IMPORTANT:** Choose different types for different words to keep content fresh and engaging!

**Selection Priority (choose first match):**

1. **Words with common documented errors → MUST use "mistake"**
2. **Words with English cognates, sound-alikes, common roots → MUST use "mnemonic"**
3. **Words with confusing forms (infinitive vs participle, homophones) → MUST use "opinion"**
4. **Verbs without clear conjugation opportunity → MUST use "challenge"**
5. **If none of the above apply** → Choose "quiz" (for variations/conjugations) OR "challenge" (for versatile words)

### Quiz Format:

Use for words with clear right/wrong answers (conjugations, meanings, usage).

Examples of when to use:

- Verb conjugation: "Je **\_** au cinéma" (vais/vas/va)
- Multiple meanings: "What does 'aller' mean in: Comment allez-vous?"
- Grammar rules: "True or false: 'Parler' uses être in passé composé"

```json
"engagement_slide": {
  "type": "quiz",
  "content": {
    "question": "Complete: Je _____ français tous les jours.",
    "options": ["parle", "parles", "parlent"],
    "correct": "parle"
  }
}
```

Note: The template automatically adds "Comment your answer" CTA. Don't include hints or emojis.

### Challenge Format:

Use for common, versatile words learners can practice with.

**IMPORTANT:** Always provide a real example sentence using the word!

```json
"engagement_slide": {
  "type": "challenge",
  "content": {
    "prompt": "Use 'parler' in your own sentence!",
    "example": "Je parle français avec mes collègues au travail."
  }
}
```

Note: The template automatically adds "Comment below" CTA. Don't include emojis - they're added automatically.

### Opinion Format:

Use for words with tricky variations that confuse learners.

```json
"engagement_slide": {
  "type": "opinion",
  "content": {
    "question": "Tell us your experience",
    "option_a": "parler (infinitive)",
    "option_b": "parlé (past participle)"
  }
}
```

Note: The template automatically adds "Comment A or B" CTA. The title is always "Which is harder?"

### Mnemonic Format:

Use for words with sound similarities or memorable visual associations.

```json
"engagement_slide": {
  "type": "mnemonic",
  "content": {
    "hook": "'Parler' sounds like 'parlor'",
    "connection": "People TALK in a parlor",
    "reinforcement": "parler = to speak"
  }
}
```

Note: The template automatically adds "Comment your memory trick" CTA.

### Mistake Format:

Use when there's a common, documented learner error.

```json
"engagement_slide": {
  "type": "mistake",
  "content": {
    "wrong": "Je parle bien français",
    "correct": "Je parle bien LE français",
    "rule": "Always use the article with language names"
  }
}
```

Note: The template automatically adds "Have you made this mistake?" CTA.

**Requirements:**

- Use the actual word in prompts (not "this word")
- Keep questions/challenges achievable and clear
- Don't include emojis (automatically added by template)
- Don't include CTAs (automatically added by template)
- **Follow the Selection Priority above** - don't default to the same type repeatedly

---

## Quality Guidelines:

- **Accuracy:** All French text must have proper accents and be grammatically correct
- **Authority:** Use linguistic terminology (register, conjugation, auxiliary)
- **Comprehensiveness:** More detail than Oxford/Cambridge dictionaries
- **Pedagogical:** Examples should span proficiency levels (A1 → B2)
- **Cultural:** Include real idioms and expressions
- **Historical:** Accurate etymology with evolution chain
- **Quiz:** Wrong answers should be plausible (other common verbs/words, not random)
- **Engagement:** Choose quiz/challenge/opinion type that best fits this word's learning opportunities

Return ONLY the JSON object, no additional text.

---

## **To Use:**

1. Replace `[WORD]` with target word (e.g., "faire")
2. Replace `[DATE]` with target date (e.g., "2025-11-12")
3. Paste into Claude/GPT
4. Copy JSON output
5. Run through validation: `validateWOTD(data)`
6. Insert via endpoint or script
