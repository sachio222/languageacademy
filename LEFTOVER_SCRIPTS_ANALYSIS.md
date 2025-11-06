# Leftover Scripts Analysis

This document identifies non-reusable scripts that are leftovers from one-time migrations, fixes, and data processing tasks.

## ✅ Keep (Potentially Reusable)

These scripts are documented and may still be useful:
- `add-words-to-database.js` - Add words to Supabase database (documented)
- `generate-lesson-words.js` - Generate lesson words CLI tool (documented)

## ❌ Remove (One-Time Migration/Fix Scripts)

### Migration Scripts
- `migrate-cambridge-to-database.js` - One-time Cambridge dictionary migration
- `complete-migration.js` - One-time migration completion
- `final-migration.js` - One-time final migration
- `complete-mapping.js` - One-time mapping completion
- `complete-final-6-entries.js` - One-time entry completion

### Add-to-Cambridge Batch Scripts (Migration leftovers)
- `add-adjectives-to-cambridge.js`
- `add-adverbs-to-cambridge.js`
- `add-misc-words-to-cambridge.js`
- `add-prepositions-to-cambridge.js`
- `add-verbs-to-cambridge-batch1.js`
- `add-verbs-to-cambridge-batch2.js`
- `add-verbs-to-cambridge-batch3.js`
- `add-verbs-to-cambridge-batch4.js`
- `add-french-contractions.js`
- `add-simple-contractions.js`
- `add-tout-variants.js`
- `add-bien-sure.js`
- `add-unit1-etre.js`
- `add-unit1-tags.js`
- `add-unit3-verbs.js`
- `add-comprendre-conjugations.js`
- `add-dire-conjugations.js`
- `add-faire-conjugations.js`
- `add-prendre-conjugations.js`
- `add-all-module-keys.js`
- `add-module-keys.js`
- `add-pos-to-unmet-words.js`
- `add-sibling-relationships.js`
- `add-word.js` (duplicate/superseded by add-words-to-database.js)
- `add-redirect-columns.sql` (one-time migration SQL)

### Fix Scripts (One-time fixes)
- `fix-embedded-translations.js`
- `fix-lived-resided-translations.js`
- `fix-encoding-migration.js`
- `fix-14-corrupted-entries.js`
- `fix-adjective-base-forms.js`
- `fix-broken-redirects.js`
- `fix-contractions.js`
- `fix-duplicate-ids.js`
- `fix-dynamic-references.js`
- `fix-ellipsis-forms.js`
- `fix-est-verb.js`
- `fix-feedback-rls.sql` (one-time SQL fix)
- `fix-rls-policies.sql` (one-time SQL fix)
- `fix-dictionary-rls.sql` (one-time SQL fix)

### Check/Verify Scripts (One-time verification)
- `check-all-live-reside.js`
- `check-and-create-missing.js`
- `check-avoir-conjugation-rels.js`
- `check-avoir-data.js`
- `check-database-contents.js`
- `check-db-relationships.js`
- `check-depecher-base.js`
- `check-depecher-conjugation-relationships.js`
- `check-dictionary-rls.js`
- `check-habiler.js`
- `check-habiter.js`
- `check-manual.js`
- `check-missing-columns.js`
- `check-unpopulated-fields.js`
- `verify-db-sync.js`
- `verify-lived-resided-fix.js`
- `verify-migration-accuracy.js`
- `verify-suspicious-entries.js`

### Compare Scripts (One-time comparisons)
- `compare-avoir-depecher-ui-data.js`
- `compare-reading-words-cambridge.js`
- `compare-verbs-with-cambridge.js`

### Sync Scripts (One-time syncs)
- `sync-relationships-to-db.js`
- `sync-verb-conjugation-data.js`
- `sync-verbs-file-to-db.js`

### Update Scripts (One-time updates)
- `update-cambridge-curriculum-tracking.js`
- `update-dictionary-simple.js`
- `update-dire-relationships.js`
- `update-missing-redirect-data.js`

### Analyze Scripts (One-time analysis)
- `analyze-cambridge-structure.js`
- `analyze-dictionary-examples.js`

### Find Scripts (One-time searches)
- `find-newline-examples.js`

### Process Scripts (One-time processing)
- `process-all-batches.js`
- `regenerate-frequency-arrays.js`

### Sort Scripts (One-time sorting)
- `sort-phrases-by-starting-words.js`
- `sort-unmet-by-pos.js`

### Remove/Delete Scripts (One-time cleanup)
- `remove-corrupted-entries.js`
- `safe-delete-corrupted-entries.js`
- `corrupted-entries-to-delete.js`

### Mark Scripts (One-time marking)
- `mark-all-unverified.js`

### Convert Scripts (One-time conversion)
- `convert-words-to-enhanced-schema.js`

### Generate Scripts (One-time generation)
- `generate-complete-mapping.js`
- `generate-lesson-words.js` - ⚠️ Keep (documented utility)
- `generate-verb-relationships.js`

### Debug Scripts (One-time debugging)
- `debug-a-words.js`
- `debug-words.js`

### Investigate Scripts (One-time investigation)
- `investigate-missing.js`

### Reading Words Scripts (One-time processing)
- `reading-words-unmet.js`

### Phrases Scripts (One-time processing)
- `phrases-target-list.js`
- `phrases-word-list.js`
- `non-verb-noun-phrases.js`

### Test Scripts (One-time tests)
- `test-est-scraper.js`
- `test-french-sort.js`
- `test-schema-fix.js`
- `test-zod-schema.js`

### Validate Scripts (One-time validation)
- `validate-dictionary-schema.js`
- `validate-duplicates.js`

### Scraper Scripts (Superseded)
- `cambridge-scraper.js` - ⚠️ Root version superseded by `src/data/dictionary/utils/cambridge-scraper.js`
- `cambridge-scraper-test.js` - Test for scraper

### Other One-Time Scripts
- `example-definition.js`
- `nouns-backup.js`
- `target-list.js`

### SQL Migration Scripts (One-time)
- `add-feedback-delete-policy.sql`
- `add-verb-conjugation-columns.sql`
- `add-redirect-columns.sql`
- `drop-conjugation-columns.sql`

## Summary

**Total scripts to remove: ~100+**

These are all one-time migration, fix, verification, or data processing scripts that are no longer needed. They were used during the initial setup and migration phases of the project.

**Scripts to keep:**
- `add-words-to-database.js` (documented utility)
- `generate-lesson-words.js` (documented utility)

**Note:** The actual utilities for dictionary management are in `src/data/dictionary/utils/` and scripts for ongoing maintenance are in `scripts/`.



