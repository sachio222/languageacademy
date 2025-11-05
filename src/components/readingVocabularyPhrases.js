// Multi-word phrases to check FIRST (longest first to avoid conflicts)

export const multiWordPhrases = [
  // Pronominal verb forms (l'ai, l'a, l'as, etc.)
  { phrase: "l'ai", translation: "I have it/him/her" },
  { phrase: "l'a", translation: "he/she has it/him/her" },
  { phrase: "l'as", translation: "you have it/him/her" },
  { phrase: "l'avons", translation: "we have it/him/her" },
  { phrase: "l'avez", translation: "you have it/him/her" },
  { phrase: "l'ont", translation: "they have it/him/her" },

  // Negative forms (n'ai pas, n'as pas, etc.)
  { phrase: "n'ai pas", translation: "I don't have" },
  { phrase: "n'as pas", translation: "you don't have" },
  { phrase: "n'a pas", translation: "he/she doesn't have" },
  { phrase: "n'avons pas", translation: "we don't have" },
  { phrase: "n'avez pas", translation: "you don't have" },
  { phrase: "n'ont pas", translation: "they don't have" },

  // Negative pronominal forms (ne l'ai pas, ne l'as pas, etc.)
  { phrase: "ne l'ai pas", translation: "I don't have it/him/her" },
  { phrase: "ne l'as pas", translation: "you don't have it/him/her" },
  { phrase: "ne l'a pas", translation: "he/she doesn't have it/him/her" },
  { phrase: "ne l'avons pas", translation: "we don't have it/him/her" },
  { phrase: "ne l'avez pas", translation: "you don't have it/him/her" },
  { phrase: "ne l'ont pas", translation: "they don't have it/him/her" },

  // Other common negative forms
  { phrase: "ne suis pas", translation: "I'm not" },
  { phrase: "n'es pas", translation: "you're not" },
  { phrase: "n'est pas", translation: "he/she isn't" },
  { phrase: "ne sommes pas", translation: "we're not" },
  { phrase: "n'êtes pas", translation: "you're not" },
  { phrase: "ne sont pas", translation: "they're not" },
  { phrase: "n'est-ce pas", translation: "isn't it" },

  { phrase: "ne vais pas", translation: "I'm not going" },
  { phrase: "ne vas pas", translation: "you're not going" },
  { phrase: "ne va pas", translation: "he/she isn't going" },
  { phrase: "ne allons pas", translation: "we're not going" },
  { phrase: "n'allez pas", translation: "you're not going" },
  { phrase: "ne vont pas", translation: "they're not going" },

  { phrase: "quoi d'autre", translation: "what else" },
];
