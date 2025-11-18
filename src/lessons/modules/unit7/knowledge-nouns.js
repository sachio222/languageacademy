/**
 * Module: Knowledge & Learning Nouns
 * Unit 7 - Knowledge & Learning theme
 * Essential vocabulary to complete the cognitive verb set
 */

export const knowledgeNounsModule = {
  moduleKey: "2024-05-03-knowledge-nouns", // Permanent identifier - never changes
  title: "Knowledge & Learning - Essential Nouns",
  description:
    "Essential nouns for learning: la question (question), la réponse (answer), l'idée (idea), le cours (class)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Talk about academic concepts (question, answer, idea, class)",
      "Discuss learning and educational contexts",
      "Use knowledge nouns with cognitive verbs naturally"
    ],
    realWorldUse: "discuss education and ideas",
    nextModuleTeaser: "Add discourse markers to sound like a native"
  },

  concepts: [
    {
      term: "Academic nouns",
      definition:
        "Essential vocabulary for school, university, and learning contexts",
      example:
        "le cours (class), la leçon (lesson), l'école (school), l'université (university)",
    },
    {
      term: "Knowledge nouns",
      definition: "Abstract nouns related to knowing and understanding",
      example:
        "la connaissance (knowledge - what you know), le savoir (knowledge - abstract), la pensée (thought)",
    },
    {
      term: "Communication nouns",
      definition: "Question-and-answer vocabulary - essential for learning!",
      example: "la question (question), la réponse (answer), l'idée (idea)",
    },
    {
      term: "Complete sentence composition",
      definition: "Now you can build full sentences about learning and knowing",
      example:
        "J'ai une question (I have a question), C'est une bonne idée (That's a good idea), Je vais au cours (I'm going to class)",
    },
  ],

  vocabularyReference: [
    {
      french: "la connaissance",
      english: "knowledge (what you know)",
      note: "feminine noun - from connaître",
    },
    {
      french: "le savoir",
      english: "knowledge (abstract)",
      note: "masculine noun - from savoir",
    },
    {
      french: "l'apprentissage (m)",
      english: "learning (the process)",
      note: "masculine noun - from apprendre",
    },
    {
      french: "l'étude (f)",
      english: "study",
      note: "feminine noun - from étudier",
    },
    {
      french: "la leçon",
      english: "lesson",
      note: "feminine noun ⭐ what you're doing now!",
    },
    {
      french: "le cours",
      english: "class / course",
      note: "masculine noun",
    },
    {
      french: "l'école (f)",
      english: "school",
      note: "feminine noun - primary/secondary",
    },
    {
      french: "l'université (f)",
      english: "university",
      note: "feminine noun - higher education",
    },
    {
      french: "la pensée",
      english: "thought / thinking",
      note: "feminine noun - from penser",
    },
    {
      french: "l'idée (f)",
      english: "idea",
      note: "feminine noun ⭐ very common!",
    },
    {
      french: "la question",
      english: "question",
      note: "⭐ essential for learning!",
    },
    {
      french: "la réponse",
      english: "answer",
      note: "feminine noun",
    },
    {
      french: "Allons-y!",
      english: "Let's go!",
      note: "imperative phrase ⭐ very common expression",
    },
  ],

  exercises: [
    {
      id: "knowledge-nouns.1",
      instruction: "Translate 'I have a question'",
      prompt: "I have a question",
      hint: "j'ai + une question (feminine)",
      expectedAnswer: "j'ai une question",
      wrongAnswers: [
        {
          answer: "j'ai un question",
          feedback: "'Question' is feminine - use 'une question'!",
        },
      ],
    },
    {
      id: "knowledge-nouns.2",
      instruction: "Translate 'That's a good idea'",
      prompt: "That's a good idea",
      hint: "c'est + une bonne idée (feminine adjective agrees)",
      expectedAnswer: "c'est une bonne idée",
      wrongAnswers: [],
    },
    {
      id: "knowledge-nouns.3",
      instruction: "Translate 'I go to university'",
      prompt: "I go to university",
      hint: "je vais + à l'université (use à l' before vowel)",
      expectedAnswer: "je vais à l'université",
      wrongAnswers: [],
    },
    {
      id: "knowledge-nouns.4",
      instruction: "Translate 'I know the answer'",
      prompt: "I know the answer",
      hint: "je sais + la réponse (use savoir for facts)",
      expectedAnswer: "je sais la réponse",
      wrongAnswers: [
        {
          answer: "je connais la réponse",
          feedback: "Use 'je sais' for facts/knowledge, not 'je connais'!",
        },
      ],
    },
    {
      id: "knowledge-nouns.5",
      instruction: "Translate 'I'm learning my lessons'",
      prompt: "I'm learning my lessons",
      hint: "j'apprends + mes leçons",
      expectedAnswer: "j'apprends mes leçons",
      wrongAnswers: [],
    },
    {
      id: "knowledge-nouns.6",
      instruction: "Translate 'I understand the question'",
      prompt: "I understand the question",
      hint: "je comprends + la question",
      expectedAnswer: "je comprends la question",
      wrongAnswers: [],
    },
  ],
};
