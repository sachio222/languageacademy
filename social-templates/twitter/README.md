# Twitter/X Templates - Word of the Day

> **Status:** 📋 Planned - Templates to be developed

Templates for creating tweets with images for Twitter/X.

## Platform Specifications

### Tweet with Image
- **Recommended dimensions:** 1200 x 675 px (16:9)
- **Minimum:** 600 x 335 px
- **File format:** PNG, JPG, GIF, WebP
- **Max file size:** 5 MB (PNG, JPG), 15 MB (GIF)
- **Text limit:** 280 characters (or 4,000 for Twitter Blue)
- **Alt text:** 1,000 characters

### Alternative: Square Image
- **Dimensions:** 1080 x 1080 px (1:1)
- **Note:** Could reuse Instagram slide 2 (definition slide)

## Planned Content Structure

### Tweet Format: Concise + Visual

**Text (under 280 chars):**
```
🇫🇷 French Word of the Day: [word]

[phonetic] • [translation]

[Level] [part of speech]

Learn more → [link]

#LearnFrench #FrenchVocabulary
```

**Image:**
- Clean design with word, phonetic, translation
- 1-2 examples (space permitting)
- Language Academy branding
- High contrast for timeline visibility

## Template Files (TBD)

### `post-template.js` (To Be Created)
Twitter image generator:
- Horizontal format (1200x675) or square (1080x1080)
- Word, pronunciation, definition, examples
- Clean, minimal design (timeline-optimized)
- High contrast for quick scanning

### `tweet-template.js` (To Be Created)
Tweet text generator:
- 280 character limit enforced
- URL shortening considered (t.co links = 23 chars)
- Emojis (concise visual indicators)
- 2 hashtags maximum

### `metadata.json`
Platform specifications and best practices

## Design Considerations

### Twitter-Specific Design
- **Timeline optimization:** Image must work at small size
- **High contrast:** Stands out in fast-scrolling feed
- **Minimal text:** Let the tweet text do the talking
- **Quick scan:** Key info visible in 1-2 seconds

### Typography
- **Large, bold text** for word
- **Minimal elements** (avoid clutter)
- **High contrast colors**

## Twitter SEO Strategy

### Tweet Best Practices
- ✅ Keep under 280 characters (or leverage Twitter Blue 4,000)
- ✅ Front-load key info (word, translation)
- ✅ Include link to landing page
- ✅ Use 1-2 hashtags (max 2 for best engagement)
- ✅ Thread for additional context (optional)
- ✅ Visual content gets 150% more retweets

### Hashtag Strategy
Twitter hashtags have moderate impact:
- ✅ Use 1-2 relevant hashtags (#LearnFrench #FrenchVocabulary)
- ❌ Avoid more than 2 (reduces engagement)
- ✅ Capitalize for readability (#LearnFrench not #learnfrench)

### Character Count Optimization
- Tweet text: 280 chars max
- URL: Automatically shortened to 23 chars (t.co)
- Emojis: Count as 2 characters
- Hashtags: Count toward limit
- Mentions: Count toward limit

**Example Tweet (276 chars):**
```
🇫🇷 French Word of the Day: parler

/paʁ.le/ • to speak

A2 verb

"Je parle français." → I speak French.

Master 1000+ French words at languageacademy.io

#LearnFrench #FrenchVocabulary
```

## Posting Strategy

### Best Posting Times
- **Weekdays:** 12 PM, 3 PM, 5-6 PM EST
- **Peak:** 12 PM (lunch) and 5-6 PM (commute)
- **Weekends:** 9 AM - 12 PM

### Engagement Tactics
- ✅ Ask questions ("What other French verbs do you know?")
- ✅ Polls (Twitter's native poll feature)
- ✅ Threads (expand on word usage, etymology)
- ✅ Quote tweets (respond to French learners)
- ✅ Retweets (share user examples)

## Implementation Options

### Option A: Custom Twitter Template
Create horizontal image (1200x675)
- **Pros:** Optimized for Twitter timeline
- **Cons:** Another unique template

### Option B: Reuse Instagram Definition Slide
Use slide 2 from Instagram carousel (1080x1080)
- **Pros:** Minimal work, clean design
- **Cons:** Square format (not optimal for Twitter)

### Option C: Simplified Text-Only Tweets
Skip image, use text + link
- **Pros:** Zero design work
- **Cons:** Lower engagement (no visual)

**Recommendation:** Option B (reuse Instagram slide 2), test engagement, iterate if needed.

## Twitter API Integration

### API v2 Capabilities
- ✅ Tweet creation automation
- ✅ Media upload (images)
- ✅ Scheduled tweets (via Twitter Ads API or third-party)
- ✅ Analytics access
- ⚠️ Requires Twitter Developer account
- ⚠️ Free tier has rate limits

### Required Setup
1. Create Twitter Developer account
2. Create App
3. Get API credentials (API Key, API Secret, Access Token, Access Token Secret)
4. Authenticate via OAuth 1.0a or OAuth 2.0

### Rate Limits (Free Tier)
- **Tweet creation:** 300 tweets per 3 hours
- **Media upload:** 300 requests per 15 minutes
- **Sufficient for:** Daily WOTD posting

## Twitter Blue / Premium Features

If you have Twitter Blue/Premium:
- **4,000 character tweets** (vs 280)
- **Longer video uploads**
- **Edit tweet** capability
- **Prioritized ranking** in replies

Could leverage for more detailed word explanations in tweet itself.

## Related Resources

- `/N8N_SOCIAL_WOTD.md` - Instagram workflow (can reuse slide 2)
- Twitter Developer documentation
- Twitter API v2 reference

## Next Steps

1. Create Twitter Developer account
2. Determine if Twitter is high priority (audience presence?)
3. Test manual tweets to gauge engagement
4. If viable: Reuse Instagram slide 2 or create custom template
5. Set up Twitter API automation

