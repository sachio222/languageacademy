# Facebook Templates - Word of the Day

> **Status:** 📋 Planned - Templates to be developed

Templates for creating Facebook posts with images.

## Platform Specifications

### Image Post
- **Recommended dimensions:** 1200 x 630 px (1.91:1)
- **Minimum:** 600 x 315 px
- **File format:** JPG, PNG
- **Max file size:** 4 MB
- **Caption limit:** 63,206 characters (but ~300 optimal)

### Carousel Post (Alternative)
- **Images per carousel:** 2-10
- **Image dimensions:** 1080 x 1080 px (1:1) recommended
- **Same specs as Instagram carousel** (could reuse templates!)

## Planned Content Structure

### Option 1: Single Image Post
- Similar to Pinterest vertical design (1000x1500)
- Or horizontal (1200x630) optimized for link previews
- Word, definition, examples in one image
- Facebook logo/branding

### Option 2: Carousel Post (Reuse Instagram)
- ✅ **Can reuse Instagram carousel templates!**
- Same 4-slide structure
- Same 1080x1080 dimensions
- Adjust caption for Facebook audience

### Option 3: Link Post with Preview
- Link to languageacademy.io with WOTD page
- Custom Open Graph image (1200x630)
- Auto-generated preview from link

## Template Files (TBD)

### `post-template.js` (To Be Created)
Facebook post image generator:
- Single image format (1200x630 or 1000x1500)
- Or carousel adapter from Instagram templates
- Facebook-optimized typography

### `caption-template.js` (To Be Created)
Facebook caption generator:
- Longer-form content (Facebook allows more depth)
- Educational tone (Facebook audience values learning)
- Engagement questions
- Link to website/landing page

### `metadata.json`
Platform specifications and best practices

## Design Considerations

### Facebook vs Instagram
- **Audience:** Older demographic (30-60+)
- **Engagement:** More comments, shares vs likes
- **Content:** Can be more educational/detailed
- **Format:** Horizontal images work better (link previews)

### Typography
- **Larger fonts** (older audience)
- **High contrast** (accessibility)
- **Serif fonts acceptable** (more formal audience)

## Facebook SEO Strategy

### Caption Best Practices
- ✅ First 2-3 sentences crucial (shown before "See more")
- ✅ Ask questions to encourage comments
- ✅ Educational/informative tone
- ✅ Include call-to-action
- ✅ Link to landing page
- ✅ Minimal hashtags (1-3 max, unlike Instagram)

### Hashtag Strategy
Facebook hashtags have limited impact:
- ❌ Not as important as Instagram
- ✅ Use 1-3 branded or highly relevant hashtags
- ✅ Focus on engaging caption instead

## Posting Strategy

### Best Posting Times
- **Weekdays:** 9 AM - 3 PM EST
- **Peak:** 1-3 PM (lunch break browsing)
- **Weekends:** 12-1 PM

### Engagement Tactics
- ✅ Ask a question ("How would you use this word?")
- ✅ Encourage shares ("Tag a friend learning French!")
- ✅ Educational content performs well
- ✅ Link posts get good distribution (unlike Instagram)

## Implementation Options

### Option A: New Custom Template
Create Facebook-specific single image template (1200x630)
- **Pros:** Optimized for Facebook link previews
- **Cons:** More work, another template to maintain

### Option B: Reuse Instagram Carousel
Post same 4-slide carousel as Instagram
- **Pros:** Zero extra work, consistent cross-platform
- **Cons:** Not optimized for Facebook's horizontal format

### Option C: Reuse Pinterest Pin
Post Pinterest vertical image (1000x1500) to Facebook
- **Pros:** Minimal work, stands out in feed
- **Cons:** Not ideal for Facebook's landscape preference

**Recommendation:** Start with Option B (reuse Instagram), test performance, iterate if needed.

## Facebook API Integration

### Graph API Capabilities
- ✅ Post creation automation
- ✅ Photo upload
- ✅ Carousel posts supported
- ✅ Scheduling available
- ⚠️ Requires Facebook App + Page Access Token

### Required Setup
1. Create Facebook App
2. Get Page Access Token
3. Grant necessary permissions:
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `publish_to_groups` (if posting to groups)

## Cross-Posting Considerations

Since Instagram is owned by Facebook, consider:
- **Cross-post from Instagram** (built-in feature)
- **Or post separately** with Facebook-optimized caption
- **Or skip Facebook** if audience overlap is high

## Related Resources

- `/N8N_SOCIAL_WOTD.md` - Instagram workflow (can reuse for carousel)
- Facebook for Developers documentation
- Meta Business Suite (manual posting alternative)

## Next Steps

1. Analyze Facebook page audience (do you have followers?)
2. Determine if Facebook is high priority
3. Test manual posts to gauge engagement
4. If viable: Build template or reuse Instagram
5. Set up Facebook Graph API automation

