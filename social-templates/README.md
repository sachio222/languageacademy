# Social Media Templates for Word of the Day

This directory contains templates for generating Word of the Day content across all social media platforms.

## Directory Structure

```
/social-templates/
  /instagram/      - 4-slide carousel posts (1080x1080)
  /pinterest/      - Single vertical pins (1000x1500)
  /tiktok/         - Video content (1080x1920) [TBD]
  /youtube/        - Shorts & thumbnails (1080x1920) [TBD]
  /facebook/       - Posts & carousels [TBD]
  /twitter/        - Tweets with images (1200x675) [TBD]
```

## Platform Status

| Platform   | Status | Template Files | Workflow |
|------------|--------|----------------|----------|
| Instagram  | ✅ Active | carousel-slides-template.js, caption-template.js | N8N_SOCIAL_WOTD.md |
| Pinterest  | ✅ Active | pin-template.js, metadata-template.js | N8N_PINTEREST_WOTD.md |
| TikTok     | 📋 Planned | TBD | TBD |
| YouTube    | 📋 Planned | TBD | TBD |
| Facebook   | 📋 Planned | TBD | TBD |
| Twitter/X  | 📋 Planned | TBD | TBD |

## Usage Pattern

Each platform folder contains:

1. **`README.md`** - Platform-specific documentation and specs
2. **Template files (`.js`)** - Code to copy into n8n workflow nodes
3. **`metadata.json`** - Platform specifications (dimensions, character limits, etc.)

## How to Use Templates

### For n8n Workflows

1. Navigate to the platform folder (e.g., `/instagram/`)
2. Open the template file (e.g., `carousel-slides-template.js`)
3. Copy the entire contents
4. Paste into your n8n Code node
5. Adjust any platform-specific variables as needed

### For Testing

Each template is a standalone JavaScript file that can be:
- Tested with sample WOTD data
- Modified and version controlled
- Reused across different workflows

## Design Principles

All templates follow these principles:

- ✨ **Brand consistency** - Uses Language Academy colors, fonts, and logo
- 📱 **Mobile-first** - Optimized for mobile viewing
- 🎨 **Platform-native** - Follows each platform's design best practices
- ♿ **Accessible** - High contrast, readable fonts, alt text
- 🔄 **Reusable** - Templated variables for WOTD data
- 📊 **SEO-optimized** - Keywords, hashtags, and descriptions

## Common WOTD Data Structure

All templates expect WOTD data in this format:

```javascript
{
  word: "parler",                    // French word
  phonetic: "paʁ.le",                // IPA pronunciation
  translation: "to speak",           // English translation
  part_of_speech: "verb",            // noun, verb, adjective, etc.
  difficulty_level: "A2",            // A1, A2, B1, B2, C1, C2
  examples: [
    {
      french: "Je parle français.",
      english: "I speak French.",
      context: "Daily Conversation"  // Optional
    },
    // ... more examples
  ],
  date: "2025-11-15"                 // YYYY-MM-DD
}
```

## Adding New Platforms

To add a new platform:

1. Create folder: `/social-templates/{platform-name}/`
2. Copy structure from an existing platform (e.g., Instagram)
3. Create `README.md` with platform specs
4. Create `metadata.json` with dimensions and limits
5. Create template files for content generation
6. Update this README with platform status
7. Create n8n workflow documentation

## Related Documentation

- **n8n Workflows:**
  - `/N8N_SOCIAL_WOTD.md` - Instagram workflow
  - `/N8N_PINTEREST_WOTD.md` - Pinterest workflow
  - `/N8N_SEND_WOTD_EMAIL.md` - Email workflow
  
- **Design System:**
  - `/DESIGN_PRINCIPLES.md` - Brand guidelines
  - `/public/img/` - Logos and brand assets

## Questions?

See platform-specific READMEs in each folder for detailed documentation.

