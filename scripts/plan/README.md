# Course plan tools

A course is written from a plan. The plan of a language is one file, `content/<lang>/course-plan.json`: every unit that
is planned and not yet written, every module in it, and what each module teaches. These tools check that file and make
everything else from it. They are the same for every language: each takes a language code and reads only that
language's folders.

## Commands

The `pnpm` scripts run each command for French. For another language, run the CLI with its code:
`node scripts/plan/cli.mjs <command> <lang>`.

| Command | What it does |
|---|---|
| `pnpm plan:check` | Checks the whole plan against the written course and the graph. Prints what the plan holds, where each level is reached and, when this machine has a frequency file, each unit's band. Exits 1 on any problem. `--against <git ref>` also lists words the plan taught at that commit and no longer teaches. |
| `pnpm plan:md` | Writes the plan as a readable document. |
| `pnpm plan:page` | Writes the course page: written and planned units, every module, every word with its meaning, and a search box. |
| `pnpm plan:stubs` | Shows what planned module files and outline the plan gives. `--write` writes them; `--check` exits 1 when a file differs. |
| `pnpm plan:brief <unit_key or module_key>` | Writes one brief for each module: everything its writer needs, in one file. |

`plan:md`, `plan:page` and `plan:brief` write under `.plan-out/<lang>/`, which is not committed. `--out` sends the
output elsewhere.

## To plan and brief a unit

1. Edit the unit in `content/<lang>/course-plan.json`.
2. `pnpm plan:check` until it prints `ok`.
3. `pnpm plan:stubs --write`, so the checker and `pnpm graph:due` see the unit.
4. `pnpm plan:brief <unit_key>`, and hand each brief to a writer.

## What the check holds a plan to

- Every word is taught once: by one module of the plan, and not already by the written course.
- Every word and pattern is in the graph, or the word is listed in `words_to_add` under the module that teaches it.
- A pattern is taught, practised or required by a reading only when what it needs is known by then.
- A practice set and a unit exam teach nothing; a reading teaches the words of its table.
- Sizes: new words in a lesson, words in a reading's table, first-pass minutes of a module, items and minutes of a unit
  exam, guides in a unit.
- Each level the plan names (`levels`) is reached by the end of the unit it names. A level is reached as
  `pnpm graph:check` counts it: 90% of the core words through that level are available and every core pattern is taught.

The plan's modules are counted as if written, in plan order, after the last written module
(`scripts/graph/projection.mjs`). Positions, word counts and levels are computed on every run and stored nowhere.

## Where each thing lives

| What | Where | Same for every language |
|---|---|---|
| Plan format | `scripts/plan/schema/la-course-plan@1.json` | yes |
| Rules and tools | `scripts/plan/*.mjs` | yes |
| Method a writer follows, by module kind | `scripts/plan/templates/*.md` | yes |
| What the method fixes beyond the recipes | `scripts/plan/method.json` | yes |
| Reading types: the human situations a reading can be about, and the types of readings already written | `scripts/plan/reading-types.json` | yes |
| The plan | `content/<lang>/course-plan.json` | no |
| Sizes and rules of each module kind | `content/<lang>/recipes/*.json` | no |
| Notes for writers of this language | `content/<lang>/writing-notes.md` | no |
| Words, forms, patterns, level lists | `curriculum-graph/languages/<lang>/`, `curriculum-graph/core/levels/` | no |
| Meanings of words the graph has no gloss for | `curriculum-graph/pairs/<native>-<lang>/glosses.json` | no |
| How common each word is | `~/.languageacademy/frequency/<lang>.tsv` on this machine, never in the repository | no |

## What a new language supplies

1. Its graph folder and level lists, as French has them.
2. `content/<lang>/` with `course.json`, `recipes/` and `writing-notes.md`.
3. `content/<lang>/course-plan.json`.
4. Optionally a frequency file, `lemma<TAB>value` on each line with a higher value for a more common word, at
   `~/.languageacademy/frequency/<lang>.tsv` (or under `$LA_FREQUENCY_DIR`). Its values are never committed or printed;
   the tools print bands only. Without the file the frequency check is skipped.

No tool changes.

## A reading in parts

A reading is one module with one word table and one position. A long reading has `parts`, each of its own kind (story,
article, exposition, learning-alongside) and each read in one sitting; `minutes` and `running_words` describe one part.

## Reading types

Each part of a reading names a type from `reading-types.json`: the human situation it is about, such as a new place, a mystery or cultures meeting. The list is the same for every language. A type guides the feel of a reading; it is not a rule. Each language writes its own country's instance, and a plan may choose a different type at the same point when its culture fits another better, saying why in `type_note`. `plan:check` asks that every part name a type the list has, and never that it match another language's plan. It prints how many types the plan uses and where.

## The earlier stub tool

`plan:stubs` replaced `scripts/content/plan-stubs.mjs` and its key map, `content/fr/plan-keys.json`, which made planned
module files from an earlier plan kept outside the repository. Both are retired: the plan file holds the keys, and the
planned files in `content/fr/modules/` are `plan:stubs` output.
