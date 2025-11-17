# TikTok Templates - Word of the Day

> **Status:** 📋 Planned - Templates to be developed

Templates for creating vertical video content for TikTok.

## Platform Specifications

- **Format:** Vertical video
- **Dimensions:** 1080 x 1920 px (9:16)
- **Duration:** 15-60 seconds (optimal: 21-34 seconds)
- **File format:** MP4, MOV, MPEG, AVI, WebM
- **Max file size:** 287.6 MB (iOS), 72 MB (Android)
- **Caption limit:** 2,200 characters (but first 100 crucial)
- **Hashtags:** 3-5 recommended (max 30)

## Planned Content Structure

### Video Concept: Animated Word Reveal
1. **Opening (3s):** Quick hook - "Learn this French word in 30 seconds"
2. **Word Display (5s):** Large word with pronunciation
3. **Definition (5s):** Translation and meaning with visual
4. **Examples (10s):** Two quick usage examples with captions
5. **CTA (5s):** "Follow for daily French words" + website

### Alternative Concepts
- **Before/After:** "Before you know [word]" vs "After you know [word]"
- **Common Mistake:** "Don't say X, say [word] instead"
- **Mini Story:** Tell a 15s story using the word
- **Sound Trend:** Use trending audio with word overlay

## Template Files (TBD)

### `video-template.js` (To Be Created)
Video overlay generator for TikTok format:
- Text overlays (word, phonetic, translation)
- Timing/keyframes for animations
- Subtitle positioning
- Brand watermark

### `caption-template.js` (To Be Created)
TikTok caption generator:
- Hook in first line
- Value proposition
- 3-5 strategic hashtags
- CTA to profile/website

### `metadata.json`
Platform specifications and best practices

## Design Considerations

### TikTok-Specific Design
- **Mobile-first:** All text must be readable on phone
- **Safe zones:** Top 100px and bottom 250px (UI overlays)
- **Large text:** Minimum 48px for readability
- **High contrast:** Works in bright and dark environments
- **Captions essential:** 80% watch without sound

### Typography Requirements
- **Sans-serif fonts only** (better mobile readability)
- **Bold weights** (500-700) for key information
- **Minimal text** (< 7 words per screen)
- **Animation:** Text should appear/fade, not static

## TikTok SEO Strategy

### Caption Best Practices
- ✅ Hook in first 100 characters
- ✅ Question or challenge ("Can you pronounce this?")
- ✅ 3-5 relevant hashtags only
- ✅ Include keyword variations (LearnFrench, FrenchLanguage, etc.)
- ✅ CTA to bio link or follow

### Hashtag Strategy
- 1 trending hashtag (#LearnOnTikTok)
- 2-3 niche hashtags (#LearnFrench, #FrenchVocabulary)
- 1 brand hashtag (#LanguageAcademy)

## Video Production Workflow (Planned)

1. **Generate Script** → Auto-generate narration text
2. **Create Visuals** → Generate overlays/animations
3. **Add Background** → Stock footage or static branded background
4. **Render Video** → Combine elements into MP4
5. **Upload to TikTok** → Via TikTok API (if available) or manual

## Implementation Notes

### Technical Challenges
- Video generation more complex than static images
- May need video editing API (e.g., Shotstack, Bannerbear Video)
- TikTok API has limited automation (review TOS)
- Alternative: Generate assets, manual upload via app

### Possible Solutions
1. **Simple approach:** Static image with voiceover
2. **Template-based:** Use video template service (Canva, etc.)
3. **Advanced:** Custom video generation with FFmpeg
4. **Hybrid:** Generate slides, use video editing tool

## Related Resources

- `/N8N_SOCIAL_WOTD.md` - Instagram workflow (reference for structure)
- TikTok Creative Center (research trending formats)
- TikTok for Business API (automation capabilities)

## Next Steps

1. Research TikTok API automation capabilities
2. Explore video generation tools/APIs
3. Test manual workflow (create → upload)
4. Determine automation feasibility
5. Create templates if viable

