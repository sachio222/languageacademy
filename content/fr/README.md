# French course content for the new app version (L)

This folder holds the French course as checked data. Every module of the new app version is one JSON file in `modules/`, and `course.json` puts the modules in order. Write new course content here, then run the checks listed at the end of this page. The live app still builds its lessons from `src/lessons/modules/`, which follows `main`; on this branch you never edit those files.

The spec behind these files is `projects/product/curriculum/2026-11-24-content-layer-design.md` in the vault. This page covers the daily work: writing a module, keeping ids stable, adding a story, and merging `main`.

## What is in this folder

| Path | What it holds | Who changes it |
|---|---|---|
| `course.json` | Units in order, each with its module keys; the Reference shelf; retired keys | Writers |
| `modules/<module_key>.json` | One module: a lesson, guide, reading, practice set, unit exam or Reference page | Writers |
| `plan-keys.json` | The module key of every module in the course plan (plan version and module number to key) | Written once; add a key by hand only for a new plan module |
| `legacy/l-sources.json` | Prototype L's guides and illustrated story records | `pnpm content:migrate l-sources` |
| `legacy/hand-fixes.json` | Every hand edit to a module converted from `src/lessons/modules`, as data | `pnpm content:migrate` |
| `legacy/migration-sources.json` | For each converted module, the hash of each part's source and of what the converter last wrote | `pnpm content:migrate` |
| `legacy/live-ids.json` | The live app's exercise ids and concept indexes, mapped to item and concept ids, as of the last `main` merged here | `pnpm content:migrate` |
| `legacy/reading-stories.json` | The L story of each reading converted from the live app, written once | Nobody |
| `legacy/positions-e4392e7.json` | The live module order at `main` e4392e7, for old `?module=N` links | Nobody |
| `legacy/last-release.json` | The last bundle L imported, which `content:bundle --check` compares against | Replace it when L imports a new release |
| `migration-report.md` | What the conversion guessed, dropped, fixed by hand or could not match | `pnpm content:migrate` |

## Writing a module

The course plan already has a file for every module it lists. Each one is a stub: `"status": "planned"`, a title and a `plan` block that lists the words and grammar patterns the module should teach or use (ids from the language graph in `curriculum-graph/languages/fr/`), and sometimes a draft to write from. The bundle for L stops before the first unit that still holds a stub, so a half-written unit never publishes.

To write a module, open its stub, set `"status": "written"`, delete the `plan` block and add the fields its kind requires. Keep the file name and `module_key` exactly as they are.

The checker expects every word and pattern a module teaches to come back within 2 modules, then within 5, 12 and 30 modules of each return; each of those spans is a reuse window. A window counts written modules only, since a stub holds nothing yet. Before you write, run `pnpm graph:due <module_key>`; a stub works too. It lists the words and patterns taught earlier that are due for reuse by this module, each with where it was taught, where it was last used and where its reuse window ends. Use each one in the module where it fits, or the checker reports `reuse-missed` for it. A last line counts the windows that closed before this module; no use here can meet those, and `pnpm graph:check` lists them.

Every written module needs `title` and `description`. A unit exam has no title of its own: the loader names it "Unit exam · <unit name>". Optional on every kind: `topic`, `can_do` (lines for "What you can do now"), `teaches` and `tests`.

| Kind | Required fields | Notes |
|---|---|---|
| `lesson` | `vocabulary` (at least one word), `items` | Optional `concepts`, `tables`, `phrases`, `speed_match` (six word ids from the lesson's vocabulary), `options`, `glosses` (see Glosses below) |
| `guide` | `minutes`, `line`, `parts`, `checks` (exactly three) | A part's `blocks` use L's example block shapes; no lesson may use something only a guide teaches. Optional `short_title` and `more`: one outside link, `{ "label": "…", "url": "https://…" }`, shown as a Read more card at the end of the guide page. The label is plain English of at most 80 characters; leave `more` out when there is no link |
| `reading` | `story_id`, `vocabulary`, `passage`, `items` | `items` are `comprehension` questions; optional `glossary`, `preview_blocks`, `glosses` |
| `practice` | `items`, `tests` | Teaches nothing, so no vocabulary, concepts or tables |
| `unit_exam` | `items`, `tests` | Teaches nothing |
| `reference` | none beyond title and description | Lives on the shelf, never in a unit |

A unit that holds a written module also needs `description`, `can_do`, `can_do_short` and `can_do_example_fr` in `course.json`.

Each item has a `type`, and the type fixes its fields:

| Type | Shows | Learner gives |
|---|---|---|
| `translate` | `prompt`, a bare English sentence (Unit 1 only; elsewhere the checker warns) | `answer`, `accept` |
| `respond` | `situation`, optional `cue` | `answer`, `accept` |
| `transform` | `instruction`, French `shown` | `answer`, `accept` |
| `gapfill` | French `text` with one `___` per blank, optional `gloss` | `blanks[].answer`, `blanks[].accept` |
| `meaning` | French `shown`, optional `instruction` | an English `answer`, `accept` |
| `choice` | `question`, `options` with exactly one `right` | a pick |
| `comprehension` | `question`, optional `cue` | `answer` and `accept`, or `options` |

Any item may add `hint`, `mistakes` (`{ answer, feedback }` pairs) and `steps`. A lesson item goes to the lesson exam by default, and also to Writing when it has a mistake. Leave `steps` out unless you mean to move an item; a step that ends up with no item fails the check.

Every answer and accept must pass the app's answer checker, and no listed mistake may pass it. A blank is exactly three underscores.

## Glosses

A word new to the learner is taught as a vocabulary card where it is first used. A different form of a word already taught (*ils comprennent* after *comprendre*, *bons* after *bon*) gets a gloss instead: a `glosses` row `{ "fr": "ils comprennent", "en": "they understand", "note": "plural of {il comprend}" }` on the lesson, reading or guide. L shows its meaning when the learner taps the form, and never studies, reviews or tests it. `fr` is the form as the text spells it (at most 100 characters), `en` its meaning (at most 200), and the optional `note` names the form, with French in braces (at most 200). A gloss that spells one of the module's own word cards fails the check (`gloss_is_card`).

In a lesson, L glosses the French in braces in prompts, concept cards, tables and examples, never the answer side. In a reading, it glosses the passage.

## French inside English text

English text that quotes French puts the French in braces: `Use {être} for how you feel.` The app styles each span as French. Braces belong only in English text: hints, feedback, instructions, situations, questions, titles and notes. Fields that hold French (`answer`, `accept`, `shown`, `text`, `fr`) or plain English (`gloss`, a passage's `en`) take no braces; the check rejects them. The one exception is `{name}` in a unit's `can_do_example_fr`, which marks where the learner's name goes. Write a literal brace as `\{`.

## Ids

Ids are permanent, because L stores progress against them.

- **Module keys** never change. A new module that is not in the course plan takes a short slug (`city-transport`); a reading, practice set or exam that belongs to one unit takes `<unit_key>-reading`, `<unit_key>-practice` or `<unit_key>-exam`.
- **Item ids** match `^[a-z0-9][a-z0-9-]*$` and are unique in their module. Make one from the answer (`i-je-suis-fatigue`). An item keeps its id when you correct its answer, as long as it still accepts an answer it accepted before; keep the old answer in `accept` when it is still right. A corrected item that accepts none of its old answers, a typo fix included, needs a new id, and L restarts the learner's progress on it: keeping the old id fails `content:bundle --check` against the last release (`item_id_reused`). `pnpm content:migrate` applies the same rule to a correction merged from `main`: it gives the item a new id and prints an `id_new_answer` line. If you had edited that item here, the run stops with a `conflict` line naming both ids instead (see Merging main).
- **Word ids** follow L's rule. The first meaning taught takes the dictionary id (`aller-fr`). A later new meaning of the same spelling takes a sense suffix (`le-fr.object-pronoun`). The same word met again keeps its id, with or without its article, capital or end mark. A word id already used for another word fails the load (`word_id_conflict`), and a spelling taught again under a new id without a sense suffix prints a warning.

## Editing a module converted from the live app

The modules with dated keys (`2024-01-02-etre`) were converted from `src/lessons/modules`. You may edit them here like any other module. Then run `pnpm content:migrate`: it keeps your edit, records it in `legacy/hand-fixes.json` and lists it in `migration-report.md`. Commit the module and those two files together; until then `content:migrate --check` fails. An item, concept card or vocabulary card you add counts as an edit too, and the run records it with the other hand edits. A new item or concept card takes a new id; a new vocabulary card takes its word id by the rule above.

The live app does not show these edits. It keeps showing the lesson as `main` builds it, until L replaces it.

A reading's place cards (`info_card`) take their `image_credit` from `legacy/image-credits.json`: one entry per picture path, with `author` and `licence`. The credit reads "<author>, <licence>, via Wikimedia Commons", or "<author>, public domain, via Wikimedia Commons" for CC0 and public domain. A picture with no entry keeps `image_credit: null`, and `pnpm content:migrate` reports it as `image_without_credit`; add the entry and run it again.

## Adding a story for a reading

A reading shows one of L's illustrated stories, named by its `story_id` (`reading12`). The story records come from prototype L's folder: once L has the story, run `pnpm content:migrate l-sources` (it reads `$LA_L_DIR`, or pass `--l <folder>`), check the new record in `legacy/l-sources.json`, and commit it.

Until then the reading can be written and checked, but it cannot publish: the bundle for L stops before its unit and names the reading whose story is missing, and `content:bundle --check` reports `story_missing` as a warning, not an error.

## Merging main

A change to the live app's lessons is made on `main`. To bring it here:

1. `git merge origin/main`
2. `pnpm content:migrate`. It converts every changed source again, keeps every id and every hand edit, and rewrites the records, `legacy/live-ids.json`, `migration-report.md` and the snapshot of the live lessons (`scripts/content/test/fixtures/golden-lessons.json`) that the golden test compares with these files. It prints what changed since the last run.
3. Read what it printed and the diff of the module files and `migration-report.md`. A line starting `conflict` means `main` changed a part you had edited here, and the run exits 1. Settle each one in the module file and run again, or keep your edits with `pnpm content:migrate --accept-conflicts`.
4. `pnpm graph:check --budget`, then the checks below.

`pnpm content:migrate --force` converts every module from its source alone and applies `legacy/hand-fixes.json` again. Ids still come from the written files, so it changes no id. Use it after a converter change, never to settle a conflict.

## Checks before you commit

```
pnpm content:validate          # every file loads, with every problem listed
pnpm content:test
pnpm content:migrate --check   # the converted modules, records and report match a rerun
pnpm content:bundle --check    # the bundle for L, its release checks and L's own checker
pnpm graph:check --budget      # the language-graph checker within its issue budget
pnpm build
```

CI runs the same checks on every push. The issue budget (`curriculum-graph/reports/issue-budget.json`) has two parts. For Units 1 to 12 and the shelf, the counts the conversion left are a ceiling: a count above it fails, and `pnpm graph:check --lower-budget` writes down any count that fell, so the ceiling only moves down. Unit 13 onward is at zero for every rule, so a module written there must be clean.

A count can rise even when you change no old module, because writing a stub makes the written course longer. Reuse windows that used to end past the last written module now end inside the written course, and each one with no use is a `reuse-missed`. That issue counts in the unit of the module where its window ends, not the unit that taught the word, so a lesson written in Unit 13 before the end of Unit 12 carries the words due from Unit 12's modules. A unit's can-do lines in `course.json` are checked with its last written module, so writing the end of a unit moves the words in those lines to a later position too. Writing the end of Unit 12 can therefore raise the Units 1 to 12 counts: run `pnpm graph:due` on each module you write and reuse what it lists.

`pnpm content:bundle` writes `dist-content/bundle.json`, the file prototype L reads; `--units unit1` writes a Unit 1 sample next to it. Neither file is committed.

## What never to edit here

- `src/lessons/modules/` on this branch. CI fails when it differs from `main` outside the files this branch already changed. Change a live lesson on `main` and merge it.
- The files that `pnpm content:migrate` writes (`migration-report.md`, `legacy/hand-fixes.json`, `legacy/migration-sources.json`, `legacy/live-ids.json`) and the golden snapshot. Change the module files and run the command.
- `legacy/positions-e4392e7.json` and `legacy/reading-stories.json`, which are frozen.
