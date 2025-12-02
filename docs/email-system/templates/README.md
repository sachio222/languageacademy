# Email Templates

This folder contains HTML email templates for Language Academy, designed following Airbnb-inspired minimalist design principles.

---

## 📧 Template Library

### Onboarding
- `welcome.html` - Welcome email with hero image and three key benefits
- `welcome-PREVIEW.html` - Preview version with real content

### Word of the Day
- `wotd-daily.html` - Daily Word of the Day email with quiz
- `wotd-announcement.html` - Special announcement template for WOTD

### Reengagement Suite (Cognitive Science-Based)
- `module-completion.html` - Immediate celebration after module exam pass
- `consolidation-24h.html` - 24-hour post-learning memory test
- `stalled-progress-3d.html` - Gentle nudge after 3 days inactive
- `decay-prevention-7d.html` - 7-day memory decay prevention
- `unit-completion.html` - Major milestone celebration
- `application-proof.html` - Real-world usage after high-utility modules
- `pace-reassurance.html` - Monthly quality-over-speed reminder

---

## 🎨 Design Principles

All templates follow `DESIGN_PRINCIPLES.md`:

**Typography:**
- Hero numbers: 40-48px, weight 300
- Headlines: 32-36px, weight 300-600
- Body: 15-16px, #665665
- Labels: 13-14px, #999999

**Colors:**
- Primary text: #1a1a1a
- Secondary: #665665
- Tertiary: #999999
- Accent: #3b82f6
- Borders: #f0f0f0

**Spacing:**
- Section gaps: 40-48px
- Element gaps: 16-24px
- Card padding: 20-24px

**Mobile-First:**
- Responsive table layout
- Readable on all devices
- Max width: 600px

---

## 🔧 Template Variables

All templates use Mustache-style `{{variable}}` syntax.

### Common Variables (All Emails)
```
{{first_name}}       - User's first name
{{email}}            - User's email address
{{user_id}}          - User ID for tracking
```

### Welcome Email
```
{{first_name}}       - User's first name
No other variables - content is static for brand consistency
```

### Module Completion
```
{{module_name}}              - "Pronouns" or "être"
{{module_number}}            - 1, 2, 3...
{{unit_number}}              - 1, 2, 3...
{{capability_1}}             - What they can now do
{{capability_2}}             - Second capability
{{capability_3}}             - Third capability
{{patterns_mastered}}        - Total patterns learned
{{top_100_coverage}}         - Percentage (e.g., "42")
{{possible_combinations}}    - Estimated combinations
{{review_question_1}}        - First review item
{{next_module_id}}           - ID for next module
{{next_module_name}}         - Name of next module
{{next_module_capability}}   - What they'll learn next
```

### 24h Consolidation
```
{{module_name}}       - Module just completed
{{module_id}}         - Module ID for tracking
{{quiz_question_1}}   - First quiz question
{{quiz_question_2}}   - Second quiz question
{{quiz_question_3}}   - Third quiz question
```

### 3-Day Stalled
```
{{progress_percentage}}      - "42" (don't include %)
{{current_unit}}             - Unit number
{{current_module}}           - Module number
{{capabilities_count}}       - Count of abilities unlocked
{{last_score}}               - Most recent exam score
{{modules_until_milestone}}  - Distance to next milestone
{{next_milestone}}           - "Unit 2 Complete"
{{last_module_id}}           - For review link
```

### 7-Day Decay Prevention
```
{{module_name}}               - Module to review
{{module_id}}                 - Module ID
{{review_item_1_question}}    - First review item
{{review_item_2_question}}    - Second review item
{{review_item_3_question}}    - Third review item
{{review_item_4_question}}    - Fourth review item
{{review_item_5_question}}    - Fifth review item
{{next_module_id}}            - For continue link
```

### Unit Completion
```
{{fluency_milestone}}         - "Conversational basics"
{{unit_name}}                 - "Unit 1: Foundations"
{{impact_1}}                  - Real-world capability
{{impact_2}}                  - Second capability
{{impact_3}}                  - Third capability
{{patterns_mastered}}         - Total patterns
{{vocab_count}}               - Total vocab words
{{days_streak}}               - Consecutive days
{{comprehension}}             - Percentage (e.g., "45")
{{possible_combinations}}     - Estimated combinations
{{next_unit_id}}              - Next unit ID
{{next_unit_name}}            - Next unit name
```

### Application Proof
```
{{real_world_capability}}     - "greet someone"
{{dialog_line_1}}             - First line of dialog
{{dialog_line_2}}             - Second line
{{dialog_line_3}}             - Third line
{{dialog_line_4}}             - Fourth line
{{vocab_count}}               - Words used in dialog
{{challenge_prompt}}          - Writing/speaking task
{{example_response}}          - Example answer
{{challenge_id}}              - Challenge tracking ID
{{media_title_1}}             - First media recommendation
{{media_type_1}}              - "Video" or "Podcast"
{{media_level_1}}             - "A1" or "Beginner"
{{media_link_1}}              - URL to media
{{media_title_2}}             - Second recommendation
{{media_type_2}}              - Type
{{media_level_2}}             - Level
{{media_link_2}}              - URL
```

### Pace Reassurance
```
{{current_module}}            - User's current module
{{comparison_low}}            - Lower comparison (current - 10)
{{comparison_high}}           - Higher comparison (current + 15)
{{retention_rate}}            - User's retention %
{{average_retention}}         - Average across all users
{{first_try_accuracy}}        - User's accuracy %
{{average_accuracy}}          - Average accuracy %
{{trend_direction}}           - "Improving" or "Steady"
{{trend_color}}               - "#22c55e" or "#3b82f6"
{{trend_icon}}                - "📈" or "➡️"
```

---

## 🧪 Testing Templates

### Method 1: Browser Preview
1. Open HTML file in browser
2. Replace variables manually to see layout
3. Check responsive design (resize window)

### Method 2: Email Client Testing
Use tools like:
- [Litmus](https://litmus.com)
- [Email on Acid](https://www.emailonacid.com)
- [Mailtrap](https://mailtrap.io)

### Method 3: Send Test via Resend
```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "test@languageacademy.io",
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<paste template HTML here>"
  }'
```

### Test Checklist
- [ ] Gmail (desktop)
- [ ] Gmail (mobile app)
- [ ] Apple Mail (macOS)
- [ ] Apple Mail (iOS)
- [ ] Outlook (desktop)
- [ ] Outlook (web)
- [ ] All links work
- [ ] Images load
- [ ] Unsubscribe link works
- [ ] Mobile responsive
- [ ] Dark mode (iOS/macOS)

---

## 📐 Template Structure

All templates follow this consistent structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Title</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px;">
          
          <!-- Header -->
          <tr><td>...</td></tr>
          
          <!-- Content -->
          <tr><td>...</td></tr>
          
          <!-- CTA -->
          <tr><td>...</td></tr>
          
          <!-- Footer (Standardized) -->
          <tr><td>...</td></tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 🎯 Best Practices

### Inline Styles
All CSS is inline for email client compatibility. No `<style>` tags or external CSS.

### Table-Based Layout
Uses tables instead of div/flexbox for maximum compatibility.

### Image Optimization
- Logo: 38px height (auto width)
- Max width: 600px for full-width images
- Alt text on all images

### Link Tracking
All links include tracking parameters:
```html
href="https://languageacademy.io?source=email&type=module_completion&module={{module_id}}"
```

### Unsubscribe Link
Required in all emails:
```html
<a href="https://languageacademy.io?unsubscribe&type=progress">Unsubscribe</a>
```

---

## 📝 Creating New Templates

### Step 1: Copy Base Structure
Start with `module-completion.html` as a base.

### Step 2: Define Variables
List all `{{variables}}` your template needs.

### Step 3: Design Content
Follow DESIGN_PRINCIPLES.md for spacing, typography, colors.

### Step 4: Test Rendering
Test in Gmail, Apple Mail, Outlook.

### Step 5: Create n8n Workflow
Set up data preparation and sending workflow.

### Step 6: Document
Add to this README with variables and purpose.

---

## 🔗 Related Documentation

- `../N8N_SEND_WOTD_EMAIL.md` - WOTD workflow
- `../N8N_MODULE_COMPLETION_EMAIL.md` - Module completion workflow
- `../N8N_REENGAGEMENT_EMAILS.md` - All reengagement workflows
- `../REENGAGEMENT_EMAIL_SYSTEM.md` - Complete system overview
- `../../DESIGN_PRINCIPLES.md` - Design guidelines

---

## 📊 Email Performance Benchmarks

**Target Metrics:**
- Open Rate: 40%+
- Click Rate: 15%+
- Unsubscribe: <0.5%

**Educational Email Averages:**
- Open Rate: 20-30%
- Click Rate: 3-5%
- Unsubscribe: 0.2-0.5%

Our templates are designed to exceed industry averages through personalization, cognitive science, and beautiful design.

---

**Status:** Production-Ready  
**Last Updated:** November 17, 2025  
**Maintained By:** Language Academy Team
