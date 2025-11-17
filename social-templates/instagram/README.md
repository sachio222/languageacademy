# Instagram Templates - Word of the Day

Templates for creating 5-slide carousel posts for Instagram with AI-powered engagement slides.

## Platform Specifications

- **Format:** Carousel post (5 images)
- **Dimensions:** 1080 x 1080 px (1:1 square)
- **File format:** PNG
- **Max file size:** 8 MB per image (30 MB total for carousel)
- **Caption limit:** 2,200 characters (but first 125 chars are crucial)
- **Hashtags:** 15-30 recommended (we use 20)
- **Alt text:** 100 characters max per image

## Content Structure

### Slide 1: Word with Background Image
- Large word display (140px, ultra-thin weight)
- Phonetic pronunciation in glassmorphic pill
- Pexels background image with dark overlay
- Clean, minimal design

### Slide 2: Definition
- Word, translation, and English meaning
- Part of speech and difficulty level badges
- Subtle gradient background
- Clean typography hierarchy

### Slide 3: Examples
- Two real-world usage examples
- French sentence with English translation
- Context labels in brand blue
- Generous spacing

### Slide 4: Engagement (AI-Selected)
**AI chooses ONE of these 5 types based on word characteristics:**

#### 4a. Quiz (5-8% comment rate)
- Fill-in-blank or multiple choice
- Clean typography, minimal decoration
- "Test yourself" → Question → Options → CTA

#### 4b. Challenge (3-5% comment rate)
- Sentence creation prompt
- Example shown
- "Your turn" → Prompt → Example → CTA

#### 4c. Opinion (2-4% comment rate)
- A vs B comparison
- Simple two-option layout
- "Which is harder?" → Options → CTA

#### 4d. Mnemonic (2-3% comment rate, high saves)
- Memory hook/association
- Sound similarity or visual trick
- "Remember it" → Hook → Connection → CTA

#### 4e. Mistake (2-3% comment rate, validation)
- Common error correction
- Wrong vs correct comparison
- "Don't say this" → Comparison → Rule → CTA

### Slide 5: Call to Action
- Language Academy logo
- "Master French" headline
- Featured word in subtitle
- Website URL in glassmorphic container
- Premium blue gradient background

## Template Files

### `carousel-slides-template.js`
Main template that generates HTML for all 5 slides. Contains:
- Slide data preparation
- HTML/CSS generation for each slide type
- Responsive typography
- Glassmorphic effects
- Brand colors and styling

**Usage in n8n:**
- Node type: Code (JavaScript)
- Mode: Run Once for Each Item
- Input: WOTD data + Pexels image
- Output: HTML for each slide (4 items)

### `caption-template.js`
Generates Instagram caption with:
- Hook (first 125 chars - crucial for engagement)
- Value proposition
- Clear CTA
- 20 optimized hashtags
- Optional location tag

**Usage in n8n:**
- Node type: Code (JavaScript)
- Mode: Run Once for All Items
- Input: WOTD data + image URLs
- Output: Formatted caption

## Design Elements

### Colors
- **Brand Blue:** `#3b82f6` (primary CTA, labels)
- **Brand Blue Dark:** `#2563eb` (gradients)
- **Text Dark:** `#1a1a1a` (main text)
- **Text Medium:** `#665665` (secondary text)
- **Text Light:** `#999999` (metadata)
- **Background Light:** `#fafbfc` (subtle backgrounds)

### Typography
- **Font Stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Word Display:** 140px, weight 200 (ultra-thin)
- **Definition:** 64px, weight 500
- **Examples:** 52px, weight 500
- **Metadata:** 28px, weight 500

### Effects
- **Glassmorphism:** `backdrop-filter: blur(12px)` with transparency
- **Text Shadow:** `0 4px 20px rgba(0, 0, 0, 0.3)` on light text over images
- **Gradients:** Subtle linear gradients for depth

## Instagram Best Practices

### Caption Optimization
- ✅ Hook in first 125 characters (shown before "more")
- ✅ 3-5 line breaks for readability
- ✅ Emojis improve engagement by 47%
- ✅ CTA above hashtags for visibility
- ✅ 1500-2000 character sweet spot

### Hashtag Strategy
- ✅ Mix of popular (#LearnFrench 500K+)
- ✅ Medium (#FrenchVocabulary 50K+)
- ✅ Niche (#LanguageAcademy)
- ✅ Hashtags at end, separated by line breaks

### Posting Strategy
- ⏰ Best times: 9-11 AM, 7-9 PM EST
- 📍 Location tag boosts reach 20-30%
- 💬 Post caption that encourages saves/shares
- 🔗 Link in bio drives traffic

## Image Generation Workflow

1. **Prepare 4 Slides** → Creates slide data objects
2. **Create HTML for Each Slide** → Runs 4x, generates HTML
3. **Collect All HTML** → Aggregates 4 HTML outputs
4. **Split Out** → Separates for image conversion
5. **Convert to Image** → HTML → PNG via Puppeteer
6. **Collect Image URLs** → Public URLs via cloudflared tunnel

## Full Workflow Documentation

See `/N8N_SOCIAL_WOTD.md` for complete n8n workflow setup including:
- Pexels image selection and tracking
- Airtable integration for used images
- HTML to image conversion
- Instagram Graph API upload
- Carousel creation and publishing

## Testing

To preview slides before posting:
1. Use the "Preview HTML Slides" code node (in main workflow doc)
2. Saves preview.html to Desktop
3. Opens all 4 slides in browser for review
4. Verify design, typography, and content

## Logo Assets

- **White logo (CTA slide):** `https://languageacademy.io/img/TLA_CoreMark_White_tm_v1.1.1.png`
- **Blue logo (reference):** `https://languageacademy.io/img/TLA_CoreMark_Blue_tm_v1.1.1.png`

## Related Files

- `/N8N_SOCIAL_WOTD.md` - Complete workflow documentation
- `/airtable-used-pexels-images.csv` - Image tracking structure
- `/social-templates/instagram/metadata.json` - Platform specs (JSON)

