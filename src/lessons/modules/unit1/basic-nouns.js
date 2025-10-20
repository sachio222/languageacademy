/**
 * Dynamic Module (ID assigned automatically based on pedagogical position): Basic Nouns
 * Essential nouns from top 100 words - things you'll talk about constantly
 */

import { commonNouns } from "../../vocabularyData.js";

export const basicNouns = {
  moduleKey: "2024-01-06-basic-nouns", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Basic Nouns - People & Things",
  description:
    "Learn essential nouns WITH articles: un livre (a book), une maison (a house) - includes both genders!",

  concepts: [
    {
      term: "Noun Gender - Critical Concept!",
      definition:
        "Every French noun is either masculine or feminine - you must memorize this!",
      example: "Masculine nouns use 'le/un', feminine use 'la/une'",
    },
    {
      term: "Using With être and avoir",
      definition: "Combine nouns with verbs you already know from M2-M3",
      example: "Pattern: pronoun + verb + article + noun",
    },
    {
      term: "Practice Previous Modules!",
      definition:
        "Every exercise uses être or avoir - reinforcing what you learned!",
      example: "Learn nouns WHILE practicing your verbs",
    },
    {
      term: "Rule: Identifying vs. Profession",
      definition:
        "When you identify someone with a noun (like 'man' or 'friend'), you MUST use an article (un, une). NOTE: A special rule for professions and nationalities will be taught later.",
      example:
        "Correct for now: 'elle est une amie'. Future rule: 'elle est avocate' (she is a lawyer).",
    },
  ],

  vocabularyReference: [
    { french: "un livre", english: "a book", note: "masculine (livre)" },
    { french: "un chat", english: "a cat (male)", note: "masculine (chat)" },
    {
      french: "une chatte",
      english: "a cat (female)",
      note: "feminine (chatte)",
    },
    { french: "un chien", english: "a dog (male)", note: "masculine (chien)" },
    {
      french: "une chienne",
      english: "a dog (female)",
      note: "feminine (chienne)",
    },
    { french: "une maison", english: "a house", note: "feminine (maison)" },
    { french: "une voiture", english: "a car", note: "feminine (voiture)" },
    { french: "un ami", english: "a friend (masc)", note: "masculine (ami)" },
    { french: "une amie", english: "a friend (fem)", note: "feminine (amie)" },
    {
      french: "un homme",
      english: "a man",
      note: "masculine, silent h (homme)",
    },
    { french: "une femme", english: "a woman", note: "feminine (femme)" },
    {
      french: "un enfant",
      english: "a child",
      note: "masculine or feminine (enfant)",
    },
    { french: "une chose", english: "a thing", note: "feminine (chose)" },
    { french: "un jour", english: "a day", note: "masculine (jour)" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I have a book"',
        prompt: "I have a book",
        hint: "Combine avoir (M3) + article (M4) + noun - all previous modules!",
        expectedAnswer: "j'ai un livre",
        wrongAnswers: [
          {
            answer: "j'ai une livre",
            feedback: "livre is masculine, use 'un' not 'une'",
          },
          { answer: "j'ai le livre", feedback: "Use 'un' (a), not 'le' (the)" },
        ],
      },
      {
        instruction: 'Say "I have a cat" (male)',
        prompt: "I have a cat (male)",
        hint: "Combine: I have + masculine article + masculine cat",
        expectedAnswer: "j'ai un chat",
        wrongAnswers: [
          {
            answer: "j'ai une chatte",
            feedback: "That's a female cat - use masculine for male",
          },
        ],
      },
      {
        instruction: 'Say "she has a cat" (female)',
        prompt: "she has a cat (female)",
        hint: "Combine: she has + feminine article + feminine cat",
        expectedAnswer: "elle a une chatte",
        wrongAnswers: [
          {
            answer: "elle a un chat",
            feedback: "That's a male cat - use feminine for female",
          },
        ],
      },
      {
        instruction: 'Say "he has a dog"',
        prompt: "he has a dog",
        hint: "Combine: he has + article + dog (masculine)",
        expectedAnswer: "il a un chien",
        wrongAnswers: [
          {
            answer: "il a une chienne",
            feedback: "That's a female dog - use masculine",
          },
        ],
      },
      {
        instruction: 'Say "we have a dog" (female)',
        prompt: "we have a dog (female)",
        hint: "Combine: we have + article + dog (feminine)",
        expectedAnswer: "nous avons une chienne",
        wrongAnswers: [
          {
            answer: "nous avons un chien",
            feedback: "That's a male dog - use feminine",
          },
        ],
      },
      {
        instruction: 'Say "it\'s a house"',
        prompt: "it's a house",
        hint: "Combine: it is + article + house (feminine)",
        expectedAnswer: "c'est une maison",
        wrongAnswers: [
          {
            answer: "c'est un maison",
            feedback: "maison is feminine, use 'une' not 'un'",
          },
        ],
      },
      {
        instruction: 'Say "you have a car"',
        prompt: "you have a car (informal)",
        hint: "Combine: you have + article + car (feminine)",
        expectedAnswer: "tu as une voiture",
        wrongAnswers: [
          {
            answer: "tu as un voiture",
            feedback: "voiture is feminine, use 'une' not 'un'",
          },
        ],
      },
      {
        instruction: 'Say "I have a friend" (male)',
        prompt: "I have a friend (male)",
        hint: "Combine: I have + article + friend (masculine)",
        expectedAnswer: "j'ai un ami",
        wrongAnswers: [
          {
            answer: "j'ai une amie",
            feedback: "For masculine friend, use 'un ami'",
          },
          {
            answer: "il est un ami",
            feedback: "That means 'he is a friend'. The question asks for 'he has a friend'.",
          },
        ],
      },
      {
        instruction: 'Say "she has a friend" (female)',
        prompt: "she has a friend (female)",
        hint: "Combine: she has + article + friend (feminine)",
        expectedAnswer: "elle a une amie",
        wrongAnswers: [
          {
            answer: "elle a un ami",
            feedback: "For feminine friend, use 'une amie'",
          },
          {
            answer: "elle est une amie",
            feedback: "That means 'she is a friend'. The question asks for 'she has a friend'.",
          },
        ],
      },
      {
        instruction: 'Say "I am a man"',
        prompt: "I am a man",
        hint: "Combine: I am + article + man (silent h)",
        expectedAnswer: "je suis un homme",
        wrongAnswers: [
          {
            answer: "je suis une homme",
            feedback: "homme is masculine, use 'un' not 'une'",
          },
          {
            answer: "il est un homme",
            feedback: "That means 'he is a man'. The question asks for 'I am a man'.",
          },
        ],
      },
      {
        instruction: 'Say "you are a woman" (informal)',
        prompt: "you are a woman (informal)",
        hint: "Combine: you are + article + woman",
        expectedAnswer: "tu es une femme",
        wrongAnswers: [
          {
            answer: "tu es un femme",
            feedback: "femme is feminine, use 'une' not 'un'",
          },
          {
            answer: "elle est une femme",
            feedback: "That means 'she is a woman'. The question asks for 'you are a woman'.",
          },
        ],
      },
      {
        instruction: 'Say "I have a child"',
        prompt: "I have a child",
        hint: "Combine: I have + article + child",
        expectedAnswer: "j'ai un enfant",
        wrongAnswers: [
          { answer: "je ai un enfant", feedback: "Use j'ai with apostrophe" },
        ],
      },
      {
        instruction: 'Say "you have a thing"',
        prompt: "you have a thing (informal)",
        hint: "Combine: you have + article + thing (feminine)",
        expectedAnswer: "tu as une chose",
        wrongAnswers: [
          {
            answer: "tu as un chose",
            feedback: "chose is feminine, use 'une' not 'un'",
          },
        ],
      },
      {
        instruction: 'Say "we have a day"',
        prompt: "we have a day",
        hint: "Combine: we have + article + day (masculine)",
        expectedAnswer: "nous avons un jour",
        wrongAnswers: [
          {
            answer: "nous avons une jour",
            feedback: "jour is masculine, use 'un' not 'une'",
          },
        ],
      },
    ],
  },
};
