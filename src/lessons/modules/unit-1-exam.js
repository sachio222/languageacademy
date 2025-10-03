/**
 * Unit 1 Exam - Comprehensive test for Foundation unit
 * Tests ability to write basic French sentences from scratch
 */

export const unit1Exam = {
  title: "Unit 1 Final Exam - Foundation",
  description:
    "Test everything you've learned! Write basic French sentences covering pronouns, verbs, nouns, and connectors.",

  // Special flags
  isUnitExam: true,
  unitNumber: 1,
  skipStudyMode: true,

  concepts: [],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // Section 1: Core Foundations
      {
        instruction: "Translate to French",
        prompt: "I am",
        hint: "Use the verb être",
        expectedAnswer: "je suis",
      },
      {
        instruction: "Translate to French",
        prompt: "you have (informal)",
        hint: "Use the verb avoir with informal 'you'",
        expectedAnswer: "tu as",
      },
      {
        instruction: "Translate to French",
        prompt: "she is",
        hint: "Feminine pronoun + être",
        expectedAnswer: "elle est",
      },
      {
        instruction: "Translate to French",
        prompt: "they have (masculine)",
        hint: "Masculine plural pronoun + avoir",
        expectedAnswer: "ils ont",
      },
      {
        instruction: "Translate to French",
        prompt: "we are",
        hint: "First person plural + être",
        expectedAnswer: "nous sommes",
      },
      {
        instruction: "Translate to French",
        prompt: "I have",
        hint: "Remember the apostrophe!",
        expectedAnswer: "j'ai",
      },
      {
        instruction: "Translate to French",
        prompt: "you are (formal)",
        hint: "Formal 'you' + être",
        expectedAnswer: "vous êtes",
      },
      {
        instruction: "Translate to French",
        prompt: "he has",
        hint: "Masculine singular pronoun + avoir",
        expectedAnswer: "il a",
      },

      // Section 2: Nouns & Articles
      {
        instruction: "Translate to French",
        prompt: "a cat",
        hint: "Indefinite article + noun (masculine)",
        expectedAnswer: "un chat",
      },
      {
        instruction: "Translate to French",
        prompt: "the book",
        hint: "Definite article + noun (masculine)",
        expectedAnswer: "le livre",
      },
      {
        instruction: "Translate to French",
        prompt: "a woman",
        hint: "Indefinite article (feminine)",
        expectedAnswer: "une femme",
      },
      {
        instruction: "Translate to French",
        prompt: "the house",
        hint: "Definite article + noun (feminine)",
        expectedAnswer: "la maison",
      },
      {
        instruction: "Translate to French",
        prompt: "the cats",
        hint: "Plural definite article + noun",
        expectedAnswer: "les chats",
      },
      {
        instruction: "Translate to French",
        prompt: "some books",
        hint: "Plural indefinite article + noun",
        expectedAnswer: "des livres",
      },
      {
        instruction: "Translate to French",
        prompt: "I have a dog",
        hint: "Combine avoir + indefinite article + noun",
        expectedAnswer: "j'ai un chien",
      },
      {
        instruction: "Translate to French",
        prompt: "she is a woman",
        hint: "être + indefinite article + noun",
        expectedAnswer: "elle est une femme",
      },

      // Section 3: Connectors & Full Sentences
      {
        instruction: "Translate to French",
        prompt: "a cat and a dog",
        hint: "Use 'et' (and) to connect two nouns",
        expectedAnswer: "un chat et un chien",
      },
      {
        instruction: "Translate to French",
        prompt: "I have a book and a cat",
        hint: "avoir + noun + et + noun",
        expectedAnswer: "j'ai un livre et un chat",
      },
      {
        instruction: "Translate to French",
        prompt: "he is a man but she is a woman",
        hint: "Use 'mais' (but) to connect two statements",
        expectedAnswer: "il est un homme mais elle est une femme",
      },
      {
        instruction: "Translate to French",
        prompt: "we have the books",
        hint: "nous + avoir + plural noun",
        expectedAnswer: "nous avons les livres",
      },
      {
        instruction: "Translate to French",
        prompt: "they are the cats",
        hint: "Masculine plural pronoun + être + plural noun",
        expectedAnswer: "ils sont les chats",
      },
      {
        instruction: "Translate to French",
        prompt: "you have a house and a dog (informal)",
        hint: "tu + avoir + noun + et + noun",
        expectedAnswer: "tu as une maison et un chien",
      },
      {
        instruction: "Translate to French",
        prompt: "I am a man or a woman",
        hint: "Use 'ou' (or) to connect two options",
        expectedAnswer: "je suis un homme ou une femme",
      },
      {
        instruction: "Translate to French",
        prompt: "we have the cats and the dogs",
        hint: "nous + avoir + plural noun + et + plural noun",
        expectedAnswer: "nous avons les chats et les chiens",
      },
    ],
  },
};
