# Module Creation Guide: Cognitive Science-Aligned Language Learning

## Overview

This guide provides exact instructions for creating modules that implement our pedagogical principles from `PEDAGOGICAL_ANALYSIS.md`. Every module must follow these cognitive science principles to ensure effective learning.

## Core Principles

### 1. **Progressive Disclosure**

- Start with simple conjugations
- Gradually build complexity through composition
- Never introduce vocabulary students haven't learned yet

### 2. **Interleaved Practice**

- Mix different verb conjugations
- Combine current module with previous modules
- Avoid blocked practice (all same type together)

### 3. **Context-Rich Encoding**

- Every exercise has a clear, practical instruction
- Use real-world scenarios when possible
- Provide meaningful context for each conjugation

### 4. **Error-Driven Learning**

- Specific feedback for common mistakes
- Target misconceptions students actually have
- Build patterns through error correction

### 5. **Active Recall**

- Students must produce answers, not just recognize
- Use `custom` exercise type for maximum flexibility
- Create flashcards that test production

## Module Structure Template

```javascript
/**
 * [verb] - COGNITIVE SCIENCE UPGRADE
 * Implements active recall, composition, and interleaved practice
 * Based on pedagogical analysis principles
 */

import { [verb]Conjugations } from "../../vocabularyData.js";

export const [verb]Module = {
  moduleKey: "2024-XX-XX-[verb]", // Permanent identifier - never changes
  title: "Essential Verb - [verb] ([english])",
  description: "Master [verb] through active recall and composition practice!",

  concepts: [
    {
      term: "[verb] = [english]",
      definition: "[core meaning and usage]",
      example: "Essential for [practical use case]",
    },
    {
      term: "Key Forms to Master",
      definition: "[highlight irregular patterns]",
      example: "[specific conjugation pattern to remember]",
    },
    {
      term: "Composition Power",
      definition: "Combine [verb] with previous modules for infinite expressions",
      example: "[show combinations with previous verbs]",
    },
  ],

  vocabularyReference: [
    // Include all conjugations with helpful notes
  ],

  // UPGRADED: Custom exercises for sophisticated learning
  exerciseConfig: {
    type: "custom",
    items: [
      // Phase 1: Simple conjugations with known vocabulary
      // Phase 2: Basic composition with ça (from previous modules)
      // Phase 3: Composition with vouloir (from previous modules)
      // Phase 4: Composition with pouvoir (from previous modules)
      // Phase 5: Composition with aller (from previous modules)
      // Phase 6: Composition with venir (from previous modules)
    ],
  },
};
```

## Exercise Structure Template

Each exercise must follow this exact structure:

```javascript
{
  instruction: "Clear, practical instruction",
  prompt: "English prompt",
  hint: "French hint with + for composition",
  expectedAnswer: "Correct French answer",
  wrongAnswers: [
    {
      answer: "Common wrong answer",
      feedback: "Specific feedback explaining why it's wrong",
    },
    {
      answer: "Another common wrong answer",
      feedback: "Different feedback for different mistake",
    },
  ],
}
```

## Phase Structure

### Phase 1: Simple Conjugations

- **Purpose:** Master basic conjugations
- **Format:** "I [verb]", "you [verb]", "he [verb]", etc.
- **Vocabulary:** Only the verb itself
- **Example:**

```javascript
{
  instruction: "Say what you [verb]",
  prompt: "I [verb]",
  hint: "je [conjugation]",
  expectedAnswer: "je [conjugation]",
  wrongAnswers: [
    {
      answer: "je [wrong conjugation]",
      feedback: "Je takes '[correct]', not '[wrong]'. Remember: [pattern]",
    },
  ],
}
```

### Phase 2: Basic Composition with ça

- **Purpose:** Learn to combine with objects
- **Format:** "I [verb] that", "What do you [verb] with that?"
- **Vocabulary:** ça, avec (from previous modules)
- **Example:**

```javascript
{
  instruction: "Say what you [verb] with that",
  prompt: "I [verb] that",
  hint: "je [conjugation] + ça",
  expectedAnswer: "je [conjugation] ça",
  wrongAnswers: [
    {
      answer: "je [wrong conjugation] ça",
      feedback: "Je takes '[correct]', not '[wrong]'. Remember: [pattern]",
    },
  ],
}
```

### Phase 3: Composition with vouloir

- **Purpose:** Express desires and wants
- **Format:** "What do you want to [verb]?", "I want to [verb] that"
- **Vocabulary:** vouloir (from Unit 2)
- **Example:**

```javascript
{
  instruction: "Ask what someone wants to [verb]",
  prompt: "What do you want to [verb]?",
  hint: "que veux-tu [verb]",
  expectedAnswer: "que veux-tu [verb]?",
  wrongAnswers: [
    {
      answer: "que [verb]-tu?",
      feedback: "This needs vouloir! Try: que veux-tu [verb]?",
    },
  ],
}
```

### Phase 4: Composition with pouvoir

- **Purpose:** Express ability and permission
- **Format:** "Can you [verb] that?", "I can [verb] that"
- **Vocabulary:** pouvoir (from Unit 2)
- **Example:**

```javascript
{
  instruction: "Ask if someone can [verb] something",
  prompt: "Can you [verb] that?",
  hint: "peux-tu [verb] + ça",
  expectedAnswer: "peux-tu [verb] ça?",
  wrongAnswers: [
    {
      answer: "[verb]-tu ça?",
      feedback: "This needs pouvoir! Try: peux-tu [verb] ça?",
    },
  ],
}
```

### Phase 5: Composition with aller

- **Purpose:** Express future plans
- **Format:** "I am going to [verb] that", "What are you going to [verb]?"
- **Vocabulary:** aller (from Unit 3)
- **Example:**

```javascript
{
  instruction: "Say what you are going to [verb]",
  prompt: "I am going to [verb] that",
  hint: "je vais [verb] + ça",
  expectedAnswer: "je vais [verb] ça",
  wrongAnswers: [
    {
      answer: "je [verb] ça",
      feedback: "This needs aller! Try: je vais [verb] ça",
    },
  ],
}
```

### Phase 6: Composition with venir

- **Purpose:** Express purpose and reason
- **Format:** "I come to [verb] that", "Why do you come?"
- **Vocabulary:** venir (from Unit 3)
- **Example:**

```javascript
{
  instruction: "Say what you come to [verb]",
  prompt: "I come to [verb] that",
  hint: "je viens [verb] + ça",
  expectedAnswer: "je viens [verb] ça",
  wrongAnswers: [
    {
      answer: "je [verb] ça",
      feedback: "This needs venir! Try: je viens [verb] ça",
    },
  ],
}
```

## Available Vocabulary by Unit

### Unit 1 (Available for all modules)

- **être:** je suis, tu es, il est, elle est, nous sommes, vous êtes, ils sont, elles sont
- **avoir:** j'ai, tu as, il a, elle a, nous avons, vous avez, ils ont, elles ont
- **ça:** that (demonstrative)
- **avec:** with

### Unit 2 (Available for Unit 4+ modules)

- **vouloir:** je veux, tu veux, il veut, elle veut, nous voulons, vous voulez, ils veulent, elles veulent
- **pouvoir:** je peux, tu peux, il peut, elle peut, nous pouvons, vous pouvez, ils peuvent, elles peuvent
- **voir:** je vois, tu vois, il voit, elle voit, nous voyons, vous voyez, ils voient, elles voient

### Unit 3 (Available for Unit 4+ modules)

- **venir:** je viens, tu viens, il vient, elle vient, nous venons, vous venez, ils viennent, elles viennent
- **aller:** je vais, tu vas, il va, elle va, nous allons, vous allez, ils vont, elles vont
- **partir:** je pars, tu pars, il part, elle part, nous partons, vous partez, ils partent, elles partent

## Question Form Guidelines

### Use "qu'est-ce que" for Questions

- **Correct:** "qu'est-ce que tu fais?"
- **Avoid:** "que fais-tu?" (less common in everyday speech)

### IMPORTANT: Always Prefer "qu'est-ce que" Over Inversion

- **If there are multiple ways to ask a question, ALWAYS use "qu'est-ce que"**
- **Only use inversion for questions that don't have a "qu'est-ce que" equivalent**
- **Examples:**
  - ✅ "qu'est-ce que tu veux partir?" (not "que veux-tu partir?")
  - ✅ "qu'est-ce que tu fais?" (not "que fais-tu?")
  - ✅ "pourquoi viens-tu?" (no "qu'est-ce que" equivalent for "why")

### Common Question Patterns

- **What do you [verb]?** → "qu'est-ce que tu [verb]?"
- **Can you [verb]?** → "peux-tu [verb]?"
- **Do you want to [verb]?** → "veux-tu [verb]?"
- **Why do you [verb]?** → "pourquoi [verb]-tu?"

## Error Feedback Guidelines

### Conjugation Errors

- **Pattern:** "Je takes '[correct]', not '[wrong]'. Remember: [pattern]"
- **Example:** "Je takes 'fais', not 'fait'. Remember: je fais, il fait"

### Missing Verb Errors

- **Pattern:** "This needs [missing verb]! Try: [correct answer]"
- **Example:** "This needs vouloir! Try: je veux faire ça"

### Question Form Errors

- **Pattern:** "More common: [correct form]"
- **Example:** "More common: qu'est-ce que tu fais?"

## Testing Your Module

### 1. Check Vocabulary

- Verify all vocabulary comes from previous units
- No new words unless they're English cognates
- Test with `?module=X&view=study&exercise=1`

### 2. Check Progression

- Phase 1: Simple conjugations only
- Phase 2: Add ça/avec
- Phase 3+: Add previous verbs
- Each phase builds on the previous

### 3. Check Naturalness

- Are these sentences students would actually use?
- Do they sound natural in French?
- Are they practical for real conversations?

## Common Mistakes to Avoid

### ❌ Don't Do This

- Use vocabulary from future units
- Create unnatural combinations
- Skip phases or jump too quickly
- Use formal/question inversion forms
- Create exercises that are too abstract

### ✅ Do This Instead

- Only use vocabulary from previous units
- Create practical, real-world sentences
- Follow the exact phase progression
- Use common, everyday French forms
- Make exercises immediately useful

## Example: Complete Module

See `src/lessons/modules/unit4/faire.js` and `src/lessons/modules/unit4/devoir.js` for complete examples that follow all these guidelines.

## Quality Checklist

Before submitting a module, verify:

- [ ] Uses only `custom` exercise type
- [ ] Follows exact phase progression (1-6)
- [ ] Only uses vocabulary from previous units
- [ ] Uses "qu'est-ce que" for questions
- [ ] Provides specific error feedback
- [ ] Creates natural, practical sentences
- [ ] Tests successfully in study mode
- [ ] Implements all cognitive science principles
- [ ] Reinforces previous module vocabulary
- [ ] Builds compositional thinking skills

## Final Notes

Remember: The goal is not just to teach conjugations, but to teach students how to **compose** with language. Each module should make students better at combining verbs, asking questions, and expressing complex thoughts using the building blocks they've already learned.

This is what makes our system revolutionary - we're teaching **functional composition** in language, just like we teach it in programming.
