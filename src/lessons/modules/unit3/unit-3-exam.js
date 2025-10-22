/**
 * Unit 3 Exam - Comprehensive test for Expansion unit
 * Tests motion verbs, object pronouns, possessives, and advanced combinations
 */

export const unit3Exam = {
  moduleKey: "2024-02-05-unit3-exam", // Permanent identifier - never changes
  title: "Unit 3 Final Exam - Expansion",
  description:
    "Test everything from Unit 3! Motion verbs, object pronouns, possessives, and complex sentence combinations.",

  // Special flags
  isUnitExam: true,
  unitNumber: 3,
  skipStudyMode: true,

  concepts: [
    {
      term: "Expansion Layer Mastery",
      definition:
        "You've learned advanced French structures that enable more sophisticated communication and expression",
      example:
        "au café, du livre, je viens, tu vas, il part, je le vois, c'est le mien, mon livre, ton ami",
    },
    {
      term: "Motion and Movement",
      definition:
        "Master the three essential motion verbs that describe coming, going, and leaving",
      example:
        "venir (je viens, tu viens, il vient), aller (je vais, tu vas, il va), partir (je pars, tu pars, il part)",
    },
    {
      term: "Object Pronouns",
      definition:
        "Learn to replace nouns with pronouns to avoid repetition and create more natural French",
      example:
        "je le vois (I see it), tu la prends (you take it), nous les avons (we have them)",
    },
    {
      term: "Possession and Ownership",
      definition:
        "Express ownership and relationships using possessive adjectives and pronouns",
      example:
        "mon livre (my book), ton ami (your friend), son chien (his/her dog), c'est le mien (it's mine)",
    },
    {
      term: "Contractions",
      definition:
        "Master French contractions that make speech more natural and fluid",
      example: "au (à + le), du (de + le), dans le → dans l' (before vowel)",
    },
  ],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // Section 1: Contractions & Motion Verbs
      {
        instruction: "Translate to French",
        prompt: "to the café (masculine)",
        hint: "à + le contracts to 'au'",
        expectedAnswer: "au café",
      },
      {
        instruction: "Translate to French",
        prompt: "of the cat (masculine)",
        hint: "de + le contracts to 'du'",
        expectedAnswer: "du chat",
      },
      {
        instruction: "Translate to French",
        prompt: "I am at the house (feminine)",
        hint: "je suis + à la maison (no contraction)",
        expectedAnswer: "je suis à la maison",
      },
      {
        instruction: "Translate to French",
        prompt: "I come",
        hint: "venir conjugated with je",
        expectedAnswer: "je viens",
      },
      {
        instruction: "Translate to French",
        prompt: "you go (informal)",
        hint: "aller conjugated with tu",
        expectedAnswer: "tu vas",
      },
      {
        instruction: "Translate to French",
        prompt: "he leaves",
        hint: "partir conjugated with il",
        expectedAnswer: "il part",
      },
      {
        instruction: "Translate to French",
        prompt: "I see",
        hint: "voir conjugated with je",
        expectedAnswer: "je vois",
      },
      {
        instruction: "Translate to French",
        prompt: "you are coming (you come) with me (informal)",
        hint: "venir + avec + stressed pronoun",
        expectedAnswer: "tu viens avec moi",
      },

      // Section 2: Object Pronouns
      {
        instruction: "Translate to French",
        prompt: "I see it (masculine)",
        hint: "Object pronoun BEFORE verb",
        expectedAnswer: "je le vois",
      },
      {
        instruction: "Translate to French",
        prompt: "she has it (feminine)",
        hint: "Object pronoun contracts with avoir",
        expectedAnswer: "elle l'a",
      },
      {
        instruction: "Translate to French",
        prompt: "we have them",
        hint: "Plural object pronoun before verb",
        expectedAnswer: "nous les avons",
      },
      {
        instruction: "Translate to French",
        prompt: "I want it (masculine)",
        hint: "Object pronoun before vouloir",
        expectedAnswer: "je le veux",
      },

      // Section 3: Possessive Adjectives
      {
        instruction: "Translate to French",
        prompt: "my book (masculine)",
        hint: "Possessive adjective for 'my' + masculine noun",
        expectedAnswer: "mon livre",
      },
      {
        instruction: "Translate to French",
        prompt: "your house (informal, feminine)",
        hint: "Possessive adjective for 'your' informal + feminine noun",
        expectedAnswer: "ta maison",
      },
      {
        instruction: "Translate to French",
        prompt: "his cat (masculine)",
        hint: "Possessive adjective for 'his/her' + masculine noun",
        expectedAnswer: "son chat",
      },
      {
        instruction: "Translate to French",
        prompt: "our books (plural)",
        hint: "Possessive adjective for 'our' + plural noun",
        expectedAnswer: "nos livres",
      },
      {
        instruction: "Translate to French",
        prompt: "their house (singular)",
        hint: "Possessive adjective for 'their' + singular noun",
        expectedAnswer: "leur maison",
      },

      // Section 4: Possessive Pronouns
      {
        instruction: "Translate to French",
        prompt: "it's mine (masculine thing)",
        hint: "c'est + article + possessive pronoun",
        expectedAnswer: "c'est le mien",
      },
      {
        instruction: "Translate to French",
        prompt: "it's yours (informal, masculine thing)",
        hint: "c'est + article + possessive pronoun for 'yours' informal",
        expectedAnswer: "c'est le tien",
      },
      {
        instruction: "Translate to French",
        prompt: "it's his/hers (masculine thing)",
        hint: "c'est + article + possessive pronoun for 'his/her'",
        expectedAnswer: "c'est le sien",
      },

      // Section 5: Complex Combinations
      {
        instruction: "Translate to French",
        prompt: "he has it",
        hint: "Object pronoun before avoir, contracts to l'",
        expectedAnswer: "il l'a",
      },
      {
        instruction: "Translate to French",
        prompt: "I have my cat",
        hint: "avoir + possessive adjective + noun",
        expectedAnswer: "j'ai mon chat",
      },
      {
        instruction: "Translate to French",
        prompt: "she sees them",
        hint: "Plural object pronoun before voir",
        expectedAnswer: "elle les voit",
      },
      {
        instruction: "Translate to French",
        prompt: "is it yours? (informal, masculine thing)",
        hint: "Question: est-ce + possessive pronoun",
        expectedAnswer: "est-ce le tien",
      },
      {
        instruction: "Translate to French",
        prompt: "he's going to leave",
        hint: "aller + infinitive for future meaning",
        expectedAnswer: "il va partir",
      },
      {
        instruction: "Translate to French",
        prompt: "I want it for you (informal)",
        hint: "je veux + object pronoun + pour + stressed pronoun",
        expectedAnswer: "je le veux pour toi",
      },
    ],
  },
};
