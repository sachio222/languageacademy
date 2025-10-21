/**
 * Vocabulary Relationships
 * Cross-reference relationship definitions and indices
 */

import { RelationshipTypes } from './schema.js';

/**
 * Relationship storage - maps relationship IDs to relationship data
 */
export const relationships = new Map();

/**
 * Relationships grouped by type for efficient querying
 */
export const relationshipsByType = new Map();

/**
 * Initialize relationship type groups
 */
Object.values(RelationshipTypes).forEach(type => {
  relationshipsByType.set(type, []);
});

/**
 * Add a relationship between two vocabulary items
 */
export function addRelationship(sourceId, targetId, type, note = '', strength = 1.0, language = null) {
  const relationshipId = `${sourceId}-${type}-${targetId}`;
  
  const relationship = {
    id: relationshipId,
    sourceId,
    targetId,
    type,
    note,
    strength,
    language,
    created_at: new Date().toISOString()
  };
  
  relationships.set(relationshipId, relationship);
  
  // Add to type-based index
  if (!relationshipsByType.has(type)) {
    relationshipsByType.set(type, []);
  }
  relationshipsByType.get(type).push(relationshipId);
  
  return relationshipId;
}

/**
 * Get all relationships for a word
 */
export function getWordRelationships(wordId) {
  const wordRelationships = [];
  
  for (const [id, relationship] of relationships) {
    if (relationship.sourceId === wordId || relationship.targetId === wordId) {
      wordRelationships.push(relationship);
    }
  }
  
  return wordRelationships;
}

/**
 * Get relationships by type
 */
export function getRelationshipsByType(type) {
  const relationshipIds = relationshipsByType.get(type) || [];
  return relationshipIds.map(id => relationships.get(id)).filter(Boolean);
}

/**
 * Pre-defined common relationships for French vocabulary
 */

// Gender pairs (masculine/feminine forms)
const genderPairs = [
  ['ami-fr', 'amie-fr'], // friend
  ['chat-fr', 'chatte-fr'], // cat
  ['chien-fr', 'chienne-fr'], // dog
  ['bon-fr', 'bonne-fr'], // good
  ['grand-fr', 'grande-fr'], // big/tall
  ['petit-fr', 'petite-fr'], // small
  ['nouveau-fr', 'nouvelle-fr'], // new
  ['vieux-fr', 'vieille-fr'], // old
  ['beau-fr', 'belle-fr'] // beautiful
];

// Conjugation pairs (pronoun + verb forms)
const conjugationPairs = [
  ['je-fr', 'suis-fr'], // je suis
  ['tu-fr', 'es-fr'], // tu es
  ['il-fr', 'est-fr'], // il est
  ['elle-fr', 'est-fr'], // elle est
  ['nous-fr', 'sommes-fr'], // nous sommes
  ['vous-fr', 'êtes-fr'], // vous êtes
  ['ils-fr', 'sont-fr'], // ils sont
  ['elles-fr', 'sont-fr'] // elles sont
];

// Semantic field relationships (words in same domain)
const semanticFields = {
  family: ['père-fr', 'mère-fr', 'fils-fr', 'fille-fr', 'frère-fr', 'sœur-fr'],
  colors: ['rouge-fr', 'bleu-fr', 'vert-fr', 'jaune-fr', 'blanc-fr', 'noir-fr'],
  food: ['pain-fr', 'eau-fr', 'lait-fr', 'café-fr', 'thé-fr', 'vin-fr'],
  animals: ['chat-fr', 'chien-fr', 'oiseau-fr', 'poisson-fr']
};

// Initialize common relationships
export function initializeCommonRelationships() {
  // Add gender pair relationships
  genderPairs.forEach(([masculine, feminine]) => {
    addRelationship(masculine, feminine, RelationshipTypes.GENDER_PAIR, 'feminine form');
    addRelationship(feminine, masculine, RelationshipTypes.GENDER_PAIR, 'masculine form');
  });
  
  // Add conjugation relationships
  conjugationPairs.forEach(([pronoun, verb]) => {
    addRelationship(pronoun, verb, RelationshipTypes.CONJUGATION_PAIR, 'verb form for this pronoun');
    addRelationship(verb, pronoun, RelationshipTypes.CONJUGATION_PAIR, 'pronoun for this verb form');
  });
  
  // Add semantic field relationships
  Object.entries(semanticFields).forEach(([field, words]) => {
    words.forEach(word1 => {
      words.forEach(word2 => {
        if (word1 !== word2) {
          addRelationship(word1, word2, RelationshipTypes.SEMANTIC_FIELD, `${field} vocabulary`);
        }
      });
    });
  });
}

// Initialize relationships on module load
initializeCommonRelationships();

export default {
  relationships,
  relationshipsByType,
  addRelationship,
  getWordRelationships,
  getRelationshipsByType
};

