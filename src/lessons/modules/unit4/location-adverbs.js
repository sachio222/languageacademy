/**
 * Location Adverbs
 * Essential words: here, there, over there, everywhere, somewhere, nowhere
 * Includes ici, là, là-bas, partout, quelque part, nulle part
 */

export const locationAdverbs = {
  moduleKey: "2024-03-26-location-adverbs", // Permanent identifier - never changes
  title: "Location Adverbs - here, there, everywhere",
  description:
    "Express where things are! From 'here' to 'over there' to 'everywhere'.",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Point to locations (here, there, over there, everywhere)",
      "Express presence across different places",
      "Say 'I'm here' or 'It's over there' in French"
    ],
    realWorldUse: "indicate locations and direct people",
    nextModuleTeaser: "Add everyday nouns for daily life"
  },

  concepts: [
    {
      term: "Basic Location",
      definition: "ici (here) vs là (there) - pointing to places",
      example: "je suis ici (I am here), le chat est là (the cat is there)",
    },
    {
      term: "Distance with là-bas",
      definition: "là-bas means 'over there' (farther away than 'là')",
      example: "le café est là-bas (the café is over there)",
    },
    {
      term: "Quantity of Places",
      definition:
        "partout (everywhere), quelque part (somewhere), nulle part (nowhere)",
      example: "Express presence or absence across locations",
    },
    {
      term: "Position in Sentence",
      definition: "Usually placed AFTER the verb",
      example: "je vais là (I go there), il est ici (he is here)",
    },
  ],

  vocabularyReference: [
    { french: "ici", english: "here", note: "this location, nearby" },
    { french: "là", english: "there", note: "that location" },
    { french: "là-bas", english: "over there", note: "farther away" },
    { french: "partout", english: "everywhere", note: "all places" },
    { french: "quelque part", english: "somewhere", note: "some place" },
    { french: "nulle part", english: "nowhere (with ne)", note: "no place" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say 'here'",
        prompt: "here",
        hint: "This location - nearby",
        expectedAnswer: "ici",
        wrongAnswers: [
          {
            answer: "là",
            feedback: "That's 'there', not 'here'",
          },
        ],
      },
      {
        instruction: "Say 'there'",
        prompt: "there",
        hint: "That location",
        expectedAnswer: "là",
        wrongAnswers: [
          {
            answer: "ici",
            feedback: "That's 'here', not 'there'",
          },
        ],
      },
      {
        instruction: "Say 'over there' (farther away)",
        prompt: "over there",
        hint: "là + bas (over there, in the distance)",
        expectedAnswer: "là-bas",
        wrongAnswers: [
          {
            answer: "là",
            feedback: "That's just 'there' - use 'là-bas' for 'over there'",
          },
        ],
      },
      {
        instruction: "Say 'everywhere'",
        prompt: "everywhere",
        hint: "All places - par + tout",
        expectedAnswer: "partout",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'somewhere'",
        prompt: "somewhere",
        hint: "quelque + part (some place)",
        expectedAnswer: "quelque part",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'nowhere' (used with ne)",
        prompt: "nowhere",
        hint: "nulle + part (no place)",
        expectedAnswer: "nulle part",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I am here'",
        prompt: "I am here",
        hint: "je suis + ici",
        expectedAnswer: "je suis ici",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'the cat is there'",
        prompt: "the cat is there",
        hint: "le chat + est + là",
        expectedAnswer: "le chat est là",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'the café is over there'",
        prompt: "the café is over there",
        hint: "le café + est + là-bas",
        expectedAnswer: "le café est là-bas",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I go everywhere'",
        prompt: "I go everywhere",
        hint: "je vais + partout",
        expectedAnswer: "je vais partout",
        wrongAnswers: [],
      },
      {
        instruction:
          "Say 'I never go nowhere' (double negative for 'I never go anywhere')",
        prompt: "I never go anywhere",
        hint: "je ne vais jamais + nulle part",
        expectedAnswer: "je ne vais jamais nulle part",
        acceptableAnswers: ["je ne vais nulle part"],
        wrongAnswers: [],
      },
      {
        instruction: "Say 'the book is somewhere'",
        prompt: "the book is somewhere",
        hint: "le livre + est + quelque part",
        expectedAnswer: "le livre est quelque part",
        wrongAnswers: [],
      },
    ],
  },
};
