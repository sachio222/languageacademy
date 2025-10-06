/**
 * French Grammar Linter - Treats French grammar as "syntax rules"
 * Checks verb conjugations, tenses, and common grammatical patterns
 */

// Verb conjugation database
const verbConjugations = {
  être: {
    present: {
      je: "suis",
      tu: "es",
      il: "est",
      elle: "est",
      nous: "sommes",
      vous: "êtes",
      ils: "sont",
      elles: "sont",
    },
    passé_composé: {
      je: "ai été",
      tu: "as été",
      il: "a été",
      elle: "a été",
      nous: "avons été",
      vous: "avez été",
      ils: "ont été",
      elles: "ont été",
    },
    imparfait: {
      je: "étais",
      tu: "étais",
      il: "était",
      elle: "était",
      nous: "étions",
      vous: "étiez",
      ils: "étaient",
      elles: "étaient",
    },
    futur: {
      je: "serai",
      tu: "seras",
      il: "sera",
      elle: "sera",
      nous: "serons",
      vous: "serez",
      ils: "seront",
      elles: "seront",
    },
  },
  avoir: {
    present: {
      je: "ai",
      tu: "as",
      il: "a",
      elle: "a",
      nous: "avons",
      vous: "avez",
      ils: "ont",
      elles: "ont",
    },
    passé_composé: {
      je: "ai eu",
      tu: "as eu",
      il: "a eu",
      elle: "a eu",
      nous: "avons eu",
      vous: "avez eu",
      ils: "ont eu",
      elles: "ont eu",
    },
    imparfait: {
      je: "avais",
      tu: "avais",
      il: "avait",
      elle: "avait",
      nous: "avions",
      vous: "aviez",
      ils: "avaient",
      elles: "avaient",
    },
    futur: {
      je: "aurai",
      tu: "auras",
      il: "aura",
      elle: "aura",
      nous: "aurons",
      vous: "aurez",
      ils: "auront",
      elles: "auront",
    },
  },
  aller: {
    present: {
      je: "vais",
      tu: "vas",
      il: "va",
      elle: "va",
      nous: "allons",
      vous: "allez",
      ils: "vont",
      elles: "vont",
    },
    passé_composé: {
      je: "suis allé",
      tu: "es allé",
      il: "est allé",
      elle: "est allée",
      nous: "sommes allés",
      vous: "êtes allés",
      ils: "sont allés",
      elles: "sont allées",
    },
    imparfait: {
      je: "allais",
      tu: "allais",
      il: "allait",
      elle: "allait",
      nous: "allions",
      vous: "alliez",
      ils: "allaient",
      elles: "allaient",
    },
    futur: {
      je: "irai",
      tu: "iras",
      il: "ira",
      elle: "ira",
      nous: "irons",
      vous: "irez",
      ils: "iront",
      elles: "iront",
    },
  },
  faire: {
    present: {
      je: "fais",
      tu: "fais",
      il: "fait",
      elle: "fait",
      nous: "faisons",
      vous: "faites",
      ils: "font",
      elles: "font",
    },
    passé_composé: {
      je: "ai fait",
      tu: "as fait",
      il: "a fait",
      elle: "a fait",
      nous: "avons fait",
      vous: "avez fait",
      ils: "ont fait",
      elles: "ont fait",
    },
    imparfait: {
      je: "faisais",
      tu: "faisais",
      il: "faisait",
      elle: "faisait",
      nous: "faisions",
      vous: "faisiez",
      ils: "faisaient",
      elles: "faisaient",
    },
    futur: {
      je: "ferai",
      tu: "feras",
      il: "fera",
      elle: "fera",
      nous: "ferons",
      vous: "ferez",
      ils: "feront",
      elles: "feront",
    },
  },
  parler: {
    present: {
      je: "parle",
      tu: "parles",
      il: "parle",
      elle: "parle",
      nous: "parlons",
      vous: "parlez",
      ils: "parlent",
      elles: "parlent",
    },
    passé_composé: {
      je: "ai parlé",
      tu: "as parlé",
      il: "a parlé",
      elle: "a parlé",
      nous: "avons parlé",
      vous: "avez parlé",
      ils: "ont parlé",
      elles: "ont parlé",
    },
    imparfait: {
      je: "parlais",
      tu: "parlais",
      il: "parlait",
      elle: "parlait",
      nous: "parlions",
      vous: "parliez",
      ils: "parlaient",
      elles: "parlaient",
    },
    futur: {
      je: "parlerai",
      tu: "parleras",
      il: "parlera",
      elle: "parlera",
      nous: "parlerons",
      vous: "parlerez",
      ils: "parleront",
      elles: "parleront",
    },
  },
  manger: {
    present: {
      je: "mange",
      tu: "manges",
      il: "mange",
      elle: "mange",
      nous: "mangeons",
      vous: "mangez",
      ils: "mangent",
      elles: "mangent",
    },
    passé_composé: {
      je: "ai mangé",
      tu: "as mangé",
      il: "a mangé",
      elle: "a mangé",
      nous: "avons mangé",
      vous: "avez mangé",
      ils: "ont mangé",
      elles: "ont mangé",
    },
    imparfait: {
      je: "mangeais",
      tu: "mangeais",
      il: "mangeait",
      elle: "mangeait",
      nous: "mangions",
      vous: "mangiez",
      ils: "mangeaient",
      elles: "mangeaient",
    },
    futur: {
      je: "mangerai",
      tu: "mangeras",
      il: "mangera",
      elle: "mangera",
      nous: "mangerons",
      vous: "mangerez",
      ils: "mangeront",
      elles: "mangeront",
    },
  },
  vouloir: {
    present: {
      je: "veux",
      tu: "veux",
      il: "veut",
      elle: "veut",
      nous: "voulons",
      vous: "voulez",
      ils: "veulent",
      elles: "veulent",
    },
  },
  pouvoir: {
    present: {
      je: "peux",
      tu: "peux",
      il: "peut",
      elle: "peut",
      nous: "pouvons",
      vous: "pouvez",
      ils: "peuvent",
      elles: "peuvent",
    },
  },
  devoir: {
    present: {
      je: "dois",
      tu: "dois",
      il: "doit",
      elle: "doit",
      nous: "devons",
      vous: "devez",
      ils: "doivent",
      elles: "doivent",
    },
  },
};

// Pattern matching for sentence structure
const sentencePatterns = [
  {
    pattern: /^(je|tu|il|elle|nous|vous|ils|elles)\s+\w+/i,
    description: "Subject-Verb pattern",
    required: true,
  },
];

/**
 * Lint a French sentence for grammatical correctness
 */
export function lintFrench(
  sentence,
  expectedTense = null,
  expectedVerb = null,
  options = {}
) {
  const errors = [];
  const warnings = [];
  const { skipPunctuation = false } = options;

  // Normalize sentence
  const normalized = sentence.trim().toLowerCase();

  // For single-word answers (pronouns, question words), skip sentence structure checks
  const isSingleWord =
    !normalized.includes(" ") || normalized.split(/\s+/).length <= 2;

  // Skip subject check for single words or if no verb is expected
  if (!isSingleWord && expectedVerb) {
    // Check if sentence starts with subject pronoun
    const subjects = ["je", "tu", "il", "elle", "nous", "vous", "ils", "elles"];
    const startsWithSubject = subjects.some((s) =>
      normalized.startsWith(s + " ")
    );

    if (!startsWithSubject) {
      // Only error if we're expecting a verb conjugation
      errors.push({
        type: "SyntaxError",
        message:
          "Sentence must start with a subject pronoun (je, tu, il, elle, nous, vous, ils, elles)",
        line: 1,
        column: 0,
      });
    }
  }

  // Extract subject and verb
  const words = normalized.split(/\s+/);
  const subject = words[0];

  // Check verb conjugation if expected verb is provided
  if (expectedVerb && expectedTense) {
    const conjugationDb = verbConjugations[expectedVerb.toLowerCase()];

    if (conjugationDb && conjugationDb[expectedTense]) {
      const expectedConjugation = conjugationDb[expectedTense][subject];

      if (expectedConjugation) {
        // For compound tenses, check multiple words
        const conjugationWords = expectedConjugation.split(" ");
        const sentenceSnippet = words
          .slice(1, 1 + conjugationWords.length)
          .join(" ");

        if (sentenceSnippet !== expectedConjugation) {
          errors.push({
            type: "ConjugationError",
            message: `Incorrect conjugation of "${expectedVerb}" in ${expectedTense}. Expected "${subject} ${expectedConjugation}" but got "${subject} ${sentenceSnippet}"`,
            line: 1,
            column: subject.length + 1,
            expected: expectedConjugation,
            actual: sentenceSnippet,
          });
        }
      }
    }
  }

  // Check for missing punctuation (only for longer sentences)
  const wordCount = normalized.split(/\s+/).length;
  if (!skipPunctuation && wordCount > 3 && !sentence.trim().match(/[.!?]$/)) {
    warnings.push({
      type: "PunctuationWarning",
      message: "Sentence should end with punctuation (.!?)",
      line: 1,
      column: sentence.length,
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Remove accents from French text for comparison
 */
function removeAccents(text) {
  return text
    .replace(/[àâä]/g, "a")
    .replace(/[éèêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o")
    .replace(/[ùûü]/g, "u")
    .replace(/[ÿ]/g, "y")
    .replace(/[ç]/g, "c")
    .replace(/[æ]/g, "ae")
    .replace(/[œ]/g, "oe");
}

/**
 * Check if a sentence matches expected answer
 * Returns an object with match status and optional warning
 */
export function checkAnswer(userAnswer, expectedAnswer, options = {}) {
  const { caseSensitive = false, exactMatch = false } = options;

  let user = userAnswer.trim();
  let expected = expectedAnswer.trim();

  if (!caseSensitive) {
    user = user.toLowerCase();
    expected = expected.toLowerCase();
  }

  // Remove punctuation and apostrophes for comparison
  // Also normalize spaces (so "j'aime" and "j aime" match)
  const userNoPunct = user
    .replace(/[.!?;,']/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const expectedNoPunct = expected
    .replace(/[.!?;,']/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (exactMatch) {
    return {
      isMatch: userNoPunct === expectedNoPunct,
      hasAccentWarning: false,
    };
  }

  // First check for exact match
  if (userNoPunct === expectedNoPunct) {
    return {
      isMatch: true,
      hasAccentWarning: false,
    };
  }

  // Check if it matches without accents - ACCEPT WITHOUT WARNING
  const userNoAccents = removeAccents(userNoPunct);
  const expectedNoAccents = removeAccents(expectedNoPunct);

  if (userNoAccents === expectedNoAccents) {
    // Match without accents - fully accept (no warning)
    return {
      isMatch: true,
      hasAccentWarning: false,
    };
  }

  // Check for order-independent matching when both contain "et" (and)
  // This allows "des chats et des livres" to match "des livres et des chats"
  if (userNoPunct.includes(" et ") && expectedNoPunct.includes(" et ")) {
    const userParts = userNoPunct
      .split(" et ")
      .map((p) => p.trim())
      .sort();
    const expectedParts = expectedNoPunct
      .split(" et ")
      .map((p) => p.trim())
      .sort();

    if (
      userParts.length === expectedParts.length &&
      userParts.every((part, idx) => part === expectedParts[idx])
    ) {
      return {
        isMatch: true,
        hasAccentWarning: false,
      };
    }

    // Also check without accents for order-independent match
    const userPartsNoAccents = userParts.map((p) => removeAccents(p));
    const expectedPartsNoAccents = expectedParts.map((p) => removeAccents(p));

    if (
      userPartsNoAccents.length === expectedPartsNoAccents.length &&
      userPartsNoAccents.every(
        (part, idx) => part === expectedPartsNoAccents[idx]
      )
    ) {
      return {
        isMatch: true,
        hasAccentWarning: false,
      };
    }
  }

  // No match at all
  return {
    isMatch: false,
    hasAccentWarning: false,
  };
}

/**
 * Get all available verbs for exercises
 */
export function getAvailableVerbs() {
  return Object.keys(verbConjugations);
}

/**
 * Get conjugation for a specific verb
 */
export function getConjugation(verb, tense, subject) {
  const conjugationDb = verbConjugations[verb.toLowerCase()];
  if (!conjugationDb || !conjugationDb[tense]) {
    return null;
  }
  return conjugationDb[tense][subject.toLowerCase()];
}

export { verbConjugations };
