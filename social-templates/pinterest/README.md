# Pinterest Templates - Word of the Day

Templates for creating vertical pins for Pinterest.

## Platform Specifications

- **Format:** Single vertical image
- **Dimensions:** 1000 x 1500 px (2:3 ratio)
- **File format:** PNG
- **Max file size:** 20 MB
- **Title limit:** 100 characters (but ~60 shown in feed)
- **Description limit:** 500 characters optimal, 800 max
- **Alt text:** 500 characters
- **Hashtags:** 3-5 maximum (quality over quantity)

## Content Structure

Pinterest pins use a vertical 3-section layout:

### Section 1: Hero (500px) - Word with Background
- Large word display (6rem Playfair Display)
- Phonetic pronunciation (2.5rem Satisfy cursive)
- Translation (2.75rem Playfair Display)
- Part of speech and difficulty level badges
- Pexels background image with dark overlay

### Section 2: Examples (500px)
- Two usage examples with context labels
- French sentence with English translation
- Blue left border accent
- Light gray background cards

### Section 3: CTA (500px)
- Language Academy logo (white version)
- "Master French" headline
- Featured word in subtitle
- Website URL in glassmorphic container
- Blue gradient background

## Template Files

### `pin-template.js`
Main HTML generator for Pinterest pins. Contains:
- 3-section vertical layout (each 500px)
- Google Fonts imports (Playfair Display, Poppins, Satisfy)
- Premium typography with serif/sans-serif mix
- Even thirds design (500px per section)
- Glassmorphic effects

**Usage in n8n:**
- Node type: Code (JavaScript)
- Mode: Run Once for All Items
- Input: WOTD data + Pexels image
- Output: Single HTML page (1000x1500)

### `metadata-template.js`
Generates Pinterest-optimized metadata:
- SEO-optimized title (keyword-rich, under 100 chars)
- Algorithm-optimized description (500 chars optimal)
- Pin link with tracking parameters
- Alt text for accessibility + SEO
- Board selection logic
- Pinterest topics/interests

**Usage in n8n:**
- Node type: Code (JavaScript)
- Mode: Run Once for All Items
- Input: Image URL from html-to-image
- Output: Pin metadata for Pinterest API

## Design Elements

### Colors
- **Brand Blue:** `#3b82f6` (CTA section background, accents)
- **Brand Blue Dark:** `#2563eb` (gradient end)
- **Text Dark:** `#1a1a1a` (main text)
- **Text Medium:** `#665665` (secondary text, badges)
- **Background Light:** `#fafbfc` (example cards)

### Typography
- **Serif (Playfair Display):** Headlines, word display, translation
- **Sans-serif (Poppins):** Body text, examples, metadata
- **Script (Satisfy):** Phonetic pronunciation
- **Word Display:** 6rem (96px), weight 600
- **Translation:** 2.75rem (44px), weight 500
- **Examples French:** 2.25rem (36px), weight 500
- **Examples English:** 1.875rem (30px), weight 400

### Layout
- **Even thirds:** 500px hero + 500px examples + 500px CTA
- **Vertical flow:** Natural top-to-bottom reading
- **Border accents:** 5px blue left border on example cards
- **Glassmorphism:** Used sparingly for badges and URL container

## Pinterest SEO Strategy

### Title Optimization
- Front-load keywords (French, word, level)
- Include English translation
- Natural language (not keyword-stuffed)
- Under 100 characters

**Example:** `French Word: parler | Learn "to speak" in French | A2`

### Description Best Practices
- First 50-75 chars crucial (shown in feed preview)
- Include target keywords naturally
- Add value (examples, context)
- Clear CTA
- 3-5 relevant hashtags at end (NOT 30+)

### Hashtag Strategy
Pinterest penalizes over-hashtagging:
- ✅ 3-5 hashtags maximum
- ✅ Focus on most relevant topics only
- ✅ Mix: broad (#LearnFrench) + specific (#A2French)
- ❌ Avoid 20+ hashtags (hurts reach)

## Pinterest API Integration

### Pin Creation Flow
1. **Generate Pin HTML** → Create 1000x1500 HTML
2. **Convert to Image** → HTML → PNG via Puppeteer
3. **Generate Metadata** → Title, description, link, alt text
4. **Upload to Pinterest** → Create pin via Pinterest API

### Required Credentials
- Pinterest App ID
- Pinterest App Secret
- Access Token (OAuth)
- Board ID (where pins are posted)

## Pinterest Algorithm Tips

### Topics Recognition
Pinterest categorizes pins by topics. Optimize for:
- Learn French
- French Language
- Language Learning
- Educational Resources
- Study Tips
- French for Beginners / Intermediate French

### Engagement Signals
- **Saves** are most valuable (better than clicks)
- **Close-ups** drive engagement
- **Original content** gets priority
- **Consistent posting** builds authority
- **Rich Pins** get extra distribution

### Posting Strategy
- ⏰ Best times: Evenings and weekends (planning/browsing time)
- 📌 Fresh content performs better than repins
- 🎯 Target education/learning audience
- 🔗 Link to dedicated landing pages (better tracking)

## Image Generation Workflow

1. **Get Pexels Image** → Fetch + filter used images
2. **Generate Pin HTML** → Single 1000x1500 HTML
3. **Convert to Image** → HTML → PNG
4. **Generate Metadata** → Title, description, keywords
5. **Create Pin** → Upload via Pinterest API

## Full Workflow Documentation

See `/N8N_PINTEREST_WOTD.md` for complete n8n workflow setup including:
- Pexels image selection (separate from Instagram)
- Pinterest API authentication
- Board management
- Pin creation and publishing
- Analytics tracking

## Testing

To preview pin before posting:
1. Generate HTML with `pin-template.js`
2. Save as .html file
3. Open in browser (set viewport to 1000x1500)
4. Verify typography, spacing, and content

Or use n8n "Write to File" node to save preview to Desktop.

## Logo Assets

- **White logo (CTA section):** `https://languageacademy.io/img/TLA_CoreMark_White_tm_v1.1.1.png`

## Related Files

- `/N8N_PINTEREST_WOTD.md` - Complete workflow documentation
- `/pinterest-preview-node.js` - Preview generation (legacy location)
- `/PINTEREST_SUMMARY.md` - Pinterest strategy overview
- `/social-templates/pinterest/metadata.json` - Platform specs (JSON)

