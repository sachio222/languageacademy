# Welcome Page

## Overview

The Welcome Page is the first thing users see when they visit Language Academy. It provides educational context about the French language and the app's pedagogical approach before users proceed to the main landing page and sign-up flow.

## User Flow

```
First Visit:
  Welcome Page → Landing Page → Sign Up/Sign In → App

Returning Visitors:
  Landing Page → Sign Up/Sign In → App
  (Welcome Page is skipped)
```

## Content Sections

### 1. Iconic French Art

Featured image: [_La Liberté guidant le peuple_](https://en.wikipedia.org/wiki/Liberty_Leading_the_People) (Liberty Leading the People) by Eugène Delacroix, 1830

- One of France's most celebrated paintings
- Commemorates the July Revolution
- Housed in the Louvre Museum, Paris
- Links to Wikipedia article for deeper exploration

### 2. About French

- **Origins**: French as a Romance language from Vulgar Latin (~9th century)
  - Includes [Roman Temple at Nîmes](https://en.wikipedia.org/wiki/History_of_French) image positioned to the right
  - Maison Carrée represents the Roman heritage of French
  - Links to History of French Wikipedia article
- **Official Status**: 29 countries, five continents
  - Includes [Francophone world map](https://en.wikipedia.org/wiki/French_language) positioned to the right
  - Visual representation of French-speaking regions globally
  - Links to French language Wikipedia article
- **Global Reach**: 300 million speakers, projected to 700 million by 2050
- **L'Académie française**: Founded 1635, official language authority
  - Includes [Académie française building](https://www.academie-francaise.fr/) image positioned to the left
  - Links to official Académie française website

### 3. How French Works

- **Syllable-Timed Language**: Contrast with English's stress-timed rhythm
- **Liaison & Enchainement**: How French flows smoothly between words
- **Examples**: Practical comparisons showing pronunciation differences

### 4. How This App Works

Six pedagogical principles (from PEDAGOGICAL_ANALYSIS.md):

1. **Chunking Through Composition**: Building blocks that compose
2. **Frequency-First Vocabulary**: Top 100 words = 50% comprehension
3. **Four-Phase Learning Cascade**: Concept → Study → Practice → Exam
4. **Immediate Utility**: Real conversations fast (Module 4 = "ça va?")
5. **Interleaved Retrieval**: Randomized exams for durable memory
6. **Cognitive Scaffolding**: References available during practice

### 5. What to Expect

- **Comprehension Before Production**: Understanding develops first
- **Structure Over Phrases**: Generative power vs. fixed memorization
- **Fast Progress to Real Content**: 400+ word passages by Unit 8
- **Analytical, Not Casual**: For serious, systematic learners

## Design

Follows DESIGN_PRINCIPLES.md:

- Generous spacing (5rem between sections)
- Grayscale + blue accent (#3b82f6)
- Clean typography hierarchy (3rem hero → 2rem section titles)
- Minimal borders (only where needed)
- Subtle backgrounds (#fafbfc, #f7f9fc)
- Smooth transitions (0.15s)

## Implementation

**Files:**

- `/src/components/WelcomePage.jsx` - Component
- `/src/styles/WelcomePage.css` - Styles
- `/src/components/AuthWrapper.jsx` - Integration logic

**State Management:**

- Uses `localStorage.getItem('hasSeenWelcome')` to track first visit
- Set to `'true'` when user clicks "Get Started"
- Persists across sessions

**Props:**

- `onContinue`: Callback when user clicks "Get Started" button

## Reset for Testing

To see the welcome page again, run in browser console:

```javascript
localStorage.removeItem("hasSeenWelcome");
```

Then refresh the page.

## Future Enhancements

Potential additions:

- Animated number counters for statistics
- Interactive pronunciation examples (audio)
- Video introduction from instructor
- Language selection (prepare for Spanish, etc.)
- A/B testing different messaging

---

**Created:** 2025-10-18
**Last Updated:** 2025-10-18
