# Engagement Slide Types - Complete Reference

## 5 AI-Selected Engagement Slide Types

The AI analyzes each word and selects the BEST engagement type. Here's when each type is chosen:

---

## 1. Quiz (5-8% comment rate) 🧠

**When AI chooses this:**
- Word has clear conjugation patterns
- Multiple meanings that can be tested
- True/false grammar rules
- Vocabulary translation choices

**Design:**
- Clean white background
- Thin question text (52px, weight 300)
- Large options (44px, weight 400)
- Minimal spacing, maximum clarity

**Example:**
```
Test yourself

Je _____ français tous les jours.

A) parle
B) parles
C) parlent

Comment your answer 👇
```

**LLM generates:**
```json
{
  "type": "quiz",
  "content": {
    "question": "Je _____ français tous les jours.",
    "options": ["parle", "parles", "parlent"],
    "correct": "parle",
    "hint": "1st person singular 🤔"
  }
}
```

---

## 2. Challenge (3-5% comment rate) ✍️

**When AI chooses this:**
- Common, versatile words
- Easy for learners to practice
- Beginner-friendly vocabulary
- Words with many usage contexts

**Design:**
- Subtle gradient background (#fafbfc → #ffffff)
- Large prompt (52px, weight 300)
- Italic example text (32px)
- Encouraging, gentle tone

**Example:**
```
Your turn

Use "parler" in a sentence

EXAMPLE
Je parle avec mes amis chaque weekend.

Comment below 👇
```

**LLM generates:**
```json
{
  "type": "challenge",
  "content": {
    "prompt": "Use 'parler' in your own sentence!",
    "example": "Example: Je parle avec mes amis.",
    "reward": "Best 3 answers get featured! ⭐"
  }
}
```

---

## 3. Opinion (2-4% comment rate) 📊

**When AI chooses this:**
- Word has confusing similar forms
- Infinitive vs participle confusion
- Homophones (à vs a, ou vs où)
- Learner pain points

**Design:**
- Clean white background
- Simple A vs B layout
- No boxes, no borders
- Typography does the work

**Example:**
```
Which is harder?

Tell us your experience

A
parler

B
parlé

Comment A or B 👇
```

**LLM generates:**
```json
{
  "type": "opinion",
  "content": {
    "question": "Which is harder to remember?",
    "option_a": "parler (infinitive)",
    "option_b": "parlé (past participle)",
    "hook": "Tag someone who mixes these up! 👥"
  }
}
```

---

## 4. Mnemonic (2-3% comment rate, HIGH SAVES) 💡

**When AI chooses this:**
- Word sounds like English word
- Has memorable visual association
- Can create clever memory hook
- Unique characteristic to remember

**Design:**
- Subtle gradient (#ffffff → #f8faff)
- Progressive reveal: Hook → Connection → Reinforcement
- Largest main text (48px for connection)
- Educational, helpful tone

**Example:**
```
Remember it

"Parler" sounds like "parlor"

People TALK in a parlor

parler = to speak

Comment your memory trick 💡
```

**LLM generates:**
```json
{
  "type": "mnemonic",
  "content": {
    "hook": "'Parler' sounds like 'parlor'",
    "connection": "People TALK in a parlor",
    "reinforcement": "parler = to speak",
    "cta": "What's YOUR memory trick?"
  }
}
```

**Why this works:**
- High save rate (people want to remember)
- Shareable ("This helped me!")
- Shows you understand learning challenges
- Positions you as helpful expert

---

## 5. Mistake (2-3% comment rate, VALIDATION) ⚠️

**When AI chooses this:**
- Common documented learner error
- Grammar rule frequently broken
- False friend or interference
- Specific correction needed

**Design:**
- Clean white background
- Wrong shown with strikethrough + opacity
- Correct emphasized (larger, darker)
- Rule explanation in italic
- Small uppercase labels

**Example:**
```
Don't say this

WRONG
Je parle bien français

CORRECT
Je parle bien LE français

Always use the article with language names

Have you made this mistake? 😅
```

**LLM generates:**
```json
{
  "type": "mistake",
  "content": {
    "wrong": "Je parle bien français",
    "correct": "Je parle bien LE français",
    "rule": "Always use the article with language names",
    "cta": "Have you made this mistake?"
  }
}
```

**Why this works:**
- Prevents embarrassment (high value)
- Validation-seeking responses ("Yes, I did!")
- Positions you as expert
- Memorable (people remember mistakes)

---

## Design Consistency

All 5 types follow the same sophisticated design principles:

✅ **Thin large type** (weight 300 for main content)  
✅ **Generous spacing** (64-88px gaps)  
✅ **Grayscale + blue** (#1a1a1a, #665665, #999999 + #3b82f6)  
✅ **Clean backgrounds** (white or subtle gradients)  
✅ **No decoration** (no boxes, borders, or emojis in titles)  
✅ **Confident copy** (lowercase, minimal punctuation)  
✅ **100px padding** (all sides)

---

## AI Selection Strategy

The AI makes intelligent choices:

**Quiz** → Verbs with conjugation, words with multiple meanings  
**Challenge** → Common words (avoir, être, faire, parler)  
**Opinion** → Confusing pairs (infinitive/participle, homophones)  
**Mnemonic** → Words with English sound-alikes  
**Mistake** → Words with documented common errors  

---

## Typography Scale

All engagement slides use consistent hierarchy:

**Title:** 40px, weight 500, -0.02em  
**Main content:** 44-52px, weight 300, -0.025em (thin, elegant)  
**Secondary:** 40-48px, weight 400, -0.02em  
**Labels:** 18-24px, weight 500-600, uppercase  
**CTA:** 28px, weight 500, #3b82f6  

This matches the sophistication of slides 1-3.

---

## Expected Performance

**Comment rates:**
- Quiz: 5-8% (highest)
- Challenge: 3-5%
- Opinion: 2-4%
- Mnemonic: 2-3% (but high saves)
- Mistake: 2-3% (validation-seeking)

**Combined average:** ~4% comment rate vs <1% for standard carousels

**Bonus metrics:**
- Mnemonic: High save rate (people want to remember)
- Mistake: High share rate (helpful content)
- Quiz: High completion rate (people swipe through to see CTA)

---

## Files in This Directory

- **`carousel-slides-template.js`** - Main template (use this in n8n)
- **`carousel-slides-complete.js`** - Identical copy (backup/reference)
- **`slides-preview.html`** - Visual preview of all slide types
- **`ENGAGEMENT_TYPES_SUMMARY.md`** - This file
- **`DESIGN_REFINEMENTS.md`** - Design evolution notes

---

## Implementation

See `ENGAGEMENT_SLIDE_IMPLEMENTATION.md` for step-by-step n8n setup guide.

