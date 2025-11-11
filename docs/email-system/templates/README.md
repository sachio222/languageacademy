# Email Templates

This directory contains HTML email templates for Language Academy.

## Available Templates

### `wotd-announcement.html`
One-time announcement email to introduce the Word of the Day feature to existing customers.

- **Use:** One-time send to all users
- **Subject:** 🇫🇷 Introducing: Your Daily French Word
- **Variables:** None (static content)

### `wotd-daily.html`
Daily Word of the Day quiz email.

- **Use:** Automated daily send
- **Subject:** 🇫🇷 Your French Word: {{word}}
- **Variables:** word, phonetic, part_of_speech, word_id, optionA-D, correctKey, date

## Usage

1. Copy the HTML file content
2. Replace any `{{variables}}` with actual values (or n8n expressions)
3. Send via the `send-resend-email` Supabase function

## Testing

Before sending to users:

1. Open HTML file in browser to preview layout
2. Send test email to yourself
3. Check all links work correctly
4. Verify mobile rendering

## Documentation

See parent directory for detailed implementation guides:
- `wotd-announcement-template.md` - Announcement email docs
- `wotd-email-template.md` - Daily email docs
- `../N8N_SEND_WOTD_EMAIL.md` - n8n workflow setup

