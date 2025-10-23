// Test French sorting behavior
const testWords = ['a', 'à', 'abeille', 'accent', 'âge', 'agriculture', 'être', 'école', 'éléphant'];

console.log('Original order:', testWords);

// Test current approach
const sorted1 = [...testWords].sort((a, b) => {
  return a.localeCompare(b, "fr-FR", {
    sensitivity: "base",
    numeric: true,
    caseFirst: "lower"
  });
});
console.log('Current approach (sensitivity: base):', sorted1);

// Test with sensitivity: accent
const sorted2 = [...testWords].sort((a, b) => {
  return a.localeCompare(b, "fr-FR", {
    sensitivity: "accent",
    numeric: true,
    caseFirst: "lower"
  });
});
console.log('With sensitivity: accent:', sorted2);

// Test with no options
const sorted3 = [...testWords].sort((a, b) => {
  return a.localeCompare(b, "fr-FR");
});
console.log('Default French locale:', sorted3);

// Test what each comparison returns
console.log('\nComparison tests:');
console.log('a vs à:', 'a'.localeCompare('à', 'fr-FR'));
console.log('à vs abeille:', 'à'.localeCompare('abeille', 'fr-FR'));
console.log('abeille vs accent:', 'abeille'.localeCompare('accent', 'fr-FR'));
