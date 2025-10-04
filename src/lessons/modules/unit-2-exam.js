/**
 * Unit 2 Exam - Comprehensive test for Composition unit
 * Tests demonstratives, questions, stressed pronouns, prepositions, and adjectives
 */

export const unit2Exam = {
  title: "Unit 2 Final Exam - Composition",
  description:
    "Test everything from Unit 2! Demonstratives, questions, stressed pronouns, prepositions, and descriptive sentences.",

  // Special flags
  isUnitExam: true,
  unitNumber: 2,
  skipStudyMode: true,

  concepts: [],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // Section 1: Demonstratives & ça
      {
        instruction: "Translate to French",
        prompt: "this book",
        hint: "Masculine noun starting with consonant",
        expectedAnswer: "ce livre",
      },
      {
        instruction: "Translate to French",
        prompt: "this house",
        hint: "Feminine noun",
        expectedAnswer: "cette maison",
      },
      {
        instruction: "Translate to French",
        prompt: "these cats",
        hint: "Plural demonstrative",
        expectedAnswer: "ces chats",
      },
      {
        instruction: "Translate to French",
        prompt: "I have this cat",
        hint: "Combine avoir + demonstrative + noun",
        expectedAnswer: "j'ai ce chat",
      },
      {
        instruction: "Translate to French",
        prompt: "that's it / that's right",
        hint: "Common phrase with être + ça",
        expectedAnswer: "c'est ça",
      },

      // Section 2: Questions & Communication
      {
        instruction: "Translate to French",
        prompt: "where",
        hint: "Question word for location",
        expectedAnswer: "où",
      },
      {
        instruction: "Translate to French",
        prompt: "what",
        hint: "Question word - use the short form",
        expectedAnswer: "que",
      },
      {
        instruction: "Translate to French",
        prompt: "who",
        hint: "Question word for people",
        expectedAnswer: "qui",
      },
      {
        instruction: "Translate to French",
        prompt: "how much / how many",
        hint: "Question word for quantity and price",
        expectedAnswer: "combien",
      },
      {
        instruction: "Translate to French",
        prompt: "where is the cat?",
        hint: "Question word + est + definite article + noun",
        expectedAnswer: "où est le chat",
      },
      {
        instruction: "Translate to French",
        prompt: "how much is it?",
        hint: "Question word for price + est-ce",
        expectedAnswer: "combien est-ce",
        acceptableAnswers: ["c'est combien"],
      },

      // Section 3: Stressed Pronouns
      {
        instruction: "Translate to French",
        prompt: "me (stressed pronoun)",
        hint: "Used after prepositions - different from 'je'",
        expectedAnswer: "moi",
      },
      {
        instruction: "Translate to French",
        prompt: "you (stressed pronoun, informal)",
        hint: "Used after prepositions - different from 'tu'",
        expectedAnswer: "toi",
      },
      {
        instruction: "Translate to French",
        prompt: "him (stressed pronoun)",
        hint: "Used after prepositions - different from 'il'",
        expectedAnswer: "lui",
      },

      // Section 4: Prepositions with Stressed Pronouns
      {
        instruction: "Translate to French",
        prompt: "with me",
        hint: "avec + stressed pronoun",
        expectedAnswer: "avec moi",
      },
      {
        instruction: "Translate to French",
        prompt: "for you (informal)",
        hint: "pour + stressed pronoun",
        expectedAnswer: "pour toi",
      },
      {
        instruction: "Translate to French",
        prompt: "with him",
        hint: "avec + stressed pronoun for 'him'",
        expectedAnswer: "avec lui",
      },
      {
        instruction: "Translate to French",
        prompt: "the cat is in the house",
        hint: "le chat + est + preposition + la maison",
        expectedAnswer: "le chat est dans la maison",
      },

      // Section 5: Adjectives & Complex Sentences
      {
        instruction: "Translate to French",
        prompt: "good (masculine)",
        hint: "Common adjective - four letters",
        expectedAnswer: "bon",
      },
      {
        instruction: "Translate to French",
        prompt: "big / large (masculine)",
        hint: "Adjective for size",
        expectedAnswer: "grand",
      },
      {
        instruction: "Translate to French",
        prompt: "small (masculine)",
        hint: "Adjective for size",
        expectedAnswer: "petit",
      },
      {
        instruction: "Translate to French",
        prompt: "a good book",
        hint: "Article + adjective + noun",
        expectedAnswer: "un bon livre",
      },
      {
        instruction: "Translate to French",
        prompt: "I want this for you (informal)",
        hint: "je veux + ça + pour + stressed pronoun",
        expectedAnswer: "je veux ça pour toi",
      },
      {
        instruction: "Translate to French",
        prompt: "she is with me",
        hint: "elle + est + avec + stressed pronoun",
        expectedAnswer: "elle est avec moi",
      },
      {
        instruction: "Translate to French",
        prompt: "I have a small house",
        hint: "avoir + article + adjective + noun",
        expectedAnswer: "j'ai une petite maison",
      },
      {
        instruction: "Translate to French",
        prompt: "where is the big cat?",
        hint: "où + est + article + adjective + noun",
        expectedAnswer: "où est le grand chat",
      },
    ],
  },
};
