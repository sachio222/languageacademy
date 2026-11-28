A concept card names one idea, says it in plain prose, and shows it in examples the learner can hear. L draws the examples as a list, one per row, French first and English under it, so write them as a list and never as one string.

```json
{
  "id": "c-vouloir-to-want",
  "term": "{vouloir} = to want",
  "definition": "The verb for wanting a thing or wanting to do something. It is also how you ask for things politely.",
  "examples": [
    { "fr": "Je veux ça.", "en": "I want that." },
    { "fr": "Tu veux un café ?", "en": "Do you want a coffee?", "note": "an offer to a friend" }
  ]
}
```

A verb's person forms take `"layout": "forms"`, and L draws them in two columns: list the singular forms first, then their plurals in the same order (the person that pairs with each comes from the language pack). The English may be left out.

```json
{
  "id": "c-vouloir-stems",
  "term": "Three stems",
  "definition": "The stem changes three times: once for the singular, once for we and you, and once for they.",
  "layout": "forms",
  "examples": [{ "fr": "je veux" }, { "fr": "tu veux" }, { "fr": "il veut" }, { "fr": "nous voulons" }, { "fr": "vous voulez" }, { "fr": "ils veulent" }]
}
```

A list that is not examples of the taught language (key points in the learner's language, a list of meanings) takes `"layout": "plain"`: each item is `{ "text": "…" }`, one line in the body font with nothing to hear. Never put the learner's language in `fr`, where L would give it a play button (`concept_example_not_target`).

```json
{ "id": "c-what-you-can-say", "term": "What you can say already", "definition": "With these words you can open and close a conversation.", "layout": "plain", "examples": [{ "text": "Greet someone" }, { "text": "Say thank you" }, { "text": "Say goodbye" }] }
```

- **Fields.** `term` names the idea. `definition` is prose, at most two sentences. `examples` holds one to six items, each `{ "fr", "en", "note" }`, the same names as a table row: the language taught in `fr`, the learner's language in `en`, and an optional `note` in the learner's language with taught words in braces. `layout` is `list` (the default), `forms` or `plain`; a plain card's items are `{ "text" }` only, and a list or forms card's items never hold `text` (`concept_plain_item`).
- **French.** Each `fr` is a sentence or phrase a native speaker says, written plainly: no braces, and no formula with `+`, `=` or an arrow (`concept_example_formula`). Write "Je veux ça.", never "je veux + ça". It is curriculum the learner reads, so it uses only words and patterns taught by now or in this module, and the checker reads it like any item.
- **Meanings.** In a list card every example has its `en` (`concept_example_meaning`).
- **Size.** One to six examples (`concept_examples_size`). More is two cards or a table.
- **Forms.** A forms card holds an even number of person forms that pair singular with plural (`concept_forms_pair`).
- **Prose stays prose.** A term or definition that runs three or more items of the taught language together, with commas, semicolons, slashes or "and", fails (`concept_inline_list`): move them to `examples`. A word card's note stays prose the same way.
- **English.** Plain, active sentences a person could say aloud, with no shouting, no exclamation marks for emphasis and no plans for later lessons. Load the `jake-house-writing` skill (`~/.claude/skills/jake-house-writing/SKILL.md`) before drafting and run its ship check.
