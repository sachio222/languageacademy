# 🎓 Language Academy

An interactive French learning platform inspired by Codecademy, treating French grammar as a functional language with syntax rules, linting, and test validation.

## Features

### 🚀 Rapid Learning Approach

- **Top 100 words first** - Focus on the most common, useful words
- **Immediate practical usage** - Build real phrases from day one
- **Progressive difficulty** - Start with pronouns, add verbs, combine into sentences
- **Question-focused** - Learn to ask questions quickly

### 🔍 Grammar Linting

- Real-time validation of verb conjugations
- Beginner-friendly error messages
- Subject-verb agreement validation
- Adaptive checking (more forgiving for beginners)

### 📚 Interactive Lessons with Cognitive Science

- **Study Mode First** - Review all answers before testing (active recall)
- **Vocabulary Reference** - Always-visible cheat sheet for each module
- **Hands-on exercises** - Write French like code (retrieval practice)
- **Immediate feedback** - See errors and corrections instantly
- **Module Final Exam** - Randomized comprehensive test (80% to pass)
- **Automatic progression** - Flow directly to next module
- **Interleaved practice** - Questions randomized for better retention

### 🎯 Codecademy-Style Experience

- Code editor interface for writing French
- Test runner that validates answers
- Progress tracking across modules
- Hints and examples for each exercise

## Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Then open your browser to the URL shown (typically http://localhost:5173)

### Build for Production

```bash
npm run build
```

## How It Works

### The French "Linter"

The linter treats French grammar rules as syntax rules:

```javascript
// ✓ Valid (passes linting)
je suis étudiant

// ✗ Invalid - ConjugationError
je es étudiant
// Error: Incorrect conjugation of "être" in present
```

### Top 100 Words Database

The system includes the 100 most common French words, categorized by:

- **Pronouns** (je, tu, il, elle, nous, vous, ils, elles)
- **Essential verbs** (être, avoir, vouloir, pouvoir, aller, faire)
- **Question words** (que, qui, où, quand, comment, pourquoi)
- **Common prepositions** (à, de, dans, sur, avec, pour)
- **High-frequency adjectives and adverbs**

### Verb Conjugation Database

Focus on present tense for rapid learning:

- **être** (to be) - je suis, tu es, il est
- **avoir** (to have) - j'ai, tu as, il a
- **vouloir** (to want) - je veux, tu veux, il veut
- **pouvoir** (can) - je peux, tu peux, il peut
- Additional tenses available for advanced modules

### Exercise Structure

Each exercise includes:

- **Instruction** - What to practice
- **Prompt** - English sentence to translate
- **Expected answer** - Correct French translation
- **Tests** - Validation rules that must pass
- **Hint** - Help when stuck

### Lesson Progression (Based on Cognitive Science!)

1. **📖 Concept Introduction** - Initial exposure phase
   - See ALL vocabulary in a table
   - Read key concepts and examples
   - Understand what you'll learn
   - Can show/hide sections as needed
2. **📚 Study Mode** - Active encoding (flashcard style)
   - Click "Reveal Answer" to see correct French
   - Review at your own pace
   - No pressure, no testing yet
3. **✏️ Practice Exercises** - Retrieval practice with scaffolding
   - Reference table always-visible
   - Hints available
   - Immediate feedback on errors
4. **📝 Final Exam** - Comprehensive consolidation test
   - All exercises randomized (interleaving)
   - Must score 80% to pass
   - Solidifies learning through retrieval practice
5. **🎉 Module Complete** - Automatic progression to next module

**Cognitive Science Principles Applied:**

- ✅ **Initial Exposure** - See all content before memorization (crucial!)
- ✅ **Spaced Repetition** - Exposure → Study → Practice → Test
- ✅ **Active Recall** - Flashcards force memory retrieval
- ✅ **Retrieval Practice** - Final exam consolidates learning
- ✅ **Scaffolding** - Support available, gradually removed
- ✅ **Interleaving** - Exam randomizes questions for better retention
- ✅ **Testing Effect** - Multiple exposures (exposure, study, practice, exam)
- ✅ **Immediate Feedback** - Learn from mistakes right away
- ✅ **Progressive Difficulty** - Build on previous knowledge
- ✅ **Chunking** - Information organized in digestible tables

## Project Structure

```
languageacademy/
├── src/
│   ├── components/         # React components
│   │   ├── LessonList.jsx
│   │   ├── LessonView.jsx
│   │   ├── ExercisePane.jsx
│   │   ├── ConceptPane.jsx
│   │   ├── StudyMode.jsx         # Flashcard learning
│   │   ├── ModuleExam.jsx        # Final comprehensive exam
│   │   ├── VocabularyReference.jsx
│   │   └── TestOutput.jsx
│   ├── data/              # Language data
│   │   └── top100words.js # Top 100 French words database
│   ├── lessons/           # Lesson data and test runner
│   │   ├── modules/           # Individual module files (MODULAR!)
│   │   │   ├── pronouns.js
│   │   │   ├── articles.js
│   │   │   ├── basic-nouns.js
│   │   │   ├── demonstratives.js
│   │   │   ├── etre.js
│   │   │   ├── avoir.js
│   │   │   ├── vouloir-pouvoir.js
│   │   │   ├── questions.js
│   │   │   ├── object-pronouns.js
│   │   │   ├── possessive-adjectives.js
│   │   │   ├── basic-nouns.js
│   │   │   ├── possessive-pronouns.js
│   │   │   └── combining.js
│   │   ├── vocabularyData.js  # Core vocabulary
│   │   ├── moduleBuilder.js   # Auto-generates exercises
│   │   ├── lessonData.js      # Imports and builds all modules
│   │   └── testRunner.js      # Test validation
│   ├── linter/            # French grammar linter
│   │   └── frenchLinter.js
│   ├── styles/            # CSS styling
│   │   └── App.css
│   ├── App.jsx            # Main app component
│   └── main.jsx           # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Learning Path (Top 100 Words Approach)

### Module 1: Core Pronouns - The Building Blocks

Master the 8 essential pronouns: je, tu, il, elle, nous, vous, ils, elles

- Learn singular vs plural
- Understand formal vs informal
- Foundation for all French sentences

### Module 2: Demonstratives (NEW POSITION!)

**Essential**: ça, ce, cette, ces - "that/it, this, these"

- **Why here?** You need "ça" immediately for useful phrases!
- Learn: "ça" (most common!), "c'est ça" (that's it)
- Now you can combine with verbs later

### Module 3: être (to be)

**Build sentences**: je suis, tu es, il est

- Combines with Module 2: "c'est ça" (it's that)
- Express identity and states

### Module 4: avoir (to have)

**Possession**: j'ai, tu as, il a

- Combines with Module 2: "j'ai ça" (I have that)
- Learn elision (j'ai not je ai)

### Module 5: vouloir & pouvoir (want, can)

**Express needs**: je veux, je peux

- Combines with Module 2: "je veux ça" (I want that!)
- "tu peux" (you can)

### Module 6: Basic Nouns (NEW!)

**Essential vocabulary**: book, cat, dog, house, car, friend, man, woman, child

- 12 most common nouns from top 100 words
- Learn masculine vs feminine
- **Why here?** You need nouns for possessives!

### Module 7: Question Words

**Ask questions**: que, qui, où, comment, pourquoi

- "Qu'est-ce que c'est?" (What is it?)
- Now can ask about the nouns you learned!

### Module 8: Object Pronouns

**Advanced**: le, la, les (him, her, it, them)

- "je le veux" (I want it - using object pronoun)
- Goes before the verb

### Module 9: Possessive Adjectives

**Ownership**: mon, ton, son, notre, leur

- Now say "mon chat" (my cat), "sa maison" (his/her house)
- Uses nouns from Module 6!

### Module 10: Possessive Pronouns

**Stand-alone**: le mien, le tien, le sien

- "c'est le mien" (it's mine)
- Always with article

### Module 11: Combining Everything

**Real conversations**!

- "il l'a" (he has it)
- "est-ce le sien?" (is it his?)
- Uses ALL previous modules

## Extending the Platform (Super Easy Now!)

### Adding a New Module - Just 3 Steps!

**1. Create a new module file** in `src/lessons/modules/`:

```javascript
// aimer.js (semantic name, not numbered!)
import { aimerConjugations } from "../vocabularyData.js";

export const aimer = {
  // id is set dynamically based on array position
  title: "aimer (to like/love)",
  description: "Express what you like and love!",

  concepts: [
    {
      term: "aimer = to like/love",
      definition: "Express preferences and affection",
      example: "j'aime le français = I like French",
    },
  ],

  vocabularyReference: [
    { french: "j'aime", english: "I like", note: "with elision" },
    { french: "tu aimes", english: "you like", note: "" },
    // ... etc
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "aimer",
    conjugations: aimerConjugations,
    items: [
      { key: "je" },
      { key: "tu" },
      { key: "il" },
      { key: "elle" },
      { key: "nous" },
      { key: "vous" },
      { key: "ils" },
      { key: "elles" },
    ],
  },
};
```

**2. Add vocabulary** to `src/lessons/vocabularyData.js`:

```javascript
export const aimerConjugations = {
  je: {
    pronoun: "je",
    conjugation: "aime",
    combined: "j'aime",
    english: "I like",
  },
  tu: {
    pronoun: "tu",
    conjugation: "aimes",
    combined: "tu aimes",
    english: "you like",
  },
  // ... 6 more
};
```

**3. Import and add** to `src/lessons/lessonData.js`:

```javascript
import { aimer } from "./modules/aimer.js";

const moduleConfigs = [
  module1,
  module2_demonstratives,
  module3_etre,
  module4_avoir,
  module5_vouloir_pouvoir,
  aimer, // ← Just add this line anywhere in order!
  // IDs auto-update: 1, 2, 3, 4, 5, 6...
];
```

**That's it!** The system automatically:

- ✅ Generates all 8 exercises
- ✅ Creates wrong answer feedback
- ✅ Builds vocabulary reference
- ✅ Adds to module list
- ✅ Includes in final exam

### Module Types Supported

**Translation** (e.g., pronouns):

```javascript
exerciseConfig: {
  type: "translation",
  vocabulary: pronouns,
  items: [{ key: "je", wrongAnswers: ["tu", "il"] }]
}
```

**Conjugation** (e.g., single verb):

```javascript
exerciseConfig: {
  type: "conjugation",
  verb: "être",
  conjugations: etreConjugations,
  items: [{ key: "je" }, { key: "tu" }]
}
```

**Mixed** (e.g., two verbs):

```javascript
exerciseConfig: {
  type: "mixed",
  items: [
    { verb: "vouloir", conjugations: vouloirConjugations, key: "je" },
    { verb: "pouvoir", conjugations: pouvoirConjugations, key: "je" }
  ]
}
```

**Custom** (e.g., question words):

```javascript
exerciseConfig: {
  type: "custom",
  items: [{
    instruction: 'Translate "what"',
    prompt: "what",
    expectedAnswer: "que",
    hint: "que or quoi",
    wrongAnswers: [...]
  }]
}
```

### Adding to the Linter

Edit `src/linter/frenchLinter.js` to add conjugation checking:

```javascript
newVerb: {
  present: {
    je: 'conjugation',
    tu: 'conjugation',
    // ... etc
  },
}
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **JavaScript** - Core logic
- **CSS3** - Modern styling with gradients and animations

## Design Philosophy

This tool treats language learning like programming while following proven rapid learning methods:

### Programming Concepts

- **Grammar rules = Syntax rules**
- **Conjugations = Function signatures**
- **Exercises = Coding challenges**
- **Tests = Unit tests**
- **Linting = Grammar checking**

### Rapid Learning Principles

- **Frequency-based** - Learn the top 100 most common words first
- **Practical from day 1** - Build useful phrases immediately
- **Spaced repetition** - Key patterns reinforced across modules
- **Question-focused** - Learn to ask questions early
- **Minimal grammar** - Grammar introduced only as needed

By combining programming concepts with proven language learning methods:

- Immediate feedback on correctness
- Clear, actionable error messages
- Structured progression from basics to complex
- Hands-on practice with real phrases
- Focus on high-frequency, high-value vocabulary

## Future Enhancements

### Next Modules (Top 100 Words Continued)

- [ ] Module 6: Common objects and nouns
- [ ] Module 7: Essential adjectives (good, bad, big, small)
- [ ] Module 8: Time expressions (today, tomorrow, yesterday)
- [ ] Module 9: Prepositions and location
- [ ] Module 10: Negation (ne...pas)

### Feature Enhancements

- [ ] Audio pronunciation
- [ ] Spaced repetition algorithm
- [ ] User accounts and progress saving
- [ ] More verb tenses (past, future, conditional)
- [ ] Adjective agreement checking
- [ ] Real conversation scenarios
- [ ] Achievements and streaks

## License

MIT

---

**Happy Learning!** 🇫🇷✨
