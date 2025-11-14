# n8n: Post WOTD to Pinterest

## Strategic Analysis & Planning Document

### Pinterest vs Instagram: Platform Differences

| Aspect               | Instagram                   | Pinterest                               | Implication                           |
| -------------------- | --------------------------- | --------------------------------------- | ------------------------------------- |
| **Format**           | Square carousel (1080x1080) | Vertical pin (1000x1500 optimal)        | Need single tall design, not 4 slides |
| **Content Lifespan** | 48 hours peak               | 3-6 months+                             | Pinterest content has longer ROI      |
| **User Intent**      | Entertainment, social       | Planning, learning, saving              | More educational depth works well     |
| **Engagement Type**  | Likes, comments, shares     | Saves, repins, clicks                   | Focus on "pin-worthy" value           |
| **Algorithm**        | Recency + engagement        | Relevance + quality + freshness         | SEO keywords matter more              |
| **Hashtags**         | 15-30 mixed                 | 2-5 focused                             | Less is more, highly targeted         |
| **Text on Image**    | Minimal (subtitle limit)    | Encouraged (overlay text performs well) | Can include more on-image content     |
| **Call to Action**   | Bio link only               | Direct link per pin                     | Each pin can drive to specific URL    |

---

## Pinterest Engagement Strategy

### What Works on Pinterest for Educational Content

1. **"Cheat Sheet" / "Quick Reference" Pins**

   - Visual guides that users want to save
   - High text-to-image ratio (60/40)
   - Clear hierarchical information
   - Example: "French Word: [WORD] - Definition, Examples, Usage"

2. **Before/After or Step-by-Step**

   - Language learning journey appeal
   - "Don't say X, say Y" format
   - Progressive examples (formal → casual)

3. **Infographic Style**

   - All 4 Instagram slides combined into ONE vertical image
   - Scannable sections with visual hierarchy
   - Icons and visual separators

4. **Rich Pins (Article Type)**
   - Auto-sync title, description from website
   - Requires meta tags on languageacademy.io
   - Professional credibility boost

### Pinterest SEO Considerations

Unlike Instagram's hashtag chaos, Pinterest is a **visual search engine**:

- **Pin Title**: Include keyword (e.g., "French Word of the Day: Parler | Learn French Vocabulary")
- **Pin Description**: 100-200 words, keyword-rich but natural
- **Board Name**: Specific (e.g., "French Vocabulary for Beginners" not "French Stuff")
- **Alt Text**: Accessibility + SEO double win
- **URL**: Link directly to WOTD page on your site (if exists) or homepage

**Example Pin Description Template:**

```
Learn the French word "[WORD]" ([phonetic]) meaning "[translation]".

This [level] [part_of_speech] is essential for French learners. See real examples:
• [Example 1 French] - [Example 1 English]
• [Example 2 French] - [Example 2 English]

Master French vocabulary with daily lessons at Language Academy. Perfect for [level] students!

#LearnFrench #FrenchVocabulary #[Level]French
```

---

## Design Recommendations: Single Tall Pin (1000x1500)

### Option 1: **Unified Infographic** (Recommended)

Combine all 4 Instagram slides into one vertical scroll:

```
┌─────────────────────────┐
│  [PEXELS IMAGE]         │  300px - Word overlay
│  WORD + phonetic        │
│  (darkened for text)    │
├─────────────────────────┤
│                         │
│  Translation            │  250px - Definition section
│  part of speech • level│
│                         │
├─────────────────────────┤
│                         │
│  Example 1:             │  400px - Examples
│  FR sentence            │
│  EN translation         │
│                         │
│  Example 2:             │
│  FR sentence            │
│  EN translation         │
│                         │
├─────────────────────────┤
│                         │
│  [LOGO]                 │  250px - CTA section
│  Master French          │
│  languageacademy.io     │
│                         │
├─────────────────────────┤
│  Level: [A1-C2]         │  300px - Footer metadata
│  Category: [Verbs]      │
│  #FrenchVocabulary      │
└─────────────────────────┘
```

**Why this works:**

- ✅ Single image = easier to create, manage, track
- ✅ All info visible in Pinterest feed preview (first 300-400px)
- ✅ Scrollable detail for engaged users
- ✅ Self-contained (doesn't require carousel interaction)
- ✅ Shareable as-is (complete reference)

### Option 2: **Hero Image with Text Overlay**

Pexels image as full background (1000x1500) with all content overlaid:

```
┌─────────────────────────┐
│                         │
│  [PEXELS IMAGE]         │
│  (with gradient         │
│   overlay for text      │  Full height 1500px
│   readability)          │
│                         │
│  All text overlaid:     │
│  - Word + phonetic      │
│  - Translation          │
│  - Examples             │
│  - CTA + logo           │
│                         │
└─────────────────────────┘
```

**Pros:** More visually striking  
**Cons:** Text readability can be tricky, less scannable

### Option 3: **Minimal Text, Link to Blog**

Simple, beautiful pin that drives clicks:

```
┌─────────────────────────┐
│                         │
│  [PEXELS IMAGE]         │  800px
│  (minimal overlay)      │
│                         │
│  WORD                   │
│  /phonetic/             │
│                         │
├─────────────────────────┤
│                         │
│  "translation"          │  400px
│  Level: A2              │
│                         │
│  Click to learn →       │
│                         │
├─────────────────────────┤
│  [LOGO] Language Academy│  300px
└─────────────────────────┘
```

**Best for:** Driving traffic to website (if you have dedicated WOTD pages)

---

## Technical Implementation: What Can Be Reused

### ✅ Reusable from Instagram Workflow

1. **Infrastructure** (Nodes 1-4, 6-6c)

   - ✅ "When Executed by Another Workflow" trigger
   - ✅ Airtable image tracking (same table, just add `platform` column)
   - ✅ Pexels image search + deduplication
   - ✅ Tunnel auto-detection (cloudflared + static-server)
   - ✅ HTML-to-image conversion

2. **Data Handling**
   - ✅ WOTD data structure (word, phonetic, translation, examples, etc.)
   - ✅ Image URL collection
   - ✅ Metadata passing between nodes

### 🔧 Needs Modification

3. **HTML Generation** (Node 5)

   - ❌ 4 separate slides → ✅ 1 tall HTML page (1000x1500)
   - Update CSS for vertical layout
   - Single HTML output instead of array of 4

4. **API Posting** (Node 8)
   - ❌ Instagram Graph API → ✅ Pinterest API
   - Different authentication (Pinterest uses OAuth 2.0)
   - Different request structure

### 📊 New Components Needed

5. **Pinterest-Specific**
   - Pin title generation (keyword-optimized)
   - Pin description generation (100-200 words, SEO-focused)
   - Board selection logic (could rotate or use category-based)
   - Link destination (homepage or dedicated WOTD page?)

---

## Pinterest API Setup Requirements

### Pinterest API Differences from Instagram

| Feature                | Instagram          | Pinterest                        |
| ---------------------- | ------------------ | -------------------------------- |
| **App Type**           | Facebook App       | Pinterest App                    |
| **Auth**               | Long-lived token   | OAuth 2.0 refresh token          |
| **Token Lifespan**     | 60 days            | Refresh token (permanent)        |
| **Rate Limits**        | 200 calls/hour     | 1000 pins/day, 10 req/sec        |
| **Image Requirements** | Min 320x320        | Recommended 1000x1500            |
| **Required Fields**    | image_url, caption | image_url, title, board_id, link |

### Pinterest API Endpoints Needed

1. **Create Pin:**

   ```
   POST https://api.pinterest.com/v5/pins
   {
     "title": "French Word: Parler | Learn French",
     "description": "Learn the French word 'parler'...",
     "link": "https://languageacademy.io",
     "media_source": {
       "source_type": "image_url",
       "url": "https://tunnel.trycloudflare.com/images/..."
     },
     "board_id": "123456789",
     "alt_text": "French vocabulary: parler (to speak)"
   }
   ```

2. **List Boards** (optional - to rotate or select dynamically):
   ```
   GET https://api.pinterest.com/v5/boards
   ```

---

## Workflow Comparison

### Instagram Workflow (Current)

```
Trigger → Get Used Images → Get Pexels Image → Filter → Store Image
  → Prepare 4 Slides → Create HTML (x4) → Collect → Convert to Image (x4)
  → Collect URLs → Generate Caption → Upload to Instagram (5 API calls)
```

**Total Time:** ~15-20 seconds  
**Complexity:** High (carousel = 4 images + caption assembly)

### Pinterest Workflow (Proposed)

```
Trigger → Get Used Images → Get Pexels Image → Filter → Store Image
  → Generate Single HTML → Convert to Image (x1)
  → Generate Pin Title + Description → Upload to Pinterest (1 API call)
```

**Total Time:** ~8-10 seconds  
**Complexity:** Low (single image + metadata)

**Efficiency Gain:** 50% faster, simpler error handling

---

## Strategic Questions to Consider

### 1. **Board Strategy**

- **Single Board:** "French Word of the Day" (keeps all together, easier to find)
- **Multiple Boards:** By level (A1, A2, B1...) or category (Verbs, Nouns, Phrases)
- **Recommendation:** Start with single board, segment later if analytics show different audience segments

### 2. **Link Destination**

- **Option A:** Homepage (`languageacademy.io`) - simpler, always works
- **Option B:** Dedicated WOTD page (`languageacademy.io/wotd/[date]/[word]`) - better SEO, trackable
- **Option C:** Signup page (`languageacademy.io/signup`) - direct conversion

**Recommendation:** Option B if you can create dynamic WOTD pages (even simple ones), otherwise A

### 3. **Posting Frequency**

- **Daily WOTD:** Same as Instagram (consistency)
- **Weekly "Best Of":** Curated collection pin (higher effort, more saves)
- **Recommendation:** Daily for 30 days, then analyze save rate to determine if worth continuing

### 4. **Image Reuse Strategy**

Pinterest has different audience than Instagram:

- **Option A:** Same Pexels image for both platforms (efficiency)
- **Option B:** Different images (platform-specific appeal)
- **Recommendation:** Option A (same image, different format) - if image is already used on Instagram, it's "new" on Pinterest

**Airtable Modification:**
Add `platform` column to track where each image was used:

- `instagram` → Used in Instagram carousel
- `pinterest` → Used in Pinterest pin
- `both` → Used on both (if you decide to allow cross-platform)

### 5. **Text Density**

Pinterest users LOVE text-heavy educational content:

- Instagram: Minimal text on images (caption does heavy lifting)
- Pinterest: Rich text ON image is encouraged (pins with text get 30% more saves)

**Recommendation:** Don't be afraid to add more information directly on the Pinterest pin image

---

## Content Enhancements for Pinterest

### Additional Elements to Consider

1. **"Pin This!" Visual Cue**

   - Small badge in corner: "📌 Save for later"
   - Encourages saves (key Pinterest metric)

2. **Series Branding**

   - Consistent header: "French WOTD #47"
   - Creates collection appeal (users save series)

3. **Related Words**

   - Mini section: "Related: [synonym], [antonym]"
   - Increases perceived value

4. **QR Code** (Optional)

   - Direct to app download or signup page
   - Pinterest users often pin from desktop, browse later on mobile

5. **Difficulty Indicator**
   - Visual badge: Beginner/Intermediate/Advanced
   - Helps users self-filter

---

## Hashtag Strategy: Instagram vs Pinterest

### Instagram (Current - 20 hashtags)

```
#FrenchLanguage #LearnFrench #FrenchVocabulary #LanguageLearning
#FrenchWords #StudyFrench #FrenchLearning #LanguageAcademy #WOTD
#WordOfTheDay #FrenchLessons #SpeakFrench #FrenchGrammar
#LearnLanguages #PolyglotLife #LanguageLovers #FrenchStudy
#BilingualLife #FrenchTeacher #LanguageGoals
```

### Pinterest (Recommended - 3-5 hashtags)

```
#LearnFrench #FrenchVocabulary #[Level]French
```

**Why fewer?**

- Pinterest's algorithm prioritizes keywords in title/description over hashtags
- Hashtags are secondary (unlike Instagram where they're primary)
- Over-hashtagging looks spammy on Pinterest

**Better approach:** Rich description text with natural keyword usage

---

## Design Mockup Code Structure

### HTML Template for 1000x1500 Pin (Option 1 - Recommended)

**Layout Breakdown:**

1. **Hero Section** (300px): Pexels image + word overlay
2. **Definition Section** (250px): Translation + metadata on white/gradient background
3. **Examples Section** (450px): Two examples with clear formatting
4. **CTA Section** (250px): Logo + call to action
5. **Footer** (250px): Level, category, hashtags

**CSS Approach:**

- Fixed height: 1500px
- Fixed width: 1000px
- Flexbox for vertical sections
- Background images where appropriate
- Clean typography (larger than Instagram - more reading distance on desktop)

**Font Sizes (Compared to Instagram):**

- Instagram word: 140px → Pinterest word: 120px (proportionally smaller due to height)
- Instagram translation: 64px → Pinterest translation: 56px
- Instagram examples: 52px → Pinterest examples: 44px

**Key Difference:** Pinterest needs better information density since users can't swipe

---

## Workflow Node Outline

### Proposed Pinterest Workflow Structure

```
1. When Executed by Another Workflow
   ↓
2. Get Used Images from Airtable (same as Instagram)
   ↓
3. Get Pexels Image (same as Instagram)
   ↓
4. Filter Out Used Images (same as Instagram)
   ↓
5. Store Image in Airtable (mark as 'pinterest' or 'both')
   ↓
6. Generate Pinterest Pin HTML (NEW - single 1000x1500 layout)
   ↓
7. Check Tunnel Status (same infrastructure)
   ↓
8. Convert HTML to Image (same service, different dimensions)
   ↓
9. Generate Pin Title (NEW - SEO optimized)
   ↓
10. Generate Pin Description (NEW - 150-200 words)
   ↓
11. Select Board (NEW - could be static or dynamic)
   ↓
12. Upload to Pinterest (NEW - Pinterest API)
   ↓
✅ Pin is live!
```

**Nodes Shared with Instagram:** 1-5, 7-8 (infrastructure)  
**Nodes Unique to Pinterest:** 6, 9-12 (content & posting)

---

## Cross-Platform Optimization

### Should You Post to Both Platforms from Same Workflow?

**Option A: Parallel Execution (Recommended)**

```
Verify WOTD
   ↓
   ├─→ Instagram Workflow (existing)
   └─→ Pinterest Workflow (new)
```

**Pros:**

- ✅ Both execute simultaneously (faster)
- ✅ Failure in one doesn't affect other
- ✅ Easier to debug individually
- ✅ Can schedule differently if needed

**Option B: Sequential Execution**

```
Verify WOTD → Instagram → Pinterest
```

**Pros:**

- ✅ Simpler workflow structure
- ❌ Slower (2x time)
- ❌ Instagram failure blocks Pinterest

**Recommendation:** Option A (parallel)

### Image Reuse Logic

**Scenario 1: Allow Same Image**

- Airtable: Mark as `platform: "both"`
- Filter logic: Skip if used on SAME platform
- Result: Same Pexels image on Instagram + Pinterest

**Scenario 2: Require Different Images**

- Airtable: Separate `instagram_id` and `pinterest_id` columns
- Filter logic: Skip if used on ANY platform
- Result: Different images for each (requires 2x more Pexels images)

**Recommendation:** Scenario 1 initially (efficiency), move to Scenario 2 if you build large following on both

---

## Analytics & Success Metrics

### Instagram Metrics (Current Focus)

- Likes, Comments, Shares
- Story shares
- Profile visits
- Link clicks (bio)

### Pinterest Metrics (Different Goals)

- **Saves** (most important - indicates value)
- **Impressions** (longevity indicator)
- **Outbound clicks** (direct conversions)
- **Close-ups** (user zoomed in to read)

**Pinterest Success Threshold:**

- ✅ Good pin: 10+ saves in first week
- ✅ Great pin: 50+ saves in first month
- ✅ Viral pin: 500+ saves (resurfaces for months)

**Key Difference:** Pinterest content grows over time (Instagram dies after 48h)

---

## Implementation Decisions ✅

**Based on user requirements:**

1. **Link Destination:** `https://languageacademy.io/?wotd=true&word=[word]-fr` (dedicated WOTD pages!)
2. **Board Strategy:** Single board "French Word of the Day" (start simple, segment later)
3. **Image Reuse:** Same Pexels images as Instagram (efficient, mark as `platform: "both"`)
4. **Design Style:** Text-heavy, embrace rich content, feminine-appealing fonts

**Font Choices:**

- **Headers:** Playfair Display (elegant serif, sophisticated, appeals to women 25-45)
- **Body:** Poppins (clean, friendly, highly readable)
- **Accents:** Satisfy (subtle script for phonetic pronunciation)

**Design Research:** Pinterest's primary demographic is 60% women, especially in education/lifestyle/planning. Serif fonts (Playfair) + rounded corners + soft blue palette + high information density = optimal for saves.

---

## Next Steps (Implementation Roadmap)

### Phase 1: Setup (Before Building Workflow)

- [ ] Create Pinterest Business Account
- [ ] Set up Pinterest Developer App
- [ ] Get OAuth tokens (using Pinterest API guide)
- [ ] Create board: "French Word of the Day"
- [ ] Test Pinterest API with manual pin creation
- [x] ✅ **DONE:** Same image as Instagram (mark as `platform: "both"` in Airtable)
- [ ] Update Airtable: Add `platform` column (values: `instagram`, `pinterest`, `both`)

### Phase 2: Design

- [x] ✅ **DONE:** Chose Option 1 - Unified Infographic (text-heavy)
- [x] ✅ **DONE:** Created HTML template (`pinterest-pin-template.js`)
  - 1000x1500px dimensions
  - Feminine fonts (Playfair Display + Poppins + Satisfy)
  - 5 sections: Hero, Definition, Examples, CTA, Footer
  - Badges: "French WOTD" + "📌 Save This!"
- [ ] Test HTML → Image conversion at 1000x1500
- [ ] Create pin title template (SEO-optimized)
- [ ] Create pin description template (150-200 words, keyword-rich)

### Phase 3: Build Workflow

- [ ] Clone Instagram workflow as starting point
- [x] ✅ **DONE:** Created HTML generation node (`pinterest-pin-template.js`)
- [x] ✅ **DONE:** Created pin metadata generation node (`pinterest-metadata-template.js`)
  - SEO-optimized title (100 chars max)
  - Keyword-rich description (500 chars, includes examples)
  - Direct link to WOTD page: `?wotd=true&word=[word]-fr`
  - Alt text for accessibility + SEO
- [ ] Add Pinterest API upload node (see `pinterest-api-upload.md`)
- [ ] Test end-to-end with sample WOTD

### Phase 4: Integration

- [ ] Add Pinterest workflow to main WOTD orchestration
- [ ] Set up parallel execution (Instagram + Pinterest)
- [ ] Configure error handling
- [ ] Test with real WOTD

### Phase 5: Optimization

- [ ] Monitor analytics for 30 days
- [ ] A/B test: Text-heavy vs minimal pins
- [ ] Experiment with different boards
- [ ] Try Rich Pins if website supports meta tags
- [ ] Optimize posting time (Pinterest recommends 8-11pm)

---

## Cost & Resource Considerations

### Additional Costs

- Pinterest API: **FREE** (no paid tier for posting)
- Image generation: **Same cost** as Instagram (reusing infrastructure)
- Airtable: **No change** (same records, just add platform column)
- Development time: **~4-6 hours** (leveraging existing workflow)

### Potential ROI

Pinterest drives **more long-term traffic** than Instagram:

- Instagram post lifespan: 48 hours
- Pinterest pin lifespan: 3-6 months (some pins resurface for years)
- **Traffic potential:** 10x higher cumulative clicks from Pinterest than Instagram for same content

**Recommendation:** Worth the investment even if initial engagement is lower

---

## Summary: Key Differences at a Glance

| Aspect              | Instagram WOTD              | Pinterest WOTD                    |
| ------------------- | --------------------------- | --------------------------------- |
| **Format**          | 4-slide square carousel     | Single vertical pin               |
| **Dimensions**      | 1080x1080 (x4)              | 1000x1500 (x1)                    |
| **Design Approach** | Minimal text, swipe through | Information-dense, all-in-one     |
| **Caption**         | Engaging + hashtags         | SEO-optimized title + description |
| **Hashtags**        | 20 hashtags                 | 3-5 hashtags                      |
| **CTA**             | "Link in bio"               | Direct link per pin               |
| **Goal**            | Engagement (likes/comments) | Saves + clicks                    |
| **Lifespan**        | 48 hours                    | 3-6+ months                       |
| **API Complexity**  | High (5 calls for carousel) | Low (1 call for pin)              |
| **Workflow Time**   | ~15-20 seconds              | ~8-10 seconds                     |

---

## Open Questions for Discussion

1. **Do you want to drive Pinterest traffic to a specific landing page?**

   - If yes, consider creating dedicated WOTD pages on languageacademy.io
   - If no, homepage or signup page is fine

2. **Board structure preference?**

   - Single board (simple)
   - Multiple boards by level (A1, A2, etc.)
   - Multiple boards by category (verbs, nouns, etc.)

3. **Should Pinterest content be identical to Instagram or differentiated?**

   - Identical: Faster, easier to maintain
   - Differentiated: Better platform optimization (e.g., more text on Pinterest)

4. **Testing approach?**

   - Pilot for 30 days, then evaluate
   - Or A/B test different pin styles (minimal vs info-dense)

5. **Cross-promotion?**
   - Mention Instagram on Pinterest pins? ("Follow us on Instagram @handle")
   - Or keep platforms separate?

---

## Resources & Documentation Links

### Pinterest Developer Documentation

- **Pinterest API v5:** https://developers.pinterest.com/docs/api/v5/
- **Create Pin Endpoint:** https://developers.pinterest.com/docs/api/v5/#operation/pins/create
- **OAuth 2.0 Guide:** https://developers.pinterest.com/docs/getting-started/authentication/
- **Best Practices:** https://business.pinterest.com/en/creator-best-practices

### Design Tools & References

- **Pinterest Pin Builder:** https://www.canva.com/create/pinterest-pins/ (for inspiration)
- **Pinterest Trends:** https://trends.pinterest.com/ (see what's popular)
- **Rich Pins Validator:** https://developers.pinterest.com/tools/url-debugger/

### Analytics

- **Pinterest Analytics:** https://analytics.pinterest.com/ (after posting)
- **Pinterest Tag Helper:** Install browser extension to verify tracking

---

## Conclusion

Pinterest offers a **complementary strategy** to Instagram:

- **Instagram:** High engagement, short lifespan, social proof
- **Pinterest:** Lower engagement, long lifespan, direct traffic

**Together:** Cover both immediate engagement (IG) and long-tail discovery (Pinterest)

**Recommended Approach:**

1. Build Pinterest workflow using Option 1 design (unified infographic)
2. Reuse Instagram images + infrastructure (efficiency)
3. Run parallel for 30 days
4. Measure: Instagram engagement vs Pinterest clicks/saves
5. Optimize based on what drives more signup conversions

**Bottom Line:** Low additional effort (4-6 hours), high potential ROI (3-6 month content lifespan). Worth building.

---

---

## 🎨 Implementation Files Created

### 1. **pinterest-pin-template.js** - HTML Generation Node

**Purpose:** Generates 1000x1500px unified infographic pin

**Features:**

- ✅ Feminine-appealing fonts (Playfair Display, Poppins, Satisfy)
- ✅ 5-section layout (Hero, Definition, Examples, CTA, Footer)
- ✅ Text-heavy design (embraces Pinterest's preference)
- ✅ Badges: "French WOTD" + "📌 Save This!"
- ✅ Pexels background image on hero
- ✅ Soft blue gradient palette (#fafbff, #3b82f6)

**Node Configuration:**

- **Type:** Code (JavaScript)
- **Placement:** After "Store Image in Airtable" (Node 5)
- **Mode:** Run Once for All Items
- **Input:** WOTD data + Pexels image URL
- **Output:** `{ html, word, date, _wotd, _pexelsImage }`

**Usage:** Copy code from `pinterest-pin-template.js` into n8n Code node.

---

### 2. **pinterest-metadata-template.js** - Title & Description Generator

**Purpose:** Creates SEO-optimized Pinterest metadata

**Generates:**

- **Title:** Front-loaded keywords, 100 chars max
  - Example: `"French Word: dormir | Learn \"to sleep\" in French | A2"`
- **Description:** 500 chars, keyword-rich with examples
  - Hook (first 75 chars shown in feed)
  - Value prop + examples
  - CTA + benefits
  - 3-5 focused hashtags
- **Link:** `https://languageacademy.io/?wotd=true&word=[word]-fr`
- **Alt Text:** Accessibility + SEO (125 chars)

**Node Configuration:**

- **Type:** Code (JavaScript)
- **Placement:** After "Convert HTML to Image" (Node 8)
- **Mode:** Run Once for All Items
- **Input:** HTML data with WOTD passed through
- **Output:** `{ title, description, link, alt_text, board_name, html, word, date }`

**Usage:** Copy code from `pinterest-metadata-template.js` into n8n Code node.

---

### 2b. **pinterest-preview-node.js** - Pin Preview Generator (Optional)

**Purpose:** Creates a preview HTML page to view the 1000x1500 pin in a browser

**Generates:**

- Preview page showing the Pinterest pin at actual size (1000x1500)
- Dark UI with instructions for viewing/saving
- Displays pin with proper dimensions labeled

**Node Configuration:**

- **Type:** Code (JavaScript)
- **Placement:** After "Generate Pinterest Pin HTML" (Node 6) - OPTIONAL FOR TESTING
- **Mode:** Run Once for All Items
- **Input:** Generated pin HTML from Node 6
- **Output:** `{ preview_html, word, date, pin_dimensions, original_html }`

**Usage:**

- Add this node only for testing/debugging during development
- Copy code from `pinterest-preview-node.js` into n8n Code node
- Execute node, copy `preview_html` value from output
- Save as `preview-[word]-[date].html` file
- Open in browser to see 1000x1500 pin preview
- **Remove in production** - workflow should go straight from Node 6 → Node 7

**Note:** This is the Pinterest equivalent of Instagram's "Preview HTML Slides" node, but simplified for a single pin instead of 4 slides.

---

### 3. **pinterest-api-upload.md** - Complete Upload Guide

**Purpose:** Pinterest API setup + upload node documentation

**Includes:**

- Pinterest OAuth setup (step-by-step)
- Board ID retrieval
- HTTP Request node configuration
- Error handling
- Rate limits & best practices
- Analytics tracking (optional)
- Troubleshooting checklist

**Usage:** Follow guide to set up Pinterest API credentials and configure upload node.

---

## 📋 Workflow Overview Diagram

```
┌─────────────────────┐
│ When Executed by    │  Receives WOTD data from parent
│ Another Workflow    │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Get Used Images     │  Fetch list from Airtable
│ from Airtable       │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Get Pexels Image    │  HTTP Request (15 results)
│ (HTTP Request)      │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Filter Used Images  │  Code: Skip already used
│ (Code)              │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ IF: is_fallback?    │  Check if fallback needed
└──────┬──────────────┘
       │
   ┌───┴───┐
   │       │
 TRUE   FALSE
   │       │
┌──▼───┐   │
│Broader│   │
│Search │   │
│(HTTP) │   │
└───┬───┘   │
    │       │
┌───▼───┐   │
│Filter │   │
│Fallback│   │
└───┬───┘   │
    │       │
    └───┬───┘
        │
┌───────▼───────┐
│ Store Image   │  Save to Airtable (mark as "both")
│ in Airtable   │
└───────┬───────┘
        │
┌───────▼───────┐
│ Generate      │  Single 1000x1500 HTML
│ Pinterest Pin │  (Unified infographic)
│ HTML (Code)   │
└───────┬───────┘
        │
┌───────▼───────┐
│ Check Tunnel  │  Auto-detection (smart)
│ Status        │
└───────┬───────┘
        │
┌───────▼───────┐
│ IF: Manual    │  Only if auto-detect fails
│ Setup Needed? │
└───┬───────┬───┘
    │       │
  TRUE   FALSE
    │       │
┌───▼───┐   │
│Manual │   │
│ Setup │   │
│(3 nodes)│  │
└───┬───┘   │
    │       │
    └───┬───┘
        │
┌───────▼───────┐
│ Convert HTML  │  HTML to 1000x1500 PNG
│ to Image      │
└───────┬───────┘
        │
┌───────▼───────┐
│ Generate Pin  │  SEO title + description
│ Metadata      │
└───────┬───────┘
        │
┌───────▼───────┐
│ Upload Pin to │  Pinterest API
│ Pinterest     │
└───────────────┘
```

---

## Detailed Node Specifications

### Node Reusability Summary

**✅ REUSED FROM INSTAGRAM (7 nodes):**

- Node 1: When Executed by Another Workflow
- Node 2: Get Used Images from Airtable
- Node 3: Get Pexels Image (HTTP Request)
- Node 4: Filter Out Used Images (Code)
- Node 4a: IF - Check if Fallback Needed
- Node 4b: Broader Search (HTTP Request)
- Node 7: Check Tunnel Status
- Node 7a: IF - Manual Setup Needed
- Node 7b: Get Tunnel URL from Cloudflared
- Node 7b2: Extract Tunnel URL
- Node 7b3: Set Tunnel URL in Static Server

**🔧 MODIFIED FROM INSTAGRAM (2 nodes):**

- Node 5: Store Image in Airtable (added `platform: "both"`)
- Node 8: Convert HTML to Image (1000x1500 instead of 1080x1080)

**🆕 NEW - PINTEREST ONLY (3 nodes):**

- Node 6: Generate Pinterest Pin HTML (unified infographic)
- Node 9: Generate Pin Metadata (SEO-optimized title/description)
- Node 10: Upload Pin to Pinterest (Pinterest API)

**Total Workflow:** 10 main nodes (+ 3 conditional fallback nodes)  
**Code Reuse:** 70% of infrastructure shared with Instagram  
**New Development:** Only 3 Pinterest-specific nodes

---

### Node 1: When Executed by Another Workflow ✅ **REUSED FROM INSTAGRAM**

**Type:** Trigger  
**Mode:** Run Once for Each Item

**Expected Input:**

```json
{
  "word": "parler",
  "phonetic": "paʁ.le",
  "translation": "to speak",
  "part_of_speech": "verb",
  "difficulty_level": "A2",
  "examples": [
    {
      "french": "Je parle français.",
      "english": "I speak French.",
      "context": "Basic Statement"
    },
    {
      "french": "Elle parle plusieurs langues.",
      "english": "She speaks several languages.",
      "context": "Skills"
    }
  ],
  "date": "2025-11-16"
}
```

---

### Node 2: Get Used Images from Airtable ✅ **REUSED FROM INSTAGRAM**

**Type:** Airtable  
**Operation:** Search Records  
**Base:** Your Social Media Assets base  
**Table:** Used Pexels Images

**Options:**

- **Fields:** Select `pexels_id`, `platform` (or leave blank to get all fields)
- **Filter By Formula:** Leave empty (to get all records)
- **Max Records:** Set to a high number (e.g., 10000) or leave default

**Purpose:** Fetch all previously used Pexels image IDs to avoid reusing them.

**Note:** If you're sharing images between Instagram and Pinterest, this returns images marked as `instagram`, `pinterest`, or `both`.

---

### Node 3: Get Pexels Image (HTTP Request) ✅ **REUSED FROM INSTAGRAM**

**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://api.pexels.com/v1/search`

**Headers:**

```json
{
  "Authorization": "YOUR_PEXELS_API_KEY"
}
```

**Query Parameters:**

```json
{
  "query": "{{ $('When Executed by Another Workflow').first().json.data.definitions.first().text }} OR french culture",
  "per_page": 15,
  "orientation": "square"
}
```

**Purpose:** Fetch multiple Pexels images (15 results) to increase chances of finding an unused one.

**Note:** Same as Instagram workflow - reusing images across platforms.

---

### Node 4: Filter Out Used Images (Code) ✅ **REUSED FROM INSTAGRAM**

**Type:** Code  
**Language:** JavaScript  
**Placement:** After "Get Pexels Image" (Node 3)

**Purpose:** Filter out images that have already been used, selecting the first unused one.

```javascript
// Get WOTD data
const wotdData = $("When Executed by Another Workflow").first().json;
const wotd = wotdData.data || wotdData;
const word = wotd.word;

// Get list of used image IDs from Airtable
const usedImages = $("Get Used Images from Airtable").all();
// Normalize all IDs to strings for consistent comparison
const usedPexelsIds = new Set(
  usedImages
    .map((item) => {
      // Handle different Airtable response structures
      const id =
        item.json.fields?.pexels_id || item.json.pexels_id || item.json.id;
      return id ? String(id).trim() : null;
    })
    .filter((id) => id != null && id !== "")
);

console.log(`Found ${usedPexelsIds.size} previously used images`);
if (usedPexelsIds.size > 0) {
  console.log(
    `Sample used IDs: ${Array.from(usedPexelsIds).slice(0, 5).join(", ")}`
  );
}

// Get Pexels API response from Merge (could be original search OR broader search)
const mergedData = $input.all();
// Find the item with photos array (the Pexels response)
const pexelsItem = mergedData.find((item) => item.json.photos);
const pexelsData = pexelsItem ? pexelsItem.json : mergedData[0].json;

if (!pexelsData.photos || pexelsData.photos.length === 0) {
  throw new Error(`No images found in Pexels response`);
}

// Find first unused image
let selectedPhoto = null;
for (const photo of pexelsData.photos) {
  const photoId = String(photo.id).trim();
  const isUsed = usedPexelsIds.has(photoId);

  console.log(`Checking photo ID: ${photoId}, Used: ${isUsed}`);

  if (!isUsed) {
    selectedPhoto = photo;
    console.log(`Selected unused photo: ${photoId}`);
    break;
  }
}

// Fallback: If all images are used, set flag for broader search
if (!selectedPhoto) {
  console.warn(
    `All ${pexelsData.photos.length} images from this search have been used.`
  );
  selectedPhoto = pexelsData.photos[0];
}

// Build search query for reference
const firstDefinition =
  wotd.definitions && Array.isArray(wotd.definitions)
    ? wotd.definitions[0]
    : null;
const definitionText = firstDefinition?.text || word;
const searchQuery = `${definitionText} OR french culture`;

// Determine if this was a fallback selection
const selectedPhotoId = String(selectedPhoto.id).trim();
const isFallback = usedPexelsIds.has(selectedPhotoId);

if (isFallback) {
  console.warn(
    `WARNING: Selected photo ${selectedPhotoId} is already in used list!`
  );
}

return {
  json: {
    pexels_id: selectedPhoto.id.toString(),
    image_url: selectedPhoto.src.large2x,
    thumbnail_url: selectedPhoto.src.medium,
    photographer: selectedPhoto.photographer,
    photographer_url: selectedPhoto.photographer_url,
    search_query: searchQuery,
    word: word,
    used_date: wotd.date || new Date().toISOString().split("T")[0],
    is_fallback: isFallback,
    // Keep original WOTD data for next nodes
    _wotd: wotd,
  },
};
```

---

### Node 4a: IF - Check if Fallback Needed ✅ **REUSED FROM INSTAGRAM**

**Type:** IF  
**Placement:** After Node 4 (Filter Out Used Images)

**Condition:** `{{ $json.is_fallback }} === true`

**Purpose:** Only execute broader search if all images from the word-specific search were used.

**If TRUE** → Continue to Node 4b (Broader Search)  
**If FALSE** → Skip to Node 5 (Store Image in Airtable)

---

### Node 4b: Broader Search (HTTP Request) ✅ **REUSED FROM INSTAGRAM**

**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://api.pexels.com/v1/search`  
**Placement:** After IF node (Node 4a), only executes when `is_fallback: true`

**Headers:**

```json
{
  "Authorization": "YOUR_PEXELS_API_KEY"
}
```

**Query Parameters:**

```json
{
  "query": "french culture OR france OR paris",
  "per_page": 15,
  "orientation": "square"
}
```

**Purpose:** If all images from the word-specific search are used, try a broader generic search.

---

### Node 5: Store Image in Airtable 🔧 **MODIFIED FROM INSTAGRAM**

**Type:** Airtable  
**Operation:** Create Record  
**Base:** Your Social Media Assets base  
**Table:** Used Pexels Images

**What's Different:** Added `platform: "both"` field to mark images as shared across Instagram + Pinterest

**Fields to Set:**

| Field              | Value                          |
| ------------------ | ------------------------------ |
| `pexels_id`        | `{{ $json.pexels_id }}`        |
| `image_url`        | `{{ $json.image_url }}`        |
| `thumbnail_url`    | `{{ $json.thumbnail_url }}`    |
| `photographer`     | `{{ $json.photographer }}`     |
| `photographer_url` | `{{ $json.photographer_url }}` |
| `search_query`     | `{{ $json.search_query }}`     |
| `word`             | `{{ $json.word }}`             |
| `used_date`        | `{{ $json.used_date }}`        |
| `platform`         | `both`                         |

**Purpose:** Save the selected image to Airtable so it won't be reused.

**Note on `platform` field:**

- `instagram` → Only used on Instagram
- `pinterest` → Only used on Pinterest
- `both` → Shared across platforms (recommended for efficiency)

**Error Handling:** Enable "Continue On Fail" so the workflow doesn't stop if there's a duplicate.

---

### Node 6: Generate Pinterest Pin HTML (Code) 🆕 **NEW - PINTEREST ONLY**

**Type:** Code  
**Language:** JavaScript  
**Mode:** Run Once for All Items

**Purpose:** Generate 1000x1500px unified infographic HTML.

**What's Different:** Completely new! Creates single tall pin (1000x1500) instead of 4 square slides (1080x1080). Uses feminine-appealing fonts and text-heavy design optimized for Pinterest.

**Copy full code from:** `pinterest-pin-template.js`

**Key sections:**

```javascript
// Get WOTD data - handle both direct input and nested data structure
const wotdData = $("When Executed by Another Workflow").first().json;
const wotd = wotdData.data || wotdData;

// Get Pexels image from Filter node
const pexelsImageData = $("Filter Out Used Images").first().json;
const pexelsImage = pexelsImageData.image_url;

// Extract data
const word = wotd.word;
const phonetic = wotd.phonetic || "";
const translation = wotd.translation || "";
const pos = wotd.part_of_speech || "";
const level = wotd.difficulty_level || "";
const examples = wotd.examples || [];

// Get first 2 examples
const example1 = examples[0] || { french: "", english: "", context: "" };
const example2 = examples[1] || { french: "", english: "", context: "" };

// Build HTML with styles (see full code in pinterest-pin-template.js)
// ...

return {
  json: {
    html: html,
    word: word,
    date: wotd.date || new Date().toISOString().split("T")[0],
    _wotd: wotd,
    _pexelsImage: pexelsImage,
  },
};
```

**Design Features:**

- 1000x1500px dimensions
- Playfair Display + Poppins + Satisfy fonts
- 5 sections: Hero (350px), Definition (250px), Examples (450px), CTA (250px), Footer (200px)
- Badges: "French WOTD" + "📌 Save This!"
- Soft blue gradient palette

**Output:**

```json
{
  "html": "<!DOCTYPE html><html>...",
  "word": "parler",
  "date": "2025-11-16",
  "_wotd": { ... },
  "_pexelsImage": "https://..."
}
```

---

### Node 6b: Preview Pinterest Pin (Code) 🆕 **OPTIONAL - FOR TESTING**

**Type:** Code  
**Language:** JavaScript  
**Placement:** After "Generate Pinterest Pin HTML" (Node 6)  
**Mode:** Run Once for All Items

**Purpose:** Creates a preview HTML page to view the 1000x1500 pin before converting to image.

**Complete Code:** (Copy-paste this into n8n Code node)

```javascript
// Pinterest Pin Preview Node
// For n8n - Creates a preview HTML page to view the 1000x1500 pin
// Place this AFTER "Generate Pinterest Pin HTML" node

// Get the generated Pinterest pin HTML
const pinData = $input.first().json;
const htmlContent = pinData.html || "";
const word = pinData.word || "preview";
const date = pinData.date || new Date().toISOString().split("T")[0];

// HTML is already clean from the generator - just use it directly
const cleanedHtml = htmlContent;

// Create data URL for iframe
const dataUrl =
  "data:text/html;charset=utf-8," + encodeURIComponent(cleanedHtml);

// Preview page styles - optimized for tall Pinterest pin
const styles = `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #1a1a1a; padding: 40px 20px; min-height: 100vh; } .header { text-align: center; color: white; margin-bottom: 40px; } .header h1 { font-size: 32px; margin-bottom: 10px; } .header p { color: #999; font-size: 16px; } .header .badge { display: inline-block; background: #3b82f6; color: white; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-left: 12px; } .pin-container { display: flex; flex-direction: column; align-items: center; max-width: 1200px; margin: 0 auto; } .pin-wrapper { background: #f8f9fa; border-radius: 16px; padding: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); transition: transform 0.2s, box-shadow 0.2s; width: 100%; max-width: 1000px; } .pin-wrapper:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18); } .pin-label { text-align: center; color: #e60023; font-size: 18px; margin-bottom: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; } .pin-preview { width: 1000px; height: 1500px; border: 2px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); background: white; margin: 0 auto; position: relative; } .pin-preview iframe { width: 100%; height: 100%; border: none; display: block; } .pin-info { text-align: center; margin-top: 16px; color: #666; font-size: 14px; font-weight: 500; } .pin-dimensions { display: inline-block; background: #2a2a2a; color: #999; padding: 8px 16px; border-radius: 8px; font-family: 'Monaco', 'Courier New', monospace; font-size: 13px; margin-top: 8px; } .instructions { text-align: center; color: #666; margin-top: 40px; padding: 24px; background: #2a2a2a; border-radius: 12px; max-width: 800px; margin-left: auto; margin-right: auto; } .instructions h2 { color: white; margin-bottom: 16px; font-size: 24px; } .instructions p { margin-bottom: 12px; line-height: 1.6; } .instructions code { background: #1a1a1a; padding: 3px 8px; border-radius: 4px; font-family: 'Monaco', 'Courier New', monospace; color: #3b82f6; } .instructions strong { color: white; }`;

// Build the preview HTML
const previewHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pinterest Pin Preview - ${word}</title>
<style>${styles}</style>
</head>
<body>
<div class="header">
  <h1>📌 Pinterest Pin Preview</h1>
  <p>Word: <strong>${word}</strong> | Date: ${date}<span class="badge">1000x1500</span></p>
</div>
<div class="pin-container">
  <div class="pin-wrapper">
    <div class="pin-label">Pinterest WOTD Pin</div>
    <div class="pin-preview">
      <iframe src="${dataUrl}"></iframe>
    </div>
    <div class="pin-info">
      Tall Pin Format
      <div class="pin-dimensions">1000px × 1500px</div>
    </div>
  </div>
</div>
<div class="instructions">
  <h2>How to Use This Preview</h2>
  <p>This preview shows your Pinterest pin at actual size (1000x1500px).</p>
  <p><strong>To view full size:</strong> Right-click on the pin → "Inspect" → Copy the iframe src → Paste in a new browser tab</p>
  <p><strong>To save this preview:</strong> Copy the HTML from the n8n output and save as <code>preview-${word}-${date}.html</code></p>
  <p><strong>Note:</strong> This is how your pin will appear on Pinterest (but Pinterest will scale it for different views).</p>
</div>
</body>
</html>`;

console.log("✅ Pinterest pin preview HTML generated");
console.log("📏 Pin dimensions: 1000x1500px");
console.log("📝 Word:", word);
console.log("📊 Preview HTML length:", previewHTML.length, "characters");

return {
  json: {
    preview_html: previewHTML,
    word: word,
    date: date,
    pin_dimensions: "1000x1500",
    // Also include original HTML for reference
    original_html: cleanedHtml,
    html_length: cleanedHtml.length,
  },
};
```

**Usage:** This is optional and only for testing/debugging. Add this node if you want to preview the pin HTML in a browser before it gets converted to an image.

**Output:**

```json
{
  "preview_html": "<!DOCTYPE html>...",
  "word": "parler",
  "date": "2025-11-16",
  "pin_dimensions": "1000x1500",
  "original_html": "...",
  "html_length": 12543
}
```

**To view the preview:**

1. Execute this node
2. Copy the `preview_html` value from the output
3. Save as `preview-parler-2025-11-16.html`
4. Open in your browser
5. See the pin at actual 1000x1500 size

**Note:** This node is purely for testing. In production, you can skip it and go directly from "Generate Pinterest Pin HTML" to "Check Tunnel Status".

---

### Node 7: Check Tunnel Status (Smart Auto-Detection) ✅ **REUSED FROM INSTAGRAM**

**Type:** HTTP Request  
**Placement:** After "Generate Pinterest Pin HTML" (or after Preview if using it)  
**Method:** GET  
**URL:** `http://static-server:3001/tunnel-status`

**What this does:** Checks if static-server has auto-configured the tunnel URL on startup.

**Response:**

```json
{
  "configured": true,
  "tunnelUrl": "https://abc123.trycloudflare.com",
  "autoInitAttempted": true,
  "autoInitSucceeded": true
}
```

---

### Node 7a: Check If Manual Setup Needed (IF Node) ✅ **REUSED FROM INSTAGRAM**

**Type:** IF  
**Placement:** After "Check Tunnel Status"

**Condition:** `{{ $json.configured }}` equals `false`

**What this does:** If auto-detection failed, we'll manually configure it. If it succeeded, we skip straight to image generation.

**Branches:**

- **TRUE** (not configured) → Go to Node 7b (Manual Setup)
- **FALSE** (already configured) → Skip to Node 8 (Convert to Image)

---

### Node 7b: Get Tunnel URL from Cloudflared (Manual Fallback) ✅ **REUSED FROM INSTAGRAM**

**Type:** HTTP Request  
**Placement:** Only runs if Node 7a = TRUE (manual setup needed)  
**Method:** GET  
**URL:** `http://n8n-cloudflared:2000/metrics`

**Response Format:** String

Gets cloudflared metrics which contains the current tunnel URL.

**Settings:**

- **Retry On Fail:** Yes
- **Max Retries:** 3
- **Retry Wait:** 2000ms (2 seconds)

---

### Node 7b2: Extract and Set Tunnel URL (Manual Fallback) ✅ **REUSED FROM INSTAGRAM**

**Type:** Code  
**Placement:** After "Get Tunnel URL" (Node 7b)

```javascript
// Extract tunnel URL from cloudflared metrics
const metrics = $input.first().json;
const metricsText =
  typeof metrics === "string" ? metrics : JSON.stringify(metrics);
const tunnelMatch = metricsText.match(
  /https:\/\/[a-z0-9-]+\.trycloudflare\.com/
);

if (!tunnelMatch) {
  console.error("No tunnel URL found in metrics");
  throw new Error("Tunnel URL not found - cloudflared may not be ready yet");
}

const tunnelUrl = tunnelMatch[0];
console.log("Manually extracted tunnel URL:", tunnelUrl);

return { json: { tunnelUrl: tunnelUrl } };
```

---

### Node 7b3: Set Tunnel URL in Static Server (Manual Fallback) ✅ **REUSED FROM INSTAGRAM**

**Type:** HTTP Request  
**Placement:** After "Extract Tunnel URL" (Node 7b2)  
**Method:** POST  
**URL:** `http://static-server:3001/set-tunnel-url`

**Body (JSON):**

```json
{
  "url": "{{ $json.tunnelUrl }}"
}
```

**Response:**

```json
{
  "success": true,
  "tunnelUrl": "https://abc123.trycloudflare.com",
  "method": "manual"
}
```

---

### Node 8: Convert HTML to Image 🔧 **MODIFIED FROM INSTAGRAM**

**Type:** HTTP Request  
**Method:** POST  
**URL:** `http://n8n-plus:3000/api/html-to-image`

**What's Different:** Changed dimensions from 1080x1080 (Instagram) to 1000x1500 (Pinterest). Also added `platform: "pinterest"` for file organization.

**Body (JSON):**

```json
{
  "html": "{{ $json.html }}",
  "width": 1000,
  "height": 1500,
  "word": "{{ $json.word }}",
  "date": "{{ $json.date }}",
  "platform": "pinterest"
}
```

**Response:**

```json
{
  "success": true,
  "url": "https://abc123.trycloudflare.com/images/2025-11-16-parler/2025-11-16-parler-pinterest.png",
  "filePath": "/shared/images/languageacademy/socials/2025-11-16-parler/2025-11-16-parler-pinterest.png",
  "word": "parler",
  "date": "2025-11-16"
}
```

**Purpose:** Converts the HTML to a 1000x1500px PNG image and returns a public URL via the cloudflared tunnel.

**Note:** The `platform: "pinterest"` parameter helps organize files (optional but recommended).

---

### Node 9: Generate Pin Metadata (Code) 🆕 **NEW - PINTEREST ONLY**

**Type:** Code  
**Language:** JavaScript  
**Mode:** Run Once for All Items

**Purpose:** Creates SEO-optimized Pinterest metadata (title, description, link, alt text).

**What's Different:** Completely new! Instagram uses a simple caption generator. Pinterest needs SEO-optimized titles, rich descriptions, direct WOTD page links, and alt text.

**Copy full code from:** `pinterest-metadata-template.js`

**Key outputs:**

```javascript
return {
  json: {
    // Pinterest API required fields
    title: finalTitle, // "French Word: parler | Learn \"to speak\" in French | A2"
    description: description, // 500-char rich description with examples
    link: pinLink, // "https://languageacademy.io/?wotd=true&word=parler-fr"
    alt_text: altText, // Accessibility + SEO text
    board_name: boardName, // "French Word of the Day"
    // board_id: "PLACEHOLDER", // Set after Pinterest API setup

    // Keep data for next node
    word: word,
    date: data.date,
    image_url: data.url, // Public URL from Node 8
    html: data.html,

    // Analytics metadata
    level: level,
    pos: pos,
  },
};
```

**Sample Title:**

```
French Word: dormir | Learn "to sleep" in French | A2
```

**Sample Description:**

```
Learn the French verb "dormir" (dɔʁ.miʁ) meaning "to sleep".

Perfect for A2 French learners! See how to use "dormir" in real conversations:

📝 Je dors huit heures par nuit.
   → I sleep eight hours per night.

📝 Tu as bien dormi ?
   → Did you sleep well?

Master French vocabulary with daily word lessons. Save this pin to build your French vocabulary library!

👉 Visit languageacademy.io to practice dormir and 1000+ French words with interactive exercises.

#LearnFrench #FrenchVocabulary #A2French
```

**Sample Link:**

```
https://languageacademy.io/?wotd=true&word=dormir-fr
```

---

### Node 10: Upload Pin to Pinterest (HTTP Request) 🆕 **NEW - PINTEREST ONLY**

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://api.pinterest.com/v5/pins`

**What's Different:** Completely new! Uses Pinterest API instead of Instagram Graph API. Much simpler - single API call vs Instagram's 5-call carousel process.

**Authentication:** OAuth 2.0

**Headers:**

```json
{
  "Authorization": "Bearer {{ $credentials.pinterest_oauth.access_token }}",
  "Content-Type": "application/json"
}
```

**Body (JSON):**

```json
{
  "title": "{{ $json.title }}",
  "description": "{{ $json.description }}",
  "link": "{{ $json.link }}",
  "alt_text": "{{ $json.alt_text }}",
  "board_id": "YOUR_BOARD_ID_HERE",
  "media_source": {
    "source_type": "image_url",
    "url": "{{ $json.image_url }}"
  }
}
```

**Important:**

- Replace `YOUR_BOARD_ID_HERE` with your actual Pinterest board ID
- Set up Pinterest OAuth credential in n8n (see `pinterest-api-upload.md`)

**Response:**

```json
{
  "id": "123456789012345678",
  "created_at": "2025-11-16T10:30:00",
  "link": "https://languageacademy.io/?wotd=true&word=parler-fr",
  "title": "French Word: parler | Learn \"to speak\" in French | A2",
  "description": "Learn the French verb \"parler\"...",
  "board_id": "987654321098765432",
  "media": {
    "images": {
      "150x150": { "url": "...", "width": 150, "height": 150 },
      "400x300": { "url": "...", "width": 400, "height": 300 },
      "600x": { "url": "...", "width": 600, "height": 900 },
      "1200x": { "url": "...", "width": 1200, "height": 1800 }
    }
  }
}
```

**Purpose:** Uploads the pin to Pinterest and returns the Pinterest Pin ID.

**Success:** Pin is now live on Pinterest! ✅

---

## 📊 Implementation Efficiency Summary

### Code Reuse Breakdown

**Infrastructure (Shared with Instagram):** 70%

- ✅ Trigger + data handling (Node 1)
- ✅ Image sourcing (Nodes 2-4b: Airtable + Pexels + deduplication)
- ✅ Tunnel management (Nodes 7-7b3: Auto-detection + manual fallback)

**Platform-Specific (Pinterest Only):** 30%

- 🆕 HTML generation (Node 6: 1000x1500 tall pin)
- 🆕 Metadata generation (Node 9: SEO-optimized)
- 🆕 API upload (Node 10: Pinterest API)

**Minor Modifications:** 2 nodes

- 🔧 Node 5: Added `platform: "both"` field
- 🔧 Node 8: Changed dimensions to 1000x1500

### Development Time Saved

**If building from scratch:** ~8-10 hours  
**With Instagram reuse:** ~2-3 hours (only 3 new nodes)  
**Time saved:** 70% faster development

### Maintenance Benefits

**Shared infrastructure improvements benefit both platforms:**

- ✅ Upgrade Pexels deduplication → Works for Instagram + Pinterest
- ✅ Improve tunnel auto-detection → Works for Instagram + Pinterest
- ✅ Add new image sources → Works for Instagram + Pinterest

**Platform-specific optimizations stay separate:**

- 🎨 Pinterest design tweaks → Doesn't affect Instagram
- 📱 Instagram story features → Doesn't affect Pinterest
- 🔒 API changes isolated to 1 node per platform

---

## 🔄 Parallel Execution: Instagram + Pinterest

**Recommended Setup:**

```
Main WOTD Workflow ("Verify WOTD")
   ↓
   ├──→ Call Workflow: "Generate Instagram Post"
   │    (Existing workflow - 4 square slides)
   │
   └──→ Call Workflow: "Generate Pinterest Pin"
        (New workflow - 1 tall pin)
```

**Benefits:**

- ✅ Both platforms post simultaneously
- ✅ Failure in one doesn't block the other
- ✅ Independent error handling
- ✅ Easy to disable one platform without affecting the other

**Implementation:**

1. Create new workflow: "Generate Pinterest Pin"
2. Add to main WOTD orchestration as second "Call Workflow" node
3. Both workflows receive same WOTD data
4. Both workflows share Pexels images (marked as `platform: "both"`)

---

## 📊 Expected Output Examples

### Sample Pin Title

```
French Word: dormir | Learn "to sleep" in French | A2
```

### Sample Pin Description

```
Learn the French verb "dormir" (dɔʁ.miʁ) meaning "to sleep".

Perfect for A2 French learners! See how to use "dormir" in real conversations:

📝 Je dors huit heures par nuit.
   → I sleep eight hours per night.

📝 Tu as bien dormi ?
   → Did you sleep well?

Master French vocabulary with daily word lessons. Save this pin to build your French vocabulary library!

👉 Visit languageacademy.io to practice dormir and 1000+ French words with interactive exercises.

#LearnFrench #FrenchVocabulary #A2French
```

### Sample Pin Link

```
https://languageacademy.io/?wotd=true&word=dormir-fr
```

### Sample Pin Alt Text

```
French vocabulary word "dormir" (to sleep) with pronunciation, examples, and usage guide for A2 learners.
```

---

## 🎯 Success Metrics to Track

### Week 1 (Baseline)

- **Impressions:** Expect 50-200 per pin (new account)
- **Saves:** Target 5-10 per pin (good engagement)
- **Clicks:** Expect 2-5% CTR (Pinterest average)

### Month 1 (Growth)

- **Impressions:** Should increase 2-3x (algorithm learning)
- **Saves:** 10-20 per pin (building authority)
- **Clicks:** 20-30 total clicks to WOTD pages

### Month 3 (Maturity)

- **Cumulative impressions:** 5,000-15,000 (evergreen content)
- **Total saves:** 200-500 (content library)
- **Consistent clicks:** 50-100/month (long-tail traffic)

**Key Insight:** Unlike Instagram (48h lifespan), your Pinterest pins from Month 1 will STILL be driving traffic in Month 3!

---

## 🚀 Quick Start Guide

### 1. Pinterest Setup (30 min)

- [ ] Convert to Pinterest Business Account
- [ ] Create board: "French Word of the Day"
- [ ] Set up Pinterest Developer App
- [ ] Get OAuth credentials
- [ ] Get Board ID
- [ ] Test authentication

### 2. n8n Workflow Setup (1 hour)

- [ ] Clone Instagram workflow as starting point
- [ ] Replace Node 6 with Pinterest HTML generator
- [ ] Add Node 9: Pin metadata generator
- [ ] Add Node 10: Pinterest API upload
- [ ] Configure OAuth credential
- [ ] Update board_id in upload node

### 3. Test with Sample WOTD (15 min)

- [ ] Manually trigger with test word (e.g., "dormir")
- [ ] Verify HTML generation (1000x1500)
- [ ] Check image conversion
- [ ] Verify metadata (title, description, link)
- [ ] Test Pinterest upload
- [ ] Check pin appears on board

### 4. Integrate with Main WOTD (15 min)

- [ ] Add "Call Workflow" node to main orchestration
- [ ] Map WOTD data to Pinterest workflow
- [ ] Test parallel execution (Instagram + Pinterest)
- [ ] Verify both platforms post successfully

### 5. Monitor & Optimize (Ongoing)

- [ ] Check Pinterest Analytics daily (Week 1)
- [ ] Identify top-performing pins (saves + clicks)
- [ ] A/B test design variations if needed
- [ ] Optimize posting time (Pinterest suggests 8-11pm)

**Total Setup Time:** ~2 hours (most is waiting for API approvals)

---

## 💡 Pro Tips

### Design

- **Text readability:** Pinterest users zoom in - make sure text is crisp at 1000x1500
- **Brand consistency:** Use same blue (#3b82f6) as Instagram for cohesion
- **Seasonal variations:** Consider holiday-themed borders (Christmas, New Year, etc.)

### Content

- **Front-load value:** First 300px of pin is crucial (what shows in feed)
- **Use series numbering:** "French WOTD #47" creates FOMO (users want to complete collection)
- **Related words:** Add "Also learn: [related word]" to increase saves

### SEO

- **Board description:** Write keyword-rich board description ("Daily French vocabulary lessons for A1-C2 learners...")
- **Profile bio:** Update Pinterest profile to mention WOTD
- **Consistent hashtags:** Use same 3-5 hashtags for all pins (builds topic authority)

### Analytics

- **Track by level:** Compare A1 vs B1 vs C1 pin performance
- **Track by POS:** Do verb pins get more saves than noun pins?
- **Track by image:** Do certain image types (food, nature, people) perform better?

### Growth

- **Cross-promote:** Mention Pinterest on Instagram ("Also on Pinterest!")
- **Pin descriptions:** Invite users to "Follow for daily French words"
- **Rich Pins:** Set up Rich Pins if you add meta tags to WOTD pages (shows real-time pricing/availability)

---

## 🔗 Quick Links Reference

**Created Files:**

- `/pinterest-pin-template.js` - HTML generator (1000x1500 pin)
- `/pinterest-metadata-template.js` - Title/description generator (SEO-optimized)
- `/pinterest-preview-node.js` - Preview generator (optional, for testing)
- `/pinterest-api-upload.md` - Complete setup guide (OAuth + API)

**Documentation:**

- [Pinterest API v5 Docs](https://developers.pinterest.com/docs/api/v5/)
- [Pinterest Best Practices](https://business.pinterest.com/en/creator-best-practices)
- [Pinterest Analytics](https://analytics.pinterest.com/)
- [Pinterest Trends](https://trends.pinterest.com/)

**Tools:**

- [Rich Pins Validator](https://developers.pinterest.com/tools/url-debugger/)
- [Pinterest API Explorer](https://developers.pinterest.com/tools/api-explorer/)

---

_Ready to build! Next step: Pinterest API setup (follow `pinterest-api-upload.md`)_
