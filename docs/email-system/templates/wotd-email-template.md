# Word of the Day Email Template

## Purpose

Daily email sent to users with their French word quiz.

---

## Template File

**Location:** `wotd-daily.html` (in this directory)

---

## Email Configuration

**Subject:** 🇫🇷 Your French Word: {{word}}

**From:** Language Academy <noreply@languageacademy.io>

**Type:** word_of_day

---

## Template Variables

Replace these placeholders in the HTML before sending:

- `{{word}}` - The French word (e.g., "tenir")
- `{{word_id}}` - Database ID for tracking
- `{{phonetic}}` - IPA pronunciation (e.g., "tə.niʁ")
- `{{part_of_speech}}` - Word type (e.g., "verb", "noun")
- `{{optionA}}` - First quiz option
- `{{optionB}}` - Second quiz option
- `{{optionC}}` - Third quiz option
- `{{optionD}}` - Fourth quiz option
- `{{correctKey}}` - Letter of correct answer (A, B, C, or D)
- `{{date}}` - WOTD date for tracking (YYYY-MM-DD)

---

## n8n Variable Mapping

When using in n8n, replace template variables with these expressions:

| Template Variable    | n8n Expression                                                |
| -------------------- | ------------------------------------------------------------- |
| `{{word}}`           | `{{ $('Shuffle Quiz Options').first().json.word }}`           |
| `{{phonetic}}`       | `{{ $('Shuffle Quiz Options').first().json.phonetic }}`       |
| `{{part_of_speech}}` | `{{ $('Shuffle Quiz Options').first().json.part_of_speech }}` |
| `{{word_id}}`        | `{{ $('Shuffle Quiz Options').first().json.word_id }}`        |
| `{{correctKey}}`     | `{{ $('Shuffle Quiz Options').first().json.correctKey }}`     |
| `{{date}}`           | `{{ $('Shuffle Quiz Options').first().json.date }}`           |
| `{{optionA}}`        | `{{ $('Shuffle Quiz Options').first().json.optionA }}`        |
| `{{optionB}}`        | `{{ $('Shuffle Quiz Options').first().json.optionB }}`        |
| `{{optionC}}`        | `{{ $('Shuffle Quiz Options').first().json.optionC }}`        |
| `{{optionD}}`        | `{{ $('Shuffle Quiz Options').first().json.optionD }}`        |

---

## n8n Implementation

See `../../N8N_SEND_WOTD_EMAIL.md` for complete workflow setup.

**Quick reference:**

1. Load the HTML template from `wotd-daily.html`
2. Use a Code node to replace all `{{variables}}` with actual values
3. Send via HTTP Request to `send-resend-email` function

---

## Testing

**Test Data:**

```json
{
  "word": "tenir",
  "word_id": "123",
  "phonetic": "tə.niʁ",
  "part_of_speech": "verb",
  "optionA": "to hold",
  "optionB": "to run",
  "optionC": "to jump",
  "optionD": "to sleep",
  "correctKey": "A",
  "date": "2025-11-11"
}
```

1. Copy `wotd-daily.html`
2. Replace variables with test data
3. Open in browser to preview
4. Send test email before going live

