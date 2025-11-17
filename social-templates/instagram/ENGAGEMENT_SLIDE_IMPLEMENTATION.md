# 🚀 Add Engagement Slide to Your Instagram Flow

## Quick Implementation Guide (30 minutes)

Follow these 3 steps to add a comment-driving 5th slide to your Instagram carousel.

---

## STEP 1: Update LLM Prompt (5 min)

Open `wotd-llm-prompt.md` and add this field to the JSON schema (line 122, after `social_hook`):

```json
  "social_hook": "Engaging question or hook for social media",
  "engagement_slide": {
    "type": "quiz|challenge|opinion",
    "content": {
      // Type-specific content
    }
  }
```

Then add this section to the prompt (after line 264, before "Return ONLY the JSON"):

````markdown
## 10. Engagement Slide (Instagram Comment Driver)

Generate ONE slide designed to drive Instagram comments. Choose the best type for this word:

**Selection Guide:**

- **quiz** → If word has clear conjugation or multiple choice opportunity
- **challenge** → If word is versatile and easy to use in sentences
- **opinion** → If word has confusing similar forms or learner pain points

### Quiz Format:

Use for words with clear right/wrong answers (conjugations, meanings, usage).

```json
"engagement_slide": {
  "type": "quiz",
  "content": {
    "question": "Complete: Je _____ français.",
    "options": ["parle", "parles", "parlent"],
    "correct": "parle",
    "hint": "1st person singular 🤔"
  }
}
```
````

### Challenge Format:

Use for common, versatile words learners can practice with.

```json
"engagement_slide": {
  "type": "challenge",
  "content": {
    "prompt": "Use 'parler' in your own sentence!",
    "example": "Example: Je parle avec mes amis.",
    "reward": "Best 3 answers get featured! ⭐"
  }
}
```

### Opinion Format:

Use for words with tricky variations that confuse learners.

```json
"engagement_slide": {
  "type": "opinion",
  "content": {
    "question": "Which is harder?",
    "option_a": "parler (infinitive)",
    "option_b": "parlé (past participle)",
    "hook": "Tag someone who mixes these up! 👥"
  }
}
```

**Requirements:**

- Make question/challenge feel achievable
- Include clear call-to-action
- Add emoji for visual appeal

````

---

## STEP 2: Update "Prepare Slides" Node (10 min)

In your n8n workflow, find **"Prepare 4 Slides"** node and replace with this:

```javascript
// Get WOTD data - handle both direct input and nested data structure
const wotdData = $("When Executed by Another Workflow").first().json;
const wotd = wotdData.data || wotdData;

// Get Pexels image from Filter node
const pexelsImageData = $("Filter Out Used Images").first().json;
const pexelsImage = pexelsImageData.image_url;

// Slide 1: Word over background
const slide1 = {
  type: "word",
  word: wotd.word,
  phonetic: wotd.phonetic,
  backgroundImage: pexelsImage,
};

// Slide 2: Definition
const slide2 = {
  type: "definition",
  word: wotd.word,
  translation: wotd.translation,
  pos: wotd.part_of_speech,
  level: wotd.difficulty_level,
};

// Slide 3: Common Uses (2 examples)
const slide3 = {
  type: "examples",
  examples: (wotd.examples || []).slice(0, 2),
};

// NEW: Slide 4 = Engagement (AI-chosen type)
const slide4 = {
  type: wotd.engagement_slide?.type || "challenge", // quiz|challenge|opinion
  engagement: wotd.engagement_slide?.content || {},
  word: wotd.word,
};

// Slide 5: CTA (moved from slide 4)
const slide5 = {
  type: "cta",
  word: wotd.word,
};

// Return 5 slides instead of 4
const slides = [slide1, slide2, slide3, slide4, slide5];

return slides.map((slide) => ({
  json: {
    ...slide,
    _metadata: {
      word: wotd.word,
      date: wotd.date,
    },
  },
}));
````

**⚠️ Important:** Rename this node from "Prepare 4 Slides" to **"Prepare 5 Slides"**

---

## STEP 3: Update Slide HTML Generator (15 min)

In **"Create HTML for Current Slide"** node, add these handlers BEFORE the final `else` block (around line 100):

```javascript
} else if (slide.type === "quiz") {
  // QUIZ SLIDE - Clean, minimal, comment-driving
  const wordStr = getWordString(slide);
  const q = slide.engagement;

  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; box-sizing: border-box; } .emoji { font-size: 64px; margin-bottom: 40px; } .title { font-size: 48px; font-weight: 600; color: #1a1a1a; margin-bottom: 48px; letter-spacing: -0.02em; } .question { font-size: 40px; font-weight: 500; color: #1a1a1a; margin-bottom: 48px; text-align: center; line-height: 1.4; letter-spacing: -0.015em; } .options { width: 100%; max-width: 600px; } .option { background: #fafbfc; padding: 20px 28px; margin-bottom: 16px; border-radius: 12px; font-size: 32px; font-weight: 500; color: #665665; letter-spacing: -0.01em; border: 2px solid #f0f0f0; transition: all 0.15s; } .cta { margin-top: 48px; font-size: 28px; font-weight: 600; color: #3b82f6; letter-spacing: -0.01em; } .hint { margin-top: 24px; font-size: 22px; color: #999999; font-style: italic; }`;

  const optionsHtml = q.options?.map((opt, i) =>
    `<div class="option">${String.fromCharCode(65 + i)}) ${opt}</div>`
  ).join('') || '';

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="emoji">🧠</div><div class="title">Test Yourself!</div><div class="question">${q.question || 'Quiz question here'}</div><div class="options">${optionsHtml}</div><div class="cta">Comment A, B, or C! 👇</div>${q.hint ? `<div class="hint">${q.hint}</div>` : ''}</div></body></html>`;

} else if (slide.type === "challenge") {
  // CHALLENGE SLIDE - Encouraging, achievable
  const wordStr = getWordString(slide);
  const c = slide.engagement;

  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; box-sizing: border-box; } .emoji { font-size: 64px; margin-bottom: 40px; } .title { font-size: 48px; font-weight: 600; color: #1a1a1a; margin-bottom: 32px; letter-spacing: -0.02em; } .prompt { font-size: 36px; font-weight: 500; color: #1a1a1a; margin-bottom: 48px; text-align: center; line-height: 1.4; letter-spacing: -0.015em; } .example-box { background: #fafbfc; padding: 28px 32px; border-radius: 12px; margin-bottom: 48px; border-left: 4px solid #3b82f6; } .example-label { font-size: 20px; font-weight: 600; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; } .example-text { font-size: 28px; color: #665665; letter-spacing: -0.01em; } .cta { font-size: 28px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; letter-spacing: -0.01em; } .reward { font-size: 24px; color: #999999; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="emoji">✍️</div><div class="title">Your Turn!</div><div class="prompt">${c.prompt || 'Create a sentence using this word!'}</div><div class="example-box"><div class="example-label">Example</div><div class="example-text">${c.example || 'Example sentence here'}</div></div><div class="cta">Comment your sentence! 💬</div><div class="reward">${c.reward || 'Best answers featured! ⭐'}</div></div></body></html>`;

} else if (slide.type === "opinion") {
  // OPINION SLIDE - Simple poll
  const wordStr = getWordString(slide);
  const o = slide.engagement;

  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; box-sizing: border-box; } .emoji { font-size: 64px; margin-bottom: 40px; } .title { font-size: 48px; font-weight: 600; color: #1a1a1a; margin-bottom: 48px; letter-spacing: -0.02em; } .question { font-size: 36px; font-weight: 500; color: #1a1a1a; margin-bottom: 56px; text-align: center; letter-spacing: -0.015em; } .options-container { width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 24px; margin-bottom: 48px; } .poll-option { background: #ffffff; padding: 32px; border-radius: 12px; border: 2px solid #e0e0e0; text-align: center; } .option-label { font-size: 28px; font-weight: 600; color: #3b82f6; margin-bottom: 8px; } .option-text { font-size: 26px; color: #665665; letter-spacing: -0.01em; } .cta { font-size: 28px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; letter-spacing: -0.01em; } .hook { font-size: 24px; color: #999999; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="emoji">📊</div><div class="title">Quick Poll!</div><div class="question">${o.question || 'Which is harder?'}</div><div class="options-container"><div class="poll-option"><div class="option-label">A)</div><div class="option-text">${o.option_a || 'Option A'}</div></div><div class="poll-option"><div class="option-label">B)</div><div class="option-text">${o.option_b || 'Option B'}</div></div></div><div class="cta">Comment A or B! 💭</div><div class="hook">${o.hook || 'Share your experience! 👥'}</div></div></body></html>`;

} else if (slide.type === "cta") {
```

**That's it!** The rest of your code stays the same.

---

## STEP 4: Test (5 min)

1. Generate a new WOTD with your updated LLM prompt
2. Verify the JSON includes `engagement_slide` field
3. Run your Instagram workflow
4. Check that you get 5 slides instead of 4
5. Verify slide 4 matches the engagement type (quiz/challenge/opinion)

---

## Design Notes

All engagement slides follow your DESIGN_PRINCIPLES.md:

✅ **Clean, minimal design** (grayscale + blue accent)  
✅ **Generous spacing** (80px padding, 48px gaps)  
✅ **Typography hierarchy** (48px titles, 36px body)  
✅ **Subtle backgrounds** (#fafbfc, #f8faff gradients)  
✅ **Consistent with existing slides** (same font stack, weights, colors)  
✅ **Fast, subtle transitions** (0.15s)  
✅ **High contrast** (#1a1a1a on white)

---

## Expected Results

After implementation:

- **Quiz slides**: 5-8% comment rate (people love to show they know)
- **Challenge slides**: 3-5% comment rate (creative expression)
- **Opinion slides**: 2-4% comment rate (personal experience)

Combined average: **~5% comment rate** (vs <1% on standard carousels)

---

## Troubleshooting

**Q: LLM doesn't generate engagement_slide field**

- Make sure you added the new section to your prompt
- Verify you're using the updated prompt in your n8n LLM node

**Q: Slides look broken**

- Check that `slide.engagement` is populated
- Verify the slide type matches one of: quiz, challenge, opinion

**Q: Only getting 4 slides**

- Rename node to "Prepare 5 Slides"
- Verify `slides` array has 5 elements
- Check `Collect All HTML Slides` expects 5 items

---

Need help? Check the templates in `/social-templates/instagram/` for reference designs.
