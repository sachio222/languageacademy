/**
 * Vocabulary Index - Main entry point for all vocabulary data
 * Re-exports everything to maintain backward compatibility
 */

// Pronouns and related
export * from "./pronouns.js";
export * from "./demonstratives.js";
export * from "./possessives.js";

// Verbs (all conjugations from subdirectory)
export * from "./verbs/index.js";

// Nouns
export * from "./nouns.js";

// Adjectives
export * from "./adjectives.js";

// Adverbs
export * from "./adverbs.js";

// Connectors and prepositions
export * from "./connectors.js";

// Modifiers (negation, comparison)
export * from "./modifiers.js";

// Questions
export * from "./questions.js";

// Phrases
export * from "./phrases.js";

// Helper functions
export * from "./helpers.js";

