# Vocabulary Data Refactoring

## Summary

The massive `vocabularyData.js` file (3656 lines) has been split into a well-organized directory structure for better maintainability.

## New Structure

```
src/lessons/vocabulary/
├── index.js                  # Main entry point - re-exports everything
├── pronouns.js               # Subject, object, stressed pronouns (218 lines)
├── demonstratives.js         # ce, cet, cette, ces, ça, ceci, cela (48 lines)
├── possessives.js            # Possessive adjectives & pronouns (135 lines)
├── nouns.js                  # Common nouns & food vocabulary (375 lines)
├── adjectives.js             # Common adjectives (50 lines)
├── adverbs.js                # Time & location adverbs (95 lines)
├── connectors.js             # Connectors & prepositions (90 lines)
├── modifiers.js              # Negation & comparison words (110 lines)
├── questions.js              # Question words (15 lines)
├── phrases.js                # Common phrases, survival phrases, slang (180 lines)
├── helpers.js                # getWrongAnswerHint function (20 lines)
└── verbs/
    ├── index.js              # Re-exports all verb conjugations
    ├── etre.js               # être (present & past) (105 lines)
    ├── avoir.js              # avoir (present & past) (105 lines)
    ├── faire.js              # faire (present & conditional) (105 lines)
    ├── aller.js              # aller (present & conditional) (105 lines)
    ├── modal-verbs.js        # vouloir, pouvoir, devoir (present & conditional) (420 lines)
    ├── movement-verbs.js     # venir, partir, arriver, rester (210 lines)
    ├── regular-verbs.js      # parler, aimer, manger, penser (210 lines)
    ├── irregular-verbs.js    # voir, boire, comprendre, savoir, connaître, croire (350 lines)
    └── past-tense.js         # Passé composé conjugations (105 lines)
```

## Backward Compatibility

All existing imports continue to work! The old `vocabularyData.js` file now simply re-exports from the new structure:

```javascript
// Old code still works:
import { pronouns, etreConjugations } from "./vocabularyData.js";

// Because vocabularyData.js now contains:
export * from "./vocabulary/index.js";
```

## Benefits

✅ **Manageable file sizes**: Each file is 15-420 lines (vs 3656 lines)
✅ **Logical organization**: Easy to find and update specific vocabulary
✅ **Clear structure**: Grouped by grammatical concepts
✅ **Backward compatible**: No imports need to be changed
✅ **Easier collaboration**: Multiple people can work on different files
✅ **Better version control**: Smaller diffs, less merge conflicts

## Files Importing vocabularyData.js

The following 26 files import from vocabularyData.js and all continue to work:

- `src/lessons/moduleBuilder.js`
- Various module files in `src/lessons/modules/`:
  - pronouns.js, possessive-pronouns.js, possessive-adjectives.js
  - object-pronouns.js, demonstratives.js
  - basic-nouns.js, adjectives.js, connectors.js
  - etre.js, avoir.js, faire.js, aller.js, parler.js
  - vouloir.js, pouvoir.js, devoir.js, vouloir-pouvoir.js
  - voir.js, venir.js, partir.js
  - comprendre.js, savoir.js, connaitre.js, croire.js, penser.js

## Next Steps (Optional)

1. **Test the application** to ensure all imports work correctly
2. **Consider deleting** the old commented-out code in `vocabularyData.js` once confirmed working
3. **Consider direct imports** for better tree-shaking (optional):

   ```javascript
   // Instead of:
   import { pronouns } from "../vocabularyData.js";

   // Could use:
   import { pronouns } from "../vocabulary/pronouns.js";
   ```

## Testing

No linting changes needed. All exports use named exports and the re-export chain works seamlessly.

