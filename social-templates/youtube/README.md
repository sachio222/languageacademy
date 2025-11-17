# YouTube Templates - Word of the Day

> **Status:** 📋 Planned - Templates to be developed

Templates for creating YouTube Shorts and video thumbnails.

## Platform Specifications

### YouTube Shorts
- **Format:** Vertical video
- **Dimensions:** 1080 x 1920 px (9:16)
- **Duration:** Up to 60 seconds
- **File format:** MP4, MOV
- **Max file size:** 256 GB (or 12 hours)
- **Title limit:** 100 characters
- **Description limit:** 5,000 characters
- **Hashtags:** 3 in description (max 15)

### Video Thumbnails (for long-form WOTD videos)
- **Dimensions:** 1280 x 720 px (16:9)
- **File format:** JPG, GIF, PNG
- **Max file size:** 2 MB
- **Recommended:** High contrast, large text, faces perform well

## Planned Content Structure

### YouTube Shorts: Quick Word Lesson (60s)
1. **Intro (5s):** "Today's French word is..."
2. **Word + Pronunciation (10s):** Large display with audio
3. **Definition (10s):** Translation and part of speech
4. **Example 1 (15s):** Sentence with context
5. **Example 2 (15s):** Another usage scenario
6. **CTA (5s):** Subscribe + visit website

### Long-Form Video (Optional Future)
- **Duration:** 3-5 minutes
- **Structure:** Deep dive into word etymology, usage nuances, cultural context
- **Thumbnail:** Eye-catching with word + emotion/context

## Template Files (TBD)

### `shorts-template.js` (To Be Created)
YouTube Shorts video generator:
- Vertical video layout (1080x1920)
- Text overlays with timing
- Subtitle positioning
- YouTube-optimized pacing

### `thumbnail-template.js` (To Be Created)
Thumbnail generator for long-form videos:
- Eye-catching design (1280x720)
- Large text (readable at small sizes)
- Emotion/intrigue element
- Brand consistency

### `metadata.json`
Platform specifications and best practices

## Design Considerations

### YouTube Shorts Design
- **Similar to TikTok** but YouTube audience slightly older
- **Captions essential** (many watch without sound)
- **Branding visible** (watermark or corner logo)
- **Clear value** in first 3 seconds

### Thumbnail Design
- **High contrast** (stands out in feed)
- **Large, bold text** (readable at 320x180 preview)
- **Faces/emotions** (if using presenters)
- **Bright colors** (avoid dark/muddy)
- **Consistent style** (brand recognition)

## YouTube SEO Strategy

### Title Best Practices
- ✅ Front-load keyword ("French Word: [word]")
- ✅ Include hook or benefit
- ✅ Under 60 characters (avoids truncation)
- ✅ Clear value proposition

**Example:** `French Word: Parler (To Speak) | A2 Level | Daily French`

### Description Best Practices
- ✅ First 150 characters crucial (shown in search)
- ✅ Include timestamps if applicable
- ✅ Link to website
- ✅ Call to action (subscribe, visit, practice)
- ✅ 3 hashtags in description (#LearnFrench #Shorts #FrenchVocabulary)

### Tags/Keywords
- Primary: Learn French, French vocabulary, French word of the day
- Secondary: [part of speech], [level], language learning
- Long-tail: specific phrases users might search

## Video Production Workflow (Planned)

### Shorts Workflow
1. **Generate Script** → Auto-generate narration
2. **Create Visuals** → Text overlays, backgrounds
3. **Add Audio** → Text-to-speech or voiceover
4. **Render Video** → Combine into MP4
5. **Upload to YouTube** → Via YouTube API

### Thumbnail Workflow (if long-form videos)
1. **Generate Design** → HTML/CSS template
2. **Convert to Image** → Puppeteer (1280x720)
3. **Upload with Video** → Via YouTube API

## Implementation Notes

### YouTube API Capabilities
- ✅ Video upload automation possible
- ✅ Metadata can be set programmatically
- ✅ Thumbnails can be uploaded via API
- ⚠️ OAuth authentication required
- ⚠️ Quota limits (10,000 units/day)

### Technical Approach
1. **Simple:** Static image slides + voiceover
2. **Medium:** Animated text overlays
3. **Advanced:** Full motion graphics

## Comparison: YouTube Shorts vs TikTok

| Feature | YouTube Shorts | TikTok |
|---------|----------------|---------|
| Duration | Up to 60s | 15-60s |
| Audience | Slightly older | Younger |
| Discoverability | SEO-focused | Algorithm-focused |
| Monetization | AdSense eligible | Creator fund |
| Long-form tie-in | Yes (promote channel) | No |

## Related Resources

- `/N8N_SOCIAL_WOTD.md` - Instagram workflow (reference)
- YouTube Creator Academy (best practices)
- YouTube Data API v3 documentation

## Next Steps

1. Research YouTube Data API quotas and limits
2. Decide: Shorts only, or Shorts + long-form?
3. Test video generation approach
4. Create authentication flow for YouTube API
5. Build templates when approach is validated

