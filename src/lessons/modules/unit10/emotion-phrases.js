/**
 * Module 119: Emotion Phrases - Je suis content que...
 * Unit 10 - Expressing feelings about what others do
 */

export const emotionPhrasesModule = {
  moduleKey: "2024-01-25-emotion-phrases", // Permanent identifier - never changes
  title: "Je suis content que... - Emotion Phrases",
  description:
    "Express how you feel about what OTHERS do! 'Je suis content que tu sois là' (I'm happy you're here), 'J'ai peur qu'il parte' (I'm afraid he'll leave). Real relationship language!",
  unit: 10,

  concepts: [
    {
      term: "Expressing Emotions About Others",
      definition:
        "Your feelings are usually about what OTHER PEOPLE do or say!",
      example:
        "Je suis content (I'm happy - about what?) → Je suis content que tu sois là (I'm happy YOU'RE here!)",
    },
    {
      term: "Common Emotion Phrases",
      definition:
        "Happy, sad, afraid, sorry - all followed by 'que + person + action'",
      example:
        "Je suis triste que tu partes (I'm sad you're leaving), J'ai peur qu'elle ne comprenne pas (I'm afraid she won't understand)",
    },
  ],

  vocabularyReference: [
    {
      french: "je suis content que tu sois là",
      english: "I'm happy you're here",
      note: "⭐ welcoming someone",
    },
    {
      french: "je suis triste que tu partes",
      english: "I'm sad you're leaving",
      note: "goodbye emotion",
    },
    {
      french: "j'ai peur qu'il parte",
      english: "I'm afraid he'll leave",
      note: "worry about someone",
    },
    {
      french: "je suis désolé que tu sois malade",
      english: "I'm sorry you're sick",
      note: "sympathy",
    },
    {
      french: "je suis surpris que tu saches ça",
      english: "I'm surprised you know that",
      note: "unexpected knowledge",
    },
    {
      french: "je regrette que tu ne puisses pas venir",
      english: "I regret you can't come",
      note: "disappointment",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Tell your friend you're happy they're here (welcoming!)",
        prompt: "I'm happy you're here",
        hint: "je suis content que + tu + sois là",
        expectedAnswer: "je suis content que tu sois là",
        wrongAnswers: [
          {
            answer: "je suis content que tu es là",
            feedback: "Use 'sois' not 'es': je suis content que tu sois là",
          },
        ],
      },
      {
        instruction: "Express sadness that someone is leaving",
        prompt: "I'm sad you're leaving",
        hint: "je suis triste que + tu + partes",
        expectedAnswer: "je suis triste que tu partes",
        wrongAnswers: [],
      },
      {
        instruction: "Say you're afraid someone will leave (worry)",
        prompt: "I'm afraid he'll leave",
        hint: "j'ai peur que + il + parte",
        expectedAnswer: "j'ai peur qu'il parte",
        wrongAnswers: [],
      },
      {
        instruction: "Express sympathy that someone is sick",
        prompt: "I'm sorry you're sick",
        hint: "je suis désolé que + tu + sois malade",
        expectedAnswer: "je suis désolé que tu sois malade",
        wrongAnswers: [],
      },
      {
        instruction: "Express surprise that someone knows something",
        prompt: "I'm surprised you know that",
        hint: "je suis surpris que + tu + saches ça",
        expectedAnswer: "je suis surpris que tu saches ça",
        wrongAnswers: [
          {
            answer: "je suis surpris que tu sais ça",
            feedback: "Use 'saches' not 'sais': je suis surpris que tu saches",
          },
        ],
      },
      {
        instruction: "Express regret that someone can't come",
        prompt: "I regret you can't come",
        hint: "je regrette que + tu + ne puisses pas venir",
        expectedAnswer: "je regrette que tu ne puisses pas venir",
        acceptableAnswers: ["je regrette que tu ne puisses pas"],
        wrongAnswers: [],
      },
    ],
  },
};
