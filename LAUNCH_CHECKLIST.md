# Launch Checklist

## Pre-Launch Tasks

### 1. Define Pricing & Free Offer ⚠️ REQUIRED

- [ ] Decide on pricing model (recommended: Freemium)
  - [ ] Free: Units 1-2
  - [ ] Premium: $X/month or $Y/year for Units 3+
- [ ] Update copy in `LandingPage.jsx` with specific details
- [ ] Implement paywall logic in app after free units
- [ ] Set up payment processor (Stripe recommended)

### 2. Content & Assets

- [ ] Replace `/img/reading1a.svg` in preview section with actual app screenshot
- [ ] Create Open Graph image (`/img/og-preview.png`) - 1200x630px
  - Should show: Logo + tagline + key differentiator
  - Tools: Figma, Canva, or https://opengraph.xyz
- [ ] Create Twitter Card image (`/img/twitter-preview.png`) - 1200x600px
- [ ] Consider creating 60-second demo video

### 3. Copy Review

- [ ] Proofread all landing page copy
- [ ] Test headline variations (see LANDING_PAGE_GUIDE.md)
- [ ] Add FAQ section if needed
- [ ] Verify tone matches target audience (analytical, serious learners)

### 4. Technical Setup

- [ ] Test full flow: Landing → Auth → App
- [ ] Verify mobile responsive design on real devices
- [ ] Test in Safari, Chrome, Firefox
- [ ] Set up analytics:
  - [ ] Google Analytics or Plausible
  - [ ] Track landing page scrolls
  - [ ] Track CTA clicks
  - [ ] Track conversion funnel
- [ ] Set up error tracking (Sentry or similar)
- [ ] Configure email confirmation flow (Clerk handles this)

### 5. SEO & Performance

- [ ] Verify meta tags in `index.html`
- [ ] Add favicon
- [ ] Test page load speed (aim for <2s)
- [ ] Add robots.txt if needed
- [ ] Add sitemap.xml if needed
- [ ] Test social sharing previews:
  - [ ] Facebook Sharing Debugger
  - [ ] Twitter Card Validator
  - [ ] LinkedIn Post Inspector

### 6. Legal & Compliance

- [ ] Add Privacy Policy (required by Clerk)
- [ ] Add Terms of Service
- [ ] Add Cookie Notice if using analytics
- [ ] Verify GDPR compliance if targeting EU
- [ ] Add links to footer

## Traffic Generation Plan

### Organic Social

- [ ] **Reddit Post** on r/learnfrench
  - Title: "I built a language learning app based on cognitive science (not gamification)"
  - Post on Sunday evening for visibility
  - Be prepared to answer questions
- [ ] **Hacker News** submission
  - Title: "Language Learning Through Functional Composition"
  - Submit Tuesday-Thursday morning
  - Monitor comments closely
- [ ] **Twitter Thread**
  - Hook: "Why Duolingo doesn't work for engineers"
  - 5-7 tweets explaining method
  - Visual: composition diagram
  - CTA: Link to landing page

### Content Marketing

- [ ] Write blog post: "Why Language Learning Apps Fail Engineers"
- [ ] Write blog post: "Learning French Like You Learned to Code"
- [ ] Post on dev.to or Medium
- [ ] Share on LinkedIn

### Paid (if budget allows)

- [ ] Google Ads: "learn french for programmers"
- [ ] Reddit Ads: Target r/programming, r/learnfrench
- [ ] Budget: Start with $100-200 test

### Communities

- [ ] Indie Hackers showcase
- [ ] Product Hunt launch (coordinate timing)
- [ ] Designer News (if design angle)
- [ ] Lobste.rs (if tech angle)

## Post-Launch Monitoring

### First 24 Hours

- [ ] Monitor conversion rates
- [ ] Watch for errors in Sentry/console
- [ ] Respond to comments on social posts
- [ ] Track which traffic sources convert best

### First Week

- [ ] Review analytics daily
- [ ] Collect user feedback
- [ ] Note common questions → add to FAQ
- [ ] A/B test headline if traffic allows

### First Month

- [ ] Collect testimonials from successful users
- [ ] Calculate key metrics:
  - Landing → Signup conversion rate
  - Signup → First module complete rate
  - First module → Second module rate (activation)
  - Weekly Active Users (WAU)
  - Monthly Active Users (MAU)
- [ ] Identify drop-off points
- [ ] Optimize based on data

## Key Metrics to Track

### Conversion Funnel

1. **Landing Page Views** → baseline
2. **CTA Clicks** → measures interest (target: 15-25%)
3. **Signups Started** → measures intent
4. **Signups Completed** → measures friction (target: 40-50%)
5. **First Module Started** → measures activation (target: 70%)
6. **First Module Completed** → measures engagement (target: 50%)
7. **Upgrade to Paid** → measures conversion (target: 2-5% for freemium)

### User Behavior

- Time on landing page (target: 60-90s)
- Scroll depth (target: 80%+ reach bottom)
- Bounce rate (target: <60%)
- Return visitors (target: 30%+)

## Launch Timeline Recommendation

### Week -2: Prep

- Define pricing
- Create assets (screenshots, OG images)
- Set up analytics
- Legal pages

### Week -1: Polish

- Test everything
- Write launch posts
- Schedule social posts
- Final copy review

### Week 0: Launch

- **Monday:** Soft launch to friends/family
- **Tuesday:** Submit to Hacker News (morning)
- **Wednesday:** Post to Reddit (evening)
- **Thursday:** Post to Twitter
- **Friday:** Monitor and respond

### Week 1: Iterate

- Fix bugs
- Respond to feedback
- Optimize based on data
- Prepare Product Hunt launch

### Week 2: Product Hunt

- Launch on Tuesday/Wednesday
- Coordinate social promotion
- Be online all day to respond

## Success Criteria (First Month)

### Minimum Viable Success

- 100 signups
- 50 completed first module
- 10 completed first unit
- 2-3 paid conversions (if paid)

### Good Success

- 500 signups
- 250 completed first module
- 75 completed first unit
- 10-15 paid conversions

### Great Success

- 1,000+ signups
- 500+ completed first module
- 150+ completed first unit
- 30+ paid conversions

## Notes

- Focus on quality over quantity initially
- Serious learners are better than casual browsers
- One engaged user > ten inactive signups
- Testimonials from engineers/coders are gold

---

**Current Status:** Landing page built, auth flow integrated, ready for content and pricing decisions.

**Next Immediate Step:** Define pricing model and update copy accordingly.
