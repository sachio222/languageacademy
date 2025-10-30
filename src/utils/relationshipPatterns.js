/**
 * Generic relationship generation patterns
 * Eliminates duplicate logic in relationship generation
 */

/**
 * Generic function to find target words by a specific field
 */
export const findTargetWords = (word, allWords, fieldName, wordValue) => {
  if (!wordValue || !fieldName) return [];
  
  return allWords.filter(w => {
    const fieldValue = w[fieldName];
    return fieldValue && fieldValue.toLowerCase() === wordValue.toLowerCase();
  });
};

/**
 * Generic function to create relationship objects
 */
export const createRelationship = (targetWord, type, note) => ({
  type,
  targetId: targetWord.id,
  targetWord: targetWord.word,
  note,
});

/**
 * Generic function to generate relationships from a field
 */
export const generateRelationshipsFromField = (word, allWords, fieldName, relationshipType, noteGenerator) => {
  if (!word[fieldName]) return [];

  const targetWords = findTargetWords(word, allWords, fieldName, word[fieldName]);
  
  return targetWords.map(targetWord => 
    createRelationship(targetWord, relationshipType, noteGenerator(targetWord))
  );
};

/**
 * Generic function to generate relationships to a field
 */
export const generateRelationshipsToField = (word, allWords, partOfSpeech, relationshipType, noteGenerator) => {
  if (word.partOfSpeech !== partOfSpeech) return [];

  const targetWords = findTargetWords(word, allWords, partOfSpeech, word.word);
  
  return targetWords.map(targetWord => 
    createRelationship(targetWord, relationshipType, noteGenerator(targetWord))
  );
};
