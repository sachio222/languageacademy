/**
 * Dynamic Module (ID assigned automatically based on pedagogical position): Possessive Adjectives - my, your, his, her, our, their
 * Show ownership: "my book", "his cat", "their house"
 */

import { possessiveAdjectives } from "../../vocabularyData.js";

export const module8_possessive_adjectives = {
  moduleKey: "2024-01-31-possessive-adjectives", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Possessive Adjectives - My, Your, His, Her",
  description:
    "Show who owns what: 'my book', 'his cat', 'their house' - essential vocabulary!",

  concepts: [
    {
      term: "Possessive Adjectives Overview",
      definition:
        "Words that show ownership and go directly before the noun they modify",
      example:
        "15 total forms: MY (mon/ma/mes), YOUR informal (ton/ta/tes), HIS/HER (son/sa/ses), OUR (notre/nos), YOUR formal (votre/vos), THEIR (leur/leurs)",
    },
    {
      term: "🔑 CRITICAL RULE: Agreement with the THING owned",
      definition:
        "The possessive adjective matches the gender/number of the THING being owned, NOT the owner",
      example:
        "Marie's book = SON livre (masculine 'son' because 'livre' is masculine, even though Marie is female). Pierre's house = SA maison (feminine 'sa' because 'maison' is feminine, even though Pierre is male)",
    },
    {
      term: "Formal vs Informal 'Your'",
      definition:
        "French has two ways to say 'your' depending on relationship and respect level",
      example:
        "INFORMAL with friends/family: ton/ta/tes (ton frère, ta sœur, tes amis). FORMAL with strangers/respect: votre/vos (votre bureau, vos bagages)",
    },
    {
      term: "Gender-Neutral Forms",
      definition:
        "Some possessives don't change for masculine/feminine - only for singular/plural",
      example:
        "NOTRE/NOS (our): notre maison, notre jardin, nos enfants. VOTRE/VOS (your formal): votre livre, votre famille, vos idées. LEUR/LEURS (their): leur chat, leur maison, leurs amis",
    },
    {
      term: "Memory Trick: The 3-2-2 Pattern",
      definition: "Each owner has a predictable number of forms to memorize",
      example:
        "MY, YOUR (informal), HIS/HER = 3 forms each (masc/fem/plural). OUR, YOUR (formal), THEIR = 2 forms each (singular/plural only)",
    },
  ],

  vocabularyReference: [
    {
      french: "mon",
      english: "my (masculine)",
      note: "masculine form - mon livre, mon père, mon ami",
    },
    {
      french: "ma",
      english: "my (feminine)",
      note: "feminine form - ma maison, ma mère, ma voiture",
    },
    {
      french: "mes",
      english: "my (plural)",
      note: "plural form - mes chats, mes livres, mes amis",
    },
    {
      french: "ton",
      english: "your (masc, informal)",
      note: "masculine form - ton chat, ton frère, ton travail",
    },
    {
      french: "ta",
      english: "your (fem, informal)",
      note: "feminine form - ta voiture, ta sœur, ta chambre",
    },
    {
      french: "tes",
      english: "your (plural, informal)",
      note: "plural form - tes amis, tes parents, tes chaussures",
    },
    {
      french: "son",
      english: "his/her (masculine)",
      note: "masculine form - son livre, son chien, son bureau",
    },
    {
      french: "sa",
      english: "his/her (feminine)",
      note: "feminine form - sa maison, sa fille, sa cuisine",
    },
    {
      french: "ses",
      english: "his/her (plural)",
      note: "plural form - ses chats, ses enfants, ses clés",
    },
    {
      french: "notre",
      english: "our (singular)",
      note: "singular form - notre maison, notre école, notre jardin",
    },
    {
      french: "nos",
      english: "our (plural)",
      note: "plural form - nos chats, nos vacances, nos professeurs",
    },
    {
      french: "votre",
      english: "your (singular, formal)",
      note: "singular form - votre livre, votre famille, votre bureau",
    },
    {
      french: "vos",
      english: "your (plural, formal)",
      note: "plural form - vos livres, vos enfants, vos bagages",
    },
    {
      french: "leur",
      english: "their (singular)",
      note: "singular form - leur chat, leur maison, leur projet",
    },
    {
      french: "leurs",
      english: "their (plural)",
      note: "plural form - leurs chats, leurs amis, leurs idées",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // MY (mon, ma, mes) - 3 exercises
      {
        instruction: "You're talking about your father. Which possessive?",
        prompt: "my father → ___ père",
        hint: "Your possession, père is masculine - check vocab table!",
        expectedAnswer: "mon",
        wrongAnswers: [
          {
            answer: "ma",
            feedback: "That's feminine 'my' - père is masculine",
          },
          { answer: "mes", feedback: "That's plural 'my' - père is singular" },
        ],
      },
      {
        instruction: "You're talking about your mother. Which possessive?",
        prompt: "my mother → ___ mère",
        hint: "Your possession, mère is feminine - check vocab table!",
        expectedAnswer: "ma",
        wrongAnswers: [
          {
            answer: "mon",
            feedback: "That's masculine 'my' - mère is feminine",
          },
          { answer: "mes", feedback: "That's plural 'my' - mère is singular" },
        ],
      },
      {
        instruction:
          "You're talking about your books (multiple). Which possessive?",
        prompt: "my books → ___ livres",
        hint: "Your possession, livres is plural - check vocab table!",
        expectedAnswer: "mes",
        wrongAnswers: [
          {
            answer: "mon",
            feedback: "That's singular masculine 'my' - livres is plural",
          },
          {
            answer: "ma",
            feedback: "That's singular feminine 'my' - livres is plural",
          },
        ],
      },

      // YOUR INFORMAL (ton, ta, tes) - 3 exercises
      {
        instruction:
          "Talking to a friend about their brother. Which possessive?",
        prompt: "your brother → ___ frère (informal)",
        hint: "Friend's possession, frère is masculine - informal form",
        expectedAnswer: "ton",
        wrongAnswers: [
          {
            answer: "ta",
            feedback: "That's feminine 'your' - frère is masculine",
          },
          {
            answer: "votre",
            feedback: "That's formal 'your' - use informal with friends",
          },
        ],
      },
      {
        instruction:
          "Talking to a friend about their sister. Which possessive?",
        prompt: "your sister → ___ sœur (informal)",
        hint: "Friend's possession, sœur is feminine - informal form",
        expectedAnswer: "ta",
        wrongAnswers: [
          {
            answer: "ton",
            feedback: "That's masculine 'your' - sœur is feminine",
          },
          {
            answer: "votre",
            feedback: "That's formal 'your' - use informal with friends",
          },
        ],
      },
      {
        instruction:
          "Talking to a friend about their parents. Which possessive?",
        prompt: "your parents → ___ parents (informal)",
        hint: "Friend's possession, parents is plural - informal form",
        expectedAnswer: "tes",
        wrongAnswers: [
          {
            answer: "ton",
            feedback: "That's singular masculine 'your' - parents is plural",
          },
          {
            answer: "vos",
            feedback: "That's formal 'your' - use informal with friends",
          },
        ],
      },

      // HIS/HER (son, sa, ses) - 3 exercises
      {
        instruction: "Talking about Marie's dog (masculine). Which possessive?",
        prompt: "her dog → ___ chien",
        hint: "Marie owns it, chien is masculine - matches the thing owned!",
        expectedAnswer: "son",
        wrongAnswers: [
          {
            answer: "sa",
            feedback: "That's feminine 'his/her' - chien is masculine",
          },
          {
            answer: "ses",
            feedback: "That's plural 'his/her' - chien is singular",
          },
        ],
      },
      {
        instruction:
          "Talking about Pierre's house (feminine). Which possessive?",
        prompt: "his house → ___ maison",
        hint: "Pierre owns it, maison is feminine - matches the thing owned!",
        expectedAnswer: "sa",
        wrongAnswers: [
          {
            answer: "son",
            feedback: "That's masculine 'his/her' - maison is feminine",
          },
          {
            answer: "ses",
            feedback: "That's plural 'his/her' - maison is singular",
          },
        ],
      },
      {
        instruction: "Talking about someone's children. Which possessive?",
        prompt: "his/her children → ___ enfants",
        hint: "Third person owner, enfants is plural",
        expectedAnswer: "ses",
        wrongAnswers: [
          {
            answer: "son",
            feedback: "That's singular masculine 'his/her' - enfants is plural",
          },
          {
            answer: "sa",
            feedback: "That's singular feminine 'his/her' - enfants is plural",
          },
        ],
      },

      // OUR (notre, nos) - 2 exercises
      {
        instruction:
          "Talking about the house you and your family share. Which possessive?",
        prompt: "our house → ___ maison",
        hint: "Group possession, maison is singular - notre/nos?",
        expectedAnswer: "notre",
        wrongAnswers: [
          {
            answer: "nos",
            feedback: "That's plural 'our' - maison is singular",
          },
          { answer: "votre", feedback: "That's 'your' (formal), not 'our'" },
        ],
      },
      {
        instruction:
          "Talking about the vacations you and your family take. Which possessive?",
        prompt: "our vacations → ___ vacances",
        hint: "Group possession, vacances is plural - notre/nos?",
        expectedAnswer: "nos",
        wrongAnswers: [
          {
            answer: "notre",
            feedback: "That's singular 'our' - vacances is plural",
          },
          { answer: "vos", feedback: "That's 'your' (formal), not 'our'" },
        ],
      },

      // YOUR FORMAL (votre, vos) - 2 exercises
      {
        instruction:
          "Speaking formally to someone about their office. Which possessive?",
        prompt: "your office → ___ bureau (formal)",
        hint: "Formal situation, bureau is singular - votre/vos?",
        expectedAnswer: "votre",
        wrongAnswers: [
          {
            answer: "vos",
            feedback: "That's plural 'your' - bureau is singular",
          },
          {
            answer: "ton",
            feedback: "That's informal 'your' - use formal here",
          },
        ],
      },
      {
        instruction:
          "Speaking formally to someone about their luggage. Which possessive?",
        prompt: "your luggage → ___ bagages (formal)",
        hint: "Formal situation, bagages is plural - votre/vos?",
        expectedAnswer: "vos",
        wrongAnswers: [
          {
            answer: "votre",
            feedback: "That's singular 'your' - bagages is plural",
          },
          {
            answer: "tes",
            feedback: "That's informal 'your' - use formal here",
          },
        ],
      },

      // THEIR (leur, leurs) - 2 exercises
      {
        instruction:
          "Talking about a project owned by a group of people. Which possessive?",
        prompt: "their project → ___ projet",
        hint: "They own it, projet is singular - leur/leurs?",
        expectedAnswer: "leur",
        wrongAnswers: [
          {
            answer: "leurs",
            feedback: "That's plural 'their' - projet is singular",
          },
          { answer: "notre", feedback: "That's 'our', not 'their'" },
        ],
      },
      {
        instruction:
          "Talking about ideas owned by a group of people. Which possessive?",
        prompt: "their ideas → ___ idées",
        hint: "They own them, idées is plural - leur/leurs?",
        expectedAnswer: "leurs",
        wrongAnswers: [
          {
            answer: "leur",
            feedback: "That's singular 'their' - idées is plural",
          },
          { answer: "nos", feedback: "That's 'our', not 'their'" },
        ],
      },
    ],
  },
};
