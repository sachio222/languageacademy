# Engagement Slide Design Examples

Visual reference for the 3 comment-driving slide types.

---

## Quiz Slide Design

**Design Specs:**
- Background: Subtle gradient (#ffffff → #f8faff)
- Emoji: 64px (🧠)
- Title: 48px, weight 600, #1a1a1a
- Question: 40px, weight 500, #1a1a1a
- Options: 32px, #665665, in #fafbfc boxes
- CTA: 28px, weight 600, #3b82f6

**Visual Layout:**
```
┌────────────────────────────────────┐
│                                    │
│              🧠                     │
│                                    │
│        Test Yourself!              │
│                                    │
│   Complete the sentence:           │
│                                    │
│   Je _____ français tous les jours.│
│                                    │
│   ┌──────────────────────────┐   │
│   │ A) parle                  │   │
│   └──────────────────────────┘   │
│   ┌──────────────────────────┐   │
│   │ B) parles                 │   │
│   └──────────────────────────┘   │
│   ┌──────────────────────────┐   │
│   │ C) parlent                │   │
│   └──────────────────────────┘   │
│                                    │
│     Comment A, B, or C! 👇         │
│                                    │
│     Hint: 1st person singular 🤔   │
│                                    │
└────────────────────────────────────┘
```

**Use cases:**
- Conjugation practice
- Multiple meaning words
- True/false grammar rules
- Translation choices

---

## Challenge Slide Design

**Design Specs:**
- Background: Clean white (#ffffff)
- Emoji: 64px (✍️)
- Title: 48px, weight 600, #1a1a1a
- Prompt: 36px, weight 500, #1a1a1a
- Example box: #fafbfc with 4px blue left border
- CTA: 28px, weight 600, #1a1a1a

**Visual Layout:**
```
┌────────────────────────────────────┐
│                                    │
│              ✍️                     │
│                                    │
│          Your Turn!                │
│                                    │
│   Use "parler" in your own         │
│   sentence!                        │
│                                    │
│   ┌────────────────────────────┐  │
│   │ Example                     │  │
│   │                             │  │
│   │ Je parle avec mes amis.     │  │
│   └────────────────────────────┘  │
│                                    │
│     Comment your sentence! 💬      │
│                                    │
│     Best 3 answers featured! ⭐    │
│                                    │
└────────────────────────────────────┘
```

**Use cases:**
- Common, versatile words
- Practice with context
- Creative expression
- Beginner-friendly words

---

## Opinion Poll Slide Design

**Design Specs:**
- Background: Subtle gradient (#f8faff → #ffffff)
- Emoji: 64px (📊)
- Title: 48px, weight 600, #1a1a1a
- Question: 36px, weight 500, #1a1a1a
- Poll boxes: White with #e0e0e0 borders
- Option labels: 28px, weight 600, #3b82f6
- CTA: 28px, weight 600, #1a1a1a

**Visual Layout:**
```
┌────────────────────────────────────┐
│                                    │
│              📊                     │
│                                    │
│         Quick Poll!                │
│                                    │
│     Which is harder to remember?   │
│                                    │
│   ┌────────────────────────────┐  │
│   │         A)                  │  │
│   │   parler (infinitive)       │  │
│   └────────────────────────────┘  │
│                                    │
│   ┌────────────────────────────┐  │
│   │         B)                  │  │
│   │   parlé (past participle)   │  │
│   └────────────────────────────┘  │
│                                    │
│     Comment A or B! 💭             │
│                                    │
│   Tag someone who mixes these up! 👥│
│                                    │
└────────────────────────────────────┘
```

**Use cases:**
- Similar word forms (infinitive vs participle)
- Confusing pairs (à vs a, ou vs où)
- Learner pain points
- Grammar debates

---

## Design Consistency Checklist

All engagement slides maintain consistency with existing slides:

✅ **Same font family** (-apple-system, BlinkMacSystemFont, 'Segoe UI')  
✅ **Same color palette** (#1a1a1a, #665665, #999999, #3b82f6)  
✅ **Same spacing** (80px padding, 48px gaps)  
✅ **Same backgrounds** (white, #fafbfc, subtle gradients)  
✅ **Same border radius** (12px for boxes)  
✅ **Same letter spacing** (-0.02em for large, -0.01em for medium)  
✅ **Same transitions** (0.15s when applicable)  
✅ **Same dimensions** (1080x1080px)

---

## Color Usage

Following DESIGN_PRINCIPLES.md strictly:

**Primary Text:**
- Titles, questions: `#1a1a1a`
- Body, options: `#665665`
- Hints, secondary: `#999999`

**Accent Color:**
- CTA text: `#3b82f6`
- Option labels (A, B, C): `#3b82f6`
- Left borders: `#3b82f6`

**Backgrounds:**
- Main: `#ffffff`
- Subtle variant: `#fafbfc`
- Gradients: `#f8faff → #ffffff`

**Borders:**
- Subtle: `#f0f0f0`
- Light: `#e0e0e0`
- Never heavy or colored (except blue accent on example box)

---

## Typography Hierarchy

**Large display (emoji):** 64px  
**Title:** 48px, weight 600  
**Question/Prompt:** 36-40px, weight 500  
**Options/Body:** 26-32px, weight 500  
**CTA:** 28px, weight 600  
**Secondary/Hints:** 22-24px, weight 400

**Letter Spacing:**
- Large text (48px+): -0.02em
- Medium text (28-40px): -0.015em
- Small text (<28px): -0.01em

---

## Spacing Values

**Container padding:** 80px all sides  
**Between sections:** 48px  
**Between related elements:** 24-32px  
**Between list items:** 16px  
**Box internal padding:** 20-32px  

These match the existing slides for visual consistency.

---

## Example LLM Outputs

### Quiz Example (Verb Conjugation)
```json
{
  "engagement_slide": {
    "type": "quiz",
    "content": {
      "question": "Complete: Nous _____ au cinéma ce soir.",
      "options": ["allez", "allons", "vont"],
      "correct": "allons",
      "hint": "First person plural 🤔"
    }
  }
}
```

### Challenge Example (Common Verb)
```json
{
  "engagement_slide": {
    "type": "challenge",
    "content": {
      "prompt": "Use 'avoir' in a sentence about food!",
      "example": "Example: J'ai faim.",
      "reward": "Top 5 get featured in our story! ⭐"
    }
  }
}
```

### Opinion Example (Confusing Pair)
```json
{
  "engagement_slide": {
    "type": "opinion",
    "content": {
      "question": "Which one trips you up more?",
      "option_a": "à (preposition)",
      "option_b": "a (avoir conjugation)",
      "hook": "Be honest! No judgment zone 😄"
    }
  }
}
```

---

## Mobile Rendering Notes

All slides are designed for 1080x1080 Instagram format:
- Text is large enough to read on phone (minimum 22px)
- Touch targets for visual scanning (not actual buttons)
- High contrast for outdoor viewing
- Generous padding prevents text cutoff
- Emojis add visual interest and break up text

The designs prioritize **clarity and readability** over decoration.

