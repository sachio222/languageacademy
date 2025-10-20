/**
 * Module 141: donner (to give)
 * Unit 11 - Rank 24 in top 100! Essential for transactions, gifts, help
 * Regular -ER verb, extremely high frequency
 */

export const donnerModule = {
  moduleKey: "2024-02-10-donner", // Permanent identifier - never changes
  title: "donner - To Give",
  description:
    "Express giving! 'Je te donne' (I give you), 'Il me donne' (he gives me). Essential for gifts, help, transactions, and sharing. Rank 24 in top 100 French words!",
  unit: 11,

  concepts: [
    {
      term: "donner = to give",
      definition:
        "One of the most common verbs - used for gifts, help, information, objects",
      example:
        "Je donne un cadeau (I give a gift), Tu me donnes ton numéro? (Do you give me your number?)",
    },
    {
      term: "Regular -ER Conjugation",
      definition: "Follows standard -ER pattern like parler, manger",
      example:
        "je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent",
    },
    {
      term: "Direct and Indirect Objects",
      definition:
        "Give WHAT (direct) to WHOM (indirect) - donner quelque chose à quelqu'un",
      example:
        "Je donne le livre à Marie (I give the book to Marie) → Je lui donne le livre (I give it to her)",
    },
    {
      term: "Common Expressions",
      definition: "Many fixed phrases use donner in French",
      example:
        "donner l'heure (tell the time), donner raison (agree with someone), donner rendez-vous (make an appointment)",
    },
  ],

  vocabularyReference: [
    {
      french: "donner",
      english: "to give",
      note: "⭐ Rank 24 - extremely high frequency",
    },
    {
      french: "je donne",
      english: "I give",
      note: "regular -ER conjugation",
    },
    {
      french: "tu donnes",
      english: "you give (informal)",
      note: "add -s for tu form",
    },
    {
      french: "il donne",
      english: "he gives",
      note: "base form",
    },
    {
      french: "elle donne",
      english: "she gives",
      note: "same as il",
    },
    {
      french: "nous donnons",
      english: "we give",
      note: "add -ons",
    },
    {
      french: "vous donnez",
      english: "you give (formal/plural)",
      note: "add -ez",
    },
    {
      french: "ils donnent",
      english: "they give (masculine)",
      note: "add -ent",
    },
    {
      french: "elles donnent",
      english: "they give (feminine)",
      note: "same as ils",
    },
    {
      french: "je te donne",
      english: "I give you / I'm giving you",
      note: "⭐ very common - giving TO someone",
    },
    {
      french: "tu me donnes",
      english: "you give me",
      note: "receiving from someone",
    },
    {
      french: "il me donne",
      english: "he gives me",
      note: "third person giving to me",
    },
    {
      french: "donner quelque chose à quelqu'un",
      english: "to give something to someone",
      note: "full construction pattern",
    },
    {
      french: "donner rendez-vous",
      english: "to make an appointment",
      note: "fixed expression",
    },
    {
      french: "donner l'heure",
      english: "to tell the time",
      note: "common expression",
    },
    {
      french: "donner raison",
      english: "to agree with / to prove right",
      note: "give reason = agree",
    },
    {
      french: "donner de l'aide",
      english: "to give help",
      note: "practical helping",
    },
    {
      french: "donner de l'argent",
      english: "to give money",
      note: "transactions",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Translate to French",
        prompt: "I give",
        hint: "donner for je",
        expectedAnswer: "je donne",
      },
      {
        instruction: "Translate to French",
        prompt: "you give (informal)",
        hint: "donner for tu",
        expectedAnswer: "tu donnes",
      },
      {
        instruction: "Translate to French",
        prompt: "he gives",
        hint: "donner for il",
        expectedAnswer: "il donne",
      },
      {
        instruction: "Translate to French",
        prompt: "we give",
        hint: "donner for nous",
        expectedAnswer: "nous donnons",
      },
      {
        instruction: "Say: 'I give you the book'",
        prompt: "I give you the book",
        hint: "je + te + donne + object",
        expectedAnswer: "je te donne le livre",
      },
      {
        instruction: "Say: 'You give me help'",
        prompt: "You give me help",
        hint: "tu + me + donnes + aide",
        expectedAnswer: "tu me donnes de l'aide",
      },
      {
        instruction: "Say: 'She gives money to the children'",
        prompt: "She gives money to the children",
        hint: "elle donne + argent + aux enfants",
        expectedAnswer: "elle donne de l'argent aux enfants",
      },
      {
        instruction: "Ask: 'Can you give me your phone number?'",
        prompt: "Can you give me your phone number?",
        hint: "tu peux + me donner + ton numéro",
        expectedAnswer: "tu peux me donner ton numéro",
        acceptableAnswers: ["vous pouvez me donner votre numéro"],
      },
      {
        instruction: "Say: 'I'm giving you an appointment'",
        prompt: "I'm giving you an appointment",
        hint: "Fixed expression: donner rendez-vous",
        expectedAnswer: "je te donne rendez-vous",
        acceptableAnswers: ["je vous donne rendez-vous"],
      },
      {
        instruction: "Say: 'They give me the time' (tell me what time it is)",
        prompt: "They tell me the time",
        hint: "Fixed expression: donner l'heure",
        expectedAnswer: "ils me donnent l'heure",
      },
    ],
  },

  skipStudyMode: false,
};
