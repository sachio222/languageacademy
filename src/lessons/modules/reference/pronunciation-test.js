/**
 * Pronunciation Test Module
 * A test module for practicing pronunciation with Azure Speech Service
 *
 * This module contains essential French words for pronunciation practice
 * covering various phonetic patterns and common sounds
 */

export const pronunciationTest = {
  moduleKey: "2024-12-18-pronunciation-test",
  title: "Pronunciation Test: Essential Words",
  description:
    "Practice your French pronunciation with AI-powered feedback. Master these essential words and sounds!",

  // Email-specific metadata
  emailMetadata: {
    capabilities: [
      "Pronounce common French words correctly",
      "Master French vowel and consonant sounds",
      "Develop native-like pronunciation habits",
    ],
    realWorldUse: "speak French confidently with clear pronunciation",
    nextModuleTeaser: "Continue with conversation practice",
  },

  concepts: [
    {
      term: "French Pronunciation Patterns",
      definition: "French has unique sounds that differ from English",
      example:
        "The French 'r' is guttural, vowels are pure, and many final consonants are silent",
    },
    {
      term: "Nasal Vowels",
      definition: "French has four nasal vowel sounds not found in English",
      example: "Words like 'bon', 'un', 'vin', and 'pain' use nasal vowels",
    },
    {
      term: "Liaison and Elision",
      definition: "French words flow together in speech",
      example:
        "Silent consonants become pronounced when followed by vowels, like 'les amis' (lay-za-mee)",
    },
  ],

  vocabularyReference: [
    // Essential greetings
    {
      french: "bonjour",
      english: "hello / good day",
      note: "greeting - literally 'good day'",
    },
    {
      french: "merci",
      english: "thank you",
      note: "gratitude - notice the French 'r'",
    },
    {
      french: "au revoir",
      english: "goodbye",
      note: "farewell - practice linking the words",
    },

    // Common words with different sounds
    {
      french: "oui",
      english: "yes",
      note: "pure 'ee' sound, starts with 'w'",
    },
    {
      french: "non",
      english: "no",
      note: "nasal 'on' sound",
    },
    {
      french: "s'il vous plaît",
      english: "please",
      note: "formal - practice the liaison",
    },

    // Words with French R
    {
      french: "rouge",
      english: "red",
      note: "practice the guttural 'r'",
    },
    {
      french: "trois",
      english: "three",
      note: "French 'r' + 'wa' sound",
    },
    {
      french: "rue",
      english: "street",
      note: "guttural 'r' + pure 'u'",
    },

    // Nasal vowels
    {
      french: "bon",
      english: "good",
      note: "nasal 'on' - don't pronounce the 'n'",
    },
    {
      french: "vin",
      english: "wine",
      note: "nasal 'in' sound",
    },
    {
      french: "un",
      english: "one",
      note: "nasal 'un' - unique to French",
    },
    {
      french: "pain",
      english: "bread",
      note: "nasal 'ain' sound",
    },

    // Common verbs
    {
      french: "je suis",
      english: "I am",
      note: "liaison - sounds like 'zhuh swee'",
    },
    {
      french: "tu es",
      english: "you are",
      note: "short sounds - 'tu' rhymes with 'vous'",
    },
    {
      french: "il est",
      english: "he is",
      note: "silent consonants",
    },

    // Words with French U
    {
      french: "tu",
      english: "you (informal)",
      note: "French 'u' - pucker lips and say 'ee'",
    },
    {
      french: "lune",
      english: "moon",
      note: "practice the French 'u' sound",
    },
    {
      french: "plus",
      english: "more",
      note: "silent 's' - ends with 'u' sound",
    },

    // Common phrases
    {
      french: "comment",
      english: "how",
      note: "nasal 'an' at the end",
    },
    {
      french: "très bien",
      english: "very good",
      note: "link the words smoothly",
    },
    {
      french: "peut-être",
      english: "maybe",
      note: "liaison between words",
    },

    // Words with silent letters
    {
      french: "beaucoup",
      english: "a lot / much",
      note: "silent 'p' - ends like 'boh-koo'",
    },
    {
      french: "temps",
      english: "time / weather",
      note: "silent 'ps' - nasal 'an' sound",
    },
    {
      french: "nuit",
      english: "night",
      note: "silent 't' - ends with 'wee'",
    },
  ],

  // No exercises for pronunciation-only module
  exerciseConfig: {
    type: "none",
    items: [],
  },
};

