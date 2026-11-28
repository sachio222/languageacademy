# Concept card examples: contracts

A concept card (and a Reference section) holds its examples as a list, `examples: [{ fr, en?, note? }]`, with an optional `layout` of `list`, `forms` or `plain` (a list that is not examples of the taught language: `{ text }` lines with no sound), instead of one example string. This note covers every part the change crosses: the module files, the content checker, the bundle for L, L's release checker and L itself. Plan: `notes/plans/2026-11-27-concept-cards-structured.md` in the product vault.

## 1. Scope

- **Users.** Course writers (people and drafting agents) write cards; learners read them in L's Vocabulary Intro and on Reference pages.
- **Use cases.** Write a card in the new shape; check it; ship it in a bundle; draw it in L; move old cards across, a unit at a time.
- **Scale.** 553 concept cards in 132 modules and 65 Reference sections with an example string. Units 1 to 3 (109 cards) are moved; Units 4 to 13 and the shelf still hold the old string.
- **Out of scope.** Word cards (`example_fr`, `example_en` stay single), guide part blocks (already lists), the live app on `main`, deleting L's string reader (Units 4 and later still need it).

## 2. Boundary map

| Hop | From | To | Owner |
|---|---|---|---|
| 1 | Writer or drafting agent | `content/fr/modules/<key>.json` | Course writers |
| 2 | Module file | `pnpm content:validate` (`schema/module.mjs` exampleRules, `concept-examples.mjs`, persons from `scripts/graph/fr/language.mjs`) | Content pipeline |
| 3 | Module file | `pnpm graph:check` (taught before used on example French) | Language graph |
| 4 | Converted module | `pnpm content:migrate` (`legacy/hand-fixes.json`, `legacy/live-ids.json`) | Content pipeline |
| 5 | Loaded course | `pnpm content:bundle` (`bundle.mjs` examplesOf) to `dist-content/bundle.json` | Content pipeline |
| 6 | Bundle | L's release checker (`build-spec/check/check_bundle.py`, vendored in `scripts/content/vendor/la-bundle`) | L build spec (vault) |
| 7 | Bundle | L: `l/tools/load-bundle.mjs`, `l/j-bundle.js`, `l/j-steps.js` exampleList | Prototype L (vault) |

## 3. Contracts

**API.** No network API. The command-line interfaces:

| Command | Input | Output | Exit |
|---|---|---|---|
| `pnpm content:validate` | `content/fr` | problems by code | 0 ok, 1 problems |
| `pnpm content:cards [--apply <units>] [--report <file>]` | `content/fr` | counts table; with `--apply`, converted cards written back in those units; with `--report`, the full Markdown report | 0, 2 on an unknown unit |
| `pnpm content:bundle [--check]` | loaded course | `dist-content/bundle.json`, L's checker result | 0 ok, 1 problems |
| `python3 check/check_bundle.py <bundle>` | bundle | report | 0 ok, 1 errors, 2 usage |

**Data.**

| Field | Where | Type | Rule | Owner |
|---|---|---|---|---|
| `examples` | concept card, Reference section | list of 1 to 6 `{ fr, en?, note? }` | `concept_examples_size`; a concept card needs it (or, until migrated, `example`) | writer |
| `examples[].fr` | list or forms card | string, 1 to 300 characters, plain French | required; no braces (`span_in_plain_field`); no `+`, `=`, `->` or arrow (`concept_example_formula`); never the learner's language (`concept_example_not_target`, language pack `isNativeExample`); taught before used (graph:check) | writer |
| `examples[].en` | same | string, at most 300, plain English | required in a `list` card (`concept_example_meaning`) | writer |
| `examples[].note` | same | string, at most 200, English with French in braces | optional | writer |
| `layout` | same | `list` (default), `forms` or `plain` | only with `examples` (`concept_layout_without_examples`); `forms`: even count, singular forms first, then their plurals in the same order (`concept_forms_pair`, persons from the language pack); `plain`: items are `{ text }` only, and list or forms items never hold `text` (`concept_plain_item`) | writer |
| `examples[].text` | plain card | string, at most 300, plain text in the learner's language | drawn in the body font with no sound and no French marking | writer |
| `example` | same | string | the old shape, accepted only while a unit waits; never with `examples` (`concept_example_both`) | writer |
| `term`, `definition` | concept card | string | no run of three or more French items joined by commas, semicolons, slashes or "and" in the new shape (`concept_inline_list`) | writer |
| `vocabulary[].note` | word card | string | the same run is a warning until the cut-over | writer |
| Bundle `ConceptBlock.examples`, `layout` | `curriculum.openapi.json` | `examples`: array of `ConceptExample` (1 to 6) or null; `layout`: `list`, `forms`, `plain` or null | with examples, `example` is null and `layout` set; `list` needs every `fr` and `en`; `forms` every `fr` and an even count; `plain` `text` only | L build spec |
| Bundle `ReferenceSectionBlock.examples`, `layout` | same | as above | as above | L build spec |
| `isNativeExample` | `scripts/graph/<code>/language.mjs` | function | French: any English-only word, or two common English words with no French accent | language pack |
| `persons` | `scripts/graph/<code>/language.mjs` | `[[singular pronouns], [plural pronouns]]` per person | French: je/j' with nous, tu with vous, il/elle/on with ils/elles | language pack |

Schema evolution: the old `example` string stays valid until every unit is moved; then content:validate rejects it, the bundle drops `example`, and L's string reader (`J.listLines` for cards) is deleted.

**Event.** None: every hop is a command run by a person or CI.

**State.**

| From | To | Trigger | Who |
|---|---|---|---|
| card with `example` | card with `examples` (converted) | `pnpm content:cards --apply <unit>` when the string reads cleanly | writer, by command |
| card with `example` | card with `examples` (rewritten) | hand edit | writer |
| unit with old cards | unit migrated | no card in it holds `example` (content test "Units 1 to 3 are migrated") | writer, approved by Jake per unit |
| course with old cards | cut-over | every unit migrated; `example` removed from the schema, the contract and L | writer |

Source of truth: the module files on `course-main`. A card's `id` never changes (C-ID-4); `legacy/live-ids.json` maps the live app's concept index to it by content, else by the id the converter minted from the live term.

**Failure.**

| Hop | Failure | What happens | Who sees it |
|---|---|---|---|
| 2 | a rule breaks | content:validate exits 1 and names file, path and code; CI fails | writer |
| 3 | untaught word or pattern in example French | graph:check counts it; above the issue budget it fails | writer |
| 4 | edit not recorded | `content:migrate --check` fails until `pnpm content:migrate` runs | writer |
| 5 and 6 | bundle breaks the contract | `content:bundle --check` and L's checker fail; nothing ships | writer |
| 7 | L gets an unknown shape | L falls back to the string reader for a card with no `examples`; an example with no French is dropped | learner sees the card without it |
| migration | a string the script cannot read | the card keeps its string and is listed for a writer (report: needs meaning, could not convert) | writer |

**Observability.** content:validate, graph:check and L's checker print each problem with its code; `pnpm content:cards` prints the counts per unit; the L release check writes one line per bundle to `l/content/release-checks.jsonl`.

## 4. Flow

1. A writer edits a card, or runs `pnpm content:cards --apply <unit>` and finishes the rest by hand.
2. `pnpm content:validate`, `pnpm graph:check --budget`, then `pnpm content:migrate` for a converted module.
3. `pnpm content:bundle --check` builds the bundle and runs L's checker.
4. `l/tools/check-release.sh <bundle>` plays the course in a copy of L; `node l/tools/load-bundle.mjs <bundle>` loads it.
5. L draws `examples` with `J.exampleList` (`ds/library.html#examplelist`): one row per example; two columns for `forms`; the single example strip for one example; the plain variant (`.ex-list.is-plain`, body font, no sound) for `plain`. For a card still holding the old string, `J.listLines` makes French rows with sound only of items in braces, and draws a run of short unbraced items as the plain variant.

## 5. Security

No authentication or secrets: local files and commands. Input validation is the checker itself. Example French is drawn with escaping (`esc`), and only the note's braces become French spans.

## 6. AI in the system

Agents draft card text. Model output never ships on its own: (1) nothing is done until content:validate, graph:check, L's checker and the release check pass on the files; (2) a check not run is reported UNKNOWN; (3) a draft changes no state until it is written to a module file and passes the checks, and every new French sentence waits for a native speaker's check before the unit is approved; (4) `content:cards --apply` is idempotent: a converted card holds `examples` and is not converted again.

## 7. Proof

See the handback report of the change for each run's evidence; the claims and how to prove them again:

| Claim | Evidence | Checked from |
|---|---|---|
| The checker enforces every rule | `node --test scripts/content/test/concept-cards.test.mjs` | course-main |
| The migration sorts and converts cards | `node --test scripts/content/test/concept-cards-migrate.test.mjs`; `pnpm content:cards` | course-main |
| Units 1 to 3 hold no old string | the content test "Units 1 to 3 are migrated" | course-main |
| The bundle carries examples and layout and L's checker accepts them | `scripts/content/test/bundle.test.mjs` (concept card tests); `pnpm content:bundle --check` | course-main, vendored checker |
| L's checker refuses a bad shape | `python3 -m unittest test_check_bundle` in `build-spec/check` | vault |
| L draws the list, the two columns and the single strip | `l/tests/run.sh "card"`; the Unit 2 playthrough | vault |
| New units are written in the new shape | `node --test scripts/plan/test/brief-cards.test.mjs` | course-main |

## 8. Open items

- A native speaker checks every example sentence written or changed in Units 1 to 3 (listed on the review page).
- Jake approves Units 1 to 3; then Units 4 to 13 and the shelf move the same way, a unit at a time.
- At the cut-over: content:validate rejects `example`, the word-note warning becomes an error, the contract drops `ConceptBlock.example`, and L's string reader for cards is deleted.
