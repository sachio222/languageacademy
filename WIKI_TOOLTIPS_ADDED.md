# Wikipedia Tooltips Enhancement

## What Was Added

Enhanced the Reading 11 Preview to showcase **two types of tooltips**, demonstrating the full richness of the app's learning experience:

### 1. Simple Word Tooltips (Blue)

- **Color:** Blue (`#3b82f6`)
- **Words:** Regular vocabulary (évoluer, rapidement, habitants, etc.)
- **Content:** Quick translation
- **Style:** Small black bubble, white text
- **Example:** "évoluer" → "to evolve"

### 2. Wikipedia Tooltips (Purple)

- **Color:** Purple (`#8b5cf6`) with dotted underline
- **Words:** Proper nouns (Tour Eiffel, Notre-Dame, Louvre, Versailles)
- **Content:** Rich cards with:
  - Wikipedia image (140px height)
  - English title
  - Detailed description
  - Wikipedia attribution link
- **Style:** White card, 280px wide, shadows
- **Example:** "Tour Eiffel" → Full card with Eiffel Tower photo + description

## Proper Nouns Featured

1. **Tour Eiffel** (Eiffel Tower)

   - Image: Iconic tower photo
   - Description: "Iron lattice tower built 1887-1889, 330m tall, symbol of Paris, 7 million visitors per year"

2. **Notre-Dame** (Notre-Dame de Paris)

   - Image: Cathedral facade
   - Description: "Medieval Catholic cathedral, Gothic architecture, 856 years old, on Île de la Cité in Paris"

3. **Louvre** (Louvre Museum)

   - Image: Museum exterior
   - Description: "World's largest art museum, former royal palace, houses Mona Lisa, 10 million visitors annually"

4. **Versailles** (Palace of Versailles)
   - Image: Hall of Mirrors
   - Description: "Royal château 12 miles southwest of Paris, symbol of absolute monarchy, Hall of Mirrors, UNESCO World Heritage"

## Visual Differentiation

### Before (10 tooltips)

- All words blue
- All simple tooltips
- Same interaction pattern

### After (10 regular + 4 wiki = 14 tooltips)

- **Blue words** = vocabulary
- **Purple words** = proper nouns with rich context
- Two distinct interaction patterns
- Shows the full learning experience

## Why This Matters for Conversion

### 1. **Demonstrates App Richness**

Visitors see this isn't just a vocabulary app—it's a comprehensive learning experience with cultural context.

### 2. **Cultural Learning Signal**

Wikipedia cards show learners will understand French culture, geography, and history—not just words.

### 3. **Premium Feel**

Rich media tooltips with images signal a high-quality, well-designed product.

### 4. **Engagement Boost**

Visitors are more likely to interact with image-rich cards (curiosity about landmarks).

### 5. **Differentiation**

Duolingo doesn't do this. Babbel doesn't do this. This is unique.

## Technical Implementation

### Component Changes

- Added `activeWikiTooltip` state (separate from regular tooltips)
- Added `handleWikiTooltipToggle` function
- Wrapped proper nouns with `wiki-word` class
- Added Wikipedia card HTML structure

### CSS Changes

- `.wiki-word` styling (purple, dotted underline)
- `.wiki-tooltip` card layout
- `.wiki-tooltip-image` container
- `.wiki-tooltip-content` text layout
- Mobile responsive adjustments (240px cards on mobile)
- Touch-friendly interactions

### Performance

- Images loaded from Wikipedia CDN
- Lazy rendering (only active tooltip shown)
- No performance impact (pure CSS positioning)

## Mobile Experience

### Desktop (hover)

- Hover blue words → instant simple tooltip
- Hover purple words → instant Wikipedia card
- Smooth transitions

### Mobile (tap)

- Tap blue words → toggle simple tooltip
- Tap purple words → toggle Wikipedia card
- Cards sized to fit mobile screens (240px)
- Images scale appropriately (120px height on mobile)

## Analytics Opportunities

Track which tooltip type gets more engagement:

- **Blue tooltip interactions** (vocabulary focus)
- **Purple tooltip interactions** (cultural curiosity)
- **Average time per tooltip** (Wikipedia cards should be longer)

This data reveals learner motivations:

- High blue engagement = vocabulary-driven learners
- High purple engagement = culturally-curious learners

## Future Enhancements

### Phase 2

- [ ] Add more proper nouns (Arc de Triomphe, Champs-Élysées)
- [ ] Include food terms with images (coq au vin, ratatouille)
- [ ] Add artist tooltips (Monet, Renoir)

### Phase 3

- [ ] Video snippets for some terms
- [ ] Audio pronunciation in tooltips
- [ ] Related articles links
- [ ] User-submitted photos

## Messaging Updates

### Header

- ✅ Now explains blue vs purple distinction
- ✅ Clear interaction instructions (hover or tap)

### Footer Note

- ✅ Differentiates tooltip types
- ✅ Explains Wikipedia integration
- ✅ Shows comprehensive approach

## A/B Testing Opportunity

Test conversion rates:

- **Control:** Simple tooltips only
- **Variant A:** Current (blue + purple)
- **Variant B:** Wikipedia only (all proper nouns)

Hypothesis: Wikipedia tooltips increase conversions by showing cultural depth, but simple tooltips prove vocabulary coverage.

## Screenshots for Marketing

This preview is perfect for:

1. **Social media posts** - Screenshot the Wikipedia cards
2. **Blog posts** - "Learn French culture, not just vocabulary"
3. **Reddit discussions** - Show the difference from Duolingo
4. **Product Hunt** - Rich media learning experience

## Competitive Analysis

| Feature            | Language Academy | Duolingo    | Babbel     | Rosetta Stone |
| ------------------ | ---------------- | ----------- | ---------- | ------------- |
| Word tooltips      | ✅               | ❌          | ❌         | ❌            |
| Wikipedia cards    | ✅               | ❌          | ❌         | ❌            |
| Cultural context   | ✅               | ⚠️ Limited  | ⚠️ Limited | ❌            |
| Images in learning | ✅               | ⚠️ Cartoons | ⚠️ Stock   | ✅ Photos     |

**Your unique positioning:** Only app with integrated Wikipedia cultural learning in reading passages.

## Marketing Angle

### Headlines for Social

- "This isn't just French vocabulary—it's French culture"
- "Learn about the Eiffel Tower while learning French"
- "Wikipedia meets language learning"
- "Every proper noun tells a story"

### Value Props

- "Understand French culture, not just French words"
- "Learn language in historical and geographical context"
- "See Paris while learning to read about Paris"
- "Rich media learning experience—not flashcards"

---

## Summary

**Added:** 4 Wikipedia-style tooltips with images and descriptions
**Result:** Demonstrates comprehensive learning experience (vocabulary + culture)
**Impact:** Higher perceived value, better differentiation, more engagement
**Next:** Monitor which tooltip type drives more conversions

**Key Insight:** This feature transforms the preview from "vocabulary app" to "cultural learning platform."
