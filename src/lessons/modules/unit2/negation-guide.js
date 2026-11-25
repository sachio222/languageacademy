/**
 * Negation Guide - Saying no
 * Unit 2 - Gathers ne … pas, pas de, ne … plus, ne … rien and ne … jamais into one page,
 * using only être, avoir and the words of Unit 1. Rendered by GuideScreen.jsx from `guide`.
 * French is written with “curly quotes” inside English text so the screen can style it and the
 * graph checker can read it.
 */

export const negationGuideModule = {
  moduleKey: "2026-11-24-negation-guide", // Permanent identifier - never changes
  title: "Saying No - Negation Guide",
  description: "Say not, no more, nothing and never with sentences you already know.",

  // Special flag for help/interstitial modules
  isHelpModule: true,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Say what you are not and what you do not have",
      "Say no longer, nothing and never",
    ],
    realWorldUse: "say no in French",
    nextModuleTeaser: "Point at things with this and that",
  },

  concepts: [],
  vocabularyReference: [],
  exercises: [],

  guide: {
    sections: [
      {
        heading: "Not: “ne … pas”",
        rule: "Put “ne” before the verb and “pas” after it. Before a vowel, “ne” becomes “n'”.",
        rows: [
          { french: "je ne suis pas", english: "I'm not" },
          { french: "tu n'es pas", english: "you're not" },
          { french: "elle n'est pas", english: "she isn't" },
          { french: "je n'ai pas", english: "I don't have" },
          { french: "nous n'avons pas", english: "we don't have" },
          { french: "ils n'ont pas", english: "they don't have" },
        ],
        examples: [
          { french: "Non, je ne suis pas fatigué.", english: "No, I'm not tired." },
          { french: "Paul n'est pas content.", english: "Paul isn't happy." },
        ],
      },
      {
        heading: "Not any: “pas de”",
        rule: "After “pas”, “un”, “une” and “des” become “de”, or “d'” before a vowel.",
        rows: [
          { french: "Je n'ai pas de chat.", english: "I don't have a cat." },
          { french: "Il n'a pas de voiture.", english: "He doesn't have a car." },
          {
            french: "Nous n'avons pas d'amis.",
            english: "We don't have any friends.",
            note: "Before a vowel, “de” becomes “d'”.",
          },
          {
            french: "Je n'ai pas le livre.",
            english: "I don't have the book.",
            note: "“Le”, “la” and “les” stay as they are.",
          },
          {
            french: "Paul n'est pas un enfant.",
            english: "Paul isn't a child.",
            note: "After “être”, “un” and “une” stay as they are.",
          },
        ],
        examples: [
          { french: "J'ai un chat, mais je n'ai pas de chien.", english: "I have a cat, but I don't have a dog." },
        ],
      },
      {
        heading: "No more, nothing, never: swap “pas”",
        rule: "Keep “ne” and put another word where “pas” goes.",
        rows: [
          { french: "ne … pas", english: "not" },
          { french: "ne … plus", english: "not anymore, no more" },
          { french: "ne … rien", english: "nothing" },
          { french: "ne … jamais", english: "never" },
        ],
        examples: [
          { french: "Je ne suis plus fatigué.", english: "I'm not tired anymore." },
          { french: "Je n'ai plus de café.", english: "I don't have any more coffee." },
          { french: "Il n'a rien.", english: "He has nothing." },
          { french: "Tu n'es jamais content.", english: "You're never happy." },
        ],
      },
    ],
  },
};
