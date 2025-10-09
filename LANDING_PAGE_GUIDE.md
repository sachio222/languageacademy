# Landing Page Guide

## Overview

The new landing page is designed to convert serious learners by emphasizing cognitive science, functional composition, and differentiation from gamified apps like Duolingo.

## Key Messaging Pillars

### 1. **Not a Game - Real Science**
- **Headline:** "Learn French through functional composition"
- **Tagline:** "Not gamification. Not phrase memorization. A cognitive science approach..."
- **Why it works:** Immediately signals this is for serious learners, not casual gamers

### 2. **Appeals to Coders**
- **Visual:** The 3-step composition diagram (pronouns → être → composition)
- **Language:** "Built like you learned to code", "pure functions", "compose them"
- **Why it works:** Coders understand composition; creates instant "aha!" moment

### 3. **Differentiation from Duolingo**
- **Section:** Direct comparison grid (Gamified Apps vs Language Academy)
- **Key differences:** 
  - Schema formation BEFORE testing (not test-first anxiety)
  - Frequency-first vocabulary (not random)
  - Interleaved retention (not blocked practice)
- **Why it works:** Many visitors have tried and failed with Duolingo; shows why you're different

### 4. **Cognitive Science Credibility**
- **4-Phase Learning Cascade:** See → Study → Practice → Test
- **Research-backed:** Each phase maps to memory formation science
- **Why it works:** Serious learners want methodology, not hype

### 5. **Fast Results**
- **Stats:** "72% of top 100 words by Unit 6"
- **Outcome:** "~50% real conversation comprehension after 71 modules"
- **Practical milestones:** "Ça va?" by Module 4, "Je veux ça" by Module 10
- **Why it works:** Shows ROI, not vague promises

### 6. **Self-Selection**
- **"You'll love this if..."** section explicitly targets analytical learners with coding background
- **"This isn't for you if..."** filters out casual learners
- **Why it works:** Converts the right people; prevents buyer's remorse

## Conversion Funnel

```
Landing Page (value prop + method)
    ↓
Click "Start Free Trial"
    ↓
Auth Forms (Sign In / Sign Up)
    ↓
Authenticated App
    ↓
Complete first unit
    ↓
Limited free offer decision point
```

## Limited Free Offer - Define This

**You need to decide:**

- ✅ **Option 1:** First unit free, then $X/month
- ✅ **Option 2:** 7-day free trial, full access, then $X/month
- ✅ **Option 3:** First X modules free forever, then paid for advanced units
- ✅ **Option 4:** Free tier (first 2 units) + Premium tier ($X/month for all units)

**Recommendation:** Option 4 (Freemium)
- Free: Units 1-2 (enough to demonstrate method)
- Premium: Units 3-8+ (after they're convinced)
- Why: Low friction for serious learners to try; clear upgrade path

## Copy Refinements for A/B Testing

### Headline Variations to Test

1. **Current:** "Learn French through functional composition"
2. **Alternative 1:** "Language learning for engineers"
3. **Alternative 2:** "Learn French like you learned to code"
4. **Alternative 3:** "French through cognitive science, not gamification"

### CTA Variations to Test

1. **Current:** "Start Free Trial"
2. **Alternative 1:** "Try the Method Free"
3. **Alternative 2:** "Experience Cognitive Learning"
4. **Alternative 3:** "Start Learning Structurally"

### Subheadline Variations to Test

1. **Current:** "Not gamification. Not phrase memorization. A cognitive science approach that teaches core competence for advanced comprehension—fast."
2. **Alternative 1:** "70+ years of memory research applied. Learn structure, not phrases. Advanced comprehension in weeks, not years."
3. **Alternative 2:** "Built for analytical minds. Functional composition meets cognitive science. Understand French, don't just memorize it."

## Traffic Source Optimization

### For Reddit (r/programming, r/learnfrench, r/languagelearning)
- **Lead with:** "I built a language learning app using functional programming principles"
- **Emphasize:** Composition, chunking, cognitive science
- **Link to:** Specific section about method (with anchor link)

### For Hacker News
- **Title:** "Language Learning through Functional Composition"
- **Emphasize:** Type system analogy, progressive complexity, research-backed
- **Be ready to discuss:** The pedagogy in comments

### For Twitter
- **Hook:** "Duolingo but for engineers" or "Language learning with the cognitive science that gamified apps ignore"
- **Visual:** Screenshot of the 3-step composition diagram
- **CTA:** Link to landing page

### For Google Ads (if running)
- **Keyword:** "learn french for programmers", "cognitive science language learning", "learn french fast"
- **Ad copy:** "Language Learning for Engineers. Functional composition meets cognitive science. Try free."

## Metrics to Track

### Primary Conversion Metrics
1. **Landing → Auth Forms:** Click "Start Free Trial" rate
2. **Auth Forms → Complete Signup:** Signup completion rate
3. **Signup → First Module Start:** Activation rate
4. **First Module → First Module Complete:** Engagement rate

### Secondary Metrics
1. **Time on landing page:** Should be 60-90 seconds (reading through)
2. **Scroll depth:** Should reach "4-Phase Learning" section minimum
3. **Traffic source quality:** Which sources convert best
4. **Bounce rate:** Should be <60% (self-selection working)

### Optimization Targets
- **Landing → Auth:** Target 15-25% click-through
- **Auth → Signup:** Target 40-50% completion
- **Signup → Module 1:** Target 70%+ activation
- **Module 1 complete:** Target 50%+ completion

## Content Improvements to Consider

### Add Later (when you have them):
1. **Testimonials:** "As a software engineer, this finally clicked for me" - Real user quote
2. **User count:** "Join 1,000+ learners mastering French structurally"
3. **Completion stats:** "73% of users complete first unit vs 8% on Duolingo"
4. **Demo video:** 60-second walkthrough of one module
5. **Founder story:** "Why I built this" section (if compelling)

### Consider Adding:
1. **FAQ section:** 
   - "How is this different from Duolingo?"
   - "Do I need coding experience?"
   - "How long until I'm conversational?"
   - "What does 'limited free offer' mean?"
2. **Reading 11 preview:** Show actual text from Reading 11 as goal
3. **Module roadmap:** Visual of all 71 modules (shows scope)

## Mobile Optimization

The landing page is responsive, but verify:
- Hero text readable on mobile (currently 2rem on small screens)
- CTA buttons thumb-friendly (44px+ height)
- Comparison grid stacks (implemented)
- Stats row stacks vertically (implemented)
- Method visual shows arrows pointing down (implemented)

## Design Principles Followed

✅ **Grayscale + one accent:** Uses #1a1a1a, #666666, #999999 + #3b82f6 blue  
✅ **Generous spacing:** 2.5-3rem between sections  
✅ **Typography hierarchy:** 3rem hero → 2rem section titles → 1.125rem body  
✅ **Minimal borders:** Only where needed (comparison cards, preview box)  
✅ **Clean backgrounds:** White + #fafbfc subtle variant  
✅ **No gimmicks:** Simple fades, 0.15s transitions, no transforms  
✅ **Fast interactions:** Hover states use opacity changes only  

## Next Steps

### Immediate:
1. ✅ Define "limited free offer" specifics
2. ✅ Update copy in LandingPage.jsx with final pricing details
3. ✅ Test the flow: Landing → Auth → App
4. ✅ Screenshot actual app interface for preview section (replace SVG)

### Before Launch:
1. ✅ A/B test headline variations
2. ✅ Add FAQ section
3. ✅ Implement analytics tracking (track each section scroll)
4. ✅ Add Open Graph meta tags for social sharing
5. ✅ Set up conversion funnel in analytics

### Post-Launch:
1. ✅ Collect first 10 user testimonials
2. ✅ Create demo video
3. ✅ Optimize based on conversion data
4. ✅ Add "success stories" section

## Technical Notes

### Files Created:
- `/src/components/LandingPage.jsx` - Main landing page component
- `/src/styles/Landing.css` - Landing page styles (DESIGN_PRINCIPLES compliant)

### Files Modified:
- `/src/components/AuthWrapper.jsx` - Now shows landing page before auth
- `/src/styles/Auth.css` - Updated to match design principles (removed gradients)

### Integration:
- Landing page appears first
- "Get Started" button → Auth forms
- "Back to landing page" link on auth forms
- Post-auth → Main app (existing flow)

## Messaging Dos and Don'ts

### DO:
✅ Emphasize structure and comprehension  
✅ Use technical language (composition, chunking, schema)  
✅ Show the method visually (diagrams, code examples)  
✅ Be direct about who it's for  
✅ Highlight speed to real-world utility  
✅ Reference cognitive science research  

### DON'T:
❌ Use gamification language (points, streaks, rewards)  
❌ Promise "fluency in 30 days" (not credible)  
❌ Hide the technical approach  
❌ Try to appeal to everyone  
❌ Use emoji-heavy copy (occasional is fine, but not excessive)  
❌ Avoid comparison with competitors  

---

**Key Insight:** You're selling **methodology** to **analytical learners**. They want to understand *how* it works before committing. The landing page gives them that understanding, then asks for commitment.

**Conversion Formula:**  
Curiosity (headline) → Understanding (method) → Credibility (science) → Proof (stats) → Trust (self-selection) → Action (CTA)

